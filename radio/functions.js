//Check if items already stored in database
if (localStorage.getItem('Radios')){
	radios = JSON.parse(localStorage.getItem('Radios'));
	$('.list-group').html('')
	var i=0;
	Object.keys(radios).forEach(function(key){
		var items = radios[key];
		$('.panel-title').eq(i).html(key);
		Object.keys(items).forEach(function(item){
			var label=item;
			var cmd=items[item];
			str = '<li class="list-group-item" label="'+label+'" value="'+cmd+'" draggable="true"><a href=""><span class="glyphicon glyphicon-remove-sign"></span></a><span class="glyphicon glyphicon-info-sign" data-toggle="tooltip" data-placement="bottom" title="'+cmd.replace(/;/g,";<br>")+'"></span>'+label+'</li>';
			$('.list-group').eq(i).append(str);
		});
		i++;
	});
}

//Get commands list & enable autocomplete
$.getJSON( "commands.json", function( data ) {
	$('#NewCommand').autocomplete({
		delimiter:";",
		lookup:data,
		minChars:2
	});
});

//Enable tooltips & show tooltip about title
$('[data-toggle="tooltip"]').tooltip({html:true,trigger:"hover focus click"});
$('#radio2 [data-toggle="tooltip"]').eq(0).tooltip("show").on('hide.bs.tooltip',function(){$("#radio2 .tooltip").removeClass("highlight");});
$('#radio2 .tooltip').addClass("highlight");

//Gather data from list's and save to database
function saveData() {
	var rmArray1 = {};
	var rmArray2 = {};
	var rmArray3 = {};
	var unusedArr = {};
	
	$("#radio1 li").each(function() {
		var label = $(this).attr("label");
		rmArray1[label]=$(this).attr("value");
	});
	
	$("#radio2 li").each(function() {
		var label = $(this).attr("label");
		rmArray2[label]=$(this).attr("value");
	});
	
	$("#radio3 li").each(function() {
		var label = $(this).attr("label");
		rmArray3[label]=$(this).attr("value");
	});

	$("#unused li").each(function() {
		var label = $(this).attr("label");
		unusedArr[label]=$(this).attr("value");
	});
	var array = {};

	array[$('#radio1 .panel-title').html()] = rmArray1;
	array[$('#radio2 .panel-title').html()] = rmArray2;
	array[$('#radio3 .panel-title').html()] = rmArray3;
	array['Unused'] = unusedArr;


	
	localStorage.setItem('Radios', JSON.stringify(array));
	radios = array;
}
//Save data when user leaves page or refreshes page
window.onbeforeunload = function(){if (!reset) saveData();}

//Delete Commands
$(document).on('click','.glyphicon-remove-sign',function(e){
	e.preventDefault();
	$(this).parent().parent().remove();
	saveData();
});

//Create New Command
$("#CreateNew").click(function(e) {
	e.preventDefault();
	$('#CustomCommands [required]').each(function(){
		$(this).val()==""?$(this).focus().parent().addClass("has-error"):$(this).parent().removeClass("has-error");
	});
	if ($('#CustomCommands .has-error').length > 0) {
		return;
	}
	var label = $("#NewLabel").val();
	var cmd = $("#NewCommand").val();

	var str = '<li class="list-group-item" label="'+label+'" value="'+cmd+'" draggable="true"><a href=""><span class="glyphicon glyphicon-remove-sign"></span></a><span class="glyphicon glyphicon-info-sign" data-toggle="tooltip" data-placement="bottom" title="'+cmd.replace(/;/g,";<br>")+'"></span>'+label+'</li>';
	
	$("#unusedList").append(str);
	$('#NewLabel').blur().val('');
	$('#NewCommand').blur().val('');
	$('[data-toggle="tooltip"]').tooltip({html:true,trigger:"hover focus click"});
	saveData();
});

//Make list sortable
Sortable.create(radio1List, { group: "commands", filter: ".glyphicon", ghostClass: "sortable-ghost", onMove: function(){saveData();}});
Sortable.create(radio2List, { group: "commands", filter: ".glyphicon", ghostClass: "sortable-ghost", onMove: function(){saveData();}});
Sortable.create(radio3List, { group: "commands", filter: ".glyphicon", ghostClass: "sortable-ghost", onMove: function(){saveData();}});
Sortable.create(unusedList, { group: "commands", filter: ".glyphicon", ghostClass: "sortable-ghost", onMove: function(){saveData();}});

//Generate 'radiopanel.txt'
$("#Generate").click(function(){
	saveData();
	delete radios.Unused;
	post('./view.php', {
		value: JSON.stringify(radios)
	});
});

//View 'radiopanel.txt' in modal
$("#View").click(function(){
	saveData();
	delete radios.Unused;
	post('./view.php?view', {
		value: JSON.stringify(radios)
	},"_BLANK");
});

//Delete stored data
$("#Reset").click(function(){
	localStorage.removeItem('Radios');
	reset=true;
	location.reload();
});

//post data
function post(path, params, target="", method="post") {

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
    form.setAttribute("target", target);

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}