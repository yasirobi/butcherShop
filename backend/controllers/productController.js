const Product = require('../models/product')
const fs = require('fs');



exports.create = async (req,res) => {
     const {name, description,shipping, price,rating, sold,category, quantity } = req.body;
    //  console.log(req.file);
     const {filename} = req.file;
     try {
 
         const product = await new Product({name,shipping, description,category, price,rating, sold, quantity}) 
          const data = await Product.findOne({name})
         if(data) return res.status(400).json({error:'already exist'})
         product.photo = filename
        
         await product.save()
         res.json({
             message:`product is by the name of ${name} is created`,
			product,
		});
     } catch (err) {
         console.log(err);
        
     }
}


exports.update = async (req,res) => {
    
    if (req.file !== undefined) {
		req.body.photo = req.file.filename;
       
	}
     
    try {

        const products = await Product.findByIdAndUpdate(req.product, req.body,{new:true})
        if (req.file !== undefined && req.file.filename !== products.photo) {
            fs.unlink(`public/images/${products.photo}`, err => {
                if (err) throw err;
                console.log('Image deleted from the filesystem');
            });
        }
    
        res.json({
            successMessage: 'Product successfully updated',
            products
        });
    } catch (error) {
        console.log(error);
    }
}


exports.remove = async (req,res) => {
    try {
		const product = req.product;
		const deletedProduct = await product.findOneAndRemove()
         
		fs.unlink(`public/images/${product.photo}`, error => {
			if (error) throw error;
			console.log(
				'Image successfully deleted from filesystem: ',
				deletedProduct.photo
			);
		});

		res.json({
            message:'product deleted successfully',
            deletedProduct
        });
	} catch (error) {
		console.log(error, 'productController.delete error');
		res.status(500).json({
			error: 'Please try again later',
		});
	}
}



exports.singleProduct = async (req,res,next,id) => {
   try {
       const product = await Product.findById(id)
       if(!product)return res.status(404).json({
        error: 'product not found',
      });
      req.product = product;

      next();
   } catch (error) {
       console.log(error);
   }
}


exports.read = (req,res) => {
    const product = req.product
    return res.json({
        product
    });
    
}



exports.lists = async (req,res) => {
    const order = req.query.order ? req.query.order : 'asc';
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    const limit = req.query.limit ? parseInt(req.query.limit) : 6;
    try {
       const products = await Product.find()
       .populate("category")
       .sort([[sortBy, order]])
       .limit(limit)
       if(!products) return res.status(400).json({error:'products not found'})
       res.status(200).json(
           products
       )
    } catch (error) {
        console.log(error);
         res.status(500).json({ error: 'internal server error'})
    }
}



exports.listRelated = async (req,res) => {
   const limit = req.query.limit ? parseInt(req.query.limit) : 6;
    try {
      const products = await Product.find({_id: {$ne: req.product}, category: req.product.category})  
      .limit(limit)
      .populate("category" , '_id name')
      if(!products) return res.status(400).json({
        error: 'products not found'
    })
    res.status(200).json({products})
    } catch (error) {
        console.log(error);
         res.status(500).json({ error: 'internal server error'})
    }
}


exports.listCategories = async (req,res) => {
    try {
       const categories = await Product.distinct('category') 
       if(!categories)  return res.status(400).json({
        error: 'Categories not found'
    });
    res.status(200).json({ categories})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error'})
    }
}