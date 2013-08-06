<?php

$files = array(
    'coordinates',
    'resources',
    'keypress',
    'drawable',
    'frame',
    'animation',
    'atlasimage',
    'atlasdefinition',
	'renderer',
    'engine',
    'keyinputcontroller',
);

foreach ($files as $v) {
    include(__DIR__ . '/' . $v . '.js');
}
?>