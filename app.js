
const express = require("express");
const path = require("path");
const student = require("./modals/student");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

//MAKING AN EXPRESS APP
const app = express();
const port = 2100;

//GETTING ABSOLUTE PATH OF ROOT DIRECTORY OF PROJECT
const curPath = path.join(__dirname);

//EXPLAINING NODE WHERE THE STATIC FILES (eg. stylesheets, scripts, images, text-files  etc) are stored 
app.use(express.static(__dirname + "/public/"));

//USING MIDDLEWARES FOR PARSING DATA OF REQUEST OBJECT 

app.use(bodyParser.urlencoded());       // USED FOR PARSING FORM DATA
app.use(bodyParser.json());             // FOR PARSING JSON DATA OF AJAX CALL

app.use(cookieParser());

app.use(session({

    secret : "secretkey",
    saveUninitialized : true,
    resave : false
}));


//DEFINING ROUTERS

//ROUTER OF HOME PAGE
app.get("/", (req, resp) => {

        resp.sendFile(curPath + "/views/home.html");
});

app.get("/loginForm",(req,resp)=>{
    resp.sendFile(curPath + "/views/login.html");
})

app.post("/login",(req,resp)=>{

    let uname = req.body.uname;
    let pwd = req.body.pwd;

    if(uname == "mukul19" && pwd == "Mukul@123"){
        
        req.session.uname = uname;
        resp.send(true);
    }else{
        resp.send(false);
    }
});

app.get("/logout",(req,resp)=>{
    
    if(req.session.uname){
        req.session.destroy(()=>{
            resp.send("Session destroyed");
        });
    }else{
        resp.send("Session not exits");
    }
   
});

app.get("/check",(req,resp)=>{

    if(req.session.uname){
        resp.send(req.session.uname);

    }else{
    resp.send("PLease login frist");
        
    }
});



//GET LIST OF ALL STUDENTS
app.get("/students", (req, resp) => {
    student.getStudents(req, resp);
});

//GET INSERT FORM PAGE
app.get("/insertPage", (req,resp)=>{
    resp.sendFile(curPath + "/views/insert.html");
});

//ADD A STUDENT RECORD
app.post("/insert", (req,resp)=>{
    student.insertStudent(req,resp);
});

//GET SEARCH PAGE
app.get("/searchPage", (req,resp)=>{
    resp.sendFile(curPath + "/views/search.html");
});

//GET A STUDENT BY ID
app.post("/search", (req,resp)=>{
    student.searchStudent(req,resp);
});

//DELETE A STUDENT BY ID
app.post("/delete",(req,resp)=>{
    student.deleteStudent(req,resp);
});


//GET UPDATE FORM PAGE
app.post("/updateForm",(req,resp)=>{
    student.getUpdateForm(req,resp);
});


// UPDATE A RECORD 
app.post("/update",(req,resp)=>{
    student.update(req,resp);
});




//APP LISTENING THE EVENT
app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
});