import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './login.css';

class Login extends Component {

    constructor (props) {
        super (props);
        this.state = {
            email: '',
            password: ''
        }

        this.entrar = this.entrar.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        // verifica se tem algum usuário logado!    
        if(firebase.getCurrent()) {
            return this.props.history.replace('/dashboard');
        }
    }


    entrar (e) {
        e.preventDefault();
        this.login();
    }

    async login() {
        const { email, password } = this.state;
        try {
          const r = await firebase.login(email, password);
          this.props.history.replace('/dashboard');
        } 
        catch (error) {
            if(error.code === 'auth/user-not-found') {
                alert('Esse usuário não existe');
            }
            else {
                alert("Código de erro: " + error.code);
                return null;
            }
        }
    }

    render () {
        return (
            <div>
                <form onSubmit={this.entrar} id="login">
                    <label>Email: </label><br/>
                    <input type="email" autoComplete="off" autoFocus value={this.state.email} onChange={e => {this.setState({email: e.target.value})}} placeholder="teste@teste.com"/><br/>
                    
                    <label>Password: </label><br/>
                    <input type="password" autoComplete="off"  value={this.state.password} onChange={e => {this.setState({password: e.target.value})}} placeholder="Sua senha" /><br/>

                    <button type="submit">Entrar</button>

                    <Link to="/register">Ainda não possui uma conta?</Link>

                </form>
            </div>
        );
    }
}

export default withRouter(Login);