<?php
header("Content-type: text/plain");
header("Cache-Control: no-store, no-cache");
if (!isset($_GET['view'])){
	header('Content-Description: File Transfer');
	header('Content-Disposition: attachment; filename="radiopanel.txt"');
}
$groups=['standard','group','report'];
$array= json_decode($_POST['value'],true);
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
			{<?php $hotkey=0; while ($hotkey < count($commands) && $hotkey < 9){ 
			if ($commands[$hotkey]['color']!="#cccccc"){
				$label="<font color='".$commands[$hotkey]['color']."'>".$commands[$hotkey]['label']."</font>";
			}else {
				$label=$commands[$hotkey]['label'];
			}
			$cmd = $commands[$hotkey]['command'];
			?>
				
				"<?=$label?>"
				{
					"hotkey"	"<?=++$hotkey?>"
					"label"	"<?=$label?>"
					"cmd"	"<?=$cmd?>"
				}
			<?php } ?>
				
			}
		}<?php } ?>
		
	}
}