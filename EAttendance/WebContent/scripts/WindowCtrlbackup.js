var blnCtrl = false;
//----------------------------------------------------------------------------
function document_oncontextmenu() {
	if (document.all) {
		return false;
	}
}
//----------------------------------------------------------------------------
function document_onmousedown(e) {
	if (!document.all){
		if (e.which==3)
			return false;
	}
}

//----------------------------------------------------------------------------

function document_onkeydown() {

   if (window.event.keyCode == 8)
    {
        if (!window.event.srcElement.type || window.event.srcElement.type=="button" || window.event.srcElement.type == "select-one" || window.event.srcElement.type == "checkbox" )
          {// Capture and remap backspace
            alert("Access Denied");
            window.event.keyCode = 555;
            return false;
          }
    }
	
	if (window.event.keyCode == 13)
    {
        if (!window.event.srcElement.type || window.event.srcElement.type=="text")
          {// Capture and remap Enter key
            alert("Access Denied");
			window.event.keyCode = 555;
            return false;
          }
    }
	
	if (window.event.keyCode == 8)
    {// Capture and remap backspace in text box & text area.
   		if (window.event.srcElement.type)
		{	if((window.event.srcElement.type=="text" && window.event.srcElement.value=="") || (window.event.srcElement.type=="textarea" && window.event.srcElement.value==""))
		  	{// Capture and remap backspace
            	alert("Access Denied");
				window.event.keyCode = 555;
            	return false;
          	}
		}
    }	
	 
   if(window.event && window.event.keyCode == 17)
     { // Capture and remap ctrl
       window.event.keyCode = 555;
       blnCtrl = true;
       return false;
     }

    if(window.event && (window.event.keyCode == 78 || window.event.keyCode == 82) && blnCtrl == true)
      {
	// Capture and remap N
		window.event.keyCode = 555;
        return false;
      }
}

//----------------------------------------------------------------------------
function document_onup()
{
  if(window.event && window.event.keyCode == 17)  blnCtrl =false;
}
//----------------------------------------------------------------------------
function checkfieldcode(textvalues,SubFldRefNo,app_id,msg_Type,fielddesc)

{

var fldvalarray;
var inputboxvalue=textvalues.value;
var fldval =new Array();
fldval	=fielddesc.split("|");
var blnflg='N';
for(var i=0;i<fldval.length;i++)
{
 fldvalarray=fldval[i];
 if(fldvalarray==inputboxvalue)
 {
  
  blnflg='Y';
  break;
 }
}
if (blnflg=='N')
	{
 alert("Valid Allowed Codes :-      "+fldval);
//textvalues.focus();
	}
}
  
 function formatString(textvalues, intSize){

 	var srcEle = window.event.srcElement.name;
	 var totalstring  = textvalues.value;
	
	var pi_txtVal  = textvalues.value;
    var width;
	  if (typeof(intSize) == "string")
      width = parseInt(intSize)
    else
	    width=intSize;
	width = width-1;
	
    sta = 0
    end = width
	frStr = ""
    st = pi_txtVal
    esSt = escape(st);
    aryFrStr = esSt.split("%0D%0A")
    
    for (ind = 0; ind < aryFrStr.length; ind++) {
	    unesStr = unescape(aryFrStr[ind])
      if(unesStr.length > 0) {
	      if (unesStr.length>width)
          frStr = frStr+spiltStr(unesStr, width,srcEle)
	      else
            frStr=frStr+unesStr+"\r\n"
		
		  
      }
    }
  
	eval("document.frmOutgoingMessages."+srcEle).value=frStr.trim();
	
	  return frStr
  }
	  
  
  
  function spiltStr(strLines, strWidth,srcEle) {
	var width
    var width = strWidth
    var sta = 0
    var end = width
    var st = strLines
    var frStr = ""
    
    
    do {
      var str = st.substring(sta,end);
      var lSize = str.lastIndexOf(' ');
	    var strSize = str.lastIndexOf('\n');
      if (strSize != -1) 
		    lSize = strSize; 
      if (lSize == -1)
		    lSize = strWidth;
      frStr += str.substring(0,lSize) + "\r\n";
      st = st.substring(lSize+1);
    } while(st.length>width) 
    
    frStr = frStr+st+"\r\n";
	
	  for (ind = 0; ind < frStr.length; ind++)
	{
		var ab3=frStr.charAt(ind);
	 var ab4=frStr.charCodeAt(ind);
     
	if(ab4==8211)
	 {

	frStr=frStr.replace(ab3,'-');
	
	 }
	}

	
    return frStr;
  }

