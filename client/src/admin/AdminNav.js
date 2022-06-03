import { SidebarData } from './AdminNavData';
import React from 'react';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
import { NavLink, withRouter } from 'react-router-dom';
import { IconContext } from 'react-icons';
import '../styles/admin.css';
import { Nav } from 'react-bootstrap';







const AdminNav = () => {
   
  
    return (
      <>
     
       <IconContext.Provider value={{ color: '#fff' }}>
       <Nav className="flex-column sidenav">
       {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <NavLink to={item.path} activeStyle={{backgroundColor:"#ec4062"}}>
                    {item.icon}
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              );
            })}
        
       </Nav>
        
      </IconContext.Provider>
      </>
    );

 } 
 export default withRouter(AdminNav)