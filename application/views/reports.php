<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 8/10/14
 * Time: 12:33 PM
 */?>
<div class="container">
    <div class="row clearfix"  style="background-color: #8197AB;opacity: 0.96;padding:2%;margin-top: 10%">
        <div class="col-md-12 column">
            <div class="tabbable" id="tabs-760433">
                <ul class="nav nav-tabs">
                    <li class="active">
                        <a href="#purchase" data-toggle="tab">Purchase</a>
                    </li>
                    <li>
                        <a href="#sales" data-toggle="tab">Sale</a>
                    </li>
                    <li>
                        <a href="#stock" data-toggle="tab">Stock</a>
                    </li>
                    <li>
                        <a href="#profit" data-toggle="tab">Profit</a>
                    </li>
                    <li>
                        <a href="#credit" data-toggle="tab">Credit</a>
                    </li>
                    <li>
                        <a href="#cash" data-toggle="tab">Cash</a>
                    </li>
                </ul>
                <div class="tab-content" style="border-left:1px solid #ffffff;border-right:1px solid #ffffff;border-bottom:1px solid #ffffff;padding: 2%">
                    <div class="tab-pane active" id="purchase">
                        <div class="row clearfix">
                            <div class="col-md-12 column">
                                <div class="row clearfix">
                                    <div class="col-md-4 column">
                                        <div class="input-group">
                                            <span class="input-group-addon" id="date-range">Date Range</span>
                                            <input name="timerange" id="purchase-report-dates" class="form-control"
                                                   placeholder="Select date range"/>
                                        </div>
                                    </div>
                                    <div class="col-md-2 column">
                                        <button id="getPurchaseReport" class="btn btn-primary" style="width:100%">Generate Report</button>
                                    </div>
                                    <div class="col-md-2 column"></div>
                                    <div class="col-md-4 column"></div>
                                </div>
                                <div class="row clearfix">
                                    <div class="col-md-12 column" id="purchaseTableRow">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="sales">
                        <div class="row clearfix">
                            <div class="col-md-12 column">
                                <div class="row clearfix">
                                    <div class="col-md-4 column">
                                        <div class="input-group">
                                            <span class="input-group-addon" id="date-range">Date Range</span>
                                            <input name="timerange" id="sales-report-dates" class="form-control"
                                                   placeholder="Select date range"/>
                                        </div>
                                    </div>
                                    <div class="col-md-2 column">
                                        <button id="getSalesReport" class="btn btn-primary" style="width:100%">Generate Report</button>
                                    </div>
                                    <div class="col-md-2 column"></div>
                                    <div class="col-md-4 column"></div>
                                </div>
                                <div class="row clearfix">
                                    <div class="col-md-12 column" id="salesTableRow">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="stock">
                        <div class="row clearfix">
                            <div class="col-md-12 column" id="stockTableRow">

                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="profit">
                        <div class="row clearfix">
                            <div class="col-md-12 column">
                                <div class="row clearfix">
                                    <div class="col-md-4 column">
                                        <div class="input-group">
                                            <span class="input-group-addon" id="date-range">Date Range</span>
                                            <input name="timerange" id="profit-report-dates" class="form-control"
                                                   placeholder="Select date range"/>
                                        </div>
                                    </div>
                                    <div class="col-md-2 column">
                                        <button id="getProfitReport" class="btn btn-primary" style="width:100%">Generate Report</button>
                                    </div>
                                    <div class="col-md-2 column"></div>
                                    <div class="col-md-4 column"></div>
                                </div>
                                <div class="row clearfix">
                                    <div class="col-md-12 column" id="profitTableRow">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="credit">
<!--                        <div class="row clearfix">-->
<!--                            <div class="col-md-12 column">-->
<!--                                <div class="row clearfix">-->
<!--                                    <div class="col-md-4 column">-->
<!--                                        <div class="input-group">-->
<!--                                            <span class="input-group-addon" id="date-range">Date Range</span>-->
<!--                                            <input name="timerange" id="credit-report-dates" class="form-control"-->
<!--                                                   placeholder="Select date range"/>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                    <div class="col-md-2 column">-->
<!--                                        <button id="getCreditReport" class="btn btn-primary" style="width:100%">Generate Report</button>-->
<!--                                    </div>-->
<!--                                    <div class="col-md-2 column"></div>-->
<!--                                    <div class="col-md-4 column"></div>-->
<!--                                </div>-->
                                <div class="row clearfix">
                                    <div class="col-md-12 column" id="creditTableRow">
                                    </div>
                                </div>
<!--                            </div>-->
<!--                        </div>-->
                    </div>
                    <div class="tab-pane" id="cash">
                        <div class="row clearfix">
                            <div class="col-md-12 column" id="cashTableRow">

                            </div>
                        </div>
                    </div>

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
<script src="<?php echo base_url()?>js/reports.js"></script>
<script src="<?php echo base_url()?>js/moment.js"></script>
<script src="<?php echo base_url()?>js/daterangepicker.js"></script>
<script src="<?php echo base_url()?>js/jquery.dataTables.js"></script>
<script src="<?php echo base_url()?>js/jquery-ui.js"></script>
<!--<script src="--><?php //echo base_url()?><!--/js/header.js"></script>-->



