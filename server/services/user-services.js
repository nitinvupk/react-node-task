const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../userModel/userSchema');
const config = require('../config');

exports.registerUser = async (req, res) => {
  console.log(req.body);
  try {
    if(!req.body.name){
      res.send({auth:false , message: "Name is required."});
      return
    }
    if(!req.body.email){
      res.send({auth:false , message: "Email is required."});
      return
    }
    if(!req.body.password){
      res.send({auth:false , message: "Password is required."});
      return
    }
    const hashedPass = bcrypt.hashSync(req.body.password,8);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: hashedPass,
    });
    const token = jwt.sign({id: user._id}, config.secret, {expiresIn: 86400});
    await user.save();
    await User.findByIdAndUpdate({_id: user._id }, {$push: { loginToken: token }});
    res.send({auth: true, token: token, currentUser:user});
  } catch (err) {
    console.log(err);
  }
}

exports.getUsers = async (req, res, next) => {
  try{
    if(!req.userId) res.send({auth: false, message: "token verified but id not found."});

    const user = await User.findById({ _id: req.userId }, { password: 0 });
      if(!user) res.send({auth: false, message: "No user found with this id"});
      if(user.role === "admin"){
        const user = await User.find({role:"user"});
        res.send({user,success:true});
      }
      else{
        res.send({auth:false,success:false});
      }
  }
  catch(err){
    console.log(err);
  }
}

exports.createUser = async (req,res) => {
  try{
    const hashedPass = bcrypt.hashSync(req.body.password,8);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: hashedPass,
    });
    await user.save();
    res.send({success:true});
  }
  catch(err){
    console.log(err);
  }
}

exports.updateUser = async (req, res, next) => {
  try{
    if(!req.userId) res.send({auth: false, message: "token verified but id not found."});

    const user = await User.findById({ _id: req.userId }, { password: 0 });
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
  }
  catch(err){
    console.log(err);
  }
}

exports.deleteUser = async (req, res, next) => {
  try{
    if(!req.userId) res.send({auth: false, message: "token verified but id not found."});

    const user = await User.findById({ _id: req.userId }, { password: 0 });
    if(!user) res.send({auth: false, message: "No user found with this id"});
    if(user.role === "admin"){
      await User.findByIdAndRemove({_id:req.params.id});
      res.send({success:true});
    }
    else{
      res.send({auth:false,success:false});
    }
  }
  catch(err){
    console.log(err);
  } 
}

exports.loginUsers = async (req, res) => {
  try{
    if((req.body.email) && (req.body.password)){
      const user = await User.findOne({ email: req.body.email });
      if(!user){ 
        res.send({auth: false, message: "no user was found."});
        return
      }

      const passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
      if(!passwordIsValid){ 
        res.send({auth: false, message: "Username or password incorrect"});
        return
      }
      const token = jwt.sign({ id: user._id }, config.secret, {expiresIn: 86400});
      res.send({auth: true, token: token , currentUser:user});
    }
    else{
      res.send({auth: false, message: "please provide the credentials."});
    }
  }
  catch(err){
    console.log(err);
  }
}

exports.filterUsers = async (req, res) => {
  try{
    const user = await User.find({$and:[{name: { $regex: `${req.params.data}`}},{role:"user"}]});
      res.send({user,success:true});
  }
  catch(err){
    console.log(err);
  }
}

exports.getCurrentUser = async (req, res,next) => {
  try{
    if(req.params.id === "currentUser"){
      const user = await User.findOne({_id:req.userId});
        res.send({auth: true, currentUser:user});
    }
  }
  catch(err){
    console.log(err);
  }
}

exports.logoutUser = (req, res) => {
  res.send({ auth: false, token: null });
}
