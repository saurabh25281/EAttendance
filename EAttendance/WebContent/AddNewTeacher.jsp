<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<%@ taglib prefix="s" uri="/struts-tags" %>
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
<CENTER>
<s:form action="saveOrUpdateTeacher"  method="POST" theam="simple" enctype="multipart/form-data">

<s:push value="teacher">
		<s:hidden name="teacher_id" />
<BR><BR><BR>

 
<table width="750px" cellpadding='3' class='outter' height="300px">
      <tr>
         <th align="center" scope="col" > Add New Teacher</td>
      </tr>
	  <tr>
	  <td>
	<hr color="black" size="1">
<br>
<center>
<table ID="MediaTable" width="80%"  border="0" cellspacing="0" height="300px"  >
<TR>
	<TD>
	<s:textfield  name="first_name" label="First Name"/>  <s:textfield  name="last_name" label="Last Name"/>  </TD>
</TR>

<TR>
	
	<TD><s:textfield  name="phone" label="Mobile No "/> </TD>
</TR>

<TR>
	<TD><s:textarea  name="address" label="Address" cols="20" rows="3" wrap="true"></s:textarea></TD>
</TR>
<TR>
	
	<TD><s:textfield  name="login" label="Login Id "/> </TD>
</TR>
<TR>
	<TD><s:password  name="password" label="Password"/> </TD>
</TR>

<%-- <TR>
	<TD><s:file name="photo" label="Image File" /></TD>
	<TD></TD>
</TR>
 --%><TR>
	<TD><s:submit value="Submint" class="minibtn" align="center" /> &nbsp; <s:submit value="Cancel" class="minibtn" align="center" /></TD>
</TR>
</TABLE>
</center>
</TABLE>
<hr color="black" size="1">
<table width="70%" border="0" align="left"  cellspacing="0">
	<tr>
		<td width="20%" align="left" class="label" style="color:red">&nbsp;&nbsp;&nbsp;
			Note : Fields Marked with * are Mandatory
		</td>
	</tr>
</table>

</s:push>
</s:form>
</CENTER>
</BODY>
<div id="Div1">&nbsp;</div>
</HTML>
