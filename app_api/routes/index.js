var express = require('express');
var router = express.Router();
var ctrlBlogs = require('../controllers/blogs');

router.post('/blogAdd', ctrlBlogs.blogsCreate);
router.get('/blogList', ctrlBlogs.blogsReadOne);
router.put('/blogEdit/:blogid', ctrlBlogs.blogsUpdateOne);
router.delete('/blogDelete/:blogid', ctrlBlogs.blogsDeleteOne);

module.exports = router;
