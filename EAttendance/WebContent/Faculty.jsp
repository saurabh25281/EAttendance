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
		<tr><td align="center" class="labelHeader">Manage Faculty</td></tr>
		<tr><td align="center" class="labelHeader">&nbsp;</td></tr>
		<tr><td class="label" align="left"><div id="divHead" name="divHead"></div></td></tr>		
	</table>
	<center>
<s:form action="saveOrUpdateFaculty">
	<s:push value="faculty">
		<s:hidden name="faculty_id" />
		
		<s:select name="teacher_id" list="teacherList" 
        	listKey = "teacher_id" 
        	listValue="first_name"
        	label="Select  Teacher" />
		
		
		<s:select name="course_id" list="courseList" 
        	listKey = "id" 
        	listValue="courseName"
        	label="Select Course" />
		<s:submit />
	</s:push>
</s:form>

<s:if test="facultyList.size() > 0">
	<div class="content">
	<table class="facultyTable" cellpadding="5px">
		<tr class="even">
			<th>Teacher Name</th>
			<th>Course Name</th>
			<th>Edit</th>
			<th>Delete</th>
		</tr>
		<s:iterator value="facultyList" status="facultyListatus">
			<tr
				class="<s:if test="facultyListatus.odd == true ">odd</s:if> <s:else>even</s:else>">
			
				<td><s:set var="cid" value="'course_id'" scope="page" />
				
				<s:iterator value="courseList" status="courseListStatus">
				<s:if test="id ==course_id ">
					<s:property value="courseName"/>
				 </s:if>
				</s:iterator> 
				</td>
				<td>
				 <s:set var="yid" value="%{teacher_id}"/>
				<s:iterator value="teacherList" status="teacherListStatus">
				
				<s:if test="%{#yid==teacher_id}">
					<s:property value="first_name"/>
				 </s:if>
				</s:iterator>  
				</td>
				<td>
                <s:url id="editURL" action="editFaculty">
					<s:param name="faculty_id" value="%{faculty_id}"></s:param>
				</s:url>
                <s:a href="%{editURL}">Edit</s:a>
                </td>
				<td>
                <s:url id="deleteURL" action="deleteFaculty">
					<s:param name="faculty_id" value="%{faculty_id}"></s:param>
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
