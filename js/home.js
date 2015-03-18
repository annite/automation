/**
 * Created by root on 23/9/14.
 */
var top_products;
var top_arrivals;
var click_suggest;
var selling_count;
var arrival_count;
var click_suggest_count;

var search_products;
var search_count;


$(document).ready(function(e){
    $("#home-nav").attr("class","active");
    $("#cart-nav").attr("class","");
    $("#loing-nav").attr("class","");

    $(".new-arrival-list1").append('<center><img class="loading1" data-src="holder.js/100%x200" alt="Loading...." src="'+base_url+'pics/35.gif" style="height: 50px; width: 50px"/></center>');
    $(".top-product-list1").append('<center><img class="img-responsive loading" data-src="holder.js/100%x200" alt="Loading...." src="'+base_url+'pics/35.gif" style="height: 50px; width: 50px" /></center>');


    displayClickSuggestion();
    displayTopSelling();
});

function displaySearchSuggestion(){
    $(".product-search").append('<div class="col-md-12 column suggest"><center><h4 class="title">Getting Related Product</h4></center><br><center><img class="loading" data-src="holder.js/100%x200" alt="100%x200" src="'+base_url+'pics/35.gif" style="height: 50px; width: 50px"/></center></div>');

    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/home/getSearchSuggestion",

        success:function($data){
            $(".suggest").remove();
            if($data.trim()){
                search_products = jQuery.parseJSON( $data );
                if(search_products.length>0){
                    $(".product-search").append('<div class="col-md-12 column"><h3 class="title">Related Products You Searched</h3><div class="well"><div id="search-suggestion" class="carousel slide myCarousel" data-interval="false"> <div class="carousel-inner search-suggestion-list"></div> </div></div></div>')

                    if(search_products.length>4)
                    $("#search-suggestion").append('<a class="left carousel-control" href="#search-suggestion" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a> <a class="right carousel-control" href="#search-suggestion" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>');

                    var j=0;
                    var count=1;
                    $(".search-suggestion-list").append('<div class="item active search-suggestion-carousel-item'+count+'"></div>');
                    $(".search-suggestion-carousel-item"+count).append('<div class="row search-suggestion-carousel-row'+count+'"></div>');

                    for(var i=j;(i<j+4 && i<search_products.length);i++){
                        if(getId(search_products[i].product_id)){
                            var id=getId(search_products[i].product_id);
                            var title=getTitle(search_products[i].title);
                            var title=title[0].toUpperCase()+title.substring(1,title.length).toLowerCase();
                            var image=getImage(search_products[i].image);
                            var manufacturer=getManufacturer(search_products[i].manufacturer);
                            var price=getPrice(search_products[i].price);
                            if(price=="Not Available")
                                $(".search-suggestion-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" > <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'" ></div></center><div class="caption"><h4>'+title+'</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div>');
                            else
                                $(".search-suggestion-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" > <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart(this)">Add to Cart</a></p></div>');
                        }
                        else{
                            j++;
                        }
                    }
                    j=i;
                    count++;
                    while(j<search_products.length){
                        $(".search-suggestion-list").append('<div class="item  search-suggestion-carousel-item'+count+'"></div>');
                        $(".search-suggestion-carousel-item"+count).append('<div class="row search-suggestion-carousel-row'+count+'"></div>');

                        for(var i=j;(i<j+4 && i<search_products.length);i++){
                            if(getId(search_products[i].product_id)){
                                var id=getId(search_products[i].product_id);
                                var title=getTitle(search_products[i].title);
                                var title=title[0].toUpperCase()+title.substring(1,title.length).toLowerCase();
                                var image=getImage(search_products[i].image);
                                var manufacturer=getManufacturer(search_products[i].manufacturer);
                                var price=getPrice(search_products[i].price);
                                if(price=="Not Available")
                                    $(".search-suggestion-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" > <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'" ></div></center><div class="caption"><h4>'+title+'</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div>');
                                else
                                    $(".search-suggestion-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" > <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart(this)">Add to Cart</a></p></div>');
                            }
                            else{
                                j++;
                            }
                        }
                        j=i;
                        count++;

                    }
                }
            }
        },
        error:function(jqXHR,textStatus,errorThrown){

            $(".product-search").empty();
        }
    });

}


