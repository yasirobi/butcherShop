import React, { useState } from "react";
import { login, isAuthenticated, authenticate } from "../api/authApi";
import { ToastContainer, toast } from "react-toastify";
import { Row, Col, Container } from "react-bootstrap";
import { Redirect } from 'react-router-dom'


const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
    success: false,
  });

  const { email, password, redirectToReferrer } = values;
  const { user } = isAuthenticated()

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = async (event) => {
    event.preventDefault();

    setValues({ ...values, error: false, loading: true });
    try {
      const data = await login({ email, password });

      if (data.error) {
        if (data.error) 
        setValues({
          ...values,
          loading: false,
          toast: data.error,
          success: false,
        });
      } else {
        //use a callback function
        toast.success(data.message);
        authenticate(data, () => {
          setValues({
            ...values,
              loading:true,
              success: true,
              error:'',
            redirectToReferrer:true
          });
        });
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const signInForm = () => (
    <form className="signup-form" onSubmit={clickSubmit}>
              <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                  onChange={handleChange("email")}
                  type="email"
                  className="form-control"
                  autoFocus="off"
                  autoComplete="off"
                  value={email}
                />
              </div>

              <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                  onChange={handleChange("password")}
                  type="password"
                  className="form-control"
                  autoFocus="off"
                  autoComplete="off"
                  value={password}
                />
              </div>
              <button className="btn btn-primary">Submit</button>
            </form>
  )

  

  const redirectUser = () => {
    if (redirectToReferrer) {
        if (user && user.role === 1) {
            return <Redirect to="/admin/dashboard" />;
        } else {
            return <Redirect to="/user/dashboard" />;
        }
    }
    if (isAuthenticated()) {
        return <Redirect to="/" />;
    }
};
  return (
    <>
      <ToastContainer />
      <br /><br />
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
             {signInForm()}
          </Col>
        </Row>
        {redirectUser()}
      </Container>

      
    </>
  );
};

export default SignIn;
