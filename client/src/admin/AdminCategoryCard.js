import React from 'react'
import { Link } from 'react-router-dom'



const AdminCategoryCard = ({cta}) => {

    const { name, _id } = cta
  return (
    <>
    
      <tbody>
      <tr>
      <td>{_id}</td>
      <td>{name}</td>
       
       <td>
         <Link to={`/admin/update/category/${_id}`}>Edit</Link>
       </td>
    </tr>
      </tbody>

    
     
    </>
  )
}

export default AdminCategoryCard