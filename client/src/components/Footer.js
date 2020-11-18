import React from 'react'

export default function Footer() {
    return (
 <div>
  <div class="bg-gray-100">
   <div class="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-center">
      <div class="p-5 w-48 ">
         <div class="text-xs uppercase text-gray-500 font-medium">Home</div>
         <a class="my-3 block" href="/#">How does it work? <span class="text-teal-600 text-xs p-1"></span></a>
      </div>
      <div class="p-5 w-48 ">
         <div class="text-xs uppercase text-gray-500 font-medium">User</div>
         <a class="my-3 block" href="/#">Sign in <span class="text-teal-600 text-xs p-1"></span></a>
         <a class="my-3 block" href="/#">Log in <span class="text-teal-600 text-xs p-1"></span></a>
      </div>
      
  
      <div class="p-5 w-48 ">
         <div class="text-xs uppercase text-gray-500 font-medium">Support</div>
         <a class="my-3 block" href="/#">Help Center <span class="text-teal-600 text-xs p-1"></span></a><a class="my-3 block" href="/#">Privacy Policy <span class="text-teal-600 text-xs p-1"></span></a><a class="my-3 block" href="/#">Conditions <span class="text-teal-600 text-xs p-1"></span></a> 
      </div>
      
      <div class="p-5 w-48 ">
         <div class="text-xs uppercase text-gray-500 font-medium">Contact us</div>
         <a class="my-3 block" href="/#">XXX XXXX, Floor 4 San Francisco, CA <span class="text-teal-600 text-xs p-1"></span></a><a class="my-3 block" href="/#">contact@company.com <span class="text-teal-600 text-xs p-1"></span></a> 
      </div>
   </div>
</div>

<div class="bg-gray-100 pt-2 ">
   <div class="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col
      md:flex-row max-w-6xl">
      <div class="mt-2">© Copyright 2020. All Rights Reserved.</div>
 
   </div>
</div>
</div>
    )
}
