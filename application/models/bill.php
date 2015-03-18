<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 24/9/14
 * Time: 12:11 PM
 */
class Bill extends CI_Model
{
    public function insertToBill($billNo,$product_id,$qty,$cost,$name)
    {
        $name=$this->db->escape($name);
        $this->db->query("insert into bill values('$billNo','$product_id',{$name},'$qty','$cost')");
    }
    public function getBillInfo($bill_no)
    {
        return $this->db->query("select * from bill where bill_no='$bill_no'")->result();
    }
}