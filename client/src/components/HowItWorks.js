import React from 'react'

export default function HowItWorks() {
    return (
        <div className="ml-16 mt-4 mb-5">

            <div className="flex flex-row justify-center gap-2 ">
            <img className="w-full w-50 mb-2" src="/../../../pictures/neighbors-balcony.jpg" />
            <div className="align-center">
                <h1 className="font-serif text-5xl text-indigo-600 mt-40">Buy less, borrow more!</h1>
                <h4>From tools and camping equipment to household items and baby or party stuff, shareIt helps you borrow stuff from people in your neighborhood. Stop wasting money on something you only need to use once, and who knows, maybe you'll make new friends in the process!</h4>     
            </div>
            </div>
           <hr />

            <h3 className="text-indigo-700 font-serif text-center text-3xl mt-4 mb-5">Borrowing made simple.</h3>

            <div className="flex flex-row justify-center gap-2">

            <div className="flex flex-col items-center justify-self-center">
            <img className="mb-2 object-cover h-64 w-64" src="/../../../pictures/searching.jpg" />
            <h5 className="font-semibold">Find it</h5>
            <p className="w-50 text-center">Do you need something but don't want to buy it? Browse our catalog and borrow it from someone in your neighborhood.</p>

            </div>

            <div className="flex flex-col items-center justify-self-center">
            <img className="mb-2 object-cover h-64 w-64" src="/../../../pictures/Woman-drilling-007.jpg" />
            <h5 className="font-semibold">Use it</h5>
            <p className="w-50 text-center"> The item is yours for the period of time you have reserved it, take good care of it and make your projects come to life! </p>

            </div>

            <div className="flex flex-col items-center justify-self-center">
            <img className=" mb-2 object-cover h-64 w-64" src="/../../../pictures/calendar.jpeg" />
            <h5 className="font-semibold">Return it</h5>
            <p className="w-50 text-center">Please, always make sure to return the product on time so the owner (or other users) can use it. Then borrow something else! </p>

            </div>

            </div>

            <h3 className="text-indigo-700 font-serif text-center text-3xl mt-6 mb-5">Share your stuff and earn <i className="fas fa-coins    ">!</i></h3>
<div className="flex flex-row justify-center gap-2">

<div className="flex flex-col items-center justify-self-center">
<img className=" mb-2 object-cover h-64 w-64" src="/../../../pictures/takephoto.png" />
<h5 className="font-semibold">Upload your product</h5>
<p className="w-50 text-center">Take a picture, tell us about it and choose its borrowing conditions . </p>

</div>

<div className="flex flex-col items-center justify-self-center">
<img className="mb-2 object-cover h-64 w-64" src="/../../../pictures/givr.jpg" />
<h5 className="font-semibold">Lend your product</h5>
<p className="w-50 text-center">Check your product's requests, meet your neighbor and give them your item</p>

</div>

<div className="flex flex-col items-center justify-self-center">
<img className="mb-2 object-cover h-64 w-64" src="/../../../pictures/thumbsup.jpg" />
<h5 className="font-semibold">Earn credit!</h5>
<p className="w-50 text-center">With every product you upload you will earn <i className="fas fa-coins"></i> that you can use to borrow more stuff! </p>

</div>

</div>

         

        </div>
    )
}