function displayClickSuggestion(){
    $(".product-click-suggestion").append('<div class="col-md-12 column suggest"><center><h4 class="title">Getting Related Product</h4></center><br><center><img class="loading" data-src="holder.js/100%x200" alt="100%x200" src="'+base_url+'pics/35.gif" style="height: 50px; width: 50px"/></center></div>');

    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/home/getClickSuggestion",

        success:function($data){

            $(".suggest").remove();
            displaySearchSuggestion();
            if($data.trim()!="new user"){
                click_suggest = jQuery.parseJSON($data);
                if(click_suggest.length>0){
                    $(".product-click-suggestion").append('<div class="col-md-12 column"><h3 class="title">Related Products You Viewed</h3><div class="well"><div id="click-suggestion" class="carousel slide myCarousel" data-interval="false"> <div class="carousel-inner click-suggestion-list"></div> </div></div></div>')

                    if(click_suggest.length>4)
                    $("#click-suggestion").append('<a class="left carousel-control" href="#click-suggestion" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a> <a class="right carousel-control" href="#click-suggestion" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>');

                    var j=0;
                    var count=1;
                    $(".click-suggestion-list").append('<div class="item active click-suggestion-carousel-item'+count+'"></div>');
                    $(".click-suggestion-carousel-item"+count).append('<div class="row click-suggestion-carousel-row'+count+'"></div>');

                    for(var i=j;(i<j+4 && i<click_suggest.length);i++){
                        if(getId(click_suggest[i].product_id)){
                            var id=getId(click_suggest[i].product_id);
                            var title=getTitle(click_suggest[i].title);
                            var title=title[0].toUpperCase()+title.substring(1,title.length).toLowerCase();
                            var image=getImage(click_suggest[i].image);
                            var manufacturer=getManufacturer(click_suggest[i].manufacturer);
                            var price=getPrice(click_suggest[i].price);
                            if(price=="Not Available")
                                $(".click-suggestion-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" > <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'" ></div></center><div class="caption"><h4>'+title+'</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div>');
                            else
                                $(".click-suggestion-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" > <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart(this)">Add to Cart</a></p></div>');
                        }
                        else{
                            j++;
                        }
                    }
                    j=i;
                    count++;
                    var insidecnt=0;
                    while(j<click_suggest.length){
                        $(".click-suggestion-list").append('<div class="item click-suggestion-carousel-item'+count+'"></div>');
                        $(".click-suggestion-carousel-item"+count).append('<div class="row click-suggestion-carousel-row'+count+'"></div>');

                        for(var i=j;(i<j+4 && i<click_suggest.length);i++){
                            if(getId(click_suggest[i].product_id)){
                                insidecnt++;
                                var id=getId(click_suggest[i].product_id);
                                var title=getTitle(click_suggest[i].title);
                                var title=title[0].toUpperCase()+title.substring(1,title.length).toLowerCase();
                                var image=getImage(click_suggest[i].image);
                                var manufacturer=getManufacturer(click_suggest[i].manufacturer);
                                var price=getPrice(click_suggest[i].price);
                                if(price=="Not Available")
                                    $(".click-suggestion-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" > <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'" ></div></center><div class="caption"><h4>'+title+'</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div>');
                                else
                                    $(".click-suggestion-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" > <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart(this)">Add to Cart</a></p></div>');
                            }
                            else{
                                j++;
                            }
                        }
                        j=i;
                        count++;

                }
                    count--;
                    if(insidecnt%4==0)
                        var inc=0;
                    else
                        var inc=4-insidecnt%4;
                    for(var i=0;i<inc;i++){
                        if(getId(click_suggest[i].product_id)){
                            var id=getId(click_suggest[i].product_id);
                            var title=getTitle(click_suggest[i].title);
                            var title=title[0].toUpperCase()+title.substring(1,title.length).toLowerCase();
                            var image=getImage(click_suggest[i].image);
                            var manufacturer=getManufacturer(click_suggest[i].manufacturer);
                            var price=getPrice(click_suggest[i].price);
                            if(price=="Not Available")
                                $(".click-suggestion-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" > <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'" ></div></center><div class="caption"><h4>'+title+'...</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div>');
                            else
                                $(".click-suggestion-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" > <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'...</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart(this)">Add to Cart</a></p></div>');
                        }
                        else{
                            inc--;
                        }
                    }
            }
          }
        },
        error:function(jqXHR,textStatus,errorThrown){
            $(".suggest").remove();
            displaySearchSuggestion();
        }
    });
}