function checkThis(textvalues,vallength,valtype,valdata,nolines,test,mstype)
{
x = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890/-?().,+:'{}"
y = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890.,-()/='+:?!%*;<>&"
z = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890.,-()/='+:?!%&*<>;{@#_"
h = "ABCDEF1234567890"
c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
n = "1234567890"
d = "1234567890,"+"."
p = "YN"
r = "DC"
  var origString = document.frmOutgoingMessages.name.value; 
 srcEle = window.event.srcElement.name;
 var strFldTag = eval(("document.frmOutgoingMessages."+srcEle).replace("V","ED")).value
	 strFldTag1 = strFldTag.substring(7,8); 
 eval("document.frmOutgoingMessages."+srcEle.replace('V','E')).value = "";
 strFldTag = strFldTag.substring(0,strFldTag.indexOf(",")); 
  var optiontag=strFldTag+strFldTag1;
 lengtherror = "";
  lengtherrormessage = "";
  dataerrormessage = "";
  realstring = "";
  totalstring = "";
  ct = 0;
  lee= 0;
  enter=0;
  len=0;
  totalstring  = textvalues.value;
  valuelength = textvalues.value.length;
  var charlast = totalstring.charAt(valuelength);

  if(charlast=='\n')
   	totalstring.remove(charlast);
 
  
   	var Firstchar=totalstring.charAt(0);
	if(Firstchar == "-" || Firstchar == ":"){
	 dataerrormessage = "Invalid first Character";
	 alert(dataerrormessage);
    //eval("document.frmOutgoingMessages."+srcEle.replace('V','E')).value = dataerrormessage;
	textvalues.focus();
	}
	
  if (((eval("document.frmOutgoingMessages."+srcEle).value == "")) && (eval(("document.frmOutgoingMessages."+srcEle).replace("V","MO")).value=="M"))
  {
  		eval("document.frmOutgoingMessages."+srcEle.replace('V','E')).value = "MANDATORY";
		return;
  }	
  ct=0;	  
if(nolines > 1) {  
  	while((enter = totalstring.indexOf("\n")) != -1 ) {
  	len++;
var Splchar=totalstring.charAt(enter+1);
	if(Splchar == "-" || Splchar == ":"){
	 dataerrormessage = "Invalid first Character in the line";
	 alert(dataerrormessage);
    // eval("document.frmOutgoingMessages."+srcEle.replace('V','E')).value = dataerrormessage;
	textvalues.focus();
	}
	realstring = totalstring.substring(0,enter);
	totalstring = totalstring.substring(enter+1,valuelength);
	ct++;
      	if(ct > nolines) enter = -1;
	    else if(ct <= nolines) {
	       	reallen = realstring.length;
		  	if(valtype == "F")
       			if(reallen != vallength && reallen !=0)
			{
				lengtherror = "Length Should be exactly "+vallength;   
			}
       		else if(valtype == "V")  
			{
				if(reallen > vallength) 
				lengtherror = "Length Should Not Exceed "+vallength; 
			}
      		
		} //end of else if(ct <= nolines)


	}//while((enter = totalstring.indexOf("\n")) != -1)  
  
    if(ct <= nolines)   {
       
       if(totalstring.length > 0)   {
           	if(ct < nolines) {
           		finalstrlen = totalstring.length;
				var aa=totalstring.charAt(35);
			    if(valtype == "F")
				{
	           
				  if(finalstrlen != vallength &&  finalstrlen != 0)
					{
					  lengtherror = "Length Should be exactly "+vallength;
					}
	              
				}else if(valtype == "V"){
					}
               }//End of (ct < nolines)
              else
              {
	             lengtherror = "More than "+nolines+" lines";
			  }
          } // End of (totalstring.length > 0)
       } //(ct <= nolines)
       else
           lengtherror = "More than "+nolines+" lines";
           lengtherrormessage = lengtherrormessage + lengtherror;
           //alert ("More than "+nolines+" lines");
	   //textvalues.focus();
	}//if(nolines > 1)
	else if(nolines == 1)	 {
		
		if(valtype == "F") {
			option="WITHOUT";
			 option1="CONFIRM";
			 option2="MAY ADD";
				  if(valuelength != vallength && valuelength != 0)  
			  lengtherror = "Length Should be exactly "+vallength + "or Zero";
		  
  		lengtherrormessage="";
		
		}//(valtype == "F") 
  		else if(valtype == "V")  {	
			
			 option2="BY ACCEPTANCE";
			 option3="BY NEGOTIATION";
			 option4="BY DEF PAYMENT"; 
			 option5="BY MIXED PYMT";
			if(valuelength > vallength)  lengtherror = "Length Should not Exceed "+vallength;
  			//else if(valuelength <= vallength) lengtherror = "";
				}//else if(valtype == "V")
  		lengtherrormessage = lengtherrormessage + lengtherror;
  	}//else if(nolines == 1)
  if(lengtherrormessage == "")  {

	dataerrormessage = checkDataError(valdata,textvalues,vallength);
  	if(dataerrormessage!="")	{	
		alert(dataerrormessage);
		 //eval("document.frmOutgoingMessages."+srcEle.replace('V','E')).value = dataerrormessage;
		 textvalues.focus();
		 return;
	}		
  }
  else 
  {	
  	alert(lengtherrormessage);
	//eval("document.frmOutgoingMessages."+srcEle.replace('V','E')).value = lengtherrormessage;
  	textvalues.focus();
    	return;
  }
  dataerrormessage = "";
  lengtherror="";
  lengtherrormessage="";
  ct=0;
  

if(mstype!="" && mstype=="true" && dataerrormessage=="" && lengtherrormessage=="" && strFldTag=="72") 
      { 
      		
			actualstring=textvalues.value;
			
      		if(actualstring=="") return;
      		noLines = actualstring.split("\n");
			for(i=0;i<noLines.length;i++) 
      		{
      			tokenString =noLines[i];
				if(tokenString=="") return;
      			if(tokenString.charAt(35)!="" || tokenString.charAt(35)!=null )
      			{
      				if(tokenString.charAt(35)=='\r')
  				{
  					
  				}
  				else
  				{
  				actuallength = tokenString.length;
  				}
  			}
      			
				
      		}
} // end of if
  	
//---------End of checking Fld tag 72 whether it is Structured or not--------------
  dataerrormessage = "";
  lengtherror="";
  lengtherrormessage="";
  ct=0;

  
 
    
 
 //Find the presence of slashes in the 72 field tag alone.    
 	totalstring  = textvalues.value;
  	valuelength = textvalues.value.length; 
	
	if (totalstring=="") return;
 	enter=0;
	
  
   
 if(valdata=="b" || valdata=="8")
 {
		if(checkdate(eval("document.frmOutgoingMessages."+srcEle))==false)	
		{
 	 		dataerrormessage = "Invalid Date"; 
			alert(dataerrormessage);
			//eval("document.frmOutgoingMessages."+srcEle.replace('V','E')).value = dataerrormessage;
			return;
		}
 }

 //Validation for amount Field tag. 
 if(valdata=="d")
 {
	
	
	if(valuelength>0 && valuelength<16)
	{
		if (totalstring.charAt(0) == '.') 
		{
			dataerrormessage = "Cannot start with a decimal";
			alert(dataerrormessage);
			document.getElementById(srcEle.replace("V","E")).value = "";
			document.getElementById(srcEle.replace("V","E")).value = dataerrormessage;
     		textvalues.focus();
			return;
		}

		
		var ct=0;
		var i=totalstring.indexOf(",");
		var j;
		var k=0;
		if(valuelength > i)
		{
			j=totalstring.substring(i+1,valuelength);
			k= j.indexOf(",");
		}

		if(k>0)
		{
			dataerrormessage = "More than one Comma not allowed";
			alert(dataerrormessage);
			eval("document.frmOutgoingMessages."+srcEle.replace('V','E')).value = "";
			//eval("document.frmOutgoingMessages."+srcEle.replace('V','E')).value = dataerrormessage;
			return;
		}
		
		ct=0;i=0;J=0;
		i=totalstring.indexOf(".");
		k=0;
		if(valuelength > i)
		{
			j=totalstring.substring(i+1,valuelength);
			k= j.indexOf(".");
		}
		if(k!=-1)
		{
			dataerrormessage = "More than one decimal not allowed";
			alert(dataerrormessage);
			document.getElementById(srcEle.replace("V","E")).value = "";
			document.getElementById(srcEle.replace("V","E")).value = dataerrormessage;
			textvalues.focus();
			return;
		}

		
	}
	else
	{
		dataerrormessage = "Maximum length can be 15 characters Inclusive of ','";
		alert(dataerrormessage);
		eval("document.frmOutgoingMessages."+srcEle.replace('V','E')).value = "";
		//eval("document.frmOutgoingMessages."+srcEle.replace('V','E')).value = dataerrormessage;
		return;
	}
		
}
	
}//end of function


