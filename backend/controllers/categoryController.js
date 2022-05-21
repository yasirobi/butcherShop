const Category = require('../models/category')
const Product = require('../models/product')

exports.categoryById = async (req,res,next,id) => {
    try {
       const category = await Category.findById(id) 
       if(!category) return res.status(400).json({
           error:'category does not exist'
       })
       req.category = category
       next()
    } catch (err) {
        console.log(err);
    }
}



exports.create = async (req,res) => {
  const { name } = req.body
  try {
     const category = await Category.findOne({name})
     if(category) return res.status(400).json({ error:'category already exist'}) 
     const createCta = await new Category({name}) 
     const savedCta = await createCta.save()
     res.status(201).json({
                   message:'category is created',
                   savedCta
               })
  } catch (error) {
      res.status(500).json({
          error:'internal server error'
      })
  }
}


exports.update = async (req,res) => {
     const category = req.category;
     try {
         category.name = req.body.name;
         const data = await category.save()
         res.status(200).json(data)
     } catch (error) {
         console.log(error);
         res.status(500).json({
             error:'internal server error'
         })
     }
}



exports.list = async (req,res) => {
    try {
        const data = await Category.find()
        res.status(200).json({
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error:'internal server error'
        })
    }
}

exports.read = async (req,res) => {
  return res.status(200).json(req.category)
}



exports.remove = async (req,res) => {
     const category = req.category;

    try {
       const data = await Product.find({category}) 
       if(data.length >= 1) {
           return res.status(400).json({
            message: `Sorry. You cant delete ${category.name}. It has ${data.length} associated products.`,
           })
       }else{
           const data = await Category.remove()
           if(!data) return res.status(400).json({
               error:'category is not deleted'
           })
       }  
       res.status(200).json({
           message:'category is deleted'
       })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error:'internal server error'
        })
    }
  
  }