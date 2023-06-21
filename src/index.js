const express = require('express')
const noteRouter = require('./routes/noteRoutes')
const userRouter = require('./routes/userRoutes') 
const { authUser, authRole } = require('../middlewares/basicAuth')
const app = express()

const mongoose = require('mongoose')
const { scopedNotes } = require('./permissions/project')
const note = require('./models/note')

app.use(express.json())

db.ROLES = ["user", "admin"];

app.use((req, res, next)=>{
    console.log("HTTP Method - " + req.method + " , URL - " +req.url)
    next()
})

app.use("/users", authUser, userRouter)
app.use("/note", authUser, noteRouter)

app.get("/", authUser, (req, res) => {
    res.json(scopedNotes(req.user, note))   
})

app.get('/admin',requireAdmin, (req, res, next)=> {
    if (request.decoded.role != 'admin') {
        response.json({message: 'Permission denied.' });
    }
    else {
        next(res.send('Admin Page'));
    }
    // if('admin' == currentUserRole )
    //  {
    //     res.send('Admin Page')
    //      next();
    //  }
    //  else{
    //       next(Error("Permission denied."));
    //  }  

})


mongoose.connect("mongodb+srv://Shivansh:Shivansh@cluster0.fj9tzbe.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    app.listen(4000, () => {
        console.log('Server is running on port no. 4000')
    })
})
.catch((error)=>{
    console.log(error);
})


