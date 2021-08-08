import React from 'react'
import Card from '../components/card'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localStorageService'

import { toastrError } from '../components/toastr'

class Login extends React.Component{

    state = {
        email: '',
        senha: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    login = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then( response => { 
                LocalStorageService.addItem('_usuarioLogado', response.data)
                this.props.history.push('/home')
             }).catch( erro =>{
                toastrError(erro.response.data)
             }) 
    }

    prepareCadastrar = () =>{
        this.props.history.push('/cadastro-usuario')
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    
                    <div className="col-md-6" style= { {position: 'relative', left: '300px'} }>
                        <div className="bs-docs-section">
                            <Card title="Login">
                                <div className="row">
                                    <div className="col=lg-12">
                                        <div className="bs-component">
                                            <fieldset>
                                                <div className="form-group">
                                                    <label htmlFor="inputEmail">Email: </label>
                                                    <input type="email" 
                                                        value={this.state.email} 
                                                        onChange={ e => this.setState( {email: e.target.value} ) }
                                                        className="form-control" 
                                                        id="inputEmail" 
                                                        aria-describedby="emailHelp" 
                                                        placeholder="Digite Seu Email"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="inputEmail">Senha: </label>
                                                    <input type="password"
                                                        value={this.state.senha} 
                                                        onChange={ e => this.setState( {senha: e.target.value} ) }
                                                        className="form-control" 
                                                        id="inputPassword" 
                                                        placeholder="Digite sua Senha"/>
                                                </div>
                                                    <button type="button" className="btn btn-success" onClick={ this.login }>Login</button>
                                                    <button type="button" className="btn btn-info" onClick={this.prepareCadastrar}>Cadastre-se</button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter( Login )