package teachermodule;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import com.opensymphony.xwork2.ActionSupport;
import java.util.Properties;
import java.util.regex.Pattern;
import java.io.FileInputStream;

public class AddTeacher extends ActionSupport{
	private static final long serialVersionUID = 1L;
	private static final Pattern phonePattern = Pattern.compile("^\b{5}(-\f{4})?$");
	   
	   /*private File photo;
	   private String myFileContentType;
	   private String myFileFileName;*/
	   //private String destPath;
	   
	public String execute()
	{
		String ret = ERROR;
		 //destPath = "C:/images/";
		 Connection conn = null;
		 try{
			
			 //String URL = "jdbc:mysql://localhost:3306/eattendance";
	         Class.forName("com.mysql.jdbc.Driver");
	         
	         Properties props = new Properties();
	         props.load(new FileInputStream("credentials.properties"));
	         conn = DriverManager.getConnection(props.getProperty("connectionUrl"));
	         
	         String phone = getPhone();
	  		 if(!phonePattern.matcher(phone).matches()){
	  			 throw new Exception( "Improper phone number.");
	  		 }
	         
	         PreparedStatement stmt=conn.prepareStatement("INSERT INTO teachers ( ?, ?, ?, ?, ?, ?)");
	         stmt.setString(1,getFirstName());
	         stmt.setString(2,getLastName());
	         stmt.setString(3,getAddress());
	         stmt.setString(4,phone);
	         stmt.setString(5,getLogin());
	         stmt.setString(6,getPassword());
	         	         
	         /*System.out.println(sql);
	         Statement stmt = conn.createStatement();
	        int i = stmt.executeUpdate(sql);*/
	         int i = stmt.executeUpdate();
	         
	        //System.out.println(">>>>>>>>"+i);
	         if(i<0)
	        	 {ret = ERROR;
	        	 
	        	 }
	         	else
	         	{
	         		ret=SUCCESS;
	         	}
	         
		 	} 
		 	catch (Exception e) {
	    	   //e.printStackTrace();
	    	   String genericUserMessage = searchExceptions(e);
	           logException(genericUserMessage);
	          ret = ERROR;
	       } finally {
	          if (conn != null) {
	             try {
	                conn.close();
	             } catch (Exception e) {
	            	//e.printStackTrace();
	            	String genericUserMessage = searchExceptions(e);
	 	           	logException(genericUserMessage);
	             }
	          }
	       }

	          return ret;	 
	}
	
	public String searchExceptions(Exception e) {
		return "generic User Message";
	}
	
	public void logException(String str) {
		//log error messages
	}
	
	String firstName;
	String lastName;
	String phone;
	String address;
	String login;
	String password;
	
	
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	

}
