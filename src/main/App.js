import React from "react";

import Rotes from './router.js'
import Header from '../views/header'

import "toastr/build/toastr.min.js"

import 'bootswatch/dist/lux/bootstrap.css'
import "../css/custom.min.css"
import "toastr/build/toastr.css"
import "toastr/build/toastr.min.css"

import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'



class App extends React.Component {
  render(){
    return(
      <>
        <Header />
        <Rotes />
      </>
    )
  }
}

export default App;
