/**
 * Created by root on 8/10/14.
 */
var data;

$(document).ready(function(e){
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/home/getEmployeesList",
        success:function($data) {
            $data=jQuery.parseJSON($data);
            for(var i=0;i<$data.length;i++) {
                $("#assignedTo").append('<option>'+ $data[i].user_email +'</option>')
            }
        }
    });
});
$('#message').keyup(function(e) {
    if(parseInt($("#message").val().length >= 1000))
        $("#charCount").html(0);
    else if(e.keyCode==8 && parseInt($("#charCount").html())<1000)
        $("#charCount").html(1000-parseInt($("#message").val().length));
    else if(parseInt($("#charCount").html())>0 && parseInt($("#charCount").html())<=1000 && $("#message").val()!="")
        $("#charCount").html(1000-parseInt($("#message").val().length));
    var $textarea = $(this);
    var max = 1000;
    if ($textarea.val().length > max) {
        $("#charCount").html(0);
        var top = $textarea.scrollTop();
        $textarea.val($textarea.val().substr(0, max));
        $textarea.scrollTop(top);

    }
});
