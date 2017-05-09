<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<title>E-Attendance System</title>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="css/dropdown/dropdown.css" media="all" rel="stylesheet" type="text/css" />
<link href="css/dropdown/themes/iconnect/default.advanced.css" media="all" rel="stylesheet" type="text/css" />
</head>
<body>
<ul id="nav" class="dropdown dropdown-horizontal">
	<li><a href="crm_frames_body.jsp" target="iframe" onMouseOver="window.status='CRM'; return true"
	onMouseOut="window.status='CRM';return true">Home</a></li>
	
	<li><a href="#" class="dir">Student</a>
		<ul>
			<li><a href="studentForm" target="iframe" onMouseOver="window.status='CRM'; return true"
			onMouseOut="window.status='CRM';return true">Admit Student</a></li>
						<li><a href="listStudent" target="iframe" onMouseOver="window.status='CRM'; return true"
			onMouseOut="window.status='CRM';return true">Student Information</a></li>
						<li><a href="crm_frames_body.jsp" target="iframe" onMouseOver="window.status='CRM'; return true"
			onMouseOut="window.status='CRM';return true">Attendance Report </a></li>

			
		</ul>
	
	<li><a href="#" class="dir">Teacher</a>
		<ul>
		<li><a href="teacherForm" target="iframe" onMouseOver="window.status='CRM'; return true"
			onMouseOut="window.status='CRM';return true">Add New Teacher</a></li>


			<!-- <li><a href="TeacherInformation.jsp" target="iframe" onMouseOver="window.status='CRM'; return true"
			onMouseOut="window.status='CRM';return true">List Teacher</a></li> -->
			 <li><a href="listTeacher" target="iframe" onMouseOver="window.status='CRM'; return true"
			onMouseOut="window.status='CRM';return true">List Teacher</a></li> 
			<li><a href="attenanceForm" target="iframe" onMouseOver="window.status='CRM'; return true"
			onMouseOut="window.status='CRM';return true">Attendance Marking</a></li>
			<li><a href="attendanceReportForm" target="iframe" onMouseOver="window.status='CRM'; return true"
			onMouseOut="window.status='CRM';return true">Display Attendance</a></li>
			
			
			<li><a href="AttendanceSheet.jsp" target="iframe" onMouseOver="window.status='CRM'; return true"
			onMouseOut="window.status='CRM';return true">Attendance Sheet</a></li>
			<li><a href="MediaReport.jsp" target="iframe" onMouseOver="window.status='CRM'; return true"
			onMouseOut="window.status='CRM';return true">Teacher's Reports</a></li>

		</ul>
	</li>
	<!-- <li><a href="#" class="dir">Parent</a>
		<ul>
		<li><a href="AddNewParent.jsp" target="iframe" onMouseOver="window.status='CRM'; return true"
			onMouseOut="window.status='CRM';return true">Add New Parent</a></li>


			<li><a href="ParentInformation.jsp" target="iframe" onMouseOver="window.status='CRM'; return true"
			onMouseOut="window.status='CRM';return true">List Parent</a></li>
			<li><a href="ParentsReport.jsp" target="iframe" onMouseOver="window.status='CRM'; return true"
			onMouseOut="window.status='CRM';return true">Parent's Reports</a></li>

		</ul>
	</li> -->
	
	<li><a href="#" class="dir">Notice Board</a>
		<ul>
			<li>
			<a href="noticeForm" target="iframe" onMouseOver="window.status='CRM'; return true"
			onMouseOut="window.status='CRM';return true">Add Notice</a></li>
			<li>
			<a href="ViewNotice.jsp" target="iframe" onMouseOver="window.status='CRM'; return true"
			onMouseOut="window.status='CRM';return true">View Notice</a></li>

		</ul>
	</li>
	
	<li><a href="#" class="dir">Message </a>
		<ul>
			<li>
				<a href="PersonalMessage.jsp" target="iframe" onMouseOver="window.status='CRM'; return true"
				onMouseOut="window.status='CRM';return true">Send Personal Message</a></li>
				<li><a href="SendBulkMessage.jsp" target="iframe" onMouseOver="window.status='CRM'; return true"
			onMouseOut="window.status='CRM';return true">Send Bulk Messages</a></li>
		</ul>
	</li>
	
	<li><a href="#" class="dir">Admin</a>
		<ul>
		<li><a href="listCourse" target="iframe" onMouseOver="window.status='CRM'; return true"
			onMouseOut="window.status='CRM';return true">Manage Courses</a></li>
			
			<li><a href="listSubject" target="iframe" onMouseOver="window.status='CRM'; return true"
			onMouseOut="window.status='CRM';return true">Manage Subjects</a></li>
			<li><a href="listSemester" target="iframe" onMouseOver="window.status='CRM'; return true"
			onMouseOut="window.status='CRM';return true">Manage Semester</a></li>
			<li><a href="listFaculty" target="iframe" onMouseOver="window.status='CRM'; return true"
			onMouseOut="window.status='CRM';return true">Manage Faculty</a></li>
		</ul>
	</li>
	
	<li><a href="#" class="dir">Account</a>
		<ul>
			<li><a href="index.jsp" >Log Out </a></li>
			<li><a href="crm_frames_body.jsp" target="iframe" onMouseOver="window.status='CRM'; return true"
			onMouseOut="window.status='CRM';return true">Manage Account</a></li>
			
		</ul>
	</li>

	</ul>


<iframe
name="iframe"
width="1291"
height="550"
src="crm_frames_body.jsp"
frameborder="yes"
scrolling="yes"
border="4">
</iframe>


</body>
</html>
