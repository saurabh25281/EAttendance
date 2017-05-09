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



function validChqType(val)
{
	if(trim(val.value) != "")
	{
		//alert(document.frmOutgoingMessages.V_61.value);
		var acctNo = trim(document.frmOutgoingMessages.V_61.value);
		if(acctNo != "")
		{
			getValidChqType("get", "IC_CHQ_TYPE_VALIDATION.jsp?chqType="+val.value+"&acctNo="+acctNo);
		}
		else
		{
			alert("Please enter acct no first");
			document.getElementById("txtChequeNo").value = "";
			document.getElementById("txtType").value = "";
		}
	}
}

function getValidChqType(method, url)
{
	//alert("url chqtype : "+url);
	if(method == 'get' || method == 'GET')
	{
		http.open(method,url);
		http.onreadystatechange = handleResponse3;
		http.send(null);
	}
}

function handleResponse3()
{
	//alert("http.readyState : "+http.readyState+"--http.status : "+http.status);
	if(http.readyState == 4 && http.status == 200)
	{
		var response = http.responseText;
		//alert(response);
		if(response.contains("INVALID CHQ TYPE"))
		{
			//alert("Please Enter Valid Cheque Type ");
			alert("Valid Instrument Type is CHQ");
			document.getElementById("txtType").value="";
			document.getElementById("txtType").focus();
			//return false;
			//document.getElementById("ajax_res").innerHTML = response;
		}
		else
		{
			//alert("Correct CHQ TYPE");
		}
	}
}




function getChqStatus()
{
	var chqno=document.getElementById('txtChequeNo').value;
	//alert(chqno);
	var acctNo = trim(document.frmOutgoingMessages.V_61.value);
	//alert(acctNo);
	//var instType = trim(document.getElementById("txtType").value);
	//alert("Text box amount="+foracid);
	if((document.getElementById("txtType").value=="CHQ")||(document.getElementById("txtType").value=="chq"))
	{
		xmlhttp=GetXmlHttpObject();
                if (xmlhttp==null)
                {
                    alert ("Your browser does not support AJAX!");
                    return;
                }
	var url="IC_Outgoing_ChequeStatus.jsp";
               url=url+"?chq="+chqno+"&foracid="+acctNo;
	//alert(url);
	var acctNo = trim(document.frmOutgoingMessages.V_61.value);
    var instType = trim(document.getElementById("txtType").value);
		if(acctNo != "")
		{
			if(instType != "")
			{
				if(trim(instType.value)!="VC")
				{
	xmlhttp.onreadystatechange=function(){stateChanged54();}
    xmlhttp.open("GET",url,true);				
    xmlhttp.send(null);
	}
			}
	else
	{
				alert("Please enter instrument type first");
				document.getElementById("txtChequeNo").value = "";
				document.getElementById("txtType").value = "";
	}
		}
		else
		{
			alert("Please enter acct no first");
			document.getElementById("txtChequeNo").value = "";
			document.getElementById("txtType").value = "";
		}
	}

}
function stateChanged54()
                {		
					var s;
                   //alert("in state");
	                if (xmlhttp.readyState==4)
                    {
						var d=xmlhttp.responseText;
						 //alert("value "+d);
						var q = d.indexOf('<');
						var s=(d.substr(0,q));
						var val=s.trim();
						//alert(s);
						//alert(val);
						var myarray=new Array(2);
						myarray=val.split("~");
						//alert(myarray);
						var val1=myarray[0];
						//alert('val1'+val1);
						var val2=myarray[1];
						//alert('val2'+val2);
						var flg=true;
						if(val2=="unavailable")
						{
							alert("Please Enter A Valid Cheque Number");
							document.getElementById("txtChequeNo").value = "";
							document.getElementById("txtChequeNo").focus();
							document.getElementById('chqstat').value=val2;
							//document.getElementById("txtType").value = "";
						}
						else if(val2=="DESTROYED")
						{
							alert("This Cheque Number IS Destroyed");
							document.getElementById("txtChequeNo").value = "";
							document.getElementById("txtChequeNo").focus();
							document.getElementById('chqstat').value=val2;
							//document.getElementById("txtType").value = "";

						}
						else if(val2=="STOP PAYMENT")
						{
							alert("Stop Payment");
							document.getElementById("txtChequeNo").value = "";
							document.getElementById("txtChequeNo").focus();
							document.getElementById('chqstat').value=val2;
							//document.getElementById("txtType").value = "";
						}
						else if(val2=="PROCESSED")
						{
							alert("Cheque Already Processed");
							document.getElementById("txtChequeNo").value = "";
							document.getElementById("txtChequeNo").focus();
							document.getElementById('chqstat').value=val2;
							//document.getElementById("txtType").value = "";

						}
						else
						{
							document.getElementById('chqdate1').value=val1;
							document.getElementById('chqstat').value="";
						}
						
					
					}
					return s;
                }



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
  



 /*if (isNaN(intColCount)) {
    intColCount = 35
  } else if (parseInt(intColCount) == NaN) {
    intColCount = 35
  } else {
    intColCount = parseInt(intColCount)
  }

	if (gObjTextArea != null) {
    if (gFldTag == '72')
			document.frmSfldval.text1.value = gObjTextArea.value;
		else
			document.frmSfldval.text1.value = formatString(gObjTextArea.value, intColCount);
	}*/
  
	/*
	This function shows the line number and the characters in each line entered
	in the text area.
	This function would work only for jre 1.4 and above since it uses the split() method.
	*/
	function showLineNumber(textBox) {
		//the text value in the textbox
		var strText = textBox.value;
  	
		//get the different lines
		var lines = strText.split('\r\n');
		if (lines[lines.length-1] == "") 
			lines.length -= 1;
		document.getElementById('message').innerHTML = lines.length;
	}
	
  //function setTextOnBlur(pi_txtVal, intSize)
  function formatString(pi_txtVal, intSize)
  {
	  var pi_txtVal  = pi_txtVal.value;
	 // alert("pi_txtVal"+pi_txtVal);
	 // alert("intSize"+intSize);
	  var srcEle = window.event.srcElement.name;
	  //if (gFldTag != '72') {
		
		 
		  eval("document.frmOutgoingMessages."+srcEle).value= formatString1(pi_txtVal, intSize);
    	//eval("document.frmOutgoingMessages."+srcEle).value=frStr.trim();
	//}
  }

  function escapeVal(pi_textareaval, intSize) { 
	  //alert("here");
    var textareaval = escape(pi_textareaval) //encode textarea string's carriage returns
    var nLine = intSize;
    var strMsg=""
	  for (i = 0; i < textareaval.length; i++) {
	    var arrabc = textareaval.split("%0D%0A");
    }
    
    if (arrabc != null && arrabc.length > 0) {
		 //alert("here 1");
      for(j=0; j <arrabc.length; j++){
        strSplt=unescape(arrabc[j]);

        if(strSplt.length < 1 )
           continue;
          
        if(	strSplt.length > nLine){
          strMsg = strMsg + strSplt.substring(0,nLine)+"\r\n";
          strTmp = strSplt.substring(nLine,strSplt.length) +"\r\n";
          strMsg = strMsg + strTmp;
          //alert("strMsg"+strMsg)
        } else {
          strMsg = strMsg + strSplt +"\r\n";
          //alert(" 1strSplt:"+ strSplt+" 2strMsg:"+strMsg );
        }
      }
    }	
	  return strMsg;
  }

  //function formatString_old(pi_txtVal, intSize) {
	//  if (gFldTag == '72') {
	//	  return pi_txtVal;
	//  }
  //}

  function spiltStr(strLines, strWidth) {
	  //alert("here 2");
	    //alert("strLines"+strLines);
		 //alert("strWidth"+strWidth);
	  var width
    var width = strWidth
    var sta = 0
    var end = width
    var st = strLines
    var frStr = ""
    //alert(" strLines>"+strLines);
    
    do {
      var str = st.substring(sta,end)
      var lSize = str.lastIndexOf(' ');
	    var strSize = str.lastIndexOf('\n');
      if (strSize != -1) 
		    lSize = strSize; 
      if (lSize == -1)
		    lSize = strWidth;
      frStr += str.substring(0,lSize) + "\r\n";
      st = st.substring(lSize+1);
    } while(st.length>width) 
    
    frStr = frStr+st+"\r\n"
	//alert("frStr"+frStr);
    return frStr;
  }

  function formatString1(pi_txtVal, intSize){
 //alert("pi_txtVal"+pi_txtVal);
 // alert("intSize"+intSize);
	   //alert("here 3");
    //alert(" tyep-------->>"+typeof(w))
    var width
	  if (typeof(intSize) == "string")
      width = parseInt(intSize)
    else
	    width=intSize;

		width = width-2;
	//	alert(width);
    
    //alert(" tyep-------->>"+typeof(w))
    sta = 0
    end = width
	  frStr = ""
    
    //alert(" tpe "+typeof(w))
    st = pi_txtVal
    esSt = escape(st);
    aryFrStr = esSt.split("%0D%0A")
    
    for (ind = 0; ind < aryFrStr.length; ind++) {
	    unesStr = unescape(aryFrStr[ind])
      if(unesStr.length > 0) {
	      if (unesStr.length>width)
          frStr = frStr+spiltStr(unesStr, width)
	      else
            frStr=frStr+unesStr+"\r\n"
      }
    }
    //alert(" frStr--->>"+frStr)
	  return frStr
  }

  function trim(stringToTrim) {
	 // alert("here 4");
	  return stringToTrim.replace(/^\s+|\s+$/g,"");
  }





 /*function formatString(textvalues, intSize){

 	var srcEle = window.event.srcElement.name;
	 var totalstring  = textvalues.value;
	
	var pi_txtVal  = textvalues.value;
    var width;
	  if (typeof(intSize) == "string")
      width = parseInt(intSize)
    else
	    width=intSize;
	//width = width-1;
	
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
		{
         
		   frStr = frStr+spiltStr(unesStr, width,srcEle)
		}
	      else
		{
          
			frStr=frStr+unesStr+"\r\n"
		}
		  
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
  */
  function trimNumber(s) {
  //while (s.substr(0,1) == '0' && s.length>1) { s = s.substr(1,9999); }
  while (s.charAt(0) == '0') { 
    if (s.length == 1) { break }; 
    if (s.charAt(1) == '.') { break }; 
    s = s.substr(1,s.length-1) 
} 
  return s;
}

