package action;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

import dao.TeacherDAO;
import dao.TeacherDAOImpl;
import domain.Teacher;

public class TeacherAction extends ActionSupport implements ModelDriven<Teacher>{

	
	private Teacher teacher= new Teacher();
	private List<Teacher> teacherList= new ArrayList<Teacher>();
	private TeacherDAO teacherDAO = new TeacherDAOImpl();
	
	
	
	
	public String teacherForm()
	{
		
		return SUCCESS;
	}
	

	@Override
	public Teacher getModel() {
		// TODO Auto-generated method stub
		return teacher;
	}
	
	
	public String saveOrUpdate()
	{	
		teacherDAO.saveOrUpdateTeacher(teacher);
		return SUCCESS;
	}
	
	public String list()
	{
		teacherList=teacherDAO.listTeacher();
		return SUCCESS;
	}
	
	public String delete()
	{
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get( ServletActionContext.HTTP_REQUEST);
		teacherDAO.deleteTeacher((Integer.parseInt(request.getParameter("teacher_id"))));
		return SUCCESS;
	}
	
	public String edit()
	{
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get( ServletActionContext.HTTP_REQUEST);
		teacher = teacherDAO.listTeacherById((Integer.parseInt(request.getParameter("teacher_id"))));
		return SUCCESS;
	}
	
	
	
	
	public Teacher getTeacher() {
		return teacher;
	}
	public void setTeacher(Teacher teacher) {
		this.teacher = teacher;
	}
	
	public List<Teacher> getTeacherList() {
		return teacherList;
	}


	public void setTeacherList(List<Teacher> teacherList) {
		this.teacherList = teacherList;
	}
	
}
