import React from 'react'
import moment from 'moment'
import '../styles/blog.css'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";

const BlogCard = ({list}) => {

  const { title ,desc, photo,createdAt, _id, rating } = list

  return (
    <>
      <div className="blog" >
         <div className="blog-img">
             <img src={`${process.env.REACT_APP_API}/uploads/${photo}`} alt='blog' />
        
             <div className="blog-date">
             <p>{moment(createdAt).fromNow('DD/MM/YYYY')}</p> 
         </div>
         </div>
         <div className="blog-desc">
         <ReactStars
                  count={5}
                  // onChange={ratingChanged}
                  size={24}
                  ratings={`${(rating / 5) * 100}%`}
                  activeColor="#ffd700"
                  color="#aa1936"
                />
             <h3>{title}</h3>
             <p>{desc}</p>
         </div>
          <Link to={`/blog/${_id}`}> view more</Link>
     </div>

     
    </>
  )
}

export default BlogCard