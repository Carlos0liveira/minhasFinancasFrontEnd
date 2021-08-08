import React from 'react'
import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from '../views/home'
import consultaLancamentos from '../views/lancamentos/consultaLancamentos'

import { Route, Switch, HashRouter } from 'react-router-dom'


function Rotes(){
    return(
        <HashRouter>
            <Switch>
                {/* <Route path="/" component={Home} /> */}
                <Route path="/consulta-lancamentos" component={consultaLancamentos} />
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuario" component={CadastroUsuario} />
            </Switch>
        </HashRouter>
    )
}

export default Rotes