import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connect at${conn.connection.host}`)
    } catch (error) {
        console.log("error in mongoose")
    }
}
export default connectDB