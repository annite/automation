<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 24/9/14
 * Time: 12:10 PM
 */
class Click extends CI_Model
{
    public function replaceVisitorByUserId($user_id,$visitor_id)
    {
        $user_id=$this->db->escape($user_id);
        $visitor_id==$this->db->escape($visitor_id);
        $this->db->query("update click set user_id={$user_id} where user_id={$visitor_id}");
    }

    public function addClick($user_id,$product_id,$category,$brand){
        $category=$this->db->escape($category);
        $brand=$this->db->escape($brand);
        $user_id=$this->db->escape($user_id);
        $this->db->query("insert into click (user_id,product_id,brand,category) values ({$user_id},'$product_id',{$brand},{$category})");
        if(!$this->db->_error_message())
            return true;
        else
            return false;
    }

    public function getUserData($user_id){
        $user_id=$this->db->escape($user_id);
        $query=$this->db->query("select product_id,category,brand from click where user_id={$user_id} order by timestamp desc limit 10");

        return $query->result();
    }
}