function displayTopSelling(){
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/home/getTopSelling",

        success:function($data){
           displayNewArrivals();
           // $(".more-top-selling").attr("disabled",false);
            $(".top-product-list1").empty();
            top_products = jQuery.parseJSON( $data );
            if(top_products.length>0){

                if(top_products.length>4)
                $("#top-selling").append('<a class="left carousel-control" href="#top-selling" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a><a class="right carousel-control" href="#top-selling" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>');

                var j=0;
                var count=1;
                $(".top-product-list1").append('<div class="item active top-product-carousel-item'+count+'"></div>');
                $(".top-product-carousel-item"+count).append('<div class="row top-product-carousel-row'+count+'"></div>');

                for(var i=j;(i<j+4 && i<top_products.length);i++){
                    if(getId(top_products[i].product_id)){
                        var id=getId(top_products[i].product_id);
                        var title=getTitle(top_products[i].title);
                        var product_group=getProductGroup(top_products[i].product_group);
                        var title=title[0].toUpperCase()+title.substring(1,title.length).toLowerCase();
                        var image=getImage(top_products[i].image);
                        var manufacturer=getManufacturer(top_products[i].manufacturer);
                        var price=getPrice(top_products[i].price);
                        if(price=="Not Available")
                            $(".top-product-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" id="'+product_group+'"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'" ></div></center><div class="caption"><h4>'+title+'...</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div>');
                        else
                            $(".top-product-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" id="'+product_group+'"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'...</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart(this)">Add to Cart</a></p></div>');
                    }
                    else{
                        j++;
                    }
                }
                j=i;
                count++;
                var insidecnt=0;
                while(j<top_products.length){
                    $(".top-product-list1").append('<div class="item top-product-carousel-item'+count+'"></div>');
                    $(".top-product-carousel-item"+count).append('<div class="row top-product-carousel-row'+count+'"></div>');

                    for(var i=j;(i<j+4 && i<top_products.length);i++){
                        if(getId(top_products[i].product_id)){
                            insidecnt++;
                            var id=getId(top_products[i].product_id);
                            var title=getTitle(top_products[i].title);
                            var product_group=getProductGroup(top_products[i].product_group);
                            var title=title[0].toUpperCase()+title.substring(1,title.length).toLowerCase();
                            var image=getImage(top_products[i].image);
                            var manufacturer=getManufacturer(top_products[i].manufacturer);
                            var price=getPrice(top_products[i].price);
                            if(price=="Not Available")
                                $(".top-product-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" id="'+product_group+'"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'" ></div></center><div class="caption"><h4>'+title+'...</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div>');
                            else
                                $(".top-product-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" id="'+product_group+'"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'...</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart(this)">Add to Cart</a></p></div>');
                        }
                        else{
                            j++;
                        }
                    }
                    j=i;
                    count++;
                }
                count--;
                if(insidecnt%4==0)
                    var inc=0;
                else
                    var inc=4-insidecnt%4;
                for(var i=0;i<inc;i++){
                    if(getId(top_products[i].product_id)){
                        var id=getId(top_products[i].product_id);
                        var title=getTitle(top_products[i].title);
                        var product_group=getProductGroup(top_products[i].product_group);
                        var title=title[0].toUpperCase()+title.substring(1,title.length).toLowerCase();
                        var image=getImage(top_products[i].image);
                        var manufacturer=getManufacturer(top_products[i].manufacturer);
                        var price=getPrice(top_products[i].price);
                        if(price=="Not Available")
                            $(".top-product-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" id="'+product_group+'"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'" ></div></center><div class="caption"><h4>'+title+'...</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div>');
                        else
                            $(".top-product-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" id="'+product_group+'"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'...</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart(this)">Add to Cart</a></p></div>');
                    }
                    else{
                        inc--;
                    }
                }
            }
        },
        error:function(jqXHR,textStatus,errorThrown){
            $(".loading").remove();
            $(".top-product-list1").append('<center><div class="col-md-12 column error"><h3 style="color: red">Error Connecting amazon try again</h3></div></center>');
            displayNewArrivals();
        }
    });
 }





