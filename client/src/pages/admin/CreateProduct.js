import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, Button, Table } from "react-bootstrap";
import AdminNav from "../../admin/AdminNav";
import { createProducts, getProducts } from "../../api/productApi";
import { getCategories } from "../../api/categoryApi";
import { toast, ToastContainer } from "react-toastify";
import { isAuthenticated } from "../../api/authApi";
// import AdminProductCard from "../../admin/AdminProductCard";
import { Link } from 'react-router-dom'
import AdminProductCard from "../../admin/AdminProductCard";


const CreateProduct = () => {

   const [ products, setProducts ] = useState([])
  const [error, setError] = useState(false);
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    error: "",
    loading:false,
    rating:'',
    createdProducts: "",
    redirectToProfile: false,
    formData: "",
    success: false,
  });


  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    
    rating,
    createdProducts,
    // redirectToProfile,
    formData
} = values;


  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  }

  const submitProductForm = async (event) => {
      event.preventDefault();
      try {
        setValues({ ...values, error: '', loading: true });
        const data = await createProducts(user._id, token, formData)
        if(data.error){
          setValues({...values, error: data.error,success: false,})
            
        }else{
          toast.success(data.message,`${createdProducts}`)
          let formData = new FormData()
          // formData.append('photo', photo)
          formData.append('name', name)
          formData.append('description', description)
          formData.append('price', price)
          formData.append('shipping', shipping)
          formData.append('quantity', quantity)
          formData.append('category', category)
          formData.append('rating', rating)
          console.log('created p',formData);
          setValues({
            ...values,
                    name: '',
                    rating:'',
                    description: '',
                    photo:'',
                    price: '',
                    quantity: '',
                    loading: false,
                    createdProducts: data.name
          })
        }
      } catch (err) {
        toast.error(err)
      }
  }


  const init = async () => {
    try {
       const data = await getCategories()
       if(data.error){
         setValues({...values, toast:data.error})
       }else{
        setValues({
          ...values,
          categories: data.data,
          formData: new FormData()
      });
       }
    } catch (err) {
      toast.error(err)
    }
  }



  const showCreatedProducts = async () => {
    try {
      const data = await getProducts('createdAt');
     console.log('show', data);
      if (data.error) {
        setError(error.data);;
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    init()
    showCreatedProducts()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const showLoading = () =>
  loading && (
      <div className="alert alert-success">
          <h2>Loading...</h2>
      </div>
  );

  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
        {error}
    </div>
);

  const newPostForm = () => (
    <Form onSubmit={submitProductForm}>
      <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>

            <div className="form-group">
                <label className="text-muted">Rating</label>
                <input onChange={handleChange('rating')} type="number" className="form-control" value={rating} />
            </div>

      <Button variant="primary" type="submit">
        Create Now
      </Button>
    </Form>
  );

  return (
    <>
    <ToastContainer/>
      <br />
      <br />
      <br />
      <br />
      <Container fluid>
        <Row>
          <Col lg={3} md={3}>
            <AdminNav />
          </Col>
          <Col>
             <Row>
             <Col md={8}>
            {newPostForm()}
            {showLoading()}
            {showError()}
             </Col>
             </Row>
          
             <Table bordered variant="light">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Photo</th>
                  <th>Description</th>
                  <th>Price</th>
            
                  <th>Quantity</th>
                  <th>Rating</th>
                  <th>Category</th>
                </tr>
              </thead>
            
               { products && products.map((product, i) => {
                 return(
                   <tbody key={i} >
                     <tr>
                      <AdminProductCard product={product} />
                   </tr>
                   </tbody>
                    
                 )
               })}
             </Table>
          
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateProduct;
