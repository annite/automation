<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 24/9/14
 * Time: 12:06 PM
 */
Class NotFound extends CI_Controller
{

//    function __construct(){ //loads all the required code igniter libraies as the controller is loaded
//        parent::__construct();
//        $this->load->helper("form");
//        $this->load->model('loginModel');
//        $this->load->helper('cookie');
//        $this->load->library('email');
//    }
    public function index()
    {
        $this->load->view('not_found');
    }
}