import React from 'react';

import HeaderItem from '../components/headerItem';
import AuthService from '../app/service/authService';
import localStorageService from '../app/service/localStorageService';

const deslogar = () => {
    AuthService.removerUsuario()
    
}

class Header extends React.Component{
    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <div className="navbar-brand">Minhas Financas</div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarColor03">
                            <ul className="navbar-nav me-auto">
                                <HeaderItem href="#/Home" label="Inicio" />
                                <HeaderItem href="#/consulta-lancamentos" label="Consulta Lancamentos" />
                                <HeaderItem href="#/cadastro-lancamentos" label="Lancamentos" />
                            </ul>
                            <form className="d-flex">
                                {localStorageService.getItem('_usuarioLogado') !== null ? (
                                        <a onClick={deslogar} className="btn btn-secondary my-2 my-sm-0" href="#/login"> Deslogar </a>
                                    ) : (
                                        <a className="btn btn-secondary my-2 my-sm-0" href="#/login"> Login </a>
                                    )
                                }
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header