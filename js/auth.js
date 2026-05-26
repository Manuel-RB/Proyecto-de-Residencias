// COMPONENTES DE MATERIALIZE CSS

//registrarse
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit' , (e) => {
    e.preventDefault();

    // obtener info de usuario
    const name = signupForm['signup-name'].value;
    const lastname = signupForm['signup-lastname'].value;
    const ocuppation = document.querySelector('input[name="ocuppation"]:checked').value;
    const school = signupForm['signup-school'].value;
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    const errorDivRegister = document.querySelector('#wong-register');

    //registrar usuario
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        db.collection('users').doc(cred.user.uid).set({
            nombre: name,
            apellido: lastname,
            profesion: ocuppation,
            institucion: school,
            admin:false
        }).then(e=>{
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            errorDivRegister.innerHTML = '';
            signupForm.reset();
            document.getElementById('signup-password').type='password';
        });   
    }).catch(function(error) {
               
        var errorCode = error.code;
        var errorMessage = error.message;
        //Arroja cual es la razon por la que no se puede registrar el correo.
        if (errorCode === 'auth/invalid-email') {
            let div = `
                <div class="card-panel red accent-2" style="padding-top: 8px; padding-bottom: 8px;">
                <span class="white-text">
                        Correo no válido. Ingresa los datos nuevamente.
                </span>
                </div>
                `
            errorDivRegister.innerHTML = div;
        }else if(errorCode === 'auth/email-already-in-use'){
            let div = `
            <div class="card-panel red accent-2" style="padding-top: 8px; padding-bottom: 8px;">
            <span class="white-text">
                    Correo ya registrado. Ingresa los datos nuevamente.
            </span>
            </div>
            `
        errorDivRegister.innerHTML = div;
        }else if(errorCode === 'auth/weak-password'){
            let div = `
            <div class="card-panel red accent-2" style="padding-top: 8px; padding-bottom: 8px;">
            <span class="white-text">
                    La contraseña debe tener al menos 6 caracteres.
            </span>
            </div>
            `
        errorDivRegister.innerHTML = div;
        }else {
            alert(errorMessage);         
        }
       signupForm.reset();
    });
    
    /* CUENTA ADMINISTRADOR
    auth.createUserWithEmailAndPassword(email, password).then(cred => {

        return db.collection('users').doc(cred.user.uid).set({
            admin: true
        });
    }).then(() =>{
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    } );*/
});

// cerrar sesion
const logout = document.querySelector('#logout-nav');
logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut();
});

const logoutMobile = document.querySelector('#logout-mobile');
logoutMobile.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut();
});

// iniciar sesion
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //obetener informacion del usuario
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {    
        //Cerrar login modal y resetear form
        const errorDiv = document.querySelector('#wong-answer');
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();

        errorDiv.innerHTML = '';
        loginForm.reset();
        document.getElementById('login-password').type='password';
    }).catch(function(error) {
        const errorDiv = document.querySelector('#wong-answer');
        let div = `
        
        <div class="card-panel red accent-2" style="padding-top: 8px; padding-bottom: 8px;">
            <span class="white-text">
                    Correo / Contraseña incorrectos. Ingresa los datos nuevamente.
            </span>
        </div>
        `
        errorDiv.innerHTML = div;
        /*
        var errorCode = error.code;
        var errorMessage = error.message;
    
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);         
        }
        console.log(error);
        */
       loginForm.reset();
    });
});

//Show Password
function showPassword(input) {
    var x = document.getElementById(input);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    
}

//Sidenav
const sideNav = document.querySelector('.sidenav');
M.Sidenav.init(sideNav, {});

//Slider
const slider = document.querySelector('.slider');
M.Slider.init(slider, {
    indicators: false,
    height: 500,
    transition: 500,
    interval: 6000
});

// INICIO DE FUNCIONES DE FIREBASE

//cambio de status de auth

const documentName = document.title;

auth.onAuthStateChanged(user => {
    const user2 = user;
    if (user) {
        db.collection('users').doc(user.uid).get().then(snapshot => {
                let datos = snapshot.data();
                setupUI(user,datos.admin,datos);
                //let userAdmin = datos.admin;
                //console.log(userAdmin);
                
                //Barra del usuario
        }).catch(err => {
            console.log(err.message);
        });
        
        //get data
        db.collection(documentName).orderBy('numTutorial').get().then(snapshot => {
            setuplistaInstrucciones(snapshot.docs,documentName)
        },err =>{
            console.log(err.message)
        });
    } else {
        setupUI();
        
        setuplistaFake();
        
    }
});
/*
function getFromFirebase(documentName){ //El parametro "documentName" se define y se carga en el archivo de la pagina en el apartado de <body onload=...> 

    //la funcion orderBy() define la manera en que va a traer esos datos ordenados; en este caso se ordenan por el numero de tutorial que le corresponde
    db.collection(documentName).orderBy('numTutorial').get().then(snapshot => {
        setuplistaInstrucciones(snapshot.docs,documentName)
    });

}
*/

