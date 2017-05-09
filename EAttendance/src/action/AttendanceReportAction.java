package action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import pojo.AttendanceBean;

import com.opensymphony.xwork2.ActionSupport;

public class AttendanceReportAction extends ActionSupport implements SessionAware{

	
	
	private List<AttendanceBean> attendances = new ArrayList<AttendanceBean>();
	
	public List<AttendanceBean> getAttendances() {
		return attendances;
	}

	public void setAttendances(List<AttendanceBean> attendances) {
		this.attendances = attendances;
	}

	public String displayAttendance()
	{
		  
		attendances.add(new AttendanceBean("1", "2", "fName", "Lname", "2", "2", "3"));
		attendances.add(new AttendanceBean("2", "2", "Student2Info", "Student2LName", "2", "2", "3"));
		
		return SUCCESS;
	}
	
	@Override
	public void setSession(Map<String, Object> arg0) {
		// TODO Auto-generated method stub
		
	} 
}
