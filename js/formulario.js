function fieldsAdd(varNum, varField){
    
    var num = document.getElementById(varNum).value;
    if(num > 0 && num <=4){
        
        let addFields = '';
        for (var i = 1; i <= num; i++){
            let newFields = `
            
            <div class="input-field col s12">
                <textarea id="${varField}-${i}" name="${varField}-${i}" class="materialize-textarea"></textarea>
                <label for="textarea${i}">Instrucci&oacute;n ${i}.</label>
            </div>

            `
            addFields+=newFields;
        }

        document.getElementById(varField).innerHTML = addFields;

    }
}

function addArray(nPaso, fieldName){
    var arreglo = [];
    for(let i = 0; i < nPaso; i++){
        let valor = document.getElementById(fieldName+'-'+(i+1)).value;
        arreglo.push(valor); 
    }
    return arreglo;
}

function emptyImg(img){
    if(img==undefined){
         //return img.value = 'unnamed.jpg';
         //return storage.ref('Imagenes/unnamed.jpg');
         return 'unnamed.jpg'
    }else{
        return String(img.name);
    }
    
}

// Convert YouTube URL to Embed
function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
}   


//add data
const form = document.getElementById('addCursoForm');

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    if(confirm('¿Los datos son correctos?')){
        let nPaso1 = form.numPaso1.value;
        let nPaso2 = form.numPaso2.value;
        let nVideo = form.numDescripcionVideo.value;
        let curso = document.getElementById('cursoNombre').value;
        let imagen = document.getElementById('imagen').files[0];
        let imgVerified = emptyImg(imagen);

        paso1Array = addArray(nPaso1, 'varPaso1');
        paso2Array = addArray(nPaso2, 'varPaso2');
        videoArray = addArray(nVideo, 'varDescripcion');
        
        let titulo= String(document.getElementById('tituloCurso').value);
        let tab= String(document.getElementById('nombreTab').value);
        let sub= String(document.getElementById('subtituloCurso').value);
        let numtutorial= parseInt(document.getElementById('numTutorial').value);
        let paso1n= String(document.getElementById('paso1field').value);
        let paso2n= String(document.getElementById('paso2field').value);
        let nvideo= String(document.getElementById('nombreVideo').value);
        let descvideo= String(document.getElementById('descripcionVideo').value);
        let iframe= String(document.getElementById('iFrame').value);
        let descCard= String(document.getElementById('descCard').value);

        //converting url to iframe
        var videoId = getId(iframe);

        //Switch para definir los colores y la imagen de cada uno de los tutoriales. Dependiendo del tutorial se cambian.
        let color = ''
        let cardImagenUrl = ''

        switch (curso) {
            case 'Teams':
                color = 'indigo lighten-1';
                cardImagenUrl = 'https://firebasestorage.googleapis.com/v0/b/autenticacion-9ff38.appspot.com/o/Imagenes%2FLogosCards%2FTeams1.1.png?alt=media&token=6e2d501b-c41d-4053-83c1-291ef63b439e'
              break;
            case 'Whiteboard':
                color = 'blue accent-4';
                cardImagenUrl = 'https://firebasestorage.googleapis.com/v0/b/autenticacion-9ff38.appspot.com/o/Imagenes%2FLogosCards%2FcardWhiteboard1.1.png?alt=media&token=cfb3545a-744c-4180-ae2e-9954e16a5a24'
            break;
            case 'OneDrive':
                color = 'blue lighten-3';
                cardImagenUrl = 'https://firebasestorage.googleapis.com/v0/b/autenticacion-9ff38.appspot.com/o/Imagenes%2FLogosCards%2FcardOneDrive1.1.png?alt=media&token=ce2b7e07-307a-406d-986f-a4e4d38adf62'
            break;
            case 'Calendar':
                color = 'light-blue';
                cardImagenUrl = 'https://firebasestorage.googleapis.com/v0/b/autenticacion-9ff38.appspot.com/o/Imagenes%2FLogosCards%2FcardCalendar1.1.png?alt=media&token=c136c25a-ca13-41e1-b5ef-dbc7645db1ca'
            break;
            case 'OneNote':
                color = 'deep-purple lighten-1';
                cardImagenUrl = 'https://firebasestorage.googleapis.com/v0/b/autenticacion-9ff38.appspot.com/o/Imagenes%2FLogosCards%2FcardOneNote1.1.png?alt=media&token=1933d52d-3621-451e-8198-b2fa72c2fc6e'
            break;
            case 'Forms':
                color = 'teal lighten-2';
                cardImagenUrl = 'https://firebasestorage.googleapis.com/v0/b/autenticacion-9ff38.appspot.com/o/Imagenes%2FLogosCards%2FcardForms1.1.png?alt=media&token=6db2e889-f215-4aa8-a58f-2494083ee48f'
            break;

            default:
                color = 'deep-orange darken-4';
              //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
              break;
          }


        var storageRef = storage.ref('Imagenes/'+curso+'/'+imgVerified);

        if(imgVerified!='unnamed.jpg'){
            let uploadTask = storageRef.put(imagen);
                    uploadTask.on('state_changed',function(snapshot){
                        var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                        console.log('Upload is '+parseInt(progress)+'% done');
                    },function(error){
                        console.log(error.message);
                    },function(){
                        storageRef.getDownloadURL().then(function(url){
                            let data = arrayJSON(titulo,tab,sub,numtutorial,paso1n,paso1Array,paso2n,paso2Array,url,nvideo,descvideo,videoArray,videoId,descCard,color,cardImagenUrl);

                            db.collection(curso).add(data);
                        });
                    })
        }else{
            storageRef = storage.ref('Imagenes/'+imgVerified);
                storageRef.getDownloadURL().then(function(url){
                    let data = arrayJSON(titulo,tab,sub,numtutorial,paso1n,paso1Array,paso2n,paso2Array,url,nvideo,descvideo,videoArray,videoId,descCard,color,cardImagenUrl);

                    db.collection(curso).add(data);
                });
            }
        alert("Se Añadieron Correctamente");
        form.reset();      
    }
});

