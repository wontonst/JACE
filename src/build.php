<?php

$files = array(
    'resources',
    'keypress',
    'drawable',
    'frame',
    'animation',
    'atlasimage',
    'atlasdefinition',
    'coordinates',
    'engine',
    'keyinputcontroller',
);

foreach ($files as $v) {
    include(__DIR__ . '/' . $v . '.js');
}
?>