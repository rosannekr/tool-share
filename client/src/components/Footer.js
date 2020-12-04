import React from "react";

export default function Footer() {
  return (
    <div className="mt-56">
      <div className="bg-indigo-100">
        <div className="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-center">
          <div className="p-5 w-48 ">
            <div className="text-xs uppercase text-indigo-700 font-medium">
              Home
            </div>
            <a className="my-3 block hover:text-indigo-700" href="/how-it-works">
              How does it work? <span className="text-teal-600 text-xs p-1"></span>
            </a>
          </div>
          <div className="p-5 w-48 ">
            <div className="text-xs uppercase text-indigo-700 font-medium">
              User
            </div>
            <a className="my-3 block hover:text-indigo-700" href="/register">
              Sign in <span className="text-teal-600 text-xs p-1"></span>
            </a>
            <a className="my-3 block hover:text-indigo-700" href="/login">
              Log in <span className="text-teal-600 text-xs p-1"></span>
            </a>
          </div>

          <div className="p-5 w-48 ">
            <div className="text-xs uppercase text-indigo-700 font-medium">
              Support
            </div>
            <a className="my-3 block hover:text-indigo-700" href="/">
              Help Center <span className="text-teal-600 text-xs p-1"></span>
            </a>
            <a className="my-3 block hover:text-indigo-700" href="/#">
              Privacy Policy <span className="text-teal-600 text-xs p-1"></span>
            </a>
            <a className="my-3 block hover:text-indigo-700" href="/#">
              Conditions <span className="text-teal-600 text-xs p-1"></span>
            </a>
          </div>

          <div className="p-5 w-48 ">
            <div className="text-xs uppercase text-indigo-700 font-medium">
              Contact us
            </div>
            <a className="my-3 block hover:text-indigo-700" href="/#">
              Blooming Sierra, San Francisco, CA{" "}
              <span className="text-teal-600 text-xs p-1"></span>
            </a>
            <a className="my-3 block" href="/#">
              info@shareit.com <span className="text-teal-600 text-xs p-1"></span>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-indigo-100 pt-2 ">
        <div
          className="flex pb-5 px-3 m-auto pt-5 border-t text-indigo-700 text-sm flex-row justify-around
     md:flex-row max-w-6xl"
        >
          <div className="mt-2">© Copyright 2020. All Rights Reserved.</div>
          <div className="text-xl flex flex-row gap-2">
            <i className="fab fa-twitter text-indigo-700"></i>
            <i className="fab fa-facebook text-indigo-700"></i>
            <i className="fab fa-instagram text-indigo-700"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
