var txtTextName;
var arrMonth=new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec')
var intCurDay,intCurMonth,intCurYear
var dtCurDate=new Date()
intCurDay=dtCurDate.getDate()
intCurMonth=dtCurDate.getMonth()
intCurYear=dtCurDate.getFullYear()
	
function incMonth()
{
	var intMonth,intYear
	if(document.all)
	{
		intMonth=document.frmCal.hdnMonth.value;
		intYear=document.frmCal.txtYear.value;
	}
	else
	{
		intYear=document.layers["Div1"].document.frmCal.txtYear.value;
		intMonth=document.layers["Div1"].document.frmCal.hdnMonth.value;
	}
	intMonth++
	if(intMonth>11)
		intMonth=0
	genCalendar(intYear,intMonth,1,txtTextName)		
}
function decMonth()
{
	var intMonth,intYear
	if(document.all)
	{
		intMonth=document.frmCal.hdnMonth.value;
		intYear=document.frmCal.txtYear.value;
	}
	else
	{
		intYear=document.layers["Div1"].document.frmCal.txtYear.value;
		intMonth=document.layers["Div1"].document.frmCal.hdnMonth.value;
	}
	intMonth--
	if(intMonth<0)
		intMonth=11
	genCalendar(intYear,intMonth,1,txtTextName)	
}
function incYear()
{
	if(document.all)
	{
		var intYear=document.frmCal.txtYear.value;
		var intMonth=document.frmCal.hdnMonth.value;
		intYear++;
		if(intYear<1900)
		{
			var dtDate1=new Date();
			intYear=dtDate1.getFullYear();		
		}
		document.frmCal.txtYear.value=intYear;
	}
	else
	{
		var intYear=document.layers["Div1"].document.frmCal.txtYear.value;
		var intMonth=document.layers["Div1"].document.frmCal.hdnMonth.value;
		if(isNaN(intYear))
		{
			var dtDate1=new Date();
			intYear=dtDate1.getFullYear();
		}
		intYear++;
		if(intYear<1900)
		{
			var dtDate1=new Date();
			intYear=dtDate1.getFullYear();		
		}
		document.layers["Div1"].document.frmCal.txtYear.value=intYear;	
	}
	if(intYear>9999)
		intYear=9999;
	genCalendar(intYear,intMonth,1,txtTextName);	
}
function decYear()
{
	if(document.all)
	{
		var intYear=document.frmCal.txtYear.value;
		var intMonth=document.frmCal.hdnMonth.value;
		intYear--;
		if(intYear<1900)
		{
			var dtDate1=new Date();
			intYear=dtDate1.getFullYear();		
		}
		document.frmCal.txtYear.value=intYear;
	}
	else
	{
		var intYear=document.layers["Div1"].document.frmCal.txtYear.value;
		var intMonth=document.layers["Div1"].document.frmCal.hdnMonth.value;
		if(isNaN(intYear))
		{
			var dtDate1=new Date();
			intYear=dtDate1.getFullYear();
		}
		intYear--;
		document.layers["Div1"].document.frmCal.txtYear.value=intYear;	
	}
	if(intYear<1900)
		intYear=1900;
	genCalendar(intYear,intMonth,1,txtTextName);	
}
function IsNumber()
{
   if ((window.event.keyCode < 48) || (window.event.keyCode > 57))
   {
      return false;
   }
}
function genKeyUp()
{
	var intYear=document.frmCal.txtYear.value;
	if(intYear.length==4)
	{
		if(intYear<1900)
		{
			var dtDate1=new Date();
			intYear=dtDate1.getFullYear();
		}
		var intMonth=document.frmCal.hdnMonth.value;
		genCalendar(intYear,intMonth,1,txtTextName);
	}
}
function genCal(obj)
{
	//alert("gencal");
	var dtDate=new Date();
	var intYear=dtDate.getFullYear();
	var intMonth=dtDate.getMonth();
	var intDay=dtDate.getDate();
	txtTextName=obj;
	genCalendar(intYear,intMonth,intDay,obj);
}
function giveDate(intDay,intMonth,intYear,obj)
{	var dtDate;
	if(intDay<10)
	{
		dtDate="0"+intDay+"/";
	}
	else
	{
		dtDate=intDay+"/";
	}
	if((intMonth)<9)
	{
		dtDate+="0"+(intMonth+1)+"/";
	}
	else
	{
		dtDate+=(intMonth+1)+"/";
	}
	dtDate+=intYear;
	writeDate(obj,dtDate);
}
function hideCal()
{
	if(document.all)
	{
		document.all["Div1"].style.visibility="Hidden";
	}
	else
	{	
		document.layers["Div1"].visibility="Hidden";
	}	
}