function checkDataError(valdata,txtvalue,vallength)
{
		var tocheck;
	var tlength = txtvalue.value.length;

	if (valdata == "x" || valdata == "y" || valdata == "z"){
		tocheck = eval(valdata)  + "\'"+"\n";
		
		}
	else		
		{
		if (valdata=="b") valdata="n"
		if (valdata=="8") valdata="n"
		if (valdata=="u") valdata="a"
		if (valdata=="i") valdata="c"
		if (valdata=="a" && vallength == 1) valdata="r"
		tocheck = eval(valdata);
		}
	for(j=0;j<tlength;j++)	
	{
var tochk=tocheck.indexOf(txtvalue.value.substring(j,j+1)) != -1;
		
		
		

		if(tocheck.indexOf(txtvalue.value.substring(j,j+1)) != -1) continue;     
	    else  {
			
		
	    	if(txtvalue.value.charCodeAt(j) == 13 || txtvalue.value.charCodeAt(j) == 32)
			{
			
				continue;
			}
			
      		else
			{
			
				return "Invalid Character Set";

			}
     	}
 	} // end of for
	
		return "";
}
//---------------------------------------------------------------------------------------------
function showSfldVal(objTextAreaID, pLineCount, pColCount, pFldTag)
{
 	var strURL = "IC_Outgoing_TextArea_Subfield.jsp?objTextAreaID="+objTextAreaID+"&LineCount="+pLineCount+"&ColCount="+pColCount+"&FldTag="+pFldTag;;
 
  var newwindow = window.open(strURL,"Help","Width=600px,Height=430px,status=no,resizable=false,scrollbars=yes,top=100px,left=200,help= no;");
 	newwindow.focus();
}


