<?php

$files = array(
    'resources',
    'keypress',
    'keyinputcontroller',
    'drawable',
    'frame',
    'animation',
    'atlasimage',
    'atlasdefinition',
    'coordinates',
    'engine'
);

foreach ($files as $v) {
    include(__DIR__ . '/' . $v . '.js');
}
?>