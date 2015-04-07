/**
 * Created by ankit.sh on 3/23/2015.
 */
var FishStockDetails=[];
$(document).ready(function(){
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/home/getFishList",
        success:function($data){
            $data=jQuery.parseJSON($data);
            FishStockDetails=$data;
            for(var i=0;i<$data.length;i++){
                var opt=document.createElement("option");
                opt.innerHTML=$data[i].FishName;
                $("#fishName").append(opt);
            }
            $("#available").val($data[0].Weight);
        }
    });
});
$("#updateStock").click(function(b){
    if (document.querySelector("#weight").value === "") {
        document.querySelector("#weight").style.borderColor = "#B81B1B";
        document.querySelector("#weight").placeholder = "Please Enter Weight in KGs";
        document.querySelector("#weight").focus();
        b.preventDefault();
    }else if (document.querySelector("#rate").value === "") {
        document.querySelector("#rate").style.borderColor = "#B81B1B";
        document.querySelector("#rate").placeholder = "Please Rate per KG";
        document.querySelector("#rate").focus();
        b.preventDefault();
    }else if (parseInt(document.querySelector("#weight").value)>parseInt(document.querySelector("#available").value)) {
        document.querySelector("#weight").value="";
        document.querySelector("#weight").style.borderColor = "#B81B1B";
        document.querySelector("#weight").placeholder = "Exceeding available stock";
        document.querySelector("#weight").focus();
        b.preventDefault();
    } else {
        $("#total").val(parseInt(document.querySelector("#weight").value)*parseInt(document.querySelector("#rate").value));
        jQuery.ajax({
            type:"POST",
            url:base_url+"index.php/home/updateOutgoingStock",
            data:{fishName:$("#fishName").val(),weight:$("#weight").val(),rate:$("#rate").val(),isCash:document.getElementById("cashPayment").checked,currency:$("#currency").val().substring(0,$("#currency").val().length-4)},
            success:function($data){
                //console.log($data);
                if($data=="done") {
                    FishStockDetails[document.getElementById("fishName").selectedIndex].Weight=FishStockDetails[document.getElementById("fishName").selectedIndex].Weight-$("#weight").val();
                    $("#available").val(FishStockDetails[document.getElementById("fishName").selectedIndex].Weight);
                    $("#outgoingAlert").append('<div class="alert alert-success modalert" role="alert" style="background-color: green;padding:3px;text-align: center"></div>');
                    $(".modalert").text("Stock Updated").show().fadeOut(2000);
                    setTimeout(function(){$(".modalert").remove()},2000);
                    $("#weight").val("");
                    $("#rate").val("");
                    $("#total").val("");
                }else {
                    $("#outgoingAlert").append('<div class="alert alert-danger modalert" role="alert" style="background-color: red;padding:3px;text-align: center"></div>');
                    $(".modalert").text("Problem updating stock").show().fadeOut(2000);
                    setTimeout(function(){$(".modalert").remove()},2000);
                }

            }
        });
    }
});
$("#inventoryUpdateStock").click(function(b){
    if (b.target.className === "form-control") {
        b.target.style.borderColor = "";
    }
});
$("#fishName").change(function(){
    $("#available").val(FishStockDetails[document.getElementById("fishName").selectedIndex].Weight);
});