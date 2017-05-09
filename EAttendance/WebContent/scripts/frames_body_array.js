/*
 Milonic DHTML Website Navigation Menu
 Written by Andy Woolley - Copyright 2002 (c) Milonic Solutions Limited. All Rights Reserved.
 Please visit http://www.milonic.com/ for more information.
 
 The Free use of this menu is only available to Non-Profit, Educational & Personal web sites.
 Commercial and Corporate licenses  are available for use on all other web sites & Intranets.
 All Copyright notices MUST remain in place at ALL times and, please keep us informed of your 
 intentions to use the menu and send us your URL.
 
 If you are having difficulty with the menu please read the FAQ at http://www.milonic.com/faq.php before contacting us.

*/

//The following line is critical for menu operation, and MUST APPEAR ONLY ONCE. If you have more than one menu_array.js file rem out this line in subsequent files
menunum=0;menus=new Array();_d=document;function addmenu(){menunum++;menus[menunum]=menu;}function dumpmenus(){mt="<script language=javascript>";for(a=1;a<menus.length;a++){mt+=" menu"+a+"=menus["+a+"];"}mt+="<\/script>";_d.write(mt)}
//Please leave the above line intact. The above also needs to be enabled if it not already enabled unless this file is part of a multi pack.



////////////////////////////////////
// Editable properties START here //
////////////////////////////////////


// Special effect string for IE5.5 or above please visit http://www.milonic.com/filters_sample.php for more filters
if(navigator.appVersion.indexOf("MSIE 6.0")>0){
	effect = "Fade(duration=0.2);Alpha(style=0,opacity=88);Shadow(color='#777777', Direction=135, Strength=5)"
}
else{
	effect = "Shadow(color='#777777', Direction=135, Strength=5)"
}


timegap=500					// The time delay for menus to remain visible
followspeed=5				// Follow Scrolling speed
followrate=40				// Follow Scrolling Rate
suboffset_top=10;			// Sub menu offset Top position 
suboffset_left=10;			// Sub menu offset Left position
Frames_Top_Offset=0 		// Frames Page Adjustment for Top Offset
Frames_Left_Offset=90		// Frames Page Adjustment for Left Offset



plain_style=[				// Menu Properties Array
"#717D7D",						// Off Font Color
"ffffff",					// Off Back1 Color
"#717D7D",					// On Font Color
"#E6E6E6",					// On Back Color
"000000",					// Border Color
10,							// Font Size
"normal",					// Font Style
"bold",						// Font Weight
"Verdana, Tahoma, Arial, Helvetica",	// Font
4,							// Padding
"./images/arrow.gif"					// Sub Menu Image
,							// 3D Border & Separator
,"66ccff"					// 3D High Color
,"000099"					// 3D Low Color
]


addmenu(menu=["outgoing",
,,130,1,"",plain_style,,,effect,,,,,,,,,,,,
,"Outgoing Messages","show-menu=outgoing1",,,
,"Incoming Messages","show-menu=incoming",,,
//,"Create", "outgoingcreate.jsp",,,0
//,"Edit", "msgcorrectnew.jsp",,,0
//,"Verification", "outgoingauthorization.jsp",,,0
//,"Reports", "outgoingreport.jsp",,,0
//,"Create Template", "Template.jsp",,,0
//,"Modify Template", "ModifyTemplate.jsp",,,0
//,"Download SFMS FILE", "downloadsfmsfile.jsp",,,0
])


addmenu(menu=["outgoing1",
,,100,1,"",plain_style,,"left",effect,,,,,,,,,,,,
,"Modification", "IC_Outgoing_MessageModification.jsp",,,0
,"Verification", "IC_Outgoing_Verification.jsp",,,0
,"Reports", "IC_Outgoing_Report.jsp",,,0
,"Template", "show-menu=template",,,0
//,"Modify Template", "ModifyTemplate.jsp",,,0
])


addmenu(menu=["template",
,,100,1,"",plain_style,,"left",effect,,,,,,,,,,,,
,"Create Template", "IC_Outgoing_Template.jsp",,,0
,"Modify Template", "IC_Outgoing_Template_Modify.jsp",,,0
])




