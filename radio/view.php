<?php
header("Content-type: text/plain");
header("Cache-Control: no-store, no-cache");
if (!isset($_GET['view'])){
	header('Content-Description: File Transfer');
	header('Content-Disposition: attachment; filename="radiopanel.txt"');
}
$groups=['standard','group','report'];
$array= json_decode($_POST['value']);
?>
"RadioPanel.txt"
{
	"Groups"
	{<?php $i=0; foreach ($array as $radio => $commands){ ?>
	
		"<?=$groups[$i]?>"
		{
			"hotkey"	"<?=++$i?>"
			"title"	"<?=$radio?>"
			"timeout"	"5"
			
			"Commands"
			{<?php $hotkey=0; foreach ($commands as $label => $value){ ?>
				
				"<?=$label?>"
				{
					"hotkey"	"<?=++$hotkey?>"
					"label"	"<?=$label?>"
					"cmd"	"<?=$value?>"
				}
			<?php if ($hotkey==9) {break;}} ?>
				
			}
		}<?php } ?>
		
	}
}