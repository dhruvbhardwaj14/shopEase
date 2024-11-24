const express = require("express");
const db = require("./db");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

app.use(cors());
app.use(express.json()); // For parsing JSON request bodies
app.use(express.urlencoded({ extended: true }));
// Route to fetch products

// Start the server
const PORT = 3306;
const SECRET_KEY = "DU_MCA_2024";

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// ------------------------------------------------------PRODUCT ENDPOINTS---------------------------------------------------------------------------
// Endpoint to filter products by category
app.get("/products", (req, res) => {
  const { category } = req.query; // Query parameter for category
  const query = category
    ? "SELECT * FROM Product WHERE pcategory = ?"
    : "SELECT * FROM Product";

  db.query(query, [category], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Endpoint to fetch product details by pid
app.get("/products/:pid", (req, res) => {
  const { pid } = req.params;

  const query = "SELECT * FROM Product WHERE pid = ?";

  db.query(query, [pid], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(results[0]); // Send the product details as a response
  });
});

// -------------------------------------------------******************************---------------------------------------------------------------------------

// -------------------------------------------------------CART ENDPOINTS---------------------------------------------------------------------------

// Endpoint to add product to the cart
app.post("/cart", (req, res) => {
  const { cid, pid, cqty } = req.body;

  const query = `
  INSERT INTO Cart (cid, pid, cqty)
  VALUES (?, ?, ?)
  ON DUPLICATE KEY UPDATE cqty = cqty + VALUES(cqty);
  `;

  db.query(query, [cid, pid, cqty], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Product added to cart successfully!" });
  });
});

// FETCH ALL ITEMS IN THE CART
app.get("/cart/:cid", (req, res) => {
  const { cid } = req.params;

  const query = `
  SELECT Cart.cid, Cart.pid, Cart.cqty, Product.pname, Product.pprice
  FROM Cart
  JOIN Product ON Cart.pid = Product.pid
  WHERE Cart.cid = ?;
  `;

  db.query(query, [cid], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results); // Send cart items as JSON
  });
});

// UPDATE QUANTITY OF A PRODUCT IN THE CART
app.put("/cart/:cid/:pid", (req, res) => {
  const { cid, pid } = req.params;
  const { cqty } = req.body;

  const query = `
  UPDATE Cart
  SET cqty = ?
  WHERE cid = ? AND pid = ?;
  `;

  db.query(query, [cqty, cid, pid], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ message: "Product not found in cart" });
      return;
    }

    res.json({ message: "Cart updated successfully!" });
  });
});

// Endpoint to remove a specific item from the cart
app.delete("/cart/:cid/:pid", (req, res) => {
  const { cid, pid } = req.params;

  const query = `
  DELETE FROM Cart
  WHERE cid = ? AND pid = ?;
  `;

  db.query(query, [cid, pid], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ message: "Product not found in cart" });
      return;
    }

    res.json({ message: "Product removed from cart successfully!" });
  });
});

// Endpoint to remove all items from the cart
app.delete("/cart/:cid", (req, res) => {
  const { cid } = req.params; // customer id

  const query = "DELETE FROM Cart WHERE cid = ?";
  db.query(query, [cid], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "All items removed from cart successfully!" });
  });
});
// -----------------------------------------------------******************************---------------------------------------------------------------------------

// -----------------------------------------------------------ORDER ENDPOINTS---------------------------------------------------------------------------

// Order a single product
app.post("/order/:cid/:pid", (req, res) => {
  const { cid, pid } = req.params; // Customer ID and Product ID
  let { quantity } = req.body; // Quantity to order

  // If quantity is not specified, set it to 1
  if (!quantity || quantity <= 0) {
    quantity = 1;
  }

  // Start a transaction to ensure atomicity
  db.beginTransaction((err) => {
    if (err) {
      res.status(500).json({ error: "Failed to start transaction" });
      return;
    }

    // Get product details (price and stock)
    const getProductQuery = "SELECT pprice, pqty FROM Product WHERE pid = ?";

    db.query(getProductQuery, [pid], (err, results) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).json({ error: err.message });
        });
      }

      if (results.length === 0) {
        return db.rollback(() => {
          res.status(404).json({ message: "Product not found" });
        });
      }

      const product = results[0];

      // Check if there is enough stock available
      if (product.pqty < quantity) {
        return db.rollback(() => {
          res.status(400).json({ message: "Insufficient stock available" });
        });
      }

      const orderAmount = product.pprice * quantity; // Total price for the order

      // Insert the order into the Order table
      const placeOrderQuery = `
        INSERT INTO \`Order\` (cid, pid, oamt, odate, ostatus, oqty)
        VALUES (?, ?, ?, NOW(), 'placed', ?);
      `;

      db.query(
        placeOrderQuery,
        [cid, pid, orderAmount, quantity],
        (err, results) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ error: err.message });
            });
          }

          // Reduce the quantity of the product in the Product table
          const updateProductQuery = `
            UPDATE Product
            SET pqty = pqty - ?
            WHERE pid = ?;
          `;

          db.query(updateProductQuery, [quantity, pid], (err) => {
            if (err) {
              return db.rollback(() => {
                res.status(500).json({ error: err.message });
              });
            }

            // Commit the transaction if all queries are successful
            db.commit((err) => {
              if (err) {
                return db.rollback(() => {
                  res
                    .status(500)
                    .json({ error: "Failed to commit transaction" });
                });
              }

              // Respond with success message
              res.json({
                message: "Order placed successfully and stock updated!",
              });
            });
          });
        }
      );
    });
  });
});

