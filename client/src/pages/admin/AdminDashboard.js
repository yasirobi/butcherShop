import React from 'react'
import AdminNav from '../../admin/AdminNav'

const AdminDashboard = () => {
  return (

    <>
    <br /><br /><br /><br />
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-info">
          <AdminNav />
        </div>

        <div className="col-md-9">
          <h4>Admin Dashboard</h4>
          
         
        </div>
      </div>
    </div>
    </>
  )
}

export default AdminDashboard