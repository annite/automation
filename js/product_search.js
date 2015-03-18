/**
 * Created by root on 24/9/14.
 */
var browseNodeID;
//var Electronics=["Apple","BlackBerry","Canon","Creative","D-Link","Dell","Detak","Enter","FUSON","Generic","Grabmore","HTC","HP","iBall","Intex","Kingston","Karbonn","Lenovo","LG","Logitech","Micromax","Logitech","Netgear","Nokia","Panasonic","Philips","Samsung","SanDisk","Seagate","Sennheiser","Skullcandy","Sony","TP-Link","Transcend","Transcend Information","WD"];
var Beauty=["AASTHA","And-Also","AXE","Bio","Biotique","Cobra","DABUR","Davidoff","Denmin","Dettol","Dove","Engage","Finn Cosmeceuticals","Fogg","Gillette","Himalaya","Indulekha","Kesh King","KS (KamaSutra)","L'Oreal Paris","Lakme","Layer'r","Livon","Matrix","Maybelline","Neutrogena","Nivea","Olay","Panasonic","Park Avenue","Pears","Philips","POND'S","Shahnaz Husain","Shehnaz Herbal","Vega","Vini","VLCC"];
var Baby=["Aveeno","Bumberry","Chicco","Disney","Dr. Brown's","Dreambaby","Farlin","Fisher-Price","Garg","Glitz Baby","Himalaya","Horlicks","Huggies","Infanto","Johnson's","Kawachi","LEGO","Libero","Little's","Mamy Poko","Mebelkart","Mee Mee","Mothercare","Nestlé","Cerelac","Nyrwana","Pampers","Pigeon","Playskool","Quick Dry","Raaisin","Safe Baby","SebaMed","Sleep Dry","Spiderman","Tiny Love"];
var HomeGarden=["Accedre","Amco","Annapurna","Bajaj","Bliss India","Borosil","Chaina maid","Citrus","Eureka Forbes","Fix IT Pro","Flagship","Gala","Ganesh","Generic","Inalsa","Jaipan","Kraft Seeds","MILTON","Multiscrewdriver","Orpat","Panasonic","Philips","Pigeon","Prestige","Qubeplex","Singer","Tosaa","Tupperware","Unique Gadget","Wall Whispers","Wonderchef"];
//var HealthPersonalCare=["AASTHA","AXE","Bio","Biotique","Coca-Cola","Davidoff","Denmin","Dettol","Dove","Durex","FactoryDirectPro","Garnier","Gillette","Herbalife","Himalaya","KS (KamaSutra)","L'Oreal Paris","Lakme","Livon","MANIPOL","Matrix","Maybelline","Nestle","Neutrogena","Nivea","Nova","One Touch Ultra","Organic India","Park Avenue","Pears","Philips","Soulflower","TRESemme","Vega","Venus","VLCC"];
var Jewelry=["Zaveri Pearls","Cyan","925 Silver","SIASIA","Sukkhi","GB","Surat Diamonds","Angel Glitter","Eterno","ShalinIndia","Bindhani","Samaira","Scorched Earth","Mahi","I Jewels"];
var PCHardware=["Acer","Apple","Asus","Canon","Capdase","Clublaptop","D-Link","Dell","Enter","Generic","HCL","Hitachi","HP","Huawei","iBall","Intex","Kaspersky","Kingston","Lenovo","Leoxsys","LG","Logitech","Micromax","Microsoft","Netgear","Philips","Samsung","SanDisk","Seagate","Sony","Targus","Toshiba","TP-Link","Transcend","Tukknu","Wacom"];
var Toys=["Zaveri Pearls","Cyan","925 Silver","SIASIA","Sukkhi","GB","Surat Diamonds","Angel Glitter","Eterno","ShalinIndia","Bindhani","Samaira","Scorched Earth","Mahi","I Jewels"];
//var Luggage=["3 Mad Chicks","American Tourister","Bagsy Malone","Bleu","BLT","Butterflies","Caprese","Chevron","Dell","Disney","F Gear","Fastrack","Fostelo","Generic","Genius","Hawai","Hidedge","High Sierra","HP","K London","kapoor enterprises","Lapcare","Metro","NINJA TURTLE","Pindia","Puma","Samsung","Senterlan","Skybags","SPAIROW","Targus","Titan","Travel Blue","Unique Gadget"];

