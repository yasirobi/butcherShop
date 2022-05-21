import React, { useState, useEffect } from "react";
import Slider from "../components/Slider";
import { Container, Row, Col } from "react-bootstrap";
import { serviceList } from "../components/serviceData";
import Service from "../components/Service";
import MidBanner from "../components/MidBanner";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
import { getBlogs } from "../api/blogApi";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/productApi";


const Home = () => {
  const [blog, setBlog] = useState([]);
  const [error, setError] = useState(false);
  const [ products , setProducts ] = useState([])

   

  const loadProducts = async () => {
    try {
      const data = await getProducts("sold");
     
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const loadBlogs = async () => {
    try {
      const data = await getBlogs();
       console.log('products', data);
      if (data.error) {
        setError(data.error);
      } else {
        setBlog(data);
      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    loadBlogs();
    loadProducts()
  }, []);




  return (
    <div>
      <Slider />

      <section className="service-box">
        <h1>our shop services</h1>
        <div className="underline-service"></div>
        <Container>
          <Row className="ml-auto">
            {serviceList.map((list) => {
              return (
                <Col lg={3} xs={12} key={list.id}>
                  <Service list={list} />
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>


         <Container>
           <div className="products-title">
             <h1>best meats & fresh</h1>
           </div>
           <Row>
             {products.map((productsData, i) => (
               <Col md={4} lg={4} sm={6} xs={12} key={i}>
             <ProductCard productsList={productsData}/>
             </Col>
             ))}
             
           </Row>
         </Container>


      <MidBanner />
      <br />
      <div className="blog-title">
        <h3>Latest News</h3>
        <h1>Our Latest Updates</h1>
      </div>

      <Container>
        <Row>
          {blog.map((list, i) => (
            <Col md={4} key={i}>
              <BlogCard list={list} />
            </Col>
          ))}
        </Row>
      </Container>

      <Container>
        <Row>
          <Col md={4}></Col>
          <Col md={4}></Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
