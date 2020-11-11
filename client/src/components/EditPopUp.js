import React, { useState, useEffect } from "react";
import {updateProduct} from "../services/requests";
import axios from "axios";

export default function EditPopUp({ handleClose, show, productId }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  let [item, setItem] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [NumOfDaysAvailable, setNumOfDaysAvailable] = useState(0);

  useEffect(() => {
    getOneProduct();
  }, [productId]);

  let getOneProduct = () => {
    axios.get(`/products/${productId}`, {}).then(
      (response) => {
        setItem(response.data);
        setName(response.data.name);
        setDescription(response.data.description);
        setNumOfDaysAvailable(response.data.NumOfDaysAvailable);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  let editProduct = async () => {

    try {
      let id = item.id
      await updateProduct(id, {name, description, NumOfDaysAvailable});
    } catch (error) {
      console.log(error);
    }
  } 


  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <p className="text-right" onClick={handleClose}>
          <i class="fa fa-times mr-2 text-danger cursor" aria-hidden="true"></i>
        </p>
        <p></p>
        <form>
          <label>
            <i className="fas fa-edit"> </i> name
          </label>
          <input
            type="text"
            className="mb-3 mr-2 ml-2 text-center"
            placeholder={item && item.name}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label>
            <i className="fas fa-edit"> </i> description
          </label>
          <textarea
            type="text"
            className="mb-3 mr-2 ml-2 text-center"
            placeholder={item && item.description}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <label>
            {" "}
            <i className="fas fa-edit"> </i> days product can be borrowed for
          </label>
          <input
            type="number"
            className="mb-3 mr-2 ml-2 text-center"
            placeholder={item && item.numOfDaysAvailable}
            onChange={(e) => setNumOfDaysAvailable(e.target.value)}
            value={NumOfDaysAvailable}
          />
          <button className="btn btn-dark btn-block" onChange={editProduct}>Update item</button>
        </form>
      </section>
    </div>
  );
}


