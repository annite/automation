
<!--<div class="navbar navbar-default navbar-fixed-top" role="navigation">-->
<!--    <div class="container">-->
<!--        <div class="navbar-header">-->
<!--            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">-->
<!--                <span class="sr-only">Toggle navigation</span>-->
<!--                <span class="icon-bar"></span>-->
<!--                <span class="icon-bar"></span>-->
<!--                <span class="icon-bar"></span>-->
<!--            </button>-->
<!--            <a class="navbar-brand" href="--><?php //echo base_url()?><!--">Shopping</a>-->
<!--        </div>-->
<!--        <div class="navbar-collapse collapse">-->
<!--            <ul class="nav navbar-nav">-->
<!--                <li class="active"><a href="--><?php //echo base_url()?><!--">Home</a></li>-->
<!--            </ul>-->
<!--            <ul class="nav navbar-nav navbar-right">-->
<!--<!--                <li><a href="-->--><?php ////echo base_url()?><!--<!--index.php/cartOpn/showCart">Cart <span id="cartVal" class="badge">-->--><?php ////echo $cartVal?><!--<!--</span></a></li>-->-->
<!--<!--                <li><a href="-->--><?php ////echo $modal ?><!--<!--" data-toggle="modal" id="open-modal">-->--><?php ////echo $login ?><!--<!--</a></li>-->-->
<!--            </ul>-->
<!--        </div><!--/.nav-collapse -->-->
<!--    </div>-->
<!--</div>-->
<!--<div class="container">-->
<!--    <div class="row clearfix"  style="background-color: #8197AB;opacity: 0.96;padding:2%;margin-top: 10%">-->
<!--        <div class="col-md-12 column">-->
<!--            <div class="row clearfix">-->
<!--                <div class="col-md-2 column">-->
<!--                    Type of Fish : <select id="fish_name" class="form-control">-->
<!--                        <option>SILVER POMFRET</option>-->
<!--                        <option>B</option>-->
<!--                        <option>C</option>-->
<!--                        <option>D</option>-->
<!--                        <option>E</option>-->
<!--                        <option>F</option>-->
<!--                    </select>-->
<!--                </div>-->
<!--                <div class="col-md-2 column">-->
<!--                    Quantity : <input type="text" name="quantity" id="quantity" class="form-control"  placeholder="Quantity">-->
<!--<!--                    Quantity : <select id="unit" class="form-control">-->-->
<!--<!--                        <option>KG</option>-->-->
<!--<!--                        <option>GM</option>-->-->
<!--<!--                        <option>PCs</option>-->-->
<!--<!--                    </select>-->-->
<!--                </div>-->
<!--                <div class="col-md-2 column">-->
<!--                    Weight : <input type="text" name="weight" id="weight" class="form-control" placeholder="Weight in KG Only">-->
<!--                </div>-->
<!--                <div class="col-md-2 column">-->
<!--                    Rate : <input type="text" name="rate" id="rate" class="form-control" placeholder="Rate per KG">-->
<!--                </div>-->
<!--                <div class="col-md-2 column">-->
<!--                    Total Amount : <input type="text" name="total" id="total" class="form-control">-->
<!--                </div>-->
<!--                <div class="col-md-2 column">-->
<!--                    <button id="addToStock" class="btn btn-primary" style="width:100%;margin-top: 13%">Update Stock</button>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->
<div class="container">
    <div class="row clearfix"  style="background-color: #8197AB;opacity: 0.96;padding:2%;margin-top: 10%">
        <div class="col-md-12 column inventoryAddStock">
            <div class="row clearfix inventoryInput">
                <div class="col-md-3 column"></div>
                <div class="col-md-6 column">
                    <div class="input-group">
                        <span class="input-group-addon" id="fishNameAddon">Type of Fish : </span>
                        <select id="fishName" class="form-control" aria-describedby="fishNameAddon">

                        </select>
                    </div>
                </div>
                <div class="col-md-3 column">
                    <button id="addNewFish" class="btn btn-primary">Add New Fish</button>
                </div>
            </div>
            <div class="row clearfix inventoryInput">
                <div class="col-md-3 column"></div>
                <div class="col-md-6 column">
                    <div class="input-group">
                        <span class="input-group-addon" id="quantityAddon">No of piece : </span>
                            <input type="text" name="quantity" id="quantity" class="form-control"  placeholder="No of piece" aria-describedby="quantityAddon">
                    <!--                    Quantity : <select id="unit" class="form-control">-->
                    <!--                        <option>KG</option>-->
                    <!--                        <option>GM</option>-->
                    <!--                        <option>PCs</option>-->
                    <!--                    </select>-->
                    </div>
                </div>
                <div class="col-md-3 column"></div>
            </div>
            <div class="row clearfix inventoryInput">
                <div class="col-md-3 column"></div>
                <div class="col-md-6 column">
                    <div class="input-group">
                        <span class="input-group-addon">Size of Fish : </span>
                        <select id="fishSizes" class="form-control">

                        </select>
                    </div>
                </div>
                <div class="col-md-3 column">
                </div>
            </div>
            <div class="row clearfix inventoryInput">
                <div class="col-md-3 column"></div>
                <div class="col-md-6 column">
                    <div class="input-group">
                        <span class="input-group-addon" id="weightAddon">Weight : </span>
                            <input type="text" name="weight" id="weight" class="form-control" placeholder="Weight in KG Only">
                        <span class="input-group-addon" id="weightAddon">KG</span>
                    </div>
                </div>
                <div class="col-md-3 column"></div>
            </div>
            <div class="row clearfix inventoryInput">
                <div class="col-md-3 column"></div>
                <div class="col-md-6 column">
                    <div class="input-group">
                        <span class="input-group-addon" id="rateAddon">Rate : </span>
                            <input type="text" name="rate" id="rate" class="form-control" placeholder="Rate per KG">
                        <span class="input-group-addon" id="rateAddon">/KG</span>
                    </div>
                </div>
                <div class="col-md-3 column"></div>
            </div>
            <div class="row clearfix inventoryInput">
                <div class="col-md-3 column"></div>
                <div class="col-md-6 column">
                    <div class="input-group">
                        <span class="input-group-addon" id="totalAddon" >Total Amount : </span>
                            <input type="text" name="total" id="total" class="form-control" disabled="true">
                    </div>
                </div>
                <div class="col-md-3 column"></div>
            </div>
            <div class="row clearfix inventoryInput">
                <div class="col-md-3 column"></div>
                <div class="col-md-6 column">
                    <button id="updateStock" class="btn btn-primary" style="width:100%">Update Stock</button>
                </div>
                <div class="col-md-3 column"></div>
            </div>
            <div class="row clearfix inventoryInput">
                <div class="col-md-3 column"></div>
                <div class="col-md-6 column" id="incomingAlert">

                </div>
                <div class="col-md-3 column"></div>
            </div>
        </div>
    </div>
</div>
<div class="footer">
    <div class="" style="background-color: #2c3e50;padding-top:2%;padding-bottom: 1%">
        <div class="row">
            <div class="col-lg-1"></div>
            <div class="col-lg-10" style="color: #ffffff;padding-left: 2%">
                Copyright<span class="glyphicon glyphicon-copyright-mark"></span> 2014 <a target="_blank" href="<?php echo base_url()?>" title="Online shopping">Marine Plaza</a>. All Rights Reserved.

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
<script src="<?php echo base_url()?>js/incoming.js"></script>
<script src="<?php echo base_url()?>Theme/js/bootstrap.js"></script>
<!--<script src="--><?php //echo base_url()?><!--/js/header.js"></script>-->
