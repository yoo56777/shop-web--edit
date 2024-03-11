$(document).ready(()=>{
    //先驗證是否登入
    var jwt = localStorage.getItem("token")
    var account = localStorage.getItem("account");

    if (jwt == null){
        $('#login-input-area').show()
        $('#login-user-area').hide()
    }else{
        let dataUrl = "http://127.0.0.1:9090/user/userVerify"            
        $.ajax({
            url: dataUrl,
            method: 'POST',
            dataType: 'text',
            async: true,
            contentType: 'application/json;charset=utf-8',
            cache: false,
            headers: {
                "Authorization" : "Bearer " + jwt
            },

            success: res => {
                if (res == "0000"){
                    $('#login-input-area').hide()
                    $('#login-user-area').show()
                }else{
                    $('#login-input-area').show()
                    $('#login-user-area').hide()
                    localStorage.removeItem("token")
                }
            },

            error: err => {
                $('#login-input-area').show()
                $('#login-user-area').hide()
            },
        });   
    }

    
    let dataUrl = "http://127.0.0.1:9090/order/getNoByAccount?account="
    dataUrl += account
    console.log(dataUrl)

    $.ajax({
        url: dataUrl,
        method: 'GET',
        dataType: 'text',
        async: true,
        contentType: 'application/json;charset=utf-8',
        cache: false,
        headers: {
            "Authorization" : "Bearer " + jwt
        },

        success: res => {
            var resList = JSON.parse(res) // string 轉 JSON object
            console.log(resList)
            $.each(resList, function(i, n){
            $('#orderno').append(            
                '<option>'+n+'</option>');
            })
        },
        error: err => {
            window.alert(err.responseText)
        },
    })
})


