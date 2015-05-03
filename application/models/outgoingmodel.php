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
    public function createTransaction($employeeId,$fishId,$weight,$rate,$transactionTypeId,$mode,$currency,$cash) {
        if($mode==1){
            $amountPaid=0;
            $amountBalance=$weight*$rate;
            $isCredit=1;
        }else if($mode==0) {
            $amountPaid=$weight*$rate;
            $amountBalance=0;
            $isCredit=0;
        }else{
            $amountPaid=$cash;
            $amountBalance=($weight*$rate)-$cash;
            $isCredit=1;
        }
        $total=($weight*$rate);
        $total=$this->db->escape($total);
        $this->db->query("insert into fishoutwardtransaction (EmployeeId,FishId,CustomerID,Weight,Rate,TotalCost,Currency,TransactionTypeId,AmountPaid,BalanceAmount,IsBalanceRemaining) values ({$employeeId},{$fishId},1,{$weight},{$rate},{$total},'".$currency."',{$mode},{$amountPaid},{$amountBalance},{$isCredit})");
        if(!$this->db->_error_message()) {
           return $this->db->insert_id();
        }
    }
    public function getSalesReport($startdate,$enddate) {
        $query=$this->db->query("select b.CreatedOn,fishName,b.Weight,Rate,TotalCost,Currency,AmountPaid,BalanceAmount from fishcollections as a inner join fishoutwardtransaction as b on a.fishId=b.fishId where b.CreatedOn between '".$startdate."' and '".$enddate."'");
        if(!$this->db->_error_message())
            return $query->result();
        else
            return false;
    }
    public function getStockReport() {
        $query=$this->db->query("select * from fishcollections");
        if(!$this->db->_error_message())
            return $query->result();
        else
            return false;
    }
    public function getCreditReport() {
        $query=$this->db->query("SELECT FirstName,LastName,Currency,sum(AmountPaid) as AmountPaid,sum(BalanceAmount) as BalanceAmount from fishoutwardtransaction as a inner join customers as b on a.CustomerId=b.CustomerId where TransactionTypeId in (1,2) group by a.CustomerId");
        if(!$this->db->_error_message())
            return $query->result();
        else
            return false;
    }

    public function getCashReport() {
        $query=$this->db->query("SELECT FirstName,LastName,TotalCost,sum(AmountPaid) as AmountPaid,sum(BalanceAmount) as BalanceAmount from fishoutwardtransaction as a inner join customers as b on a.CustomerId=b.CustomerId where TransactionTypeId=0 group by a.CustomerId order by b.CreatedOn");
        if(!$this->db->_error_message())
            return $query->result();
        else
            return false;
    }
    public function getProfitReport($startdate,$enddate) {
        $query=$this->db->query("SELECT a.CreatedOn,sum(a.TotalCost) as purchase,sum(b.TotalCost) as sales,Currency from fishinwardtransactions as a inner join fishoutwardtransaction as b on date_format(a.CreatedOn, '%Y-%m-%d')=date_format(b.CreatedOn, '%Y-%m-%d') where b.CreatedOn between '".$startdate."' and '".$enddate."' group by date_format(a.CreatedOn, '%Y-%m-%d') ");
        if(!$this->db->_error_message())
            return $query->result();
        else
            return false;
    }
}