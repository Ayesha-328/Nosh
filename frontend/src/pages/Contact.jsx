import React from 'react'
import "./contact.css"

function Contact() {
  return (
    <>
    <div class="image-container">
    <img src="/assets/food_img.png" alt="Background Image"/>
    <div class="content">
        <h2>CONTACT US</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat
            massa sit amet metus mattis, insodales odio consectetur. Ut condimentum
            felis vitae enim sodales, id tempor orci cursus. Duis hendrerit
            nulla nec ligula luctus, in volutpat metus scelerisque.</p>
    </div>
</div>
<div class="container-s">
    <div class="info">
        <h3 className='h3'>ADDRESS</h3>
        <p><i class="fa-solid fa-location-dot"></i>28 Seventh Avenue, New York, 10014</p>
        <div class="icon location"></div>
        <p><i class="fa-solid fa-phone"></i>+880 1630 225 015</p>
        <div class="icon mail"></div>
        <p><i class="fa-solid fa-envelope"></i>resturents@gmail.com</p>
    </div>
    <div class="info">
        <h3 className='h3'>WORKING HOURS</h3>
        <p><i class="fa-solid fa-clock"></i>7:30 AM - 9:30 PM</p>
        <div class="icon watch"></div>
    </div>
    <div class="info">
        <h3 className='h3'>FOLLOW US</h3>
        <div class="social-icons">
            <div class="icon twitter"><i class="fa-brands fa-x-twitter"></i></div>
            <div class="icon facebook"><i class="fa-brands fa-facebook"></i></div>
            <div class="icon instagram"><i class="fa-brands fa-instagram"></i></div>
            <div class="icon linkedin"><i class="fa-brands fa-linkedin"></i></div>
        </div>
    </div>
    <img src="/assets/map.png" alt="map img" class="image-right"/>
</div>
<br/>
<br/>
<br/>
<h1 className='h1'>Our Branch</h1>
<div class="container2">
    <div class="info2">
        <p>RobertFood</p>
        <p><i class="fa-solid fa-location-dot"></i>123 Main St, New York</p>
        <p><i class="fa-solid fa-clock"></i>Monday - Friday: 9am - 5pm</p>
        <p><i class="fas fa-phone"></i>+1 123-456-7890</p>
        <a href="#">Click to view on Google Maps</a>
    </div>
    <div class="info2">
        <p>MarkAReadFood</p>
        <p><i class="fa-solid fa-location-dot"></i>456 Oak St, New York</p>
        <p><i class="fa-solid fa-clock"></i>Monday - Friday: 9am - 6pm</p>
        <p><i class="fas fa-phone"></i>+1 987-654-3210</p>
        <a href="#">Click to view on Google Maps</a>
    </div>
    <div class="info2">
        <p>CarryKHillFood</p>
        <p><i class="fa-solid fa-location-dot"></i>789 Elm St, New York</p>
        <p><i class="fa-solid fa-clock"></i>Monday - Friday: 10am - 7pm</p>
        <p><i class="fas fa-phone"></i>+1 555-123-4567</p>
        <a href="#">Click to view on Google Maps</a>
    </div>
</div>
    </>
    
  )
}

export default Contact