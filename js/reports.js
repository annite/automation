/**
 * Created by ankit.sh on 3/23/2015.
 */
var startdate;
var enddate;
$(document).ready(function(){
    startdate=moment().startOf('month').format('YYYY-MM-DD');
    enddate=moment().format('YYYY-MM-DD');
    $('input[name=timerange]').daterangepicker({
            ranges: {
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            maxDate: moment(),
            format: 'YYYY-MM-DD'
        }
    );
    $("#purchase-report-dates").val(startdate+' - '+enddate);
    $("#sales-report-dates").val(startdate+' - '+enddate);
    $("#profit-report-dates").val(startdate+' - '+enddate);
    getPurchaseReport();
    getSalesReport();
    getStockReport();
    getProfitReport();
    getCreditReport();
    getCashReport();
});
$('input[name=timerange]').on('apply.daterangepicker', function (ev, picker) {
    startdate = picker.startDate.format('YYYY-MM-DD');
    enddate = picker.endDate.format('YYYY-MM-DD');
});
$("#getPurchaseReport").click(function(){
    getPurchaseReport();
});
$("#getSalesReport").click(function(){
    getSalesReport();
});
$("#getStockReport").click(function(){
    getStockReport();
});
$("#getCreditReport").click(function(){
    getCreditReport();
});
$("#getProfitReport").click(function(){
    getProfitReport();
});

function getPurchaseReport() {
    $("#purchaseTableRow").empty();
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/home/getPurchaseReport",
        data:{startdate:startdate,enddate:enddate},
        success:function($data) {
            if ($data !== "failure") {
                var data = jQuery.parseJSON($data);
                var table = document.createElement('table');
                table.setAttribute('id', 'purchaseReportTable');
                table.setAttribute('style', 'width:100%;margin-top:5%')
                var thead = document.createElement('thead');
                var tr = document.createElement('tr');
                var th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Date';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Fish Name';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Weight';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Rate';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Total';
                tr.appendChild(th);
                thead.appendChild(tr);
                table.appendChild(thead);
                var tbody = document.createElement('tbody');
                for (var i = 0; i < data.length; i++) {
                    tr = document.createElement('tr');
                    var td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse');
                    td.innerHTML = format_mysqldate(data[i].CreatedOn);
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse');
                    td.innerHTML = data[i].fishName;
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse;text-align:right');
                    td.innerHTML = data[i].Weight;
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse;text-align:right');
                    td.innerHTML = data[i].Rate;
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse;text-align:right');
                    td.innerHTML = parseFloat(data[i].Weight)*parseFloat(data[i].Rate);
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                }
                table.appendChild(tbody);
                $("#purchaseTableRow").append(table);
                $("#purchaseReportTable").dataTable({
                    "paging": false,
                    "info": false
                });
            }else {
                $("#purchaseTableRow").append('<center style="margin-top: 4%"><h4>No data found for selected date range.</h4></center>');
            }
        }
    });
}
function getSalesReport() {
    $("#salesTableRow").empty();
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/home/getSalesReport",
        data:{startdate:startdate,enddate:enddate},
        success:function($data) {
            if ($data !== "failure") {
                var data = jQuery.parseJSON($data);
                var table = document.createElement('table');
                table.setAttribute('id', 'salesReportTable');
                table.setAttribute('style', 'width:100%;margin-top:5%')
                var thead = document.createElement('thead');
                var tr = document.createElement('tr');
                var th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Date';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Fish Name';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Weight';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Rate';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Total';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Currency';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'AmountPaid';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'AmountBalance';
                tr.appendChild(th);
                thead.appendChild(tr);
                table.appendChild(thead);
                var tbody = document.createElement('tbody');
                for (var i = 0; i < data.length; i++) {
                    tr = document.createElement('tr');
                    var td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse');
                    td.innerHTML = format_mysqldate(data[i].CreatedOn);
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse');
                    td.innerHTML = data[i].fishName;
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse;text-align:right');
                    td.innerHTML = data[i].Weight;
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse;text-align:right');
                    td.innerHTML = data[i].Rate;
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse;text-align:right');
                    td.innerHTML = parseFloat(data[i].TotalCost);
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse;text-align:right');
                    td.innerHTML = data[i].Currency;
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse;text-align:right');
                    td.innerHTML = data[i].AmountPaid;
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse;text-align:right');
                    td.innerHTML = data[i].BalanceAmount;
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                }
                table.appendChild(tbody);
                $("#salesTableRow").append(table);
                $("#salesReportTable").dataTable({
                    "paging": false,
                    "info": false
                });
            }else {
                $("#purchaseTableRow").append('<center style="margin-top: 4%"><h4>No data found for selected date range.</h4></center>');
            }
        }
    });
}
function getStockReport() {
    $("#stockTableRow").empty();
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/home/getStockReport",
        success:function($data) {
            if ($data !== "failure") {
                var data = jQuery.parseJSON($data);
                var table = document.createElement('table');
                table.setAttribute('id', 'stockReportTable');
                table.setAttribute('style', 'width:100%;margin-top:5%')
                var thead = document.createElement('thead');
                var tr = document.createElement('tr');
                var th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Fish Id';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Fish Name';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Is Active';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Weight';
                tr.appendChild(th);
                thead.appendChild(tr);
                table.appendChild(thead);
                var tbody = document.createElement('tbody');
                for (var i = 0; i < data.length; i++) {
                    tr = document.createElement('tr');
                    var td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse;text-align:right');
                    td.innerHTML = data[i].FishId;
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse');
                    td.innerHTML = data[i].FishName;
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse;');
                    td.innerHTML = getIsActiveStatus(data[i].IsActive);
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse;text-align:right');
                    td.innerHTML = data[i].Weight;
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                }
                table.appendChild(tbody);
                $("#stockTableRow").append(table);
                $("#stockReportTable").dataTable({
                    "paging": false,
                    "info": false
                });
            }else {
                $("#stockTableRow").append('<center style="margin-top: 4%"><h4>No data found for selected date range.</h4></center>');
            }
        }
    });
}
function getProfitReport() {
    $("#profitTableRow").empty();
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/home/getProfitReport",
        data:{startdate:startdate,enddate:enddate},
        success:function($data) {
            if ($data !== "failure") {
                var data = jQuery.parseJSON($data);
                var table = document.createElement('table');
                table.setAttribute('id', 'profitReportTable');
                table.setAttribute('style', 'width:100%;margin-top:5%')
                var thead = document.createElement('thead');
                var tr = document.createElement('tr');
                var th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Date';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Total Sales';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Total Purchase';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Profit';
                tr.appendChild(th);
                thead.appendChild(tr);
                table.appendChild(thead);
                var tbody = document.createElement('tbody');
                for (var i = 0; i < data.length; i++) {
                    tr = document.createElement('tr');
                    var td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse');
                    td.innerHTML = format_mysqldate(data[i].CreatedOn);
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse;text-align:right');
                    td.innerHTML = data[i].sales;
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse;text-align:right');
                    td.innerHTML = data[i].sales;
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse;text-align:right');
                    td.innerHTML = parseFloat(data[i].sales)-parseFloat(data[i].purchase);
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                }
                table.appendChild(tbody);
                $("#profitTableRow").append(table);
                $("#profitReportTable").dataTable({
                    "paging": false,
                    "info": false
                });
            }else {
                $("#profitTableRow").append('<center style="margin-top: 4%"><h4>No data found for selected date range.</h4></center>');
            }
        }
    });
}
function getCreditReport() {
    $("#creditTableRow").empty();
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/home/getCreditReport",
        success:function($data) {
            if ($data !== "failure") {
                var data = jQuery.parseJSON($data);
                var table = document.createElement('table');
                table.setAttribute('id', 'creditReportTable');
                table.setAttribute('style', 'width:100%;margin-top:5%')
                var thead = document.createElement('thead');
                var tr = document.createElement('tr');
                var th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Customer Name';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Total Purchase Amount';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Currency';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Amount Paid';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Amount Balance';
                tr.appendChild(th);
                thead.appendChild(tr);
                table.appendChild(thead);
                var tbody = document.createElement('tbody');
                for (var i = 0; i < data.length; i++) {
                    tr = document.createElement('tr');
                    var td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse');
                    td.innerHTML = data[i].FirstName+' '+data[i].LastName;
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse;text-align:right');
                    td.innerHTML = parseFloat(data[i].AmountPaid)+parseFloat(data[i].BalanceAmount);
                    tr.appendChild(td);

                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse');
                    td.innerHTML = data[0].Currency;
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse;text-align:right');
                    td.innerHTML = data[i].AmountPaid;
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse;text-align:right');
                    td.innerHTML = data[i].BalanceAmount;
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                }
                table.appendChild(tbody);
                $("#creditTableRow").append(table);
                $("#creditReportTable").dataTable({
                    "paging": false,
                    "info": false
                });
            }else {
                $("#creditTableRow").append('<center style="margin-top: 4%"><h4>No data found for selected date range.</h4></center>');
            }
        }
    });
}
function getCashReport() {
    $("#cashTableRow").empty();
    jQuery.ajax({
        type:"POST",
        url:base_url+"index.php/home/getCashReport",
        success:function($data) {
            if ($data !== "failure") {
                var data = jQuery.parseJSON($data);
                var table = document.createElement('table');
                table.setAttribute('id', 'cashReportTable');
                table.setAttribute('style', 'width:100%;margin-top:5%')
                var thead = document.createElement('thead');
                var tr = document.createElement('tr');
                var th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Customer Name';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Total Purchase Amount';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Currency';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Amount Paid';
                tr.appendChild(th);
                th = document.createElement('th');
                th.setAttribute('style', 'border : 1px solid white');
                th.innerHTML = 'Amount Balance';
                tr.appendChild(th);
                thead.appendChild(tr);
                table.appendChild(thead);
                var tbody = document.createElement('tbody');
                for (var i = 0; i < data.length; i++) {
                    tr = document.createElement('tr');
                    var td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse');
                    td.innerHTML = data[i].FirstName+' '+data[i].LastName;
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse;text-align:right');
                    td.innerHTML = parseFloat(data[i].AmountPaid)+parseFloat(data[i].BalanceAmount);
                    tr.appendChild(td);

                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse');
                    td.innerHTML = data[0].TotalCost.toString().substr((parseFloat(data[0].TotalCost)).toString().length+1,data[0].TotalCost.toString().length);
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse;text-align:right');
                    td.innerHTML = data[i].AmountPaid;
                    tr.appendChild(td);
                    td = document.createElement('td');
                    td.setAttribute('style', 'border : 1px solid #2c3e50;border-collapse : collapse;text-align:right');
                    td.innerHTML = data[i].BalanceAmount;
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                }
                table.appendChild(tbody);
                $("#cashTableRow").append(table);
                $("#cashReportTable").dataTable({
                    "paging": false,
                    "info": false
                });
            }else {
                $("#cashTableRow").append('<center style="margin-top: 4%"><h4>No data found for selected date range.</h4></center>');
            }
        }
    });
}



function getIsActiveStatus(status) {
    switch(status) {
        case 1:
            return "Yes";
        case 0:
            return "No";
        default :
            return "Yes";
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