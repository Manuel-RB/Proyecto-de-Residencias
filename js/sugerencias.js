//sugerencias form

auth.onAuthStateChanged(function(user) {
    if (user) {
        let form = document.getElementById('form-sugerencias')
        form.addEventListener('submit', e=>{
            e.preventDefault();
            let sugerencias = document.getElementById('sugerencias').value;
            let userEmail = user.email;

            let today = new Date();
            let dia = String(today.getDate()).padStart(2, '0');
            //let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let mes = new Intl.DateTimeFormat('en', { month: 'long' }).format(today);
            let year = today.getFullYear();

            today = mes+' '+dia+', '+year;

            console.log(today);

            if(sugerencias!='' && sugerencias.length>10){
                db.collection('sugerencias').add({
                    email:userEmail,
                    sugerencia: sugerencias,
                    fecha: new Date(today)
                }).then(()=>{
                    alert('Gracias por tus comentarios!! Tu sugerencia ha sido almacenada con tu correo registrado! Lo tomaremos en cuenta!')
                    form.reset();
                });
            }else{
                alert('Necesitas escribir una sugerencia un poco más larga.')
            }
        })
    }
});

//get sugerencias

db.collection('sugerencias').orderBy('fecha').get().then(snapshot => {
    
    let tabla = document.getElementById('contenido-sugerencias')
    let html = '';
    let index = 1;
    snapshot.forEach(doc =>{
        let datos = doc.data();
        let fecha = datos.fecha.toDate();
        
        let m = moment(fecha);
        var mFormatted = m.locale('es').format("L");
        
        let div = `
        <tr>
            <td>${datos.email}</td>
            <td>${datos.sugerencia}</td>
            <td class="fecha">${mFormatted}</td>
            <td>
                <button id="btn-${index}" class="btn btn-small red lighten-1 white-text admin" data-id="${doc.id}" doc-id="sugerencias" onclick="deleteDoc(this.getAttribute('data-id'),this.getAttribute('doc-id'));">
                    <i class="small material-icons icon-delete" style="display: inline-flex; vertical-align: top;">delete</i>
                </button>
            <td>
        </tr>
        `;

        html+=div;
        ++index;
    })
    tabla.innerHTML+=html;
},err =>{
    console.log(err.message)
});