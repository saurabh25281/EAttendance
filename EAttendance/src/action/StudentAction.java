package action;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

import dao.StudentDAO;
import dao.StudentDAOImpl;
import domain.Course;
import domain.Semester;
import domain.Student;
import domain.Year;

public class StudentAction  extends ActionSupport implements ModelDriven<Student>
{

	private static final long serialVersionUID = 1L;
	private Student student = new Student();
	private List<Student> studentList = new ArrayList<Student>();
	private StudentDAO studentDAO = new StudentDAOImpl();
	private List<Course> courseList = new ArrayList<Course>();
	private List<Year> yearList = new ArrayList<Year>();
	private List<Semester> semesterList = new ArrayList<Semester>();
	
	
	
	
	@Override
	public Student getModel() {
		// TODO Auto-generated method stub
		return student;
	}
	
	
	
	public String studentForm()
	{
		return SUCCESS;
	}
	public List<Course> getCourseList() {
		return studentDAO.listCourse();
	}


	public void setCourseList(List<Course> courseList) {
		this.courseList = courseList;
	}


	public List<Year> getYearList() {
		return studentDAO.listYear();
	}


	public void setYearList(List<Year> yearList) {
		this.yearList = yearList;
	}


	public List<Semester> getSemesterList() {
		return studentDAO.listSemester();
	}


	public void setSemesterList(List<Semester> semesterList) {
		this.semesterList = semesterList;
	}

	
	

	
	public String saveOrUpdate()
	{	
				studentDAO.saveOrUpdateStudent(student);
		return SUCCESS;
	}
	
	public String list()
	{
		studentList = studentDAO.listStudent();
		return SUCCESS;
	}
	
	public String delete()
	{
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get( ServletActionContext.HTTP_REQUEST);
		studentDAO.deleteStudent(Integer.parseInt( request.getParameter("id")));
		System.out.println(">>>>>>>>>"+request.getParameter("id"));
		return SUCCESS;
	}
	
	public String edit()
	{
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get( ServletActionContext.HTTP_REQUEST);
		student = studentDAO.listStudentById(Integer.parseInt( request.getParameter("id")));
		System.out.println(">>>>>>>>>"+request.getParameter("id"));
		return SUCCESS;
	}
	

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public List<Student> getStudentList() {
		return studentList;
	}

	public void setStudentList(List<Student> studentList) {
		this.studentList = studentList;
	}
	
	
	
}
