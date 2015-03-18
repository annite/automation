<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 24/9/14
 * Time: 12:10 PM
 */

class Search extends CI_Model
{
    function __construct(){
        parent::__construct();
        $this->load->database();
    }

    public function addSearch($user_id,$category,$keyword,$brand){
        $category=$this->db->escape($category);
        $keyword=$this->db->escape($keyword);
        $brand=$this->db->escape($brand);
        $user_id=$this->db->escape($user_id);
        $this->db->query("insert into search (user_id,keyword,brand,category) values ({$user_id},{$keyword},{$brand},{$category})");
        if(!$this->db->_error_message())
            return true;
        else
            return false;
    }
    public function replaceVisitorByUserId($user_id,$visitor_id)
    {
        $user_id=$this->db->escape($user_id);
        $visitor_id==$this->db->escape($visitor_id);
        $this->db->query("update search set user_id={$user_id} where user_id={$visitor_id}");
    }
    public function getSearchData($user_id)
    {
        $user_id=$this->db->escape($user_id);
        $query=$this->db->query("select keyword,category,brand from search where category=(select category from search where user_id={$user_id} group by category order by count(category) desc limit 0,1) and user_id={$user_id} group by timestamp,keyword order by count(keyword) desc,timestamp desc limit 0,1");
            return $query->result();
    }
}