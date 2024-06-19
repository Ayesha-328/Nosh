import React,{useState,useRef,useEffect} from 'react'
import { NavLink, Link } from 'react-router-dom'

function Header() {
    const activeStyle = {
        textDecoration: "underline",
        color: "var(--primary-color)"
    }

    const [navOpen, setNavOpen] = useState(false)
    console.log(navOpen)

    function toggle() {
        setNavOpen(prevNavOpen => !prevNavOpen)
    }

    const ref = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (navOpen && ref.current && !ref.current.contains(event.target)) {
                setNavOpen(false);
            }
        };
        document.addEventListener("mousedown", handler)
        // CleanUp function
        return (() => {
            document.removeEventListener("mousedown", handler)
        })
    }, [navOpen])

    return (
        <nav ref={ref}>
            <div className="top-bar">
                <ul>
                    <li>
                        <i class="fa-solid fa-clock"></i>
                        <span>7:30 AM - 9:30 PM</span>
                    </li>
                    <li>
                        <i class="fa-solid fa-phone"></i>
                        <span>+880 1630 225 015</span>
                    </li>
                </ul>
            </div>
            <div className="navbar container">
                <div className="site-logo">
                    <img src="/assets/logo.png" alt="" />
                </div>
                <ul className={`${navOpen ? "display-menu" : ""} main-menu`}>
                    <li><NavLink
                        to="/"
                        style={({ isActive }) => isActive ? activeStyle : null}
                    >Home</NavLink></li>
                    <li><NavLink
                        to="/about"
                        style={({ isActive }) => isActive ? activeStyle : null}
                    >About</NavLink></li>
                    <li><NavLink
                        to="/menu"
                        style={({ isActive }) => isActive ? activeStyle : null}
                    >Menu</NavLink></li>
                    <li><NavLink
                        to="/contact"
                        style={({ isActive }) => isActive ? activeStyle : null}
                    >Contact</NavLink></li>
                </ul>
                <div className="side-menu-bar">
                    <NavLink to="/cart">
                        <div className="navbar-cart-btn">
                            <span className="navbar-cart-quantity">0</span>
                            <i class="fa-solid fa-cart-shopping"></i>
                        </div>
                    </NavLink>

                    <div className="navbar-delivery-container">
                        <div>
                            <h4>Delivery Order</h4>
                            <span>+880 1630 225 015</span>
                        </div>
                        <img src="/assets/delivery.png" alt="" />
                    </div>
                    <div className="navbar-order-btn">
                        <Link to="/menu"><button className="btn">Order Now!</button></Link>
                    </div>
                    <div onClick={toggle} className="toggle-btn">
            <i class="fa-solid fa-bars"></i>
                    </div>
                </div>
            </div>
            
        </nav>
    )
}

export default Header