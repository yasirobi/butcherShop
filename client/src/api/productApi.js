

export const getProducts = async (sortBy) => {
  try {
    const data = await fetch(`${process.env.REACT_APP_API}api/v1/products/?sortBy=${sortBy}&order=desc&limit=6`, {
      method:'GET'
    })

    return data.json()
 } catch (error) {
   console.log(error);
 }


}