import React, { useEffect, useState } from 'react'
import "./orders.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({url,token}) => {
  const [orders,setOrders]= useState([]);

  const fetchAllOrders= async()=>{
    const response=await axios.get(`${url}/orders`,{
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });
    if(response.status===200){
      setOrders(response.data);
    }
    else{
      toast.error("There was an error fetching orders.Try again!")
    }
  }

  const statusHandler=async(e,orderId)=>{
    const {value}= e.target;
    // console.log(value)
    const response=await axios.put(`${url}/orders/${orderId}`,{
      ostatus:value
    },
    {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })

    if(response.status===200){
      await fetchAllOrders();
      toast.success("Order status successfully updated")
    }
    else{
      toast.error("There was an error updating order status.Try again!")
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[])
  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item,index)=>{
                  if(index===order.items.length-1){
                    return item.itemName + " x " + item.quantity
                  }
                  else{
                    return item.itemName + " x " + item.quantity + ", "
                  }
                })}
              </p>
              <p className="order-item-name">Ayesha</p>
              <div className="order-item-address">
                <p>street, </p>
                <p>city, State, country, 12345</p>
              </div>
              <p className="order-item-phone">123456789
              </p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>Amount : Rs.{order.totalprice}</p>
            <select value={order.ostatus} onChange={(e)=>{statusHandler(e,order.orderid)}}>
              <option value="Processing">Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default Orders