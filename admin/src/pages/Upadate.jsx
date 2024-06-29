import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import "./add.css"

const Update = ({ url }) => {
    const { id } = useParams();
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    price: '',
    category: ''
  });

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await axios.get(`${url}/list/${id}`);
        if (response.status === 200) {
            const data=response.data;
            console.log(response.data)
          setFormData({
            name:data.itemname,
            description:data.itemdescription,
            imageUrl:data.itemimageurl,
            category:data.category,
            price:data.price
          });
        } else {
          toast.error("Error fetching menu item details");
        }
      } catch (err) {
        toast.error("Error fetching menu item details");
      }
    };
    fetchMenuItem();
  }, [id, url]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${url}/list/${id}`, {
        itemName:formData.name,
        itemDescription:formData.description,
        itemImageUrl:formData.imageUrl,
        category:formData.category,
        price:formData.price
      });
      if (response.status === 200) {
        toast.success("Menu item updated successfully");
        navigate('/list');
      } else {
        toast.error("Error updating menu item");
      }
    } catch (err) {
      toast.error("Error updating menu item");
    }
  };

  const categoryOptions=[
    "biryani","Deals","Fast food","Starters", "Desserts","Beverages"
]
const categoryOptionElement=categoryOptions.map(option=>{
    return <option key={option} value={option}>{option}</option>
})

  return (
    <div className="add">
        <h2>Update Menu Item</h2>
            <form className='flex-col' onSubmit={handleSubmit}>
                <div className="add-img-upload flex-col">
                    <p>Image Preview</p>
                    <label htmlFor="image">
                        <img src={formData.imageUrl?formData.imageUrl:assets.upload_area} alt="" />
                    </label>
                    
                </div>

                <div className="add-product-name flex-col">
                    <p>Product Image Url</p>
                    <input onChange={handleChange} type="text" name="imageUrl" value={formData.imageUrl} placeholder='Paste the URL here' />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={handleChange} type="text" name="name" value={formData.name} placeholder='Type here' />
                </div>

                <div className="add-product-desc flex-col">
                    <p>Product description</p>
                    <textarea onChange={handleChange} value={formData.description} name="description" rows="6" placeholder='Write content here' required></textarea>
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={handleChange} name="category" value={formData.category}>
                            {categoryOptionElement}
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={handleChange} value={formData.price} type="number" name="price" id="" placeholder='Rs. 345'/>
                    </div>
                </div>

                <button type="submit" className='add-btn'>Update</button>
            </form>
        </div>
  );
};

export default Update;
