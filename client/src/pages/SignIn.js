import React, { useState } from 'react'
import { isAuthenticated, authenticate, login } from '../api/authApi'
import { ToastContainer, toast } from "react-toastify";
import { Row, Col, Container } from "react-bootstrap";


const SignIn = () => {

  const [values, setValues] = useState({
    email: '',
    password:'',
    error:'',
    redirectRefer: false
  });

const { email, password, redirectRefer } = values;
const { user } = isAuthenticated()


const handleChange = name => event => {
  setValues({...values, error: false, [name]: event.target.value})
}


const clickSubmit = async event =>{
  event.preventDefault();
  
    setValues({ ...values, error: false, loading:true });
    try {
      const data = await login({ email, password })   
      
            if (data.error) {
              if (data.error) toast.error(data.error);
                setValues({...values,loading: false, toast:data.error, success: false});
            } else {
              //use a callback function
              toast.success(data.message);
              authenticate(data, () =>{
                setValues({
                  ...values, 
                    success: true,
                    loading:false,
                  redirectRefer:true
              });
              })
            }
    } catch (err) {
      toast.error(err)
    }
     
  }
  return (
    <>
    <ToastContainer />
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
          <form className='signup-form' onSubmit={clickSubmit}>
  <div className="form-group">
      <label className="text-muted">Email</label>
      <input onChange={handleChange('email')} type="email" className="form-control" autoFocus="off" autoComplete="off" value={email} />
  </div>

  <div className="form-group">
      <label className="text-muted">Password</label>
      <input onChange={handleChange('password')} type="password" className="form-control"  autoFocus="off" autoComplete="off" value={password} />
  </div>
  <button className="btn btn-primary">
      Submit
  </button>
  </form>
          </Col>
        </Row>
      </Container>
    
    </>
  )
}

export default SignIn