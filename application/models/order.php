<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 24/9/14
 * Time: 12:10 PM
 */
class Order extends CI_Model
{
    public function insertToOrder($user_id,$billNo,$gt)
    {
        $user_id=$this->db->escape($user_id);
        $this->db->query("insert into orders(user_id,bill_no,total_amt) values({$user_id},'$billNo',{$gt})");
    }
    public function getOrderInfo($user_id)
    {
        $user_id=$this->db->escape($user_id);
        return $this->db->query("select bill_no,total_amt from orders where user_id={$user_id}")->result();
    }
}