var brands=new Array();
brands['Beauty']=new Array("AASTHA","And-Also","AXE","Bio","Biotique","Cobra","DABUR","Davidoff","Denmin","Dettol","Dove","Engage","Finn Cosmeceuticals","Fogg","Gillette","Himalaya","Indulekha","Kesh King","KS (KamaSutra)","L'Oreal Paris","Lakme","Layer'r","Livon","Matrix","Maybelline","Neutrogena","Nivea","Olay","Panasonic","Park Avenue","Pears","Philips","POND'S","Shahnaz Husain","Shehnaz Herbal","Vega","Vini","VLCC");
brands['Baby']=new Array("Aveeno","Bumberry","Chicco","Disney","Dr. Brown's","Dreambaby","Farlin","Fisher-Price","Garg","Glitz Baby","Himalaya","Horlicks","Huggies","Infanto","Johnson's","Kawachi","LEGO","Libero","Little's","Mamy Poko","Mebelkart","Mee Mee","Mothercare","Nestlé","Nestlé Cerelac","Nyrwana","Pampers","Pigeon","Playskool","Quick Dry","Raaisin","Safe Baby","SebaMed","Sleep Dry","Spiderman","Tiny Love");
brands['HomeGarden']=new Array("Accedre","Amco","Annapurna","Bajaj","Bliss India","Borosil","Chaina maid","Citrus","Eureka Forbes","Fix IT Pro","Flagship","Gala","Ganesh","Generic","Inalsa","Jaipan","Kraft Seeds","MILTON","Multiscrewdriver","Orpat","Panasonic","Philips","Pigeon","Prestige","Qubeplex","Singer","Tosaa","Tupperware","Unique Gadget","Wall Whispers","Wonderchef");
brands['Jewelry']=new Array("Zaveri Pearls","Cyan","925 Silver","SIASIA","Sukkhi","GB","Surat Diamonds","Angel Glitter","Eterno","ShalinIndia","Bindhani","Samaira","Scorched Earth","Mahi","I Jewels");
brands['PCHardware']=new Array("Acer","Apple","Asus","Canon","Capdase","Clublaptop","D-Link","Dell","Enter","Generic","HCL","Hitachi","HP","Huawei","iBall","Intex","Kaspersky","Kingston","Lenovo","Leoxsys","LG","Logitech","Micromax","Microsoft","Netgear","Philips","Samsung","SanDisk","Seagate","Sony","Targus","Toshiba","TP-Link","Transcend","Tukknu","Wacom");
brands['Toys']=new Array("Annie","Barbie","Buy India","Cloud b","Crown","Dayan","DholDhamaka","Disney","English Learner","Frank","Funskool","Globus","Hello Kitty","Hot Wheels","kidzone","Little's","Magic Cube","Mechanix","Negi","Peacock","Play Nation","Sanrio","ShengShou","Simba","Tickles","Tootpado");
brands['Watches']=new Array("Accedre","Britex","Calvino","Casio","Citizen","Davidson","Disney","Enem","Esprit","Fastrack","FCUK","Fossil","Fosters","Gesture","Giordano","helix","KILLER","LENCO","Lumina","Matrix","Maxima","Perucci","Playboy","Police","Polo","Puma","Sonata","timewel","Timex","Titan","Tommy Hilfiger","Zeus");

