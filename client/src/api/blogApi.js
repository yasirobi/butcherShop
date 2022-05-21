export const getBlogs = async () => {
    try {
       const res = await fetch(`${process.env.REACT_APP_API}api/v1/blogs`, {
        method:'GET'
       })
      
       return res.json()
    } catch (error) {
      console.log(error);
    }
  }


  export const getBlog = async (blogId) => {
    try {
       const data = await fetch(`${process.env.REACT_APP_API}api/v1/blog/${blogId}`, {
         method:'GET'
       })
  
       return data.json()
    } catch (error) {
      console.log(error);
    }
  
   
  }


  export const getBlogRelated = async (blogId) =>{
    try {
            const data = await fetch(`${process.env.REACT_APP_API}/api/v1/blogs/related/${blogId}`, {
              method:'GET'
            })
        
            return data.json()
         } catch (error) {
           console.log(error);
         }
  }