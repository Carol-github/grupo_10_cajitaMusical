window.addEventListener("load", function() {
    let formulario = document.querySelector("form.reservation");

    formulario.addEventListener("submit", function(e){
        e.preventDefault();

        let userName = document.querySelector("input.first_name"); 

        if (userName.value == "" ){
            alert("Incorrecto")
        }
    })
})