<div class="container">
    <div class="row clearfix"  style="background-color: #8197AB;opacity: 0.96;padding:2%;margin-top: 10%">
        <div class="col-md-12 column">
            <div class="row clearfix inventoryInput">
                <div class="col-md-3 column"></div>
                <div class="col-md-6 column">
                    <div class="input-group">
                        <span class="input-group-addon">Task Priority : </span>
                        <select id="priority" class="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3 column"></div>
            </div>
            <div class="row clearfix inventoryInput">
                <div class="col-md-3 column"></div>
                <div class="col-md-6 column">
                    <div class="input-group">
                        <span class="input-group-addon">Task Assigned To : </span>
                        <select id="assignedTo" class="form-control">

                        </select>
                    </div>
                </div>
                <div class="col-md-3 column"></div>
            </div>
            <div class="row clearfix inventoryInput">
                <div class="col-md-3 column"></div>
                <div class="col-md-6 column">
                    <div class="input-group">
                        <span class="input-group-addon"><span class="pull-left">Message Description : <span class="glyphicon glyphicon-arrow-down"></span></span><span class="badge pull-right" id="charCount">1000</span><span class="pull-right">Characters left : &nbsp;</span> </span>

                    </div>
                </div>
                <div class="col-md-3 column"></div>
            </div>
            <div class="row clearfix inventoryInput">
                <div class="col-md-3 column"></div>
                <div class="col-md-6 column">
                    <textarea id="message" style="width: 100%;height: 80px;resize: none;"></textarea>
                </div>
                <div class="col-md-3 column"></div>
            </div>
            <div class="row clearfix inventoryInput">
                <div class="col-md-3 column"></div>
                <div class="col-md-6 column">
                    <button style="width:100%" class="btn btn-primary">Assign Task</button>
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
<script src="<?php echo base_url()?>js/create_task.js"></script>
<script src="<?php echo base_url()?>Theme/js/bootstrap.js"></script>
<!--<script src="--><?php //echo base_url()?><!--/js/header.js"></script>-->
