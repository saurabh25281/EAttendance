package action;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

import dao.NoticeBoardDAO;
import dao.NoticeBoardDAOImpl;
import domain.NoticeBoard;


public class NoticeBoardAction extends ActionSupport implements ModelDriven<NoticeBoard>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	NoticeBoard noticeBoard = new NoticeBoard();
	private List<NoticeBoard> noticeboardList = new ArrayList<NoticeBoard>();
	private NoticeBoardDAO noticeDao = new NoticeBoardDAOImpl(); 
	
	public String saveOrUpdate()
	{	
		noticeDao.saveOrUpdateNotice(noticeBoard);
		return SUCCESS;
	}
	
	public String list()
	{
		noticeboardList = noticeDao.listNoticeBoard();
		return SUCCESS;
	}
	
	public String delete()
	{
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get( ServletActionContext.HTTP_REQUEST);
		noticeDao.deleteNoticeBoard(Integer.parseInt( request.getParameter("notice_id")));
		System.out.println(">>>>>>>>>"+request.getParameter("notice_id"));
		return SUCCESS;
	}
	
	public String edit()
	{
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get( ServletActionContext.HTTP_REQUEST);
		noticeBoard = noticeDao.listNoticeBoardById(Integer.parseInt( request.getParameter("notice_id")));
		System.out.println(">>>>>>>>>"+request.getParameter("notice_id"));
		return SUCCESS;
	}
	
	public String noticeForm()
	{
		return SUCCESS;
	}
	
	@Override
	public NoticeBoard getModel() {
		// TODO Auto-generated method stub
		return noticeBoard;
	}

	public NoticeBoard getNoticeBoard() {
		return noticeBoard;
	}

	public void setNoticeBoard(NoticeBoard noticeBoard) {
		this.noticeBoard = noticeBoard;
	}

	public List<NoticeBoard> getNoticeboardList() {
		return noticeboardList;
	}

	public void setNoticeboardList(List<NoticeBoard> noticeboardList) {
		this.noticeboardList = noticeboardList;
	}

}
