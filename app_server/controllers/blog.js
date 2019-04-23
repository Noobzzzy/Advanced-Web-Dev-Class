var request = require('request');
var apiOptions = {
  server : "http://localhost:80"
};


var _showError = function (req, res, status) {
	var title, content;
	if (status === 404) {
	  title = "404, page not found";
	  content = "Oh dear. Looks like we can't find this page. Sorry.";
	} else if (status === 500) {
	  title = "500, internal server error";
	  content = "How embarrassing. There's a problem with our server.";
	} else {
	  title = status + ", something's gone wrong";
	  content = "Something, somewhere, has gone just a little bit wrong.";
	}
	res.status(status);
	res.render('generic-text', {
	  title : title,
	  content : content
	});
};

var renderHomepage = function(req, res, responseBody){
  res.render('home', {
    title: 'Joseph Babbs Blog',
  });
};

/* GET 'home' page */
module.exports.bloglist = function(req, res){
  var requestOptions, path;
  path = '/api/blogs';
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {},
  };
  request(
    requestOptions,
    function(err, response, body) {
      res.render('blogList', {
        blogs: body
      });
    }
  );
};

var getBlogInfo = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/locations/" + req.params.blogid;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
        callback(req, res, body);
      }
  );
};

//Add in a controllers to render a single blog page.

var renderBlogAdd = function (req, res, blogDetail) {
  res.render('blogAdd', {
    title: blogDetail.title,
    blogText: blogDetail.blogText,
    createdOn: blogDetail.createdOn
  });
};


/* GET 'Add Blog' page */
module.exports.addBlog = function(req, res){
  getBlogInfo(req, res, function(req, res, responseData) {
    renderBlogAdd(req, res, responseData);
  });
};

/* POST 'Add review' page */
module.exports.doBlogAdd = function(req, res){
  var requestOptions, path, blogid, postdata;
  blogid = req.params.blogid;
  path = "/api/blogs/" + blogid;
  postdata = {
    title: req.body.time,
    blogText: req.body.blogText,
    createdOn: req.body.createdOn
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };
  if (!postdata.title || !postdata.blogText || !postdata.createdOn) {
    res.redirect('/blog/' + blogid + '/new?err=val');
  } else {
    request(
      requestOptions,
      function(err, response, body) {
        if (response.statusCode === 201) {
          res.redirect('/blog/' + blogid);
        } else if (response.statusCode === 400 && body.title && body.title === "ValidationError" ) {
          res.redirect('/blog/' + blogid + '/new?err=val');
        } else {
          console.log(body);
          _showError(req, res, response.statusCode);
        }
      }
    );
  }
};




module.exports.home = function(req,res){
    res.render('home' );

}

/*

module.exports.blogAdd = function(req, res){
    res.render('blogAdd' );
}

module.exports.blogList = function(req, res){
    res.render('blogList', { blogs:[
	{
	    title: 'test',
	    blogText: 'Does this work?',
	    timestamp : '1 March 2019'
	},
	{
	    title: 'test2',
	    blogText: 'Does this still work?',
	    timestamp : '1 March 2019'
	},
	{
	    title: 'test3',
	    blogText: 'This Formating Is a Bit Weird, will see about changing in future',
	    timestamp : '2 March 2019'
	}]
     });
}

module.exports.blogEdit = function(req, res){
    res.render('blogEdit' );
}

module.exports.blogDelete = function(req, res){
    res.render('blogDelete' );
}

*/
