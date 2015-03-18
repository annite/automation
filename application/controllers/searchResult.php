<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 29/9/14
 * Time: 11:09 AM
 */

class SearchResult extends CI_Controller{
    var $info=array();
    var $user_id;

    function __construct(){ //loads all the required code igniter libraies as the controller is loaded
        parent::__construct();
        $this->load->library('amazon_api');
        $this->load->model('visitor');
        $this->load->model('search');
        $this->load->helper('cookie');
        $this->load->library('Curl');
        $this->load->library('template');
        $this->setLoggedIn();
        $this->user_id=$this->getUserId();
        $this->load->model("cart");
        $this->info['cartVal']=$this->cart->getCartCount($this->user_id);
    }

    public function index()
    {
        $category=$this->input->get("category");
        $keyword=$this->security->xss_clean($this->input->get("keyword"));
        $brand=$this->input->get("brand");


        $data = array(
            'navbar' => $this->load->view('navbar', $this->info, TRUE),
            'product_search' => $this->load->view('product_search', array(), TRUE),
            'footerContent' => $this->load->view('footer', array('page'=>"product_search",'category'=>$category,'keyword'=>$keyword,"brand"=>$brand), TRUE),
        );

        $this->load->view('templates/product_search', $data);
    }

    public function searchProduct(){
        $this->session->set_userdata("total_pages",0);
        $this->session->set_userdata("item_page",0);

        $category=$this->input->post("category");
        $keyword=$this->input->post("keyword");

        if($brand=$this->input->post("brand"))
           echo json_encode($this->amazon_api->getSearchProduct($category,$keyword,$brand));
        else
        echo json_encode($this->amazon_api->getSearchProduct($category,$keyword));

        // echo $this->input->post("category").$this->input->post("keyword").$this->input->post("brand");


    }

    public function searchMoreProduct(){

        $category=$this->input->post("category");
        $keyword=$this->input->post("keyword");
        $brand=$this->input->post("brand");

        echo json_encode($this->amazon_api->getSearchProduct($category,$keyword,$brand));
    }

    public function insertSearchdb(){
        $category=$this->input->post("category");
        $keyword=$this->input->post("keyword");
        $brand=$this->input->post("brand");

        $result=$this->search->addSearch($this->user_id,$category,$keyword,$brand);

        echo $result;
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
}