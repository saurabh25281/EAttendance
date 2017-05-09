package login;




import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.struts2.dispatcher.SessionMap;
import org.apache.struts2.interceptor.SessionAware;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.transform.AliasToEntityMapResultTransformer;

import util.HibernateUtil;

import com.opensymphony.xwork2.ActionSupport;

import domain.Course;
import domain.Teacher;
public class LogingEx extends ActionSupport implements SessionAware{
	private static final long serialVersionUID = 1L;
	
	public SessionMap<String,Object> sessionMap;  
	
	SessionFactory sessionFactory = HibernateUtil.getSessionFactory();  
    Session session =null;
	Transaction transaction=null;
	String first_name = "first_name";
	String login = "login";
	String id = "id";
	
	
	
	
	@Override
	public void setSession(Map<String, Object> map) {  
	    this.sessionMap=(SessionMap)map;  
	}  
	
	public String execute()
	{
		 String ret = ERROR;
	     
	    try{
	    	 Session session = sessionFactory.openSession();
	    	 Transaction tx = null;
	    	 tx = session.beginTransaction();
	    	 
	        String selectTab="";
	         if(utype.equals("teachers"))
				{
					
	        	 selectTab="teachers";
	        	  
				}
	         else if(utype.equals("student"))
	         {
	        	 selectTab="student";
	         }
	         else
	         {
	        	 selectTab="parents";
	        	  first_name = "pfirst_name";
	        	  login = "plogin";
	        	  id="pid";
	         }
	         
	         
	         Query query = session.createSQLQuery("SELECT "+id+","+first_name+" FROM "+selectTab+" WHERE "+login+" = :login AND password = :password");
	        
	         query.setParameter("login", uname);
	         query.setParameter("password", password);
	      //   List result = query.list();
	         
	         
	         query.setResultTransformer(AliasToEntityMapResultTransformer.INSTANCE);
	         List<Map<String,Object>> aliasToValueMapList=query.list();
	    	   
	      
	         
	         sessionMap.put("utype",utype); 
	         sessionMap.put("login","true");  
	         sessionMap.put("uname",uname); 
	         sessionMap.put("uid",aliasToValueMapList.get(0).get(id)); 
	         
	        
	         if (aliasToValueMapList.size()>=1) {
	        	
	        	 ret = SUCCESS;
	          }
	       } catch (Exception e) {
	    	   e.printStackTrace();
	          ret = ERROR;
	       } 
	       return ret;
	       
	    }

	private String uname,password,utype;
 
	public String getUtype() {
		return utype;
	}

	public void setUtype(String utype) {
		this.utype = utype;
	}

	public String getUname() {
		return uname;
	}
 
	public void setUname(String uname) {
		this.uname = uname;
	}
 
	public String getPassword() {
		return password;
	}
 
	public void setPassword(String password) {
		this.password = password;
	}
 
	public void validate()
	   {
	      if (uname == null || uname.trim().equals("") )
	      {
	         addFieldError("uname","The name is required");
	      }
	      if ( password==null || password.trim().equals(""))
	      {
	         addFieldError("password","Login Password is required");
	      }
	   }
 
}