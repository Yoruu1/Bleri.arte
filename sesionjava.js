document.addEventListener("DOMcontentLeaded",() =>{    
    const Email = document.getElementById("form3Example3");
    const Pass = document.getElementById("form3Example4");
    const form = document.getElementById("form");
    const parrafo = document.getElementById("warnings");
    
    form.addEventListener("submit", e=>{
        e.preventDefault();
        let warnings = "";
        let entrar = false;
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
        console.log(regexEmail.test(Email.value));
        if(!regexEmail.test(Email.value)) {
            warnings += "El Email no es valido";
            entrar = true;
        }
    
        if(Pass.value.length < 8) {
            warnings += "La contraseña no es valida";
            entrar = true;
        }
    
        if(entra){
            parrafo.innerHTML = warnings;
            console.log("warnings:", warnings);
        }else {
            parrafo.innerHTML = "Formulario enviado correctamente";
            console.log("Formulario enviado correctamente");
        }
    });
});