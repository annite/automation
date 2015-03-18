<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 24/9/14
 * Time: 12:06 PM
 */
class CartOpn extends CI_Controller
{
    function __construct(){ //loads all the required code igniter libraies as the controller is loaded
        parent::__construct();
        $this->load->model('cart');
        $this->load->model('visitor');
        $this->load->library('amazon_api');
        $this->setLoggedIn();
        $this->user_id=$this->getUserId();
        $this->load->model("cart");
        $this->info['cartVal']=$this->cart->getCartCount($this->user_id);
    }
    public function getUserId(){
        if(($this->session->userdata("session_id")&&$this->session->userdata("session_name"))){
            return $this->session->userdata("session_name");
        }
        else{
            return $this->getVisitorId();
        }
    }

    public function getVisitorId(){
        if($this->input->cookie("visitor_id")){
            return $this->input->cookie("visitor_id");
        }
        else
            return $this->setVisitorId();
    }

    public function setVisitorId(){
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
    public function updateCart()
    {
        $user_id=$this->getUserId();
        $product_id=$this->input->post("product_id");
        $qty=$this->input->post("qty");
        $operation=$this->input->post("operation");
        //echo $operation;
        if($operation==="insert")
        {
            if($this->cart->checkInCart($user_id,$product_id)=="inCart")
                echo "inCart";
            else
            {
                if($this->cart->addProduct($user_id,$product_id,$qty)==true)
                {
                    $product=array("product_id"=>$product_id,"qty"=>$qty);
                    if(!$this->session->userdata("productlist"))
                        $this->session->set_userdata("productlist",array());
                    $prod_list=$this->session->userdata("productlist");
                    array_push($prod_list,$product);
                    $this->session->set_userdata("productlist",$prod_list);
                    $this->session->set_userdata("cart",$this->session->userdata("cart")+1);



                    echo "done";
                }
                else
                    echo "error";
            }
        }
        else if($operation==="updateQty")
        {
            if($this->cart->updateQty($user_id,$product_id,$qty))
            {
                if(!$this->session->userdata("productlist"))
                    $this->session->set_userdata("productlist",array());
                $prod_list=$this->session->userdata("productlist");
                for($i=0;$i<$this->session->userdata("cart");$i++)
                {

                    if($prod_list[$i]['product_id'] == $product_id)
                    {
                        $prod_list[$i]['qty']=$qty;
                        $this->session->set_userdata("productlist",$prod_list);
                        break;
                    }
                }
                echo "done";
            }
            else
                echo "failure";
        }
        else if($operation==="removeProduct")
        {
            if($this->cart->removeProduct($user_id,$product_id))
            {
                $prod_list=$this->session->userdata("productlist");
                for($i=0;$i<$this->session->userdata("cart");$i++)
                {

                    if($prod_list[$i]['product_id'] == $product_id)
                    {
                        array_splice($prod_list,$i,1);
                        $this->session->set_userdata("productlist",$prod_list);
                        $this->session->set_userdata("cart",$this->session->userdata("cart")-1);
                        break;
                    }
                }
            }
        }
    }

    public function showCart()
    {

        $data = array(
            'navbar' => $this->load->view('navbar', $this->info, TRUE),
            'cart' => $this->load->view('cart', array(), TRUE),
            'footerContent' => $this->load->view('footer', array('page'=>"cart"), TRUE),
        );
        $this->load->view('templates/cart', $data);
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

    public function getCartInfo()
    {
        //$user_id=$this->getUserId();
        //if($this->session->userdata("cart")!=0)
        //{
            $result=$this->cart->getCartInfo($this->getUserId());
            $this->session->set_userdata("productlist",array());
            $this->session->set_userdata("cart",0);
            if($result){
            for($i=0;$i<sizeof($result);$i++)
            {
                $product_id=$result[$i]->product_id;
                $qty=$result[$i]->qty;
                $product=array("product_id"=>$product_id,"qty"=>$qty);
                $prod_list=$this->session->userdata("productlist");
                array_push($prod_list,$product);
                $this->session->set_userdata("productlist",$prod_list);
                $this->session->set_userdata("cart",$this->session->userdata("cart")+1);
            }
            $product_list=array();
            $i=0;
            foreach($this->session->userdata("productlist") as $product_id)
            {
                $product_list[$i++]=array_merge($this->amazon_api->getCartProduct($product_id["product_id"]),$product_id);
            }
            echo json_encode($product_list);

            //echo substr($str,strrpos($str,'['),strrpos($str,']'));
        }
        else
            echo "failure";
    }

    public function placeOrder()
    {
        if(!($this->session->userdata("session_id") && $this->session->userdata("session_name")))
            echo "login";
        else
         {
            $user_id=$this->getUserId();
            $this->load->model("bill");
            $result=$this->cart->removeFromCart($user_id);
            $billNo=$user_id.date('Y-m-d H:i:s');
            $cost=$this->input->post("cost");
            $name=$this->input->post("name");
            //$msg="<table><tr><th>Bill_No</th><th>Product_Id</th><th>Product_Name</th><th>Quantity</th><th>Cost</th></tr></table>";
            $message="<table style='border: 1px solid black; border-collapse: collapse'><tr><th style='border: 1px solid black'>Product_Id</th><th style='border: 1px solid black'>Product_Name</th><th style='border: 1px solid black'>Quantity</th><th style='border: 1px solid black'>Cost</th></tr>";
            for($i=0;$i<sizeof($result);$i++)
            {
                $this->bill->insertToBill($billNo,$result[$i]->product_id,$result[$i]->qty,$cost[$i],$name[$i]);
                $message=$message."<tr><td style='border: 1px solid black'>".$result[$i]->product_id."</td><td style='border: 1px solid black'>".$name[$i]."</td><td style='border: 1px solid black'>".$result[$i]->qty."</td><td style='border: 1px solid black'>".$cost[$i]."</td></tr>";
            }
            $message=$message."</table>";
            $this->load->model("order");
            $gt=$this->input->post("grandtotal");
            $this->order->insertToOrder($user_id,$billNo,$gt);
            $this->session->set_userdata("cart",0);
            $mail['message']=$message;
            $mail['billno']=$billNo;
            echo json_encode($mail);

          //  $query= base_url()."index.php/login/showReset?a=".base64_encode($email)."&b=".$valid[0]->password; // recovery string
          //  $message="<table><tr><th>Bill_No</th><th>Product_Id</th><th>Product_Name</th><th>Quantity</th><th>Cost</th></tr>";
        }
    }
    public function sendOrderDetails()
    {
        $user_id=$this->getUserId();
        $message=$this->input->post("message");
        $billNo=$this->input->post("billno");
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

        $this->email->from('hexagraph69@gmail.com.com', 'eShopping.com Bill');
        $this->email->to($user_id);
        // $this->email->cc('another@another-example.com');
        // $this->email->bcc('them@their-example.com');

        $this->email->subject('Email Test');
        $this->email->message("Hi ".$user_id."<br><br><p>Thank you for your order!<br><br>Your order has been placed and order details are :</p> <br><br> <h4 style='color: blue'>Bill Number : ".$billNo."</h4>".$message);

        $this->email->send();
    }
    public function dis()
    {
        print_r($this->session->userdata("productlist"));
        echo $this->session->userdata("cart");
    }
    public function getOrderInfo()
    {
        $this->load->model("order");
        $result=$this->order->getOrderInfo($this->getUserId());
        if($result)
        {
            $this->load->model("bill");
            for($i=0;$i<sizeof($result);$i++)
            {
                $orderarr[$i][$i]=$result[$i];
                $orderarr[$i][$result[$i]->bill_no]=$this->bill->getBillInfo($result[$i]->bill_no);
            }
            echo json_encode($orderarr);
        }
        else
            echo false;
      /*  $this->load->model("bill");
        $bill=$this->bill->getBillInfo($billNo);*/
    }
}