<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 24/9/14
 * Time: 12:10 PM
 */

class MyWorkModel extends CI_Model{
    function __construct(){
        parent::__construct();
        $this->load->database();
    }
    public function getMyWork($user_email) {
        $user_email=$this->db->escape($user_email);
        $query=$this->db->query("select * from mywork where AssignedTo={$user_email}");
        if(!$this->db->_error_message()) {
            return $query->result();
        }
        else
            return "error";
    }
    public function taskStatusChange($work_id,$status) {
        $this->db->query("update mywork set Status={$status} where WorkId={$work_id}");
        if(!$this->db->_error_message()) {
            return "done";
        }
        else
            return "failure";
    }
}