addmenu(menu=["incoming",
,,100,1,"",plain_style,,"left",effect,,,,,,,,,,,,
,"Edit", "IncomingMsgRepair.jsp",,,0
,"Verification", "InmsgAuthorize.jsp",,,0
,"Reports", "IncomingReports.jsp",,,0
])

/* Message Admin - Added By Parveen*/
addmenu(menu=["MessgAdmin",
,,130,1,"",plain_style,,,effect,,,,,,,,,,,,
,"Message Standards","show-menu=Masters",,,
,"Message Mappings","show-menu=Mappings",,,
])

addmenu(menu=["Masters",
,,130,1,"",plain_style,,"left",effect,,,,,,,,,,,,
,"Message Master ", "show-menu=MessageMaster",,,0
,"Description ", "show-menu=Desc",,,0
,"Error ", "show-menu=Error",,,0
])

addmenu(menu=["MessageMaster",
,,100,1,"",plain_style,,"left",effect,,,,,,,,,,,,
,"Add", "IC_MsgSetup_messageMaster.jsp",,,0
,"Modify", "show-menu=EditMs",,,0
,"View", "show-menu=ViewMs",,,0
])

addmenu(menu=["ViewMs",
,,100,1,"",plain_style,,"left",effect,,,,,,,,,,,,
,"ViewMessage", "editMessMaster.jsp?menuFlag=view",,,0
,"ViewField", "editFldRef.jsp?menuFlag=view",,,0
])


addmenu(menu=["EditMs",
,,100,1,"",plain_style,,"left",effect,,,,,,,,,,,,
,"EditMessage", "editMessMaster.jsp",,,0
,"EditField", "editFldRef.jsp",,,0
])


addmenu(menu=["Error",
,,100,1,"",plain_style,,"left",effect,,,,,,,,,,,,
,"Add", "errorAdd.jsp",,,0
,"Modify", "errorEdit.jsp",,,0
,"View", "errorEdit.jsp?menuFlag=view",,,0
])


addmenu(menu=["Desc",
,,100,1,"",plain_style,,"left",effect,,,,,,,,,,,,
,"Field Desc", "show-menu=fldDesc",,,0
,"SubField Desc", "show-menu=SubfldDesc",,,0
])

addmenu(menu=["fldDesc",
,,100,1,"",plain_style,,"left",effect,,,,,,,,,,,,
,"Add/Edit", "fieldDesc.jsp",,,0
,"View", "fieldDesc.jsp?menuFlag=view",,,0
])
addmenu(menu=["SubfldDesc",
,,100,1,"",plain_style,,"left",effect,,,,,,,,,,,,
,"Add", "subFieldDesc.jsp",,,0
,"Modify", "editSubFieldDesc.jsp",,,0
,"View", "editSubFieldDesc.jsp?menuFlag=view",,,0
])

addmenu(menu=["Mappings",
,,130,1,"",plain_style,,"left",effect,,,,,,,,,,,,
,"Header Map ", "show-menu=HeaderMapp",,,0
,"SubField Map ", "show-menu=subFldMapp",,,0
])

addmenu(menu=["subFldMapp",
,,100,1,"",plain_style,,"left",effect,,,,,,,,,,,,
,"Add/Edit", "sfldMapAdd.jsp",,,0
,"View", "sfldMapAdd.jsp?menuFlag=view",,,0
])
addmenu(menu=["HeaderMapp",
,,100,1,"",plain_style,,"left",effect,,,,,,,,,,,,
,"Add", "headerAdd.jsp",,,0
,"Modify", "headerEdit.jsp",,,0
,"View", "headerEdit.jsp?menuFlag=view",,,0
])
/* End */
addmenu(menu=["user",
,,130,1,"",plain_style,,"left",effect,,,,,,,,,,,,
,"Add", "IC_usermaintenance_add.jsp",,,0
,"Verify", "IC_usermaintenance_verify1.jsp",,,0
,"Modify", "IC_usermaintenance_modify.jsp",,,0
,"Delete", "IC_usermaintenance_delete.jsp",,,0
,"Un-Delete", "IC_usermaintenance_undelete.jsp",,,0
//,"Change Password", "changepwd.jsp",,,0
,"Report", "IC_usermaintenance_report.jsp",,,0
])

addmenu(menu=["logout",,,50,1,,plain_style,0,"left",effect,0,,,,,,,,,,,
,"Apache Web Server","history.php?tp=apache",,,1])


dumpmenus()