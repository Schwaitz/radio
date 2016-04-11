<?php


header("Content-type: text/plain");


$array= $_POST['value'];
$jsonIterator = new RecursiveIteratorIterator(
    new RecursiveArrayIterator(json_decode($array, TRUE)),
    RecursiveIteratorIterator::SELF_FIRST);

$array = [];

$stage = "";
    
foreach ($jsonIterator as $key => $val) {
      
    if(is_array($val)) {
      
      $stage = $key;
        
    } else {
      
         
   $str = "$stage:$key:$val";
         
   array_push($array, $str);
 

    }
    
    
    
      
}




$rm1 = [];
$rm2 = [];
$rm3 = [];


foreach($array as $a){
   
   if(explode(':', $a)[0] == "rm1"){
      
      array_push($rm1, $a);
   }
   
      if(explode(':', $a)[0] == "rm2"){
      
      array_push($rm2, $a);
   }
   
      if(explode(':', $a)[0] == "rm3"){
      
      array_push($rm3, $a);
   }
   
}

   print "\"RadioPanel.txt\"
{
	\"Groups\"
	{
		\"standard\"
		{
			\"hotkey\"	\"1\"
			\"title\"	\"Radio Menu 1\"
			\"timeout\"	\"5\"
            
			\"Commands\"
			{\n";
            
            $index = 1;
            foreach($rm1 as $r){
               $exp = explode(':', $r);
               
               print("		        	\"$exp[1]\"\n");
               print("		        	{\n");
               print("		        	    \"hotkey\"   \"$index\"\n");
               $index+=1;
               print("		        	    \"label\"   \"$exp[2]\"\n");
               print("		        	    \"cmd\"   \"$exp[1]\"\n");
               print("		        	}\n");
               print("\n");
               
            }
            
            print("		        }\n");
            print("	    	}\n\n");
            
            print("		\"group\"
		{
			\"hotkey\"	\"2\"
			\"title\"	\"Radio Menu 2\"
			\"timeout\"	\"5\"
			
			\"Commands\"
			{\n");
            
            
            $index = 1;
            foreach($rm2 as $r){
               $exp = explode(':', $r);
               
               print("		        	\"$exp[1]\"\n");
               print("		        	{\n");
               print("		        	    \"hotkey\"   \"$index\"\n");
               $index+=1;
               print("		        	    \"label\"   \"$exp[2]\"\n");
               print("		        	    \"cmd\"   \"$exp[1]\"\n");
               print("		        	}\n");
               print("\n");
               
            }
            
            print("	    	    }\n");
            print("	    	}\n\n");
            
            print("		\"report\"
		{
			\"hotkey\"	\"3\"
			\"title\"	\"Radio Menu 3\"
			\"timeout\"	\"5\"
			
			\"Commands\"
			{\n");
            
            
            $index = 1;
            foreach($rm3 as $r){
               $exp = explode(':', $r);
               
               print("		        	\"$exp[1]\"\n");
               print("		        	{\n");
               print("		        	    \"hotkey\"   \"$index\"\n");
               $index+=1;
               print("		        	    \"label\"   \"$exp[2]\"\n");
               print("		        	    \"cmd\"   \"$exp[1]\"\n");
               print("		        	}\n");
               print("\n");
               
            }
            
            print("                    }\n");
            print("              }\n");
            print("       }\n");
            print("}\n");       
            ?>