<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 24/9/14
 * Time: 12:10 PM
 */
class Cart extends CI_Model
{
    function __construct(){
        parent::__construct();
        $this->load->database();
    }
    public function checkInCart($user_id,$product_id)
    {
        $user_id=$this->db->escape($user_id);
        $query=$this->db->query("select product_id from cart where user_id={$user_id} and product_id='$product_id'");
        if(sizeof($query->result())>0)
            return "inCart";
        else
            return "notInCart";
    }
    public function addProduct($user_id,$product_id,$qty)
    {
        $user_id=$this->db->escape($user_id);
        $product_id=$this->db->escape($product_id);
        $qty=$this->db->escape($qty);
        $this->db->query("insert into cart (user_id,product_id,qty) values ({$user_id},{$product_id},{$qty})");
        if(!$this->db->_error_message())
            return true;
        else
            return false;
    }
    public function updateQty($user_id,$product_id,$qty)
    {
        $user_id=$this->db->escape($user_id);
        $product_id=$this->db->escape($product_id);
        $qty=$this->db->escape($qty);
        $this->db->query("update cart set qty={$qty} where user_id={$user_id} and product_id={$product_id}");
        if(!$this->db->_error_message())
            return true;
        else
            return false;
    }
    public function removeProduct($user_id,$product_id)
    {
        $user_id=$this->db->escape($user_id);
        $product_id=$this->db->escape($product_id);
        $this->db->query("delete from cart where user_id={$user_id} and product_id={$product_id}");
        if(!$this->db->_error_message())
            return true;
        else
            return false;
    }
    /*public function getVisitorsCart($user_id)
    {
        $user_id=$this->db->escape($user_id);
        $query=$this->db->query("select product_id,qty from cart where user_id={$user_id}");
        return $query->result();
    }*/
    public function replaceVisitorByUserId($user_id,$visitor_id)
    {
        $user_id=$this->db->escape($user_id);
        $visitor_id==$this->db->escape($visitor_id);
        $this->db->query("update cart set user_id={$user_id} where user_id={$visitor_id}");
        $this->db->query("DELETE c1 FROM cart c1, cart c2 WHERE c1.user_id = c2.user_id AND c1.product_id = c2.product_id AND (c1.timestamp > c2.timestamp)");
    }

    public function getCartInfo($user_id)
    {
        $user_id=$this->db->escape($user_id);
        $query=$this->db->query("select product_id,qty from cart where user_id={$user_id}");
        return $query->result();
    }
    public function getCartCount($user_id)
    {
        $user_id=$this->db->escape($user_id);
        $query=$this->db->query("select count(*) as cnt from cart where user_id={$user_id}");
        return $query->result()[0]->cnt;
    }
    public function removeFromCart($user_id)
    {
        $user_id=$this->db->escape($user_id);
        $query=$this->db->query("select product_id,qty from cart where user_id={$user_id}");
        $this->db->query("delete from cart where user_id={$user_id}");
        return $query->result();
    }
}


?>