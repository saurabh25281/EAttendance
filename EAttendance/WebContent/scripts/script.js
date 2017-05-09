var dtCh= "-";
var thetime=new Date();
var maxDay=thetime.getDate();
var maxMonth=thetime.getMonth()+ 1;
var minYear=1900;
var maxYear=2200;//thetime.getYear();
var monbtwn=0;

function isInteger(s){	
	if(s.match(/^\d+$/))    
		return true;
	else return false;
}

function stripCharsInBag(s, bag){
	var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++){   
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function daysInFebruary (year){
	// February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}
function DaysArray(n) {
	for (var i = 1; i <= n; i++) {
		this[i] = 31
		if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
		if (i==2) {this[i] = 29}
   } 
   return this
}

function isDate(dtStr){
	var daysInMonth = DaysArray(12)
	var pos1=dtStr.indexOf(dtCh)
	var pos2=dtStr.indexOf(dtCh,pos1+1)
	var strDay=dtStr.substring(0,pos1)
	var strMonth=dtStr.substring(pos1+1,pos2)
	var strYear=dtStr.substring(pos2+1)
	strYr=strYear
	if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
	if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
	for (var i = 1; i <= 3; i++) {
		if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
	}
	month=parseInt(strMonth)
	day=parseInt(strDay)
	year=parseInt(strYr)
	if (pos1==-1 || pos2==-1){
		alert("The date format should be : dd-mm-yyyy")
		return false
	}
	if (strMonth.length<1 || month<1 || month>12){
		alert("Please enter a valid month")
		return false
	}
	if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
		alert("Please enter a valid day")
		return false
	}
	if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
		alert("Please enter a valid 4 digit year between "+minYear+" and "+maxYear)
		return false
	}
	if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
		alert("Please enter a valid date");
		return false
				
	}
	if(year>maxYear){
		alert("Entered date exceeds system date	");
		return false
	}else if(year==maxYear && month>maxMonth){
		alert("Entered date exceeds system date	");
		return false
	}else if(year==maxYear && month==maxMonth && day>maxDay){
		alert("Entered date exceeds system date	");
		return false
	}
	return true
}

function USdate(date){
	var pos1=date.indexOf(dtCh);
	var pos2=date.indexOf(dtCh,pos1+1);
	var strDay=date.substring(0,pos1);
	var strMonth=date.substring(pos1+1,pos2);
	var strYear=date.substring(pos2+1);
	usdate=strMonth+'-'+strDay+'-'+strYear;
return usdate;
}

function months_between(fromdate,todate){
monbtwn=(todate.getFullYear()-fromdate.getFullYear())*12+(todate.getMonth()-fromdate.getMonth())
	if(todate.getDate()<fromdate.getDate()){
		monbtwn= monbtwn-1;			
	}	
return monbtwn;
}

function get_broken_date(fromdate,qtrs,f){	
	var year=Math.floor(qtrs*f/12);//number of years in the quarters	
	var month=qtrs*f-12*year + fromdate.getMonth()+1;//months remaining after deducting full years+actual start date	
	var setmonth=month - Math.floor((month-1)/12)*12;//month to be set in date	adjusted to calendar
	year=year+fromdate.getFullYear() + Math.floor((month-1)/12);//year to be set in date adjusted to calendar
	var setdate=fromdate.getDate();
	var daysInMonth = DaysArray(12);
	if(setdate>daysInMonth[setmonth]){		
		setdate=daysInMonth[setmonth];
		if (setmonth==2)
		setdate=daysInFebruary(year);		
	}		
	//for last day of month
	if(fromdate.getMonth()==1){//February
		if((fromdate.getDate() == 29 && setdate!=daysInMonth[setmonth]) || 
		(daysInFebruary(year)==28 && fromdate.getDate()== 28 && setdate!=daysInMonth[setmonth])){
			setdate=daysInMonth[setmonth];			
			if(setmonth==2)
				setdate=daysInFebruary(year);
		}
	}else{
		if(fromdate.getDate()==daysInMonth[fromdate.getMonth()+1] && setdate!=daysInMonth[setmonth])
			setdate=daysInMonth[setmonth];			
	}
	var broken_start_date=new Date(setmonth+'-'+setdate+'-'+year);	
	return broken_start_date;
}

