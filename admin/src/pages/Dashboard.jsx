import React, { useState,useEffect } from 'react'
import "./dashboard.css"
import { useContext } from 'react'
import { UserContext } from '../components/UserContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Dashboard = ({url}) => {
  const { user } = useContext(UserContext)
  const [category,setCategory]= useState([])
  const [orderStats,setOrderStats] = useState({})

  const fetchCategory= async ()=>{
    const response= await axios.get(`${url}/categories`);
    console.log(response)
    if(response.status===200){
    setCategory(response.data);
    }
    else{
      toast.error("Error fetching data")
    }
  }
  const fetchOrderStats= async ()=>{
    const response= await axios.get(`${url}/order-stats`);
    console.log(response)
    if(response.status===200){
    setOrderStats(response.data);
    }
    else{
      toast.error("Error fetching data")
    }
  }

  useEffect(()=>{
    fetchCategory()
    fetchOrderStats()
  },[])
  return (
    <div className='dashboard'>
      <h1>Welcome {user ? user.name : "Admin"}🙌🙂</h1>
      <p>Let's get back to work!</p>

      <div className="dashboard-layout">
        <div className='row'>
          <div className="orders">
            <h3>Total Orders</h3>
            <p className="orders-number">{orderStats.totalOrders}</p>
            <div className="order-status">
              <p>Processing</p>
              <p>{orderStats.processingOrders}</p>
            </div>
            <div className="order-status">
              <p>Out for Delivery</p>
              <p>{orderStats.outForDeliveryOrders}</p>
            </div>
            <div className="order-status">
              <p>Delivered</p>
              <p>{orderStats.completedOrders}</p>
            </div>
          </div>
          <div className="sales">
            <h3>Total Sales</h3>
            <p><span>Rs.</span>{orderStats.totalSales}</p>
          </div>
        </div>
        <div className="category">
          <h3>Categories</h3>
          <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Total Items</b>
          {/* <b>Category</b>
          <b>Price</b>
          <b>Action</b> */}
        </div>
        {category.map((item,index)=>{
          return (
            <div key={index} className="list-table-format">
              <img src={item.catimageurl} alt="" />
              <p>{item.catname}</p>
              <p>{item.itemcount}</p>
              {/* <div>
              <p onClick={()=>removeMenuItem(item.menuitemid)}><i class="fa-solid fa-trash-can"></i></p>
              <p  onClick={() => navigate(`/update/${item.menuitemid}`)}><i id='pencil-icon' className="fa-solid fa-pencil-alt "></i></p>
              </div> */}
            </div>
          )
        })}
      </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard