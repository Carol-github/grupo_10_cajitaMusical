window.addEventListener("load", function() {

    let formulario = document.querySelector("form#createProdForm");

    formulario.addEventListener("submit", function(event){
        
        // let errores = [];
        let prodName = document.querySelector("input#prod_name"); 
        let prodPrice = document.querySelector("input#prod_price"); 
        let prodDesc = document.querySelector("textarea"); 
        let prodImg = document.querySelector("input.prod_img_a"); 
        // let userAvatar = document.querySelector("input#avatar"); 
        // let userPassword = document.querySelector("input#pass"); 
        // let userConfirmPassword = document.querySelector("input#confirm_password"); 
                
        if (prodName.value == "" ){
            event.preventDefault();
            document.querySelector("input#prod_name").style.borderColor = "red";
            document.querySelector("input#prod_name").style.color = "red";
            document.querySelector("#prod_name_label").style.color = "red";
            document.getElementById("alert_prod_name").style.display = "flex";
            document.querySelector("#alert_prod_name").innerHTML = "El producto debe tener un nombre";

        }      
        if (prodName.value.length < 5 ){
            event.preventDefault();
            document.querySelector("input#prod_name").style.borderColor = "red";
            document.querySelector("input#prod_name").style.color = "red";
            document.querySelector("#prod_name_label").style.color = "red";
            document.getElementById("alert_2_prod_name").style.display = "flex";
            document.querySelector("#alert_2_prod_name").innerHTML = "El nombre del producto debe tener al menos 5 caracteres";

        }               
        if (prodPrice.value == "" ){
            event.preventDefault();
            document.querySelector("input#prod_price").style.borderColor = "red";
            document.querySelector("input#prod_price").style.color = "red";
            document.querySelector("#prod_price_label").style.color = "red";
            document.getElementById("alert_prod_price").style.display = "flex";
            document.querySelector("#alert_prod_price").innerHTML = "El producto debe tener precio";

        }
        if (prodPrice.value.length < 5 ){
            event.preventDefault();
            document.querySelector("input#prod_price").style.borderColor = "red";
            document.querySelector("input#prod_price").style.color = "red";
            document.querySelector("#prod_price_label").style.color = "red";
            document.getElementById("alert_2_prod_price").style.display = "flex";
            document.querySelector("#alert_2_prod_price").innerHTML = "El precio del producto debe tener al menos 5 cifras";

        }
        if (prodDesc.value.length < 20 ){
            event.preventDefault();
            document.querySelector("textarea").style.borderColor = "red";
            document.querySelector("textarea").style.color = "red";
            document.querySelector("#prod_desc_label").style.color = "red";
            document.querySelector("#alert_2_prod_desc").style.display = "flex";
            document.querySelector("#alert_2_prod_desc").innerHTML = "La descripción del producto debe tener al menos 20 caracteres";
        }
        if (prodImg.value == "" ){
            event.preventDefault();
            document.querySelector("input#prod_img").style.borderColor = "red";
            document.querySelector("input#prod_img").style.color = "red";
            document.querySelector("#prod_img_label").style.color = "red";
            document.getElementById("alert_prod_img").style.display = "flex";
            document.querySelector("#alert_prod_img").innerHTML = "Debes seleccionar una imagen";
            document.querySelector("#img_container").style.borderColor = "red";
            document.querySelector("#alert_prod_img").style.margin = "20px auto auto auto";
            
        }
        if (!(/\.(gif|jpe?g|jpg|png)$/i).test(prodImg.value) && prodImg.value != ''){
            event.preventDefault();
            document.querySelector("input#prod_img").style.borderColor = "red";
            document.querySelector("input#prod_img").style.color = "red";
            document.querySelector("#prod_img_label").style.color = "red";
            document.getElementById("alert_prod_img").style.display = "flex";
            document.querySelector("#alert_prod_img").innerHTML = "formato incorrecto";
            document.querySelector("#img_container").style.borderColor = "red";
            document.querySelector("#alert_prod_img").style.margin = "20px auto auto auto";
        }

    })
})