function yearDifference(dt1,dt2, years) {
   var date1,date2;
   var month1,month2;
   var year1,year2;

   date1 = dt1.getDate();
   month1 = dt1.getMonth();
   year1 = dt1.getFullYear();
   date2 = dt2.getDate();
   month2 = dt2.getMonth();
   year2 = dt2.getFullYear();

   if ((year2-year1) > years){	   
	   return true;
   }else if ((year2-year1)==18){
		if (month2 > month1){
			return true;
		}else if (month2 == month1){
			if (date2 > date1){
				return true;			
			}
		}
   }
   else return false;
} 

function cancel()
{		
	window.location="fd_home.html";
}
function back()
{	
	window.history.back();
}



function numValidation(txt_obj){
// This Function Blocks the User From Entering Alphabets/ AlphaNumeric Data...
//(Only NUMBERS ARE allowed to enter)
// It Does Not Return Any Value...
	var i,f=1;
	var val_data = txt_obj.value;
	for(i=0; i<val_data.length; i++)
	{
		if(val_data.charAt(i)>=':' && val_data.charAt(i)<='~' || val_data.charAt(i)>='!' && val_data.charAt(i)<='+' || val_data.charAt(i)=='/')
		{
			f=0;
		}
		
	}
	if(f==0)
	{
		alert("Please Enter Digits Only.... ");
		txt_obj.value="";
		txt_obj.focus();
	}
}

function charsOnly(name){
	var a=name.value;
	var flag=1,i;

for(i=0;i<a.length;i++){
		if(a.charAt(i)>='!' && a.charAt(i)<=',' || a.charAt(i)>='/' && a.charAt(i)<='@' || a.charAt(i)>='[' && a.charAt(i)<='`' || a.charAt(i)>='{' && a.charAt(i)<='’'){
				flag=0;}
	}
		if(flag==0){
			alert("Please Enter Only Characters");
			name.value="";
		}
}

function TextToDate(dateString,dateSeperator){
	//This function return a date object after accepting 
	//a date string ans dateseparator as arguments
	var curValue=dateString;
	var sepChar=dateSeperator;
	var curPos=0;
	var cDate,cMonth,cYear;

	//extract day portion
	curPos=dateString.indexOf(sepChar);
	cDate=dateString.substring(0,curPos);
	
	//extract month portion				
	endPos=dateString.indexOf(sepChar,curPos+1);
	cMonth=dateString.substring(curPos+1,endPos);

	//extract year portion				
	curPos=endPos;
	endPos=curPos+5;			
	cYear=curValue.substring(curPos+1,endPos);
	
	//Create Date Object
	dtObject=new Date(cYear,cMonth-1,cDate);	
	return dtObject;
}
function chksysDate(dat){
//This Function Check whether the Date Provided is Greater than Sys Date Or Not
// if it is Smaller than SysDate, then it thows an Error
	var userdate = TextToDate(dat.value,"/");
	var dt = new Date();
	var sysdate = TextToDate(dt.getDate()+"/"+(dt.getMonth()+1)+"/"+dt.getYear(),"/");
	if(userdate<sysdate){
		alert(" Invalid Date!!Date Should be on or after :: "+dt.getDate()+"/"+(dt.getMonth()+1)+"/"+dt.getYear());
		dat.value="";
		return false;
	}else{ return true; }
}
function chkTwoDate(dat,dat1){
// This Function Checks Whether Dat1 Falls Before or After Dat
// if it Dat1 falls Before Dat then it throws error
	userdate = TextToDate(dat.value,"/");
	userdate1 = TextToDate(dat1.value,"/");
	if(userdate>=userdate1){
		alert("TO Date Should be Greater Than FROM Date");
		dat1.value="";
		return false;
	}else{return true;}
}
	function msgType(obj){
	var i,f=1;
	var val_data = obj.value;
	for(i=0; i <val_data.length; i++)
	{
		if(val_data.charAt(i)>=':' && val_data.charAt(i)<='~' || val_data.charAt(i)>='!' && val_data.charAt(i)<='+' || val_data.charAt(i)=='/')
		{
			f=0;
		}
		
	}
	if(f==0)
	{
		alert("Please Enter Digits Only.... ");
		obj.value="";
		obj.focus();
	}
   var chkbox = document.getElementById("otherRadio").checked;
	if(val_data!= ""){
	 document.messageSch.action = "IC_MsgSetup_chkMessageStatus.jsp?messageType="+val_data;
	 document.messageSch.submit();
	}
	if(val_data!= "" && chkbox == true){
	 //alert(document.getElementById("messageType").value);
	 //alert(val_data);
	 document.messageSch.action = "IC_MsgSetup_chkMessageStatus.jsp?messageType="+document.getElementById("messageType").value+"&splitMessageType="+val_data+"&chkbox="+chkbox;
	 document.messageSch.submit();
	}
}

