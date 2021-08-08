import React from 'react'

class Card extends React.Component{

    render(){
        return(
            <div className="card md-3">
                 <h3 className="card-header" style={ {textAlign:'center'} }>{this.props.title}</h3>
                 <div className="card-body">
                    {this.props.children}
                 </div>
            </div>
        )
    }
}

export default Card;