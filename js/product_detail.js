/**
 * Created by root on 24/9/14.
 */
/*
*
*/

var click_suggest;
var click_suggest_count;
var search_products;
var search_count;
var desc;

$(document).ready(function(e){
        $(".product-detail").append('<center><img class="loading" data-src="holder.js/100%x200" alt="100%x200" src="'+base_url+'pics/35.gif" style="height: 50px; width: 50px"/></center>');

    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/home/getProductDetail",
        data:"product_id="+product_id,

        success:function($data){

            $(".product-detail").empty();
            var product_detail = jQuery.parseJSON($data);

            if(product_detail!=false){
            var id=getId(product_detail);
            var title=getTitle(product_detail);
            var image=getImage(product_detail);
            var manufacturer=getManufacturer(product_detail);
            var price=getPrice(product_detail);
            desc=getDesc(product_detail);
            var feature=getFeature(product_detail);
            var imageset=getImageSet(product_detail);
            if(price=="Not Available")
            $(".product-detail").append('<div id="'+id+'" class="col-md-12 column"><div class="row clearfix"><div class="col-md-5 column">'+imageset+'</div><div class="col-md-7 column"><h3 style="margin-top: 0px">'+title+'</h3><h4>'+manufacturer+'</h4><h4 style="color: red">Currently Unavailable</h4><div>Feature:<br>'+feature+'</div><a href="#description-modal" data-toggle="modal" onclick="addDesc()">Click Here to view product description</a><p style="padding-top: 10%;"><a class="btn btn-primary add-to-cart" disabled role="button">Unavailable</a></p></div></div></div>');
            else
            $(".product-detail").append('<div id="'+id+'" class="col-md-12 column"><div class="row clearfix"><div class="col-md-5 column">'+imageset+'</div><div class="col-md-7 column"><h3 style="margin-top: 0px">'+title+'</h3><h4>'+manufacturer+'</h4><h4>'+price+'</h4><div>Feature:<br>'+feature+'</div><a href="#description-modal" data-toggle="modal" onclick="addDesc()">Click Here to view product description</a><p style="padding-top: 10%;"><a class="btn btn-primary add-to-cart" onclick="addToCart(this)" role="button">Add to Cart</a></p></div></div></div>');
            DisplaySimilarProduct(product_detail.similar_product);

            }
            else{
                $(".product-detail").append('<div class="col-md-12 column"><h3 style="color: red">Error Connecting amazon try again</h3></div>');
            }

        },
        error:function(jqXHR,textStatus,errorThrown){
            $(".loading").remove();
            $(".product-detail").append('<center><div class="col-md-12 column error"><h3 style="color: red">Error Connecting amazon try again</h3></div></center>');
        }
    });
});