function charsOnlyForOpt(name){
	var a=name.value;
	var flag=1,i;

for(i=0;i<a.length;i++){
		if(a.charAt(i)>='!' && a.charAt(i)<='+' || a.charAt(i)>='-' && a.charAt(i)<='@' || a.charAt(i)>='[' && a.charAt(i)<='`' || a.charAt(i)>='{' && a.charAt(i)<='’'){
				flag=0;}
	}
		if(flag==0){
			alert("Please Enter Only Characters");
			name.value="";
		}
}

// Removes leading whitespaces
	function LTrim( value ) 
	{
		var re = /\s*((\S+\s*)*)/g;
		return value.replace(re, "$1");
	}
// Removes ending whitespaces
	function RTrim( value )
	{
		var re = /((\s*\S+)*)\s*/g;
		return value.replace(re, "$1");
	}
// Removes leading and ending whitespaces
	function trim( value )
	{
		return ALTrim(LTrim(RTrim(value)));
	}
// Removes SPACES between the Values
	function ALTrim( val ){
		var new_val="";
		for(var i=0;i<val.length;i++){
			if(val.charAt(i)!=" "){
				new_val=new_val+val.charAt(i);
			}
		}
		return new_val;
	}
	/* appending comma for the string*/
function addComma(optFld){
var val = trim(optFld.value);
var new_val="";
	for(var i=0;i<val.length;i++){
			if(val.charAt(i)!=","){
				if(i!=val.length-1){
					new_val = new_val+val.charAt(i)+",";
				}else{
					new_val = new_val+val.charAt(i);
				}
			}
	}	
	optFld.value = new_val.toUpperCase();
}
/*password Creation*/

function funCheck(obj){
	if(document.getElementById(obj).checked==true){
	document.getElementById("app").checked = false;
	}else if(document.getElementById("app").checked==true){
	document.getElementById(obj).checked = false;
	}

}
function addPassFun(){
	var radioButton;
	if(document.getElementById("userId").value==""){
		alert("Please enter the userId...");
		document.getElementById("userId").focus();
		return false;
	}
	if(document.getElementById("pass").value==""){
		alert("Please enter the password...");
		document.getElementById("pass").focus();
		return false;
	}
	if(document.getElementById("dat").checked==false && document.getElementById("app").checked==false){
		alert("Please select type...");
		return false;
	}
	if(document.getElementById("dat").checked==true){
		radioButton = document.getElementById("dat").value;
	}else if(document.getElementById("app").checked==true){
		radioButton = document.getElementById("app").value;
	}
	document.passwordCreation.action = "IC_Settings_submitPassword.jsp?radioButton="+radioButton;
	document.passwordCreation.submit();
	
}
