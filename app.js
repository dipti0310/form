const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService= require('./dbservice')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// create 
app.post('/insert',(request,response)=>{
    console.log(request.body);
    console.log("HERE");
    const {FName,LName,Dob,Parent_name,Address,city,phone} = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewName(FName,LName,Dob,Parent_name,Address,city,phone);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));

})


// read 
app.get('/getAll',(request,response)=>{
    console.log('test');
    const db=dbService.getDbServiceInstance();
    const result= db.getAllData();
    console.log("-----"+result);
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})


app.listen(process.env.PORT,()=>console.log('app is running'));
