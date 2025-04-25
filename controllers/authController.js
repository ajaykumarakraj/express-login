import hashPassword, { comparePassword } from "../helpers/authhelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken"
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body
        //validation
        if (!name) {
            res.send({ error: "name is require" })
        }
        if (!email) {
            res.send({ error: "email is require" })
        }
        if (!password) {
            res.send({ error: "password is require" })
        }
        if (!phone) {
            res.send({ error: "phone is require" })
        }
        if (!address) {
            res.send({ error: "address is require" })
        }

        //check user
        const existingUser = await userModel.findOne({ email })
        //existing  user
        if (existingUser) {
            return res.status(200).send({
                succes: true,
                message: "user already Regiter please login"
            })
        }
        // register user  
        const hashedPassword = await hashPassword(password)
        // save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save()
        res.status(201).send({
            succes: true,
            message: "user Register success",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            succes: false,
            message: "error in Register"
        })
    }
};

// login post
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        // validation 
        if (!email || !password) {
            return res.status(404).send({
                succes: false,
                message: "invalid email or password"
            })
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                succes: false,
                message: "email is not register"

            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                succes: false,
                message: "Invalid Password"
            })
        }
        //Token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).send({
            succes: true,
            message: "login succes",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address

            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            succes: false,
            message: "error in login",
            error
        })
    }
}

// test controller 
export const testController = (req, res) => {
    res.send("test protect rotes")
}