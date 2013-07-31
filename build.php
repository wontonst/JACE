<?php

$files = array(
    'drawable',
    'animation',
    'atlasimage',
    'atlasdefinition',
    'coordinate',
    'engine'
);

foreach($files as $v){
    include('src/'.$v.'.js');
}
?>