import {connect} from "mongoose"

async function dbconnect(){
    try {
        console.log("conectando")
        await connect(process.env.MONGO_URI)
        console.log("connected to mongo database")
    } catch (error) {
        console.log(error)
        
    }
} 

export default dbconnect
