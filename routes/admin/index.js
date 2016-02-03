var express = require('express');
var router = express.Router();
var path = require('path');
var chalk = require('chalk');

var model = require("../../model");
var system = require("../../system");

router.all("/*", system.user.userAuth, function(req, res, next){
  res.redirect("/user/login");
})
/**
  *@param [null]
  *@return [page] which is for you to insert new
*/
router.get('/detail', function(req, res, next) {
  console.log(next);
  res.render("admin/index");
});


/**
*@param [String] (nickname)
*@param [String] (city)
*@param [String] (contact)
*@return [redirected]
*/
router.post('/', function(req, res){
  var nickname = req.body.nickname || null;
  var city     = req.body.city || null;
  var contact  = req.body.contact || null;

  var data = {
    "nickname": nickname,
    "city"    : city,
    "contact" : contact
  }

  var result = {
    "date": new Date(),
  }

  if (!nickname || !city || !contact) {
    result.code = 422;
    result.msg  = "Some param(s) is / are missing";
    res.status(200).json(result);
  }else{
    model.post.savePost(data, function(result){
      result.date = new Date();
      res.status(200).json(result);
    })
  }
})

module.exports = router;
