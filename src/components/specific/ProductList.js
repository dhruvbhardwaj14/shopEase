import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ filters, currentPage }) => {
  const mockProducts = [
    {
      pid: 1,
      pname: "Samsung Galaxy M14",
      pprice: "14000.00",
      pcategory: "Electronics",
      pqty: 48,
      pstatus: "available",
      psupplier: "Samsung India",
    },
    {
      pid: 2,
      pname: "Men's Cotton T-Shirt",
      pprice: "500.00",
      pcategory: "Clothing",
      pqty: 199,
      pstatus: "available",
      psupplier: "FashionHub Pvt Ltd",
    },
    {
      pid: 3,
      pname: "Introduction to Python",
      pprice: "450.00",
      pcategory: "Books",
      pqty: 99,
      pstatus: "available",
      psupplier: "TechBooks Ltd",
    },
    {
      pid: 4,
      pname: "Mixer Grinder",
      pprice: "2500.00",
      pcategory: "Home Appliances",
      pqty: 30,
      pstatus: "available",
      psupplier: "KitchenAid",
    },
    {
      pid: 5,
      pname: "Dell Inspiron Laptop",
      pprice: "50000.00",
      pcategory: "Electronics",
      pqty: 10,
      pstatus: "available",
      psupplier: "Dell India",
    },
    {
      pid: 6,
      pname: "Women's Kurti",
      pprice: "800.00",
      pcategory: "Clothing",
      pqty: 150,
      pstatus: "available",
      psupplier: "Ethnic Wear Co",
    },
    {
      pid: 7,
      pname: "The Alchemist",
      pprice: "300.00",
      pcategory: "Books",
      pqty: 80,
      pstatus: "available",
      psupplier: "Penguin India",
    },
    {
      pid: 8,
      pname: "Air Conditioner",
      pprice: "35000.00",
      pcategory: "Home Appliances",
      pqty: 15,
      pstatus: "available",
      psupplier: "Voltas Ltd",
    },
    {
      pid: 9,
      pname: "Apple iPhone 14",
      pprice: "75000.00",
      pcategory: "Electronics",
      pqty: 25,
      pstatus: "available",
      psupplier: "Apple India",
    },
    {
      pid: 10,
      pname: "Samsung Smart TV",
      pprice: "45000.00",
      pcategory: "Electronics",
      pqty: 40,
      pstatus: "available",
      psupplier: "Samsung India",
    },
    {
      pid: 11,
      pname: "Jeans for Men",
      pprice: "1200.00",
      pcategory: "Clothing",
      pqty: 100,
      pstatus: "available",
      psupplier: "Levis",
    },
    {
      pid: 12,
      pname: "Washing Machine",
      pprice: "22000.00",
      pcategory: "Home Appliances",
      pqty: 20,
      pstatus: "available",
      psupplier: "LG Electronics",
    },
    {
      pid: 13,
      pname: "Harry Potter and the Philosopher's Stone",
      pprice: "500.00",
      pcategory: "Books",
      pqty: 60,
      pstatus: "available",
      psupplier: "Bloomsbury Publishing",
    },
    {
      pid: 14,
      pname: "LED Desk Lamp",
      pprice: "700.00",
      pcategory: "Home Appliances",
      pqty: 75,
      pstatus: "available",
      psupplier: "Philips",
    },
    {
      pid: 15,
      pname: "Sony PlayStation 5",
      pprice: "50000.00",
      pcategory: "Electronics",
      pqty: 14,
      pstatus: "available",
      psupplier: "Sony",
    },
    {
      pid: 16,
      pname: "The Lean Startup",
      pprice: "400.00",
      pcategory: "Books",
      pqty: 50,
      pstatus: "available",
      psupplier: "Crown Publishing",
    },
    {
      pid: 17,
      pname: "Nike Running Shoes",
      pprice: "3500.00",
      pcategory: "Clothing",
      pqty: 80,
      pstatus: "available",
      psupplier: "Nike",
    },
    {
      pid: 18,
      pname: "Coffee Maker",
      pprice: "2500.00",
      pcategory: "Home Appliances",
      pqty: 45,
      pstatus: "available",
      psupplier: "Breville",
    },
    {
      pid: 19,
      pname: "Smart Watch",
      pprice: "8000.00",
      pcategory: "Electronics",
      pqty: 60,
      pstatus: "available",
      psupplier: "Garmin",
    },
    {
      pid: 20,
      pname: "Men's Formal Shirt",
      pprice: "1500.00",
      pcategory: "Clothing",
      pqty: 120,
      pstatus: "available",
      psupplier: "Van Heusen",
    },
  ];

  // Apply filters (mock logic, replace with actual API filtering logic)
  const filteredProducts = mockProducts.filter(
    (product) =>
      !filters.category ||
      (product.pcategory === filters.category &&
        product.pprice >= filters.priceRange[0] &&
        product.pprice <= filters.priceRange[1])
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.pid} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
