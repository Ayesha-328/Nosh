import React, { useState } from 'react';

function MenuModal({ menuItem, handleClose }) {
    const [count, setCount]=useState(1);
    const [formData, setFormData] = useState({
        "instructions": ""
    })
    // console.log(formData)

    function handleChange(e){
        e.preventDefault();
        const{name,value}=e.target;
       setFormData(prevFormData=>{
        return {
            [name]:value
        }
       })
    }

    function increaseCount(){
        setCount(prevCount=> prevCount+1);
    }
    function decreaseCount(){
        setCount(prevCount=> prevCount-1);
    }

  // Prevent the modal from closing when clicking inside the modal container
  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="menu-modal" onClick={handleClose}>
      <div className="menu-modal-container" onClick={handleContainerClick}>
        <i onClick={handleClose} className="fa-solid fa-circle-xmark"></i>
        <div className='menu-modal-wrapper'>
        <div className="menu-modal-img">
          <img src={menuItem.image} alt={menuItem.name} />
        </div>

        <div className="menu-modal-details">
          <h2 className="menu-modal-title">{menuItem.name}</h2>
          <span className="menu-modal-price">Rs.{menuItem.price}</span>
          <p className="menu-modal-desc">{menuItem.description}</p>

          <label htmlFor="instructions">Special Instructions for the chef</label>
          <textarea onChange={handleChange} name="instructions" id="instructions"></textarea>
        </div>

        </div>
        <div className="menu-modal-cart">
            <div className="counter-container">
                <button onClick={count>1 ? decreaseCount : null} className="menu-modal-cart-quantity cart-minus"><i class="fa-solid fa-minus"></i></button>
                <span className="cart-quantity-count">{count}</span>
                <button onClick={increaseCount} className="menu-modal-cart-quantity cart-plus"><i class="fa-solid fa-plus"></i></button>
            </div>

            <button className="modal-cart-btn">Add to cart <span>Rs.{menuItem.price * count}</span></button>
        </div>
      </div>
    </div>
  );
}

export default MenuModal;
