import React from 'react'
import Card from '../components/card'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'

import { toastrError, toastrSuccess } from '../components/toastr'

class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaConfirmacao: ''
    }

    constructor(){
        super()
        this.service = new UsuarioService()
    }


    validar(){
        const msg = [ ];
        if(!this.state.nome){
            msg.push('O campo nome é OBRIGATÓRIO')
        }

        if(!this.state.email){
            msg.push('O campo email é OBRIGATÓRIO')
        }else if( !this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i) ){
            msg.push('O campo email precisa ser válido')
        }

        if(!this.state.senha || !this.state.senhaConfirmacao){
            msg.push('Senha inválida')
        }else if(this.state.senha !== this.state.senhaConfirmacao){
            msg.push('Senhas não conferem')
        }

        return msg
    }


    cadastrar = () =>{
        const msg = this.validar()

        if(msg && msg.length > 0){
            msg.forEach( (msg, index)=>{
                toastrError(msg)
            })
            return false
        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }

        this.service.salvar(usuario).then( response =>{
            toastrSuccess('Usuario cadastrado com sucesso. Faça Login para acessar o sistema')
            this.props.history.push('/login')
        }).catch( erro =>{
            toastrError(erro.response.data)
        })
    }


    cancelarCadastro = () =>{
        this.props.history.push('/login')
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6" style= { {position: 'relative', left: '300px'} }>
                        <div className="bs-docs-section">
                            <Card title="Cadastro de Usuario">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            <div className="form-group">
                                                <label htmlFor="inputNome">Nome: *</label>
                                                <input type="text" 
                                                    value={this.state.nome} 
                                                    onChange={ e => this.setState( {nome: e.target.value} ) }
                                                    className="form-control" 
                                                    id="inputNome" 
                                                    name="nome"
                                                    placeholder="Digite Seu Nome"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputEmail">Email: *</label>
                                                <input type="email" 
                                                    value={this.state.email} 
                                                    onChange={ e => this.setState( {email: e.target.value} ) }
                                                    className="form-control" 
                                                    id="inputEmail" 
                                                    name="email"
                                                    placeholder="Digite Seu Email"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputSenha">Senha: *</label>
                                                <input type="password" 
                                                    value={this.state.senha} 
                                                    onChange={ e => this.setState( {senha: e.target.value} ) }
                                                    className="form-control" 
                                                    id="inputSenha" 
                                                    name="senha"
                                                    placeholder="Digite Sua Senha"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputRepitaSenha">Repita a Senha: *</label>
                                                <input type="password" 
                                                    value={this.state.senhaConfirmacao} 
                                                    onChange={ e => this.setState( {senhaConfirmacao: e.target.value} ) }
                                                    className="form-control" 
                                                    id="inputRepeatSenha" 
                                                    name="senha"
                                                    placeholder="Digite Sua Senha Novamente"/>
                                            </div>
                                            <button type="button" className="btn btn-success" onClick={this.cadastrar}>Confirmar</button>
                                            <button type="button" className="btn btn-danger" onClick={this.cancelarCadastro}>Cancelar</button>
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

export default withRouter(CadastroUsuario)