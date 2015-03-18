/**
 * Created by root on 24/9/14.
 */

window.prc=[];


$(document).ready(function(e){
    $("#cartVal").css("top","-1%");
    $("#cart-nav").attr("class","active");
    $("#home-nav").attr("class","");
    $("#loing-nav").attr("class","");
    $("#cart-details").append('<center><img data-src="holder.js/100%x200" alt="100%x200" src="'+base_url+'pics/35.gif" style="height: 50px; width: 50px"/></center>');
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/cartOpn/getCartInfo",
        success:function($data){
            document.querySelector("#cart-details").removeChild($("#cart-details").children()[0]);
            if($data!="failure")
            {
                var ref=document.querySelector("#cart-details");
                var product_list=jQuery.parseJSON($data);
                var grandtotal=0;
                window.prc=product_list;
                $("#cart-details").append('<div class="row clearfix"><div class="col-md-4 column"><h4>Item</h4></div><div class="col-md-2 column"><h4>Quantity</h4></div><div class="col-md-2 column"><h4>Price</h4></div><div class="col-md-2 column"><h4>Subtotal</h4></div><div class="col-md-2 column"><h4>Remove</h4></div></div><hr>');
                for(var i=0;i<product_list.length;i++)
                {
                    if(getId(product_list[i].product_id))
                    {
                        var image=product_list[i].image['URL'];
                        image=getImage(image);

                        var title=product_list[i].title[0];
                        var qty=product_list[i].qty;
                        var amount=product_list[i].amount[0]/100;
                        var subtotal=amount*qty;
                        var product_id=product_list[i].product_id;
                        grandtotal=grandtotal+subtotal;
                        $("#cart-details").append('<div class="row clearfix" id='+product_id+'><div class="col-md-4 column"><div class="row clearfix"><div class="col-md-6 column cartImageWrapper"><center><img class="img-responsive" data-src="holder.js/100%x180" alt="..." src="'+image+'"></center></div><div class="col-md-6 column"><h4>'+title+'</h4></div></div></div><div class="col-md-2 column"><select class="cart-qty btn btn-default dropdown-toggle" onchange="qtyChange(this)"><option class="1" value="1">1</option><option class="2" value="2">2</option><option class="3" value="3">3</option><option class="4" value="4">4</option><option class="5" value="5">5</option><option class="6" value="6">6</option><option class="7" value="7">7</option><option class="8" value="8">8</option><option class="9" value="9">9</option><option class="10" value="10">10</option></select></div><div class="col-md-2 column"><h5>INR '+amount+'.00</h5></div><div class="col-md-2 column"><h5>INR '+subtotal+'.00</h5></div><div class="col-md-2 column"><button type="button" class="remove-product btn-default btn"  aria-hidden="true" onclick="removeProduct(this)">X</button></div></div><hr>');
                        $("."+qty).last().attr("selected","selected");
                    }
                }
                $("#cart-details").append('<div class="row clearfix"><div class="col-md-6 column"></div><div class="col-md-2 column" style="margin-top: -0.2%;"><h4>Grand Total :</h4></div><div class="col-md-2 column"><h5 id="grand-total">INR '+grandtotal+'.00</h5></div><div class="col-md-2 column"></div></div>');
                $("body").append('<div style="position: fixed;bottom: 8em;right: 0px;text-decoration: none;font-size: 12px;"><button type="button" class="place-order btn btn-primary" onclick="placeOrder(this)"  aria-hidden="true">Place Order</button></div>')
            }
            else
                $("#cart-details").append('<br><br><br><center><h3>There are no items in this cart</h3><br><a href="'+base_url+'index.php/home"class="btn btn-primary">Continue Shopping</a></center>');
        }
    });
});

function placeOrder(e)
{
    var grandtotal=0;
    var cost=[];
    var name=[];
    for(var i=0;i<window.prc.length;i++)
    {
        cost[i]=(window.prc[i].amount[0]/100)*window.prc[i].qty;
        name[i]=window.prc[i].title[0];
        grandtotal+=cost[i];
    }
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/cartOpn/placeOrder",
        data:{name:name,cost:cost,grandtotal:grandtotal},

        success:function($data){
            var d=$data;

            if($data=="login")
                $("#open-modal").trigger("click");

            if($data!="login")
            {
                document.querySelector("#cartVal").innerHTML="0";
                $("#cart-details").empty();
                $("#cart-details").append('<center><div style="color: #008A00"><h2>Your order has been placed successfully.</h2></div><br><a href="'+base_url+'index.php/home"class="btn btn-primary">Continue Shopping</a></center>');
                $(".place-order").remove();
                onError(d);
            }
        }
    });
}
function onError(message)
{
    message=jQuery.parseJSON(message);
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/cartOpn/sendOrderDetails",
        data:{message:message.message,billno:message.billno},

        success:function($d){

        },
        error:function()
        {
            onError(message)
        }

    });
}
function qtyChange(e){


    var grandtotal=0;
    var product_id=$(e).parent().parent().attr("id");
    for(var i=0;i<window.prc.length;i++)
    {
        if(window.prc[i]["product_id"]===product_id)
        {
            var price=window.prc[i].amount[0]/100;
            window.prc[i].qty= e.value;
        }
        else
            grandtotal+=(window.prc[i].amount[0]/100)*window.prc[i].qty;
    }
    var subtotal=parseInt(price)*parseInt(e.value);
    grandtotal+=subtotal;
    $(e).parent().parent().children()[3].innerHTML="<h5>INR "+subtotal+".00</h5>";
    $(e).parent().parent().children()[2].innerHTML="<h5>INR "+price+".00</h5>";
    document.querySelector("#grand-total").innerHTML="INR "+grandtotal+".00";
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/cartOpn/updateCart",
        data :"product_id=" +product_id+"&qty="+parseInt(e.value)+"&operation=updateQty",
        success:function($data){
        }
    });

}

function removeProduct(e){
    var grandtotal=0;
    var product_id=$(e).parent().parent().attr("id");
    e.parentNode.parentNode.nextSibling.remove();
    $(e).parent().parent().remove();
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/cartOpn/updateCart",
        data :"product_id=" +product_id+"&qty=1&operation=removeProduct",
        success:function($data){

            for(var i=0;i<window.prc.length;i++)
            {

                if(window.prc[i].product_id == product_id)
                    var j=i;
                else
                    grandtotal+=(window.prc[i].amount[0]/100)*window.prc[i].qty;
            }
            window.prc.splice(j,1);
            document.querySelector("#grand-total").innerHTML="INR "+grandtotal+".00";
            document.querySelector("#cartVal").innerHTML=parseInt(document.querySelector("#cartVal").innerHTML)-1;
            if(window.prc.length == 0)
            {
                $("#cart-details").empty();
                $("#cart-details").append('<br><br><br><center><h3>There are no items in this cart.</h3><br><a href="'+base_url+'index.php/home"class="btn btn-primary">Continue Shopping</a></center>');
                $(".place-order").remove();
            }
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
function getImage(image){
    if(image)
        return image;
    else
        return "";
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
