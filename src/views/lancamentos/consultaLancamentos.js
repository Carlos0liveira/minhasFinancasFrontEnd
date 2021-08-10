import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import SelectMenu from '../../components/selectmenu'
import LancamentoTable from './lancamentoTable'

import LancamentoService from '../../app/service/lancamentoService'
import localStorageService from '../../app/service/localStorageService'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button';


import * as message from '../../components/toastr'

class ConsultaLancamentos extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: [],
        visible: false,
        lancamentoDeletar: []
    }
    
    constructor(){
        super();
        this.service = new LancamentoService();
    }

    buscar = () => {
        if (!this.state.ano) {
            message.toastrError('O preenchimento do campo ano é obrigatório')
            return false
        }


        const usuarioLogado = localStorageService.getItem('_usuarioLogado')

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(lancamentoFiltro)
            .then( response =>{
                this.setState( { lancamentos: response.data } )
            }).catch( error =>{
                console.log('erro')
            })
    }

    editar = (id) =>{
        this.props.history.push(`/cadastro-lancamentos/${id}`)
    }

    confirmaDeletar= ( lancamento ) => {
        this.setState( {visible : true, lancamentoDeletar: lancamento} )
    }

    cancelarDelecao = () =>{
        this.setState( {visible: false, lancamentoDeletar: []} )
    }

    deletar = ( ) =>{
        this.service.deletar(this.state.lancamentoDeletar.id)
            .then( response => {
                const lancamentos = this.state.lancamentos
                const index = lancamentos.indexOf(this.lancamentoDeletar)
                lancamentos.splice(index, 1)
                this.setState(lancamentos)
                this.setState( {visible: false} )
                message.toastrSuccess('Deletado com sucesso')
            }).catch( error=>{
                message.toastrError('Ocorreu um erro ao deletar o Lancamento')
            })
    }

    render(){
        const meses = this.service.obterListaMeses(); 
        const tipos = this.service.obterTipoLancamento();

        const dialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );

        return(
            <div className="container">
                <div className="row">
                    <div className="bs-docs-section"></div>
                    <Card title="Consulta de Lancamentos">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="bs-component">
                                    <div className="form-group">
                                        <label htmlFor="inputAno">Ano: *</label>
                                        <input type="number" 
                                            value={this.state.ano} 
                                            onChange={ e => this.setState( {ano: e.target.value} ) }
                                            className="form-control" 
                                            id="inputAno" 
                                            placeholder="Informe o ano"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputDescricao">Descricao: </label>
                                        <input type="text" 
                                            value={this.state.descricao} 
                                            onChange={ e => this.setState( {descricao: e.target.value} ) }
                                            className="form-control" 
                                            id="inputAno" 
                                            placeholder="Informe o ano"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputMes">Mes: </label>
                                        <SelectMenu 
                                            value={this.state.mes} 
                                            onChange={ e => this.setState( {mes: e.target.value} ) } 
                                            className="form-control" lista={meses} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputTipo">Tipo: </label>
                                        <SelectMenu 
                                            value={this.state.tipo} 
                                            onChange={ e => this.setState( {tipo: e.target.value} ) } 
                                            className="form-control" lista={tipos} 
                                        />
                                    </div>

                                    <button type="button" onClick={this.buscar} className="btn btn-success">Buscar</button>
                                    <button type="button" className="btn btn-warning"  onClick={ e => this.props.history.push('/cadastro-lancamentos') } >Cadastrar</button>
                                </div>
                            </div>
                        </div>
                        <div>
                        <Dialog header="Aviso" visible={this.state.visible} footer={dialogFooter} style={{ width: '50vw' }} modal={true} onHide={() => this.setState({visible: false})}>
                            <p>Deseja Realmente cancelar seu LANCAMENTO?</p>
                        </Dialog>

                        </div>
                    </Card>
                    <LancamentoTable 
                        lancamentos={this.state.lancamentos}
                        deleteAction={this.confirmaDeletar}
                        editAction={this.editar} />
                </div>
            </div> 
        )
    }
}

export default withRouter(ConsultaLancamentos)