<?php
$_GET['k'] == 'WEBHOOK_KEY_FROM_ENV' or die('Bad parameters.');
$cmd = 'echo "please build" > /home/build';
$ret = exec($cmd, $out, $err);