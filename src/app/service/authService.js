import localStorageService from "./localStorageService";

export default class AuthService{
    
    static usuarioAutenticado(){
        const usuario = localStorageService.getItem('_usuarioLogado')
        return usuario && usuario.id
    }

    static removerUsuario(){
        localStorageService.removerItem('_usuarioLogado')
    }
}