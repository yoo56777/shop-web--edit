    $(document).ready(()=>{
        //先驗證是否登入
        var jwt = localStorage.getItem("token")
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

        //購物車清單
        let cartMap = new Map(JSON.parse(localStorage.getItem("cartMap")))
        if (cartMap != null){
            cartMap.forEach((value, key)=>{
                $('table').append( 
                    '<tr>'+
                    '<td style="display: none;">'+key+'</td>'+
                    '<td><input type="checkbox"id="check"></td>'+
                    '<td><img src="'+value[3]+'".jpg"></td>'+
                    '<td>'+value[0]+'</td>'+   
                    '<td>'+value[2]+'</td>'+
                    '<td><button class="cal">-</button><input type="text" value="'+value[1]+'" readonly><button class="cal">+</button></td>'+
                    '<td class="total">'+value[2] * value[1] +'</td>'+
                    '<td><p class="del">刪除</p></td>'+
                    '</tr>'
                )
            })
        change()
        }
    })

    $('#logout').on('click', ()=>{
        localStorage.removeItem("token")
        location.reload()
    })

// <tr>
// <td><input type="checkbox"id="check"></td>
// <td><img src="image/product2.jpg"></td>
// <td>商品二</td>   
// <td>299</td>
// <td><button class="cal">-</button><input type="text" readonly><button class="cal">+</button></td>
// <td class="total">0</td>
// <td><p class="del">刪除</p></td>
// </tr> 

function sendOrder(){
// var dataUrl = "http://127.0.0.1:9090/com/getAll"
let dataUrl = "http://127.0.0.1:9090/user/userLogin"

var jwt = localStorage.getItem("token");

$.ajax({
    url: dataUrl,
    method: 'POST',
    dataType: 'text',
    data: userdata,
    async: true,
    

    success: res => {
        var resList = JSON.parse(res) // string 轉 JSON object
        console.log(resList)
        $.each(resList, function(i, n){
            $('#list-wrapper').append(

                
                                  );
        })
        setpage()
    },

    error: err => {
        console.log(err)
    },
});
}
