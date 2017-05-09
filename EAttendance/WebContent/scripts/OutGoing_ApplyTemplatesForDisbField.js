function textCounter(field, countfield, maxlimit) {

var msg = "";
var c = 0;
var fieldlength=field.value.length;
for (x = 0; x < fieldlength; x++)
      {
      if (fieldlength> 35)
         {
         //alert("Only thiry five words per line!");
         //tbox_input.value = msg;
         break;
         }
      //msg = msg +" ";
      //c++
      }

if (field.value.length > maxlimit) // if too long...trim it!
field.value = field.value.substring(0, maxlimit);
// otherwise, update 'characters left' counter
else 
countfield.value = maxlimit - field.value.length;
}



var valuelength;
var lengtherror="";
var lengtherrormessage="";
var valtype;
function isIDCode(bictextname)
{
	var ID_Code=eval('document.frmOutgoingMessages.' + bictextname + '.value');
	if((ID_Code !="") && (ID_Code.length >= 8))
	{
		window.open("IC_Outgoing_IDValidate.jsp?ID_Code="+ID_Code,"ID_Code_Description",'top=200,left=225,toolbar=no,menubar=no,scrollbars=no,location=no,height=250,width=500');
	}
	else
	{
		alert("Please enter the ID CODE");
	}	
}

		function getParent(el, pTagName) {
			if (el == null) return null;	
			//alert(el.nodeType+', '+el.tagName);
			if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase())
				return el;
			return getParent(el.parentNode, pTagName);	
		}

		function getElementsByClass(searchClass, node, tag) {
			var classElements = new Array();
			if (node == null) node = document;
			if (tag == null) tag = "*";
			var elements = node.getElementsByTagName(tag);
			for (var i = 0; i < elements.length; i++)
				if (elements[i].className.toLowerCase() == searchClass.toLowerCase())
					classElements[classElements.length] = elements[i];
			return classElements;
		}
	
		function checkMultiple(textInput) {
			var parentAnchor = getParent(textInput, "a");
			var className = parentAnchor.className;
			//alert('checkMultiple()->classname='+className);
			//var enableAll = !childHasValue(parentAnchor);
			var elements = getElementsByClass(className, null, "a");
			var blnSubFieldPresent = false;
			blnSubFieldPresent = childHasValue1(elements, parentAnchor);
			//alert('checkMultiple()->blnSubFieldPresent='+blnSubFieldPresent);
			var enableAll = !blnSubFieldPresent;
			for (var i = 0; i < elements.length; i++) {
				if (enableAll){
					updateChildren(elements[i], false);
				} else {
					//alert('checkMultiple()->'+elements[i].id+","+parentAnchor.id);
					if (elements[i].id != parentAnchor.id)
						updateChildren(elements[i], true);
					//else
						//updateChildren(elements[i], false);	
				}
			}
		}
	
		function childHasValue(element) {
			if (element.hasChildNodes()) {
				//alert('childHasValue()->element.childNodes.length='+element.childNodes.length);
				var children = element.childNodes;
				for(var i=0; i<children.length; i++) {
					//alert('childHasValue()->'+children[i].type+','+children[i].name);
					if ((children[i].type == "text" || children[i].type == "textarea") && children[i].name.search(/^V_/) != -1) {
						if(children[i].value != "") {
							return true; 
						}
					} 
					if (children[i].hasChildNodes()) { 
						if (childHasValue(children[i])) return true;
					}
					
				}
			}
			return false;
		}

		function childHasValue1(anchorElements, searchAnchor) {
			if (anchorElements.length > 0) {
				for (var anchor = 0; anchor < anchorElements.length; anchor++) {
					if (anchorElements[anchor].id == searchAnchor.id) {
						//alert('childHasValue1()->anchorElements[anchor].id='+anchorElements[anchor].id);
						if (anchorElements[anchor].hasChildNodes()) {
							//alert('childHasValue1()->element[i].childNodes.length='+element[i].childNodes.length);
							var children = anchorElements[anchor].childNodes;
							for (var i=0; i<children.length; i++) {
								//alert('childHasValue()->'+children[i].type+','+children[i].name);
								if ((children[i].type == "text" || children[i].type == "textarea") && children[i].name.search(/^V_/) != -1) {
									if(children[i].value != "") {
										return true; 
									}
								} 
							}
						}
					}
				}
			}
			return false;
		}
		
	
		function updateChildren(element, disableFlag) {
			if (element.hasChildNodes()) {
				var children = element.childNodes;
				//alert(children.length);
				for(var i=0; i<children.length; i++) {
					if ((children[i].type == "text" || children[i].type == "textarea") && children[i].name.search(/^V_/) != -1) {
						if(!children[i].hidden) {
							//alert(children[i].name+", "+children[i].value);
							children[i].disabled = disableFlag;
							children[i].style.background = (disableFlag)?"#B8B6BC":"#ffffff";
							return;
						}
					} 
					if (children[i].hasChildNodes()) { 
						updateChildren(children[i], disableFlag);
					}
	
				}
			}
		}
