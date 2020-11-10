import React, { useState, useEffect } from "react";
import {updateProduct } from "../services/requests";
import { Link } from "react-router-dom";
import { getProfile } from "../services/requests";
import axios from "axios";

export default function ProductList(props) {
 const [user, setUser] = useState({});

    // Fetch user data when component mounts
    useEffect(() => {
      const fetchData = async () => {
        const res = await getProfile();
        setUser(res.data);
        console.log(res.data)
      };
      fetchData();
    }, []);
  


    let makeAvailable = async (id) => {

        try {
          await updateProduct(id, { isAvailable: true });
        } catch (error) {
          console.log(error);
        }
      };

    let deleteItem = async (id) => {
        try{
          const {data} = await axios.delete("/products/" + id)
        }
        catch(err){
          console.log(err)
        }
    }



  return (
    <div className="container">
      <ul className="list-group">
        <li class="list-group-item list-group-item-info d-flex justify-content-center">
          Owned stuff
        </li>
        {user.Products ? (
          user.Products.map((item) => (
            <li className="list-group-item">
              <Link to={`/product/${item.id}`}>{item.name}</Link> |
              {!item.isAvailable && (
                <span className="ml-1">
                  Mark as returned
                  <i className="fa fa-check ml-2 mr-1 cursor" aria-hidden="true" onClick={id => makeAvailable(item.id)}></i> |{" "}
                </span>
              )}
              <span className="ml-1">
                Edit<i className="fa fa-edit ml-2 mr-1" aria-hidden="true"></i>|
              </span>
              <span className="ml-1">
                Delete<i className="fa fa-times ml-2 cursor" aria-hidden="true" onClick={id => deleteItem(item.id)}></i> |
              </span>
            </li>
          ))
        ) : (
            <li className="list-group-item"> You have no items. <Link to={`/products/upload`}>Upload a product and start earning <i className="fas fa-coins"></i></Link> </li>
        )}
      </ul>
    </div>
  );
}
