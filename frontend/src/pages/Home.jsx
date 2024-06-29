import React, { useState, useEffect } from 'react';
import './home.css';

function Home() {

  return (
    <div className='body'>
      <div class="container1">
            <div class="content">
                <div class="text">
                    <p class="tagline">Best in Town</p>
                    <p class="description">ENJOY OUR CHICKEN <br/><span class="burger">BURGER </span>FAST FOOD</p>
                    <div class="button-container">
                        <button class="order-button">Order Now</button>
                        <span style={{color: "black"}} class="price">$10.50</span>
                    </div>
                </div>
            </div>
            <div class="image-carousel">
                <img id="img1" src="/assets/food_pic1.png" alt="food-img1" class="carousel-image"/>
                <img id="img2" src="/assets/food_pic2.jfif" alt="food-img2" class="carousel-image"/>
                <img id="img3" src="/assets/food_pic3.jfif" alt="food-img3" class="carousel-image"/>
                {/* <div class="ellipse-container">
                    <div class="ellipse" onclick="showImage(1)"></div>
                    <div class="ellipse" onclick="showImage(2)"></div>
                    <div class="ellipse" onclick="showImage(3)"></div>
                </div> */}
            </div>
        </div>
        <div class="logos">
            <div class="icon twitter"><i class="fa-br/ands fa-x-twitter"></i></div>
            <div class="icon facebook"><i class="fa-br/ands fa-facebook"></i></div>
            <div class="icon instagram"><i class="fa-br/ands fa-instagram"></i></div>
            <div class="icon linkedin"><i class="fa-br/ands fa-linkedin"></i></div>
        </div>
        <h3 className='h3'>Food Items</h3>
        <h2 className='h2'>Popular Dishes</h2>
        <div class="image-container">
            <img src="/assets/dish-pic1.png" alt="dish-pic1" />
            <img src="/assets/dish-pic2.png" alt="dish-pic2" />
            <img src="/assets/dish-pic3.png" alt="dish-pic3" />
            <img src="/assets/dish-pic4.png" alt="dish-pic4" />
            <img src="/assets/dish-pic5.png" alt="dish-pic5" />
        </div>
        <h3 className='h3'>RICH & HEALTHY</h3>
        <div class="container2">
            <div class="left">
                <img id="left-img" src="/assets/chef-img.png" alt="chef-img"/>
            </div>
            <div class="right">
                <h2 className='h2'>Highest quality artisangrains, proteins & seasonal ingredients</h2>
                <p>Righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure
                    of
                    the moment, so blinded by desires, that they cannot foresee.</p>
                <br/>
                <ul class="custom-list">
                    <li> Simple and easy to distinguish</li>
                    <br/>
                    <li> Pleasure to the moment, blind desire</li>
                    <br/>
                    <li> Able to do what we like the best</li>
                </ul>
                <img id="right-img" src="/assets/dish-pic6.png" alt="dish-pic6" class="img-end"/>
                <button style={{width: "25%"}} class="read-more">Read More</button>
            </div>
        </div>
        <br/><br/>
        <h1 className='h1'>Bigg Offer</h1>
        <p style={{textAlign: "center", fontWeight: "bolder", fontSize: "23px", color: "rgba(42, 67, 93, 1)"}}>For in this
            week,
            take your food,
            buy your best one.</p>
        <div class="image-container2">
            <img src="/assets/offer-pic1.png" alt="offer-pic1" />
            <img src="/assets/offer-pic2.png" alt="offer-pic2" />
            <img src="/assets/offer-pic3.png" alt="offer-pic3" />

        </div>

        <div class="container3">
            <h3 className='h3'>SPECIALS</h3>
            <h2 className='h2'>Check out our menu</h2>
            <p style={{textAlign: "center", fontWeight: "bolder", fontSize: "23px", color: "rgba(42, 67, 93, 1)"}}>Demoralized
                by
                the charms of
                pleasure of the moment so blinded except to some advantage.</p>

            <div class="button-container">
                <button class="red-button">BR/EAKFAST</button>
                <div class="separator"></div>
                <button class="transparent-button">LUNCH</button>
                <div class="separator"></div>
                <button class="transparent-button">DINNER</button>
                <div class="separator"></div>
                <button class="transparent-button">STARTER</button>
                <div class="separator"></div>
                <button class="transparent-button">BEVERAGES</button>
            </div>
        </div>
        <br/>
        <br/>
        <div class="our_Res">
            <div class="image-container">
                <img src="/assets/our_res_pic1.png" alt="Picture of our restaurant 1"/>
                <img src="/assets/our_res_pic2.png" alt="Picture of our restaurant 2"/>
                <img src="/assets/our_res_pic3.png" alt="Picture of our restaurant 3"/>
            </div>
            <div class="text-content">
                <h2 id="restaurant-title">Our Restaurant</h2>
                <h1 id="special-occasion">For every special occasion</h1>
                <h1 id="heritaste">there’s heritaste</h1>
                <p id="restaurant-description">Indignation and dislike men who are so beguiled demoralized by the charms
                    of
                    pleasure of the moment. SuccessStory.</p>

                <div id="success-story-section" class="section">
                    <div class="icon-with-text">
                        <div class="icon-ring">
                            <img src="/assets/growth_icon.png" alt="Glow-Icon" class="small-icon"/>
                        </div>
                        <h2 className='h2'>Success Story</h2>
                    </div>
                    <p>Certain circumstances and owing to the claims of duty obligations
                        of business it will frequently.</p>
                    <button class="read-more">Read More</button>
                </div>

                <div id="passionate-chefs-section" class="section">
                    <div class="icon-with-text">
                        <div class="icon-ring">
                            <img src="/assets/chef-logo.png" alt="Chef Icon" class="small-icon"/>
                        </div>
                        <h2 className='h2'>Passionate Chefs</h2>
                    </div>
                    <p>Duty or the obligations of business it frequently occur pleasures have
                        to be repudiated.</p>
                    <button class="read-more">Read More</button>
                </div>
            </div>
        </div>

        <div class="Delivery-container">
            <div class="left">
                <p id="delivery-p">Delivery</p>
                <p id="moment-delivery-p"><strong>A Moments Of<br/> <span id="color-text">Delivered On Right Time &
                            Place</span></strong><br/></p>
                <p>Food Khan is a restaurant, bar and coffee roastery located on a busy corner site in Farringdon's
                    Exmouth
                    Market. With glazed frontage on two sides of the building, overlooking the market and a bustling
                    London
                    inteon.</p>
                <div class="delivery-info">
                    <p id="delivery-order">Delivery order and number <img src="/assets/bike-pic.png" alt="bike-pic/"
                            class="bike-icon"/> <button class="Order-btn">Order Now</button></p>
                    <p id="number">+880 1630 225 015</p>
                </div>
            </div>
            <div class="middle"></div>
            <div class="Delivery-logo-img">
                <img src="/assets/food-delivery-pic.png" alt="Delivery-logo" class="delivery-image"/>
            </div>
        </div>
        <br/>
        <br/>
        <h3 className='h3'>Why We are the best</h3>
        <div class="info3">
            <div class="box">
                <div class="circle"></div>
                <img src="/assets/chef-logo.png" alt="chef-logo" class="logo"/>
                <h3 className='h3'>Passionate Chefs</h3>
                <p>Beguiled and demoralized by all get charms pleasure the moments ever so blinded by desire.</p>
                <button class="info3-btn">Read more</button>
            </div>
            <div class="box">
                <div class="circle"></div>
                <img src="/assets/dish-logo.png" alt="dish-logo" class="logo"/>
                <h3 className='h3'>100 % Fresh Foods</h3>
                <p id="box2-p">Beguiled and demoralized by all get charms pleasure the moments ever so blinded by
                    desire.
                </p>
                <button class="info3-btn special-btn">Read more</button>
            </div>
            <div class="box">
                <div class="circle white-circle"></div>
                <img src="/assets/candle-logo.png" alt="candle-logo" class="logo"/>
                <h3 className='h3'>Memorable Ambience</h3>
                <p>Beguiled and demoralized by all get charms pleasure the moments ever so blinded by desire.</p>
                <button class="info3-btn">Read more</button>
            </div>
        </div>
        <br/>
        <br/>
        <div class="testimonial">
            <h3 className='h3'>Testimonial</h3>
            <h2 className='h2'>Review form our guests</h2>
            <div class="container-home">
                <div class="guest">
                    <div class="testimonial-circle">
                        <img src="/assets/review_pic1.jpg" alt="Review_pic1"/>
                    </div>
                    <h2 className='h2'>Robert</h2>
                    <p>Also very good and so was the service. I had the mushroom risotto with scallops which was
                        awesome. My
                        wife had a burger over greens ...</p>
                    <div class="stars">
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                    </div>
                </div>
                <div class="guest">
                    <div class="testimonial-circle">
                        <img src="/assets/review_pic2.png" alt="Review_pic2"/>
                    </div>
                    <h2 className='h2'>Bernard</h2>
                    <p>Also very good and so was the service. I had the mushroom risotto with scallops which was
                        awesome. My
                        wife had a burger over greens ...</p>
                    <div class="stars">
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                    </div>
                </div>

                <div class="guest">
                    <div class="testimonial-circle">
                        <img src="/assets/review_pic3.jpg" alt="Review_pic3"/>
                    </div>
                    <h2 className='h2'>Leo</h2>
                    <p>Also very good and so was the service. I had the mushroom risotto with scallops which was
                        awesome. My
                        wife had a burger over greens ...</p>
                    <div class="stars">
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                    </div>
                </div>

                <div class="guest" style={{display: "none"}}>
                    <div class="testimonial-circle">
                        <img src="/assets/review_pic4.jfif" alt="Review_pic4"/>
                    </div>
                    <h2 className='h2'>Mark</h2>
                    <p>Also very good and so was the service. I had the mushroom risotto with scallops which was
                        awesome. My
                        wife had a burger over greens ...</p>
                    <div class="stars">
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                    </div>
                </div>

                <div class="guest" style={{display: "none"}}>
                    <div class="testimonial-circle">
                        <img src="/assets/review_pic5.jpg" alt="Review_pic5"/>
                    </div>
                    <h2 className='h2'>Ahmed</h2>
                    <p>Also very good and so was the service. I had the mushroom risotto with scallops which was
                        awesome. My
                        wife had a burger over greens ...</p>
                    <div class="stars">
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                    </div>
                </div>

                <div class="guest" style={{display: "none"}}>
                    <div class="testimonial-circle">
                        <img src="/assets/review_pic6.webp" alt="Review_pic6"/>
                    </div>
                    <h2 className='h2'>Zara</h2>
                    <p>Also very good and so was the service. I had the mushroom risotto with scallops which was
                        awesome. My
                        wife had a burger over greens ...</p>
                    <div class="stars">
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                    </div>
                </div>

                <div class="guest" style={{display: "none"}}>
                    <div class="testimonial-circle">
                        <img src="/assets/review_pic7.jpg" alt="Review_pic7"/>
                    </div>
                    <h2 className='h2'>kami</h2>
                    <p>Also very good and so was the service. I had the mushroom risotto with scallops which was
                        awesome. My
                        wife had a burger over greens ...</p>
                    <div class="stars">
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                    </div>
                </div>

                <div class="guest" style={{display: "none"}}>
                    <div class="testimonial-circle">
                        <img src="/assets/review_pic8.jpg" alt="Review_pic8"/>
                    </div>
                    <h2 className='h2'>umaiza</h2>
                    <p>Also very good and so was the service. I had the mushroom risotto with scallops which was
                        awesome. My
                        wife had a burger over greens ...</p>
                    <div class="stars">
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                    </div>
                </div>

                <div class="guest" style={{display: "none"}}>
                    <div class="testimonial-circle">
                        <img src="/assets/review_pic9.jpg" alt="Review_pic9"/>
                    </div>
                    <h2 className='h2'>Zain</h2>
                    <p>Also very good and so was the service. I had the mushroom risotto with scallops which was
                        awesome. My
                        wife had a burger over greens ...</p>
                    <div class="stars">
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                        <span class="star">&#9733;</span>
                    </div>
                </div>
            </div>
            <div class="dots">
                <span class="dot active"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        </div>
        <br/>
        <br/>
        <h1 className='h1'>Our Branch</h1>
        <div class="container5">
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
    </div>
  );
}

export default Home;
