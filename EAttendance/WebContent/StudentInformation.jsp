<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

<html>
<head>
	<title>Reports</title>
</head>
<LINK href='./style/sftstyle.css' rel=stylesheet>
<script language="JavaScript" src="./scripts/Calendar1.js"> </script>
<meta http-equiv="content-type" content="text/xml; charset=utf-8" >

      <link rel="stylesheet" href="./scripts/cal/winxp.css">
      <script type="text/javascript" src="./scripts/cal/utils.js"></script>
      <script type="text/javascript" src="./scripts/cal/calendar.js"></script>
      <script type="text/javascript" src="./scripts/cal/calendar-setup.js"></script>
      <script type="text/javascript" src="./scripts/cal/calendar-en.js"></script>
<style>
	#Div1 {position:absolute; visibility:visible; Top:250px; left:450px; Z-index:1}
	#Div1 {position:absolute; visibility:visible; Top:150px; left:450px; Z-index:6} 

	.outter{
    border-top: 1px solid #d6d6d6;
    border-right: 3px solid #d6d6d6;
    border-bottom: 3px solid #d6d6d6;
    border-left: 1px solid #d6d6d6;
    background-color:#FFFFFF;
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
</style>

<!--<script src="./js/datevalidation.js"></script>-->
<body bgcolor="#ffffff">
<FORM METHOD=POST ACTION="">
<BR><BR><BR>
<CENTER>

<table width="85%" cellpadding='0' class='outter' height="21%">
      <tr>
         <th align="center" scope="col" colspan="6"> Filter Student</td>
      </tr>
	  <tr>
	  <td colspan="6">
	<hr color="black" size="1">
	
	
<br>
<center>
<table ID="searchtable" width="80%"  cellspacing="0" height="20%"  border="0">
<TR>
	<TD>Select Class :</TD>
	<TD>
	<SELECT>
		<OPTION>--Select One--</OPTION>
		<OPTION>1st Year</OPTION>
		<OPTION>2nd Year</OPTION>
		<OPTION>3rd Year</OPTION>
		<OPTION>4th Year</OPTION>
	</SELECT></TD>
	<TD><INPUT TYPE="button" value="SEARCH" class="minibtn"> </TD>

</TR>
</TABLE>
</center>
	<tr >
         <th colspan="6" align="center" scope="col">Student Information</td>
      </tr>
	 
	  
	<tr>
		<td>Roll no</td><td>Photo</td><td>Name</td><td>Address</td><td>Email</td><td>Option</td>
	</tr>
<br>
<center>
</TABLE>


</FORM>
</BODY>
<div id="Div1">&nbsp;</div>
</HTML>
