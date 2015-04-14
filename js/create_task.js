/**
 * Created by root on 8/10/14.
 */
var data;

$(document).ready(function(e){
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/home/getEmployeesList",
        success:function($data) {
            $data=jQuery.parseJSON($data);
            for(var i=0;i<$data.length;i++) {
                $("#assignedTo").append('<option>'+ $data[i].user_email +'</option>')
            }
        }
    });
});
$('#message').keyup(function(e) {
    e.target.style.borderColor = "";
    if(parseInt($("#message").val().length >= 1000))
        $("#charCount").html(0);
    else if(e.keyCode==8 && parseInt($("#charCount").html())<1000)
        $("#charCount").html(1000-parseInt($("#message").val().length));
    else if(parseInt($("#charCount").html())>0 && parseInt($("#charCount").html())<=1000 && $("#message").val()!="")
        $("#charCount").html(1000-parseInt($("#message").val().length));
    var $textarea = $(this);
    var max = 1000;
    if ($textarea.val().length > max) {
        $("#charCount").html(0);
        var top = $textarea.scrollTop();
        $textarea.val($textarea.val().substr(0, max));
        $textarea.scrollTop(top);

    }
});
$("#assignTask").click(function(b) {
    if (document.querySelector("#message").value === "") {
        document.querySelector("#message").style.borderColor = "#B81B1B";
        document.querySelector("#message").placeholder = "Please Enter Message for Task";
        document.querySelector("#message").focus();
        b.preventDefault();
    }else {
        var priority=$("#priority").val();
        var assignedTo=$("#assignedTo").val();
        var message=$("#message").val();
        jQuery.ajax({
            type:"POST",
            url:base_url+"index.php/home/assignTask",
            data:{priority:priority,assignedTo:assignedTo,message:message},
            success:function($data) {
               if($data=="done") {
                   $(".workAlert").append('<div class="alert alert-success modalert" role="alert" style="background-color: green;padding:3px;text-align: center"></div>');
                   $(".modalert").text("Task Created and Assigned").show().fadeOut(2000);
                   setTimeout(function(){$(".modalert").remove()},2000);
                   $("#message").val("");
                   $("#charCount").html("1000");
               }else{
                   $("#assignTask").append('<div class="alert alert-danger modalert" role="alert" style="background-color: red;padding:3px;text-align: center"></div>');
                   $(".modalert").text("Error Creating Task").show().fadeOut(2000);
                   setTimeout(function(){$(".modalert").remove()},2000);
               }
            }
        });
    }
});
