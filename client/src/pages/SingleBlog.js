import React, {useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { getBlog, getBlogRelated } from '../api/blogApi'
import BlogCard from '../components/BlogCard';



const SingleBlog = props => {
  const [singleBlog, setSingleBlog] = useState([])
  const [error, setError] = useState(false);
  const [relatedBlog, setRelatedBlog] = useState([]);



  const loadBlog = async blogId => {
       try {
          const data = await getBlog(blogId) 
          console.log('blog', data);
          if(data.error) {
              setError(error)
          }else{
              setSingleBlog(data)
              const data1 = await getBlogRelated(data._id)
              if (data1.error) {
                setError(error);
            } else {
                setRelatedBlog(data1);
            }
            } 
          
       } catch (error) {
           console.log(error);
       }
  }


  useEffect(() => {
      const blogId = props.match.params.blogId;
      loadBlog(blogId)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  return (
    <>
    
    <Container>
        <Row>
            <Col lg={6} md={6} className="offset-md-1">
                <div className="singleBlog">
                <img src={`${process.env.REACT_APP_API}/uploads/${singleBlog.photo}`} alt='blog' />
                <div className="desc">
                    <h1>{singleBlog.title}</h1>
                    <p>{singleBlog.desc}</p>
                </div>
                </div>
            </Col>
        </Row>
    </Container>


      <Container>
          <div className="relatedBlog">
              <h1>related blogs</h1>
          </div>
          <Row>
              {relatedBlog.map((blogItem, i) => (
                <Col lg={4} md={4} sm={6} xs={12} key={i}>
                      <BlogCard list={blogItem}/>
              </Col>  
              ))}
              
          </Row>
      </Container>
    </>
  )
}

export default SingleBlog