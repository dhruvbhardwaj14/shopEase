import React from "react";

const CartItem = ({ cid, item, onUpdateQuantity, onRemoveItem }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded shadow mb-4">
      {/* <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      /> */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800">{item.pname}</h2>
        <p className="text-gray-600">${item.pprice}</p>
        <div className="flex items-center mt-2">
          <button
            className="px-2 py-1 border rounded-l bg-gray-200"
            onClick={() => onUpdateQuantity(Math.max(item.cqty - 1, 1))}
          >
            -
          </button>
          <span className="px-4 py-1 border-t border-b">{item.cqty}</span>
          <button
            className="px-2 py-1 border rounded-r bg-gray-200"
            onClick={() => onUpdateQuantity(item.cqty + 1)}
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={onRemoveItem}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
