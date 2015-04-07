<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 24/9/14
 * Time: 12:10 PM
 */

class OutgoingModel extends CI_Model{
    function __construct(){
        parent::__construct();
        $this->load->database();
    }

    public function updateOutgoingStock($fishName,$weight,$rate) {
        $fishName=$this->db->escape($fishName);
        $weight=$this->db->escape($weight);
        $rate=$this->db->escape($rate);
        $this->db->query("update fishcollections set Weight=Weight-{$weight} where FishName={$fishName}");
        if(!$this->db->_error_message()) {
            $query=$this->db->query("select FishId from fishcollections where FishName={$fishName}");
            return $query->result();
        }
    }
    public function createTransaction($employeeId,$fishId,$weight,$rate,$transactionTypeId,$isCredit,$currency) {
        if($isCredit==1){
            $amountPaid=0;
            $amountBalance=$weight*$rate;
            $isCredit=1;
        }else {
            $amountPaid=$weight*$rate;
            $amountBalance=0;
            $isCredit=0;
        }
        $total=($weight*$rate)." ".$currency;
        $total=$this->db->escape($total);
        $this->db->query("insert into fishoutwardtransaction (EmployeeId,FishId,CustomerID,Weight,Rate,TotalCost,TransactionTypeId,AmountPaid,BalanceAmount,IsBalanceRemaining) values ({$employeeId},{$fishId},1,{$weight},{$rate},{$total},1,{$amountPaid},{$amountBalance},{$isCredit})");
        if(!$this->db->_error_message()) {
           echo "done";
        }
    }
}