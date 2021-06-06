const userController = {};

const User = require('../models/User');

userController.getUsers = async(req, res) =>{
    try{
        /*const users = await User.find();
        res.json(users);*/
        await User.find({}, (err, users) => {
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
        await User.findById( (req.params.id), (err, user) => {
        
            if (!user) {
                return res
                    .status(404)
                    .json({ success: false, error: `User not found` })
            }

            if (err) {
                return res.status(400).json({ success: false, error: err })//Verificar el error .errmsg
            }

            return res.status(200).json({ success: true, data: user })
        }).catch(error => { 
            console.log('caught', error.message); });//PARA ARREGLAR PROMESAS RECHAZADAS
    }catch ( error ){
        return res.status(400).json({
            error: error.errmsg
        });
    }
}

userController.getUserByName = async(req, res) =>{
    try{
        await User.findOne( {name: req.params.name}, (err, user) => {//Find != FindOne
        
            if (!user) {
                return res
                    .status(404)
                    .json({ success: false, error: `User not found` })
            }

            if (err) {
                return res.status(400).json({ success: false, error: err })//Verificar el error .errmsg
            }

            return res.status(200).json({ success: true, data: user })
        })
    }catch ( error ){
        return res.status(400).json({
            error: error.errmsg
        });
    }
}

userController.createUser = async(req, res) =>{
    /*const {name, email, password} = req.body;
    const newUser = new User({name, email, password});
    await newUser.save();
    res.json({message:'usuario Creado'});*/
    try {
        const {name, email, password} = req.body;

        if(!req.body){
            return res.status(400).json({
                success: false,
                error: 'You must provide a user',
            })
        }

        const newUser = new User({name, email, password});

        if (!newUser) {
            return res.status(400).json({ success: false, error: err.errmsg })
        }

        await newUser.save();
        return res.status(201).json({
            success: true,
            id: newUser._id,
            userName: newUser.name,
            message: 'User created',
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: 'User not created',
            error: error.errmsg
        });
    }
}

userController.deleteUser = async(req, res) =>{//cmabiarlo a caracter
    try{
        await User.findByIdAndDelete( (req.params.id), (err, user) => {
            
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
    }catch ( error ){
        return res.status(400).json({
            error: error.errmsg
        });
    }
}

userController.updateUser = async(req, res) =>{
    try{
        
        const body = req.body;

        if(!req.body){
            return res.status(400).json({
                success: false,
                error: 'You must provide a atributes with values',
            })
        }

        await User.findOneAndUpdate( { _id: req.params.id }, 
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


module.exports = userController;