import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import router from "./routes/authRoutes.js"
// import authRoutes from "./routes/authRoutes.js"
// rest object 
const app = express()
// configure
dotenv.config()

//database connection
connectDB()
//middleware
app.use(express.json())
app.use(morgan('dev'))

app.use("/api/v1/auth", router)

app.get("/", (req, res) => {
    // res.send({
    //     messege: "welcome express js"
    // })
    res.send("<h1>rgfkjds</h1>")
})

//listen
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`server is running ${process.env.DEV} at ${PORT}`)
})
