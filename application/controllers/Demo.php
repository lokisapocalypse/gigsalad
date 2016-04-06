<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Demo extends CI_Controller
{
    public function index()
    {
        $this->load->model('performer_model');

        $data['performers'] = $this->performer_model->getPerformers();
        $data['first'] = true;

        $this->load->view('templates/header');
        $this->load->view('demo', $data);
        $this->load->view('templates/footer');
    }

    public function ajax_load_performers($startAt = 0, $limit = 10)
    {
        $this->load->model('performer_model');

        $data['performers'] = $this->performer_model->getPerformers($startAt, $limit);
        $data['first'] = false;

        $this->load->view('demo-slides', $data);
    }
}