function displayNewArrivals(){

    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/home/getTopArrival",

        success:function($data){
            $(".new-arrival-list1").empty();
            top_arrivals = jQuery.parseJSON( $data );
            if(top_arrivals.length>0){

                if(top_arrivals.length>4)
                    $("#new-arrivals").append('<a class="left carousel-control" href="#new-arrivals" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a><a class="right carousel-control" href="#new-arrivals" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>');

                var j=0;
                var count=1;
                $(".new-arrival-list1").append('<div class="item active new-arrival-carousel-item'+count+'"></div>');
                $(".new-arrival-carousel-item"+count).append('<div class="row new-arrival-carousel-row'+count+'"></div>');

                for(var i=j;(i<j+4 && i<top_arrivals.length);i++){
                    if(getId(top_arrivals[i].product_id)){
                        var id=getId(top_arrivals[i].product_id);
                        var title=getTitle(top_arrivals[i].title);
                        var product_group=getProductGroup(top_arrivals[i].product_group);
                        var title=title[0].toUpperCase()+title.substring(1,title.length).toLowerCase();
                        var image=getImage(top_arrivals[i].image);
                        var manufacturer=getManufacturer(top_arrivals[i].manufacturer);
                        var price=getPrice(top_arrivals[i].price);
                        if(price=="Not Available")
                            $(".new-arrival-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" id="'+product_group+'"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'" ></div></center><div class="caption"><h4>'+title+'</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div>');
                        else
                            $(".new-arrival-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" id="'+product_group+'"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart(this)">Add to Cart</a></p></div>');
                    }
                    else{
                        j++;
                    }
                }
                j=i;
                count++;
                var insidecnt=0;
                while(j<top_arrivals.length){
                    $(".new-arrival-list1").append('<div class="item new-arrival-carousel-item'+count+'"></div>');
                    $(".new-arrival-carousel-item"+count).append('<div class="row new-arrival-carousel-row'+count+'"></div>');

                    for(var i=j;(i<j+4 && i<top_arrivals.length);i++){
                        if(getId(top_arrivals[i].product_id)){
                            insidecnt++;
                            var id=getId(top_arrivals[i].product_id);
                            var title=getTitle(top_arrivals[i].title);
                            var product_group=getProductGroup(top_arrivals[i].product_group);
                            var title=title[0].toUpperCase()+title.substring(1,title.length).toLowerCase();
                            var image=getImage(top_arrivals[i].image);
                            var manufacturer=getManufacturer(top_arrivals[i].manufacturer);
                            var price=getPrice(top_arrivals[i].price);
                            if(price=="Not Available")
                                $(".new-arrival-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" id="'+product_group+'"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'" ></div></center><div class="caption"><h4>'+title+'</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div>');
                            else
                                $(".new-arrival-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" id="'+product_group+'"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart(this)">Add to Cart</a></p></div>');
                        }
                        else{

                            j++;
                        }
                    }
                    j=i;
                    count++;
                }
                count--;
                if(insidecnt%4==0)
                    var inc=0;
                else
                    var inc=4-insidecnt%4;
                for(var i=0;i<inc;i++){
                    if(getId(top_arrivals[i].product_id)){
                        var id=getId(top_arrivals[i].product_id);
                        var title=getTitle(top_arrivals[i].title);
                        var product_group=getProductGroup(top_arrivals[i].product_group);
                        var title=title[0].toUpperCase()+title.substring(1,title.length).toLowerCase();
                        var image=getImage(top_arrivals[i].image);
                        var manufacturer=getManufacturer(top_arrivals[i].manufacturer);
                        var price=getPrice(top_arrivals[i].price);
                        if(price=="Not Available")
                            $(".new-arrival-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" id="'+product_group+'"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'" ></div></center><div class="caption"><h4>'+title+'...</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div>');
                        else
                            $(".new-arrival-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" id="'+product_group+'"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'...</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart(this)">Add to Cart</a></p></div>');
                    }
                    else{
                        inc--;
                    }
                }
            }
        },
        error:function(jqXHR,textStatus,errorThrown){
            $(".loading1").remove();
            $(".new-arrival-list1").append('<center><div class="col-md-12 column error"><h3 style="color: red">Error Connecting amazon try again</h3></div></center>');
        }

    });

}

