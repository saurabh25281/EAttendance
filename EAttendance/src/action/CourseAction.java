package action;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

import dao.CourseDAO;
import dao.CourseDAOImpl;
import domain.Course;


public class CourseAction extends ActionSupport implements ModelDriven<Course>
{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Course course = new Course();
	private List<Course> courseList = new ArrayList<Course>();
	private CourseDAO courseDAO = new CourseDAOImpl();
	
	@Override
	public Course getModel() {
		return course;
	}
	
	public String saveOrUpdate()
	{	
		courseDAO.saveOrUpdateCourse(course);
		return SUCCESS;
	}
	
	public String list()
	{
		courseList = courseDAO.listCourse();
		return SUCCESS;
	}
	
	public String delete()
	{
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get( ServletActionContext.HTTP_REQUEST);
		courseDAO.deleteCourse(Integer.parseInt( request.getParameter("id")));
		System.out.println(">>>>>>>>>"+request.getParameter("id"));
		return SUCCESS;
	}
	
	public String edit()
	{
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get( ServletActionContext.HTTP_REQUEST);
		course = courseDAO.listCourseById(Integer.parseInt( request.getParameter("id")));
		System.out.println(">>>>>>>>>"+request.getParameter("id"));
		return SUCCESS;
	}
	
	
	public Course getCourse() {
		return course;
	}

	public void setCourse(Course course) {
		this.course = course;
	}

	public List<Course> getCourseList() {
		return courseList;
	}

	public void setCourseList(List<Course> courseList) {
		this.courseList = courseList;
	}

	
}
