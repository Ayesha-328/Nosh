import React, { useEffect, useState } from 'react'
import "./list.css"
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const List = ({url,token}) => {
  
  const [list,setList] = useState([]);
  const navigate = useNavigate();

  const fetchList= async ()=>{
    const response= await axios.get(`${url}/list`,{
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });
    // console.log(response)
    if(response.status===200){
      setList(response.data);
    }
    else{
      toast.error("Error fetching data")
    }
  }

  const removeMenuItem = async(itemId)=>{
    const response= await axios.delete(`${url}/list/${itemId}`,{
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
    await fetchList();
    if(response.status===200){
      toast.success("Menu item has been successfully deleted")
    }
    else{
      toast.error("There was an error deleting the item. Try again!")
    }
  }

  useEffect(()=>{
    fetchList()
  },[])
  return (
    <div className="list add flex-col">
      <p>All Menu Items List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div key={index} className="list-table-format">
              <img src={item.itemimageurl} alt="" />
              <p>{item.itemname}</p>
              <p>{item.itemdescription}</p>
              <p>{item.category}</p>
              <p>Rs.{item.price}</p>
              <div>
              <p onClick={()=>removeMenuItem(item.menuitemid)}><i class="fa-solid fa-trash-can"></i></p>
              <p  onClick={() => navigate(`/update/${item.menuitemid}`)}><i id='pencil-icon' className="fa-solid fa-pencil-alt "></i></p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List