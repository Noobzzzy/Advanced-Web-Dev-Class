var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

var buildBlogList = function(req, res, results, stats) {
  var blogs = [];
  results.forEach(function(doc) {
    blogs.push({
      title: doc.obj.title,
      blogText: doc.obj.blogText,
      timestamp: doc.obj.timestamp,
      _id: doc.obj._id
    });
  });
  return blogs;
};

/* GET a blog by the id */
module.exports.blogsReadOne = function(req, res) {
  console.log('Finding blog details', req.params);
  if (req.params && req.params.blogid) {
    Blog
      .findById(req.params.blogid)
      .exec(function(err, blog) {
        if (!blog) {
          sendJSONresponse(res, 404, {
            "message": "blogId not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(blog);
        sendJSONresponse(res, 200, blog);
      });
  } else {
    console.log('No blogId specified');
    sendJSONresponse(res, 404, {
      "message": "No blogId in request"
    });
  }
};


/* POST a new blog */
/* /api/blogs */
module.exports.blogsCreate = function(req, res) {
  console.log(req.body);
  Blog.create({
    title: req.body.blogTitle,
    blogText: req.body.blogText,
    timestamp: req.body.timestamp
  }, function(err, blog) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(blog);
      sendJSONresponse(res, 201, blog);
    }
  });
};


/* PUT /api/blogs/:blogid */
module.exports.blogsUpdateOne = function(req, res) {
  if (!req.params.blogid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, blogid is required"
    });
    return;
  }
  Blog
    .findById(req.params.blogid)
    .select('-blogText')
    .exec(
      function(err, blog) {
        if (!blog) {
          sendJSONresponse(res, 404, {
            "message": "blogId not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }

        blog.title = req.body.title;
        blog.blogText = req.body.blogText;
        blog.timestamp = req.body.timestamp;

        blog.save(function(err, blog) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, blog);
          }
        });
      }
  );
};

/* DELETE /api/blogs/:blogid */
module.exports.blogsDeleteOne = function(req, res) {
  var blogid = req.params.blogid;
  if (blogid) {
    Blog
      .findByIdAndRemove(blogid)
      .exec(
        function(err, blog) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Blog id " + blogid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No blogId"
    });
  }
};
