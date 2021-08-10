import React from 'react'
import Formatter from 'currency-formatter'

const lancamentoTable =  props =>{

    const rows = props.lancamentos.map( lancamentos => {
        return(
            <tr key={lancamentos.id}>
                <td>{lancamentos.descricao}</td>
                <td>{ Formatter.format(lancamentos.valor, { locale: 'pt-BR' } ) }</td>
                <td>{lancamentos.tipo}</td>
                <td>{lancamentos.mes}</td>
                <td>{lancamentos.status}</td>
                <td>
                    <button type="button" 
                        className="btn btn-primary"
                        onClick={ e => props.editAction(lancamentos.id) }   
                    >Editar</button>
                    <button type="button" 
                        className="btn btn-danger"
                        onClick={ e => props.deleteAction(lancamentos) }   
                    >Deletar</button>
                </td>
            </tr>
        )
    } )

    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default lancamentoTable