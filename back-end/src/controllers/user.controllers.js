const userController = {};
const User = require('../models/User');

const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const encryptPassword = require('./encryptPassword');

userController.createUser = async(req, res) =>{
    try{
        const {name, email, password} = req.body;

        if(!req.body){
            return res.json({
                status: 400,
                success: false,
                error: 'You must provide a user',
            })
        }

        const newUser = new User({name, email, password});
        
        if (!newUser) {
            return res.json({ status: 400, success: false, error: err.errmsg })
        }
        
        newUser.password = await encryptPassword(newUser.password);
        await newUser.save();

        const token = jwt.sign({id: newUser._id}, secret, {
            expiresIn: 60*60
        });
        //HEADER.PAYLOAD.SIGNATURE-->algoritmo y tipo de token.datos de usuario/claims fecha de expiracion etc.firma que verifica si es valido el token
        return res.json({
            status: 201,
            success: true,
            id: newUser._id,
            userName: newUser.name,
            token,
            message: 'User created',
        })
    }catch (error){
        console.log(error);
        const message = "User not created";
        if(error.code == 11000){
            return res.json({
                status: 400,
                success: false,
                message: `${message}, The ${Object.keys(error.keyValue)} already exists`
            });
        }

        return res.json({
            status: 400,
            success: false,
            message: message
//            error: error.errmsg
        });
    }
}

userController.updateUser = async(req, res) =>{
    try{
        let body = req.body;

        if(!req.body){
            return res.json({
                status: 400,
                success: false,
                error: 'You must provide a atributes with values',
            })
        }
        //ENCRYP PASSWORD
        
        body.password =  await encryptPassword(body.password);

        await User.findOneAndUpdate( { _id: req.userId }, //findOneAndUpdate( { name: req.params.name } 
            body
        );
        //DECIR QUE NO SE ENCONTRO EL USUARIO
        return res.json({
            status: 200,
            success: true,
            message: 'User updated!',
        })
    }catch ( error ){
        return res.json({
            status: 400,
            message: 'User not updated',
            error: error.errmsg
        });
    }
}

userController.authenticaUser = async(req, res) =>{
    try{
        const {email, password} = req.body;
        await User.findOne({email: email}, async(err, user) =>{
            if (!user) {
                return res
                    .json({ status: 404, auth: false, error: `E-mail not exist` })
            }

            if(!(await user.validatePassword(password))){
                return res
                .json({ status: 401, auth: false, error: `Invalid password` })
            }

            if (err) {
                return res.json({ status: 400, auth: false, error: err })
            }

            const token = jwt.sign({id: user._id}, secret, {
                expiresIn: 60*60*24
            });
            return res.json({ status: 200, auth: true, token, data: user.name })
        });
    }catch (error){
        return res.json({
            status: 400,
            auth: false,
            message: 'E-mail not exist',
            error: error.errmsg
        });
    }
}

userController.descriptionUser = async(req, res) =>{
    try{
        await User.findById( (req.userId), {_id:0 ,password:0}, (err, user) => {//findOne( {name: req.params.name}
        
            if (!user) {
                /*return res
                    .status(404)
                    .json({ success: false, error: `User not found` })*/
                return res
                    .json({ status: 404, success: false, error: `User not found` })
            }

            if (err) {
                //return res.status(400).json({ success: false, error: err })
                return res.json({ status: 400, success: false, error: err })
            }

            //return res.status(200).json({ success: true, data: user })
            return res.json({ status: 200, success: true, data: user })
        })   
    }catch (error){
        return res.json({
            status: 400,
            success: false,
            message: 'User not found',
            error: error.errmsg
        });
    }
}

userController.deleteUser = async(req, res) =>{
    try{
        await User.findByIdAndDelete( (req.userId), (err, user) => {//User.findOneAndDelete( {name: req.params.name}, (err, user) => {
            
            if (!user) {
                return res
                    .json({ status: 404, success: false, error: `User not found` })
            }

            if (err) {
                return res.json({ status: 400, success: false, error: err})
            }

            return res.json({ status: 200, success: true, data: user, message: `User deleted!`})
        }).catch(error => { 
            console.log('caught', error.message); });
    }catch (error){
        return res.json({
            status: 400,
            success: false,
            menssage: `User not found`,
            error: error.errmsg
        });
    }
}

module.exports = userController;