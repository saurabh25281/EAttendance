<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sx" uri="/struts-dojo-tags" %>
<html>
<head>
<sx:head/>
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

<BR><BR><BR>
<CENTER><table width="750px" cellpadding='3' class='outter' height="300px">
      <tr>
         <th align="center" scope="col" colspan="7"> Add New Notice</td>
      </tr>
	  <tr>
	  <td>
	<hr color="black" size="1">
<br>
<center>

<s:form action="saveOrUpdateNotice" thean="simple">
	<s:push value="noticeBoard">
		<s:hidden name="notice_id" />
	<table >
	<TR>
		<TD><label for="notice_title">Title</label>:<s:textfield name="notice_title"  placeholder="Notice Title" />  </TD>
	</TR>
	<TR>
		<TD><label for="notice_text">Notice</label><s:textarea name="notice_text" rows="5" cols="30" ></s:textarea>	</TD>
</TR>
<TR>
	<TD><label for="notice_date">Date</label> :<sx:datetimepicker name="notice_date" displayFormat="yyyy-MM-dd"></sx:datetimepicker></TD>
</TR>
<TR>
	<TD><s:submit /></TD>
</TR>
</TABLE>
 </s:push>
 </s:form>
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
</FORM>
</BODY>
<div id="Div1">&nbsp;</div>
</HTML>