$(document).ready(function(e){
  $('.product-search-list').append('<center><img class="loading" data-src="holder.js/100%x200" alt="100%x200" src="'+base_url+'pics/35.gif" style="height: 50px; width: 50px"/></center>');
    if(keyword!="All"){
        $('.search-keyword').val(keyword);
    }

    $('.'+category).attr("selected","selected");
    if(brand)

    var data;

    if(typeof brands[category]!='undefined' && brand)
        data="category="+category+"&keyword="+keyword+"&brand="+brand;
    else
        data="category="+category+"&keyword="+keyword;

    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/searchResult/searchProduct",
        data:data,

        success:function($data){
            appendBrands();
            $('.product-search-list').empty();
            var product_list = jQuery.parseJSON($data);

            if(product_list.length>0){
                for(var i=0;i<product_list.length;i++){
                    if(product_list[i].product_id){
                    var id=getId(product_list[i].product_id);
                    var title=getTitle(product_list[i].title);
                    title=title[0].toUpperCase()+title.substring(1,title.length).toLowerCase();
                    var image=getImage(product_list[i].image);
                    var manufacturer=getManufacturer(product_list[i].manufacturer);
                    var price=getPrice(product_list[i].price);
                    if(price=="Not Available")
                    $('.product-search-list').append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'</h4><h5 style="color: red">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" disabled>Unavailable</a></p></div>');
                    else
                    $('.product-search-list').append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart(this)">Add to Cart</a></p></div>');
                }
            }
                $(".product-search-button").append('<p ><a class="btn btn-default more-products" role="button" style="width: 100%" onclick="moreSearchProduct()">Show More Products</a></p>');
            }
            else{
                $('.product-search-list').append('<div class="col-md-3 column">No Products to display</div>');

            }
            if(product_list.length<16){
                $('.more-products').attr("disabled","disable");
                $('.more-products').text("No more products");
            }
         },
        error:function(jqXHR,textStatus,errorThrown){
            $(".loading").remove();
            $('.product-search-list').append('<center><div class="col-md-12 column error"><h3 style="color: red">Error Connecting amazon try again</h3></div></center>');
        }
    });


    if(brand)
    insertSearchInDb(category,keyword,brand);
    else
    insertSearchInDb(category,keyword,"All");
});

function appendBrands(){

    if(typeof brands[category]!='undefined'){
       $('#searchBar').append('<div class="input-group"><span style="font-size: 150%;">Filter By :</span><select type="button" class="btn btn-default dropdown-toggle brand" data-toggle="dropdown" onchange="narrowBrand(this)"> <span class="caret"></span><option><a href="#">All</a></option></select></div>');
            for(var i=0;i<brands[category].length;i++){
            var opt = document.createElement("option");
            opt.value = brands[category][i];
            opt.text=brands[category][i];
            $(".brand").append(opt);
        }
    }
}

function narrowBrand(e){

    $('.product-search-list').empty();
    $('.product-search-list').append('<center><img class="loading" data-src="holder.js/100%x200" alt="100%x200" src="'+base_url+'pics/35.gif" style="height: 50px; width: 50px"/></center>');
    brand=$(e).val();
    var data;
    if(keyword=="All")
    data="category="+category+"&keyword= &brand="+brand;
    else
    data="category="+category+"&keyword="+keyword+"&brand="+brand;
    $('.more-products').attr("disabled","disable");

    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/searchResult/searchProduct",
        data:data,

        success:function($data){
            $('.more-products').attr("disabled",false);
            $('.product-search-list').empty();
            var product_list = jQuery.parseJSON($data);

            if(product_list.length>0){
                for(var i=0;i<product_list.length;i++){
                    if(product_list[i].product_id){
                        var id=getId(product_list[i].product_id);
                        var title=getTitle(product_list[i].title);
                        title=title[0].toUpperCase()+title.substring(1,title.length).toLowerCase();
                        var image=getImage(product_list[i].image);
                        var manufacturer=getManufacturer(product_list[i].manufacturer);
                        var price=getPrice(product_list[i].price);
                        if(price=="Not Available")
                            $('.product-search-list').append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'</h4><h5 style="color: red">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" disabled>Unavailable</a></p></div>');
                        else
                            $('.product-search-list').append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart(this)">Add to Cart</a></p></div>');
                    }
                }
            }
            else{
                $('.product-search-list').append('<div class="col-md-3 column">No more Products to display</div>');
                $('.more-products').attr("disabled","disable");
                $('.more-products').text("No more products");
            }
            if(product_list.length<16){
                $('.more-products').attr("disabled","disable");
                $('.more-products').text("No more products");
            }
        },
        error:function(jqXHR,textStatus,errorThrown){
            $(".loading").remove();
            $('.product-search-list').append('<center><div class="col-md-12 column error"><h3 style="color: red">Error Connecting amazon try again</h3></div></center>');
        }
    });

    insertSearchInDb(category,keyword,brand)
}