function showSfldValfordisbfie1d(objTextAreaID, pLineCount, pColCount, pFldTag)
{
 	var strURL = "IC_Outgoing_TextArea_ForDisbField.jsp?objTextAreaID="+objTextAreaID+"&LineCount="+pLineCount+"&ColCount="+pColCount+"&FldTag="+pFldTag;;
  
  var newwindow = window.open(strURL,"Help","Width=600px,Height=430px,status=no,resizable=false,scrollbars=yes,top=100px,left=200,help= no;");
 	newwindow.focus();
}

//Function for showing the Swift help for a fld tag and fmt opt
function callthisfn(mstype,fldtag,fmtoption,strTranSlno)
{
 	
	//alert("mstype  "+mstype + "FldTag "+fldtag+ " FmtOpt "+fmtoption);
	var strURL = "IC_Outgoing_FieldDescription.jsp?FldTag="+fldtag+"&FmtOpt="+fmtoption+"&Msgtype="+mstype+"&strTranSlno="+strTranSlno;
 	var newwindow = window.open(strURL,"Help","Width=500px,Height=300px,status=no,resizable=false,scrollbars=yes,top=100px,left=200,help= no;");
 	newwindow.focus();
}

//Function for showing the Swift dictionary
function openguide()
{
	window.open("IC_Outgoing_CharacterSetGuide.html","Guide",'top=0,left=0,toolbar=no,menubar=no,scrollbars=yes,location=no,height=350,width=590');
}
//--------------------------------------------------------------------------------------


function isClose1(strUserType)
{
	window.location.href="IC_Outgoing_MessageModification.jsp?strUserStat="+strUserType;
}

function isClose()
{
	window.location.href="IC_frames_body.htm";
}

