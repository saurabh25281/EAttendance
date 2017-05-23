package dao;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import util.HibernateUtil;
import domain.NoticeBoard;

public class NoticeBoardDAOImpl implements NoticeBoardDAO {

	
	  
	SessionFactory sessionFactory = HibernateUtil.getSessionFactory();  
    Session session =null;
	Transaction transaction=null;
	
	public String searchExceptions(Exception e) {
		return "generic User Message";
	}
	
	public void logException(String str) {
		//log error messages
	}
		  	
	@Override
	public void saveOrUpdateNotice(NoticeBoard noticeBoard) {
		Session session = sessionFactory.openSession();
	      Transaction tx = null;
		try {
			tx = session.beginTransaction();
		    session.saveOrUpdate(noticeBoard);
		    tx.commit();  
		 }catch (HibernateException e) {
	         if (tx!=null) tx.rollback();
	         //e.printStackTrace();
	         String genericUserMessage = searchExceptions(e);
		     logException(genericUserMessage);
	      }finally {
	         session.close(); 
	      }

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<NoticeBoard> listNoticeBoard() {
		
		Session session = sessionFactory.openSession();
		List<NoticeBoard> noticeBoard = null;
	      Transaction tx = null;
	      try{
	         tx = session.beginTransaction();
			
		
	         noticeBoard = session.createQuery("from NoticeBoard").list();
				 tx.commit();
			}catch (HibernateException e) {
		         if (tx!=null) tx.rollback();
		         //e.printStackTrace();
		         String genericUserMessage = searchExceptions(e);
			     logException(genericUserMessage);
		      }finally {
		         session.close(); 
		      }
			return noticeBoard;
	}

	@Override
	public NoticeBoard listNoticeBoardById(int notice_id) {
		
		Session session = sessionFactory.openSession();
		
	      Transaction tx = null;
	      NoticeBoard noticeBoard = null;
	      try{
	         tx = session.beginTransaction();
	         noticeBoard = (NoticeBoard) session.get(NoticeBoard.class, notice_id);
	         tx.commit();
		} catch (HibernateException e) {
	         if (tx!=null) tx.rollback();
	         //e.printStackTrace();
	         String genericUserMessage = searchExceptions(e);
		     logException(genericUserMessage);
	      }finally {
	         session.close(); 
	      }
		return noticeBoard;
	}

	@Override
	public void deleteNoticeBoard(int notice_id) {
		Session session = sessionFactory.openSession();
	      Transaction tx = null;
	      try{
	    	  tx = session.beginTransaction();
			  NoticeBoard noticeBoard = (NoticeBoard) session.get(NoticeBoard.class, notice_id);
	    	  session.delete(noticeBoard);
			  tx.commit();
			
	      }catch (HibernateException e) {
	          if (tx!=null) tx.rollback();
	          //e.printStackTrace();
	          String genericUserMessage = searchExceptions(e);
			     logException(genericUserMessage);
	       }finally {
	          session.close(); 
	       }

	}

}
