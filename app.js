const express = require("express");     //inport express module
const mongoose = require('mongoose');   //mongoose module
const bodyparser = require('body-parser');  //body-parser module for getting post requst
const path = require("path");  // path module
const app = express();                  //create express app
const port = 4400; 

//Mongoose
mongoose.set('strictQuery', true);
main().catch(err => console.log(err));
// connecting mongoose 
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ContactDance');
    console.log("We Are Connected To MongoDB.... ");  
   
  }
//mongoose schema
const contactSchema = new mongoose.Schema({
    name:String,
    phone:Number,
    email:String,
    address:String
 });
 const Contact = mongoose.model('Contact', contactSchema);


//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine' , 'pug');         //video 72 setting template engine as pug
app.set('views', path.join(__dirname , 'views'));     // //seting view directory

//ENDPOINTS
app.get('/' , (req,res)=>{
    const params = {}
    res.status(200).render('home.pug' , params);
});
app.get('/contact' , (req,res)=>{
    const params = {}
    res.status(200).render('contact.pug' , params);
});
app.post('/contact' , (req,res)=>{                      //post request for getting data from user
    var myData = new Contact(req.body);                 //for accepting data
    myData.save().then(()=>{                            //for saving data
        res.send('This Item Has Been Saved To The Database');
    }).catch(()=>{
        res.status(400).send("Item Could Not Been Saved In Database");
    })                                    
});

// START THE SERVER 
app.listen(port , ()=>{                             
    console.log(`The App Has Been Lunched Successfully...Running on Port ${port}`);
});