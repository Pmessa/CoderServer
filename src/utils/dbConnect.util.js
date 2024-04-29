import {connect} from "mongoose"

async function dbconnect(){
    try {
        await connect(process.env.MONGO_URI)
        console.log("connected to mongo database")
    } catch (error) {
        console.log(error)
        
    }
} 

export default dbconnect
