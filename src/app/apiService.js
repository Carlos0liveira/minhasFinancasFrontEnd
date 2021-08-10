import Axios from 'axios'


const httpClient = Axios.create({
    baseURL: 'https://carlos-minhas-financas.herokuapp.com/'
})

class apiService {
    constructor(apiURL){
        this.apiURL = apiURL;
    }

    post(url, objeto){
        const requestURL = `${this.apiURL}${url}`;
        return httpClient.post(requestURL, objeto)
    }

    put(url, objeto){
        const requestURL = `${this.apiURL}${url}`;
        return httpClient.put(requestURL, objeto)
    }

    delete(url){
        const requestURL = `${this.apiURL}${url}`;
        return httpClient.delete(requestURL)
    }

    get(url){
        const requestURL = `${this.apiURL}${url}`;
        return httpClient.get(requestURL)
    }
}

export default apiService;