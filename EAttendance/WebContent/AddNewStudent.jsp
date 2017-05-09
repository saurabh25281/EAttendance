<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sx" uri="/struts-dojo-tags" %>
<html>
<head>
<sx:head />
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

<center>
<table width="750px" class='outter' height="300px" border="1">
<tr>
	<th align="center" colspan="6" scope="col" >Admit Student</th>
</tr>
<tr>
	<td>
	<hr color="black" size="1">
	</td>
	</tr>
	<tr><td>
<table width="750px"  border="2">
<s:form action="saveOrUpdateStudent" theme="simple">
<s:push value="student">
<tr>
	<th colspan="2">Student Information</th>
</tr>
<tr>
	<td>
	
		<s:hidden name="id" /><table>
			<tr><td><label for="roll_no" class="label">Roll No:</label></td><td><s:textfield name="roll_no" placeholder="Roll No" readonly="true"/><br></td></tr>
			<tr><td><label for="first_name" class="label">Student Name:</label></td><td><s:textfield name="first_name" label="Student Name" placeholder="First Name"/> <s:textfield name="middle_name"  placeholder="Middle Name"/> <s:textfield name="last_name"  placeholder="Last Name"/><br></td>
		   	<tr><td><label for="address" class="label">Address:</label></td><td><s:textarea name="address"></s:textarea><br></td></tr>
		   	<tr><td>
		   	<sx:datetimepicker name="date_of_birth" label="Date Of Birth" 
displayFormat="yyyy-MM-dd"  value="%{date_of_birth}" ></sx:datetimepicker>
		   	<br></td>
		   	
		   	
		   	<tr><td><label for="gender" class="label">Gender:</label></td><td><s:select 
																				headerKey="-1" headerValue="Select one"
																				list="#{'Male':'Male', 'Female':'Female'}" 
																				name="gender" 
																				value="1" /><br></td></tr>
																				
			<tr><td>
			<label for="course_id" class="label">Course:</label></td><td><s:select name="course_id" list="courseList" 
													        	listKey = "Id" 
													        	listValue="courseName"
													        	label="Select a Course" />
			</td>
			</tr>
			<tr><td>										        
			<label for="year_id" class="label">Year:</label></td><td><s:select name="year_id" list="yearList" 
														        	listKey = "year_id" 
														        	listValue="year_name"
														        	label="Select a Year" />
			</td>
			</tr>
			<tr><td>
        	<label for="sem_id" class="label">Semester :</label></td><td><s:select name="sem_id" list="semesterList" 
														        	listKey = "sem_id" 
														        	listValue="sem_code"/></td></tr>
		  
			<tr><td><label for="phone" class="label">Phone:</label></td><td><s:textfield name="phone" placeholder="10 Digit Mobile No"/><br></td></tr>
		    <tr><td><label for="login" class="label">Login Id:</label></td><td><s:textfield name="login"  placeholder="Login id"/><label for="password" class="label">Password:</label><s:password name="password" placeholder="Password"/><br></td></tr>
			</table>
	</td>
</tr>
<tr>
	<th colspan="6">Parents Information</th>
	
</tr>
<tr>
<td>
		<table>
		<tr><td><label for="pfirst_name" class="label">Parent Name:</label></td><td><s:textfield name="pfirst_name" label="Name" placeholder="First Name"/> <s:textfield name="plast_name"  placeholder="Last Name"/><br></td></tr>
		<tr><td><label for="pphone" class="label">Phone No:</label></td><td><s:textfield name="pphone" label="Mobile No" placeholder="10 Digit Mobile No"/></td></tr>
		<tr><td><label for="paddress" class="label">Address:</label></td><td><s:textarea name="paddress" label="Address"></s:textarea><br></td></tr>
		<tr><td><label for="pprofession" class="label">Profession:</label></td><td><s:textfield name="pprofession" label="Profession" placeholder="Profession"/></td></tr>
		<tr><td><label for="plogin" class="label">Login Id:</label></td><td><s:textfield name="plogin" label="Login Id" placeholder="Login id"/><label for="ppassword" class="label">Password :</label><s:password name="ppassword" label="Password" placeholder="Password"/></td></tr>
		</table>
		
</td>
</tr>
<tr><td><s:submit /></td></tr>
</s:push></s:form>
</table>
</td></tr>

</table>
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
