const userController = {};
const User = require('../models/User');
const Admin = require('../models/Admin');

const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const encryptPassword = require('./encryptPassword');

userController.descriptionAdmin = async(req, res) =>{
    try{
        await Admin.findById( (req.userId), (err, user) => {//findOne( {name: req.params.name}
        
            if (!user) {
                return res
                    .status(404)
                    .json({ success: false, error: `User not found` })
            }

            if (err) {
                return res.status(400).json({ success: false, error: err })
            }

            return res.status(200).json({ success: true, data: user })
        })   
    }catch (error){
        return res.status(400).json({
            success: false,
            message: 'User not find',
            error: error.errmsg
        });
    }
}

userController.updateAdmin = async(req, res) =>{
    try{
        let body = req.body;

        if(!req.body){
            return res.status(400).json({
                success: false,
                error: 'You must provide a atributes with values',
            })
        }

        //ENCRYP PASSWORD
        
        body.password =  await encryptPassword(body.password);

        await Admin.findOneAndUpdate( { _id: req.userId }, //findOneAndUpdate( { name: req.params.name } 
            body
        );

        return res.status(200).json({
            success: true,
            message: 'User updated!',
        })
    }catch ( error ){
        return res.status(400).json({
            message: 'User not updated',
            error: error.errmsg
        });
    }
}

userController.authenticaAdmin = async(req, res) =>{
    try{
        const {email, password} = req.body;
        await Admin.findOne({email: email}, async(err, user) =>{ // or name: name?
            if (!user) {
                return res
                    .status(404)
                    .json({ auth: false, error: `E-mail not exist` })
            }

            if(!(await user.validatePassword(password))){
                return res
                .status(401)
                .json({ auth: false, error: `Invalid password` })
            }

            if (err) {
                return res.status(400).json({ auth: false, error: err })
            }

            const token = jwt.sign({id: user._id}, secret, {
                expiresIn: 60*60*24
            });

            return res.status(200).json({ auth: true, token })
        });
    }catch (error){
        return res.status(400).json({
            auth: false,
            message: 'E-mail not exist',
            error: error.errmsg
        });
    }
}

userController.deleteAdmin = async(req, res) =>{
    try{
        await Admin.findByIdAndDelete( (req.userId), (err, user) => {//User.findOneAndDelete( {name: req.params.name}, (err, user) => {
            
            if (!user) {
                return res
                    .status(404)
                    .json({ success: false, error: `User not found` })
            }

            if (err) {
                return res.status(400).json({ success: false, error: err})
            }

            return res.status(200).json({ success: true, data: user, message: `User deleted!`})
        }).catch(error => { 
            console.log('caught', error.message); });
    }catch (error){
        return res.status(400).json({
            success: false,
            menssage: `User not found`,
            error: error.errmsg
        });
    }
}

userController.getUsers = async(req, res) =>{
    try{
        await User.find({}, {_id: 0, password: 0}, (err, users) => {
            if (err) {
                return res.status(400).json({ success: false, error: err.errmsg })
            }
            if (!users.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Have not users` })
            }
            return res.status(200).json({ success: true, data: users })
        })
    }catch (error){
       return res.status(400).json({
            success: false,
            error: error.errmsg
        });
    }
}

userController.getUser = async(req, res) =>{
    try{
        const email = req.body.email;
        await User.findOne( {email}, {password:0}, (err, user) => {//findOne( {name: req.params.name}
        
            if (!user) {
                return res
                    .status(404)
                    .json({ success: false, error: `User not found` })
            }

            if (err) {
                return res.status(400).json({ success: false, error: err })
            }

            return res.status(200).json({ success: true, data: user })
        })   
    }catch (error){
        return res.status(400).json({
            success: false,
            message: 'User not find',
            error: error.errmsg
        });
    }
}

userController.updateUser = async(req, res) =>{
    try{
        let body = req.body;

        if(!req.body){
            return res.status(400).json({
                success: false,
                error: 'You must provide a atributes with values',
            })
        }

        
        body.password =  await encryptPassword(body.password);
        console.log(body.password);

        await User.findOneAndUpdate( { email: body.email }, //findOneAndUpdate( { name: req.params.name } HACER POR ID
            body
        );

        return res.status(200).json({
            success: true,
            message: 'User updated!',
        })
    }catch ( error ){
        return res.status(400).json({
            message: 'User not updated',
            error: error.errmsg
        });
    }
}

userController.deleteUser = async(req, res) =>{
    try{
        const email = req.body.email;
        await User.findOneAndDelete( {email}, (err, user) => {//User.findOneAndDelete( {name: req.params.name}, (err, user) => {
            
            if (!user) {
                return res
                    .status(404)
                    .json({ success: false, error: `User not found` })
            }

            if (err) {
                return res.status(400).json({ success: false, error: err})
            }

            return res.status(200).json({ success: true, data: user, message: `User deleted!`})
        }).catch(error => { 
            console.log('caught', error.message); });
    }catch (error){
        return res.status(400).json({
            success: false,
            menssage: `User not found`,
            error: error.errmsg
        });
    }
}

module.exports = userController;