//
function arrayJSON(titulo,tab,sub,numtutorial,paso1n,paso1Array,paso2n,paso2Array,url,nvideo,descvideo,videoArray,iframe,descCard,color,cardimg){
    var data = {
        tituloCurso: titulo,
        tituloTab: tab,
        subtituloCurso: sub,
        numTutorial: numtutorial,
        paso1Nombre: paso1n,
        paso1Array: paso1Array,
        paso2Nombre: paso2n,
        paso2Array: paso2Array,
        imgUrl: url,
        nombreVideo: nvideo,
        descripcionVideo: descvideo,
        videoArray: videoArray,
        iFrameTag: iframe,
        descripcionCard: descCard,
        color: color,
        cardImagenUrl: cardimg
    };
    return data;
}
/*
function fieldsDescripcion(){
    var num = document.getElementById("numDescripcionVideo").value;
    if(num > 0 && num <=3){
        
        let addFields = '';
        for (var i = 1; i <= num; i++){
            let newFields = `
            
            <div class="input-field col s12">
              <input id="paso${i}" type="text" class="validate">
              <label for="paso${i}">Nombre de la descripci&oacute;n ${i} del Video</label>
            </div>

            `
            addFields+=newFields;
        }

        document.getElementById('varDescripcion').innerHTML = addFields;

    }
}


var txtArea = document.querySelector('.materialize-textarea')

txtArea.addEventListener('click', function () {
    console.log('Hola we');
    var textNeedCount = document.querySelectorAll('#input_text, #textarea2, textarea');
    M.CharacterCounter.init(textNeedCount);
    });



document.addEventListener('DOMContentLoaded', function () {
    var textNeedCount = document.querySelectorAll('#input_text, #textarea1',);
    M.CharacterCounter.init(textNeedCount);
});*/