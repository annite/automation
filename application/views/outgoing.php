
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
<!--<style type="text/css">-->
<!--    .bootstrap-switch-id-cashPayment,.bootstrap-switch-id-creditPayment {-->
<!--        margin-right: 7%;-->
<!--    }-->
<!--</style>-->
<div class="container">
    <div class="row clearfix"  style="background-color: #8197AB;opacity: 0.96;padding:2%;margin-top: 10%">
        <div class="col-md-12 column" id="inventoryUpdateStock">
            <div class="row clearfix inventoryInput">
                <div class="col-md-3 column"></div>
                <div class="col-md-6 column">
                    <div class="input-group">
                        <span class="input-group-addon" id="fishNameAddon">Type of Fish : </span>
                        <!--                        <input type="text" class="form-control" placeholder="Recipient's username" aria-describedby="basic-addon2">-->
                        <select id="fishName" class="form-control" aria-describedby="fishNameAddon">

                        </select>
                    </div>
                </div>
                <div class="col-md-3 column"></div>
            </div>
<!--            <div class="row clearfix inventoryInput">-->
<!--                <div class="col-md-3 column"></div>-->
<!--                <div class="col-md-6 column">-->
<!--                    <div class="input-group">-->
<!--                        <span class="input-group-addon" id="quantityAddon">No of piece : </span>-->
<!--                        <input type="text" name="quantity" id="quantity" class="form-control"  placeholder="No of piece" aria-describedby="quantityAddon">-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="col-md-3 column"></div>-->
<!--            </div>-->
            <div class="row clearfix inventoryInput">
                <div class="col-md-3 column"></div>
                <div class="col-md-6 column">
                    <div class="input-group">
                        <span class="input-group-addon" id="availableAddon">Available Stock : </span>
                        <input type="text" name="available" id="available" class="form-control" disabled="disabled">
                        <span class="input-group-addon" id="availableAddon">KG</span>
                    </div>
                </div>
                <div class="col-md-3 column"></div>
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
                        <span class="input-group-addon" id="totalAddon">Total Amount : </span>
                        <input type="text" name="total" id="total" class="form-control" disabled="true" style="width: 65%">
                        <select class="input-group-addon" id="currency" style="width: 35%;height:43px">
                            <option>RS (&#x20B9;)</option>
                            <option>USD (&#36;)</option>
                            <option>JPY (&#165;)</option>
                            <option>GBP (&#163;)</option>
                            <option>AUD (&#36;)</option>
                            <option>CHF (Fr)</option>
                            <option>CAD (&#36;)</option>
                            <option>MXN (&#36;)</option>

                        </select>
                    </div>
                </div>
                <div class="col-md-3 column"></div>
            </div>
            <div class="row clearfix inventoryInput">
                <div class="col-md-3 column"></div>
                <div class="col-md-6 column">
                    <!--                    <div class="input-group">-->
                    <!--                        <span class="input-group-addon" id="totalAddon">Total Amount : </span>-->
                    <!--                        <input type="text" name="total" id="total" class="form-control">-->
                    <!--                    </div>-->
                    <div class="input-group">
                        <span class="input-group-addon" style="margin-right: 16%">Mode of Payment : </span>
                    </div>
                    <!--                    <input type="radio" name="radio1" checked class="switch-radio1">-->
                    <!--                    <input type="radio" name="radio1" class="switch-radio1">-->

                    <!--                    <div class="input-group">-->
                    <!--                        <span class="input-group-addon" id="totalAddon">Cash : </span>-->
                    <!--                        <input type="radio" value="Cash" id="cashPayment" name="modeOfPayment">-->
                    <!--                    </div>-->
                    <!--                    Credit : <input type="radio" value="Credit" id="creditPayment" name="modeOfPayment">-->
                </div>
                <div class="col-md-3 column"></div>
            </div>
            <div class="row clearfix inventoryInput">
                <div class="col-md-3 column"></div>
                <div class="col-md-6 column">
<!--                    <div class="input-group">-->
<!--                        <span class="input-group-addon" id="totalAddon">Total Amount : </span>-->
<!--                        <input type="text" name="total" id="total" class="form-control">-->
<!--                    </div>-->
                        <div class="col-md-4 column">Cash : <input type="radio" name="modeOfPayment" id="cashPayment" data-on-text="Yes" data-off-text="No" checked data-on-color="success"></div>
                        <div class="col-md-4 column">Credit : <input type="radio" name="modeOfPayment" id="creditPayment" data-on-text="Yes" data-off-text="No" data-on-color="success"></div>
                        <div class="col-md-4 column">Ca+Cre : <input type="radio" name="modeOfPayment" id="cashCreditPayment" data-on-text="Yes" data-off-text="No" data-on-color="success"></div>
<!--                    <input type="radio" name="radio1" checked class="switch-radio1">-->
<!--                    <input type="radio" name="radio1" class="switch-radio1">-->

<!--                    <div class="input-group">-->
<!--                        <span class="input-group-addon" id="totalAddon">Cash : </span>-->
<!--                        <input type="radio" value="Cash" id="cashPayment" name="modeOfPayment">-->
<!--                    </div>-->
<!--                    Credit : <input type="radio" value="Credit" id="creditPayment" name="modeOfPayment">-->
                </div>
                <div class="col-md-3 column"></div>
            </div>
            <div class="row clearfix inventoryInput" id="cashPaidRow" style="display: none">
                <div class="col-md-3 column"></div>
                <div class="col-md-6 column">
                    <div class="input-group">
                        <span class="input-group-addon" id="rateAddon">Cash Paid : </span>
                        <input type="text" name="cashPaid" id="cashPaid" class="form-control" placeholder="Cash Paid" value="0">
                    </div>
                </div>
                <div class="col-md-3 column"></div>
            </div>
            <div class="row clearfix inventoryInput">
                <div class="col-md-3 column"></div>
                <div class="col-md-6 column">
                    <div class="input-group">
                        <span class="input-group-addon" id="customerNameAddon">Customer Name : </span>
                        <!--                        <input type="text" class="form-control" placeholder="Recipient's username" aria-describedby="basic-addon2">-->
                        <select id="customerName" class="form-control" aria-describedby="customerNameAddon">
                            <option>Nikunj Patel</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                            <option>E</option>
                            <option>F</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3 column"></div>
            </div>
            <div class="row clearfix inventoryInput">
                <div class="col-md-3 column"></div>
                <div class="col-md-6 column">
                    <div class="input-group">
                        <span class="input-group-addon" id="customerCityAddon">Customer City : </span>
                        <!--                        <input type="text" class="form-control" placeholder="Recipient's username" aria-describedby="basic-addon2">-->
                        <select id="customerCity" class="form-control" aria-describedby="customerCityAddon">
                            <option>India</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                            <option>E</option>
                            <option>F</option>
                        </select>
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
                <div class="col-md-6 column" id="outgoingAlert">

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
<script src="<?php echo base_url()?>js/bootstrap.js"></script>
<script src="<?php echo base_url()?>js/bootstrap-switch.js"></script>
<script src="<?php echo base_url()?>js/highlight.js"></script>
<script src="<?php echo base_url()?>js/main.js"></script>
<script src="<?php echo base_url()?>js/outgoing.js"></script>
<!--<script src="--><?php //echo base_url()?><!--/js/header.js"></script>-->
