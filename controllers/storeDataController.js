const User = require('../models/User')

module.exports = (req,res) => {
    User.create(req.body).then(() => {
        
        console.log("Successfully storing data")
    
    }).catch((error) =>{
        console.log("error")
    })
}


