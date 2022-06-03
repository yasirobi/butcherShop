import React from 'react'
import AdminNav from '../../admin/AdminNav'
import { Col, Container, Row } from 'react-bootstrap'


const CreateBlog = () => {
  return (
    <>
    <br /><br /><br /><br />
  <Container fluid>
  <Row>
      <Col lg={3} md={3} className="bg-info">
          <AdminNav/>
      </Col>

      <Col>
       create blog form
      </Col>
  </Row>
</Container>

</>
  )
}

export default CreateBlog