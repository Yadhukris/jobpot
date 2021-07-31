const express = require('express');

const cors = require('cors');
const { getMaxListeners } = require('process');
const Facultydata = require('./model/facultydata');
const alumnidata = require('./model/alumnidata')

require("./db/connect")
const app = new express();
const jwt = require('jsonwebtoken')



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());


admin = "admin@gmail.com";
adminPwd = "Aa@123456"

app.get("/allfaculty", async (req, res) => {


    Facultydata.find()
        .then(function (products) {
            res.send(products);

        });
})


app.get("/faculty/:id", async (req, res) => {
    console.log("hai");
    const id = req.params.id;
    await Facultydata.findOne({ "_id": id })
        .then((book) => {
            console.log(book);
            res.send(book);
        });
})


app.post("/faculty/login", async (req, res) => {



    const userrole = 0;
    const email = req.body.email;
    const password = req.body.password;
    const udata = await Facultydata.findOne({ email: email })



    if (email === admin && password === adminPwd) {

        return res.status(200).send({ email });
    }
    else if (udata == null) {
        return res.status(404).send("userdata not present");
    }


    else if (udata.email === email && udata.password === password) {

        res.status(200).send({ email });
    }
    else {
        res.status(405).send("something Went Wrong Try Again");
    }





})


app.post("/admin/add", async (req, res) => {
    console.log(req.body);

    const user = req.body;

    console.log(user);
    const newUser = new Facultydata(user);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }


})

app.put("/faculty/update", async (req, res) => {
    console.log(req.body)
    let user = await Facultydata.findById(req.body._id);
    user = req.body;

    const editUser = new Facultydata(user);
    console.log(editUser)
    try {
        await Facultydata.updateOne({ _id: req.body._id }, editUser);
        res.status(201).json(editUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
})


//for alumni



app.post('/insert', function (req, res) {

    console.log(req.body);

    var alumni = {
        uname: req.body.alumni.uname,
        email: req.body.alumni.email,
        password: req.body.alumni.password,
        hq: req.body.alumni.hq,
        city: req.body.alumni.city,
        alumniid:req.body.alumni._id


    }
    var alumni = new alumnidata(alumni);
    alumni.save();
});


// app.get('/:id',  (req, res) => {

//     const id = req.params.id;
//       alumnidata.findOne({"_id":id})
//       .then((alumni)=>{
//           res.send(alumni);
//       });
//  })

//alumni
app.post('/login', async (req, res) => {
    // const userrole = 0;
    const email = req.body.email;
    const password = req.body.password;
    const id = req.params._id
    const udata = await alumnidata.findOne({ email: email })


    if (udata == null) {
        return res.status(404).send("userdata not present");
    }

    if (udata.email === email && udata.password === password) {
        
        let payload = { subject: email + password }
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
    }  

    else {
        res.status(405).send("something Went Wrong Try Again");
    }

})

// app.get('/getdetails',   function (req, res) {

//      alumnidata.find()
//                 .then(function(alumni){
//                     res.send(alumni);
//                 });
// });


app.get('/:email',  (req, res) => {
  
    const email = req.params.email;
    // const id = req.params._id
      alumnidata.findOne({"email":email})
      .then((alumni)=>{
          res.send(alumni);
      });
  })

  app.get('/:id',  (req, res) => {
  
    // const email = req.params.email;
    const id = req.params.id
      alumnidata.findOne({"_id":email})
      .then((alumni)=>{
          res.send(alumni);
      });
  })

  app.put('/update',(req,res)=>{
    console.log(req.body)
    id=req.body._id,
    uname= req.body.uname,
    email= req.body.email,
    password= req.body.password,
    hq= req.body.hq,
    city= req.body.city,
    alumniid=req.body._id
   alumnidata.findByIdAndUpdate({"_id":id},
                                {$set:{"name": uname,
                                   
                                    "password": password,
                                    "hq": hq,
                                    "city": city,
                                    
                            }})
   .then(function(){
       res.send();
   })
 })


app.listen(3000, function () {
    console.log('listening to port 3000');
});