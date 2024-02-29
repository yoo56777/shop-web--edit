function swiperOn(){
    var swiper = new Swiper(".product-slider", {
        loop: true,
        spaceBetween: 20,
        autoplay: {
            delay: 7500,
            disableOnInteraction: false,
        },
        centeredSlides: true,
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1020: {
            slidesPerView: 3,
          },
        },
    });
}


//新增商品到購物車事件
function addCartBtn(obj){
// $('.addCartBtn').on('click',(event)=>{
    //用Map裝購物車商品，Map([商品ID, [商品名稱, 商品數量, 單價, 圖片路徑]])
    let cartMap = new Map(JSON.parse(localStorage.getItem("cartMap")))
    if (cartMap == null)
        cartMap = new Map()
    let comId = Number($(obj).parent().children().eq(0).text())
    let itemInfo = new Array(4)
    if (cartMap.has(comId)){
        //購物車已有該商品
        console.log("購物車已有該商品")
        let qty = ++cartMap.get(comId)[1]
        console.log(qty)
        $('#cartArea').children('#'+comId).find('.content').find('.price').text('$'+qty*cartMap.get(comId)[2])
        $('#cartArea').children('#'+comId).find('.content').find('.quantity').text('qty : '+qty)
    }
    else{
        itemInfo[0] = $(obj).parent().children('h3').text()
        itemInfo[1] = 1
        itemInfo[2] = parseInt($(obj).parent().children('.price').text().replaceAll('$',''))
        itemInfo[3] = $(obj).parent().children('img').attr('src')
        cartMap.set(comId, itemInfo)
        add2Cart(comId, itemInfo)
    }
    localStorage.setItem("cartMap", JSON.stringify(Array.from(cartMap.entries())))
    updateCartTotal()
}

function add2Cart(key, item){
    $('#cartArea').append('<div class="box" id="'+key+'">'+
                               '<p style="display: none;">'+key+'</p>'+
                               '<div class="fas fa-trash" onclick="removeCart(this)"></div>'+
                               '<img src="'+item[3]+'" alt="">'+
                               '<div class="content">'+
                                   '<h3>'+item[0]+'</h3>'+
                                   '<span class="price">$'+item[1]*item[2]+'/-</span>'+
                                   '<span class="quantity">qty : '+item[1]+'</span>'+
                               '</div>'+
                          '</div>')
}

function removeCart(obj){
    let comId = Number($(obj).parent().children().eq(0).text())
    let cartMap = new Map(JSON.parse(localStorage.getItem("cartMap")))
    cartMap.delete(comId)
    localStorage.setItem("cartMap", JSON.stringify(Array.from(cartMap.entries())))
    $(obj).parent().remove()
    updateCartTotal()
}

function updateCartTotal(){
    let cartItems = $('#cartArea').children()
    let total = 0
    $.each(cartItems, (i, n)=>{
        total += parseInt($(n).find('.content').find('.price').text().replaceAll('$', ''))
    })
    $('.shopping-cart').find('.total').text('total : $'+total+'/-')
}

//網頁載入完成後處理
$(()=>{
    //查詢優惠商品
    let dataUrl = "http://172.16.82.2:9090/com/getDiscountCom"

    $.ajax({
        url: dataUrl,
        method: 'GET',
        dataType: 'json',
        async: true,
        contentType: 'application/json;charset=utf-8',
        cache: false,

        success: res => {
            let rows = Math.ceil(res.length) / 4 //有幾行，每行4個商品，無條件進位
            for (let i = 0; i < rows; i++) {
                $('#products').append('<div class="swiper product-slider">'+
                                      '<div class="swiper-wrapper" id="swiper' + i + '">')
                let swiper = $('#swiper' + i)
                for (let j = 0; j < 4; j++) {
                    let num = j + i * 4
                    let item = res[num]
                    $(swiper).append('<div class="swiper-slide box">'+
                                         '<p style="display: none;">'+item.commodityID+'</p>'+
                                         '<img src="'+item.commodityImgPath+'" alt="">'+
                                         '<h3>'+item.commodityName+'</h3>'+
                                         '<div class="price"> $ '+item.commodityPrice+' </div>'+
                                         '<button class="btn addCartBtn" onclick="addCartBtn(this)">add to cart</button>'+
                                     '</div>')
                }
                $('#products').append('</div>'+
                                      '</div>')
            }
            swiperOn()          
        },

        error: err => {
            console.log(err)
        },
    });

    //查詢全部分類
    dataUrl = "http://172.16.82.2:9090/tag/getAll"

    $.ajax({
        url: dataUrl,
        method: 'GET',
        dataType: 'json',
        async: true,
        contentType: 'application/json;charset=utf-8',
        cache: false,

        success: res => {
            $.each(res, (i, n) => {
                let tagImgSrc = ""
                $.ajax({
                    url: "http://172.16.82.2:9090/com/getByTag?tag=" + n.commoditySubTag,
                    method: 'GET',
                    dataType: 'json',
                    async: false,
                    contentType: 'application/json;charset=utf-8',
                    cache: false,
                    success: res => {
                        tagImgSrc = res[0].commodityImgPath
                        $('#tags').append(
                            '<div class="box">'+
                                '<img src="'+tagImgSrc+'" alt="">'+
                                '<h3>'+n.commoditySubTag+'</h3>'+
                                '<p>upto 45% off</p>'+
                                '<a href="product-page.html?tag='+n.commoditySubTag+'" class="btn">shop now</a>'+
                            '</div>'
                        )                        
                    },

                    error: err => {
                        tagImgSrc = ""
                    },
                })
            })
        },

        error: err => {
            console.log(err)
        },
    });
})