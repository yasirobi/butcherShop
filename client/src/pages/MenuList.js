import React, { useState, useEffect } from 'react'
import { getCategories } from '../api/categoryApi'
import Loading from '../components/Loading';
import Slider from '../components/Slider';

const MenuList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setcategories] = useState([])
  const [error, setError] = useState(false);

  const init = async () => {
    try {
      setIsLoading(true)
      const data = await getCategories()
      
      if(data.error) {
        setError(error)
        
      }else{
        setIsLoading(false);
        setcategories(data.data)
        
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }


useEffect(() => {
  init()
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <div>
      {isLoading ? (
        <Loading/>
      ):(
        <>
        <Slider/>
       <br /><br /><br /><br /><br /> 
        
        { categories && categories.map((c, i) => (
          <li key={i}>{c.name}</li>
        ))}
        </>
      )}
      

    </div>
  )
}

export default MenuList