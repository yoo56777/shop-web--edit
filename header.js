$('.header').load('header.html', function(){
    let searchForm = document.querySelector('.search-form');

    document.querySelector('#search-btn').onclick = () =>{
        searchForm.classList.toggle('active');
        shoppingCart.classList.remove('active');
        loginForm.classList.remove('active');
        navbar.classList.remove('active');
        registerForm.classList.remove('active');
    }
    
    let shoppingCart = document.querySelector('.shopping-cart');
    
    document.querySelector('#cart-btn').onclick = () =>{
        shoppingCart.classList.toggle('active');
        searchForm.classList.remove('active');
        loginForm.classList.remove('active');
        navbar.classList.remove('active');
        registerForm.classList.remove('active');
    }
    
    let loginForm = document.querySelector('.login-form');
    
    document.querySelector('#login-btn').onclick = () =>{
        loginForm.classList.toggle('active');
        searchForm.classList.remove('active');
        shoppingCart.classList.remove('active');
        navbar.classList.remove('active');
        registerForm.classList.remove('active');
    }
    
    let navbar = document.querySelector('.navbar');
    
    document.querySelector('#menu-btn').onclick = () =>{
        navbar.classList.toggle('active');
        searchForm.classList.remove('active');
        shoppingCart.classList.remove('active');
        loginForm.classList.remove('active');
        registerForm.classList.remove('active');
    }

    let registerForm = document.querySelector('.register-form');

    document.querySelector('#go-register').onclick = () =>{
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
        shoppingCart.classList.remove('active');
        loginForm.classList.remove('active');
        registerForm.classList.toggle('active');
    }
    
    window.onscroll = () =>{
        searchForm.classList.remove('active');
        shoppingCart.classList.remove('active');
        loginForm.classList.remove('active');
        navbar.classList.remove('active');
        registerForm.classList.remove('active');
    }

    $('.register-form').on('submit', function() {
        let dataUrl = "http://172.16.82.2:9090/user/createUser"
        let jsonData = {
            userAccount: $('#regAccount').val(),
            userPassword: $('#regPassword').val(),
            userName: $('#regName').val(),
            userEmail: $('#regEmail').val(),
            userPhone: $('#regPhone').val(),
            userAddress: $('#regAddress').val(),
        }

        $.ajax({
            url: dataUrl,
            method: 'POST',
            dataType: 'text',
            data: JSON.stringify(jsonData),
            async: true,
            contentType: 'application/json;charset=utf-8',
            cache: false,

            success: res => {
                window.alert(res)
            },

            error: err => {
                console.log(err)
                window.alert("註冊失敗!")
            },
        });
    })

})