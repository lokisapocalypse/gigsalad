<?php if (!empty($performers)): ?>
    <?php foreach ($performers as $performer): ?>
        <div class="item <?php echo $first ? 'active' : ''; ?>">
            <?php $url = json_decode($performer['thumbnail']); ?>
            <img src="<?php echo $url->url; ?>" alt="<?php echo sprintf('%s, %s', $performer['act_name'], $performer['category_name']); ?>">
            <div class="carousel-caption">
                <h3><?php echo $performer['act_name']; ?>, <?php echo $performer['category_name']; ?><br /></h3>
                <p><?php echo $performer['city_name']; ?>, <?php echo $performer['state_code']; ?></p>
            </div>
        </div>
    <?php $first = false; ?>
    <?php endforeach; ?>
<?php endif; ?>
