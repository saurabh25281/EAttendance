<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head>
<LINK href='./css/login.css' rel=stylesheet>
<style>

</style>
</head>
<body>
 
    <h1>E Attendance Login</h1>

<div class="stand">
  <div class="outer-screen">
    <div class="inner-screen">
      <div class="form">
      <s:form action="verify">
        <s:textfield  name="uname" label="User name" />
        <s:password  name="password" label="Password" />
        <s:select label="Select User Type" 
		headerKey="-1" headerValue="Select Type"
		list="#{'teachers':'Teacher', 'student':'Student', 'parents':'Parent'}" 
		name="utype" 
		value="2" />
         <s:submit value="Login" align="center" />
         </s:form>
      </div> 
    </div> 
  </div> 
</div>
  </body>
</html>

</body>
</html>