package action;





import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.struts2.dispatcher.SessionMap;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;

import dao.MarkAttendacneDAO;
import dao.MarkAttendacneDAOImpl;
import domain.Course;
import domain.Faculty;
import domain.Semester;
import domain.Student;
import domain.StudentAttendance;
import domain.Subject;
import domain.Teacher;
import domain.Year;
import domain.AttendanceDetails;

public class MarkAttendacneAction  extends ActionSupport implements SessionAware{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private MarkAttendacneDAO AttendanceDao = new MarkAttendacneDAOImpl();
	public List<Course> listCourse = new  ArrayList<Course>();
	public List<Year> listYear  = new  ArrayList<Year>();
	public List<Semester> listSemester = new  ArrayList<Semester>();
	public List<Faculty> listFaculty = new  ArrayList<Faculty>();
	public List<Subject> listSubject = new  ArrayList<Subject>();
	public List<Student> listStudent = new  ArrayList<Student>();
	public List<Teacher>listTeacher = new  ArrayList<Teacher>();
	public Set<StudentAttendance> studentAttendance = new HashSet<StudentAttendance>();
	
	public List<StudentAttendance> listStudentAttendance = new ArrayList<StudentAttendance>();
	
	
	private String[] attendanceMarking;
	
	private String [] recCount;
	
	public String[] getAttendanceMarking() {
		return attendanceMarking;
	}
	public void setAttendanceMarking(String[] attendanceMarking) {
		this.attendanceMarking = attendanceMarking;
	}
	public String course_id;
	public String year_id;
	public String sem_id;
	public String subject_id;
	public String attendance_date;
	
	
	public String getAttendance_date() {
		return attendance_date;
	}
	public void setAttendance_date(String attendance_date) {
		this.attendance_date = attendance_date;
	}
	public List<Course> getListCourse() {
		
		return AttendanceDao.listCourse();
	}
	public void setListCourse(List<Course> listCourse) {
		this.listCourse = listCourse;
	}
	public List<Year> getListYear() {
		return AttendanceDao.listYear();
	}
	public void setListYear(List<Year> listYear) {
		this.listYear = listYear;
	}
	public List<Semester> getListSemester() {
		return AttendanceDao.listSemester();
	}
	public void setListSemester(List<Semester> listSemester) {
		this.listSemester = listSemester;
	}
	public List<Faculty> getListFaculty() {
		return AttendanceDao.listFaculty();
	}
	public void setListFaculty(List<Faculty> listFaculty) {
		this.listFaculty = listFaculty;
	}
	public List<Subject> getListSubject() {
		return AttendanceDao.listSubject();
	}
	public void setListSubject(List<Subject> listSubject) {
		this.listSubject = listSubject;
	}
	public List<Student> getListStudent() {
			return listStudent;
		//return AttendanceDao.listStudent();
	}
	public void setListStudent(List<Student> listStudent) {
		this.listStudent = listStudent;
	}
	public List<Teacher> getListTeacher() {
		return AttendanceDao.listTeacher();
	}
	public void setListTeacher(List<Teacher> listTeacher) {
		this.listTeacher = listTeacher;
	}
	
	public String attenanceForm()
	{
		return SUCCESS;
	}
	
	public String loadAttendance()
	{
		System.out.println("Uid in Session"+sessionMap.size()+""+sessionMap);
		System.out.println("Marking course_id"+course_id);
		System.out.println("Marking year_id"+year_id);
		System.out.println("Marking subject_id"+subject_id);
		System.out.println("Marking sem_id"+sem_id);
		System.out.println("Attendance Date "+attendance_date);
		List<Student> stdList = AttendanceDao.listStudentAttendance(Integer.parseInt(course_id),Integer.parseInt(year_id), Integer.parseInt(sem_id));
		setListStudent(stdList);
		System.out.println("Marking Attendance"+listStudent.size());
		
		return SUCCESS;
		
	}
	