function applyTemplate(selectBox)
{
	var curSelection = selectBox.options[selectBox.options.selectedIndex].value;
	//alert("curSelection"+curSelection);
	document.frmOutgoingMessages.templateHdn.value=curSelection;
	document.frmOutgoingMessages.action = "IC_OutGoing_ApplyTemplates.jsp";
	document.frmOutgoingMessages.method = "post";
	document.frmOutgoingMessages.submit();
}

function applyTemplate1(selectBox)
{
	var curSelection = selectBox.options[selectBox.options.selectedIndex].value;
	//alert("curSelection"+curSelection);
	document.frmOutgoingMessages.templateHdn.value=curSelection;
	document.frmOutgoingMessages.action = "IC_OutGoing_ApplyTemplatesForDisbField.jsp";
	document.frmOutgoingMessages.method = "post";
	document.frmOutgoingMessages.submit();
}

function showfullscreen()
{
	document.frmOutgoingMessages.action = "IC_Outgoing_Modification_MoreScreen.jsp"
	document.frmOutgoingMessages.method = "post";
	document.frmOutgoingMessages.submit();
}


function checkdate(objName) {
	var datefield = objName;
	if (chkdate(objName) == false) 
	{
		datefield.select();
		//alert("Invalid Date. The date Format should be in YYMMDD. Please try again.");
		//datefield.focus();
		return false;
	}
	else 
		return true;
}
function chkdate(objName) {
	var strDatestyle = "US"; //United States date style
	//var strDatestyle = "EU";  //European date style
	var strDate;
	var strDateArray;
	var strDay;
	var strMonth;
	var strYear;
	var intday;
	var intMonth;
	var intYear;
	var booFound = false;
	var datefield = objName;
	var strSeparatorArray = new Array("-"," ","/",".");
	var intElementNr;
	var err = 0;
	var strMonthArray = new Array(12);
	var yr;
	var mon;
	var dt;
	strMonthArray[0] = "Jan";
	strMonthArray[1] = "Feb";
	strMonthArray[2] = "Mar";
	strMonthArray[3] = "Apr";
	strMonthArray[4] = "May";
	strMonthArray[5] = "Jun";
	strMonthArray[6] = "Jul";
	strMonthArray[7] = "Aug";
	strMonthArray[8] = "Sep";
	strMonthArray[9] = "Oct";
	strMonthArray[10] = "Nov";
	strMonthArray[11] = "Dec";	
	var strTextVal;
	strTextVal=datefield.value;
	var len=strTextVal.length;
	if(len>6) {
		yr=strTextVal.substring(0,4);
		mon=strTextVal.substring(4,6);
		dt=strTextVal.substring(6,8);
	}
	else
	{
		yr=strTextVal.substring(0,2);
		mon=strTextVal.substring(2,4);	
		dt=strTextVal.substring(4,6);
	}
	strDate = dt+"/"+mon+"/"+yr;
	if (strDate.length < 1) 
		return true;
	for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++) 
	{
		if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1) {
			strDateArray = strDate.split(strSeparatorArray[intElementNr]);
			if (strDateArray.length != 3) 
			{
				err = 1;
				return false;
			}
			else 
			{
				strDay = strDateArray[0];
				strMonth = strDateArray[1];
				strYear = strDateArray[2];
			}
			booFound = true;
   		}
	}
	if (booFound == false) 
	{
		if (strDate.length>5) 
		{
			strDay = strDate.substr(0, 2);
			strMonth = strDate.substr(2, 2);
			strYear = strDate.substr(4);
   		}
	}
	if (strYear.length == 2)
		strYear = '20' + strYear;
	
	intday = parseInt(strDay, 10);
	if (isNaN(intday)) 
	{
		err = 2;
		return false;
	}
intMonth = parseInt(strMonth,10);

if (isNaN(intMonth)) {
for (i = 0;i<12;i++) {
if (strMonth.toUpperCase() == strMonthArray[i].toUpperCase()) {
intMonth = i+1;
strMonth = strMonthArray[i];
i = 12;
   }
}
if (isNaN(intMonth)) {
err = 3;
return false;
   }
}
intYear = parseInt(strYear, 10);
if (isNaN(intYear)) {
err = 4;
return false;
}
if (intMonth>12 || intMonth<1) {
err = 5;
return false;
}
if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intday > 31 || intday < 1)) {
err = 6;
return false;
}
if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intday > 30 || intday < 1)) {
err = 7;
return false;
}
if (intMonth == 2) {
if (intday < 1) {
err = 8;
return false;
}
if (LeapYear(intYear) == true) {
if (intday > 29) {
err = 9;
return false;
}
}
else {
if (intday > 28) {
err = 10;
return false;
}
}
}
return true;
}

