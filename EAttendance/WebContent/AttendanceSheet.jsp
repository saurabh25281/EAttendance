<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
	<META HTTP-EQUIV="Expires" CONTENT="0">
        <META HTTP-EQUIV="Pragma" CONTENT="no-cache">

        <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
        <title>Attendance Sheet</title>
        <LINK rel="stylesheet" type="text/css" href='style/sftstyle.css' media="screen">
	<link rel="stylesheet" type="text/css" href="style/scPrintStyle.css" media="print">
	<script language="JavaScript" src="./scripts/Calendar1.js"> </script>
<meta http-equiv="content-type" content="text/xml; charset=utf-8" >

      <link rel="stylesheet" href="./scripts/cal/winxp.css">
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

<script>
function MakeMany()
{
var y=27;
for(var x=0;x<y;x++)
{
	document.write("<TD class='label' align='center'><input type='text' name="+y+" size='1'/></TD>");
} // end for loop
	document.write("<TD class='label' align='center'><input type='text' name='remark' size='2'/></TD>");
	document.write("<TD class='label' align='center'><input type='text' name='remark' size='4'/></TD>");
}
</script>
</head>



</head>
<body bgcolor="#ffffff">
<form name="frmIncmg" method="post"><center><br>
	<table width="100%" border="0" cellspacing="0">
		<tr><td align="center" class="labelHeader">Attendance Sheet</td></tr>
		<tr><td align="center" class="labelHeader">&nbsp;</td></tr>
		<tr><td class="label" align="left"><div id="divHead" name="divHead"></div></td></tr>		
	</table>
	<center>

<img name="loading" id="loading" src="./images/loader.gif">
</center>
	<div id=divDtls name=divDtls></div>
	
<table ID="searchtable" width="80%"  cellspacing="0" height="20%"  border="0">
<TR>
	<TD align="right">Select Class :</TD>
	<TD>
	<SELECT>
		<OPTION>--Select One--</OPTION>
		<OPTION>1st Year</OPTION>
		<OPTION>2nd Year</OPTION>
		<OPTION>3rd Year</OPTION>
		<OPTION>4th Year</OPTION>
	</SELECT></TD>
	<TD align="right">Select Batch :</TD>
	<TD>
	<SELECT>
		<OPTION>--Select One--</OPTION>
		<OPTION>1G</OPTION>
		<OPTION>2G</OPTION>
		<OPTION>3G</OPTION>
		<OPTION>4G</OPTION>
		<OPTION>5G</OPTION>
		<OPTION>6G</OPTION>
	</SELECT></TD>
	</TD>
	<TD align="right">Select Subject :</TD>
	<TD>
	<SELECT>
		<OPTION>--Select One--</OPTION>
		<OPTION>Subject1</OPTION>
		<OPTION>Subject2</OPTION>
		<OPTION>Subject3</OPTION>
		<OPTION>Subject4</OPTION>
	</SELECT></TD>
	<TD align="right">Select Month :</TD>
	<TD>
	<SELECT>
		<OPTION>--Select One--</OPTION>
		<OPTION>Jan</OPTION>
		<OPTION>Feb</OPTION>
		<OPTION>March</OPTION>
		<OPTION>April</OPTION>
		<OPTION>May</OPTION>
		<OPTION>June</OPTION>
		<OPTION>Jully</OPTION>
		<OPTION>August</OPTION>
		<OPTION>September</OPTION>
		<OPTION>October</OPTION>
		<OPTION>November</OPTION>
		<OPTION>December</OPTION>
	</SELECT></TD>
	</TD>
	<TD><INPUT TYPE="button" value="SEARCH" class="minibtn"> </TD>

</TR>
</TABLE>	

<table id="myTable1" width="100%" border="1" cellspacing="1" bordercolor="#999999" class="clsPrintTable">
<TR>
	<TH class="label" align="right" width="2%" rowspan="2">Roll No.</TH>
	<TH class="label" align="right" width="2%" rowspan="2">Entrollment no.</TH>
	<TH class="label" align="right" width="15%" rowspan="2">Name of Student</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%">&nbsp;</TH>
<TH class="label" align="right" width="2%" colspan="2">No. of Periods </TH>
<TH class="label" align="right" width="2%" rowspan="2">att in %</TH>
<TH class="label" align="right" width="2%" >Remark</TH>
</TR>
<TR>
<TH class="label" align="right">1</TH>
<TH class="label" align="right">2</TH>
<TH class="label" align="right">3</TH>
<TH class="label" align="right">4</TH>
<TH class="label" align="right">5</TH>
<TH class="label" align="right">6</TH>
<TH class="label" align="right">7</TH>
<TH class="label" align="right">8</TH>
<TH class="label" align="right">9</TH>
<TH class="label" align="right">10</TH>
<TH class="label" align="right">11</TH>
<TH class="label" align="right">12</TH>
<TH class="label" align="right">13</TH>
<TH class="label" align="right">14</TH>
<TH class="label" align="right">15</TH>
<TH class="label" align="right">16</TH>
<TH class="label" align="right">17</TH>
<TH class="label" align="right">18</TH>
<TH class="label" align="right">19</TH>
<TH class="label" align="right">20</TH>
<TH class="label" align="right">21</TH>
<TH class="label" align="right">22</TH>
<TH class="label" align="right">23</TH>
<TH class="label" align="right">24</TH>
<TH class="label" align="right">25</TH>
<TH class="label" align="right">total</TH>
<TH class="label" align="right">att.</TH>
<TH class="label" align="right"></TH>

</TR>


<TR>
	<TD class="label" align="center" width="2%">1</TD>
	<TD class="label" align="center" width="15%">11001</TD>
	<TD class="label" align="center" width="2%">Student A</TD>
	  <script>MakeMany();</script>


</TR>
<TR>
	<TD class="label" align="center">2</TD>
	<TD class="label" align="center">11002</TD>
	<TD class="label" align="center">Student B</TD>
	  <script>MakeMany();</script>
</TR>
<TR>
	<TD class="label" align="center">2</TD>
	<TD class="label" align="center">11003</TD>
	<TD class="label" align="center">Student C</TD>
	  <script>MakeMany();</script>
</TR>
<TR>
	<TD class="label" align="center">2</TD>
	<TD class="label" align="center">11004</TD>
	<TD class="label" align="center">Student D</TD>
	  <script>MakeMany();</script>
</TR>
<TR>
	<TD class="label" align="center">2</TD>
	<TD class="label" align="center">11005</TD>
	<TD class="label" align="center">Student E</TD>
	  <script>MakeMany();</script>
</TR>
<TR>
	<TD class="label" align="center">2</TD>
	<TD class="label" align="center">11006</TD>
	<TD class="label" align="center">Student F</TD>
	  <script>MakeMany();</script>
</TR>
<TR>
	<TD class="label" align="center">2</TD>
	<TD class="label" align="center">11007</TD>
	<TD class="label" align="center">Student G</TD>
	  <script>MakeMany();</script>
</TR>



</TABLE>

 <div id="pageNavPosition" align="center"></div>
</center>
<br>

<center>
	<img src="./images/back.png" title="Back" class="clsDoNotPrint" onClick="javascript:history.back();">
	&nbsp;&nbsp;&nbsp;&nbsp;
	
	
<INPUT TYPE="button" value="Save" class="minibtn">
</center>

<div style="z-index:3" id="Div1">&nbsp;</div>
<div style="z-index:3" id="divErrorMsg">&nbsp;</div>

</form>
</body>
<script language="javaScript">
document.loading.src = "./images/done.gif";
</script>

</html>