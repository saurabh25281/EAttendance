			function charge_compare()
				{
					//alert("hello");
					var charter=0;
					var i=0;
					var flg=true;
					var input=document.getElementById('db_charge').value;
					//alert("hello1");
					//alert(input);
					var new_charge=document.getElementById('charges').value;
					//alert("hello2");
					//alert(new_charge);
					if(new_charge.charAt(0)==".")
							{
								//alert("1");
								document.getElementById('charges').value=input;
							}
					if(new_charge!="")
					{
						if(new_charge.charAt(0)!='0')
						{
						for(var j=0;j<new_charge.length;j++)
						{
							if(new_charge.charAt(j)=='.')
							{
							charter=new_charge.charAt(j);
							//alert(charter);
							i++;
							//alert(i);
							}
						}
						if(i==0)
						{
							if(new_charge.length>14)
							{
								document.getElementById('charges').value="";
								document.getElementById('charges').focus();
								alert("Amount Cannot Be Having More Than 14 Digits");
								document.getElementById('charges').value=input;
								flg=true;
								return false;
							}
						}
						if(i==1)
						{
							var myarray=new Array(10);
							myarray=new_charge.split(charter);
							if(myarray[0].length>14)
							{
								document.getElementById('charges').value="";
								document.getElementById('charges').focus();
								alert("Amount Cannot Be Having More Than 14 Digits Before Decimals");
								document.getElementById('charges').value=input;
								flg=true;
								return false;
							}
							if(myarray[1].length>2)
							{
								document.getElementById('charges').value="";
								document.getElementById('charges').focus();
								alert("Amount Cannot Have More Than 2 Decimals");
								//document.getElementById('charges').value=input;
								//flg=true;
								return false;
							}
						}
						if(i>1)
						{
							document.getElementById('charges').value="";
							document.getElementById('charges').focus();
							alert("Amount Cannot Have Multiple Decimals");
							document.getElementById('charges').value=input;
							flg=true;
							return false;
						}
						if(parseFloat(new_charge)>parseFloat(input))
						{
						document.getElementById('charges').value="";
						document.getElementById('charges').focus();
						alert("Amount Changed Cannot Be More Than Set Amount");
						document.getElementById('charges').value=input;
						flg=true;
						return false;
						}
						}
						else
						{
							//document.getElementById('charges').value="";
							//document.getElementById('charges').focus();
							
							//alert("Amount Cannot Start With Zero");
							//document.getElementById('charges').value=input;
							var a=document.getElementById('charges').value;
							if(document.getElementById('charges').value.charAt('0')==0 && i == 0)
							{
								document.getElementById('charges').value="0";
							}
							
							
							return true;
							

						}
					}                     
					
					return flg;
				}