String.prototype.startsWith = function(s) { return this.indexOf(s)==0; }



function checkThis(textvalues,vallength,valtype,valdata,nolines,test,mstype)
{
//alert(window.event.srcElement.name);
//alert("textvalues"+textvalues);
//alert("vallength"+vallength);
//alert("valtype"+valtype);
//alert("valdata"+valdata);
//alert("nolines"+nolines);
//alert("test"+test);
//alert("mstype"+mstype);
//x = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890/-?().,+:'"
x = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
y = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-/"
z = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890.@_-"
h = "ABCDEF1234567890"
c = "SMEL"
a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
//i = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
n = "1234567890"
C = "123450"
d = "1234567890"+"."
p = "YN"
r = "DC"
//y = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz/-1234567890"
 // var origString = document.frmOutgoingMessages.name.value; 
 srcEle = window.event.srcElement.name;
//alert("test"+test);
//alert(("document.frmOutgoingMessages."+srcEle).replace("V","ED").value)
 var strFldTag = eval(("document.frmOutgoingMessages."+srcEle).replace("V","ED")).value;
///alert(strFldTag);
 var strFldTag1 = strFldTag.substring(7,8); 
 eval(("document.frmOutgoingMessages."+srcEle).replace("V","E")).value = "";
 //alert("amit");
 strFldTag = strFldTag.substring(0,strFldTag.indexOf(",")); 
  var optiontag=strFldTag+strFldTag1;
  //alert("test"+amit);
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
  var UpperString = (textvalues.value).toUpperCase();
  eval(("document.frmOutgoingMessages."+srcEle)).value = UpperString;
  valuelength = textvalues.value.length;
  var charlast = totalstring.charAt(valuelength);
//alert("test"+test);
  if(charlast=='\n')
   	totalstring.remove(charlast);
 
  
   	var Firstchar=totalstring.charAt(0);
	if(Firstchar == "-" || Firstchar == ":" || Firstchar == "+"){
	 dataerrormessage = "Invalid first Character";
	 alert(dataerrormessage);
    //eval("document.frmOutgoingMessages."+srcEle.replace('V','E')).value = dataerrormessage;
	textvalues.focus();
	return;
	}
	
  if (((eval("document.frmOutgoingMessages."+srcEle).value == "")) && (eval(("document.frmOutgoingMessages."+srcEle).replace("V","MO")).value=="M"))
  {
  		eval(("document.frmOutgoingMessages."+srcEle).replace("V","E")).value = "MANDATORY";
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
			  lengtherror = "Length Should be exactly "+vallength;
		  
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

if(srcEle == 'V_21')
{
	//alert("hello "+ document.frmOutgoingMessages.V_21.value);
	hasWhiteSpace(textvalues);
	getCharge("get", "IC_outgoing_charges.jsp?amt="+document.frmOutgoingMessages.V_21.value)
}

   //ADDED for autopopulate
 if(srcEle=='V_61' )
	{
	// alert(document.frmOutgoingMessages.V_61.value);
	 //getAcctDets('get', 'IC_GET_ACCT_DETS.jsp?acctno='+document.frmOutgoingMessages.V_61.value);
		//alert(document.frmOutgoingMessages.V_61.value);
//added by Kshama 
		var len= document.frmOutgoingMessages.V_61.value.length;
		var acct_num=document.frmOutgoingMessages.V_61.value;
		var res = checkAlpha(acct_num);
		if(res==0)
		{
			alert("Account number cannot contain alphabets");
			document.frmOutgoingMessages.V_61.focus();
			return;
		}
		else if(len!=16)
		{
			alert("Account number must be 16 digit.");
			document.frmOutgoingMessages.V_61.focus();
			return;
		}
		else
		{
			getAcctDets('get', 'IC_GET_ACCT_DETS.jsp?acctno='+document.frmOutgoingMessages.V_61.value);
		}

	}
 //
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

//	if (totalstring=="") return;

	
	enter=0;
	
  
   
 if(valdata=="b" || valdata=="8")
 {
		if(checkdate(eval("document.frmOutgoingMessages."+srcEle))==false)	
		{
 	 		dataerrormessage = "Invalid Date"; 
			alert(dataerrormessage);
			textvalues.focus();
			//eval("document.frmOutgoingMessages."+srcEle.replace('V','E')).value = dataerrormessage;
			return;
		}
 }

 if (valdata=="c")
 {
	if (totalstring != 'SMS' && totalstring != 'EML')
	{
		dataerrormessage = "Valid Values are SMS or EML only."; 
		eval(("document.frmOutgoingMessages."+srcEle).replace("1","2")).value="";
		alert(dataerrormessage);
		textvalues.focus();
		return;
	}
 }
//hereeeeeeeee
//alert(valdata);
 if (valdata=="C")
 {
	//alert("srcEle::"+srcEle);
	//alert("totalstring--"+totalstring+"--");
	if (srcEle=="V_111" )
		{
		if(totalstring !="" && totalstring != "10" && totalstring != "11" && totalstring != "12" && totalstring != "13" && totalstring != "14" && totalstring != "40")
			{
			//alert("1");
			dataerrormessage= "Beneficiary's account type Allowed values are \n 10 - SAVINGS BANK \n 11 - CURRENT ACCOUNT \n 12 - Overdraft \n 13 - CASH CREDIT \n 14 - LOAN ACCOUNT \n 40  NRE ";
			alert(dataerrormessage);
			textvalues.focus();
			return;
			}
		}
	else if (srcEle=="V_51")
		{
		    if( totalstring !="" && totalstring != "10" && totalstring != "11" && totalstring != "12" && totalstring != "13" && totalstring != "40" && totalstring != "50" && totalstring != "51" && totalstring != "52")
			{
			//alert("2");
			dataerrormessage= "Sender's account type Allowed values are \n 10 - SAVINGS BANK \n 11 - CURRENT ACCOUNT \n 12 - Overdraft \n 13 - CASH CREDIT \n 40  NRE \n 50  Remittance for Customer not having account in bank \n 51- Indo Nepal Remittance \n 52  Card to Card Payments";
			alert(dataerrormessage);
			textvalues.focus();
			return;
			}
		}
	
		
 }
 //added 12042011
 if (valdata=="x")
 {
	//alert("srcEle::"+srcEle);
	//alert("totalstring--"+totalstring+"--");
	if (srcEle=="V_121" )
	{
		if(totalstring.contains(' '))
		{
			alert("Beneficiary account number cannot contain spaces!!");
			textvalues.focus();
			return;
		}
	}
 }
 if (valdata=="z")
 {
	if (eval(("document.frmOutgoingMessages."+srcEle).replace("2","1")).value == 'SMS')
	{
		var flag=/^\$?[1-9][0-9]{9,9}?$/.test(totalstring);
		if (flag==false) 
		{
			alert("Please input a valid 10-digit mobile number!")
			textvalues.focus();
			return;
		}
	}
	else if (eval(("document.frmOutgoingMessages."+srcEle).replace("2","1")).value == 'EML')
	{
		var str=totalstring
		var testresults
		var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
		if (filter.test(str))
			testresults=true
		else{
			alert("Please input a valid email address!")
			textvalues.focus();
			return;
			}
	}
	else
	 {
		eval(("document.frmOutgoingMessages."+srcEle).replace("1","2")).value="";
		eval(("document.frmOutgoingMessages."+srcEle).replace("2","1")).focus();
		dataerrormessage = "Please Enter the Valid Type in Above Input Box."; 
		//alert(dataerrormessage);
		return;
	 }
 }

	
 //Validation for amount Field tag. 
 if(valdata=="d")
 {


	 
	
	if(valuelength>0 && valuelength<18)
	{
		//alert("totalstring"+totalstring);
		
		if (totalstring.charAt(0) == '.') 
		{
			dataerrormessage = "Cannot start with a decimal";
			alert(dataerrormessage);
			document.getElementById(srcEle.replace("V","E")).value = "";
			document.getElementById(srcEle.replace("V","E")).value = dataerrormessage;
     		textvalues.focus();
			return;
		}
		
		
		
		/*else if (totalstring<200000) 
		{    
			dataerrormessage = "Amount should be greater than or equal to  2 Lac";
			alert(dataerrormessage);
			document.getElementById(srcEle.replace("V","E")).value = "";
			document.getElementById(srcEle.replace("V","E")).value = dataerrormessage;
     		textvalues.focus();
			return;
		}*/
        
        

		
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
			textvalues.focus();
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
		
	}
	else
	{
		dataerrormessage = "Maximum length can be 17 characters Inclusive of '.'";
		alert(dataerrormessage);
		eval("document.frmOutgoingMessages."+srcEle.replace('V','E')).value = "";
		textvalues.focus();
		//eval("document.frmOutgoingMessages."+srcEle.replace('V','E')).value = dataerrormessage;
		return;
	}
	
	// totalstring=trimNumber(totalstring);
	// textvalues.value=totalstring;
	 //alert(totalstring.startsWith('0.'));
	/*if(totalstring>99999999999999.99)
	{
		alert("Invalid Amount. Max amount can be 99999999999999.99");
		textvalues.focus();
		return;
	}
	else if(valuelength>0 && valuelength<=17)
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
		//ADDED BY TEJAS

		 var flag=/^\$?[0-9][0-9]{0,18}(\.[0-9]{2})?$/.test(totalstring);
		 var flag1=/^\$?[0][0]{0,18}(\.[0][0])?$/.test(totalstring);
		 var flag2 =/^([0]{1})([0-9]{1})/.test(totalstring);
		//alert(flag+"--"+flag1);

		if (flag==false || flag1 == true || flag2==true)
		{
			dataerrormessage = "Entered Amount is Invalid";
			alert(dataerrormessage);
			document.getElementById(srcEle.replace("V","E")).value = "";
			document.getElementById(srcEle.replace("V","E")).value = dataerrormessage;
     		textvalues.focus();
			return;
		}
		//
		var ct=0;
		var i=totalstring.indexOf(",");
		var j;
		var k=0;
	
		if (i>0)
		{
			dataerrormessage = "Comma is not allowed. Please remove Comma.";
			alert(dataerrormessage);
			eval("document.frmOutgoingMessages."+srcEle.replace('V','E')).value = "";
			//eval("document.frmOutgoingMessages."+srcEle.replace('V','E')).value = dataerrormessage;
			return;
		}
/*		if(valuelength > i)
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
		dataerrormessage = "Maximum length can be 17 characters.";
		alert(dataerrormessage);
		eval("document.frmOutgoingMessages."+srcEle.replace('V','E')).value = "";
		//eval("document.frmOutgoingMessages."+srcEle.replace('V','E')).value = dataerrormessage;
		textvalues.focus();
		return;
	}
*/		
}
	
}//end of function

function checkAlpha(value1)
{
	for(i=0;i<value1.length;i++)
	{
		if(value1.charCodeAt(i) >= 65 && value1.charCodeAt(i) <= 90)
		{
			return 0;
		}
	}
}

function checkDataError(valdata,txtvalue,vallength)
{
	//alert("checkDataError::"+valdata+"::"+txtvalue+"::"+vallength);
	var tocheck;
	var tlength = txtvalue.value.length;
	var srcEle = window.event.srcElement.name;
	var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
	if (valdata == "x" || valdata == "y" || valdata == "z" || valdata == "y"){
		tocheck = eval(valdata)  +"\n";
		}
	else
	{
		if (valdata=="b") valdata="n"
		if (valdata=="8") valdata="n"
		if (valdata=="u") valdata="a"
		if (valdata=="i") valdata="i"
		if (valdata=="a" && vallength == 1) valdata="r"
		tocheck = eval(valdata);
		//alert("valdata :::: " + valdata +" :::: tocheck ::: " + tocheck);
	}
	for(j=0;j<tlength;j++)	
	{
		//alert("txtValue"+txtvalue.value.charAt(j)+"::"+txtvalue.value.charCodeAt(j)+"::"+valdata);
		var tochk=tocheck.indexOf(txtvalue.value.substring(j,j+1)) != -1;
		if(tocheck.indexOf(txtvalue.value.substring(j,j+1)) != -1) 
		{	
			if(valdata=="x")
			{	//added 130311 to check if acct num begins with .
				if(txtvalue.value.charCodeAt(j) != 46 && txtvalue.value.charCodeAt(j) != 40 && txtvalue.value.charCodeAt(j) != 41 && txtvalue.value.charCodeAt(j) != 47)
				{
					continue;
				}
			}
			else
				continue;
		}
		else
		{
			if(txtvalue.value.charCodeAt(j) == 13 || txtvalue.value.charCodeAt(j) == 32)
			{
				continue;
			}
			else
			{
				if (valdata=="n")
				{
					return "Please Enter Only Digits.";
				}
				if (valdata=="C")
				{
					//alert("a2");
					//alert("checkDataError::"+valdata+"::"+txtvalue.value+"::"+vallength);
					if (txtvalue.value != "10" && txtvalue.value != "11" && txtvalue.value != "12" && txtvalue.value != "13" && txtvalue.value != "14" && txtvalue.value != "40" && txtvalue.value != "50" && txtvalue.value != "51" && txtvalue.value != "52")
					{
						return "Senders & Receiver account type Allowed values are \n 10 - SAVINGS BANK \n 11 - CURRENT ACCOUNT \n 12 - Overdraft \n 13 - CASH CREDIT \n 14 - LOAN ACCOUNT \n 40  NRE \n 50  Remittance for Customer not having account in bank \n 51- Indo Nepal Remittance \n 52  Card to Card Payments";

						//return "invalid";
					}
				}
				if (valdata=="c")
				{
					return "Valid Values are SMS or EML only.";
				}
				else
				{
					return "Special Characters are Not Allowed. Please Remove Special Characters.";
				}
			}
     	}
		if(txtvalue.value.charCodeAt(j) >= 33 && txtvalue.value.charCodeAt(j) <= 64)
		{
		 return "Special Characters are Not Allowed. Please Remove Special Characters.";
		}
 	} // end of for

	if(valdata=="i")
	{
	//modified by Kshama
		var ifsc = txtvalue.value;
		var len=ifsc.length;
		//var re5digit=txtvalue.value.substring(0,4).match(/\d+/);
		//if(re5digit!=null)
		//alert(re5digit);
		if(len!=11)
		{
			return "IFSC length should be 11 characters.!!!";			
		}
		else if(txtvalue.value.substring(0,4)=="JAKA")
			//alert("Benificiary cannot be of same bank!");
			return "Benificiary IFSC cannot be of same bank!!!";
		else if(txtvalue.value.substring(0,4).match(/\d+/)!=null)
			return "First four characters of IFSC must be alphabets!!!";
		else if(txtvalue.value.substring(4,5)!="0")
			//alert("Benificiary cannot be of same bank!");
			return "Fifth character of IFSC must be zero!";
		else
		{
			//alert("in else");
			sendRequest("get", "IC_IFSC_VALIDATION.jsp?ID_Code="+txtvalue.value);
		}		
	}
	return "";
}

//ADDED 16th apr 2010

function createRequestObject()
{

	var req;

	if(window.XMLHttpRequest)
	{
		//For Firefox, Safari, Opera
		req = new XMLHttpRequest();
	}
	else if(window.ActiveXObject)
	{
		//For IE 5+
		req = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else
	{
		//Error for an old browser
		alert('Your browser is not IE 5 or higher, or Firefox or Safari or Opera');
	}

	return req;
}

//Make the XMLHttpRequest Object
	var http = createRequestObject();

function sendRequest(method, url)
{
	//alert("in send req");	
	if(method == 'get' || method == 'GET')
	{
		http.open(method,url);
		http.onreadystatechange = handleResponse;
		http.send(null);
		}
}

function handleResponse()
{
	if(http.readyState == 4 && http.status == 200)
	{
		var response = http.responseText;
		//alert(response);
		if(response.contains("INVALID IFSC"))
		{
			alert("Invalid IFSC Code.");
			//document.getElementById("ajax_res").innerHTML = response;
		}
		else
		{
			var ifsc = response.split('~');
			var details = ifsc[1].split(':');
			alert(details[0]+"\n"+details[1]+"\n"+details[2]+"\n"+details[3]+"\n"+details[4]);
			if(document.getElementById("ic_recv_detail"))
			{
				document.getElementById("ic_recv_detail").innerHTML=details[0]+"<br>"+details[1]+"<br>"+details[2]+"<br>"+details[3]+"<br>"+details[4];
			}
		}
	}
}

function getCharge(method, url)
{
	//alert("in send req");	
	if(method == 'get' || method == 'GET')
	{
		http.open(method,url);
		http.onreadystatechange = chargeAmt;
		http.send(null);
		}
}

function chargeAmt()
{
	if(http.readyState == 4 && http.status == 200)
	{
		var response = http.responseText;
		var chargeSum = response.substr(0,response.indexOf('<'));
		var charges=chargeSum.split('~');
		document.getElementById('charges').value=charges[0];

		var chargeRaw = charges[0];
		var charge = parseFloat(chargeRaw);
		var perc1 = parseFloat(charges[1]);
		//var stTax = charge * perc1;
		//alert("here     ..")
		var stTax=(charge/100)*perc1;
		stTax=stTax*Math.pow(10,2);
		stTax=Math.round(stTax)/Math.pow(10,2);

		document.getElementById('serviceT').value = stTax;
		document.getElementById('db_charge').value=chargeRaw;
		var tot = charge + stTax;
		document.getElementById('db_charge1').value = tot;
	}
}

//ADDDED 10 may 2010
function getAcctDets(method, url)
{
	//alert("url::"+url);
	
	if(method == 'get' || method == 'GET')
	{
		http.open(method,url);
		http.onreadystatechange = fetchAcctDets;
		http.send(null);
		}
}

function fetchAcctDets()
{
	if(http.readyState == 4 && http.status == 200)
	{
		var response = http.responseText;
		//alert(response);
		document.getElementById("senderDets").innerHTML=response;
		var result=trim(document.getElementById("senderDets").innerHTML);
		//alert(result);
		//alert(document.getElementById("benificIfsc").value+"--"+document.getElementById("benificAcctNum").value+"--"+document.getElementById("specialAcctNum").value);
		if(result.length==1)
		{	if(result=='1')
			{
				alert('Office Accounts Under OABAS Scheme Code are only Allowed');
			}
			else if(result=='2')
			{
				alert('Loan Account is not Allowed');
			}
			else if(result=='3')
			{
				alert('Term Deposite Account is not allowed');
			}
			else if(result=='4')
			{
				alert('Entered Account Number is Closed Account');
				
			}
			else if(result=='I')
			{
				alert('Entered Account Number is Inactive Account');
			}
			else if(result=='F')
			{
				alert('Entered Account Number is Freezed Account');
			}
			else if(result=='D')
			{
				alert('Entered Account Number is Dormat Account');
			}

				document.frmOutgoingMessages.V_61.focus();
				document.frmOutgoingMessages.V_51.value='';
				document.frmOutgoingMessages.V_71.value='';
				document.frmOutgoingMessages.V_81.value='';
				document.frmOutgoingMessages.V_82.value='';
				document.frmOutgoingMessages.V_91.value='';
				document.frmOutgoingMessages.V_151.value='';
		}
		else if(result=='NOT')
		{
			alert('Account Does not exist.');
			document.frmOutgoingMessages.V_61.focus();
			document.frmOutgoingMessages.V_51.value='';
			document.frmOutgoingMessages.V_71.value='';
			document.frmOutgoingMessages.V_81.value='';
			document.frmOutgoingMessages.V_82.value='';
			document.frmOutgoingMessages.V_91.value='';
			document.frmOutgoingMessages.V_151.value='';

		}
		else
		{

			var arrDets=result.split("~");
			
			//for(var i=0;i<arrDets.length;i++)
				//alert(arrDets[3]);
			//alert(document.frmOutgoingMessages.V_91.value);
			
			//document.frmOutgoingMessages.V_71.value=arrDets[3];
			//document.frmOutgoingMessages.V_91.value=arrDets[3];
			//alert(arrDets[3]);
			document.frmOutgoingMessages.V_71.value=arrDets[3].substring(0,35).replace('&amp;','and').replace(/[^a-zA-Z 0-9]+/g,' ');

			var add1=arrDets[4].replace('&amp;','and').replace(/[^a-zA-Z 0-9]+/g,'');
			var add2=arrDets[5].replace('&amp;','and').replace(/[^a-zA-Z 0-9]+/g,'')+" "+arrDets[6].replace('&amp;','and').replace(/[^a-zA-Z 0-9]+/g,'')+" "+arrDets[7].replace('&amp;','and').replace(/[^a-zA-Z 0-9]+/g,'');	
			//alert(arrDets[4]);

			if(arrDets[4]=="" && arrDets[5]=="" && arrDets[6]=="" && arrDets[7]=="")
			{
			document.frmOutgoingMessages.V_91.value="JAMMU AND KASHMIR BANK LTD";
			}
			else
			{
			document.frmOutgoingMessages.V_91.value=add1.substr(0,34)+"\n"+add2.substr(0,34);
			}
			//alert("AMIT");
			if(arrDets[0]!='NA')
			{
				//alert('EML ID PRESENT');
				document.frmOutgoingMessages.V_81.value='EML';
				document.frmOutgoingMessages.V_82.value=arrDets[0];
			}
			else if(arrDets[1]!='NA')
			{
				//alert('SMS PRESENT');
				document.frmOutgoingMessages.V_81.value='SMS';
				document.frmOutgoingMessages.V_82.value=arrDets[1];
			} 
			else
			{
				//alert(document.frmOutgoingMessages.V_41.value.substr(5,10))
				var alpha=document.frmOutgoingMessages.V_41.value.substr(5,10).toLowerCase();
				document.frmOutgoingMessages.V_81.value='EML'
				document.frmOutgoingMessages.V_82.value=alpha+'@jkbmail.com'
			}

			if(document.getElementById("lbl_51")==null)
			{
				document.frmOutgoingMessages.V_51.value=arrDets[2];
			}
			else
			{
				document.getElementById("lbl_51").innerHTML=arrDets[2];
			}
			if(arrDets[2]=='51')
			{
				document.frmOutgoingMessages.V_121.value=document.getElementById("benificAcctNum").value;
				document.frmOutgoingMessages.V_101.value=document.getElementById("benificIfsc").value;
			}
			if(arrDets[2]=='40')
			{
				document.frmOutgoingMessages.V_151.value='NRE';
			}
			/*else
			{
				document.frmOutgoingMessages.V_121.value='';
				document.frmOutgoingMessages.V_101.value='';
			}*/
			//alert(document.frmOutgoingMessages.V_61.value.contains(document.getElementById("specialAcctNum").value));
			/*if(document.frmOutgoingMessages.V_61.value.contains(document.getElementById("specialAcctNum").value))
			{
				//alert("Non Customer Acct");
				if(document.getElementById("lbl_51")==null)
				{
					document.frmOutgoingMessages.V_51.value='50';
				}
				else
				{
					document.getElementById("lbl_51").innerHTML='50';
				}
			}*/
		}
		
	}
}

//
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
			//if(SenderBic==ReceiverBic && txtvalue1=="")
			//{
			//	alert("Sender IFSC code cannot be same as Receiver IFSC");
			//	return;
			//}
			//else if(txtName=="hdnrecbic" && txtvalue1=="" && ReceiverBic=="")
			 if(txtName=="hdnrecbic" && txtvalue1=="" && ReceiverBic=="")
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
			//if(SenderBic==ReceiverBic && txtvalue1=="")
			//{

			//	alert("Sender IFSC code cannot be same as Receiver IFSC");
			//	return;
					
			//}
					
			//else if(txtName=="hdnrecbic" && txtvalue1=="" && ReceiverBic=="")
			if(txtName=="hdnrecbic" && txtvalue1=="" && ReceiverBic=="")
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

//ADDED 16th APR 2010 IFSC VALIDATION
/*function createRequestObject()
{

	var req;

	if(window.XMLHttpRequest)
	{
		//For Firefox, Safari, Opera
		req = new XMLHttpRequest();
	}
	else if(window.ActiveXObject)
	{
		//For IE 5+
		req = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else
	{
		//Error for an old browser
		alert('Your browser is not IE 5 or higher, or Firefox or Safari or Opera');
	}

	return req;
}

//Make the XMLHttpRequest Object
	var http = createRequestObject();
	var ifscflag=false;
*/
/*function sendRequest(method, url)
{
	
	if(method == 'get' || method == 'GET')
	{
		http.open(method,url);
		http.onreadystatechange = handleResponse;
		http.send(null);
		}
}

function handleResponse()
{
	if(http.readyState == 4 && http.status == 200)
	{
		var response = http.responseText;
		//alert(response);
		if(response.contains("INVALID IFSC"))
		{
			alert("Please Enter Valid IFSC Code!!!");
			ifscflag=false;
			//document.getElementById("ajax_res").innerHTML = response;
		}
		else
		{
			ifscflag=true;
			//alert("Correct IFSC");
		}
	}
}
*/

//
function checkerrors2() 
{
/*	var abc = document.frmOutgoingMessages.elements.length;
	var blnflg='N';
	bolSubmit = true;
	for (i=0;i<abc;++i)
	{
		if (document.frmOutgoingMessages.elements(i).type=="textarea") 
		{
			txtName = (document.frmOutgoingMessages.elements(i).name).substring(0,2);
			if(txtName=="E_")
			{
				if(document.frmOutgoingMessages.elements(i).innerText == "MANDATORY")
				{
					//alert("inside the if condition----");
//							alert("Please Correct the Errors in the Message and Proceed as some of the Flds contains either Invalid Characters/Fld Length Exceeded/Mandatory fields");
					alert("Please Enter the Mandatory fields");
					bolSubmit = false;
					break;
				}
			}
		}
	}*/

	//ADDED 16th APR 2010 IFSC VALIDATION
	var benIfsc = document.getElementsByName("V_101")[0].value;
	//
	bolSubmit = true;
	var abc = document.frmOutgoingMessages.elements.length;
	var blnflg='N';
	for (i=0;i<abc;++i)
	{
		if (document.frmOutgoingMessages.elements(i).type=="textarea") 
		{
			txtName = (document.frmOutgoingMessages.elements(i).name).substring(0,2);
			if(txtName=="E_")
			{
				var vData = (document.frmOutgoingMessages.elements(i).name).replace("E","V");
				var moData = (document.frmOutgoingMessages.elements(i).name).replace("E","MO");
				//alert("V Value ::: " + eval(("document.frmOutgoingMessages."+vData)).value);
				//alert("MO Value ::: " + eval(("document.frmOutgoingMessages."+moData)).value);
				if ((eval(("document.frmOutgoingMessages."+vData)).value=="") && (eval(("document.frmOutgoingMessages."+moData)).value=="M"))
				{
					if(document.frmOutgoingMessages.elements(i).innerText == "MANDATORY")
					{
						//alert("txtName in :::: " + document.frmOutgoingMessages.elements(i).name);
						//alert("inside the if condition----");
	//								alert("Please Correct the Errors in the Message and Proceed as some of the Flds contains either Invalid Characters/Fld Length Exceeded/Mandatory fields");
						alert("Please Enter the Mandatory fields");
						bolSubmit = false;
						break;
					}
				}
				else if ((eval(("document.frmOutgoingMessages."+vData)).value=="SMS"))
				{
					vData = vData.replace("1","2");
					var totalstring = (eval(("document.frmOutgoingMessages."+vData))).value;
					var f=1;
					for(x=0; x<totalstring.length; x++)
					{
						if(!(totalstring.charAt(x)>='0' && totalstring.charAt(x)<='9') || totalstring.charAt(0)=='0')
							f=0;
					}
					if(f==0 || totalstring.length!=10)
					{
						alert("Please input a valid 10-digit mobile number!");
						bolSubmit = false;
						break;
					}
					/*var flag=/^\$?[1-9][0-9]{9,10}?$/.test(totalstring);
					if (flag==false)
					{
						alert("Please input a valid 10-digit mobile number!");
						bolSubmit = false;
						break;
					}*/
				}
				else if ((eval(("document.frmOutgoingMessages."+vData)).value=="EML"))
				{
					vData = vData.replace("1","2");
					var totalstring = (eval(("document.frmOutgoingMessages."+vData))).value;
					var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
					if (!filter.test(totalstring)){
						alert("Please input a valid email address!")
						bolSubmit = false;
						break;
					}
				}
				else
				{
					document.frmOutgoingMessages.elements(i).innerText = "";
				}
			}
		}
	}
	
	//ADDED 16th APR 2010 BEN IFSC VALIDATION
	//if(document.getElementsByName("V_101")[0].readonly==false)
	//{
		//if(benIfsc.substring(0,4)=="JAKA")
		//	{
		//		alert("Beneficiary IFSC cannot be of same bank!!!!");
		//		bolSubmit= false;
		//	}
		//	else
	//		{
	//			sendRequest("get", "IC_IFSC_VALIDATION.jsp?ID_Code="+benIfsc);
	//		}
	//	if(ifscflag==false)
	//		bolSubmit= false;
	//}
	//

	if (bolSubmit == true) {
	 var txtvalue=document.frmOutgoingMessages.ReceiverBic.value;
	 var txtvalue1=document.getElementById("hdnrecbic").value;
	 var abc = document.frmOutgoingMessages.elements.length;
	document.frmOutgoingMessages.btnsubmit.value="PROCESSING.....";
	document.frmOutgoingMessages.btnsubmit.disabled="true";
	document.frmOutgoingMessages.action = "IC_OutgoingMessageModificationUpdateForDisbfield.jsp";
	document.frmOutgoingMessages.method = "post";
	document.frmOutgoingMessages.submit();
	}
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
			//if(SenderBic==ReceiverBic && txtvalue1=="")
			//{
			//	alert("Sender IFSC code cannot be same as Receiver IFSC");
			//	return;
			//}
			//else if(txtName=="hdnrecbic" && txtvalue1=="" && ReceiverBic=="")
			if(txtName=="hdnrecbic" && txtvalue1=="" && ReceiverBic=="")
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
function chkerrNEFT(SenderBic,ReceiverBic) 
{
	
	var txtvalue=document.frmOutgoingMessages.ReceiverBic.value;
	var txtvalue1=document.getElementById("hdnrecbic").value;
	var abc = document.frmOutgoingMessages.elements.length;
	var amtValue = document.getElementsByName("V_21");
	//var valdFlg = document.getElementById("valdtFlag").value;
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
					return false;
				}
			}
		}

		if (document.frmOutgoingMessages.elements(i).type=="text" ) 
		{
			txtName = (document.frmOutgoingMessages.elements(i).name);
			 var txtvalue=document.frmOutgoingMessages.ReceiverBic.value;
			//if(SenderBic==ReceiverBic && txtvalue1=="")
			//{
			//	alert("Sender IFSC code cannot be same as Receiver IFSC");
			//	return;
			//}
			//else if(txtName=="hdnrecbic" && txtvalue1=="" && ReceiverBic=="")
			 if(txtName=="hdnrecbic" && txtvalue1=="" && ReceiverBic=="")
			 {
				
				if(document.frmOutgoingMessages.hdnrecbic.value=="")
				{
					alert("Enter the Correct Receiver IFSC Code");
					return false;
				}
			}
		}
	}

	/*if(valdFlg == "false" && valdFlg !=null)
	{
		alert("Please Enter A Valid IFSC Code..");
	return false;
	}
	else{
	return true;
	}*/
	document.frmOutgoingMessages.btnsubmit.value="PROCESSING.....";
	document.frmOutgoingMessages.btnsubmit.disabled="true";
	document.frmOutgoingMessages.action = "IC_OutgoingMessageModificationUpdateNEFT.jsp";
	document.frmOutgoingMessages.method = "post";
	document.frmOutgoingMessages.submit();
}


