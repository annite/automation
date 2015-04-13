<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 24/9/14
 * Time: 12:10 PM
 */

class LoginModel extends CI_Model{
    function __construct(){
        parent::__construct();
        $this->load->database();
    }

//checkEmail
    public function  getPassword($user_email){

        $user_email=$this->db->escape($user_email);
        $query=$this->db->query("SELECT password,user_type FROM login where user_email={$user_email}");
        return $query->result();
    }
    public function checkEmail($user_email){
        $user_email=$this->db->escape($user_email);
        $query=$this->db->query("SELECT * FROM login where user_email={$user_email}");
        return $query->result();
    }
    public function registerUser($user_id,$password,$name){
        $user_id=$this->db->escape($user_id);
        $password=md5($password);
        $password=$this->db->escape($password);
        $name=$this->db->escape($name);
        $query=$this->db->query("insert into user (user_id,name,password) values({$user_id},{$name},{$password})");
        if(!$this->db->_error_message())
            return true;
        else
            return false;
    }
    public function forgotPass($email){
        $user_id=$this->db->escape($email);
        $query=$this->db->query("select password from login where user_email={$user_id}");
        if($query->result())
            return $query->result();
        else
            return false;
    }

    public function passCheck($pass) // this will check for the link expiration
    {
        $user_id=$this->db->escape($pass['email']);
        $password=$this->db->escape($pass['pass']);
        $query=$this->db->query("select user_email from login where password=$password and user_email={$user_id} ");
        if($query->result())
            return true;
        else
            return false;
    }
    public function resetPass($data) // will update the password if the user resets the password
    {
        $user_id=$this->db->escape($data['email']);
        $password=$this->db->escape($data['newpass']);
        $this->db->query("update login set password=$password where user_email={$user_id}");
        if(!$this->db->_error_message())
            return true;
        else
            return false;
    }
    public function setOTP($user_email,$OTP) {
        $user_email=$this->db->escape($user_email);
        $OTP=$this->db->escape($OTP);
        $this->db->query("update login set OTP=$OTP where user_email={$user_email}");
        if(!$this->db->_error_message())
            return true;
        else
            return false;
    }
    public function getOTP($email_id) {
        $email_id=$this->db->escape($email_id);
        $query=$this->db->query("select OTP from login where user_email={$email_id}");
        if($query->result())
            return $query->result();
        else
            return false;
    }
    public function getEmployeesList() {
        $query=$this->db->query("select user_email from login where user_type='Employee'");
        if($query->result())
            return $query->result();
        else
            return false;
    }
}