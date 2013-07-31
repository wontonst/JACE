<?php

$files = array(
    'drawable',
    'animation',
    'atlas',
    'engine'
);

foreach($files as $v){
    include('src/'.$v.'.js');
}
?>