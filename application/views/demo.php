<div class="row">
    <div id="performer-carousel" class="carousel slide col-md-6 col-md-offset-3" data-ride="carousel" data-interval="false">
        <!-- Wrapper for slides -->
        <div class="carousel-inner" role="listbox" id="performer-list">
            <?php $this->load->view('demo-slides', ['performers' => $performers, 'first' => true]); ?>
        </div>

        <!-- Controls -->
        <a class="left carousel-control" href="#performer-carousel" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a id="carousel-right-button" class="right carousel-control" href="#performer-carousel" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</div>
