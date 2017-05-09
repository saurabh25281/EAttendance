package teachermodule;
import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import org.apache.commons.io.FileUtils;

import com.opensymphony.xwork2.ActionSupport;
public class AddTeacher extends ActionSupport{
	private static final long serialVersionUID = 1L;
	   
	   private File photo;
	   private String myFileContentType;
	   private String myFileFileName;
	   private String destPath;
	   
	public String execute()
	{
		String ret = ERROR;
		 destPath = "C:/images/";
		 Connection conn = null;
		 try{
			
			 String URL = "jdbc:mysql://localhost:3306/eattendance";
	         Class.forName("com.mysql.jdbc.Driver");
	         conn = DriverManager.getConnection(URL, "root", "");
	        
	         
	         String sql = "INSERT INTO teachers ( first_name, last_name, address, phone, login, password) VALUES";
	         sql+="('"+this.getFirstName()+"','"+this.getLastName()+"','"+this.getAddress()+"','"+this.getPhone()+"'";
	         sql+=",'"+this.getLogin()+"','"+this.getPassword()+"')";
	         System.out.println(sql);
	         Statement stmt = conn.createStatement();
	        int i = stmt.executeUpdate(sql);
	        System.out.println(">>>>>>>>"+i);
	         if(i<0)
	        	 {ret = ERROR;
	        	 
	        	 }
	         	else
	         	{
	         		ret=SUCCESS;
	         	}
	         
		 	} 
		 	catch (Exception e) {
	    	   e.printStackTrace();
	          ret = ERROR;
	       } finally {
	          if (conn != null) {
	             try {
	                conn.close();
	             } catch (Exception e) {
	            	 e.printStackTrace();
	             }
	          }
	       }

	          return ret;	 
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
