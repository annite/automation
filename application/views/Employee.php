<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 13/3/15
 * Time: 12:06 PM
 */
?><!DOCTYPE html>

<html>
<style type="text/css">
    li>a
    {
        color: #ffffff;
    }
</style>
<head>

    <title> </title>
    <link href="<?php echo base_url()?>Theme/css/bootstrap.css" rel="stylesheet" >
    <link rel="stylesheet" href="<?php echo base_url()?>css/custom_style.css" type="text/css">
    <link rel="stylesheet" href="<?php echo base_url()?>css/sticky-footer.css" type="text/css">
    <link rel="stylesheet" href="<?php echo base_url()?>Theme/css/freelancer.css" type="text/css">
    <link rel="stylesheet" href="<?php echo base_url()?>Theme/font-awesome-4.1.0/css/font-awesome.css" type="text/css">
<!--    <style type="text/css">-->
<!--        .modal-backdrop {-->
<!--            background-color: gray;-->
<!--        }-->
<!--    </style>-->
</head>


<body style="background-image: url('<?php echo base_url()?>/pics/fishes.jpg')">
<div class="container">
    <div class="row clearfix"  style="background-color: #8197AB;opacity: 0.96">
        <div class="col-md-12 column">
            <div class="row clearfix">
                <div class="col-md-2 column">
                    Distributor : <input type="text" name="coming_from" id="coming_from">
                </div>
                <div class="col-md-2 column">
                    Type of Fish : <select id="fish_name">
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                            <option>E</option>
                            <option>F</option>
                        </select>
                </div>
                <div class="col-md-2 column">
                    Unit : <select id="unit">
                        <option>KG</option>
                        <option>GM</option>
                        <option>PCs</option>
                    </select>
                </div>
                <div class="col-md-2 column">
                    Weight : <input type="text" name="weight" id="weight">
                </div>
                <div class="col-md-2 column">
                    Rate : <input type="text" name="rate" id="rate">
                </div>
                <div class="col-md-2 column">
                    Total Amount : <input type="text" name="total" id="total">
                </div>
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
</body>
<script type="text/javascript">
    var base_url="<?php echo base_url()?>";
</script>
<script src="<?php echo base_url()?>js/jquery.min.js"></script>
<script src="<?php echo base_url()?>js/bootstrap.js"></script>
<script type="text/javascript" src="<?php echo base_url()?>js/login.js"></script>
<script type="text/javascript" src="<?php echo base_url()?>js/password-score.js"></script>
