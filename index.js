const express = require('express'); //import express
const Joi = require('joi'); //import joi
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");

const User = require("./data")

// const app = express();
// const router = express.Router();
// app.use(express.json());// used the json file

// mongoose.connect('mongodb+srv://usr:1234@cluster0-lvmma.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
// const db = mongoose.connection
// // const id = mongoose.Types.ObjectId("5e20050518c36106b03a3370")
// // let x=User.findById(id);
// // let id="5e1ffda19153b45d6884e497";
// // let y=User.findOne({name:"Gagan"})
// // let x = User.find();
// let obj={name:"Ashwani Yadav",post:"Co-Founder",profile:"LinkedIn",city:"Bangalore",state:"Karnataka"}
// User.create(obj)
// // console.log(y.obj);
// //display the message when the url consist of '/'
const app = express();

mongoose.connect("mongodb+srv://usr:1234@cluster0-lvmma.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: "true" });
//mongoose.connect("mongodb://localhost/test",{ useNewUrlParser :"true"});
// mongoose.connection.on("error",(err)=>{

//     console.log("err",err);

// });

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});




app.get('/', async (req, res) => {
  let obj = { name: "Ashwani Yadav", post: "Co-Founder", profile: "LinkedIn", city: "Bangalore", state: "Karnataka" }
  // await User.create(obj)
  const x = User.findById("5e208fe76d7b893d1c9c6d05", function (err, user) {
    console.log(user)
  })
  // console.log( x);
  res.send('Welcome to Ashwani Rest API');
}
);
app.post('/api/login', (req, res) => {
  //mock user

  console.log(req.body);
  jwt.sign(req.body, 'secretkey', { expiresIn: '300s' }, (err, token) => {
    res.json({
      token
    });
  });
  //res.send("Hello");
});
app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
  res.json({
    message: 'Post created...'
  });
  //res.send("hello");
});
//format of token
//authorization: bearer <access_token>
//  ,(req, res) => {
//    console.log(req.params)
//     res.json(res.paginatedResults)
//   })

paginatedResults = async (req, res, next) => {
  // return async (req, res, next) => {
  // const page = parseInt(req.query.page)
  // const limit = parseInt(req.query.limit)
  console.log(req.params)
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const results = {}

  if (endIndex < 5) {
    results.next = {
      page: page + 1,
      limit: limit
    }
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    }
  }
  console.log("jaljgd")
  try {
    console.log("try begin");
    results.results = await User.find().limit(limit).skip(startIndex).exec()
    res.paginatedResults = results
    next()
    console.log("try end");
  } catch (e) {
    console.log("catch begin");
    res.status(500).json({ message: e.message })
    console.log("catch end");
  }
}

//verify token
function verifyToken(req, res, next) {
  //get auth header value
  const bearerHeader = req.headers['authorization'];
  // check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    //split at the space
    const bearer = bearerHeader.split(' ');
    //get token from array
    const bearerToken = bearer[1];
    //set the token
    req.token = bearerToken;
    //Next middleware
    next();
  } else {
    //forbidden
    res.sendStatus(403);
  }
}

// router.get('/users/:page/:limit',paginatedResults)
app.get("/users/:page/:limit", function (req, res) {

  let page = parseInt(req.params.page);
  let limit = parseInt(req.params.limit);
  User.find({}, function (err, user) {
    let len = user.length;
    console.log(len)
    let startindex = (page - 1) * limit;
    console.log(startindex)
    let endindex = startindex + limit;
    console.log(endin)

    // user=user.slice(2,2);
    let final = user.slice(3, 6)
    res.json(final)


  });
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`app is listening to PORT ${PORT}`);
})

//port environment variable
// const port = 8080;
// app.listen(port, () => console.log(`listening on port ${port}..`));
