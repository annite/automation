/**
 * Created by ankit.sh on 3/23/2015.
 */
$(document).ready(function(){
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/home/getFishList",
        success:function($data){
            $data=jQuery.parseJSON($data);
            for(var i=0;i<$data.length;i++){
                var opt=document.createElement("option");
                opt.innerHTML=$data[i].FishName;
                $("#fishName").append(opt);
            }
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
    }else {
        $("#total").val(parseInt(document.querySelector("#weight").value)*parseInt(document.querySelector("#rate").value));
        jQuery.ajax({
            type:"POST",
            url:base_url+"index.php/home/updateIncomingStock",
            data:{fishName:$("#fishName").val(),weight:$("#weight").val(),rate:$("#rate").val()},
            success:function($data){
               //console.log($data);
                if($data=="done") {
                    $("#incomingAlert").append('<div class="alert alert-success modalert" role="alert" style="background-color: green;padding:3px;text-align: center"></div>');
                    $(".modalert").text("Stock Updated").show().fadeOut(2000);
                    setTimeout(function(){$(".modalert").remove()},2000);
                    $("#weight").val("");
                    $("#rate").val("");
                    $("#total").val("");
                }else {
                    $("#incomingAlert").append('<div class="alert alert-danger modalert" role="alert" style="background-color: red;padding:3px;text-align: center"></div>');
                    $(".modalert").text("Problem updating stock").show().fadeOut(2000);
                    setTimeout(function(){$(".modalert").remove()},2000);
                }

            }
        });
    }
});
$(".inventoryAddStock").click(function(b){
    if (b.target.className === "form-control") {
        b.target.style.borderColor = "";
    }
});