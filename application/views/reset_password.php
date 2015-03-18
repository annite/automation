<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 4/8/14
 * login page
 * Time: 3:45 PM
 */


?>


<html>
<body>
<title> </title>
<link href="<?php echo base_url()?>Theme/css/bootstrap.css" rel="stylesheet" >
<!--<link rel="stylesheet" href="<?php echo base_url()?>css/bootstrap-theme.css" type="text/css">-->
<link rel="stylesheet" href="<?php echo base_url()?>css/custom_style.css" type="text/css">
<link rel="stylesheet" href="<?php echo base_url()?>Theme/css/freelancer.css" type="text/css">
<!--start of the main container of reset password form-->
<div class="container">
    <div id="log">
        <form class="reset-password-form"> <!--link to login controller/resetpassword module  of the mini twitter-->
        <h2 class="form-signin-heading">Reset Password</h2>
        <div id="error" style="color:red;font-size: 20px;"></div><br>
        <input type="text" style="visibility: hidden" value="<?php echo $pass?>" id="oldpass" name="oldpass"/><br>
        <input type="text" style="visibility: hidden" value="<?php echo $email?>" id="useremail" name="useremail"/><br>
        New Password : <span class="pass-score"></span> <input type="password" id="pass" name="pass" class="form-control" placeholder="Password"/><br>
        Confirm New Password : <input type="password" id="confpass" name="confpass" class="form-control" placeholder="Retype Password"/><br>
        <button class="btn btn-primary" id="reset" type="submit">Reset Password</button>
        </form>
    </div>
</div>
<!--end of main container-->
</body>
<head>

    <script type="text/javascript">
        var base_url="<?php echo base_url()?>";
    </script>
    <script src="<?php echo base_url()?>js/jquery.min.js"></script>
    <script src="<?php echo base_url()?>js/bootstrap.min.js"></script>
    <script type="text/javascript" src="<?php echo base_url()?>js/password-score.js"></script>
    <script type="text/javascript">
        $("#pass").keyup(function(a) {
            var b = passwordScore($("#pass").val());
            console.log(b);
            if (b > 60 && b <= 100) {
                $(".pass-score").css("color", "green");
                $(".pass-score").text("strong")
            } else {
                if (b > 40 && b <= 60) {
                    $(".pass-score").css("color", "blue");
                    $(".pass-score").text("good")
                } else {
                    if (b > 20 && b <= 40) {
                        $(".pass-score").css("color", "purple");
                        $(".pass-score").text("weak")
                    } else {
                        $(".pass-score").css("color", "red");
                        $(".pass-score").text("poor")
                    }
                }
            }
        });
        document.querySelector("#reset").addEventListener('click',function(e) //validation of the reset password for for empty fields
        {
            if(document.querySelector("#pass").value==="" || passwordScore($("#pass").val()) < 20)
            {
                document.querySelector("#pass").style.borderColor="red";
                document.querySelector("#pass").value="";
                document.querySelector("#pass").placeholder="Please enter better password";
                document.querySelector("#pass").focus();

                e.preventDefault();
            }
            else if(document.querySelector("#confpass").value==="")
            {
                document.querySelector("#confpass").style.borderColor="red";
                document.querySelector("#confpass").placeholder="Please retype the password";
                document.querySelector("#confpass").focus();
                e.preventDefault();
            }
            else if(document.querySelector("#pass").value != document.querySelector("#confpass").value)
            {
                document.querySelector("#error").innerHTML="Password not matching...";
                document.querySelector("#pass").value="";
                document.querySelector("#confpass").value="";
                document.querySelector("#pass").focus();
                e.preventDefault();
            }
        });
        document.querySelector("#log").addEventListener("click",function(e) //resets the signUp page fields
        {
            if(e.target.className==="form-control")
                e.target.style.borderColor="";
        });

        $(".reset-password-form").submit(function(e){
            e.preventDefault();

            $.ajax({
                url:base_url+"index.php/login/resetPass",
                type: "POST",
                data:  new FormData(this),
                contentType: false,
                cache: false,
                processData:false,

                success:function($data){
                    console.log($data);
                    if($data=="success"){
                        $("#error").css("visibility","visible");
                        $("#error").text("Password changed successfully").show().fadeOut(2000);
                        $("#error").css("color","green");
                        setTimeout(function(){  window.location.assign(base_url+"index.php/home");},2000);

                    }
                    if($data=="failure"){
                        $("#error").css("visibility","visible");
                        $("#error").text("Error changing password").show().fadeOut(2000);
                        $("#error").css("color","red");
                    }
                }
            });
        });
    </script>



</head>
</html>


