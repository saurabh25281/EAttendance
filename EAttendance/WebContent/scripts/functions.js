function callRound(valueToRound,deciPos){
	return ((Math.round(valueToRound*Math.pow(10,deciPos)))/Math.pow(10,deciPos));
}

function dttst(pi_date)
{
  var vmnth;
  switch (pi_date)
{
	case 'Jan':
  		 vmnth= '01';
		 break;
	case 'Feb':
  		 vmnth = '02';
		 break;		
	case 'Mar':
  		 vmnth = '03';
		 break;		  	
	case 'Apr':
  		 vmnth = '04';
		 break;		
	case 'May':
  		 vmnth = '05';
		 break;		
	case 'Jun':
  		 vmnth = '06';
		 break;  
	case 'Jul':
  		 vmnth = '07';
		 break;
	case 'Aug':
  		 vmnth = '08';
		 break;
	case 'Sep':
  		 vmnth = '09';
		 break;
	case 'Oct':
  		 vmnth = '10';
		 break;		
	case 'Nov':
  		 vmnth = '11';
		 break;		
	case 'Dec':
  		 vmnth = '12';
		 break;		   
	}	
	return vmnth;
}

function trim1(pVal) {
	if (pVal == null) {
		return;
	}
  pVal = pVal.replace(/^\s+/, '');
  return pVal.replace(/\s+$/, '');
}

// function to check whether the textbox has data or not
function chkEmpty(pi_txtbx)
{
   pi_txtbx = trim1(pi_txtbx);
   if ((pi_txtbx.length * 1) > 0) 
	{
	   return false;
	   }
	else
	{
	  return true;   
	  }
} 
//function to get the Current Date
function getCurrDate(){
	  var objdd=new Date();
	  var today="";
	  if((objdd.getDate()+1)<10)
		  today="0"+objdd.getDate();
	  else
		  today=""+objdd.getDate();
	  var toMonth="";
// formatting to dd-mmm-yy
		switch(objdd.getMonth()+1+""){
		case  '1':
				toMonth="Jan"
				break;

		case  '2':
				toMonth="Feb"
				break;
		case  '3':
				toMonth="Mar"
				break;
		case  '4':
				toMonth="Apr"
				break;
		case  '5':
				toMonth="May"
				break;
		case  '6':
				toMonth="Jun"
				break;
		case  '7':
				toMonth="Jul"
				break;
		case  '8':
				toMonth="Aug"
				break;
		case  '9':
				toMonth="Sep"
				break;
		case  '10':
				toMonth="Oct"
				break;
		case  '11':
				toMonth="Nov"
				break;
		case  '12':
				toMonth="Dec"
				break;
		default :
		}
		var strDate=today+"-"+toMonth+"-"+(objdd.getYear()+"").substring(2,4);
		return strDate
	}
function putComma(pi_obj)
{
	var strtemp = "";
	strtemp = pi_obj+"";
    var strfinal = "";
	var po_objfinal = "";
	var strtemp1 = strtemp.split('.');
	strtemp=strtemp1[0];
	var intflg="";
	var intflg1="";
	var strGDcml = "."+strtemp1[1];
	if(strtemp==0)
		return false;
	for(var i = 0; i < strtemp.length; i++) //Checking for comma and setting the flag
	{
		if(strtemp.charAt(i) == ",")
		{
			intflg = "1";
			i = strtemp.length;
		}
	}
    strfinal += strtemp.substring(0, ((strtemp.length*1) % 3)) + ",";
    strtemp = strtemp.substring(((strtemp.length * 1) % 3));
    while ((strtemp.length * 1) > 0 && (!(intflg == "1"))) //Checking empty text box and checking the flag whether comma is already there
    {
		strfinal += strtemp.substring(0, 3) + ",";
		strtemp = strtemp.substring(3);
    }
	if ((intflg1 == "1")) //Checking for the number
	{
		alert("Not a valid number !!");
		intflg1 = "0";					
		return false;
	}
	else
	{
	    if (strfinal.charAt(0) == ",") {
		    strfinal = strfinal.substring(1);
		}
	    if (strfinal.charAt((strfinal.length * 1) - 1) == ","){
		    strfinal = strfinal.substring(0, (strfinal.length * 1) - 1);
		}
		return strfinal.concat(strGDcml);
	}
}