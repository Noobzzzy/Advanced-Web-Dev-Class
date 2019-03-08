var express = require('express');
var router = express.Router();
//var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home', { title: 'Joseph Babb' });
});

/*NEW: routes for my home and blog pages. */
router.get('/', ctrlBlog.home);
router.get('/blogList', ctrlBlog.blogList);
router.get('/blogAdd', ctrlBlog.blogAdd);
router.get('/blogEdit',ctrlBlog.blogEdit);
router.get('/blogDelete',ctrlBlog.blogDelete);


/*Code Shell Of Navbar From Todo app*/
const showController = require('../controllers/showController');
const addController = require('../controllers/addcontroller');
const editController = require('../controllers/editController');
const deleteController = require('../controllers/deletecontroller');
const completeController = require('../controllers/completeController');

router.post('/task/complete/:id', completeController.commitComplete);
router.get('/task/delete/:id', deleteController.deleteTask);
router.post('/task/delete/:id', deleteController.confirmDelete);
router.get('/task/edit/:id', editController.editTask);
router.post('/task/edit/:id', editController.commitEdit);
router.get('/task/add/', addController.addTask);
router.post('/task/add/', addController.saveTask);
router.get('/', showController.showTasks);

module.exports = router;
