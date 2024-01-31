function getByTag(){
    // var dataUrl = "http://172.16.82.2:9090/com/getAll"
    var dataUrl = "http://localhost:9090/com/getByTag?tag=狗"

    $('#com-list').empty();
    $.ajax({
        url: dataUrl,
        method: 'GET',
        dataType: 'text',
        data: '',
        async: true,

        success: res => {
            var resList = JSON.parse(res) // string 轉 JSON object
            console.log(resList)
            $.each(resList, function(i, n){
                $('#list-wrapper').append('<div class="list-item">'+
                                           '<div class="one-product">'+
                                                '<img src='+n.commodityImgPath+' alt="">'+
                                                '<h3>'+n.commodityName+'</h3>'+
                                                '<div class="price"> $ '+n.commodityPrice+'</div>'+
                                                '<a href="#" class="btn">add to cart</a>'+
                                            '</div>'+
                                       '</div>'
                                      );
            })
        },
    // <div class="list-item">
    //     <div class="one-product">
    //         <img src="image/product1.jpg" alt="">
    //         <h3>watermalon</h3>
    //         <div class="price"> $ 100 </div>
    //         <a href="#" class="btn">add to cart</a>
    //     </div>
    // </div>
        error: err => {
            console.log(err)
        },
    });
}

 