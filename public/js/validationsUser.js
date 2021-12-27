window.addEventListener("load", function() {

    let formulario = document.querySelector("form.form_reg");

    formulario.addEventListener("submit", function(event){
        
        // let errores = [];
        let userEmail = document.querySelector("input#email"); 
        let userName = document.querySelector("input#user"); 
        let userFirstName = document.querySelector("input#first_name"); 
        let userLastName = document.querySelector("input#last_name"); 
        let userAvatar = document.querySelector("input#avatar"); 
        let userPassword = document.querySelector("input#pass"); 
        let userConfirmPassword = document.querySelector("input#confirm_password"); 
                
        if (userEmail.value == "" ){
            event.preventDefault();
            document.querySelector("input#email").style.borderColor = "red";
            document.querySelector("input#email").style.color = "red";
            document.querySelector("#email_label").style.color = "red";
            document.getElementById("alert_email").style.display = "flex";
            document.querySelector("#alert_email").innerHTML = "Debes ingresar un email";

        }
        if (userPassword.value == "" ){
            event.preventDefault();
            document.querySelector("input#pass").style.borderColor = "red";
            document.querySelector("#password_label").style.color = "red";
            document.querySelector("input#pass").style.color = "red";
            document.getElementById("alert_password").style.display = "flex";
            document.querySelector("#alert_password").innerHTML = "completa el password";
        }
        if (userPassword.value.length < 8 ){
            event.preventDefault();
            document.querySelector("input#pass").style.borderColor = "red";
            document.querySelector("#password_label").style.color = "red";
            document.querySelector("input#pass").style.color = "red";
            document.getElementById("alert_2_password").style.display = "flex";
            document.querySelector("#alert_2_password").innerHTML = "el password debe contener al menos 8 caracteres";
        }
        if (userName.value == "" ){
            event.preventDefault();
            document.querySelector("input#user").style.borderColor = "red";
            document.querySelector("input#user").style.color = "red";
            document.querySelector("#user_label").style.color = "red";
            document.getElementById("alert_user").style.display = "flex";
            document.querySelector("#alert_user").innerHTML = "Completa el nombre de usuario";

        }
        if (userName.value.length < 5 ){
            event.preventDefault();
            document.querySelector("input#user").style.borderColor = "red";
            document.querySelector("input#user").style.color = "red";
            document.querySelector("#user_label").style.color = "red";
            document.getElementById("alert_2_user").style.display = "flex";
            document.querySelector("#alert_2_user").innerHTML = "El nombre de usuario debe tener al menos cinco caracterestes";
        }
        if (userFirstName.value == "" ){
            event.preventDefault();
            document.querySelector("input#first_name").style.borderColor = "red";
            document.querySelector("#first_name_label").style.color = "red";
            document.querySelector("input#first_name").style.color = "red";
            document.getElementById("alert_first_name").style.display = "flex";
            document.querySelector("#alert_first_name").innerHTML = "Completa el nombre";
        }
        if (userFirstName.value.length < 5 ){
            event.preventDefault();
            document.querySelector("input#first_name").style.borderColor = "red";
            document.querySelector("#first_name_label").style.color = "red";
            document.querySelector("input#first_name").style.color = "red";
            document.getElementById("alert_2_first_name").style.display = "flex";
            document.querySelector("#alert_2_first_name").innerHTML = "El nombre debe tener al menos cinco caracterestes";
        }
        if (userLastName.value == "" ){
            event.preventDefault();
            document.querySelector("input#last_name").style.borderColor = "red";
            document.querySelector("#last_name_label").style.color = "red";
            document.querySelector("input#last_name").style.color = "red";
            document.getElementById("alert_last_name").style.display = "flex";
            document.querySelector("#alert_last_name").innerHTML = "Completa el apellido";
        }
        if (userLastName.value.length < 5 ){
            event.preventDefault();
            document.querySelector("input#last_name").style.borderColor = "red";
            document.querySelector("#last_name_label").style.color = "red";
            document.querySelector("input#last_name").style.color = "red";
            document.getElementById("alert_2_last_name").style.display = "flex";
            document.querySelector("#alert_2_last_name").innerHTML = "El apellido debe tener al menos cinco caracterestes";
        }
        if (userAvatar.value == "" ){
            event.preventDefault();
            document.querySelector("input#avatar").style.borderColor = "red";
            document.querySelector("#avatar_label").style.color = "red";
            document.querySelector("input#avatar").style.color = "red";
            document.getElementById("alert_avatar").style.display = "flex";
            document.querySelector("#alert_avatar").innerHTML = "Elije una imagen";
        }
        if (userAvatar.value.length < 5 ){
            event.preventDefault();
            document.querySelector("input#avatar").style.borderColor = "red";
            document.querySelector("#avatar_label").style.color = "red";
            document.querySelector("input#avatar").style.color = "red";
            document.getElementById("alert_2_avatar").style.display = "flex";
            document.querySelector("#alert_2_avatar").innerHTML = "la imagen debe ser un .jpg, .jpeg, .gif";
        }

        if (userConfirmPassword.value == "" ){
            event.preventDefault();
            document.querySelector("input#confirm_password").style.borderColor = "red";
            document.querySelector("#confirm_pass_label").style.color = "red";
            document.querySelector("input#confirm_password").style.color = "red";
            document.getElementById("alert_2_password_b").style.display = "flex";
            document.querySelector("#alert_2_password_b").innerHTML = "confirma el password";
        }
        if (userConfirmPassword.value.length < 8 ){
            event.preventDefault();
            document.querySelector("input#confirm_password").style.borderColor = "red";
            document.querySelector("#confirm_pass_label").style.color = "red";
            document.querySelector("input#confirm_password").style.color = "red";
            document.getElementById("alert_2_password_b").style.display = "flex";
            document.querySelector("#alert_2_password_b").innerHTML = "La confirmación del password debe contener al menos 8 caracteres";
            }
    //     let password = document.querySelector('#pass');
    
    // if (unCampo.name === 'rePassword') {	
    //     unCampo.addEventListener('blur', function () {
    //         if (!validator.equals(unCampo.value, password.value)) {              
    //             validateInput('no coincide con el <b>Campo Contraseña</b>', this, 'equals');
    //         }
    //     })
    // }

  

        if (userConfirmPassword.value != userPassword.value ) {
            event.preventDefault();
            document.querySelector("input#pass").style.borderColor = "red";
            document.querySelector("#password_label").style.color = "red";
            document.querySelector("input#pass").style.color = "red";
            document.querySelector("input#confirm_password").style.borderColor = "red";
            document.querySelector("#confirm_pass_label").style.color = "red";
            document.querySelector("input#confirm_password").style.color = "red";
            document.getElementById("alert_2_password_b").style.display = "flex";
            document.querySelector("#alert_2_password_b").innerHTML = "Los passwords no coinciden";
          
        } 
    
    })
})
