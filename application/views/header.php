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
    <link rel="stylesheet" href="<?php echo base_url()?>css/bootstrap-switch.css" type="text/css">
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

<div class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="<?php echo base_url()?>">Marine Plaza</a>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <?php if($user_type=='Employee') {?>
                    <li id="incomingTab" class="<? if($active=='incoming') echo 'active'?>"><a href="<?php echo base_url()?>index.php/home/incoming">Incoming</a></li>
                    <li id="outgoingTab" class="<? if($active=='outgoing') echo 'active'?>"><a href="<?php echo base_url()?>index.php/home/outgoing">Outgoing</a></li>
                    <li id="myworkTab" class="<? if($active=='myWork') echo 'active'?>"><a href="<?php echo base_url()?>index.php/home/myWork">My Work</a></li>
                <?php } else {?>
                    <li id="reportsTab" class="<? if($active=='reports') echo 'active'?>"><a href="<?php echo base_url()?>index.php/home/reports">Reports</a></li>
                    <li id="creditTab" class="<? if($active=='credit') echo 'active'?>"><a href="<?php echo base_url()?>index.php/home/credit">Credit</a></li>
                    <li id="createTaskTab" class="<? if($active=='create_task') echo 'active'?>"><a href="<?php echo base_url()?>index.php/home/createTask">Create Task</a></li>
                <?php } ?>
            </ul>
            <ul class="nav navbar-nav navbar-right">
<!--                <li><a href="--><?php //echo base_url()?><!--index.php/cartOpn/showCart">Cart <span id="cartVal" class="badge">--><?php //echo $cartVal?><!--</span></a></li>-->
                <li><a href="<?php echo base_url() ?>index.php/home/logOut">Logout</a></li>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</div>


<!--<div class="container home-container">-->
<!--    <div class="row clearfix">-->
<!--        <div class="col-md-1 column">-->
<!--        </div>-->
<!---->
<!--        <div class="col-md-10 column">-->
<!--            <div class="row clearfix">-->
<!--                <div class="col-md-12 column">-->
<!--                    <div class="input-group">-->
<!--                        <div class="input-group-btn">-->
<!--                            <select type="button" class="btn btn-default dropdown-toggle category" data-toggle="dropdown"> <span class="caret"></span>-->
<!---->
<!--                                <option value="All">All</option>-->
<!--                                <option value="976389031">Books</option>-->
<!--                                <option value="976416031">DVD</option>-->
<!--                                <option value="976419031">Electronics</option>-->
<!--                                <option value="976442031">Home & Kitchen	</option>-->
<!--                                <option value="1951048031">Jewelry</option>-->
<!--                                <option value="976392031">PCHardware</option>-->
<!--                                <option value="1350380031">Toys</option>-->
<!--                                <option value="1350387031">Watches</option>-->
<!--                            </select>-->
<!--                        </div><!-- /btn-group -->-->
<!--                        <input type="text" class="form-control">-->
<!--                         <span class="input-group-btn">-->
<!--                            <a class="btn btn-default" type="button" href="--><?php //echo base_url()?><!--index.php/home/searchResult">Search</a>-->
<!--                         </span>-->
<!--                    </div><!-- /input-group -->-->
<!--                    <br/>-->
<!---->
<!--                </div>-->
<!--            </div>-->
<!--            <br/>-->
<!--            <br/>-->
<!--            <br/>-->