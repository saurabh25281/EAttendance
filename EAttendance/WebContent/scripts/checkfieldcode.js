var xmlHttp;
var hint="";
var fieldvalue="";
function checkfieldcode(str,varhint,SubFldRefNo,app_id,msg_Type)
{
alert("SubFldRefNo"+SubFldRefNo);
alert("str"+str.value);
alert("msg_Type"+msg_Type);
fieldvalue=str.value;
hint=varhint;
alert("fieldvalue="+fieldvalue);
xmlHttp=GetXmlHttpObject();
if (xmlHttp==null)
  {
  alert ("Your browser does not support AJAX!");
  return;
  }
var url="IC_Outgoing_CheckFieldCode.jsp";
url=url+"?SubFldRefNo="+SubFldRefNo+"&app_id="+app_id+"&msg_Type="+msg_Type+"&fieldvalue="+fieldvalue;
url=url+"&sid="+Math.random();
alert("url"+url);
xmlHttp.onreadystatechange=stateChanged;
xmlHttp.open("GET",url,true);
xmlHttp.send(null);
}
function stateChanged()
{
if (xmlHttp.readyState==4)
{
document.getElementById(hint).innerHTML=xmlHttp.responseText;
}
}
function GetXmlHttpObject()
{
var xmlHttp=null;
try
  {
  // Firefox, Opera 8.0+, Safari
  xmlHttp=new XMLHttpRequest();
  }
catch (e)
  {
  // Internet Explorer
  try
    {
    xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
    }
  catch (e)
    {
    xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
return xmlHttp;
} 