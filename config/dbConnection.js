const mongoose = require('mongoose')

const dbConnect = async () => {
    mongoose.connect(process.env.MONGO_URI)
    .then((conn)=>{
        console.log(`db connected to ${conn.connection.host}`)
    })
    .catch((err)=>{
        console.log(err.message);
    })
}
module.exports = dbConnect