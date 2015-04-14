/**
 * Created by root on 8/10/14.
 */
var data;

$(document).ready(function(e){
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/home/getAllWork",
        success:function($data){
            $data=jQuery.parseJSON($data);
            if($data!="error" && $data.length>0)
            {
                data=$data;
                console.log(data);
                $(".work").append('<div class="row clearfix workTitle"><div class="col-md-12 column"><center><h3>Assigned Task History</h3></center></div></div>');
                $(".work").append('<div class="panel-group" id="workDetails">');
                for(var i=0;i<data.length;i++)
                {
                    var work_id=data[i].WorkId;
                    var priority=data[i].Priority;
                    var message=data[i].Message;
                    var status=getStatus(data[i].Status);
                    var date=format_mysqldate(data[i].WorkCreationDate);
                    $("#workDetails").append('<div class="panel panel-info"><div class="panel-heading" data-toggle="collapse" data-parent="#workDetails" data-target="#'+i+'i"><h4 class="panel-title accordion-toggle"><div class="row clearfix"><div class="col-md-4 column">Task Id : '+(i+1)+'</div><div class="col-md-4 column"></div><div class="col-md-4 column gt" id="status'+work_id+'">'+ status +'</div></div></h4></div><div id="'+i+'i" class="panel-collapse collapse"><div class="panel-body '+i+'i">');
                    $("."+i+"i").append('<div class="row clearfix ord"><div class="col-md-3 column"><u>Priority</u> : '+priority+'</div><div class="col-md-3 column" style="overflow-wrap:break-word"><u>Message</u> : <span>'+message+'</span></div><div class="col-md-3 column '+ work_id +'" style="margin-top:-7px"><u>Status</u> : </div><div class="col-md-3 column"><u>Cretation Date</u> : '+ date +'</div></div></div></div>');
                    var radio=document.createElement('input');
                    radio.setAttribute('type','checkbox');
                    radio.setAttribute('name','work'+work_id);
                    radio.setAttribute('id',work_id);
                    radio.setAttribute('data-on-text',"CloseTask");
                    radio.setAttribute('data-off-text',status);
                    radio.setAttribute('data-on-color','success');
                    radio.setAttribute('data-off-color','danger');
                    radio.setAttribute('onChange','taskStatusChange(this)');
                    $("."+work_id).append(radio);
                    $("[name='work"+work_id+"']").bootstrapSwitch();

                    //<input type="radio" name="taskCompletion" id="'+work_id+'" data-on-text="Completed" data-off-text="Pending" data-on-color="success" data-off-color="danger">

                }
            }
            else
                $(".work").append('<center><h3>No Tasks Assigned Yet</h3></center>');
        }
    });
});
function taskStatusChange(e) {
    var status;
    var id=e.id;
    if(document.getElementById(id).checked)
        status=2;
    else
        status=0;
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/home/taskStatusChangeByAdmin",
        data:{work_id: e.id,status:status},
        success:function($data){
            $("#status"+id).html(getStatus(status));
        }
    });
}
function getStatus(code) {
    switch (parseInt(code)){
        case 0 :
            return "Pending";
        case 1:
        case 2:
            return "Work Completed";
    }
}
function format_mysqldate (mysqldate) {
    // example mysql date: 2008-01-27 20:41:25
    // we need to replace the dashes with slashes
    var date = String(mysqldate).replace(/\-/g, '/');
    return format_date(date);
}
function format_date (date) {
    // date can be in msec or in a format recognized by Date.parse()
    var d = new Date(date);

    var days_of_week = Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
    var day_of_week = days_of_week[d.getDay()];

    var year = d.getFullYear();
    var months = Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
    var month = months[d.getMonth()];
    var day = d.getDate();

    var hour = d.getHours();
    var minute = d.getMinutes();
    var am_pm = 'am';

    if(hour == 0) {
        hour = 12;
    } else if (hour == 12) {
        am_pm = 'pm';
    } else if (hour > 12) {
        hour -= 12;
        am_pm = 'pm';
    }
    if(minute < 10) { minute = '0'+minute; }

    var date_formatted = day_of_week+' '+month+' '+day+' '+year;
    return date_formatted;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}