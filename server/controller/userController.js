const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const User = require('../userModel/userSchema');
const config = require('../config');
const verifyToken = require('./verifyToken');

router.post('/register', function(req,res) {

  const hashedPass = bcrypt.hashSync(req.body.password,8);
    User.create({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: hashedPass,
    }, function(err, user) {
      if(err) res.send("Their was a problem in saving the required user.");

      const token = jwt.sign({id: user._id}, config.secret, {expiresIn: 86400});
      user.save();
      User.findByIdAndUpdate({_id: user._id }, {$push: { loginToken: token }}, function(err, result) {
        if(err) console.log(err);
      });
      res.send({auth: true, token: token, currentUser:user});
    });
});

router.get('/',verifyToken, function(req, res, next) {
  if(!req.userId) res.send({auth: false, message: "token verified but id not found."});

  User.findById({ _id: req.userId }, { password: 0 }, async function(err, user) {

    if(err) res.send({auth: false, message: "Error while finding the user"});
    if(!user) res.send({auth: false, message: "No user found with this id"});
    if(user.role === "admin"){
      const user = await User.find({role:"user"});
      res.send({user,success:true});
    }
    else{
      res.send({auth:false,success:false});
    }
  });
});

router.post('/create', function(req,res) {

  const hashedPass = bcrypt.hashSync(req.body.password,8);
  User.create({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: hashedPass,
  }, function(err, user) {
    if(err) res.send("Their was a problem in saving the required user.");
    user.save();
    res.send({success:true});
  });
});

router.put('/:id',verifyToken, function(req, res, next) {
  console.log(req.body);
  if(!req.userId) res.send({auth: false, message: "token verified but id not found."});

  User.findById({ _id: req.userId }, { password: 0 }, async function(err, user) {

    if(err) res.send({auth: false, message: "Error while finding the user"});
    if(!user) res.send({auth: false, message: "No user found with this id"});
    if(user.role === "admin"){
      await User.findByIdAndUpdate({_id:req.params.id},{$set:{
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
      }});
      res.send({success:true});
    }
    else{
      res.send({auth:false,success:false});
    }
  });
});

router.delete('/:id',verifyToken, function(req, res, next) {
  if(!req.userId) res.send({auth: false, message: "token verified but id not found."});

  User.findById({ _id: req.userId }, { password: 0 }, async function(err, user) {

    if(err) res.send({auth: false, message: "Error while finding the user"});
    if(!user) res.send({auth: false, message: "No user found with this id"});
    if(user.role === "admin"){
      await User.findByIdAndRemove({_id:req.params.id});
      res.send({success:true});
    }
    else{
      res.send({auth:false,success:false});
    }
  });
});

router.post('/login', function(req, res) {
  if((!req.body.email || req.body.email !== "") && (!req.body.password || req.body.password !== "")){
    User.findOne({ email: req.body.email }, function(err, user) {
      if(err) res.send({auth: false, message: "error while finding the user."});
      if(!user){ 
        res.send({auth: false, message: "no user was found."});
        return
      }

      const passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
      if(!passwordIsValid) res.send({auth: false, message: "Username or password incorrect"});
      const token = jwt.sign({ id: user._id }, config.secret, {expiresIn: 86400});
      res.send({auth: true, token: token , currentUser:user});
    });
  }
  else{
    res.send({auth: false, message: "please provide the credentials."});
  }
});

router.get('/filter/:data', function(req, res) {
  User.find({$and:[{name: { $regex: `${req.params.data}`}},{role:"user"}]}, function(err, user){
    if(err) console.log(err);
    res.send({user,success:true});
  });
})

router.get('/getuser/:id',verifyToken, async function(req, res,next){
  if(req.params.id === "currentUser"){
    const user = await User.findOne({_id:req.userId});
    console.log(user);
    res.send({auth: true, currentUser:user});
  }
})

router.get('/logout', function(req, res) {
  res.send({ auth: false, token: null });
});

module.exports = router;
