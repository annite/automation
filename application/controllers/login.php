<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 24/9/14
 * Time: 12:06 PM
 */
Class Login extends CI_Controller{

    function __construct(){ //loads all the required code igniter libraies as the controller is loaded
        parent::__construct();
        $this->load->helper("form");
        $this->load->model('loginModel');
        $this->load->helper('cookie');
        $this->load->library('email');
    }
    public function index()
    {
        if(!($this->session->userdata("session_id")&&$this->session->userdata("session_name")))
           $this->load->view('login');
        else
            $this->load->view('incoming');
    }
    public function verifyOTP() {
        $OTP=$this->input->post('OTP');
        $email_id=$this->input->post('email_id');
        $result=$this->loginModel->getOTP($email_id,$OTP); //returns the record of the given username
        if($result[0]->OTP===$OTP) {
            $sessiondata=array( //creates session data
                "session_id" => 1,
                "session_name" => $email_id,
            );
            $this->session->set_userdata($sessiondata);
            $this->loginModel->setOTP($email_id,NULL);
            echo "success";
        }else
            echo "failure";
    }
    public function verifyUser(){
//        print_r($this->session->userdata("session_name"));
        if(!($this->session->userdata("session_id")&&$this->session->userdata("session_name")))
        {

            $user_id=$this->input->post('email_id');
            $result=$this->loginModel->getPassword($user_id); //returns the record of the given username
            if($result){
                if($result[0]->password===md5($this->input->post('password'))){
                    $OTP=rand(0000,9999);
                    $done=$this->loginModel->setOTP($user_id,$OTP);
                    if($done) {
                        $query= "You One Time Password (OTP) is : ".$OTP;
                        $this->load->library('email');
                        $config['protocol'] = 'smtp';
                        $config['smtp_host'] = 'ssl://smtp.gmail.com';
                        $config['smtp_port'] = '465';
                        $config['smtp_timeout'] = '7';
                        $config['smtp_user'] = 'hexagraph69@gmail.com';
                        $config['smtp_pass'] = 'shaktiman';
                        $config['charset'] = 'utf-8';
                        $config['newline'] = "\r\n";
                        $config['mailtype'] = 'text'; // or html
                        $config['validation'] = TRUE; // bool whether to validate email or not

                        $this->email->initialize($config);

                        $this->email->from('hexagraph69@gmail.com.com', 'automation OTP');
                        $this->email->to($user_id);
                        // $this->email->cc('another@another-example.com');
                        // $this->email->bcc('them@their-example.com');

                        $this->email->subject('Email Test');
                        $this->email->message($query." if not requested for OTP then please ignore this mail");

                        $this->email->send();
                        echo "success";
                    }else
                        echo "failure";
//                    $sessiondata=array( //creates session data
//                        "session_id" => 1,
//                        "session_name" => $user_id,
//                    );
//
//                    $this->session->set_userdata($sessiondata);
                }
                else{
                    echo "failure";
                }
            }
            else{
                   echo "failure";
            }
        }
        else{
            echo "success";
//            redirect("home");
        }
    }

    public function registerUser(){
            $user_id=$this->input->post('email_id');
            $password=$this->input->post('password');
            $name=$this->input->post('fullname');
            if($name!="" && filter_var($user_id, FILTER_VALIDATE_EMAIL) && $password!= "")
                $result=$this->validateUser($user_id);
            else
                echo "failure";
            if(!$result)
            {
                $done=$this->user->registerUser($user_id,$password,$name);
                if($done)
                {
                    $sessiondata=array( //creates session data
                        "session_id" => 1,
                        "session_name" => $user_id
                    );

                    $this->session->set_userdata($sessiondata);
                    $this->load->model("cart");
                    $this->load->model("search");
                    $this->load->model("click");
                    $this->cart->replaceVisitorByUserId($user_id,$this->input->cookie("visitor_id"));
                    $this->session->set_userdata("cart",$this->cart->getCartCount($user_id));
                    $this->search->replaceVisitorByUserId($user_id,$this->input->cookie("visitor_id"));
                    $this->click->replaceVisitorByUserId($user_id,$this->input->cookie("visitor_id"));
                    echo "success";
                }
                else
                    echo "failure";
            }
            else
                echo "failure";
    }
    public function validateUser($user_id)
    {
        if($this->loginModel->checkEmail($user_id))
            return true;
        else
            return false;
    }
    public function checkEmail()
    {
        if($this->loginModel->checkEmail($this->input->post("email")))
            echo "true";
        else
            echo "false";
    }

    public function forgotPass()//this module will help user to recover the password through email
    {
        if(isset($_POST['emailforgot']))// it will chaeck the authenticity of the request
        {
            $email=$this->input->post("emailforgot");
            $valid=$this->loginModel->forgotPass($email); // returns true if the email is registered email else returns false
            if($valid !== false) // if email_id is valid the it will compose the email and will send it to the refistered email_id
            {
                //echo $valid[0]->password;
                $query= base_url()."index.php/login/showReset?a=".base64_encode($email)."&b=".$valid[0]->password; // recovery string
                $this->load->library('email');
                $config['protocol'] = 'smtp';
                $config['smtp_host'] = 'ssl://smtp.gmail.com';
                $config['smtp_port'] = '465';
                $config['smtp_timeout'] = '7';
                $config['smtp_user'] = 'hexagraph69@gmail.com';
                $config['smtp_pass'] = 'shaktiman';
                $config['charset'] = 'utf-8';
                $config['newline'] = "\r\n";
                $config['mailtype'] = 'text'; // or html
                $config['validation'] = TRUE; // bool whether to validate email or not

                $this->email->initialize($config);

                $this->email->from('hexagraph69@gmail.com.com', 'automation Password change link');
                $this->email->to($email);
                // $this->email->cc('another@another-example.com');
                // $this->email->bcc('them@their-example.com');

                $this->email->subject('Email Test');
                $this->email->message($query." if not requested for change password then please ignore this mail");

                $this->email->send();

                // echo $this->email->print_debugger();
                echo "success";
            }
            else
            {
                echo "failure";
            }
        }
        else
            echo "failure";
    }

    public function showReset() // once user receives the email for password recovery then on click of recovery link this module will show reset password page
    {
        $pass['email']=base64_decode($this->input->get('a'));
        $pass["pass"]=$this->input->get("b");
        $valid=$this->loginModel->passCheck($pass);
        if($valid === true)
            $this->load->view("reset_password",$pass);
        else
            echo "The link has expired"; // if the password is already set then link expired page will be shown
    }
    public function resetPass() // this will collect new password and update the database entry
    {
        $data['email']=$this->input->post("useremail");
        $data["oldpass"]=$this->input->post("oldpass");
        $data["newpass"]=md5($this->input->post("pass"));
        //print_r($data);
        if($this->loginModel->resetPass($data)===true)
            echo "success";
        else
            echo "failure";
       // redirect("home");
    }


}