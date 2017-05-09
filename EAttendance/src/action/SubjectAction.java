package action;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

import dao.SubjectDAO;
import dao.SubjectDAOImpl;
import domain.Semester;
import domain.Subject;


public class SubjectAction extends ActionSupport implements ModelDriven<Subject>
{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Subject subject = new Subject();

	private List<Semester> semesterList = new ArrayList<Semester>();
	
	
	public Subject getSubject() {
		return subject;
	}


	public void setSubject(Subject subject) {
		this.subject = subject;
	}


	private List<Subject> subjectList = new ArrayList<Subject>();
	public List<Subject> getSubjectList() {
		return subjectList;
	}


	public void setSubjectList(List<Subject> subjectList) {
		this.subjectList = subjectList;
	}


	private SubjectDAO subjectDAO = new SubjectDAOImpl();
	public List<Semester> getSemesterList() {
		 return subjectDAO.listSemester();
	}


	public void setSemesterList(List<Semester> semesterList) {
		this.semesterList = semesterList;
	}


	
	
	


	@Override
	public Subject getModel() {
		return subject;
	}
	
	
	public String saveOrUpdate()
	{	
		int sem_id = Integer.parseInt(subject.getSem_id()+"".split("~")[0]);
		
		subject.setSem_id((sem_id));
		subjectDAO.saveOrUpdateSubject(subject);
		return SUCCESS;
	}
	
	public String list()
	{
		subjectList = subjectDAO.listSubject();
		return SUCCESS;
	}
	
	public String delete()
	{
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get( ServletActionContext.HTTP_REQUEST);
		subjectDAO.deleteSubject(Integer.parseInt(request.getParameter("id")));
		return SUCCESS;
	}
	
	public String edit()
	{
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get( ServletActionContext.HTTP_REQUEST);
		subject = subjectDAO.listSubjectById((Integer.parseInt(request.getParameter("id"))));
		return SUCCESS;
	}
	
	
		
	
}
