import React,{useEffect} from 'react'
import "../App.css"
import { Link } from 'react-router-dom';

// import aboutContent from '../pages/about/about.html';

function About() {

    useEffect(() => {
        // Run your JavaScript after the component has been rendered
        console.log("UseEffect is running");

        const slider = document.querySelector('.slider');
        const slides = document.querySelector('.slides');
        const dots = document.querySelectorAll('.dot');

        // console.log('Slider:', slider);
        // console.log('Slides:', slides);
        // console.log('Dots:', dots);

        if (!slider || !slides || !dots.length) {
            console.error('One or more required elements are missing');
            return;
        }

        let currentSlide = 0;

        function showSlide(index) {
            const slideCount = slides.children.length;
            const sliderWidth = slider.clientWidth;
            slides.style.transform = `translateX(${-index * (sliderWidth / slideCount) * slideCount}px)`;
            
            dots.forEach((dot) => dot.classList.remove('active'));
            dots[index].classList.add('active');
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                console.log('Dot clicked:', index);
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Show initial slide
        showSlide(currentSlide);

    }, []); 
  return (
    <div className="main-container">
        <div className="about-hero">
            <h1 className="main-heading">About Us</h1>
            <h3 className="sub-heading">Read our Story, How we started and about our Team</h3>
        </div>

        {/* <!-- <div className="container"> --> */}
            <section className="about-section-1 container">
                <div className="about-img-wrapper">
                    <img src="/assets/image_about_1.png" alt=""/>
                </div>

                <div className="about-desc">
                    <div className="para1">
                        Opaleye yellowtail snapper, velvet catfish, graveldiver banded killifish, Old World rivuline catalufa eagle ray Moorish idol. Herring smelt barbeled dragonfish, tommy ruff. 
                    </div>

                    <div className="para2">
                        Queen danio velvet catfish Sacramento blackfish, bullhead shark, Colorado squawfish Russian sturgeon clown triggerfish swamp-eel paradise fish. Hake cookie-cutter shark silver carp hawkfish snipe eel armorhead catfish, moray eel silverside! Bluegill toadfish, orangespine unicorn fish. Manta Ray Moorish idol
                    </div>
                </div>
            </section>

            <section className="about-section-2 container">
                <h2 className="section-main-heading">Our Story</h2>
                <div className="about-content">
                    <div className="about-story-desc">
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passage.
                        </p>
                    </div>
                    <div className="about-story-img-wrapper">
                        <img src="/assets/image_about_1.png" alt="Our Story"/>
                    </div>
                </div>
            </section>

            <div className="section-wrapper">
                <section className="about-section-3 container">
                    <div className="about-chef-desc">
                        <h3 className="section-sub-heading">TASTY AND CRUNCHY</h3>
                        <h2 className="section-main-heading">Our Chef</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidition ullamco laboris nisi ut aliquip ex ea commodo condor consectetur adipiscing elit, sed do eiusmod tempor incidition ullam.</p>
                        <Link to="/menu"><button className="btn">VIEW OUR ALL MENU</button></Link>
                    </div>
    
                    <div className="about-chef-img-wrapper">
                        <img src="/assets/image_ourChef.png" alt=""/>
                    </div>
                </section>
            </div>


            <section className="about-section-4 container">
                <h2 className="section-main-heading">Special Service</h2>
                <h3 className="sub-heading">What Special services we are offering now</h3>

                <div className="slider">
                    <div className="slides">
                        <div className="slide">
                            <div className="about-service-container">
                                <i className="fa-solid fa-truck"></i>
                                <div className="section-main-heading">Food Delivery and Takeout</div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                            </div>
                        </div>
                        <div className="slide">
                            <div className="about-service-container">
                                <i className="fa-solid fa-champagne-glasses"></i>
                                <div className="section-main-heading">Wedding Party</div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                            </div>
                        </div>
                        <div className="slide">
                            <div className="about-service-container">
                                <i className="fa-solid fa-cake-candles"></i>
                                <div className="section-main-heading">Birthday Party</div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                            </div>
                        </div>
                        <div className="slide">
                            <div className="about-service-container">
                                <i className="fa-solid fa-utensils"></i>
                                <div className="section-main-heading">Privite Dining</div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                            </div>
                        </div>
                        <div className="slide">
                            <div className="about-service-container">
                                <i className="fa-solid fa-gifts"></i>
                                <div className="section-main-heading">Event hosting</div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                            </div>
                        </div>
                    </div>
                    <div className="dots">
                        <span className="dot" data-slide="0"></span>
                        <span className="dot" data-slide="1"></span>
                        <span className="dot" data-slide="2"></span>
                        <span className="dot display-none-lg" data-slide="3"></span>
                        <span className="dot display-none-lg" data-slide="4"></span>
                    </div>
                </div>
            </section>


            <section className="about-section-5 container">
                <h2 className="section-main-heading">Our Team</h2>
                <h3 className="sub-heading">The Hardworking Team behind the restaurant</h3>
                <div className="about-team-container">
                    <div className="about-team-hero">
                        <div className="about-team-img-wrapper">
                            <img src="/assets/image_ourTeam_1.png" alt=""/>
                        </div>
                        <div className="about-team-desc">
                            <h3 className="section-sub-heading">Brain Adams</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
                                Lorem ipsum dolor  sit
                                amet</p>
                        </div>
                        <div className="social-links">
                            <i className="fa-brands fa-facebook"></i>
                            <i className="fa-brands fa-instagram"></i>
                            <i className="fa-brands fa-x-twitter"></i>
                            <i className="fa-brands fa-linkedin-in"></i>
                        </div>
                    </div>
                    <div className="about-team-hero">
                        <div className="about-team-img-wrapper">
                            <img src="/assets/image_ourTeam_2.png" alt=""/>
                        </div>
                        <div className="about-team-desc">
                            <h3 className="section-sub-heading">Brain Adams</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
                                Lorem ipsum dolor  sit
                                amet</p>
                        </div>
                        <div className="social-links">
                            <i className="fa-brands fa-facebook"></i>
                            <i className="fa-brands fa-instagram"></i>
                            <i className="fa-brands fa-x-twitter"></i>
                            <i className="fa-brands fa-linkedin-in"></i>
                        </div>
                    </div>
                    <div className="about-team-hero">
                        <div className="about-team-img-wrapper">
                            <img src="/assets/image_ourTeam_3.png" alt=""/>
                        </div>
                        <div className="about-team-desc">
                            <h3 className="section-sub-heading">Brain Adams</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
                                Lorem ipsum dolor  sit
                                amet</p>
                        </div>
                        <div className="social-links">
                            <i className="fa-brands fa-facebook"></i>
                            <i className="fa-brands fa-instagram"></i>
                            <i className="fa-brands fa-x-twitter"></i>
                            <i className="fa-brands fa-linkedin-in"></i>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    // </div>
  )
}

export default About