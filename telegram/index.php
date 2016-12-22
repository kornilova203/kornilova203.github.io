$botToken = "321375343:AAET-7j3Pz0WJtTSrpLY60KDl0NTfChxGQI";
$website = "https://api.telegram.org/bot".$botToken;
$update = file_get_contents($website."/getupdates");
print_r($update);
