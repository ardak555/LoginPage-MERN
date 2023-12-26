const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

const cors = require('cors');
app.use(cors());

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const JWT_SECRET = "hvdavay6ert657485675()dgshfhjgfdj3895478t9647hbkbhkjdbh856vkbh?[]ghgg457fgfg"

const mongoUrl  = "mongodb+srv://admin:<pass>@cluster0.w4acqkl.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoUrl, {
    useNewUrlParser: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.log(err));

// require('.userDetails');

// const User = mongoose.model("Usersinfo");

// // app.get("/register",(req,res)=>{
// //     const {name,surname,email,password} = req.body;
// //     try {
// //         await User.create({
// //             fname:name,
// //             lname:surname,
// //             email,
// //             password
// //         });
// //         res.send("User created");
// //     } catch (error) {
// //         console.log(error);
        
// //     }
// // })

require('./userDetails');

const User = mongoose.model("Usersinfo");
app.post("/register", async (req, res) => {
    
    const {fname,lname,email,password} = req.body;

    const enctyptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
           return res.send({ error: "User already exists" });
        }
        await User.create({
            fname,
            lname,
            email,
            password:enctyptedPassword,
        });
        res.send({ status: "ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});


app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;
 

    const user = await User.findOne({ email });
 
    if (!user) {

        return res.json({ error: "Invalid email" });
    }

    const passCorrect =  bcrypt.compare(password, user.password);
    
    if (passCorrect) {
 
        const token = jwt.sign({email:user.email}, JWT_SECRET);
        return res.json({ status: "ok", data: token });
    }else if(password != user.password){
       return res.json({ status: "error", error: "Invalid Password" });
    }
    return res.json({ error: "error"});
});

app.post("/userData", async (req, res) => {
    const {token} = req.body;
    try {
       const user = jwt.verify(token, JWT_SECRET); 
       const useremail = user.email;
       User.findOne({email:useremail}).then((data)=>{
           res.send({status:"ok", data: data});
       })
       .catch((error)=>{
           res.send({status:"error", error:error});
       });
    } catch (error) {
        
    }
});


app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})


//nodemon app ile çalışıyor