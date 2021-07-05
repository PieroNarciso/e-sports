
var queryFiltros = ''


const actualizarFiltrosLider = () => {
    queryFiltros = ''
    var cbAbierto = document.getElementById('cbAbierto').checked
    var cbEnCurso = document.getElementById('cbEnCurso').checked
    var cbCerrado = document.getElementById('cbCerrado').checked
    var cbInscrito = document.getElementById('cbInscrito').checked
    var cbNoInscrito = document.getElementById('cbNoInscrito').checked
    queryFiltros = queryFiltros.concat('&', "cbAbierto=", cbAbierto, '&', "cbEnCurso=", cbEnCurso, '&',
        "cbCerrado=", cbCerrado, '&', "cbInscrito=", cbInscrito, '&', "cbNoInscrito=", cbNoInscrito)
    document.getElementById('aplicarFiltrosLider').href = "/torneos?p=1".concat(queryFiltros)
}

const actualizarFiltrosOrg = () => {
    queryFiltros = ''
    var txtNombre = document.getElementById('txtNombre').value
    console.log(txtNombre)
    queryFiltros = queryFiltros.concat('&nomb=', txtNombre)
    var string = "/torneos?p=1".concat(queryFiltros)
    console.log(queryFiltros)
    window.location = string
}

const mostrarFiltros = () => {
    const filtros = document.getElementById('filtros')
    if (filtros.hidden == true) filtros.hidden = false
    else filtros.hidden = true
    // ¿es lider?
    if (checkbox != null) actualizarFiltrosLider()
}


var checkbox = document.getElementById('cbAbierto')
if (checkbox != null) {
    document.getElementById('cbAbierto').addEventListener('click', actualizarFiltrosLider)
    document.getElementById('cbEnCurso').addEventListener('click', actualizarFiltrosLider)
    document.getElementById('cbCerrado').addEventListener('click', actualizarFiltrosLider)
    document.getElementById('cbInscrito').addEventListener('click', actualizarFiltrosLider)
    document.getElementById('cbNoInscrito').addEventListener('click', actualizarFiltrosLider)
}
document.getElementById('btnFiltro').addEventListener('click', mostrarFiltros)

var o = document.getElementById('aplicarFiltrosOrg')
if (o != null) {
    o.addEventListener('click', () => {
        actualizarFiltrosOrg();
    })
}
    


