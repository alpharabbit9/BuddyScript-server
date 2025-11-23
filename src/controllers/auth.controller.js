import bcryptjs from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../lib/utils.js";


export const signUp = async (req, res) => {

    const { fullName, email, password } = req.body;

    try {

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" })
        }

        const user = await User.findOne({email});

        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })


        if (newUser) {

            generateToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            })

        }

        else {

            return res.status(400).json({ message: "Invalid user data" })

        }


    } catch (error) {


        console.log('Error in signUp controller:', error);
        res.status(500).json({ message: "Server error" });

    }
}


export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })



    } catch (error) {

        console.log('Error in login controller:', error);
        res.status(500).json({ message: "Server error" });

    }

}


export const logout = (req, res) => {

    res.cookie('jwt', '', { maxAge: 0 });

    return res.status(200).json({ message: "Logged out successfully" })
}