function hasWhiteSpace(val) 
{
	//alert("Inside This");
	
    var pattern=/^(\d{6,14})+((\.(\d{0,2})))$/;
	var pattern1=/^(\d){6,14}$/;
	var i=0;
	//var j=0;
	var s=true;
	var data_message;
	var charter="";
	var msgType=document.frmOutgoingMessages.hdnMsgtype.value;
	//alert(msgType);
	if(msgType=="R41")
	{
		//document.getElementById('attach').checked=false;
	}
	for(var j=0;j<(val.value).length;j++)
	{
		if(((val.value).charAt(j)=='.'))
		{
			charter=(val.value).charAt(j);
			//alert(charter);
			i++;
			//alert(i);
			
		}
		else if((val.value).charAt(j)==" ")
		{
			//val.value="";
			val.value;
			val.focus();
			alert("Amount Cannot Have Space");
			return false;
		}
		else if((val.value).charAt(j)==",")
		{
			//val.value="";
			val.value;
			val.focus();
			alert("Amount Cannot Have Comma");
			return false;
		}


		//alert(i);
	}
	
	if((val.value).charAt(0)=='0')
		{
			//val.value="";
			val.focus();
			alert("Amount Cannot Start With Zero");
			return false;
		}
		//if(msgType=="R41")
	/*{
		if((val.value).charAt(0)=='1'&& (val.value).length==6)
		{
			//val.value="";
			val.value;
			val.focus();
			alert("Amount Should be Greater Than 2 Lakh");
			return false;
		}
	if((val.value).length<6)
	{
		//val.value="";
		val.focus();
		//alert("Amount Should Be Greater Than 2 Lakh");
		alert("Amount should be greater than or equal to  2 Lac");
		return false;
	}
	}
	if(msgType=="R42")
	{
		if(val.value<1)
		{
			val.value="";
			val.focus();
			//alert("in 1st"+val.value);
			alert("Amount Should Be Greater Than OR equal to Rs.1");
			return false;
		}

	}
	if(msgType=="R10")
	{
		if(val.value<1)
		{
			val.value="";
			val.focus();
			//alert("in 1st"+val.value);
			alert("Amount Should Be Greater Than OR equal to Rs.1");
			return false;
		}

	}*/
	if(i==0)
	{
		amt=val.value+".00";
		val.value = amt;
	}

	if(i==1)
	{
		var afterdec = "";
		for(var j=0;j<(val.value).length;j++)
		{
			if(((val.value).charAt(j)=='.'))
			{
				afterdec=(val.value).substr(j+1,(val.value).length)
			}
		}
		if(afterdec.length==1)
		{
			val.value=val.value+"0";
		}
	}

	if(i>1)
	{
		//val.value="";
		val.value;
		val.focus();
		alert("Amount Cannot Have Multiple Decimals");
		return false;
	}
	if(i==1)
	{
		
		value=(val.value).trim();
		var myarray=new Array(100);
		myarray=value.split(charter);
		/*if(myarray[0].length<6)
		{
			//val.value="";
			val.value;
			val.focus();
			//alert("Amount Should Be Greater Than 2 Lakh");
			alert("Amount should be greater than or equal to  2 Lac");
			return false;
		}*/
		if(myarray[1].length>2)
		{
			//val.value="";
			val.value;
			val.focus();
			alert("Amount Should Be Only Upto 2 Decimals");
			return false;
		}

	}
	if(i==0)
	{
		s=pattern1.test(val.value);
		//data_message="Please Enter The Amount Again";
		//alert(s);
		if((val.value).length>14)
		{
	
		//val.value="";
		val.focus();
		alert("Amount Should Be less than Or equal to 14 characters");
		//return false;
		}
	
		data_message="Please Enter The Amount Again";
		//alert("Please Enter The Amount Again");
		
		return false;
	}
	else
	{
	
	s=pattern.test(val.value);
	data_message="Please Enter The Amount Again";
		return false;
	
	}
	if(!s)
	{
		val.value='';
		val.focus();
		alert(data_message);
	}
} 

