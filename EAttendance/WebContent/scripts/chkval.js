function checkValidity(form){    	
		
		
		if (window.document.frm_exit.txtaccno.value == "" )      
		{
		alert ("Please enter an account number");		
       		window.document.frm_exit.txtaccno.focus();
		return false;			
		}		
		
		
		
		
		
		if (window.document.frm_exit.txtclosedate.value == "" )      
		{
		alert ("Please enter the Date of Closure!");		
       		window.document.frm_exit.txtclosedate.focus();
		return false;			
		}		
		
	
		
		var pmt = window.document.frm_exit.txtpmtmode.options[window.document.frm_exit.txtpmtmode.selectedIndex].value;
		if (pmt == "")      
		{
		alert ("Please enter the Payment Mode!");		
       	window.document.frm_exit.txtpmtmode.focus();
		return false;			
		}
		
		
    
            picked = false;
			for (var i = 0; i < document.frm_exit.txtreason.length; i++) {
			  if (document.frm_exit.txtreason[i].checked) {
			     picked = true;
			  }
			}
			if (!picked) {
			     alert('Please select a reason!');
			      return false;
			}
			
			
		if(window.document.frm_exit.txtreason[6].checked && window.document.frm_exit.txtdesc.value==""){
		alert ("Please Describe the reason selected!");		
       		window.document.frm_exit.txtdesc.focus();
		return false;
		}
		
		if(window.document.frm_exit.txtreason[7].checked && window.document.frm_exit.txtdesc.value==""){
		alert ("Please Describe the reason selected!");		
       		window.document.frm_exit.txtdesc.focus();
		return false;
		}
		
		if(window.document.frm_exit.txtreason[10].checked && window.document.frm_exit.txtdesc.value==""){
		alert ("Please Describe the reason selected!");		
       		window.document.frm_exit.txtdesc.focus();
		return false;
		}
		
		if (window.document.frm_exit.txtaccbal.value == "" )      
		{
		alert ("Please enter the Account Balance!");		
       		window.document.frm_exit.txtaccbal.focus();
		return false;			
		}		

		var fdxx = window.document.frm_exit.txtfdclose.options[window.document.frm_exit.txtfdclose.selectedIndex].value;
			if (fdxx == "")      
			{
			alert ("FD Closed...?");		
       		window.document.frm_exit.txtfdclose.focus();
			return false;			
			}			
		}