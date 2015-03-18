<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

    var $info=array();
    var $user_id;
    function __construct(){ //loads all the required code igniter libraies as the controller is loaded
        parent::__construct();
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
//        $data = array(
//            'navbar' => $this->load->view('navbar', $this->info, TRUE),
//            'home_suggestion' => $this->load->view('home_suggestion', array(), TRUE),
//            'home_top_Selling' => $this->load->view('home_top_selling', array(), TRUE),
//            'home_new_arrival' => $this->load->view('home_new_arrival', array(), TRUE),
//            'footerContent' => $this->load->view('footer', array('page'=>"home"), TRUE),
//        );
//
//        $this->load->view('templates/home', $data);
        $this->load->view('welcome_message');
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