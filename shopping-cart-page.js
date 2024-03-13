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
let dataUrl = "http://127.0.0.1:9090/order/insertOrder"

cartMap = new Map(JSON.parse(localStorage.getItem("cartMap")))
var jwt = localStorage.getItem("token");
var account = localStorage.getItem("account");

let nowNameList=[];
let jsonData = {}

// let len = cartMap.length;
// for(let i = 0; i<len; i++){
//     let comId = Number($(i.target).parent().parent().children().eq(0).text())
//     jsonData = {
//         cartSeq: 0,
//         cartAccount: account,
//         cartCommodityID: comId,
//         cartQty: cartMap.get(comId)[1],
//     }
//     nowNameList+=jsonData
// }

cartMap.forEach(function(value, key) {
    jsonData = {
        cartSeq: 0,
        cartAccount: account,
        cartCommodityID: key,
        cartQty: value[1],
    }
    nowNameList.push(jsonData)
})

$.ajax({
    url: dataUrl,
    method: 'POST',
    dataType: 'text',
    data: JSON.stringify(nowNameList),
    headers: {
        "Authorization" : "Bearer " + jwt
    },
    async: true,
    contentType: 'application/json;charset=utf-8',
    cache: false,

    success: res => {
        window.alert(res)
        localStorage.removeItem("cartMap")
        location.reload()
    },
    error: err => {
        console.log(err)
        window.alert("訂單送出失敗!")
    },
});
}