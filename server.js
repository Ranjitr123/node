const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors'); // Import the cors package

const app = express()
app.use(express.json())
app.use(cors()); // Enable CORS for all routes
let url = 'mongodb+srv://ranjitrautaray123:Ranjit123@cluster0.m2vkd.mongodb.net/'
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("it is connected properly")
}).catch("it is not connected properly")

 const personSchema = new  mongoose.Schema({
    name:String,
    age:Number,
    developer:String
 })
const Staff = new mongoose.model("Staff",personSchema)

const newStaff = new Staff ({
    name:"ranjit",
    age:34,
    developer:"frontend"
})
newStaff.save().then(()=>{
    console.log("saved succesfully")
}).catch("error found")

app.post("/persons",async(req,res)=>{
    try{
        const {name, age, developer } = req.body
       const persons = new Staff ({name,age,developer})
       await persons.save()
       res.status(201).send(persons)
    }
    catch(error){
       res.status(500).send("this is the error")
    }
   })
app.get("/persons",async(req,res)=>{
 try{
    const persons = await Staff.find();
    res.status(200).send(persons)
 }
 catch(error){
    res.status(500).send("this is the error")
 }
})
app.get("/persons",async(req,res)=>{
    try{
       const persons = await Staff.find();
       res.status(200).send(persons)
    }
    catch(error){
       res.status(500).send("this is the error")
    }
   })
   // GET route to retrieve a book by ID
app.get('/persons/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const persons = await Staff.findById(id); // Retrieve the book by ID
      if (!persons) {
        return res.status(404).send({ error: 'Book not found' }); // Respond with 404 if not found
      }
      res.status(200).send(persons); // Respond with the book and status 200 (OK)
    } catch (error) {
      res.status(500).send({ error: 'Error fetching book' }); // Respond with an error message
    }
  });
  // DELETE route to delete a book by ID
  app.delete('/persons/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const persons = await Staff.findByIdAndDelete(id); // Find and delete the book by ID
        if (!persons) {
          return res.status(404).send({ error: 'Book not found' }); // Respond with 404 if not found
        }
        res.status(200).send({ message: 'Book deleted successfully', persons }); // Respond with success message and the deleted book
      } catch (error) {
        res.status(500).send({ error: 'Error deleting book' }); // Respond with an error message
      }
    });
let port = 3400 ;
app.listen(port,(req,res)=>{
    console.log("port is now connected")
})