$(".more-top-arrivals").click(function(e){
    if(arrival_count<top_arrivals.length){
        var count=arrival_count+4;

        for(var i=arrival_count;(i<count && i<top_arrivals.length);i++){
            if(top_arrivals[i].product_id){
            var id=getId(top_arrivals[i].product_id);
            var title=getTitle(top_arrivals[i].title);
            var image=getImage(top_arrivals[i].image);
            var manufacturer=getManufacturer(top_arrivals[i].manufacturer);
            var price=getPrice(top_arrivals[i].price);
            if(price=="Not Available")
                $(".new-arrival-list1").append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'" ></div></center><div class="caption"><h4>'+title+'...</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div>');
            else
                $(".new-arrival-list1").append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'...</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart(this)">Add to Cart</a></p></div>');
        }
            else
            count++;
        }
        arrival_count=count;
    }
        if(arrival_count>=top_arrivals.length){
            $(".more-top-arrivals").attr("disabled","disable") ;
            $(".more-top-arrivals").text("No more products");;
        }

});

$(".more-top-selling").click(function(e){
    if(selling_count<top_products.length){
        var count=selling_count+4;
        for(var i=selling_count;(i<count && i<top_products.length);i++){
            if(getId(top_products[i].product_id)){
            var id=getId(top_products[i].product_id);
            var product_group=getProductGroup(top_products[i].product_group);
            var title=getTitle(top_products[i].title);
            var image=getImage(top_products[i].image);
            var manufacturer=getManufacturer(top_products[i].manufacturer);
            var price=getPrice(top_products[i].price);
            if(price=="Not Available")
                $(".top-product-list1").append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" id="'+product_group+'"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'" ></div></center><div class="caption"><h4>'+title+'...</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div>');
            else
                $(".top-product-list1").append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" id="'+product_group+'"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'...</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart(this)">Add to Cart</a></p></div>');
        }
            else
            count++;
        }
        selling_count=count;
         }
        if(selling_count>=top_products.length){
            $(".more-top-selling").attr("disabled","disable");
            $(".more-top-selling").text("No more products");
        }

});


function getMoreSearchSuggestion(){


    if(search_count<search_products.length){
        var count=search_count+4;
        for(var i=search_count;(i<count && i<search_products.length);i++){
            if(search_products[i].product_id){
                var id=getId(search_products[i].product_id);
                var title=getTitle(search_products[i].title);
                var image=getImage(search_products[i].image);
                var manufacturer=getManufacturer(search_products[i].manufacturer);
                var price=getPrice(search_products[i].price);
                if(price=="Not Available")
                    $(".search-suggestion-list").append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'" ></div></center><div class="caption"><h4>'+title+'...</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div>');
                else
                    $(".search-suggestion-list").append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'...</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart(this)">Add to Cart</a></p></div>');
            }
            else
                count++;
        }
        search_count=count;
        if(search_count>=search_products.length){
            document.querySelector(".more-search-suggestion").text("No more products");;
            $(".more-search-suggestion").attr("disabled","disable") ;
        }
    }
}

