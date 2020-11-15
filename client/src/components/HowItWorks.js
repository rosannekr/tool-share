import React from 'react'

export default function HowItWorks() {
    return (
        <div className="container mt-4 mb-5">

            <div className="picTextContainer">
            <img className="img-fluid w-50 mb-2" src="/../../../pictures/neighbors-balcony.jpg" />
            <div className="text-container">
                <h1 className="mt-3">Buy less, borrow more!</h1>
                <h4>From tools and camping equipment to household items and baby or party stuff, "toolshare" helps you borrow stuff from people in your neighborhood. Stop wasting money on something you only need to use once, and who knows, maybe you'll make new friends in the process!</h4>     
            </div>
            </div>
           <hr />

            <h3 className="text-warning text-center mt-4 mb-5">Borrowing made simple.</h3>

            <div className="howToCardContainer">

            <div className="howToCard">
            <img className="img-fluid mb-2 stepPic" src="/../../../pictures/searching.jpg" />
            <h5>Find it</h5>
            <p className="w-50 text-center">Do you need something but don't want to buy it? Browse our catalog and borrow it from someone in your neighborhood.</p>

            </div>

            <div className="howToCard">
            <img className="img-fluid  mb-2 stepPic" src="/../../../pictures/Woman-drilling-007.jpg" />
            <h5>Use it</h5>
            <p className="w-50 text-center"> The item is yours for the period of time you have reserved it, take good care of it and make your projects come to life! </p>

            </div>

            <div className="howToCard">
            <img className="img-fluid mb-2 stepPic" src="/../../../pictures/calendar.jpeg" />
            <h5>Return it</h5>
            <p className="w-50 text-center">Please, always make sure to return the product on time so the owner (or other users) can use it. Then borrow something else! </p>

            </div>

            </div>

            <h3 className="text-warning text-center mt-4 mb-5">Share your stuff and earn <i className="fas fa-coins    ">!</i></h3>
<div className="howToCardContainer">

<div className="howToCard">
<img className="img-fluid stepPic mb-2" src="/../../../pictures/takephoto.png" />
<h5>Upload your product</h5>
<p className="w-50 text-center">Take a nice picture, tell us about it and choose for how long people can borrow it and even its cost in  <i className="fas fa-coins"></i> . </p>

</div>

<div className="howToCard">
<img className="img-fluid stepPic mb-2" src="/../../../pictures/givr.jpg" />
<h5>Lend your product</h5>
<p className="w-50 text-center">Check your product's requests, meet your neighbor and give them your item</p>

</div>

<div className="howToCard">
<img className="img-fluid stepPic mb-2" src="/../../../pictures/thumbsup.jpg" />
<h5>Earn credit!</h5>
<p className="w-50 text-center">With every product you upload you will earn <i className="fas fa-coins"></i> that you can use to borrow more stuff! </p>

</div>

</div>

         

        </div>
    )
}
