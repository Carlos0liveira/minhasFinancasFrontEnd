import toastr from 'toastr'

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

export function toastrMsg(title, msg, tipo){
    toastr[tipo](msg, title)
}

export function toastrError(message){
    toastrMsg('Erro', message, 'error')
}

export function toastrSuccess(message){
    toastrMsg('Sucesso', message, 'success')
}

export function toastrWarning(message){
    toastrMsg('Alerta', message, 'warning')
}