function genCalendar(intYear,intMonth,intDay,obj)
{	
    //alert("gencalendar");
	var arrDays=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	var strHTML=new String();
	var intTemp=0;
	if(isNaN(intYear))
	{
		var dtDate1=new Date();
		intYear=dtDate1.getFullYear();
	}
	var dtDate=new Date(intYear,intMonth,1);
	var intWeekDay=dtDate.getDay();
	strHTML="<Form name=frmCal>";
	strHTML+="<TABLE WIDTH='150' BGCOLOR='white' ALIGN='left' BORDER='1' CELLSPACING='1' CELLPADDING='1'>"
	strHTML+="<TR><TD colspan=7><a href='javascript:decMonth()'><img src='images/Left.gif' align='middle' alt='Prev Month' border=0></a>"
	if(document.all)
	{
		strHTML+="<font size=-1><input style='COLOR: green;FONT-WEIGHT: bolder;' type='text' size=3 name='txtMonth' value='0' onFocus='this.blur()'></font>";
	}
	else
	{
		strHTML+="<font size=-1><input style='COLOR: green;FONT-WEIGHT: bolder;' type='text' size=4 name='txtMonth' value='0' onFocus='this.blur()'></font>";
	}
	strHTML+="<input type='hidden' name='hdnMonth' value=0>"
	strHTML+="<a href='javascript:incMonth()'><img src='images/Right.gif' align='middle' alt='Next Month' border=0></a>";
	strHTML+="<a href='javascript:decYear()'><img src='images/Left.gif' align='middle' alt='Prev Year' border=0></a>";
	if(document.all)
	{
		strHTML+="<font size=-1><INPUT style='COLOR: green;FONT-WEIGHT: bolder;' type=text name=txtYear size=3 value="+intYear+" maxlength=4 onKeyUp=genKeyUp() onKeyPress='return IsNumber()'></font>";
	}
	else
	{
		strHTML+="<font size=-1><INPUT type=text name=txtYear size=5 value="+intYear+" maxlength=4 onFocus='this.blur()'></font>";
	}
	strHTML+="<a href='javascript:incYear()'><img src='images/Right.gif' align='middle' alt='Next Year' border=0></a></font>"
	strHTML+="<a href='#' onClick='hideCal()'><img src='images/Exit_sel.gif' width=10 height=10 border=0 alt='Close'></a></TD></TR>";
	strHTML+="<TR><TD align=middle bgcolor='Silver'><font color='red' size='-1'><B>S</B></font></TD><TD align='middle' bgcolor='Silver'><font color='blue' size='-1'><B>M</B></font></TD>"
	strHTML+="<TD align='middle' bgcolor='Silver'><font color='blue' size='-1'><B>T</B></font></TD><TD align='middle' bgcolor='Silver'><font color='blue' size='-1'><B>W</B></font></TD>"
	strHTML+="<TD align='middle' bgcolor='Silver'><font color='blue' size='-1'><B>T</B></font></TD><TD align='middle' bgcolor='Silver'><font color='blue' size='-1'><B>F</B></font></TD>"
	strHTML+="<TD align='middle' bgcolor='Silver'><font color='blue' size='-1'><B>S</B></font></TD></font></TR>"
	strHTML+="<TR>";
	for(var intCount=0;intCount<intWeekDay;intCount++)
	{
	strHTML=strHTML+"<TD></TD>";
	intTemp++;
	}
	if(intMonth==1)
	{
		if((intYear%4)==0)
		{
			arrDays[1]=29;
			if((intYear%100)==0 && (intYear%400)!=0)
			{
				arrDays[1]=28;
			}
		}
	}
	for(var intCount=1;intCount<=arrDays[intMonth];intCount++)
	{
		if(intTemp==0)
			strHTML=strHTML+"<TR>";
		strHTML=strHTML+"<TD align='middle'><a style='A:link{COLOR:brown;TEXT-DECORATION:none;} A:visited{COLOR:brown;TEXT-DECORATION: none;}'"
		strHTML=strHTML+"href=javascript:giveDate("+intCount+","+intMonth+","+intYear+","+"'"+obj+"'"+")>";
		if(intCurYear==intYear && intCurMonth==intMonth && intCurDay==intCount)
		{
			strHTML=strHTML+"<B><font size='-1' color='Blue'>"+intCount+"</font></B></a></TD>";
		}
		else
		{
			if(intTemp==0)
			{
				strHTML=strHTML+"<B><font size='-1' color='red'>"+intCount+"</font></B></a></TD>";
			}
			else
			{
				strHTML=strHTML+"<B><font size='-1' color='brown'>"+intCount+"</font></B></a></TD>";
			}
		}
		intTemp++;
		if(intTemp>6)
		{
			strHTML=strHTML+"</TR>";
			intTemp=0;
		}
	}
	strHTML+="</TABLE></FORM>"
	if(document.all)
	{
		document.all["Div1"].innerHTML=strHTML;
		document.frmCal.txtYear.value=intYear;
		document.frmCal.hdnMonth.value=intMonth;
		document.frmCal.txtMonth.value=arrMonth[intMonth];
		document.all["Div1"].style.visibility="visible";
	}
	else
	{
		document.layers["Div1"].document.write(strHTML);
		document.layers["Div1"].document.frmCal.txtYear.value=intYear;
		document.layers["Div1"].document.frmCal.hdnMonth.value=intMonth;
		document.layers["Div1"].document.frmCal.txtMonth.value=arrMonth[intMonth];	
		document.layers["Div1"].visibility="visible";
		document.close();	
	}
}
function invisible()
{
	if(document.all)
	{
		document.all["Div1"].style.visibility="Hidden";
	}
	else
	{
		document.layers["Div1"].visibility="Hidden";
	}	
}
