import React from 'react'
import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from '../views/home'
import consultaLancamentos from '../views/lancamentos/consultaLancamentos'
import cadastroLancamentos from '../views/lancamentos/cadastroLancamnetos'

import AuthService from '../app/service/authService'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'



function RotaAutenticada( { component: Component, ...props } ){
    return (
        <Route {...props}  render={ (componentProps)=>{
            if(AuthService.usuarioAutenticado()){
                return(
                    <Component {...componentProps} />
                )
            }else{
                return (
                    <Redirect to={ {pathname: '/login', state : { from: componentProps.location}} } /> 
                )
            }
        } } />
    )
}

function Rotes(){
    return(
        <HashRouter>
            <Switch>
                <RotaAutenticada path="/cadastro-lancamentos/:id?" component={cadastroLancamentos} />
                <RotaAutenticada path="/consulta-lancamentos" component={consultaLancamentos} />
                <RotaAutenticada path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuario" component={CadastroUsuario} />
            </Switch>
        </HashRouter>
    )
}

export default Rotes