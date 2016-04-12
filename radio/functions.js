$(document).ready(


function() {


    $("#cmd_name").Watermark("Name");
    $("#cmd_label").Watermark("Label");
    $("#cmd_cmd").Watermark("Command");

    $("#creationDiv").hide(0);

    $("#create").click(function() {

        if ($("#creationDiv").is(":visible")) {
            $("#creationDiv").hide(1000);
        } else {
            $("#creationDiv").show(1000, "easeInOutCubic");
        }
    });
    
            $("#cmd_b").click(function() {
            

            var label = $("#cmd_label").val();
            var cmd = $("#cmd_cmd").val();


            var str = '<li label="' + label + '" value="' + cmd + '" data-draggable="item" draggable="true" aria-grabbed="false" tabindex="0">' + label + '</li>';
            
            $("#unused").append(str);

            $('#cmd_name').val('');
            $('#cmd_label').val('');
            $('#cmd_cmd').val('');
            
            
    });

    


    var rmValue1 = [];
    var rmLabels1 = [];

 
    var rmValue2 = [];
    var rmLabels2 = [];


    var rmValue3 = [];
    var rmLabels3 = [];


    var rmArray1 = {};
    var rmArray2 = {};
    var rmArray3 = {};


    $("#view").click(function() {



        $(".box").each(function() {


            if ($(this).attr("id") == "rm1") {

                $(this).children("ol").children("li").each(function() {
                    
                    rmLabels1.push($(this).attr("label"));
                    rmValue1.push($(this).attr("value"));
                });
            }


            if ($(this).attr("id") == "rm2") {

                $(this).children("ol").children("li").each(function() {


                    rmLabels2.push($(this).attr("label"));
                    rmValue2.push($(this).attr("value"));
                });
            }


            if ($(this).attr("id") == "rm3") {

                $(this).children("ol").children("li").each(function() {
                    
      
                    rmLabels3.push($(this).attr("label"));
                    rmValue3.push($(this).attr("value"));
                });
            }





        });




        for (var i = 0; i < rmValue1.length; i++) {
            rmArray1[rmValue1[i]] = rmLabels1[i];
        }

        for (var i = 0; i < rmValue2.length; i++) {
            rmArray2[rmValue2[i]] = rmLabels2[i];

        }

        for (var i = 0; i < rmValue3.length; i++) {
            rmArray3[rmValue3[i]] = rmLabels3[i];

        }



        var array = {};

        array["rm1"] = rmArray1;
        array["rm2"] = rmArray2;
        array["rm3"] = rmArray3;



        post('./view.php/', {
            value: JSON.stringify(array)
        });



    });




});









function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

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