function showMoreClickSuggest(){


    if(click_suggest_count<click_suggest.length){
        var count=click_suggest_count+4;

        for(var i=click_suggest_count;(i<count && i<click_suggest.length);i++){
            if(getId(click_suggest[i].product_id)){

                var id=getId(click_suggest[i].product_id);
                var product_group=getProductGroup(click_suggest[i].product_group);
                var title=getTitle(click_suggest[i].title);
                var image=getImage(click_suggest[i].image);
                var manufacturer=getManufacturer(click_suggest[i].manufacturer);
                var price=getPrice(click_suggest[i].price);
                if(price=="Not Available")
                    $(".click-product-list").append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'" ></div></center><div class="caption"><h4>'+title+'...</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div>');
                else
                    $(".click-product-list").append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'...</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart(this)">Add to Cart</a></p></div>');
            }
            else
            count++;
        }
        click_suggest_count=count;
        }
        if(click_suggest_count>=click_suggest.length){
            $(".more-click-suggestion").attr("disabled","disable");
            $(".more-click-suggestion").text("No more products");
        }
}


function getId(id){
    if(id!="Not Available"){
        if(id[0])
        return id[0];
        else
        return false;
    }
    else
    return false;
}

function getTitle(title){
    if(title!="Not Available"){
        if(title[0])
            return (title[0].length>12?(title[0].substring(0,12)+"..."):(title[0]));
        else
            return "<br>";
    }
    else
        return "<br>";
}
function getImage(image){
    if(image!="Not Available"){
        if(image['URL'])
            return image['URL'];
        else
            return "";
    }
    else
        return "";
}

function getPrice(price){
    if(price!="Not Available"){
        if(price[0])
            return price[0];
        else
            return "<br>";
    }
    else
        return "Not Available";
}


function getManufacturer(manufacturer){
    if(manufacturer!="Not Available"){
        if(manufacturer[0])
            return "by "+(manufacturer[0].length>12?(manufacturer[0].substring(0,12)+"..."):(manufacturer[0]));
        else
            return "<br>";
    }
    else
        return "<br>";
}

function getProductGroup(product_group){
    if(product_group!="Not Available"){
        if(product_group[0])
            return product_group[0];
        else
            return "All";
    }
    else
        return "All";
}


function product_click(e){
    //ajax request to update click db

    var product_id=$(e).parent().parent().attr("id");
    insertClickInDb(product_id);
        window.location.assign(base_url+"index.php/home/productDetails/"+product_id);

}



function insertClickInDb(product_id){
    category="All";
    keyword="All";
    brand="All";
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/home/insertClickDb",
        data:"category="+category+"&brand="+brand+"&product_id="+product_id,

        success:function($data){
        }
    });
}


function addToCart(e){
    var product_id=e.parentNode.parentNode.parentNode.id;
    jQuery.ajax({
        type: "POST",
        url: base_url + "index.php/cartOpn/updateCart",
        data: "product_id=" +product_id+"&qty=1&operation=insert",
        success: function(c) {
            if(c == "inCart")
            {
                if($(".navalert"))
                    $(".navalert").remove();
                $("body").append('<div class="alert alert-danger navalert" role="alert" style="position: fixed;text-decoration: none;z-index: 5;top: 13%;left: 50%;transform: translate(-50%, -50%);"></div>');
                $(".navalert").text("This item is available in your cart").show().fadeOut(2000);
            }
            if(c == "done")
            {
                $(e).attr("disabled","disable");
                document.querySelector("#cartVal").innerHTML=parseInt(document.querySelector("#cartVal").innerHTML)+1;
                e.innerHTML="Added to Cart";
            }

        }
    })
}

$(".search").click(function(e){
    //<?php echo base_url()?>index.php/home/searchResult
    var category=getCategory();
    var keyword=getSearchKeyword();

    if(category=="All" && keyword==""){
        if($(".navalert"))
            $(".navalert").remove();
        $("body").append('<div class="alert alert-warning navalert" role="alert" style="position: fixed;text-decoration: none;z-index: 5;top: 13%;left: 50%;transform: translate(-50%, -50%);"></div>');
        $(".navalert").text("Please specify category or enter some keyword").show().fadeOut(2000);
    }
    else{
        if(keyword=="")
            keyword="All";
    window.location.assign(base_url+"index.php/searchResult/index?category="+category+"&keyword="+keyword);
    }
});

    function getCategory(){
    return $('.category').val();
    }

    function getSearchKeyword(){
    return $('.search-keyword').val();
    }