import React,{useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "../App.css";
import data from "../data";
import MenuModal from "../components/MenuModal"
import {Link } from "react-scroll"


function Menu() {
  const [modal, setModal] = useState(false);
  const [modalItemId, setModalItemId] = useState(null);
  console.log(modalItemId)

  const menuItem = modalItemId !== null ? data.menu.flatMap(category => category.items).find(item => item.id === modalItemId) : null;

  function toggleModal(id) {
    setModalItemId(id === modalItemId ? null : id);
  }

  if (modalItemId !== null) {
    // Disable scrolling when modal is open
    document.body.style.overflow = 'hidden';
  } else {
    // Enable scrolling when modal is closed
    document.body.style.overflow = 'auto';
  }

  function handleClose() {
    setModalItemId(null);
  }

  const categoryElement = data.menu.map(catg => (
    <SwiperSlide key={catg.category}>
        {console.log("Category Nav: " + catg.category)}
        <Link 
      activeClass="active" 
      to={catg.category} 
      spy={true} 
      smooth={true} 
      duration={500} 
      offset={50}
    >
<div className="category-box">
        <img src={catg.image} alt="" className="category-img" />
        <span className="category-title">{catg.category}</span>
      </div>
    </Link>
      
    </SwiperSlide>
  ));

  const menuCategory = data.menu.map(menuCategory => (
    <section key={menuCategory.category} id={menuCategory.category} className="category container">
      <img src="/assets/category-banner.png" alt="" className="catg-banner" />
      <div className="menu-items-container">
        {menuCategory.items.map(menuItem => (
          <div onClick={() => toggleModal(menuItem.id)} key={menuItem.id} className="menu-item">
            <div className="menu-item-img">
              <img src={menuItem.image} alt={menuItem.name} />
            </div>
            <div className="menu-item-details">
              <h3 className="menu-item-title">{menuItem.name}</h3>
              <span className="menu-item-price">Rs. {menuItem.price}</span>
              <p className="menu-item-desc">{menuItem.description}</p>
              <button className="cart-btn">
                <i className="fa-solid fa-cart-arrow-down"></i> Add to cart
              </button>
            </div>
            {modalItemId === menuItem.id && (
              <MenuModal menuItem={menuItem} handleClose={handleClose} />
            )}
          </div>
        ))}
      </div>
    </section>
  ));

  return (
    <div className="main-container">
      <div className="menu-hero">
        <h1 className="main-heading">Menu</h1>
        <h3 className="sub-heading">Read our Story, How we started and about our Team</h3>
      </div>

      <nav className="category-nav">
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          freeMode={true}
          navigation={{ clickable: true }}
          modules={[FreeMode, Navigation]}
          className="mySwiper"
        >
          {categoryElement}
        </Swiper>
      </nav>

      {menuCategory}
    </div>
  );
}

export default Menu;
