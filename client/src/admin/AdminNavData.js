import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as FcList from 'react-icons/fc';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'All products',
    path: '/admin/products',
    icon: <FcList.FcList />,
    cName: 'nav-text'
  },
  {
    title: 'Create product',
    path: '/admin/create/product',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'create category',
    path: '/admin/create/category',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  
  
  {
    title: 'create blogs',
    path: '/admin/create/blog',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'view orders',
    path: '/admin/orders',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];