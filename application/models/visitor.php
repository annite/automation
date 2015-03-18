<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 24/9/14
 * Time: 12:11 PM
 */

class Visitor extends CI_Model{

    function __construct(){
        parent::__construct();
        $this->load->database();
    }

    public function checkId($visitor_id){

        $query=$this->db->query("SELECT user_id,timestamp FROM visitor where user_id=$visitor_id");
        return $query->result();

    }

    public function insertVisitor($visitor_id){
        $this->db->query("insert into visitor (user_id) values ('$visitor_id')");

    }
}