import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AccountDropdown(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="focus:outline-none hover:text-gray-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        My account <i className="fas fa-caret-down"></i>
      </button>
      {isOpen && (
        <button
          className="fixed inset-0 h-full w-full cursor-default"
          onClick={() => setIsOpen(false)}
        ></button>
      )}
      {isOpen && (
        <div className="absolute right-0 w-40 py-2 mt-2 bg-white text-gray-800 rounded-md shadow-xl">
          <Link
            className="block px-3 py-2 hover:bg-indigo-700 hover:text-white"
            to="/profile"
          >
            My profile
          </Link>
          <Link
            className="block px-3 py-2 hover:bg-indigo-700 hover:text-white"
            to="/requests"
          >
            My requests
          </Link>
          <Link
            className="block px-3 py-2 hover:bg-indigo-700 hover:text-white"
            to="/products/upload"
          >
            Add product
          </Link>
          <hr />
          <Link
            className="block px-3 py-2 hover:bg-indigo-700 hover:text-white"
            to="/"
            onClick={props.logout}
          >
            Log out
          </Link>
        </div>
      )}
    </div>
  );
}
