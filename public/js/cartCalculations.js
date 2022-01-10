
window.addEventListener("load", function() {

    let totalPrice = document.querySelector('#cart-total-amount');
    
    let totalPricePerProduct = document.querySelectorAll('[ idx-product ] span#tot-price' );

    let total = 0;
    totalPricePerProduct.forEach(price =>{
        total += Number(price.innerText);
    })
    
    totalPrice.innerText = `Total Carrito: $ ${total.toFixed(2)}`;


    let qtyPerProduct = document.querySelectorAll('[ idx-product ] input' );
    
    qtyPerProduct.forEach(qtyInput =>{

        qtyInput.addEventListener('change', function(){

            let qty = Number(this.value);
            let productPrice = this.parentElement.nextElementSibling.firstChild.nextElementSibling.innerText;
            let totPriceProd = qty*productPrice;
            let totalPriceProduct = this.parentElement
                                            .parentElement.
                                                nextElementSibling.
                                                    firstChild.
                                                        nextElementSibling.
                                                        innerText = totPriceProd;

            //console.log(this.value);


            let total = 0;
            totalPricePerProduct.forEach(price =>{
                total += Number(price.innerText);
            })
            
            totalPrice.innerText = `Total Carrito: $ ${total.toFixed(2)}`;


            console.log(`El precio del producto es ${productPrice}`)
            console.log(`El precio del producto es ${totalPriceProduct}`)
        })
    })







})