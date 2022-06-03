


export const addCategory = async (userId, token, category) => {

    const config = {
        method:'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }
    try {
        const res = await fetch(`${process.env.REACT_APP_API}/api/v1/create/category/${userId}`, config)
        return res.json()
    } catch (error) {
        console.log(error);
    }
}




export const getCategories = async () => {
    const config = {
        method: 'GET'
    }
    try {
        const res = await fetch(`${process.env.REACT_APP_API}/api/v1/categories`, config)
        return res.json()
    
    } catch (error) {
        console.log(error);
    }
}


export const updateCategory = async (categoryId, userId, token, category) => {
    const config = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }
    try {
        const res = await fetch(`${process.env.REACT_APP_API}/api/v1/category/${categoryId}/${userId}`, config)
        return res.json()
    
    } catch (error) {
        console.log(error);
    }
}


export const getCategory = async (categoryId) => {
    const config = {
        method: 'GET'
    }
    try {
        const res = await fetch(`${process.env.REACT_APP_API}/api/v1/category/${categoryId}`, config)
        return res.json()
    
    } catch (error) {
        console.log(error);
    }
}