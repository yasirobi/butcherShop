import React from 'react'
import '../styles/products.css'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';


const ProductCard = ({productsList}) => {

    const {name, photo, price,id, rating } = productsList
  return (

    <>
    <div className="product-grid2">
          <div className="product-image2">
            <img className="pic-1" src={`${process.env.REACT_APP_API}/uploads/${photo}`} alt="products" />
            
            <ul className="social">
              <li>
                <Link to={`/product/${id}`} data-tip="Quick View">
                  <i className="fa fa-eye"></i>
                </Link>
              </li>
              <li>
                <Link to="#" data-tip="Add to Cart">
                  <i className="fa fa-shopping-cart"></i>
                </Link>
              </li>
            </ul>
          </div>
          <div className="product-content">
            <h3 className="title">
              <Link to="#">{name}</Link>
            </h3>

            <div className="rating-outer">
              <div
                className="rating-inner" >
               <ReactStars
                  count={5}
                  // onChange={ratingChanged}
                  size={24}
                  ratings={`${(rating / 5) * 100}%`}
                  activeColor="#ffd700"
                  color="#aa1936"
                />
             </div>
            </div>
            {/* <span className="no_of_reviews">({numOfReviews} Reviews)</span> */}
            <h3>$ {price}</h3>
          </div>
        </div>
    
    </>
  )
}

export default ProductCard