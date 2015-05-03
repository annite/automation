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
    public function  getSizes(){
        $query=$this->db->query("SELECT Size FROM fishsize");
        return $query->result();
    }
    public function updateIncomingStock($fishName,$weight,$rate) {
        $fishName=$this->db->escape($fishName);
        $weight=$this->db->escape($weight);
        $rate=$this->db->escape($rate);
        $weightCol="Weight";
        $query=$this->db->query("SELECT FishName FROM fishcollections where FishName={$fishName}");
        if($query->result())
            $this->db->query("update fishcollections set Weight=Weight+{$weight} where FishName={$fishName}");
        else
            $this->db->query("insert into fishcollections (FishName,IsActive,Weight) values ({$fishName},1,{$weight})");
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
    public function getPurchaseReport($startdate,$enddate) {
        $query=$this->db->query("select b.CreatedOn,fishName,b.Weight,Rate from fishcollections as a inner join fishinwardtransactions as b on a.fishId=b.fishId where b.CreatedOn between '".$startdate."' and '".$enddate."'");
        if(!$this->db->_error_message())
            return $query->result();
        else
            return false;
    }
}