import React from 'react'
import '../styles/footer.css'
import { FaHome  } from 'react-icons/fa'


const Footer = () => {
  return (
    <>
    <br /><br /><br />
     <div className="footer">
       <div className="footer-item">
           <h3>contact</h3>

            <i><FaHome/></i> <span>No: 58 A, East Madison Street, Baltimore, MD, USA 4508</span>
       </div>
     </div>
    </>
  )
}

export default Footer