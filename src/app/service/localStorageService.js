export default class localStorageService {

    static addItem(chave, valor){
        localStorage.setItem(chave,JSON.stringify(valor))
    }

    static getItem(chave){
        let item = localStorage.getItem(chave)
        return JSON.parse(item)
    }

    static removerItem(chave){
        localStorage.removeItem(chave)
    }
}   