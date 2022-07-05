const exp = require("express");

const userapp = exp.Router();
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
userapp.use(exp.json());
const User = require("../Models/User");
const Favourite = require("../Models/Favourite");
const Comment = require("../Models/Comment");

const errorhandling = require("express-async-handler");
const verifytoken = require("./middleware/verifyToken");

// creating user
userapp.post(
  "/createuser",
  errorhandling(async (req, res) => {
    // get collection object
    let userobjfromclient = req.body;
    //search by user name
    let usercheck = await User.findOne({
      email: userobjfromclient.email,
    }).exec();

    if (usercheck != null) {
      res.send({ message: "Email Already Exist" });
    } else {
      let newuser = new User({ ...userobjfromclient });
      if (newuser.password == "") {
        res.send({ message: "Password should not empty" });
      } else {
        let hashedpassword = await bcryptjs.hash(newuser.password, 5);
        newuser.password = hashedpassword;
        let user = await newuser.save();
        res.status(201).send({ message: "user created", payload: user });
      }
    }
  })
);

// login by userdata
userapp.post(
  "/login",
  errorhandling(async (req, res) => {
    let usercredobj = req.body;
    let userfromdb = await User.findOne({ email: usercredobj.email }).exec();
    if (userfromdb == null) {
      res.send({ message: "Invalid user" });
    } else {
      let status = await bcryptjs.compare(
        usercredobj.password,
        userfromdb.password
      );
      if (status == false) {
        res.send({ message: "invalid password" });
      } else {
        let signedtoken = jwt.sign(
          { name: userfromdb.name },
          process.env.SECURITY_KEY,
          { expiresIn: 300 }
        );
        res.status(200).send({
          message: "login successfully",
          token: signedtoken,
          user: userfromdb,
        });
      }
    }
  })
);

// private routes
userapp.post(
  "/favourite",
  errorhandling(async (req, res) => {
    let itemobjfromclient = req.body;
    console.log(itemobjfromclient);

    let usercheck = await Favourite.findOne({
      name: itemobjfromclient.name,
    }).exec();

    if (usercheck == null) {
      let newcart = new Favourite({ ...itemobjfromclient });
      let favourites = await newcart.save();
      res
        .status(201)
        .send({ message: "book added to favourite", payload: favourites });
    } else {
      usercheck.favourites.push(itemobjfromclient.favourites[0]);
      let favourites = await usercheck.save();
      res.status(201).send({
        message: "book added to favourite exists",
        payload: favourites,
      });
    }
  })
);

//edit task
userapp.put(
  "/save-editedprofile",
  verifytoken,
  errorhandling(async (req, res) => {
    let editedobj = req.body;
    let email = editedobj.email;
    delete editedobj.username;
    //get user task obj
    let userprofileobj = await User.findOne({ email: email });

    userprofileobj.name = editedobj.name;
    userprofileobj.phoneno = editedobj.phoneno;
    userprofileobj.location = editedobj.location;

    let profile = await userprofileobj.save();
    res.status(200).send({ message: "profile edited", payload: profile });
  })
);

userapp.get(
  "/viewprofile/:email",
  verifytoken,
  errorhandling(async (req, res) => {
    //console.log(req.params.username)
    emailfromclient = req.params.email;
    //if user is not find it return null
    let userfoundfromdb = await User.findOne({ email: emailfromclient }).exec();

    //send response
    if (userfoundfromdb == null) {
      res.send({ message: "no user data found" });
    } else {
      res.status(200).send({ message: "userdata", payload: userfoundfromdb });
    }
    //  res.send({message:"all task"})
  })
);

//get cart dishes
userapp.get(
  "/favourite/:name",
  errorhandling(async (req, res) => {
    let name = req.params.name;
    let datafromdb = await Favourite.findOne({ name: name }).exec();

    res.send({ message: "favourite books", payload: datafromdb });
  })
);

userapp.get(
  "/getcomments/:title",
  errorhandling(async (req, res) => {
    let title = req.params.title;

    //get all food

    let favouriteFromDB = await Comment.findOne({ title: title });

    //if food store is empty

    if (favouriteFromDB == null) {
      res.send({ message: "Currently No comments Available", payload: [] });
    }

    //if food is available
    else {
      //send res

      res.status(200).send({
        message: "Available Comments",
        payload: favouriteFromDB.comment,
      });
    }
  })
);

userapp.post(
  "/addcomments",
  errorhandling(async (req, res) => {
    //get favObj sent from client

    let ObjFromClient = req.body;

    //create userfavObj doc type

    let userFavouriteDoc = new Comment({ ...ObjFromClient });

    //find user fav Obj is already available or not

    let userFavouriteFromDB = await Comment.findOne({
      title: ObjFromClient.title,
    });

    //if no user fav obj available, save userfavDoc in DB

    if (userFavouriteFromDB == null) {
      let userfavourite = await userFavouriteDoc.save();

      res.status(201).send({ message: "Comment added Successfully" });
    }

    //if user fav obj available, update user fav Obj with new fav in DB
    else {
      //adding new cart to existing user cart obj

      userFavouriteFromDB.comment.push(ObjFromClient.comment[0]);

      //updating the updated user cart obj

      await userFavouriteFromDB.save();

      //send res

      res
        .status(200)
        .send({ message: "Added to Existing comment Successfully" });
    }
  })
);

//error handling middleware(syntax error)
userapp.use((err, req, res, next) => {
  res.send({ message: err.message });
});

module.exports = userapp;
