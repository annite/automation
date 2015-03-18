/**
 * Created by root on 24/9/14.
 */




$(".login-form").submit(function(e){
    e.preventDefault();
    $("#login").attr("disabled","disabled");
    $.ajax({
        url:base_url+"index.php/login/verifyUser",
        type: "POST",
        data:  new FormData(this),
        contentType: false,
        cache: false,
        processData:false,

        success:function($data){
            if($data=="success"){
//                alert("success");
               // $("#modal-alert").css("visibility","visible");
               // $(".modalert").css("visibility","visible");
//                $(".forgot").append('<div class="alert alert-success modalert" role="alert" style="background-color: green;padding:3px"></div>');
//                $(".modalert").text("Successfully logged in").show().fadeOut(2000);
                $("#login").removeAttr("disabled");
                $("#openOTPModal").trigger("click");
                $("#askForOTP").attr("class","modal show");
                $(".modal-backdrop").remove();
                $("body").append("<div class='modal-backdrop fade in'></div>");


//                $("open-modal").text("Logout");
               // $("#modal-alert").css("color","#008A00");
//                setTimeout(function(){ window.location.assign(base_url+"index.php/home");$(".modalert").remove()},2000);
//                $("#login").attr("disabled",true);
//                $("#signup").attr("disabled",true);

            }
            if($data=="failure"){
//                alert("failure");
//                $(".modal-body").prepend('<br><div class="alert alert-danger modalert" role="alert" style="background-color: red;padding:3px"></div>');
//                $(".modalert").text("Invalid Credentials").show().fadeOut(2000);
                $("#login").removeAttr("disabled");
                $(".forgot").append('<div class="alert alert-success modalert" role="alert" style="background-color: red;padding:3px;text-align: center"></div>');
                $(".modalert").text("Invalid Credentials").show().fadeOut(2000);
                setTimeout(function(){$(".modalert").remove()},2000);
            }
        }
    });
});
//
//$(".sign-up-form").submit(function(e){
//    e.preventDefault();
//
//    $.ajax({
//        url:base_url+"index.php/login/registerUser",
//        type: "POST",
//        data:  new FormData(this),
//        contentType: false,
//        cache: false,
//        processData:false,
//
//        success:function($data){
//            if($data=="success"){
//                $(".modal-body").prepend('<br><div class="alert alert-success modalert" role="alert" style="background-color: green;padding:3px"></div>');
//                $(".modalert").text("Registered Successfully").show().fadeOut(2000);
//                $("#open-modal").text("Logout");
//                setTimeout(function(){ window.location.reload();$(".modalert").remove()},2000);
//                $("#login").attr("disabled",true);
//                $("#signup").attr("disabled",true);
//            }
//            if($data=="failure"){
//                $(".modal-body").prepend('<br><div class="alert alert-danger modalert" role="alert" style="background-color: red;padding:3px"></div>');
//                $(".modalert").text("Problem during Registration").show().fadeOut(2000);
//                setTimeout(function(){$(".modalert").remove()},2000);
//            }
//        }
//    });
//});
//
//
$(".forgot-email-form").submit(function(e){
    e.preventDefault();
    $("#sendlink").attr("disabled",true);
    $.ajax({
        url:base_url+"index.php/login/forgotPass",
        type: "POST",
        data:  new FormData(this),
        contentType: false,
        cache: false,
        processData:false,

        success:function($data){
            if($data=="success"){
                $(".modal-body").prepend('<br><div class="alert alert-success modalert" role="alert" style="text-align:center;background-color: green;padding:3px"></div>');
                $(".modalert").text("Password reset link is sent to your registered email id").show().fadeOut(2000);
                setTimeout(function(){  window.location.assign(base_url+"index.php/login");},2000);
                $("#sendlink").attr("disabled",false);
            }
            if($data=="failure"){
                $("#forgot-modal-alert").css("visibility","visible");
                $("#forgot-modal-alert").text("Error sending mail ").show().fadeOut(2000);
                $("#forgot-modal-alert").css("color","#B81B1B");
            }
        }
    });
});
//
//$("#pass").keyup(function(a) {
//    var b = passwordScore($("#pass").val());
//    if (b > 60 && b <= 100) {
//        $(".pass-score").css("color", "green");
//        $(".pass-score").text("strong")
//    } else {
//        if (b > 40 && b <=60) {
//            $(".pass-score").css("color", "blue");
//            $(".pass-score").text("good")
//        } else {
//            if (b > 20 && b <= 40) {
//                $(".pass-score").css("color", "#CCCC00");
//                $(".pass-score").text("weak")
//            } else {
//                $(".pass-score").css("color", "red");
//                $(".pass-score").text("poor")
//            }
//        }
//    }
//});
document.querySelector("#sendlink").addEventListener("click",function(b){
    if (document.querySelector("#emailforgot").value === "") {
        document.querySelector("#emailforgot").style.borderColor = "#B81B1B";
        document.querySelector("#emailforgot").placeholder = "Please enter valid email_id";
        document.querySelector("#emailforgot").focus();
        b.preventDefault();
    }
});
document.querySelector(".login-form").addEventListener("click", function(b) {
    if(b.target.id=="login")
    {
        if (document.querySelector("#email_id").value === "") {
            document.querySelector("#email_id").style.borderColor = "#B81B1B";
            document.querySelector("#email_id").placeholder = "Please enter your email id";
            document.querySelector("#email_id").focus();
            b.preventDefault();
        }
        else if (document.querySelector("#password").value === "") {
            document.querySelector("#password").value = "";
            document.querySelector("#password").style.borderColor = "#B81B1B";
            document.querySelector("#password").placeholder = "Please enter your password";
            document.querySelector("#password").focus();
            b.preventDefault();
        }
    }
    if (b.target.className === "form-control") {
        b.target.style.borderColor = "";
    }
});
//
//document.querySelector("#email").addEventListener("blur", function(a) {
//    if (document.querySelector("#email").value != "") {
//        jQuery.ajax({
//            type: "POST",
//            url: base_url + "index.php/login/checkEmail",
//            data: "email=" + document.querySelector("#email").value,
//            success: function(b) {
//                if (b != "false") {
//                    a.target.style.borderColor = "#B81B1B";
//                    a.target.placeholder = "This email_id is already registered";
//                    a.target.value = "";
//                    a.preventDefault();
//                } else {
//                    a.target.style.borderColor = "#008A00"
//                }
//            }
//        })
//    }
//});
//
//

//document.querySelector("#close-login").addEventListener("click",function(e){
//    $(".login-close").trigger("click");
//    $(".forgot").trigger("click");
//});
//document.querySelector("#open-modal").addEventListener("click",function(e){
//    document.querySelector("#fullname").value="";
//    document.querySelector("#email").value = "";
//    document.querySelector("#pass").value = "";
//    document.querySelector("#confpass").value = "";
//    document.querySelector("#email_id").value = "";
//    document.querySelector("#password").value = "";
//    document.querySelector("#email_id").focus();
//
//});