function LeapYear(intYear) {
if (intYear % 100 == 0) {
if (intYear % 400 == 0) { return true; }
}
else {
if ((intYear % 4) == 0) { return true; }
}
return false;
}


function checkerrors(SenderBic,ReceiverBic) 
{
	
	var txtvalue=document.frmOutgoingMessages.ReceiverBic.value;
	var txtvalue1=document.getElementById("hdnrecbic").value;
	var abc = document.frmOutgoingMessages.elements.length;
	var blnflg='N';
	
	for (i=0;i<abc;++i)
	{
		if (document.frmOutgoingMessages.elements(i).type=="textarea") 
		{
			txtName = (document.frmOutgoingMessages.elements(i).name).substring(0,2);
			if(txtName=="E_")
			{
				
				if(document.frmOutgoingMessages.elements(i).innerText == "MANDATORY")
				{
					alert("Please Correct the Errors in the Message and Proceed as some of the Flds contains either Invalid Characters/Fld Length Exceeded/Mandatory fields");
					return;
                     
				}

			}
			
		
		
		
		}
		if (document.frmOutgoingMessages.elements(i).type=="text" ) 
		{
			txtName = (document.frmOutgoingMessages.elements(i).name);
			 var txtvalue=document.frmOutgoingMessages.ReceiverBic.value;
			if(SenderBic==ReceiverBic && txtvalue1=="")
			{
				alert("Sender IFSC code cannot be same as Receiver IFSC");
				return;
			}
			else if(txtName=="hdnrecbic" && txtvalue1=="" && ReceiverBic=="")
			{
				
				if(document.frmOutgoingMessages.hdnrecbic.value=="")
				{
					alert("Enter the Correct Receiver IFSC Code");
					return;
				}
			}
			
		}
	}

	document.frmOutgoingMessages.btnsubmit.value="PROCESSING.....";
	document.frmOutgoingMessages.btnsubmit.disabled="true";
	document.frmOutgoingMessages.action = "IC_OutgoingMessageModificationUpdate.jsp";
	document.frmOutgoingMessages.method = "post";
	document.frmOutgoingMessages.submit();
}

function checkerrors1(SenderBic,ReceiverBic) 
{
	
	 var txtvalue=document.frmOutgoingMessages.ReceiverBic.value;
	 var txtvalue1=document.getElementById("hdnrecbic").value;
	 var abc = document.frmOutgoingMessages.elements.length;
	
	
	for (i=0;i<abc;++i)
	{
		if (document.frmOutgoingMessages.elements(i).type=="textarea") 
		{
			txtName = (document.frmOutgoingMessages.elements(i).name).substring(0,2);
			
			if(txtName=="E_")
			{
					
					//alert("document.frmOutgoingMessages.elements(i).innerText"+document.frmOutgoingMessages.elements(i).innerHTML.value);
					if(document.frmOutgoingMessages.elements(i).innerHTML.value !="" || document.frmOutgoingMessages.elements(i).innerHTML.value !="null" || document.frmOutgoingMessages.elements(i).innerHTML.value !=null)
					{
						alert("Please Correct the Errors in the Message and Proceed as some of the Flds contains either Invalid Characters/Fld Length Exceeded/Mandatory fields");
						return;
					}
					
			}			
					
			
		}
		if (document.frmOutgoingMessages.elements(i).type=="text") 
		{
			txtName = (document.frmOutgoingMessages.elements(i).name);
			 var txtvalue=document.frmOutgoingMessages.ReceiverBic.value;
			if(SenderBic==ReceiverBic && txtvalue1=="")
			{

				alert("Sender IFSC code cannot be same as Receiver IFSC");
				return;
					
			}
					
			else if(txtName=="hdnrecbic" && txtvalue1=="" && ReceiverBic=="")
			{
					
					if(document.frmOutgoingMessages.hdnrecbic.value=="")
					{
						alert("Enter the Correct Receiver IFSC Code");
						return;
					}
			}			
					
		}


	}
	document.frmOutgoingMessages.btnsubmit.value="PROCESSING.....";
	document.frmOutgoingMessages.btnsubmit.disabled="true";
	document.frmOutgoingMessages.action = "IC_OutgoingMessageModificationUpdateForDisbfield.jsp";
	document.frmOutgoingMessages.method = "post";
	document.frmOutgoingMessages.submit();
}

