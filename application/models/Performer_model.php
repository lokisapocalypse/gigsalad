<?php
class Performer_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }

    public function getPerformers($start = 0, $limit = 10)
    {
        // might be better to do sort by name but we need to do a sort to get
        // consistent results
        $this->db->order_by('id', 'ASC');
        $query = $this->db->get('performers', $limit, $start);
        return $query->result_array();
    }
}
