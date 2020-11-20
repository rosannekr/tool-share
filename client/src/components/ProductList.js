
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditPopUp from "./EditPopUp";
import { getProfile, updateProduct } from "../services/requests";
import axios from "axios";
 
export default function ProductList(props) {
 const [user, setUser] = useState({});
 const [show, setShow] = useState(false);
 const [productId, setProductId] = useState("");
 const [update, setUpdate] = useState(false);
 
 
 let showPopUp = (id) => {
   setProductId(id);
   setShow(true);
 };
 
 let hidePopUp = (id) => {
   setProductId(id);
   setShow(false);
 };
 
 // Fetch user data when component mounts
 useEffect(() => {
   fetchData();
 }, [update]);
 
 const fetchData = async () => {
   const res = await getProfile();
   setUser(res.data);
  };
 
 
 let returnProduct = async (id) => {
   try {
     const { data } = await axios.delete("/borrowed/" + id);
   } catch (err) {
     console.log(err);
   }
 };
 
 let deleteItem = async (id) => {
   try {
     const { data } = await axios.delete("/products/" + id);
   } catch (err) {
     console.log(err);
   }
   setUpdate(true);
 };
 
 return (
   <div className="container mx-24">
    

      
          <ul className="px-0">
       
 <li className="border list-none rounded-sm px-3 py-3 from-purple-400 to-indigo-500 bg-gradient-to-r text-white">Owned stuff</li>

 {  !props.show &&
 (<EditPopUp
       show={show}
       handleClose={hidePopUp}
       productId={productId}
       callback1={hidePopUp}
       callback2={() => setUpdate(true)}
     />) }
       {user.Products && user.Products.length ? (
          user.Products.map((item) => (
           <li className="border list-none rounded-sm px-3 py-3" > <Link to={`/product/${item.id}`} className="font-bold">{item.name}</Link> |
           
           <span className="ml-1">
             Edit
             <i
               className="fa fa-edit ml-2 mr-1 cursor"
               aria-hidden="true"
               onClick={(id) => showPopUp(item.id)}
             ></i>
             |
           </span>
           <span className="ml-1">
             Delete
             <i
               className="fa fa-times ml-2 cursor text-indigo-700"
               aria-hidden="true"
               onClick={(id) => deleteItem(item.id)}
             ></i>{" "}
             |
           </span></li>
         ))
       ) : (
         <li className="list-group-item">
           {" "}
           You have no items.{" "}
           <Link to={`/products/upload`}>
             Upload a product and start earning{" "}
             <i className="fas fa-coins"></i>
           </Link>{" "}
         </li>
       )}
      
     </ul>

   </div>
 
 
 
 
 
 );
       }
