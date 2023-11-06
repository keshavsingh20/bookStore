const express = require('express');
const User = require('../Model/User')
const bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken')

const router = express.Router();
const jwtKey = process.env.JWT_KEY;

router.post('/register', async (req, resp) => {
    const findUser = await User.findOne({ email: req.body.email })

    if (!findUser) {
        try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);

            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phoneNo: req.body.phoneNo,
                role: req.body.role,
                orders: [],
                address: "",
                state: "",
                country: "",
                pin: ""
            });
            let userData = await user.save();
            userData = userData.toObject();
            delete userData.password;

            if(userData) {
                Jwt.sign(userData, jwtKey,{expiresIn:"2h"}, (err, token)=>{
                    if(err) {
                        resp.send({res:"Something Went Wrong. Please try again after sometime."})
                    }
                    resp.status(200).send({userData, auth:token})
                })
            } 
        }
        catch (err) {
            resp.send(err)
        }
    }
    else {
        resp.send({res: "Email address already registered. Please use different email address."})
    }
})


router.post('/login',async (req, resp)=> {
    if(req.body.email && req.body.password) {
        try {
            let user = await User.findOne({email: req.body.email});
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

            if(user) {
                if(isPasswordValid) {
                    user = user.toObject()
                    delete user.password;
                    
                    Jwt.sign({user}, jwtKey, {expiresIn:'2h'}, (err, token)=> {
                        if(err) {
                            resp.send({res:"Something Went Wrong. Please try again after sometime."})
                        }
                        resp.status(200).send({user, auth:token});
                    })
                }
                else {
                    resp.send({res : "Invalid Password..! Please Enter Correct Password..!"})
                }
            }
            else {
                resp.send({res : "User not found...! Please register yourself..!"})
            }
        }
        catch(err) {
            // console.log(err)
            resp.send({res : "Internal Server Error...! Please try again after sometime..!"})
        }
    }
    else {
        resp.send({res : "User not found...! Please register yourself..!"})
    }
})

router.get('/profile/:id', async(req, resp)=> {
    let user = await User.find({_id: req.params.id}).select("-password");
    // console.log(user)
    resp.send(user)
})


router.put('/profile/edit/:id', async (req, resp)=> {
    let user = await User.updateOne(
        {_id : req.params.id}, 
        {
            $set: req.body
        }
    )
    resp.send(user)
})

router.put('/profile/change/password/:id', async (req, resp)=> {
    if (req.body.currentPassword && req.body.newPassword) {
        try {
            // Find the user by ID
            const user = await User.findById(req.params.id);

            if (user) {
                // Compare the current password with the one stored in the database
                const isPasswordValid = await bcrypt.compare(req.body.currentPassword, user.password);

                if (isPasswordValid) {
                    // If the current password is valid, update the password with the new one
                    const newPasswordHash = await bcrypt.hash(req.body.newPassword, 10);

                    let data = await User.updateOne(
                        { _id: req.params.id },
                        { $set: { password: newPasswordHash } }
                    );

                    resp.send(data);
                } else {
                    resp.send({ result: 'Current password is incorrect' });
                }
            } else {
                resp.send({ result: 'No user found' });
            }
        } catch (err) {
            resp.status(500).send({ result: 'Server error' });
        }
    } else {
        resp.send({ result: 'Invalid request' });
    }
})




module.exports = router;