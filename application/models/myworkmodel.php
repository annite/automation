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
        $query=$this->db->query("select * from mywork where AssignedTo={$user_email} and Status in (0,1) order by WorkCreationDate");
        if(!$this->db->_error_message()) {
            return $query->result();
        }
        else
            return "error";
    }
    public function getAllWork() {
        $query=$this->db->query("select * from mywork where Status in (0,1) order by WorkCreationDate asc");
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

    public function assignTask($priority,$assignedTo,$message) {
        $assignedTo=$this->db->escape($assignedTo);
        $message=$this->db->escape($message);
        $this->db->query("insert into mywork (AssignedTo,Priority,Message,Status) values ({$assignedTo},$priority,{$message},1)");
        if(!$this->db->_error_message()) {
            return true;
        }
        else
            return false;
    }
}