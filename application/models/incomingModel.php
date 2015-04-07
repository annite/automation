<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 24/9/14
 * Time: 12:10 PM
 */

class IncomingModel extends CI_Model{
    function __construct(){
        parent::__construct();
        $this->load->database();
    }

//checkEmail
    public function  getFishList(){
        $query=$this->db->query("SELECT FishName,Weight FROM fishcollections");
        return $query->result();
    }
    public function updateIncomingStock($fishName,$weight,$rate) {
        $fishName=$this->db->escape($fishName);
        $weight=$this->db->escape($weight);
        $rate=$this->db->escape($rate);
        $weightCol="Weight";
        $this->db->query("update fishcollections set Weight=Weight+{$weight} where FishName={$fishName}");
        if(!$this->db->_error_message()) {
            $query=$this->db->query("select FishId from fishcollections where FishName={$fishName}");
            return $query->result();
        }
    }
    public function createTransaction($employeeId,$fishId,$weight,$rate,$transactionTypeId) {
        $this->db->query("insert into fishinwardtransactions (EmployeeId,FishId,Weight,Rate,TotalCost,TransactionTypeId) values ({$employeeId},{$fishId},{$weight},{$rate},{$weight}*{$rate},1)");
        if(!$this->db->_error_message()) {
           echo "done";
        }
    }
}