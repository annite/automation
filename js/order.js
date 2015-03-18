/**
 * Created by root on 8/10/14.
 */
$(document).ready(function(e){
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/cartOpn/getOrderInfo",
        success:function($data){
            if($data.trim())
            {
                var data=jQuery.parseJSON($data);

                $(".orders").append('<div class="row clearfix orderTitle"><div class="col-md-12 column"><center><h3>Your Order History</h3></center></div></div>');
                $(".orders").append('<div class="panel-group" id="orderDetails">');
                for(var i=0;i<data.length;i++)
                {
                    var bill_no=data[i][i].bill_no;
                    var gt=data[i][i].total_amt;
                    var noi=data[i][data[i][i].bill_no].length;


                    var order=$(".orders");
                    $("#orderDetails").append('<div class="panel panel-info"><div class="panel-heading" data-toggle="collapse" data-parent="#orderDetails" data-target="#'+i+'i"><h4 class="panel-title accordion-toggle"><div class="row clearfix"><div class="col-md-4 column">OrderId : '+bill_no+'</div><div class="col-md-4 column">Number of items : '+noi+'</div><div class="col-md-4 column gt">Grand Total : '+gt+'</div></div></h4></div><div id="'+i+'i" class="panel-collapse collapse"><div class="panel-body '+i+'i">');
                    for(var j=0;j<noi;j++)
                    {
                        var product_id=data[i][data[i][i].bill_no][j].product_id;
                        var product_name=data[i][data[i][i].bill_no][j].product_name;
                        var qty=data[i][data[i][i].bill_no][j].qty;
                        var cost=data[i][data[i][i].bill_no][j].cost;

                        $("."+i+"i").append('<div class="row clearfix ord"><div class="col-md-4 column"><u>Product Id</u> : '+product_id+'</div><div class="col-md-4 column"><u>Product Name</u> : '+product_name+'</div><div class="col-md-4 column"><u>Quantity</u> : '+qty+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u>Cost/Item</u> : INR. '+cost+'</div></div></div></div>');
                    }

                }
            }
            else
                $(".orders").append('<br><br><br><center><h3>No Orders Placed Yet</h3><br><a href="'+base_url+'index.php/home"class="btn btn-primary">Continue Shopping</a></center>');
        }
    });
});



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



