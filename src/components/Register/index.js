import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './register.css';

class Register extends Component {

    constructor (props) {
        super (props);
        this.state = {
            nome: '',
            email: '',
            password: ''
        }

        this.register = this.register.bind(this);
        this.onRegister = this.onRegister.bind(this);
    }

    register (e) {
        e.preventDefault();
        this.onRegister();
    }

    onRegister = async () => {
        try {
            const { nome, email, password } = this.state;

            await firebase.register(nome, email, password);

            this.props.history.replace('/dashboard');
        }
        catch(err) {
            alert(err.message);
        }
    }

    render () {
        return (
            <div>
                <h1 className="register-h1">Novo usuário</h1>       
                <form onSubmit={this.register} id="register">
                    <label>Nome: </label><br/>
                    <input type="text" value={this.state.nome} 
                    autofocus autocomplete="off" placeholder="Nome"
                     onChange={(e)=>this.setState({nome: e.target.value})}/><br/>

                    <label>Email: </label><br/>
                    <input type="text" value={this.state.email} 
                     autocomplete="off" placeholder="teste@teste.com"
                     onChange={(e)=>this.setState({email: e.target.value})}/><br/>

                    <label>Senha: </label><br/>
                    <input type="password" value={this.state.password} 
                    autofocus autocomplete="off" placeholder="Digite uma senha"
                     onChange={(e)=>this.setState({password: e.target.value})}/><br/>

                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        );
    }
}

export default withRouter(Register);