// Order All Items in the Cart and Remove Items from the Cart After Ordering
app.post("/order", (req, res) => {
  const { cid } = req.body;

  // SQL to insert all cart items into the Order table
  const placeOrderQuery = `
    INSERT INTO \`Order\` (cid, pid, oamt, odate, ostatus, oqty)
    SELECT 
      Cart.cid, 
      Cart.pid, 
      (Product.pprice * Cart.cqty) AS oamt, 
      NOW(), 
      'placed', 
      Cart.cqty
    FROM Cart
    JOIN Product ON Cart.pid = Product.pid
    WHERE Cart.cid = ?;
  `;

  // SQL to clear the cart after placing the order
  const clearCartQuery = "DELETE FROM Cart WHERE cid = ?;";

  db.beginTransaction((err) => {
    if (err) {
      res.status(500).json({ error: "Failed to start transaction" });
      return;
    }

    // Insert cart items into the Order table
    db.query(placeOrderQuery, [cid], (err, results) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).json({ error: err.message });
        });
      }

      // Clear the cart after successful insertion
      db.query(clearCartQuery, [cid], (err) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ error: err.message });
          });
        }

        // Commit the transaction
        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ error: "Failed to commit transaction" });
            });
          }

          res.json({ message: "Order placed successfully and cart cleared!" });
        });
      });
    });
  });
});

// Fetch all orders for a user
app.get("/order/:cid", (req, res) => {
  const { cid } = req.params;

  const query = "SELECT * FROM `Order` WHERE cid = ?";

  db.query(query, [cid], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json(results); // Send all orders for the customer
  });
});

// Cancel a specific order
app.delete("/order/:oid", (req, res) => {
  const { oid } = req.params;

  const query = "UPDATE `Order` SET ostatus = 'cancelled' WHERE oid = ?";

  db.query(query, [oid], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.json({ message: "Order cancelled successfully!" });
  });
});

// ----------------------------------------------------******************************---------------------------------------------------------------------------

// -----------------------------------------------------------USER ENDPOINTS---------------------------------------------------------------------------

// User Signup with UUID for `cid` and hashed password
app.post("/signup", (req, res) => {
  const {
    cname,
    ccontact,
    cemail,
    cpwd,
    caddr_city,
    caddr_state,
    caddr_pincode,
  } = req.body;

  // Generate a unique `cid` using UUID
  const cid = uuidv4(); // Generate unique customer ID (cid)

  // Hash the password before saving
  bcrypt.hash(cpwd, 10, (err, hashedPwd) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    const query =
      "INSERT INTO Customer ( cid,cname, ccontact, cemail, cpwd, caddr_city, caddr_state, caddr_pincode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      cid,
      cname,
      ccontact,
      cemail,
      hashedPwd,
      caddr_city,
      caddr_state,
      caddr_pincode,
    ];
    db.query(query, values, (err, results) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          // Duplicate entry error
          res.status(400).json({ error: "Email already registered" });
        } else {
          console.log(err.message);
          res.status(500).json({ error: "Internal server error" });
        }
        return;
      }
      res.json({ message: "Signup successful!" });
    });
  });
});

// User Login (Verify Password)
app.post("/login", (req, res) => {
  const { cemail } = req.body;
  const cpwd = req.body.cpwd.trim();
  // Query to check if the user exists
  const query = "SELECT * FROM Customer WHERE cemail = ?";
  db.query(query, [cemail], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    // Compare the entered password with the hashed password in the database
    bcrypt.compare(cpwd, user.cpwd, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      console.log(user.cid);
      // Generate JWT Token
      const token = jwt.sign(
        { cid: user.cid, email: user.cemail, name: user.cname }, // Payload
        SECRET_KEY, // Secret key to sign the token
        { expiresIn: "1h" } // Set token expiration time (1 hour)
      );

      // Send the token in the response
      res.json({ message: "Login successful", token });
    });
  });
});

// ----------------------------------------------------******************************---------------------------------------------------------------------------
