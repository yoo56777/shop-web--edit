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
// $('.addCartBtn').on('click',(event)=>{
function addCartBtn(obj){
  console.log(obj)
    //用Map裝購物車商品，Map([商品ID, 商品數量])
    let cartMap = new Map(JSON.parse(localStorage.getItem("cartMap")))
    if (cartMap == null)
        cartMap = new Map()
    console.log(cartMap)
    cartMap.forEach(function (value, key) {
        console.log(key + ' = ' + value);
    });
    let comId = Number($(obj).parent().children().eq(0).text())
    let qty = 1
    if (cartMap.has(comId)){
        //購物車已有該商品
        console.log("購物車已有該商品")
    }
    else{
        cartMap.set(comId, qty)
        console.log("新增商品 id="+comId)
    }
    localStorage.setItem("cartMap", JSON.stringify(Array.from(cartMap.entries())))
}