function DisplaySimilarProduct(similar_product){
    if(similar_product.length>0){
        $(".similar-detail").append('<div class="similar"><center><h4>Getting Similar Product</h4></center><br><center><img class="loading" data-src="holder.js/100%x200" alt="100%x200" src="'+base_url+'pics/35.gif" style="height: 50px; width: 50px"/></center></div>');

    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/home/getDescription",
        data:{similar:similar_product},

        success:function($data){
           $(".similar").remove();
           displayClickSuggestion();
           var similar_top='<div class="col-md-12 column"><h3 class="title"><center>Similar Products</center></h3><div class="row clearfix"> <div class="col-md-12 column similiar-product-list"><br>';
           var similar_bot='</div></div></div>';
           var similar_body="";
           var product_detail = jQuery.parseJSON($data);
           var count=4;

           for(var i=0;(i<count && i<product_detail.length);i++){
            if(getId(product_detail[i])){
                var title=getTitle(product_detail[i]);
                var manufacturer=getManufacturer(product_detail[i]).length>15?getManufacturer(product_detail[i]).substring(0,15)+"...":getManufacturer(product_detail[i]);
                var title=title.length>15?title[0].toUpperCase()+title.substring(1,15).toLowerCase()+"...":title[0].toUpperCase()+title.substring(1).toLowerCase();

                if(getPrice(product_detail[i])=="Not Available")
                similar_body+='<div id="'+getId(product_detail[i])+'" class="col-md-3 column">' +
                              '<div class="thumbnail"> ' +
                              '<div class="product" onclick="product_click(this)"><center><div class="productImageWrapper">' +
                              '<img data-src="holder.js/100%x200" alt="Image not available" src="'+getImage(product_detail[i])+'" ></div></center>' +
                              '<div class="caption"><h4>'+title+'...</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p>' +
                              '</div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div></div>';
                else
                similar_body+='<div id="'+getId(product_detail[i])+'" class="col-md-3 column">' +
                              '<div class="thumbnail"> ' +
                              '<div class="product" onclick="product_click(this)">' +
                              '<center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+getImage(product_detail[i])+'"></div></center>' +
                              '<div class="caption"><h4>'+title+'...</h4><h5>'+getPrice(product_detail[i])+'</h5><p>'+manufacturer+'</p></div>' +
                              '</div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart1(this)">Add to Cart</a></p></div></div>';
            }
            else{
                count++
            }

           }
            $(".similar-detail").append(similar_top+similar_body+similar_bot);
        },
        error:function(jqXHR,textStatus,errorThrown){
            $(".similar").remove();
            displayClickSuggestion();
        }
    });
    }
    else
        displayClickSuggestion();
}
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
                        if(getId(search_products[i])){
                            var id=getId(search_products[i]);
                            var title=getTitle(search_products[i]).length>15?getTitle(search_products[i]).substring(0,15)+"...":getTitle(search_products[i]);
                            var title=title[0].toUpperCase()+title.substring(1,title.length).toLowerCase();
                            var image=getImage(search_products[i]);
                            var manufacturer=getManufacturer(search_products[i]).length>15?getManufacturer(search_products[i]).substring(0,15)+"...":getManufacturer(search_products[i]);
                            var price=getPrice(search_products[i]);
                            if(price=="Not Available")
                                $(".search-suggestion-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" > <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'" ></div></center><div class="caption"><h4>'+title+'...</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div>');
                            else
                                $(".search-suggestion-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" > <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'...</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart1(this)">Add to Cart</a></p></div>');
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
                            if(getId(search_products[i])){
                                var id=getId(search_products[i]);
                                var title=getTitle(search_products[i]).length>15?getTitle(search_products[i]).substring(0,15)+"...":getTitle(search_products[i]);
                                var title=title[0].toUpperCase()+title.substring(1,title.length).toLowerCase();
                                var image=getImage(search_products[i]);
                                var manufacturer=getManufacturer(search_products[i]).length>15?getManufacturer(search_products[i]).substring(0,15)+"...":getManufacturer(search_products[i]);
                                var price=getPrice(search_products[i]);
                                if(price=="Not Available")
                                    $(".search-suggestion-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" > <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'" ></div></center><div class="caption"><h4>'+title+'...</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div>');
                                else
                                    $(".search-suggestion-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" > <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'...</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart1(this)">Add to Cart</a></p></div>');
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
                        if(getId(click_suggest[i])){
                            var id=getId(click_suggest[i]);
                            var title=getTitle(click_suggest[i]).length>15?getTitle(click_suggest[i]).substring(0,15)+"...":getTitle(click_suggest[i]);
                            var title=title[0].toUpperCase()+title.substring(1,title.length).toLowerCase();
                            var image=getImage(click_suggest[i]);
                            var manufacturer=getManufacturer(click_suggest[i]).length>15?getManufacturer(click_suggest[i]).substring(0,15)+"...":getManufacturer(click_suggest[i]);
                            var price=getPrice(click_suggest[i]);
                            if(price=="Not Available")
                                $(".click-suggestion-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" > <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'" ></div></center><div class="caption"><h4>'+title+'...</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div>');
                            else
                                $(".click-suggestion-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" > <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'...</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart1(this)">Add to Cart</a></p></div>');
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
                            if(getId(click_suggest[i])){
                                insidecnt++;
                                var id=getId(click_suggest[i]);
                                var title=getTitle(click_suggest[i]).length>15?getTitle(click_suggest[i]).substring(0,15)+"...":getTitle(click_suggest[i]);
                                var title=title[0].toUpperCase()+title.substring(1,title.length).toLowerCase();
                                var image=getImage(click_suggest[i]);
                                var manufacturer=getManufacturer(click_suggest[i]).length>15?getManufacturer(click_suggest[i]).substring(0,15)+"...":getManufacturer(click_suggest[i]);
                                var price=getPrice(click_suggest[i]);
                                if(price=="Not Available")
                                    $(".click-suggestion-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" > <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'" ></div></center><div class="caption"><h4>'+title+'...</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div>');
                                else
                                    $(".click-suggestion-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" > <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'...</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart1(this)">Add to Cart</a></p></div>');
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
                            if(getId(click_suggest[i])){
                                var id=getId(click_suggest[i]);
                                var title=getTitle(click_suggest[i]).length>15?getTitle(click_suggest[i]).substring(0,15)+"...":getTitle(click_suggest[i]);
                                var title=title[0].toUpperCase()+title.substring(1,title.length).toLowerCase();
                                var image=getImage(click_suggest[i]);
                                var manufacturer=getManufacturer(click_suggest[i]).length>15?getManufacturer(click_suggest[i]).substring(0,15)+"...":getManufacturer(click_suggest[i]);
                                var price=getPrice(click_suggest[i]);
                                if(price=="Not Available")
                                    $(".click-suggestion-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" > <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'" ></div></center><div class="caption"><h4>'+title+'...</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div>');
                                else
                                    $(".click-suggestion-carousel-row"+count).append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail" > <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'...</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart1(this)">Add to Cart</a></p></div>');
                            }
                            else{
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


function getId(product_detail){
    if(product_detail.product_id!="Not Available"){
        if(product_detail.product_id[0])
            return product_detail.product_id[0];
        else
            return false;
    }
    else
        return false;
}

function getTitle(product_detail){
    if(product_detail.title!="Not Available"){
        if(product_detail.title[0])
            return product_detail.title[0];
        else
            return "<br>";
    }
    else
        return "<br>";
}
function getImage(product_detail){
    if(product_detail.image!="Not Available"){
        if(product_detail.image['URL'])
            return product_detail.image['URL'];
        else
            return "";
    }
    else
        return "";
}
function getPrice(product_detail){
    if(product_detail.price!="Not Available"){
        if(product_detail.price[0])
            return product_detail.price[0];
        else
            return "<br>";
    }
    else
        return "Not Available";
}
function getManufacturer(product_detail){
    if(product_detail.manufacturer!="Not Available"){
        if(product_detail.manufacturer[0])
            return "by "+product_detail.manufacturer[0];
        else
            return "<br>";
    }
    else
        return "<br>";
}

function getDesc(product_detail){
    if(product_detail.content!="Not Available"){
        if(product_detail.content[0])
            return product_detail.content[0];
        else
            return "Not Available";
    }
    else
        return "Not Available";
}

function getFeature(product_detail){
    if(product_detail.feature!="Not Available"){
        return product_detail.feature;
    }
    else{
        var description=getDesc(product_detail);
        if(description.length>1200)
        return description.substr(0,1200)+'....<a href="#description-modal" data-toggle="modal" onclick="addDesc()">More</a>';
        else
        return description;
    }
}

function getImageSet(product_detail){
    if(product_detail.imageset!="Not Available"){



        var carousel_inner='<div class="carousel-inner" >'
        var height=(500-parseInt(product_detail.imageset[0]["Height"]))/2;

        carousel_inner+='<div class="item active carouselImageWrapper "><center><img style="padding-top:'+height+'px;padding-bottom:'+height+'px" class="img-responsive"  alt="Not Available" src="'+product_detail.imageset[0]['URL']+' "/></center></div>';

        var carousel_indicators='<ol class="carousel-indicators visible-lg visible-md" style="padding-top: ">';

        carousel_indicators+='<li class="active" data-slide-to="0" data-target="#carousel-153822"><img alt="Not Available" src="'+product_detail.imageset[0]['URL']+'"></li>';
        for(var i=1;i<product_detail.imageset.length;i++){
            var height=(500-parseInt(product_detail.imageset[i]["Height"]))/2;
            carousel_inner+='<div class="item carouselImageWrapper"><center><img style="padding-top:'+height+'px;padding-bottom:'+height+'px" class="img-responsive" alt="Not Available" src="'+product_detail.imageset[i]['URL']+'" /></center></div>';
        carousel_indicators+='<li data-slide-to="'+i+'" data-target="#carousel-153822"> <img alt="Not Available" src="'+product_detail.imageset[i]['URL']+'"></li>';
        }
        carousel_inner+='</div>';
        carousel_indicators+='</ol>';
        var carousel='<div class="carousel slide" id="carousel-153822"  data-ride="carousel">';

        //
        carousel+=carousel_inner;
        carousel+=carousel_indicators;
        if(product_detail.imageset.length==1)
            console.log();
        else
            carousel+='<a class="left carousel-control" href="#carousel-153822" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a> <a class="right carousel-control" href="#carousel-153822" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>';
        carousel+='</div>';
        return carousel;
    }
    else
    return "";
}

function addDesc(){
    if(desc!="Not Available"){
        $(".desc-modal").empty()
    $(".desc-modal").append(desc);
    }
    else
    $(".desc-modal").text("Description Currently Unavailable");
}

$(".search").click(function(e){
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

function addToCart(e){
    var product_id=e.parentNode.parentNode.parentNode.parentNode.id;
    jQuery.ajax({
        type: "POST",
        url: base_url + "index.php/cartOpn/updateCart",
        data: "product_id=" +product_id+"&qty=1&operation=insert",
        success: function(c) {
            if(c == "done")
            {
                $(e).attr("disabled","disable");
                document.querySelector("#cartVal").innerHTML=parseInt(document.querySelector("#cartVal").innerHTML)+1;
                e.innerHTML="Added to Cart";
            }
            if(c == "inCart")
            {
                if($(".navalert"))
                    $(".navalert").remove();
                $("body").append('<div class="alert alert-danger navalert" role="alert" style="position: fixed;text-decoration: none;z-index: 5;top: 13%;left: 50%;transform: translate(-50%, -50%);"></div>');
                $(".navalert").text("This item is available in your cart").show().fadeOut(2000);
            }

        }
    })
}


function addToCart1(e){
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
                    $(".search-suggestion-list").append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'...</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart1(this)">Add to Cart</a></p></div>');
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
                var title=getTitle(click_suggest[i].title);
                var image=getImage(click_suggest[i].image);
                var manufacturer=getManufacturer(click_suggest[i].manufacturer);
                var price=getPrice(click_suggest[i].price);
                if(price=="Not Available")
                    $(".click-product-list").append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'" ></div></center><div class="caption"><h4>'+title+'...</h4><h5 style="color: #B81B1B">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart"  role="button" disabled>Unavaiable</a></p></div>');
                else
                    $(".click-product-list").append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'...</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart1(this)">Add to Cart</a></p></div>');
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