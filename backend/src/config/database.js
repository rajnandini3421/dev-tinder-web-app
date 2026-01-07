const mongoose =  require("mongoose")
const MONGO_PASSWORD =  encodeURIComponent("Nandini@1234")
const CONNECTION_STRING = `mongodb+srv://rajnandinimahajan22:${MONGO_PASSWORD}@cluster0.annserx.mongodb.net/devTinder`
const connectDB = async() =>{
  await mongoose.connect(CONNECTION_STRING)
}

module.exports = connectDB