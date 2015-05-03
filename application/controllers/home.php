<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

    var $info=array();
    var $user_id;
    function __construct()
    { //loads all the required code igniter libraies as the controller is loaded
        parent::__construct();
        $this->load->helper("form");
        $this->load->model('loginmodel');
        $this->load->model('incomingModel');
        $this->load->model('outgoingModel');
        $this->load->model('myWorkModel');
        $this->load->helper('cookie');

        $this->load->library('email');
//        $this->load->library('amazon_api');
//        $this->load->model('visitor');
//        $this->load->model('click');
//        $this->load->helper('cookie');
//        $this->load->library('Curl');
//        $this->load->library('template');
//        $this->session->set_userdata("search_more",2);
//        $this->setLoggedIn();
//        $this->user_id=$this->getUserId();
//        $this->load->model("cart");
//        $this->info['cartVal']=$this->cart->getCartCount($this->user_id);
    }

    public function index()
    {
        if($this->session->userdata('user_type') == 'Employee')
            $this->incoming();
        else if($this->session->userdata('user_type') == 'Admin')
            $this->reports();
        else
            redirect('login');

    }
    public function incoming(){
        $this->isLoggedIn('Employee');
        if (!($this->session->userdata("session_id") && $this->session->userdata("session_name"))) {
//            $this->load->view('login');
            redirect('login');
        }
        else {
            $data['active'] = "incoming";
            $data['user_type'] = "Employee";
            $this->load->view('header', $data);
            $this->load->view('incoming');
            //        $this->load->view('footer');
        }
    }
    public function outgoing() {
        $this->isLoggedIn('Employee');
        if (!($this->session->userdata("session_id") && $this->session->userdata("session_name"))) {
//            $this->load->view('login');
            redirect('login');
        }
        else {
            $data['active'] = "outgoing";
            $data['user_type'] = "Employee";
            $this->load->view('header', $data);
            $this->load->view('outgoing');
        }
//        $this->load->view('footer');
    }
    public function myWork() {
        $this->isLoggedIn('Employee');
        if (!($this->session->userdata("session_id") && $this->session->userdata("session_name"))) {
//            $this->load->view('login');
            redirect('login');
        }
        else {
            $data['active'] = "myWork";
            $data['user_type'] = "Employee";
            $this->load->view('header', $data);
            $this->load->view('my_work');
            //        $this->load->view('footer');
        }
    }
    public function getMyWork() {
        $this->isLoggedIn('Employee');
        $user_email=$_POST['user_email'];
        $result=$this->myWorkModel->getMyWork($user_email);
        if($result!="error")
            echo json_encode($result);
        else
            echo "error";

    }
    public function taskStatusChange() {
        $this->isLoggedIn('Employee');
        $work_id=$_POST['work_id'];
        $status=$_POST['status'];
        $result=$this->myWorkModel->taskStatusChange($work_id,$status);
        if($result=="done")
            echo "done";
        else
            echo "failure";
    }
    public function getFishList() {
        $this->isLoggedIn('Employee');
        $result=$this->incomingModel->getFishList();
        if($result) {
            echo json_encode($result);
        }
    }
    public function getSizes() {
        $this->isLoggedIn('Employee');
        $result=$this->incomingModel->getSizes();
        if($result) {
            echo json_encode($result);
        }
    }
    public function updateIncomingStock() {
        $this->isLoggedIn('Employee');
        $fishName=$this->input->post('fishName');
        $weight=$this->input->post('weight');
        $rate=$this->input->post('rate');
        $done="failure";
        $result=$this->incomingModel->updateIncomingStock($fishName,$weight,$rate);
        $fishId=$result[0]->FishId;
        $done=$this->incomingModel->createTransaction(1,$fishId,$weight,$rate,1);
        echo $done;
    }
    public function updateOutgoingStock() {
        $this->isLoggedIn('Employee');
        $fishName=$this->input->post('fishName');
        $weight=$this->input->post('weight');
        $rate=$this->input->post('rate');
//        $isCash=$this->input->post('isCash');
        $mode=$this->input->post('mode');
        $currency=$this->input->post('currency');
//        $currency = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($currency));
//        $currency = html_entity_decode($currency,null,'ISO-8859-15');
        $done="failure";
        $result=$this->outgoingModel->updateOutgoingStock($fishName,$weight,$rate);
        $fishId=$result[0]->FishId;
//        if($isCash=='true')
//            $isCredit=0;
//        else
//            $isCredit=1;
        $cash=0;
        if($mode==2)
            $cash=$_POST['cash'];
        $done=$this->outgoingModel->createTransaction(25,$fishId,$weight,$rate,1,$mode,$currency,$cash);
        if($done) {
//            $message="<table style='border: 1px solid black; border-collapse: collapse'><tr><th style='border: 1px solid black'>Product_Id</th><th style='border: 1px solid black'>Fish Name</th><th style='border: 1px solid black'>Weight</th><th style='border: 1px solid black'>Rate</th><th style='border: 1px solid black'>Total Cost</th></tr>";
//            $message=$message."<tr><td style='border: 1px solid black'>".$fishId."</td><td style='border: 1px solid black'>".$fishName."</td><td style='border: 1px solid black'>".$weight."</td><td style='border: 1px solid black'>".$rate." ".$currency."</td><td style='border: 1px solid black'>".($rate*$weight)." ".$currency."</td></tr></table>";
            $message=$this->getMessage($fishId,$fishName,$rate,$weight,$currency,$mode,$cash,$done);
            $query= "Invoice";
            $this->load->library('email');
            $config['protocol'] = 'smtp';
            $config['smtp_host'] = 'ssl://smtp.gmail.com';
            $config['smtp_port'] = '465';
            $config['smtp_timeout'] = '7';
            $config['smtp_user'] = 'hexagraph69@gmail.com';
            $config['smtp_pass'] = 'shaktiman';
            $config['charset'] = 'utf-8';
            $config['newline'] = "\r\n";
            $config['mailtype'] = 'html'; // or html
            $config['validation'] = TRUE; // bool whether to validate email or not

            $this->email->initialize($config);
            $this->email->from('hexagraph69@gmail.com.com', 'Invoice');
            $this->email->to('shinankit1993@gmail.com');
            // $this->email->cc('another@another-example.com');
            // $this->email->bcc('them@their-example.com');

            $this->email->subject('Invoice');
            $this->email->message($message);

            $this->email->send();
            echo "done";
        }
    }
   
    private function getMessage($fishId,$fishName,$rate,$weight,$currency,$mode,$cash,$last_id) {
        if($mode==1){
            $amountPaid=0;
            $amountBalance=$weight*$rate;
        }else if($mode==0) {
            $amountPaid=$weight*$rate;
            $amountBalance=0;
        }else{
            $amountPaid=$cash;
            $amountBalance=($weight*$rate)-$cash;
        }

            $message = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <!--	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />-->
        <!--	-->
        <!--	<title>Editable Invoice</title>-->
        <!--	-->
        <!--	<link rel="stylesheet" type="text/css" href="css/style.css" />-->
        <!--	<link rel="stylesheet" type="text/css" href="css/print.css" media="print" />-->
        <!--	<script type="text/javascript" src="js/jquery-1.3.2.min.js"></script>-->
        <!--	<script type="text/javascript" src="js/example.js"></script>-->
    </head>
    <body style="margin: 0;padding: 0;font: 14px/1.4 Georgia, serif">
    
    <div id="page-wrap" style="margin: 0 auto;padding: 0;width: 800px">
    
        <textarea id="header" style="margin: 20px 0;padding: 8px 0;border: 0;font: bold 15px Helvetica, Sans-Serif;overflow: hidden;resize: none;height: 15px;width: 100%;background: #222;text-align: center;color: white;text-decoration: uppercase;letter-spacing: 20px">INVOICE</textarea><div id="identity" style="margin: 0;padding: 0">
    
            <textarea id="address" style="margin: 0;padding: 0;border: 0;font: 14px Georgia, Serif;overflow: hidden;resize: none;width: 250px;height: 150px;float: left">Marine Plaza
                123 Appleseed Street
                Appleville, WI 53719
    
                Phone: (555) 555-5555</textarea><div id="logo" style="margin: 0;padding: 0;text-align: right;float: right;position: relative;margin-top: 25px;border: 1px solid #fff;max-width: 540px;max-height: 100px;overflow: hidden">
    
        </div>
    
        <div style="clear: both;margin: 0;padding: 0"></div>
    
        <div id="customer" style="margin: 0;padding: 0;overflow: hidden">
    
            <textarea id="customer-title" style="margin: 0;padding: 0;border: 0;font: 14px Georgia, Serif;overflow: hidden;resize: none;font-size: 20px;font-weight: bold;float: left">Widget Corp.
                c/o Steve Widget</textarea><table id="meta" style="margin: 0;padding: 0;border-collapse: collapse;margin-top: 1px;width: 300px;float: right"><tr style="margin: 0;padding: 0"><td class="meta-head" style="margin: 0;padding: 5px;border: 1px solid black;text-align: left;background: #eee">Invoice #</td>
                    <td style="margin: 0;padding: 5px;border: 1px solid black;text-align: right"><textarea style="margin: 0;padding: 0;border: 0;font: 14px Georgia, Serif;overflow: hidden;resize: none;width: 100%;height: 20px;text-align: right">'.$last_id.'</textarea></td>
                </tr><tr style="margin: 0;padding: 0"><td class="meta-head" style="margin: 0;padding: 5px;border: 1px solid black;text-align: left;background: #eee">Date</td>
                    <td style="margin: 0;padding: 5px;border: 1px solid black;text-align: right"><textarea id="date" style="margin: 0;padding: 0;border: 0;font: 14px Georgia, Serif;overflow: hidden;resize: none;width: 100%;height: 20px;text-align: right">'.date("F j, Y").'</textarea></td>
                </tr><tr style="margin: 0;padding: 0"><td class="meta-head" style="margin: 0;padding: 5px;border: 1px solid black;text-align: left;background: #eee">Amount Due</td>
                    <td style="margin: 0;padding: 5px;border: 1px solid black;text-align: right"><div class="due" style="margin: 0;padding: 0">'.$amountBalance.' '.$currency.'</div></td>
                </tr></table></div>
    
        <table id="items" style="margin: 30px 0 0 0;padding: 0;border-collapse: collapse;clear: both;width: 100%;border: 1px solid black"><tr style="margin: 0;padding: 0"><th style="margin: 0;padding: 5px;border: 1px solid black;background: #eee">Fish Id</th>
                <th style="margin: 0;padding: 5px;border: 1px solid black;background: #eee">Fish Name</th>
                <th style="margin: 0;padding: 5px;border: 1px solid black;background: #eee">Rate/KG</th>
                <th style="margin: 0;padding: 5px;border: 1px solid black;background: #eee">Weight</th>
                <th style="margin: 0;padding: 5px;border: 1px solid black;background: #eee">Total Cost</th>
            </tr><tr class="item-row" style="margin: 0;padding: 0">
                <td class="item-name" style="margin: 0;padding: 5px;border: 0;vertical-align: top;width: 175px"><textarea style="margin: 0;padding: 0;border: 0;font: 14px Georgia, Serif;overflow: hidden;resize: none;width: 100%;height: 50px">'.$fishId.'</textarea></td>
                <td class="description" style="margin: 0;padding: 5px;border: 0;vertical-align: top;width: 300px"><textarea style="margin: 0;padding: 0;border: 0;font: 14px Georgia, Serif;overflow: hidden;resize: none;width: 100%;height: 50px">'.$fishName.'</textarea></td>
                <td style="margin: 0;padding: 5px;border: 0;vertical-align: top"><textarea class="cost" style="margin: 0;padding: 0;border: 0;font: 14px Georgia, Serif;overflow: hidden;resize: none;width: 80px;height: 50px">'.$rate.' '.$currency.'</textarea></td>
                <td style="margin: 0;padding: 5px;border: 0;vertical-align: top"><textarea class="qty" style="margin: 0;padding: 0;border: 0;font: 14px Georgia, Serif;overflow: hidden;resize: none;width: 80px;height: 50px">'.$weight.' KG</textarea></td>
                <td style="margin: 0;padding: 5px;border: 0;vertical-align: top"><span class="price" style="margin: 0;padding: 0">'.$rate*$weight.' '.$currency.'</span></td>
            </tr><tr style="margin: 0;padding: 0"><td colspan="2" class="blank" style="margin: 0;padding: 5px;border: 0"> </td>
                <td colspan="2" class="total-line" style="margin: 0;padding: 5px;border: 1px solid black;border-right: 0;text-align: right">Subtotal</td>
                <td class="total-value" style="margin: 0;padding: 10px;border: 1px solid black;border-left: 0"><div id="subtotal" style="margin: 0;padding: 0">'.$rate*$weight.' '.$currency.'</div></td>
            </tr><tr style="margin: 0;padding: 0"><td colspan="2" class="blank" style="margin: 0;padding: 5px;border: 0"> </td>
                <td colspan="2" class="total-line" style="margin: 0;padding: 5px;border: 1px solid black;border-right: 0;text-align: right">Total</td>
                <td class="total-value" style="margin: 0;padding: 10px;border: 1px solid black;border-left: 0"><div id="total" style="margin: 0;padding: 0">'.$rate*$weight.' '.$currency.'</div></td>
            </tr><tr style="margin: 0;padding: 0"><td colspan="2" class="blank" style="margin: 0;padding: 5px;border: 0"> </td>
               <td colspan="2" class="total-line" style="margin: 0;padding: 5px;border: 1px solid black;border-right: 0;text-align: right">Amount Paid</td>
    
                <td class="total-value" style="margin: 0;padding: 10px;border: 1px solid black;border-left: 0"><textarea id="paid" style="margin: 0;padding: 0;border: 0;font: 14px Georgia, Serif;overflow: hidden;resize: none;width: 80px;height: 20px;background: none">'.$amountPaid.' '.$currency.'</textarea></td>
            </tr><tr style="margin: 0;padding: 0"><td colspan="2" class="blank" style="margin: 0;padding: 5px;border: 0"> </td>
                <td colspan="2" class="total-line balance" style="margin: 0;padding: 5px;border: 1px solid black;border-right: 0;text-align: right;background: #eee">Balance Due</td>
                <td class="total-value balance" style="margin: 0;padding: 10px;border: 1px solid black;border-left: 0;background: #eee"><div class="due" style="margin: 0;padding: 0">'.$amountBalance.' '.$currency.'</div></td>
            </tr></table>
    
    </div>
    
    </body>
    </html>';
        return $message;
    }











    public function reports() {
        $this->isLoggedIn('Admin');
//        if (!($this->session->userdata("session_id") && $this->session->userdata("session_name"))) {
////            $this->load->view('login');
//            redirect('login');
//        }
//        else {
            $data['active'] = "reports";
            $data['user_type'] = "Admin";
            $this->load->view('header', $data);
            $this->load->view('reports');
//        }
    }

    public function createTask() {
        $this->isLoggedIn('Admin');
//        if (!($this->session->userdata("session_id") && $this->session->userdata("session_name"))) {
////            $this->load->view('login');
//            redirect('login');
//        }
//        else {
            $data['active'] = "create_task";
            $data['user_type'] = "Admin";
            $this->load->view('header', $data);
            $this->load->view('create_task');
//        }
    }

    public function notifications() {
        $this->isLoggedIn('Admin');
//        if (!($this->session->userdata("session_id") && $this->session->userdata("session_name"))) {
////            $this->load->view('login');
//            redirect('login');
//        }
//        else {
        $data['active'] = "notifications";
        $data['user_type'] = "Admin";
        $this->load->view('header', $data);
        $this->load->view('notifications');
//        }
    }

    public function getEmployeesList() {
        $this->isLoggedIn('Admin');
        $list=$this->loginmodel->getEmployeesList();
        if($list)
            echo json_encode($list);
        else
            echo "failure";
    }

    public function assignTask() {
        $this->isLoggedIn('Admin');
        $priority=$_POST['priority'];
        $assignedTo=$_POST['assignedTo'];
        $message=$_POST['message'];
        $done=$this->myWorkModel->assignTask($priority,$assignedTo,$message);
        if($done)
            echo "done";
        else
            echo "failure";
    }

    public function getAllWork() {
        $result=$this->myWorkModel->getAllWork();
        if($result!="error")
            echo json_encode($result);
        else
            echo "error";
    }

    public function taskStatusChangeByAdmin() {
        $this->isLoggedIn('Admin');
        $work_id=$_POST['work_id'];
        $status=$_POST['status'];
        $result=$this->myWorkModel->taskStatusChange($work_id,$status);
        if($result=="done")
            echo "done";
        else
            echo "failure";
    }


    public function getPurchaseReport() {
        $this->isLoggedIn('Admin');
        $startdate=$_POST['startdate'];
        $enddate=$_POST['enddate'];
        $report=$this->incomingModel->getPurchaseReport($startdate,$enddate);
        if($report)
            echo json_encode($report);
        else
            echo "failure";
    }
    public function getSalesReport() {
        $this->isLoggedIn('Admin');
        $startdate=$_POST['startdate'];
        $enddate=$_POST['enddate'];
        $report=$this->outgoingModel->getSalesReport($startdate,$enddate);
        if($report)
            echo json_encode($report);
        else
            echo "failure";
    }
    public function getStockReport() {
        $this->isLoggedIn('Admin');
        $report=$this->outgoingModel->getStockReport();
        if($report)
            echo json_encode($report);
        else
            echo "failure";
    }
    public function getProfitReport() {
        $this->isLoggedIn('Admin');
        $startdate=$_POST['startdate'];
        $enddate=$_POST['enddate'];
        $report=$this->outgoingModel->getProfitReport($startdate,$enddate);
        if($report)
            echo json_encode($report);
        else
            echo "failure";
    }
    public function getCreditReport() {
        $this->isLoggedIn('Admin');
//        $startdate=$_POST['startdate'];
//        $enddate=$_POST['enddate'];
        $report=$this->outgoingModel->getCreditReport();
        if($report)
            echo json_encode($report);
        else
            echo "failure";
    }
    public function getCashReport() {
        $this->isLoggedIn('Admin');
//        $startdate=$_POST['startdate'];
//        $enddate=$_POST['enddate'];
        $report=$this->outgoingModel->getCashReport();
        if($report)
            echo json_encode($report);
        else
            echo "failure";
    }

    public function isLoggedIn($user_type) {
        if($_COOKIE['user_email'] && $_COOKIE['user_type']==$user_type)
            return true;
        else if($_COOKIE['user_email'] && $_COOKIE['user_type']!=$user_type)
            redirect('notFound');
        else
            redirect('login');
    }


























    private function getUserId(){
        if(($this->session->userdata("session_id")&&$this->session->userdata("session_name"))){
            return $this->session->userdata("session_name");
        }
        else{
            return $this->getVisitorId();
        }
    }

    private function getVisitorId(){
        if($this->input->cookie("visitor_id")){
            return $this->input->cookie("visitor_id");
        }
        else
            return $this->setVisitorId();
    }

    private function setVisitorId(){
        do{
            $visitor_id=rand(000000,999999);
            $result=$this->visitor->checkId($visitor_id);
        }
        while($result);

        $this->visitor->insertVisitor($visitor_id);

        $cookie = array(
            'name'   => 'visitor_id',
            'value'  => $visitor_id,
            'expire' => '1296000'
        );
        $this->input->set_cookie($cookie);
        return $visitor_id;
    }

    public function logOut(){//logout
        $this->session->sess_destroy();
        redirect(login);
    }

    public function getTopSelling(){
        //$rewww=$rrr;
        echo json_encode($this->amazon_api->topSelling());
    }
    public function getSearchSuggestion()
    {
        $this->load->model("search");
        $result=$this->search->getSearchData($this->getUserId());
        if($result)
        {
          //  echo $result[0]->brand;
            echo json_encode($this->amazon_api->getSearchSuggestion($result[0]->keyword,$result[0]->category,$result[0]->brand));
        }
        else
            echo false;
    }

    public function getTopArrival(){
        echo json_encode($this->amazon_api->topArrival());

    }

    private function setLoggedIn(){

      /*  <a href="#" class="" data-toggle="dropdown"><span class="glyphicon glyphicon-wrench"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a class="dropdownli" href="<?php echo base_url()?>index.php/home/settings">Edit Profile</a></li>
                        <li><a class="dropdownli" href="<?php echo base_url()?>index.php/home/logOut">Log-out</a></li>
                    </ul>*/

        if(($this->session->userdata("session_id") && $this->session->userdata("session_name")))
        {
            $logout=base_url()."index.php/home/logOut";

            $this->info['login']='<a class="" data-toggle="dropdown"><i style="font-size:36px" class="fa fa-user"></i></a>
                                   <ul class="dropdown-menu" role="menu">
                                   <li><a class="dropdownli" href="'.base_url().'index.php/home/orderDetails">Orders</a></li>
                                   <li><a class="dropdownli" href=" '.base_url().'index.php/home/logOut">Log-out</a></li>
                                   </ul>';
            //$this->info['login']="Logout";
            //$this->info['modal']=base_url()."index.php/home/logOut";
        }
        else
        {
            $this->info['login']='<a href="#login-modal" data-toggle="modal" id="open-modal">Login</a>';
          //  $this->info['login']="Login";
            //$this->info['modal']="#login-modal";
        }
    }


    public function productDetails($product_id)
    {
        $data = array(
            'navbar' => $this->load->view('navbar', $this->info, TRUE),
            'product_details' => $this->load->view('product_details', array(), TRUE),
            'similar_product' => $this->load->view('similar_product', array(), TRUE),
            'home_suggestion' => $this->load->view('home_suggestion', array(), TRUE),
            'footerContent' => $this->load->view('footer', array('page'=>"product_detail",'product_id'=>$product_id), TRUE),
        );

        $this->load->view('templates/product_details', $data);
    }


    public function getProductDetail(){
        $product_id=$this->input->post("product_id");

        echo json_encode($this->amazon_api->getProduct($product_id));

    }

    public function insertClickDb(){
        $product_id=$this->input->post("product_id");
        $category=$this->input->post("category");
        $brand=$this->input->post("brand");

        echo $this->click->addClick($this->user_id,$product_id,$category,$brand);
    }


    public function getDescription(){
        $similar_product=$this->input->post("similar");

        //echo json_encode($similar_product);
        echo json_encode($this->amazon_api->similarProduct($similar_product));
    }

    public function getClickSuggestion(){
        $click_data=$this->click->getUserData($this->user_id);
        if($click_data){
            $product_ids="";
            foreach($click_data as $product_id)
            $product_ids.=$product_id->product_id.",";
            //echo $product_ids;
            echo json_encode($this->amazon_api->suggestClickProduct($product_ids));
        }
        else{
            echo "new user";
        }

    }

    public function orderDetails(){
        $data = array(
            'navbar' => $this->load->view('navbar', $this->info, TRUE),
            'orders' => $this->load->view('order_details', array(), TRUE),
            'footerContent' => $this->load->view('footer', array('page'=>"order"), TRUE),
        );

        $this->load->view('templates/order_details', $data);
    }




















    public function api()
    {
         // $operation=array("Operation"=>"BrowseNodeLookup","BrowseNodeId"=>"1375424031");
        //$operation=array("Operation"=>"ItemSearch","Keywords"=>"Hp laptop","SearchIndex"=>"Electronics","brand"=>"All","ResponseGroup"=>"Medium,BrowseNodes");
        //$operation=array("Operation"=>"SimilarityLookup","ItemId"=>"B00HFNFKJQ,B005FYNTIG,B001D0ROGO,B002U1ZBG0,B00I5C14AU,","SimilarityType"=>"","ResponseGroup"=>"Medium");
        $operation=array("Operation"=>"ItemSearch","SearchIndex"=>"Watches","Brand"=>"Casio","ResponseGroup"=>"Medium,Similarities");
        //$operation=array("Operation"=>"SimilarityLookup","ItemId"=>"B00MOCDXCY,B00MOCDLI0,9381576459","SimilarityType"=>"Random","ResponseGroup"=>"Medium");

        //$operation=array("Operation"=>"BrowseNodeLookup","SearchIndex"=>"Books","Keywords"=>"Potter","ResponseGroup"=>"BrowseNodes");
        //$a=array("Operation"=>"ItemSearch","Keywords"=>"5 point","SearchIndex"=>"Books","ResponseGroup"=>"BrowseNodes");
         echo $this->amazon_api->aws_signed_request("in",$operation);

    }

    public function parse1(){
        $a=array("Operation"=>"ItemLookup","ItemId"=>"B00KCKEVSA","IdType"=>"ASIN","ResponseGroup"=>"Large");
        //$a=array("Operation"=>"ItemLookup","ItemId"=>"8172234988","IdType"=>"ASIN","ResponseGroup"=>"Medium");

        //$a=array("Operation"=>"ItemSearch","Keywords"=>"5 point","SearchIndex"=>"Books","ResponseGroup"=>"BrowseNodes");
        echo $this->amazon_api->aws_signed_request("in",$a);
        /* $mypix = simplexml_load_file($this->api->aws_signed_request("in",$a));
        // $mypix = new SimpleXMLElement($xml);

         foreach ($mypix->BrowseNodes->BrowseNode->NewReleases->NewRelease as $pixinfo):
             $title=$pixinfo->Title;
             echo $title."<br>";
         endforeach;*/
    }

}

/* End of file home.php */
/* Location: ./application/controllers/home.php */