import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import '../styles/midBanner.css'
import icon1 from '../img/icon-1.webp'
import icon2 from '../img/icon-2.webp'
import icon3 from '../img/icon-3.webp'
import { Link } from 'react-router-dom'

const MidBanner = () => {
  return (
    <>
    
    <div className="midBanner">
        <Container>
            <Row className='g-0'>
                <Col lg={6} md={6} xs={12} sm={12}>
                    <div className="bg-image"></div>
                </Col>
                <Col lg={6} md={6} xs={12} sm={12} >
                    <div className="bg-image1 d-flex flex-column justify-content-center align-items-center">
                        <h3>Online Store</h3>
                        <div className="items">
                            <h1>Best Quality Check</h1>
                        </div>
                        <div className="itemBox">
                            <div className="itembox1">
                                <img src={icon3} alt="" />
                                <p>Antibacterial Treatment</p>
                            </div>
                            <div className="itembox1">
                                <img src={icon2} alt="" />
                                <p>Temperature Control</p>
                            </div>
                            <div className="itembox1">
                                <img src={icon1} alt="" />
                                <p>Laboratory Testing</p>
                            </div>
                        </div>
                        <p className='itembox-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>
                       <Link to='/' className=' button btn-item'>shop now</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
    
    
    </>
  )
}

export default MidBanner