function checkerrors2(SenderBic,ReceiverBic) 
{
	
	 var txtvalue=document.frmOutgoingMessages.ReceiverBic.value;
	 var txtvalue1=document.getElementById("hdnrecbic").value;
	 var abc = document.frmOutgoingMessages.elements.length;
	document.frmOutgoingMessages.btnsubmit.value="PROCESSING.....";
	document.frmOutgoingMessages.btnsubmit.disabled="true";
	document.frmOutgoingMessages.action = "IC_OutgoingMessageModificationUpdateForDisbfield.jsp";
	document.frmOutgoingMessages.method = "post";
	document.frmOutgoingMessages.submit();
}


function checkerrors3(SenderBic,ReceiverBic) 
{
	
	//alert(Vecsize);
	var txtvalue=document.frmOutgoingMessages.ReceiverBic.value;
	var txtvalue1=document.getElementById("hdnrecbic").value;
	var abc = document.frmOutgoingMessages.elements.length;
	var blnflg='N';
	
	for (i=0;i<abc;++i)
	{
		if (document.frmOutgoingMessages.elements(i).type=="textarea") 
		{
			txtName = (document.frmOutgoingMessages.elements(i).name).substring(0,2);
			if(txtName=="E_")
			{
				
				if(document.frmOutgoingMessages.elements(i).innerText == "MANDATORY")
				{
					alert("Please Correct the Errors in the Message and Proceed as some of the Flds contains either Invalid Characters/Fld Length Exceeded/Mandatory fields");
					return;
                     
				}

			}
			
		
		
		
		}
		if (document.frmOutgoingMessages.elements(i).type=="text" ) 
		{
			txtName = (document.frmOutgoingMessages.elements(i).name);
			 var txtvalue=document.frmOutgoingMessages.ReceiverBic.value;
			if(SenderBic==ReceiverBic && txtvalue1=="")
			{
				alert("Sender IFSC code cannot be same as Receiver IFSC");
				return;
			}
			else if(txtName=="hdnrecbic" && txtvalue1=="" && ReceiverBic=="")
			{
				
				if(document.frmOutgoingMessages.hdnrecbic.value=="")
				{
					alert("Enter the Correct Receiver IFSC Code");
					return;
				}
			}
			
		}
	}


//document.frmOutgoingMessages.action = "IC_OutgoingMessageModificationUpdate_ForTemplate.jsp";
	document.frmOutgoingMessages.btnsubmit.value="PROCESSING.....";
	document.frmOutgoingMessages.btnsubmit.disabled="true";
	document.frmOutgoingMessages.action = "IC_OutgoingMessageModificationUpdate.jsp";
	document.frmOutgoingMessages.method = "post";
	document.frmOutgoingMessages.submit();
}


function checkerrors4(SenderBic,ReceiverBic) 
{
	
	
	


	document.frmOutgoingMessages.btnsubmit.value="PROCESSING.....";
	document.frmOutgoingMessages.btnsubmit.disabled="true";
	document.frmOutgoingMessages.action = "IC_OutgoingMessageModificationUpdate.jsp";
	document.frmOutgoingMessages.method = "post";
	document.frmOutgoingMessages.submit();
}




function updatedata() 
{
	document.frmOutgoingMessages.action = "IC_OutgoingMessageModificationSave.jsp";
	document.frmOutgoingMessages.method = "post";
	document.frmOutgoingMessages.submit();
}

function updatedata1() 
{
	document.frmOutgoingMessages.action = "IC_OutgoingMessageModificationSavedFordisbfield.jsp";
	document.frmOutgoingMessages.method = "post";
	document.frmOutgoingMessages.submit();
}
function trim(pVal) {
	if (pVal == null) {
		return;
	}
  if (pVal == null) {
		return;
	}
  pVal = pVal.replace(/^\s+/, '');
  return pVal.replace(/\s+$/, '');
 
}