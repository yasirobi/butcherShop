import React from "react";
import { Link } from "react-router-dom";

const AdminProductCard = ({ product }) => {
  return (
    <>
      <td>{product.name}</td>
      <td className="pro-img">
        <img
          src={`${process.env.REACT_APP_API}/uploads/${product.photo}`}
          alt="product"
        />
      </td>
      <td>{product.description.substring(0, 20)}</td>
      <td>{product.price} kr</td>
      <td>{product.quantity}</td>
      <td>{product.rating}</td>
      {/* <td>{product.category.name}</td> */}
      <td>
        <Link to={`/admin/product/update/${product._id}`}>Edit</Link>
      </td>
    </>
  );
};

export default AdminProductCard;
