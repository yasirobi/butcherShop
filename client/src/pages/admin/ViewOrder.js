import React from 'react'
import AdminNav from '../../admin/AdminNav'
import { Col, Container, Row } from 'react-bootstrap'



const ViewOrder = () => {
  return (
    <>
    <br /><br /><br /><br />
  <Container fluid>
  <Row>
      <Col lg={3} md={3} className="bg-info">
          <AdminNav/>
      </Col>

      <Col>
       view orders
      </Col>
  </Row>
</Container>

</>
  )
}

export default ViewOrder