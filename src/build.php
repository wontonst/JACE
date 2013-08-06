<?php

$files = array(
    'coordinates',
    'resources',
    'keypress',
    'drawable',
'map',
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