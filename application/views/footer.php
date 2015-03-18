<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 23/9/14
 * Time: 10:11 AM
 */ ?>
</div>
</div>
</div>

<div class="modal fade" id="login-modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close login-close" data-dismiss="modal" aria-hidden="true">X</button>
                <h4 class="modal-title" id="myModalLabel">
                    Login or Register
                </h4>
            </div>
            <div class="modal-body" style="background-color: #fff">
                <div class="row clearfix">
                    <div class="col-lg-5 column"">
                        <form class="login-form">
                        <h2 class="form-signin-heading">Sign in Here</h2>

                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                            <input type="email" class="form-control" id="email_id" placeholder="Email_id" name="email_id" value="<?php echo set_value('user'); ?>">
                        </div><br>
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-star"></i></span>
                            <input type="password" class="form-control" id="password" placeholder="Password" name="password">
                        </div><br>
                        <button id="login" class="btn btn-primary" style="width: 100%" type="submit">Sign in</button>
                        <a role="button" id="close-login">Forgot Password???</a>
                        <a href="#forgotModal" role="button" class="forgot" data-toggle="modal"></a> <br> <!-- provides link to forgot password modal to recover and reset password-->
                        <?php echo form_close();?>
                    </div>

                    <div class="col-lg-1 column">

                    </div>



                    <div class="col-lg-6 column">
                        <h2 class="form-signin-heading">New? Sign Up Now</h2>
                        <form class="sign-up-form">
                            <input type="text" id="fullname" name="fullname" class="form-control" placeholder="Full Name"/><br>
                            <input type="email" id="email" name="email_id" class="form-control" placeholder="Email id"/><br>
                            <span class="pass-score"></span><input type="password" id="pass" name="password" class="form-control" placeholder="Password"/><br>
                            <input type="password" id="confpass" name="confpass" class="form-control" placeholder="Retype Password"/><br>
                            <button id="signup" class="btn btn-primary" style="width: 100%" type="submit">Sign up</button>
                        </form>

                    </div>
                </div>
            </div>

        </div>

    </div>

</div>
<div id="forgotModal" class="modal fade" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
                <h4 class="modal-title">Forgot Password???</h4>
                <center><div id="forgot-modal-alert" class="" role="alert"></div></center>
            </div>
            <div class="modal-body">
                <form class="forgot-email-form">
                    Email : <input type="email" id="emailforgot" name="emailforgot" class="form-control" placeholder="Enter your registered email id"/><br>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                <input type="submit" id="sendlink" class="btn btn-primary" value="Send Password"/>
                </form>
            </div>
        </div>
    </div>
</div>



<div class="footer">
    <div class="" style="background-color: #2c3e50;padding-top:2%;padding-bottom: 1%">
        <div class="row">
            <div class="col-lg-1"></div>
            <div class="col-lg-10" style="color: #ffffff;padding-left: 2%">
               Copyright<span class="glyphicon glyphicon-copyright-mark"></span> 2014 <a target="_blank" href="<?php echo base_url()?>" title="Online shopping">Shopping</a>. All Rights Reserved.

                <ul class="pull-right" style="list-style: none">
                    <li style="float: left;display: inline-block;margin-left: 15px"><a href="<?php echo base_url()?>">Home</a></li>
                    <li style="float: left;display: inline-block;margin-left: 15px"><a href="#">About Us</a></li>
                    <li style="float: left;display: inline-block;margin-left: 15px"><a href="#">Faq</a></li>
                    <li style="float: left;display: inline-block;margin-left: 15px"><a >Contact Us</a></li>
                    <li style="float: left;display: inline-block;margin-left: 15px"><a id="gototop" class="gototop" href="#"><i class="icon-chevron-up"></i></a></li><!--#gototop-->
                </ul>
            </div>
            <div class="col-lg-1"></div>
        </div><!--end footer row-->
    </div><!--end footer container-->

</div>

<script type="text/javascript">
    var base_url="<?php echo base_url()?>";
    <?php if (isset($page) && $page=="product_search"){ ?>
        var category="<?php echo $category ?>";
        var keyword="<?php echo $keyword ?>";
        var brand="<?php echo $brand ?>";
    <?php } ?>

    <?php if (isset($page) && $page=="product_detail"){ ?>
    var product_id="<?php echo $product_id ?>";
    <?php } ?>

</script>

<script src="<?php echo base_url()?>js/jquery.min.js"></script>
<script src="<?php echo base_url()?>js/bootstrap.js"></script>
<script type="text/javascript" src="<?php echo base_url()?>js/<?php echo $page?>.js"></script>
<script type="text/javascript" src="<?php echo base_url()?>js/login.js"></script>
<script type="text/javascript" src="<?php echo base_url()?>js/password-score.js"></script>
