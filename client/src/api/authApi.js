export const Register = async (user) => {
    
    try {
         const res = await fetch(`${process.env.REACT_APP_API}/api/v1/register`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
         })
         return res.json()
        
    } catch (error) {
        console.log(error);
    }    
}


export const login = async (user) => {
    
  try {
       const res = await fetch(`${process.env.REACT_APP_API}/api/v1/signin`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
       })
       return res.json()
      
  } catch (error) {
      console.log(error);
  }    
}


export const authenticate = (data,next) => {
  if(typeof window !== 'undefined'){
    localStorage.setItem('token', JSON.stringify(data))
    next()
  }
}


export const isAuthenticated = () => {
  if(typeof window == 'undefined') {
    return false;
  }
  if(localStorage.getItem('token')) {
    return JSON.parse(localStorage.getItem('token'))
  }else {
    return false;
  }
}