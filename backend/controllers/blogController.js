const Blog = require('../models/blog')
const fs = require('fs')


exports.createBlog = async (req,res) => {
    
    const title = req.body.title
    const { filename } = req.file
    const desc = req.body.desc
    const data = { title, desc };
    console.log( data )
    try {
        const blog = await new Blog(data)
        
        blog.photo = filename 
        await blog.save()
        res.json(
           blog,
       );
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error'})
    }
}


exports.updateBlog = async (req,res) => {
      if(req.file !== 'undefined'){
          req.body.photo = req.file.filename
      }
    try {
        const blogs = await Blog.findByIdAndUpdate(req.blog, req.body, {new:true})
        if (req.file !== undefined && req.file.filename !== blogs.photo) {
            fs.unlink(`public/images/${blogs.photo}`, err => {
                if (err) throw err;
                console.log('Image deleted from the filesystem');
            });
        }
        res.json({
            successMessage: 'blog successfully updated',
            blogs
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error'})
    }
}



exports.removeBlog = async (req,res) => {
    try {
		const blog = req.blog;
		const deletedBlog = await Blog.findOneAndRemove()
         
		fs.unlink(`public/images/${blog.photo}`, error => {
			if (error) throw error;
			console.log(
				'Image successfully deleted from filesystem: ',
				deletedBlog.photo
			);
		});

		res.json({
            message:'blog deleted successfully',
            deletedBlog
        });
	} catch (error) {
		console.log(error, 'blogController.delete error');
		res.status(500).json({
			err: 'Please try again later',
		});
	}
}


exports.singleBlog = async (req,res,next,id) => {
    try {
        const blog = await Blog.findById(id)
        if(!blog)return res.status(404).json({
         error: 'blog not found',
       });
       req.blog = blog;
 
       next();
    } catch (error) {
        console.log(error);
    }
 }


 exports.readBlog = (req,res) => {
    const blog = req.blog
    return res.json(
        blog
    );
    
}


exports.blogLists = async (req,res) => {
    try {
        const blogs = await Blog.find()
        
        return res.json(
            blogs
        );
    } catch (err) {
        console.log(err, 'blogController.delete error');
		res.status(500).json({
			err: 'Please try again later',
		});
    }
    
    
}



exports.blogRelated = async (req,res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 4;
     try {
       const blogs = await Blog.find({_id: {$ne: req.blog}})  
       .limit(limit)
       
       if(!blogs) return res.status(400).json({
         error: 'products not found'
     })
     res.status(200).json(blogs)
     } catch (err) {
         console.log(error);
          res.status(500).json({ err: 'internal server error'})
     }
 }