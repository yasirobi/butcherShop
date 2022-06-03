import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../../api/authApi';
import { getCategory, updateCategory } from '../../api/categoryApi';
import { ToastContainer, toast } from 'react-toastify'
import { Container, Row } from 'react-bootstrap';
import AdminNav from '../../admin/AdminNav'
import { Form,Col, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'



const UpdateCategory = ({match}) => {
    
    const [values, setValues] = useState({
        name: '',
        error: '',
        redirectToProfile: false,
        formData: '',
       
    });


const { user, token } = isAuthenticated()
const { name, error, redirectToProfile } = values;


const init = async (categoryId) => {
    try {
      const data = await getCategory(categoryId, token);
    if(data.error){
        setValues({ 
            ...values, 
            toast: data.error,
            success: false,
        });
    }else{
        toast.success(data.message);
        setValues({
            ...values,
            name: data.name
        });
    }
    } catch (err) {
        toast.error(err);
    }
}


useEffect(() => {
    
   init(match.params.categoryId)
   // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
};


const submitCategoryForm = async (e) => {
    e.preventDefault();
    try {
      const category = {
        name:name
    }  
    const data = await updateCategory(match.params.categoryId, user._id, token, category);
         
    if(data.error){
        setValues({ ...values, toast: data.error });
    }else{
        toast.success(data.message);
        setValues({
            ...values,
            name: data.name,
            error: false,
            redirectToProfile: true
        });
    }
    } catch (err) {
        toast.error(err)
    }
}




const updateCategoryForm = () => (
    <Form onSubmit={submitCategoryForm }>
      <Form.Group className="mb-3">
        <Form.Label>update Category</Form.Label>
        <Form.Control
          onChange={handleChange('name')}
          value={name}
          className="input100"
          type="text"
          required
          name="name"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Now
      </Button>
    </Form>
  )

  const redirectUser = () => {
    if (redirectToProfile) {
        if (!error) {
            return <Redirect to="/admin/create/category" />;
        }
    }
};

  return (
    <>
    <br /><br /><br /><br />
    <ToastContainer /> 
     <Container fluid>
     <Row>
         <Col lg={3} md={3}>
            <AdminNav />
          </Col>
          <Col lg={9} md={9}>
          
                    {updateCategoryForm()}
                    
                    {redirectUser()}
          </Col>
     </Row>
     </Container>
    
    </>
  )
}

export default UpdateCategory