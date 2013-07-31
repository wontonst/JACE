<?php

$files = array(
    'drawable',
    'animation',
    'atlasimage',
    'atlasdefinition',
    'coordinates',
'resources',
    'engine'
);

foreach($files as $v){
    include('src/'.$v.'.js');
}
?>