	public String markAttendance()
	{
		
		/*System.out.println("Marking Course"+course_id);
		System.out.println("Marking year"+year_id);
		System.out.println("Marking Subject"+subject_id);
		System.out.println("Marking Sem"+sem_id);
		System.out.println("Marking Date"+attendance_date);
		System.out.println("Teacher Id"+sessionMap.get("uid"));
		*/
		
		System.out.println("Student List Size Attendance"+listStudent.size());
		 
		AttendanceDetails attDetails = new AttendanceDetails();
		
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		Date date;
		try{ 
		date= formatter.parse(attendance_date);
		attDetails.setAttendance_date(date);
		attDetails.setCourse_id(Integer.parseInt(course_id));
		attDetails.setSem_id(Integer.parseInt(sem_id));
		attDetails.setSubject_id(Integer.parseInt(subject_id));
		
		attDetails.setTeacher_id(Integer.parseInt(sessionMap.get("uid").toString()));
		
		attDetails.setYear_id(Integer.parseInt(year_id));
		}catch(Exception ex){
			//ex.printStackTrace();
			String genericUserMessage = searchExceptions(ex);
	        logException(genericUserMessage);
			}
		Set<StudentAttendance> studentAttendance = new HashSet<StudentAttendance>();
		//StudentAttendance saObj = new StudentAttendance();
		
		System.out.println("recCount "+recCount.length);
		System.out.println(recCount[0]+""+recCount[1]);
		
		System.out.println("attendanceMarking "+attendanceMarking.length);
    	boolean toMark =false;
			for(String str : recCount)
			{
				toMark =false;
				for(String s : attendanceMarking){
					
					if(str.equals(s))
					{
					
						toMark =true;
					
					}
	    		
				}
				StudentAttendance saObj = new StudentAttendance(Integer.parseInt(str), toMark,attDetails);
				studentAttendance.add(saObj);
				
				
			}
			
			
			
		
    	System.out.println("Student Attendance Map"+studentAttendance);
    	attDetails.setStudentAttendance(studentAttendance);
    	AttendanceDao.saveOrUpdateAttendance(attDetails);
		return SUCCESS;
	}
	
	public String searchExceptions(Exception e) {
		return "generic User Message";
	}
	
	public void logException(String str) {
		//log error messages
	}
	
	public String getCourse_id() {
		return course_id;
	}
	public String getYear_id() {
		return year_id;
	}
	public String getSem_id() {
		return sem_id;
	}
	public String getSubject_id() {
		return subject_id;
	}
	public void setCourse_id(String course_id) {
		this.course_id = course_id;
	}
	public void setYear_id(String year_id) {
		this.year_id = year_id;
	}
	public void setSem_id(String sem_id) {
		this.sem_id = sem_id;
	}
	public void setSubject_id(String subject_id) {
		this.subject_id = subject_id;
	}
	public List<StudentAttendance> getListStudentAttendance() {
		 
		
		return listStudentAttendance;
	}
	public void setListStudentAttendance(List<StudentAttendance> listStudentAttendance) {
		List<Student> studentList = getListStudent();
		 for(Student std :studentList )
		 {
			 StudentAttendance saObj = new StudentAttendance();
			 saObj.setStudent_id(std.getId());
			 saObj.setMarked(false);
		 }
		this.listStudentAttendance = listStudentAttendance;
	}
	public SessionMap<String,Object> sessionMap;  
	@Override
	public void setSession(Map<String, Object> map) {
		 this.sessionMap=(SessionMap)map;  
		
	}
	public String[] getRecCount() {
		return recCount;
	}
	public void setRecCount(String[] recCount) {
		this.recCount = recCount;
	}
	
	public void validate()
	   {
		
		if(course_id!=null)
		{
	      if ( course_id.trim().equals("-1") )
	      {
	    	  
	         addFieldError("errorDetails","Please Select Course");
	      }
	      
	      if (  year_id.trim().equals("-1") )
	      {
	    	  
	         addFieldError("errorDetails","Please Select Year");
	      }
	      
	      if (  sem_id.trim().equals("-1") )
	      {
	    	  
	         addFieldError("errorDetails","Please Select Sem");
	      }
	      
	      if ( subject_id.trim().equals("-1") )
	      {
	    	  
	         addFieldError("errorDetails","Please Select Subject");
	      }
		} 
	   }
	

}
