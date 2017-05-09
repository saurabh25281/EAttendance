package action;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

import dao.SemesterDAO;
import dao.SemesterDAOImpl;
import domain.Course;
import domain.Semester;
import domain.Year;

public class SemesterAction extends ActionSupport implements ModelDriven<Semester>
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Semester semester = new Semester();
	private SemesterDAO semDAO = new SemesterDAOImpl();
	private List<Semester> semesterList = new ArrayList<Semester>();
	private List<Year> yearList = new ArrayList<Year>();
	private List<Course> courseList = new ArrayList<Course>();
	
	
	


	@Override
	public Semester getModel() {
		// TODO Auto-generated method stub
		return semester;
	}
	
	
	
	public String saveOrUpdate()
	{	
		semDAO.saveOrUpdateSemester(semester);
		return SUCCESS;
	}
	
	public String list()
	{
		semesterList = semDAO.listSemester();
		return SUCCESS;
	}
	
	public String delete()
	{
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get( ServletActionContext.HTTP_REQUEST);
		semDAO.deleteSemester((Integer.parseInt( request.getParameter("sem_id"))));
		System.out.println(">>>>>>>>>"+request.getParameter("sem_id"));
		return SUCCESS;
	}
	
	public String edit()
	{
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get( ServletActionContext.HTTP_REQUEST);
		semester = semDAO.listSemesterById((Integer.parseInt( request.getParameter("sem_id"))));
		System.out.println(">>>>>>>>>"+request.getParameter("sem_id"));
		return SUCCESS;
	}
	
	
	
	
	
	public Semester getSemester() {
		return semester;
	}



	public void setSemester(Semester semester) {
		this.semester = semester;
	}



	public List<Semester> getSemesterList() {
		return semesterList;
	}



	public void setSemesterList(List<Semester> semesterList) {
		this.semesterList =  semesterList;
	}



	public List<Course> getCourseList() {
		return semDAO.listCourse();
		
	}


	public List<Year> getYearList() {
		return semDAO.listYear();
	}


	public void setYearList(List<Year> yearList) {
		this.yearList =yearList;
	}
	public void setCourseList(List<Course> courseList) {
		this.courseList =courseList;
	}




	
	

	
	
	

}
