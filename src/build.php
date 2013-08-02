<?php

$files = array(
'resources',
    'drawable',
    'animation',
    'atlasimage',
    'atlasdefinition',
    'coordinates',
    'engine'
);

foreach($files as $v){
    include(__DIR__.'/'.$v.'.js');
}
?>