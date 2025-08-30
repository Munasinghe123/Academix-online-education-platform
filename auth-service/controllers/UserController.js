const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const { json } = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const register = async (req, res) => {

    try {
        const { name,userName, email, password,phone } = req.body;

        console.log("request" , req.body);

        const photo = req.file ? req.file.filename : null;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            name,userName, password: hashedPassword, email, photo,phone
        });

        await newUser.save();

        res.status(200).json({ message: `new user registered ${name}` });
        console.log("new user registered");

    } catch (err) {
        console.log(err);
    }
}

const login = async (req, res) => {
    try {
        const { name, password } = req.body;

        const user = await UserModel.findOne({ name });

        if (!user) {
            return res.status(404).json({ message: "No such users" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(404).json({ message: "Passwords don't match" });
        }

        const accessToken = jwt.sign(
            { id: user._id, name: user.name, role: user.role, email: user.email, phone:user.phone },
            process.env.JWT_SECRET,
            { expiresIn: "7h" }
        );
        console.log("acccess token created")

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false, 
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/', 
        });

        res.status(200).json({ accessToken });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const checkToken = async (req, res) => {
    try {
        const token = req.cookies.accessToken;
        // console.log("token check, ",token);
        if (!token) return res.status(401).json({ message: "No token found" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "Invalid or expired token" });
    }
}


const logoutUser = (req, res) => {
    res.clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: 'Strict' }); 
    return res.status(200).json({ message: 'Logout successful' });
};


const addCourseProvider = async (req, res) => {

    try {
        const { name, email, password, role } = req.body;

        console.log("Request body:", req.body);

        const photo = req.file ? req.file.filename : null;

        const hashedPassword = await bcrypt.hash(password, 10)

        const newCourseProvider = new UserModel({
            name, email, password: hashedPassword, role, photo
        })

        await newCourseProvider.save();

        res.status(200).json({ message: `new user created with name , ${name}` })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "unable to create the user" });
    }

}
const getAllUsers = async (req, res) => {

    let users
    try {

        users = await UserModel.find();
        console.log("all users", users)

    } catch (err) {
        console.log(err);
    }
    res.status(200).json(users);
}

const getUserById = async (req, res) => {
    const id = req.params.id;

    let user;

    try {
        user = await UserModel.findById(id)

    } catch (err) {
        console.log(err)
    }

    if (!user) {
        res.status(404).json({ message: "no users" })
    }
    console.log("user details", user)

    res.status(200).json({ user })
}

const UpdateProfile = async (req, res) => {
    try {
        console.log("Data to be updated", req.body);

        const { id } = req.params;
        const { name, email, currentPassword, newPassword } = req.body;
        const photo = req.file ? req.file.filename : null;

        const existingUser = await UserModel.findById(id);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        existingUser.name = name || existingUser.name;
        existingUser.email = email || existingUser.email;

        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, existingUser.password);
            if (isMatch) {
                existingUser.password = await bcrypt.hash(newPassword, 10);
            } else {
                return res.status(400).json({ message: "Current password is incorrect" });
            }
        }

     
        if (photo) {
            if (existingUser.photo) {
                const oldPhotoPath = path.join(__dirname, '../uploads/', existingUser.photo);
                if (fs.existsSync(oldPhotoPath)) {
                    fs.unlinkSync(oldPhotoPath);
                }
            }
            existingUser.photo = photo;
        }

        await existingUser.save();

        res.status(200).json({ message: "Profile updated successfully", user: existingUser });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteUser = async (req, res) => {

    try {

        const { id } = req.params;

        await UserModel.findByIdAndDelete(id);

        res.status(200).json({ message: "user deleted" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "could delete the user" });
    }
}

module.exports = { register, login, logoutUser,checkToken, addCourseProvider, getAllUsers, getUserById, UpdateProfile, deleteUser }