import React from 'react'
import '../styles/products.css'



const ProductCard = ({productsList}) => {

    const {name, photo, price } = productsList
  return (
    <div className='products'>
        <div className="product-image">
            <img src={`${process.env.REACT_APP_API}/uploads/${photo}`} alt="" />
        </div>
        <div className="product-items">
            <h3>{name}</h3>
             <span>{price}:00 $</span>
             {/* <p>{description.substring(0,40)}</p> */}
        </div>
    </div>
  )
}

export default ProductCard