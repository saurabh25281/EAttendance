package action;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

import dao.FacultyDAO;
import dao.FacultyDAOImpl;
import domain.Course;
import domain.Faculty;
import domain.Teacher;

public class FacultyAction extends ActionSupport implements ModelDriven<Faculty>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private FacultyDAO facDAO = new FacultyDAOImpl();	
	private Faculty faculty = new Faculty();
	private List<Faculty> facultyList= new ArrayList<Faculty>();
	
	
	public List<Faculty> getFacultyList() {
		return facultyList;
	}
	public void setFacultyList(List<Faculty> facultyList) {
		this.facultyList = facultyList;
	}

	private List<Teacher> teacherList= new ArrayList<Teacher>();
	private List<Course> courseList = new ArrayList<Course>();
	
	
	
	public String saveOrUpdate()
	{	
		facDAO.saveOrUpdateFaculty(faculty);
		return SUCCESS;
	}
	
	public String list()
	{
		facultyList = facDAO.listFaculty();
		return SUCCESS;
	}
	
	public String delete()
	{
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get( ServletActionContext.HTTP_REQUEST);
		facDAO.deleteFaculty(((Integer.parseInt( request.getParameter("faculty_id")))));
		System.out.println(">>>>>>>>>"+request.getParameter("sem_id"));
		return SUCCESS;
	}
	
	public String edit()
	{
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get( ServletActionContext.HTTP_REQUEST);
		faculty = facDAO.listFacultyById((Integer.parseInt( request.getParameter("faculty_id"))));
		System.out.println(">>>>>>>>>"+request.getParameter("sem_id"));
		return SUCCESS;
	}
	
	
	
	
	
	public Faculty getFaculty() {
		return faculty;
	}
	public void setFaculty(Faculty faculty) {
		this.faculty = faculty;
	}
	public List<Teacher> getTeacherList() {
		return facDAO.listTeacher();
	}
	public void setTeacherList(List<Teacher> teacherList) {
		this.teacherList = teacherList;
	}
	public List<Course> getCourseList() {
		return facDAO.listCourse();
	}
	public void setCourseList(List<Course> courseList) {
		this.courseList = courseList;
	}
	
	@Override
	public Faculty getModel() {
		// TODO Auto-generated method stub
		return faculty;
	}
	
}
