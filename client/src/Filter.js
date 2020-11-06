import React, { useState, useEffect } from "react";

export default function Filter() {
    let [categories, setCategories] = useState("");
    let [items, setItems] = useState([]);

    useEffect(() => {
  
        getCategories();

      }, []);


      const getCategories = () => {
        fetch(`/categories`)
          .then(response => response.json())
          .then(response => {
            setCategories(response);
          });
      };

      const filterByCategory = (id) => {

        fetch(`categories/${id}/products`)
          .then(response => response.json())
          .then(response => {
            response.length > 0 && setItems(response);
          });
      };
    

    return (
        <div>
            <ul>
    { categories && categories.map(category => <li key={category.id} style={{display: "inline"}} onClick={() => filterByCategory(category.id)}>{category.name}  </li> )}
            </ul>

        <ul>
    {items && items.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
        </div>

    )
}
