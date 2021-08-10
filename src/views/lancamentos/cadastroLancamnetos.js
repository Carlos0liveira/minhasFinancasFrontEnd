import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'

import SelectMenu from '../../components/selectmenu'
import LancamentoService from '../../app/service/lancamentoService'
import localStorageService from '../../app/service/localStorageService'
import * as message from '../../components/toastr'



class CadastroLancamentos extends React.Component{

    componentDidMount(){
        const params = this.props.match.params

        if (params.id) {
            this.service.obterPorId(params.id)
            .then( response =>{
                this.setState( {...response.data, atualizando: true}  )
            }).catch( error =>{
                message.toastrError(error.response.data)
            })
        }
    }

    state = {
        id: null,
        usuario: '',
        descricao: '',
        ano: '',
        mes: '',
        valor: '',
        tipo: '',
        status: '',
        atualizando: false
    }

    constructor(){
        super()
        this.service = new LancamentoService()
    }

    submit = () => {

        const usuarioLogado = localStorageService.getItem('_usuarioLogado')

        const lancamento = {
            usuario: usuarioLogado.id,
            descricao: this.state.descricao,
            ano: this.state.ano,
            mes: this.state.mes,
            valor: this.state.valor,
            tipo: this.state.tipo
        }

        this.service.salvar(lancamento)
            .then( response =>{
                this.props.history.push('/consulta-lancamentos')
                message.toastrSuccess('Lancamento Cadastrado!')
            }).catch( error =>{
                message.toastrError(error.response.data)
            })
    }

    atualizar = () => {

        const usuarioLogado = localStorageService.getItem('_usuarioLogado')

        const lancamento = {
            usuario: usuarioLogado.id,
            descricao: this.state.descricao,
            ano: this.state.ano,
            mes: this.state.mes,
            valor: this.state.valor,
            tipo: this.state.tipo,
            status: this.state.status,
            id: this.props.match.params.id
        }

        this.service.atualizar(lancamento)
            .then( response =>{
                this.props.history.push('/consulta-lancamentos')
                message.toastrSuccess('Atualizado com Sucesso!')
            }).catch( error =>{
                console.log(error.response.data)
            })
    }



    render(){

        const tipo = this.service.obterTipoLancamento()
        const meses = this.service.obterListaMeses()

        return(
            <Card title= { this.state.atualizando ?  'Atualizar Lancamento' : 'Cadastro de Lancamento'   }>
                <div className="row"> 
                    <div className="cold-md-6">
                        <div className="form-group">
                            <div className="col-md-12">
                                <label htmlFor="inputDescricao">Descricao: *</label>
                                <input type="text" 
                                    value={this.state.descricao} 
                                    onChange={ e => this.setState( {descricao: e.target.value} ) }
                                    className="form-control" 
                                    id="inputDescricao" 
                                    placeholder="Informe a descricao"
                                />
                            </div>    
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group">
                        <div className="col-md-12">
                            <label htmlFor="inputAno">Ano: *</label>
                            <input type="number" 
                                value={this.state.ano} 
                                onChange={ e => this.setState( {ano: e.target.value} ) }
                                className="form-control" 
                                id="inputAno" 
                                placeholder="Informe o ano"
                            />
                        </div>    
                    </div>
                    <div className="form-group">
                        <div className="col-md-12">
                            <label htmlFor="inputMes">Mes: *</label>
                            <SelectMenu  className="form-control" 
                                id="inputMes" lista={meses} 
                                value={this.state.mes} 
                                onChange={ e => this.setState( {mes: e.target.value} ) }
                                />
                        </div>    
                    </div>
                    <div className="form-group">
                        <div className="col-md-12">
                            <label htmlFor="inputValor">Valor: *</label>
                            <input type="number" 
                                value={this.state.valor} 
                                onChange={ e => this.setState( {valor: e.target.value} ) }
                                className="form-control" 
                                id="inputValor" 
                                placeholder="Informe o valor"
                            />
                        </div>    
                    </div>
                    <div className="form-group">
                        <div className="col-md-12">
                            <label htmlFor="inputTipo">Tipo: *</label>
                                <SelectMenu className="form-control" 
                                    id="inputTipo" 
                                    lista={tipo} 
                                    value={this.state.tipo} 
                                    onChange={ e => this.setState( {tipo: e.target.value} )}
                                    />
                        </div>    
                    </div>
                    <div className="form-group">
                        <div className="col-md-12">
                            <label htmlFor="inputStatus">Status: *</label>
                                <input type="text" className="form-control" disabled value={this.state.status} />
                        </div>    
                    </div>
                </div>
                { this.state.atualizando ? (
                    <button className="btn btn-success" onClick={this.atualizar} >Atualizar</button>
                    ) : (
                        <button className="btn btn-success" onClick={this.submit} >Salvar</button>
                    )

                }
                <button className="btn btn-danger" onClick={ e => this.props.history.push('/consulta-lancamentos')} >Cancelar</button>
            </Card>
        )
    }

}

export default withRouter(CadastroLancamentos)