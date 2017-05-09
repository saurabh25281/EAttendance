<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head>
	<title>Courses</title>
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
 <table width="100%" border="0" cellspacing="0">
		<tr><td align="center" class="labelHeader">Notice Board List</td></tr>
		<tr><td align="center" class="labelHeader">&nbsp;</td></tr>
		<tr><td class="label" align="left"><div id="divHead" name="divHead"></div></td></tr>		
	</table>
	<center>



<s:if test="noticeboardList.size() > 0">
	<div class="content">
	<table class="noticeBoardTable" cellpadding="5px">
		<tr class="even">
			<th>Title</th>
			<th>Notice</th>
			<th>Date</th>
			<th>Edit</th>
			<th>Delete</th>
		</tr>
		<s:iterator value="noticeboardList" status="noticeStatus">
			<tr
				class="<s:if test="noticeStatus.odd == true ">odd</s:if> <s:else>even</s:else>">
				<td><s:property value="notice_title" /></td>
				<td><s:property value="notice_text" /></td>
				<td><s:property value="notice_date" /></td>
				<td>
                <s:url id="editURL" action="editNotice">
					<s:param name="notice_id" value="%{notice_id}"></s:param>
				</s:url>
                <s:a href="%{editURL}">Edit</s:a>
                </td>
				<td>
                <s:url id="deleteURL" action="deleteNotice">
					<s:param name="notice_id" value="%{notice_id}"></s:param>
				</s:url>
                <s:a href="%{deleteURL}">Delete</s:a>
                </td>
			</tr>
		</s:iterator>
	</table>
	</div>
</s:if>
</center>
<hr color="black" size="1">
<table width="70%" border="0" align="left"  cellspacing="0">
	<tr>
		<td width="20%" align="left" class="label" style="color:red">&nbsp;&nbsp;&nbsp;
			Note : Fields Marked with * are Mandatory
		</td>
	</tr>
</table>

</BODY>
<div id="Div1">&nbsp;</div>
</HTML>
