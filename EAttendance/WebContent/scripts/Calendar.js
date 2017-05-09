var txtTextName;

function onMonthChange()
{
	var intMonth,intYear;
	if(document.all)
	{
		intMonth=document.frmCal.month.value;
		intYear=document.frmCal.txtYear.value;
	}
	else
	{
		intYear=document.layers["Div1"].document.frmCal.txtYear.value;
		intMonth=document.layers["Div1"].document.frmCal.month.options[document.layers["Div1"].document.frmCal.month.selectedIndex].value;
	}
	genCalendar(intYear,intMonth,1,txtTextName);	
}
function incYear()
{
	if(document.all)
	{
		var intYear=document.frmCal.txtYear.value;
		var intMonth=document.frmCal.month.value;
		if(isNaN(intYear))
		{
			intYear=2000;
		}
		intYear++;
		document.frmCal.txtYear.value=intYear;
	}
	else
	{
		var intYear=document.layers["Div1"].document.frmCal.txtYear.value;
		intMonth=document.layers["Div1"].document.frmCal.month.options[document.layers["Div1"].document.frmCal.month.selectedIndex].value;
		intYear++;
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
		var intMonth=document.frmCal.month.value;
		intYear--;
		document.frmCal.txtYear.value=intYear;
	}
	else
	{
		var intYear=document.layers["Div1"].document.frmCal.txtYear.value;
		var intMonth=document.layers["Div1"].document.frmCal.month.options[document.layers["Div1"].document.frmCal.month.selectedIndex].value;
		intYear--;
		document.layers["Div1"].document.frmCal.txtYear.value=intYear;	
	}
	if(intYear<1000)
		intYear=1000;
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
	if(document.all)
	{
		var intYear=document.frmCal.txtYear.value;
		
		if(intYear.length==4)
		{
			if(intYear<1000)intYear=2000;
			var intMonth=document.frmCal.month.value;
			genCalendar(intYear,intMonth,1,txtTextName);
		}
	}
	else
	{
		var intYear=document.layers["Div1"].document.frmCal.txtYear.value;
		
		if(intYear.length==4)
		{	
			if(intYear<1000)intYear=2000;
			var intMonth=document.layers["Div1"].document.frmCal.month.options[document.layers["Div1"].document.frmCal.month.selectedIndex].value;
			genCalendar(intYear,intMonth,1,txtTextName);
		}		
	}	
}
function genCal(obj)
{
//alert(obj);
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
		dtDate=intDay+"/";
	}
	else
	{
		dtDate=intDay+"/";
	}
	if((intMonth)<9)
	{
		dtDate+=(intMonth+1)+"/";
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
	writeDate("","");
}
function genCalendar(intYear,intMonth,intDay,obj)
{	
	var arrDays=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	var strHTML=new String();
	var intTemp=0;
	if(isNaN(intYear))
	{
		intYear=2000;
	}
	var dtDate=new Date(intYear,intMonth,1);
	var intWeekDay=dtDate.getDay();
	strHTML="<Form name=frmCal>";
	strHTML+="<TABLE WIDTH='35%' BGCOLOR='#A5BADE' ALIGN='left' BORDER='1' CELLSPACING='1' CELLPADDING='1'>"
	strHTML+="<TR><TD colspan=7><font size=-1><Select name=month onChange=onMonthChange() Style='COLOR: black; FONT-FAMILY:Verdana'>";
	strHTML+="<Option value=0>Jan</Option>";
	strHTML+="<Option value=1>Feb</Option>";
	strHTML+="<Option value=2>Mar</Option>";
	strHTML+="<Option value=3>Apr</Option>";
	strHTML+="<Option value=4>May</Option>";
	strHTML+="<Option value=5>June</Option>";
	strHTML+="<Option value=6>July</Option>";
	strHTML+="<Option value=7>Aug</Option>";
	strHTML+="<Option value=8>Sep</Option>";
	strHTML+="<Option value=9>Oct</Option>";
	strHTML+="<Option value=10>Nov</Option>";
	strHTML+="<Option value=11>Dec</Option>";
	strHTML+="</Select>";
	strHTML+="<INPUT style='COLOR: black;font-size:8pt ' type=button value='<-' name=Prev onClick=decYear()>";
	strHTML+="<INPUT readonly style='COLOR: black;  FONT-FAMILY:Verdana 'type=text name=txtYear size=4 value="+intYear+" maxlength=4 onKeyUp=genKeyUp() onKeyPress='return IsNumber()'>";
	strHTML+="<INPUT style='COLOR: black;font-size:8pt ' type=button value='->' name=Next onClick=incYear()></font>&nbsp;<a href='#' onClick='hideCal()'><font color='Black'><b>x</b><font></a>&nbsp;</TD></TR>";
	strHTML+="<TR><TD align=middle bgcolor='#efefef'><font color='red' size='-1'><B>S</B></font></TD><TD align='middle' bgcolor='#efefef'><font color='Brown' size='-1'><B>M</B></font></TD>"
	strHTML+="<TD align='middle' bgcolor='#efefef'><font color='Brown' size='-1'><B>T</B></font></TD><TD align='middle' bgcolor='#efefef'><font color='Brown' size='-1'><B>W</B></font></TD>"
	strHTML+="<TD align='middle' bgcolor='#efefef'><font color='Brown' size='-1'><B>T</B></font></TD><TD align='middle' bgcolor='#efefef'><font color='Brown' size='-1'><B>F</B></font></TD>"
	strHTML+="<TD align='middle' bgcolor='#efefef'><font color='Brown' size='-1'><B>S</B></font></TD></font></TR>"
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
		strHTML=strHTML+"<B><font size='-1' color='black'>"+intCount+"</font></B></a></TD>";
		intTemp++;
		if(intTemp>6)
		{
			strHTML=strHTML+"</TR>";
			intTemp=0;
		}
	}
	strHTML+="</TABLE></FORM>"
	if (navigator.appName=="Netscape"){
		document.layers["Div1"].document.write(strHTML);
		document.layers["Div1"].document.frmCal.txtYear.value=intYear;
		document.layers["Div1"].document.frmCal.month.selectedIndex=intMonth;	
		document.layers["Div1"].visibility="visible";
		//document.layers["Div1"].document.frmCal.txtYear.focus();
		document.close();
	}
	else
	{
		document.all["Div1"].innerHTML=strHTML;
		document.frmCal.txtYear.value=intYear;
		document.frmCal.month.selectedIndex=intMonth;
		document.all["Div1"].style.visibility="visible";
		document.frmCal.txtYear.focus();
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
