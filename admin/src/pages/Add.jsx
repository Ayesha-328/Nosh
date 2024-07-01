import React, { useState } from 'react'
import "./add.css"
import { assets } from '../assets/assets'
import { toast } from 'react-toastify';
import axios from "axios"


const Add = ({url,token}) => {
    const [image,setImage] = useState(false)
    const [formData,setFormData] = useState({
        name:"",
        description:"",
        imageUrl:"",
        price:"",
        category:"Deals"
    })

    function onChangeHandler(e){
        e.preventDefault();
        const {name,value} = e.target;
        setFormData(prevFormData=>(
            {...prevFormData,
                [name]:value
            }
        )
        )
    }

    const onSubmitHandler = async (e)=>{
        e.preventDefault();
        try {
            const body={
                itemName:formData.name,
                itemDescription:formData.description,
                itemImageUrl:formData.imageUrl,
                category:formData.category,
                price:formData.price
            }
            // const token = localStorage.getItem('token');
            const response = await fetch(`${url}/add`,{
                method:"POST",
                headers:{
                    "Content-type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body:JSON.stringify(body)
            })
            if(response.status===200){
                setImage(false)
                setFormData({
                    name:"",
                    description:"",
                    imageUrl:"",
                    price:"",
                    category:"Deals"
                })
                toast.success("Menu item added successfully!")
            }
        } catch (err) {
            console.error(err.message)
            toast.error("There was an error adding item. Please try again!")
        }
        
    } 

    function handleImage(e){
        e.preventDefault();
        setImage(e.target.files[0])
    }

    const categoryOptions=[
        "biryani","Deals","Fast food","Starters", "Desserts","Beverages"
    ]
    const categoryOptionElement=categoryOptions.map(option=>{
        return <option key={option} value={option}>{option}</option>
    })
    return (
        <div className="add">
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Image Preview</p>
                    <label htmlFor="image">
                        <img src={formData.imageUrl?formData.imageUrl:assets.upload_area} alt="" />
                    </label>
                    {/* <input 
                    type="file" 
                    onChange={handleImage}
                    hidden 
                    id="image" /> */}
                </div>

                <div className="add-product-name flex-col">
                    <p>Product Image Url</p>
                    <input onChange={onChangeHandler} type="text" name="imageUrl" value={formData.imageUrl} placeholder='Paste the URL here' />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} type="text" name="name" value={formData.name} placeholder='Type here' />
                </div>

                <div className="add-product-desc flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={formData.description} name="description" rows="6" placeholder='Write content here' required></textarea>
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category" value={formData.category}>
                            {categoryOptionElement}
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={formData.price} type="number" name="price" id="" placeholder='Rs. 345'/>
                    </div>
                </div>

                <button type="submit" className='add-btn'>Add Item</button>
            </form>
        </div>
    )
}

export default Add