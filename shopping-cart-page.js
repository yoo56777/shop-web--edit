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
                $('#cart').append( 
                    '<tr>'+
                    '<td><input type="checkbox"id="check"></td>'+
                    '<td><img src="image/product'+key+'.jpg"></td>'+
                    '<td>商品一</td>'+   
                    '<td>199</td>'+
                    '<td><button class="cal">-</button><input type="text" value="'+value+'" readonly><button class="cal">+</button></td>'+
                    '<td class="total">0</td>'+
                    '<td><p class="del">刪除</p></td>'+
                    '</tr>'
                )
            })
        change()
        }
        // <div class="box">
        //     <i class="fas fa-trash"></i>
        //     <img src="image/product1.jpg" alt="">
        //     <div class="content">
        //         <h3>watermalon</h3>
        //         <span class="price">$4.99/-</span>
        //         <span class="quantity">qty : 1</span>
        //     </div>
        // </div>        
    })

    $('#logout').on('click', ()=>{
        localStorage.removeItem("token")
        location.reload()
    })




// '<div class="box">'+
// '<i class="fas fa-trash"></i>'+
// '<img src="image/product'+key+'.jpg" alt="">'+
// '<div class="content">'+
// '<h3>watermalon</h3>'+
// '<span class="price">$100/-</span>'+
// '<span class="quantity">qty : '+value+'</span>'+
// '</div>'+
// '</div>'



// <tr>
// <td><input type="checkbox"id="check"></td>
// <td><img src="image/product2.jpg"></td>
// <td>商品二</td>   
// <td>299</td>
// <td><button class="cal">-</button><input type="text" readonly><button class="cal">+</button></td>
// <td class="total">0</td>
// <td><p class="del">刪除</p></td>
// </tr> 