function insertSearchInDb(category,keyword,brand){
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/searchResult/insertSearchdb",
        data:"category="+category+"&keyword="+keyword+"&brand="+brand,

        success:function($data){


        }
    });
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
            return (title[0].length>15?(title[0].substring(0,15)+"..."):(title[0]));
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
            return "by "+(manufacturer[0].length>15?(manufacturer[0].substring(0,15)+"..."):(manufacturer[0]));
        else
            return "<br>";
    }
    else
        return "<br>";
}



function addToCart(e)
{
    var product_id=e.parentNode.parentNode.parentNode.id;
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
                $("body").append('<div class="alert alert-danger navalert" role="alert" style="position: fixed;top:10%;right: 44%;text-decoration: none;z-index: 5"></div>');
                $(".navalert").text("This item is available in your cart").show().fadeOut(2000);
            }

        }
    })
}

$(".search").click(function(e){
    var category=getCategory();
    var keyword=getSearchKeyword();

    if(category=="All" && keyword==""){
        if($(".navalert"))
            $(".navalert").remove();
        $("body").append('<div class="alert alert-warning navalert" role="alert" style="position: fixed;top:10%;right: 44%;text-decoration: none;"></div>');
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

function getBrand(){
    if($(".brand").val()!="undefined")
    return $(".brand").val();
    else
    return "All";
}

function moreSearchProduct(){
    $('.product-search-list').append('<center class="loading"><img data-src="holder.js/100%x200" alt="100%x200" src="'+base_url+'pics/35.gif" style="height: 50px; width: 50px"/></center>');
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/searchResult/searchMoreProduct",
        data:"category="+category+"&keyword="+keyword+"&brand="+brand,

        success:function($data){
            var product_list = jQuery.parseJSON($data);
            $(".loading").remove();

            if(product_list.length>0){
                for(var i=0;i<product_list.length;i++){
                    var id=getId(product_list[i].product_id);
                    var title=getTitle(product_list[i].title);
                    title=title[0].toUpperCase()+title.substring(1,title.length).toLowerCase();
                    var image=getImage(product_list[i].image);
                    var manufacturer=getManufacturer(product_list[i].manufacturer);
                    var price=getPrice(product_list[i].price);
                    if(price=="Not Available")
                        $('.product-search-list').append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'...</h4><h5 style="color: red">Currently Unavailable</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" disabled>Unavailable</a></p></div>');
                    else
                        $('.product-search-list').append('<div id="'+id+'" class="col-md-3 column"><div class="thumbnail"> <div class="product" onclick="product_click(this)"><center><div class="productImageWrapper"><img data-src="holder.js/100%x200" alt="Image not available" src="'+image+'"></div></center><div class="caption"><h4>'+title+'...</h4><h5>'+price+'</h5><p>'+manufacturer+'</p></div></div><p><a class="btn btn-primary add-to-cart" role="button" onclick="addToCart(this)">Add to Cart</a></p></div>');
                }
            }
            else{
                $('.product-search-list').append('<div class="col-md-3 column">No more Products to display</div>');
                $('.more-products').attr("disabled","disable");
                $('.more-products').text("No more products");
            }
            if(product_list.length<16){
                $('.more-products').attr("disabled","disable");
                $('.more-products').text("No more products");
            }
        },
        error:function(jqXHR,textStatus,errorThrown){
            $(".loading").remove();

        }
    });

}


function product_click(e){
    //ajax request to update click db

    var product_id=$(e).parent().parent().attr("id");
    insertClickInDb(product_id);
    window.location.assign(base_url+"index.php/home/productDetails/"+product_id);

}

function insertClickInDb(product_id){
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/home/insertClickDb",
        data:"category="+category+"&brand="+brand+"&product_id="+product_id,

        success:function($data){
        }
    });
}