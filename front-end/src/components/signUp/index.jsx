import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { createUser, setToken, AuthContext } from '../../services';
import './index.scss';

export default class SignUp extends Component {

    static contextType = AuthContext;

    constructor(){
        super();
        this.state ={
            newUser:{
                name: '',
                email: '',
                password: '',
                repeatPassword: '',
            },
        };
    };

    componentDidMount = async () => {
        if(this.context.currentUser){
            this.props.history.push(`/dashboard`);
        }
    }

    handleChange = (event) =>{
        const { name, value } = event.target;
        const {newUser} = this.state;
        newUser[name] = value;
        this.setState({
            newUser
        });
    };
    //VERIFICAR CORREO ELECTRONICO
    passwordVerification = (password, repeatPassword) =>{
        const passwordCharacters = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/;
        if(!(password === '') && !(repeatPassword === '') ){
            if( password.length >= 6 ){
                if(password === repeatPassword){
                    if(passwordCharacters.test(password)){
                        return true;
                    }else{
                        toast.error(`La contraseña
                        debe contener,
                        numeros,
                        letras,
                        almenos una letra en Mayuscula y
                        almenos un caracter especial`);
                    }
                }else{
                    toast.error('Las contraseñas no son iguales');
                    return false;
                }
            }else{
                toast.error('La contraseña debe tener una longitud minima de 6');
                return false;
            }

        }else{
            toast.error('password o repeat password estan vacias');
            return false;
        }

    }

    submit = async () =>{
        try{
            const {name, email, password, repeatPassword} = this.state.newUser;
            if(this.passwordVerification(password, repeatPassword)){
                const newUser = await createUser( name, email, password );
                if(newUser.success){
                    this.context.setCurrentUser(await setToken(newUser.token));
                    toast.success(`Usuario ${name} creado`);
                    this.props.history.push(`/dashboard`);
                }else{
                    toast.error(newUser.message);
                }
            }
        }catch (error){
            toast.error('Error del servidor');
            console.log(error);
        }
    }
    //<!--El value en los inputs despues se usa para poder limpiar o resetear el input (resetForm())-->
    render (){
        return (
            <>
                <div className="row-signup">
                    <div className = "card text-center">

                        <img className = "card-img-top" alt = "login" src = "data:image/png;base64,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"/>
                        <div className="card-body">

                            <h5 className = "card-title" >Sing up</h5>
                            <form>
                                <div className = "mb-3">
                                    <input type = "text" className = "form-control" name ="name" value = {this.state.newUser.name} onChange = {(event) => this.handleChange(event) } placeholder="Name"/>
                                </div>
                                <div className = "mb-3">
                                    <input type = "text"  className = "form-control"  name ="email" onChange = {(event) => this.handleChange(event) } placeholder="Email"/>
                                </div>
                                <div className = "mb-3">
                                    <input type = "password"  className = "form-control" name ="password" onChange = {(event) => this.handleChange(event) } placeholder="Password"/>
                                </div>
                                <div className = "mb-3">
                                    <input type = "password"  className = "form-control" name ="repeatPassword" onChange = {(event) => this.handleChange(event) } placeholder="Repeat Password"/>
                                </div>
                            
                            </form>

                            <button className = "btn btn-primary" type = "submit" onClick = {() => this.submit()}>Create account</button>
                            <div className = "login">
                                <p className = "login-front">
                                    Have an account? 
                                </p>
                                <p className = "login-back">
                                    <Link to = "/">Login</Link>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }


}