function getServiceTaxCountOnCreate(val,perc)
{
	//alert("Hello......");
	if(val.value != "")
	{
		var chargeRaw = val.value;
		var charge = parseFloat(chargeRaw);
		var perc1 = parseFloat(perc);
		//var stTax = charge * perc1;
		//alert("here     ..")
		var stTax=(charge/100)*perc1;
		stTax=stTax*Math.pow(10,2);
		stTax=Math.round(stTax)/Math.pow(10,2);
		//stTax = Math.round(stTax*Math.pow(10,2))/Math.pow(10,2);
		if(stTax == 0)
		{
			stTax = 0;
		}
		document.getElementById('serviceT').value = stTax;
		document.getElementById('db_charge').value=chargeRaw;
		var tot = charge + stTax;
		document.getElementById('db_charge1').value = tot;
	}
	else
	{
		val.value = 0;
		document.getElementById('serviceT').value = 0;
		document.getElementById('db_charge1').value=0;
		document.getElementById('db_charge').value=0;
	}
		
}

function getServiceTaxCount(val,perc)
{
	if(val.value != "")
	{
		var chargeRaw = val.value;
		var charge = parseFloat(chargeRaw);
		var perc1 = parseFloat(perc);
		//var stTax = charge * perc1;
		//stTax = Math.round(stTax*Math.pow(10,2))/Math.pow(10,2);
		var stTax=(charge/100)*perc1;
		stTax=stTax*Math.pow(10,2);
		stTax=Math.round(stTax)/Math.pow(10,2);
		document.getElementById('serviceT').value = stTax;
	}
	else
	{
		val.value = 0.0;
		document.getElementById('serviceT').value = 0.0;
	}
		
}





