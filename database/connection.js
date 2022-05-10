const mongoose = require('mongoose');
const dotenv = require('dotenv')


mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connection with Database is done!');
}).catch((err)=>{
    console.log(`error in connection.js : ${err}`)
})

// const connectDB = async () => {
//     try {
//         console.log(process.env.MONGODB)
//         const conn = await mongoose.connect(process.env.MONGODB, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         })
//         console.log(`MongoDb connected : ${conn.connection.host}`);
//     } catch (err) {
//         console.log(`error in connection.js : ${err}`)
//     }
// }

// module.exports = connectDB;