import React, { useState, useEffect } from 'react'
import AdminNav from '../../admin/AdminNav'
import { Col, Container, Row, Form, Button, Table } from 'react-bootstrap'
import { isAuthenticated } from '../../api/authApi'
import { ToastContainer, toast } from 'react-toastify'
import { addCategory, getCategories } from '../../api/categoryApi'
import AdminCategoryCard from '../../admin/AdminCategoryCard'


const CreateCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [ categories, setCategories ] = useState([])


  //to destructure user and token from localstorage
  const { user, token } = isAuthenticated()
  const clickSubmit = async (e) => {
    e.preventDefault()
    
    try {
     const data = await addCategory(user._id, token, { name })
     console.log('create category', data);
     if(data.error){
      setError(data.error);
     }else{
       setError('')
      toast.success(data.message);
      init()
     }

    } catch (err) {
      toast.error(err)
    }
  }

  const handleChange = (e) => {
    setError("");
    setName(e.target.value)
  }


  const init = async () => {
     try {
       const data = await getCategories()
       console.log('categories', data);
       if(data.error){
          setError(data.error)
       }else{
         setCategories(data.data)
        
       }
     } catch (error) {
       console.log(error);
     }
  }


  useEffect(() => {
    init()
  }, []);


  const createCategoryForm = () => (
    <Form onSubmit={clickSubmit}>
      <Form.Group className="mb-3" controlId="form">
        <Form.Label>Add Category</Form.Label>
        <Form.Control
          type="text"
          onChange={handleChange}
          value={name}
          autoFocus
          placeholder=" Create Category"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Now
      </Button>
    </Form>
  )


  const showError = () => {
    if (error) {
        return <h3 className="text-danger">{error}</h3>;
    }
};

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <ToastContainer />
      <Container fluid>
        <Row>
          <Col lg={3} md={3}>
            <AdminNav />
          </Col>

          <Col>
            <Row>
              <Col md={8}>
                
                {createCategoryForm()}
                {showError()}
              </Col>
            </Row>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
            { categories && categories.map((cta, i) => (   
             
              <AdminCategoryCard cta={cta} key={i} />
           
            ))}
             </Table>
          </Col>
        </Row>
      </Container>

      
     
    </>
  )
}

export default CreateCategory
