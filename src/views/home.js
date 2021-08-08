import React from 'react'
import UsuarioService from '../app/service/usuarioService'

import LocalStorageService from '../app/service/localStorageService'

class Home extends React.Component{

    state = {
        saldo: 0
    }

    constructor(){
        super()
        this.UsuarioService = new UsuarioService();
    }

    componentDidMount(){
        
        const user = LocalStorageService.getItem('_usuarioLogado')
        
        this.UsuarioService.obterSaldo(user.id).then( response => {
            this.setState( {saldo: response.data} )
        }).catch( error =>{
            console.error(error.response)
        })
    }

    render(){
        return(
            <figure className="text-center">
                <blockquote className="blockquote">
                    <h1 className="display-3">Bem vindo!</h1>
                    <p className="lead">Esse é seu sistema de finanças.</p>
                    <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                    <a className="btn btn-outline-info" href="/lancamentos" role="button"><i className="fa fa-users"></i>  Cadastrar Lançamento</a>
                    <hr className="my-4"/>
                    <p>Controle suas Financas apenas lancando Receitas e Despesas e o resto faremos por você</p>
                    
                </blockquote>
                <figcaption className="blockquote-footer">
                    Utilize a área administrativa para conferir detalhadamente seus<cite title="Source Title"> Lancamentos</cite>
                </figcaption>
            </figure>
        )
    }
}

export default Home