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

//新增商品到購物車事件
function addCartBtn(obj){
// $('.addCartBtn').on('click',(event)=>{
    //用Map裝購物車商品，Map([商品ID, 商品數量])
    let cartMap = new Map(JSON.parse(localStorage.getItem("cartMap")))
    if (cartMap == null)
        cartMap = new Map()
    let comId = Number($(obj).parent().children().eq(0).text())
    let qty = 1
    if (cartMap.has(comId)){
        //購物車已有該商品
        console.log("購物車已有該商品")
        qty = cartMap.get(comId) + 1
        console.log($(obj).parent().children())
        $(obj).parent().children(".content").children(".quantity").text("qty : "+qty)
    }
    else{
        cartMap.set(comId, qty)
        add2Cart(qty, comId)
    }
    localStorage.setItem("cartMap", JSON.stringify(Array.from(cartMap.entries())))
}

function add2Cart(value, key){
    $('#cartArea').append('<div class="box">'+
                               '<p style="display: none;">'+key+'</p>'+
                               '<div class="fas fa-trash" onclick="removeCart(this)"></div>'+
                               '<img src="image/product'+key+'.jpg" alt="">'+
                               '<div class="content">'+
                                   '<h3>watermalon</h3>'+
                                   '<span class="price">$100/-</span>'+
                                   '<span class="quantity">qty : '+value+'</span>'+
                               '</div>'+
                          '</div>')
}

function removeCart(obj){
    let comId = Number($(obj).parent().children().eq(0).text())
    console.log(comId)
    let cartMap = new Map(JSON.parse(localStorage.getItem("cartMap")))
    cartMap.delete(comId)
    localStorage.setItem("cartMap", JSON.stringify(Array.from(cartMap.entries())))
    $(obj).parent().remove()
}