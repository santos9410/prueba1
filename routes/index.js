
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.User=function(req,res){
	res.render('user',{title:'User'})
};