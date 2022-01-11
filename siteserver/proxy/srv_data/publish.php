<?php
$cmd = "cd /home/scripts && ./build_md_update.sh";
$ret = exec($cmd, $out, $err);
echo "<pre>";
print_r($cmd);
echo "<br/>";
print_r($ret);
print_r($out);
print_r($err);
echo "</pre>";

// OUTPUT:
/*
cd /home/scripts && ./build_md_update.sh
Array
(
    [0] =>
    [1] => Fri Dec 24 20:29:38 UTC 2021
    [2] =>
    [3] => node -v
    [4] => v14.18.2
    [5] =>
    [6] => UPLOAD: /etc/nginx/upload
    [7] => GATSBY: /home/site
    [8] => MD: /home/site/src/markdown-pages
    [9] =>
)
1
*/
// There is a cronjob building after markdown-update
// but I want the build to be triggered through php! :(