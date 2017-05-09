package dao;

import java.util.List;

import domain.Semester;
import domain.Subject;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import util.HibernateUtil;


public class SubjectDAOImpl implements SubjectDAO {

	SessionFactory sessionFactory = HibernateUtil.getSessionFactory();  
	Session session =null;
	Transaction transaction=null;
	
	
	

	@Override
	public void saveOrUpdateSubject(Subject subject) {
		Session session = sessionFactory.openSession();
	      Transaction tx = null;
		try {
			tx = session.beginTransaction();
		    session.saveOrUpdate(subject);
		    tx.commit();  
		 }catch (HibernateException e) {
	         if (tx!=null) tx.rollback();
	         e.printStackTrace(); 
	      }finally {
	         session.close(); 
	      }

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Subject> listSubject() {
		Session session = sessionFactory.openSession();
		List<Subject> subject = null;
	      Transaction tx = null;
	      try{
	         tx = session.beginTransaction();
			
		
	         subject = session.createQuery("from Subject").list();
				 tx.commit();
			}catch (HibernateException e) {
		         if (tx!=null) tx.rollback();
		         e.printStackTrace(); 
		      }finally {
		         session.close(); 
		      }
			return subject;
		
	}

	@Override
	public Subject listSubjectById(int SubjectId) {
		Session session = sessionFactory.openSession();
		
	      Transaction tx = null;
	      Subject subject = null;
	      try{
	         tx = session.beginTransaction();
	         subject = (Subject) session.get(Subject.class, SubjectId);
	         tx.commit();
		} catch (HibernateException e) {
	         if (tx!=null) tx.rollback();
	         e.printStackTrace(); 
	      }finally {
	         session.close(); 
	      }
		return subject;
	}

	@Override
	public void deleteSubject(int SubjectId) {
		Session session = sessionFactory.openSession();
	      Transaction tx = null;
	      try{
	    	  tx = session.beginTransaction();
			 
			
	    	  Subject subject = (Subject) session.get(Subject.class, SubjectId);
			session.delete(subject);
			  tx.commit();
			
	      }catch (HibernateException e) {
	          if (tx!=null) tx.rollback();
	          e.printStackTrace(); 
	       }finally {
	          session.close(); 
	       }

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Semester> listSemester() {
		Session session = sessionFactory.openSession();
		List<Semester> semester = null;
	      Transaction tx = null;
	      try{
	         tx = session.beginTransaction();
			
		
	         semester = session.createQuery("from Semester").list();
				 tx.commit();
			}catch (HibernateException e) {
		         if (tx!=null) tx.rollback();
		         e.printStackTrace(); 
		      }finally {
		         session.close(); 
		      }
			return semester;
	}

}
