const Email = document.getElementById("form3Example3")
const Pass = document.getElementById("form3Example4")
const form = document.getElementById("form")
const parrafo = document.getElementById("warnings")

form.addEventListener("submit", e=>{
    e.preventDefault()
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    
    console.log(regexEmail.test(Email.value))
    if(!regexEmail.test(Email.value)){
        alert("El Email no es valido")
        entrar = true
    }

    if(Pass.value.length < 8){
        alert("La contraseña no es valida")
        entrar = true
    }

    if(entra){
        parrafo.innerHTML = warnings
    }
})