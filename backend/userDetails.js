const mongoose = require('mongoose');

const userDetailSchema = new mongoose.Schema(
    {
        fname:String,
        lname:String,
        email:{type:String,unique:true},
        password:String,
    },
    {collection:'Usersinfo'}
);

mongoose.model("Usersinfo",userDetailSchema);