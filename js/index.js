
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
var adminItems = document.querySelectorAll('.admin');
const listaInstrucciones = document.querySelector('.cards');
const listaFormulario = document.querySelectorAll('.form');


const setupUI = (user,admin,datos) => {
    if (user) {
        //console.log(admin);
        const html = `
        <h4 class="teal-text darken-1">${admin ? 'CUENTA ADMINISTRADORA' : 'BIENVENIDO'}</h4>
        <br>
        <div></h4>${datos.nombre} ${datos.apellido} - ${datos.profesion}</h4></div>
        <br>
        <div></h4>${datos.institucion}</h4></div>
        <br>
        <div><b>Inici&oacute; sesi&oacute;n como:</b> ${user.email}</div>
        <br>
        `;
        accountDetails.innerHTML = html;
        //Esconder elementos UI
        listaFormulario.forEach(item => item.style.display = 'block');
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
        //Barra de Formulario
        adminItems.forEach(item => item.style.display = 'none')
        if(admin==true){
            adminItems.forEach(item => item.style.display = 'block')
        }
    } else {
        adminItems.forEach(item => item.style.display = 'none')

        accountDetails.innerHTML = '';
        listaFormulario.forEach(item => item.style.display = 'none');
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}

const setupUpdateUI = (user,admin) => {
    if (user) {
        adminItems.forEach(item => item.style.display = 'none')
        if(admin==true){
            adminItems.forEach(item => item.style.display = 'block')
        }
    } else {
        adminItems.forEach(item => item.style.display = 'none')
    }
}

//Funcion para hacer una etiqueta de texto segun los datos que existan en los arreglos
function arrayInnerHTML(datosArray){
    let html = '';
    for(let i = 0;i<datosArray.length;i++){
        let li = `
        <li class="left-align">${datosArray[i]}</li>
        <br>
        `
        html+=li;
    }
    return html;
}

//setup tabs
const setuplistaInstrucciones = (data,docName) => {

    let html = '';
    let index = 1;
    let numDoc = 1;
    data.forEach(doc => {
        const datos = doc.data();

        let paso1HTML = arrayInnerHTML(datos.paso1Array);
        let paso2HTML = arrayInnerHTML(datos.paso2Array);
        let videoDescHTML = arrayInnerHTML(datos.videoArray);

        const inicioRow = `
        <div class="row">
        `;
        const finalRow =`
        </div>
        `;
        const div = `
                <div class="card hoverable medium col s12 m12 l4 xl4" onclick="updateInfo();">
                    <div class="card-image">
                    <img src="${datos.cardImagenUrl}" class="activator">
                    </div>
                    <div class="card-content">
                    <span class="card-title activator text-darken-4">${datos.tituloTab}<i class="material-icons right">more_vert</i></span>
                    <a class="btn modal-trigger ${datos.color}" href="#modal-${index}" onclick="reinicializarModals();">Ver Tutorial</a>

                        <!-- Estructura Modal -->
                        <div id="modal-${index}" class="modal">
                            <div class="modal-content">
                                <div class="instrucciones">
                                <div class="row">
                                <ul class="collapsible">
                                    <li>
                                    <div class="collapsible-header ${datos.color} white-text">
                                        ${datos.tituloTab} 
                                        <span class="new badge white-text" data-badge-caption="">Tutorial #${datos.numTutorial}</span>
                                    </div>
                                    </li>
                                </ul>
                                        <div id="iniciar" class="col s12 grey lighten-2">
                                            <div>
                                            <h3 class="black-text center">${datos.tituloCurso}</h3>
                                            </div>
                                
                                        <div class="row">
                                                <div class="col s12 l6 center">
                                                    <h5>${datos.subtituloCurso}</h5>
                                                    <br>
                                                    <ul class="left-align">1. ${datos.paso1Nombre}</ul>
                                                    <br>
                                                    <div class="container">
                                                        ${paso1HTML}
                                                    </div>
                                                    <br>
                                                    <ul class="left-align">2. ${datos.paso2Nombre}</ul>
                                                    <br>
                                                    <div class="container">
                                                        ${paso2HTML}
                                                    </div>
                                                </div>
                                                <br>
                                                <div class="col s6 l6 center">
                                                <img class="responsive-img" src="${datos.imgUrl}">
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div id="video" class="col s12 grey lighten-2">
                                        <br>
                                        <div>
                                            <h3 class="black-text center">${datos.nombreVideo}</h3>
                                            <br>
                                            </div>
                                            <div class="row">
                                                <div class="col s12 l6">
                                                    <div class="video-container">
                                                        <iframe width="560" height="315" src="//www.youtube.com/embed/${datos.iFrameTag}" frameborder="0" allowfullscreen></iframe>
                                                    </div>
                                                </div>
                                                <div class="col s12 l6">
                                                    <p class="left-align">${datos.descripcionVideo}</p>
                                                    <br>
                                                    ${videoDescHTML}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Estructura Modal -->
                    </div>
                    <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">${datos.tituloTab}<i class="material-icons right">close</i></span>
                    <p>${datos.descripcionCard}</p>
                    <button id="btn-${index}" class="btn red lighten-1 white-text admin" style="position: absolute; bottom: 50px; right: 50px;" data-id="${doc.id}" doc-id="${docName}" onclick="deleteDoc(this.getAttribute('data-id'),this.getAttribute('doc-id'));">
                        <i class="small material-icons" style="display: inline-flex; vertical-align: top;">delete</i>Borrar tutorial
                    </button>
                  </div>
                </div>
        `;
        //Algoritmo para saber cuando las tarjetas hacen salto de linea. Se ordenan en filas de 3.
        if(numDoc<=3 && numDoc>0){
            if(numDoc==1){
                html=html+inicioRow+div;
            }else if(numDoc==2){
                html+=div;
            }else{
                html=html+div+finalRow
            }
        }else{
            numDoc=1;
            html=html+inicioRow+div;
        }
        ++numDoc;
        ++index;
    });
    listaInstrucciones.innerHTML = html;
}

const setuplistaFake = () => {

    const div = `
    <div class="row">
    <div class="center col s12 m12 l12">
      <div class="card-panel red accent-2 panel-access">
        <span class="white-text">
            <h1>
                Para acceder a los Tutoriales necesitas estar REGISTRADO en la plataforma.
            </h1>
        </span>
      </div>
        <br>
        <br>
        <br>
        <br>
        <br>
    </div>
  </div>
          
    `;
    listaInstrucciones.innerHTML = div;
}


// componentes de materialize
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
});


//parallax imagenes
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.parallax');
    M.Parallax.init(elems);
});

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elems);
  });

//funciones

//reinicializar los modals para poder visualizarlos
function reinicializarModals(){
    $(document).ready(function(){
        $('.modal').modal();
        });
}
//reinicializa todas las clases para poder saber si la persona es admin
function updateInfo(){
    adminItems = document.querySelectorAll('.admin');
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection('users').doc(user.uid).get().then(snapshot => {
                    let datos = snapshot.data();
                    let userAdmin = datos.admin;
                    setupUpdateUI(user,userAdmin);
            }).catch(err => {
                console.log(err.message)
                });        
            }
        });  
}
//borrar documento
function deleteDoc(id,document){
    //console.log(id,document);
    if(confirm('Estas seguro que deseas borrar este tutorial?')){
        db.collection(document).doc(id).delete().then(e=>{
            location.reload();
        });
    }
}