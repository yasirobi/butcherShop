import React, {useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import { Row, Col, Container } from "react-bootstrap";

import { Register } from "../api/authApi";



const SignUp = () => {

  const [values, setValues] = useState({
    name:'',
    email:'',
    password:'',
    error:'',
    success:false
  });

  const { name, email, password, success, error } = values

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
};

  const clickSubmit = async event =>{
    event.preventDefault();
    setValues({ ...values, error: false });
    try {
      const data = await Register({ name, email, password })   
      if (data.error) toast.error(data.error);
            if (data.error) {
                setValues({ ...values, toast:data.error, success: false });
            } else {
              toast.success(data.message);
                setValues({
                    ...values,
                    name:'',
                    email: '',
                    password: '',
                    success: true,
                    error:''
                    
                });
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
      <label className="text-muted">Name</label>
      <input onChange={handleChange('name')} type="text" className="form-control" autoFocus="off" autoComplete="off" value={name} />
  </div>
  

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
  );
};

export default SignUp;
