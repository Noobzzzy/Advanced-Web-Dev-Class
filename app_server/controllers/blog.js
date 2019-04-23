module.exports.home = function(req,res){
    res.render('home' );

}

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
