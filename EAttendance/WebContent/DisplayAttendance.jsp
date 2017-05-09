<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sx" uri="/struts-dojo-tags" %>
<%@taglib prefix="display" uri="http://displaytag.sf.net"%>
<html>
<head>
<sx:head />
	<META HTTP-EQUIV="Expires" CONTENT="0">
        <META HTTP-EQUIV="Pragma" CONTENT="no-cache">

        <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
        <title>Attendance Sheet</title>
        <LINK rel="stylesheet" type="text/css" href='style/sftstyle.css' media="screen">
	<link rel="stylesheet" type="text/css" href="style/scPrintStyle.css" media="print">
	<script language="JavaScript" src="./scripts/Calendar1.js"> </script>
<meta http-equiv="content-type" content="text/xml; charset=utf-8" >

      <link rel="stylesheet" href="./scripts/cal/winxp.css">
      <script type="text/javascript" src="./js/AttendanceMarking.js"></script>
      <script type="text/javascript" src="./scripts/cal/utils.js"></script>
      <script type="text/javascript" src="./scripts/cal/calendar.js"></script>
      <script type="text/javascript" src="./scripts/cal/calendar-setup.js"></script>
      <script type="text/javascript" src="./scripts/cal/calendar-en.js"></script>

	<style type="text/css">

#mytable {
	width: 700px;
	padding: 0;
	margin: 0;
}

caption {
	padding: 0 0 5px 0;
	width: 700px;	 
	font: italic 11px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	text-align: right;
}

th {
	font: bold 11px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	color: #4f6b72;
	border-right: 1px solid #C1DAD7;
	border-bottom: 1px solid #C1DAD7;
	border-top: 1px solid #C1DAD7;
	letter-spacing: 3px;
	#text-transform: uppercase;
	text-align: center;
	background: #CAE8EA url(./images/bg_header.jpg) no-repeat;
}

th.nobg {
	border-top: 0;
	border-left: 0;
	border-right: 1px solid #C1DAD7;
	background: none;
}



th.spec {
	border-left: 1px solid #C1DAD7;
	border-top: 0;
	background: #fff url(./images/bullet1.gif) no-repeat;
	font: bold 10px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
}

th.specalt {
	border-left: 1px solid #C1DAD7;
	border-top: 0;
	background: #f5fafa url(./images/bullet2.gif) no-repeat;
	font: bold 10px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	color: #797268;
}
</style>

<script type="text/javascript" >

function LoadYear()
{
	document.attendanceForm.action="LoadYear";
	document.attendanceForm.method="POST";
	document.attendanceForm.submit();

}

function togglecheckboxes(master,group){
	

	var cbarray = document.getElementsByName(group);
	for(var i = 0; i < cbarray.length; i++){
		var cb = document.getElementById(cbarray[i].id);
		cb.checked = master.checked;
	
	}
	
}
</script>
</head>



</head>
<body bgcolor="#ffffff">
<form name="frmIncmg" method="post"><center><br>
	<table width="100%" border="0" cellspacing="0">
		<tr><td align="center" class="labelHeader">Attendance Marking</td></tr>
		<tr><td align="center" class="labelHeader">&nbsp;</td></tr>
		<tr><td class="label" align="left"><div id="divHead" name="divHead"></div></td></tr>		
	</table>
	<center>

<img name="loading" id="loading" src="./images/loader.gif">
</center>
	<div id=divDtls name=divDtls></div>
	
<s:form name="attendanceForm" action="markAttendance" theme="simple">
<table ID="searchtable" width="80%"  cellspacing="0" height="20%"  border="0">
<tr><td><s:fielderror fieldName="errorDetails" /></td></tr>
<TR>
<TD>

	
		
		<%-- <label for="course_id" >Select a Course</label><s:select name="course_id" list="listCourse" 
		   headerKey="-1" headerValue="Course"
        	listKey = "Id" 
        	listValue="courseName"   
        	 />
		<label for="course_id" >Select a Year</label><s:select name="year_id" list="listYear" 
		headerKey="-1" headerValue="Year"
        	listKey = "year_id" 
        	listValue="year_name"
        	label="Select a Year" />
        	
        <label for="course_id" >Select Semester</label><s:select name="sem_id" list="listSemester" 
        headerKey="-1" headerValue="Semester"
        	listKey = "sem_id" 
        	listValue="sem_code"
        	 />
        	
        	 <label for="id" >Select Subject</label><s:select name="subject_id" list="listSubject" 
        	 headerKey="-1" headerValue="Subject"
        	listKey = "id" 
        	listValue="subjectName"
        	 /> --%>
	
		
</TD>
</TR>
<TR>
	<TD><CENTER><s:submit label="Load Sheet" value="Load Sheet" action="loadAttendance"></s:submit></CENTER></TD>
</TR>	
</TABLE>	
<table id="myTable1" width="65%" border="0" cellspacing="1" bordercolor="#999999" class="clsPrintTable">
<TR>
	<TH class="label" align="right" width="2%" rowspan="2" >Roll No.</TH>
	<TH class="label" align="right" width="2%" rowspan="2">Entrollment no.</TH>
	<TH class="label" align="right" width="25%" rowspan="2" >Name of Student</TH><TH rowspan="2">
	<sx:datetimepicker name="attendance_date"  
displayFormat="yyyy-MM-dd"  value="todayDate" ></sx:datetimepicker><s:select
headerKey="-1" headerValue="HH"
list="#{'1':'01', '2':'02', '3':'03', '4':'04'}" 
name="HH" 
value="0"/><s:select 
headerKey="-1" headerValue="MM"
list="#{'1':'01', '2':'02', '3':'03', '4':'30'}" 
name="MM" 
value="0" />
<input type="checkbox" id="cbgroup1_master" checked="checked" onchange="togglecheckboxes(this,'attendanceMarking')"/> 
</TH>
<TR>
<TD></TD><TD></TD><TD></TD><TD></TD><TD></TD>
</TR>

<TR>
<td>

		
</td>
</TR>

<TR>
<TD align="center">	</TD>
</TR>

</TABLE>

 <div id="pageNavPosition" align="center"></div>
 <display:table id="data" name="attendances" requestURI="attendanceReportForm" pagesize="10" export="true">
            <display:column property="roll_no" title="Roll No" sortable="true" media="html" group="1" />
            <display:column property="enrollment_no" title="Enroll Id" sortable="true" />
            <display:column property="student_name" title="Name" sortable="true" />
            <display:column property="attendance" title="attendance" sortable="false" />
            <display:column property="noPeriod_total" title="Total Period" sortable="true" />
            <display:column property="noPeriod_att" title="Number of Period Att." sortable="true" />
            <display:column property="attPer" title="Attendance %" sortable="true" />
            <display:setProperty name="export.excel.filename" value="AttendanceDetails.xls"/>
            <display:setProperty name="export.pdf.filename" value="AttendanceDetails.pdf"/>
            <display:setProperty name="export.pdf" value="true" />
        </display:table>
        </s:form>
</center>
<br>

<center>
	<img src="./images/back.png" title="Back" class="clsDoNotPrint" onClick="javascript:history.back();">
	&nbsp;&nbsp;&nbsp;&nbsp;
	
	

</center>

<div style="z-index:3" id="Div1">&nbsp;</div>
<div style="z-index:3" id="divErrorMsg">&nbsp;</div>

</form>
</body>
<script language="javaScript">
document.loading.src = "./images/done.gif";
</script>

</html>