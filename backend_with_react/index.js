const express = require('express')
const app = express()
const multer = require("multer")
const userDb = require("./data.json");
const fs = require("fs");
const cors = require("cors")
const port = 3000

app.use(cors());
app.use(express.static("uploads"));

//make multers
// const singlefileUpload = multer({dest:"uploads/"}).single("image");  //upload single file
const multipleUpload = multer({dest:"multipleUploads/"}).array("image",3)  //upload multiple files

const storage = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,"uploads/");
    },

    filename : (req,file,cb)=>{
        let fileName = file.originalname;

        cb(null,fileName);
    }
});

const singleUpload = multer({
    storage: storage
}).single("image")


app.get('/', (req, res) => {
  res.sendFile('post.html',{root:(__dirname)})
})

//single file upload
app.post('/post',singleUpload, (req, res) => {
    let domainName = "http://localhost:3000/"
    let {name,email,password} = req.body;
    let file = req.file;
    let userData = {
        id:new Date().getTime(),
        name,
        email,
        password,
        imageUrl : domainName + file.originalname
    }

    let dataBase = userDb;
    dataBase.push(userData);
    fs.writeFile("data.json",JSON.stringify(dataBase),(err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send({message:"New user created"});
        }
    })
    // res.send({name,email,password,file});

})

app.get("/allusers",(req,res)=>{
    let allUsers = userDb;
    res.send(allUsers);
})

app.get("/multiple",(req,res)=>{
    res.sendFile('multiple_file.html',{root:(__dirname)})
})

//multiple file upload
app.post("/multiple",multipleUpload,(req,res)=>{
    let {name,email,password} = req.body;
    let files = req.files;
    res.send({name,email,password,files});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})