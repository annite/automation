<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 26/9/14
 * Time: 12:11 PM
 */ ?>

<div class="navbar navbar-default navbar-fixed-top" role="navigation">
    <center><span id="navbar-alert" role="alert" style="text-transform: none"></span></center>
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="<?php echo base_url()?>">Shopping</a>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li id="home-nav" class="active"><a href="<?php echo base_url()?>">Home</a></li>
            </ul>

            <ul class="nav navbar-nav navbar-right">
                <li id="cart-nav" class=""><a href="<?php echo base_url()?>index.php/cartOpn/showCart"><i class="fa fa-shopping-cart" style="position: relative;font-size: 36px"></i><span style="position: absolute;left: 51%;top: 15%;background-color: #18bc9c;" id="cartVal" class="badge"><?php echo $cartVal?></span></a></li>
                <li id="login-nav" class=""><?php echo $login ?></li>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</div>

<div class="container home-container">
    <div class="row clearfix">
        <div class="col-md-12 column">
            <div class="row clearfix">
                <div class="col-md-12 column" id="searchBar">
                    <div class="input-group">
                        <div class="input-group-btn">
                            <select type="button" class="btn btn-default dropdown-toggle category" data-toggle="dropdown"> <span class="caret"></span>
                                <option value="All" class="All">All</option>
                                <option value="Beauty" class="Beauty" >Beauty</option>
                                <option value="Baby" class="Baby" >Baby</option>
                                <option value="Books" class="Books" >Books</option>
                                <option value="DVD" class="DVD">DVD</option>
                                <option value="Electronics" class="Electronics">Electronics</option>
                                <option value="HealthPersonalCare" class="HealthPersonalCare">Health and PersonalCare</option>
                                <option value="HomeGarden" class="HomeGarden">Home & kitchen</option>
                                <option value="Jewelry" class="Jewelry" >Jewelry</option>
                                <option value="Luggage" class="Luggage">Luggage</option>
                                <option value="PCHardware" class="PCHardware">Computer and Accessories</option>
                                <option value="SportingGoods" class="SportingGoods">Sporting Goods</option>
                                <option value="Toys" class="Toys">Toys</option>
                                <option value="VideoGames" class="VideoGames">Video Games</option>
                                <option value="Watches" class="Watches">Watches</option>
                            </select>
                        </div><!-- /btn-group -->
                        <input type="text" class="form-control search-keyword">
                         <span class="input-group-btn">
                            <a class="btn btn-default search" type="button"><span class="glyphicon glyphicon-search"></span></a>
                         </span>
                    </div><!-- /input-group -->
                    <br/>
