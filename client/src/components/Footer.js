import React from "react";

export default function Footer() {
  return (
    <div className="w-screen">
      <div class="bg-indigo-100">
        <div class="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-center">
          <div class="p-5 w-48 ">
            <div class="text-xs uppercase text-indigo-700 font-medium">
              Home
            </div>
            <a class="my-3 block hover:text-indigo-700" href="/how-it-works">
              How does it work? <span class="text-teal-600 text-xs p-1"></span>
            </a>
          </div>
          <div class="p-5 w-48 ">
            <div class="text-xs uppercase text-indigo-700 font-medium">
              User
            </div>
            <a class="my-3 block hover:text-indigo-700" href="/register">
              Sign in <span class="text-teal-600 text-xs p-1"></span>
            </a>
            <a class="my-3 block hover:text-indigo-700" href="/login">
              Log in <span class="text-teal-600 text-xs p-1"></span>
            </a>
          </div>

          <div class="p-5 w-48 ">
            <div class="text-xs uppercase text-indigo-700 font-medium">
              Support
            </div>
            <a class="my-3 block hover:text-indigo-700" href="/">
              Help Center <span class="text-teal-600 text-xs p-1"></span>
            </a>
            <a class="my-3 block hover:text-indigo-700" href="/#">
              Privacy Policy <span class="text-teal-600 text-xs p-1"></span>
            </a>
            <a class="my-3 block hover:text-indigo-700" href="/#">
              Conditions <span class="text-teal-600 text-xs p-1"></span>
            </a>
          </div>

          <div class="p-5 w-48 ">
            <div class="text-xs uppercase text-indigo-700 font-medium">
              Contact us
            </div>
            <a class="my-3 block hover:text-indigo-700" href="/#">
              Blooming Sierra, San Francisco, CA{" "}
              <span class="text-teal-600 text-xs p-1"></span>
            </a>
            <a class="my-3 block" href="/#">
              info@shareit.com <span class="text-teal-600 text-xs p-1"></span>
            </a>
          </div>
        </div>
      </div>

      <div class="bg-indigo-100 pt-2 ">
        <div
          class="flex pb-5 px-3 m-auto pt-5 border-t text-indigo-700 text-sm flex-row justify-around
     md:flex-row max-w-6xl"
        >
          <div class="mt-2">© Copyright 2020. All Rights Reserved.</div>
          <div className="text-xl flex flex-row gap-2">
            <i class="fab fa-twitter text-indigo-700"></i>
            <i class="fab fa-facebook text-indigo-700"></i>
            <i class="fab fa-instagram text-indigo-700"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
