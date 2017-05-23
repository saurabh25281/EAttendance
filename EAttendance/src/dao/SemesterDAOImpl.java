package dao;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import util.HibernateUtil;
import domain.Course;
import domain.Semester;
import domain.Year;

public class SemesterDAOImpl implements SemesterDAO{

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
	public void saveOrUpdateSemester(Semester semester) {
	
		Session session = sessionFactory.openSession();
	      Transaction tx = null;
		try {
			tx = session.beginTransaction();
		    session.saveOrUpdate(semester);
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

	

	@Override
	public Semester listSemesterById(int semesterId) {
		Session session = sessionFactory.openSession();
		
	      Transaction tx = null;
	      Semester semester = null;
	      try{
	         tx = session.beginTransaction();
	         semester = (Semester) session.get(Semester.class, semesterId);
	         tx.commit();
		} catch (HibernateException e) {
	         if (tx!=null) tx.rollback();
	         //e.printStackTrace();
	         String genericUserMessage = searchExceptions(e);
		     logException(genericUserMessage);
	      }finally {
	         session.close(); 
	      }
		return semester;
	}

	@Override
	public void deleteSemester(int semesterId) {
		Session session = sessionFactory.openSession();
	      Transaction tx = null;
	      try{
	    	  tx = session.beginTransaction();
			 
			
	    	  Semester  semester = (Semester) session.get(Semester.class, semesterId);
			session.delete(semester);
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
		         //e.printStackTrace();
		         String genericUserMessage = searchExceptions(e);
			     logException(genericUserMessage);
		      }finally {
		         session.close(); 
		      }
			return semester;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Course> listCourse() {
		Session session = sessionFactory.openSession();
		List<Course> courses = null;
	      Transaction tx = null;
	      try{
	         tx = session.beginTransaction();
			
		
				courses = session.createQuery("from Course").list();
				 tx.commit();
			}catch (HibernateException e) {
		         if (tx!=null) tx.rollback();
		         //e.printStackTrace();
		         String genericUserMessage = searchExceptions(e);
			     logException(genericUserMessage);
		      }finally {
		         session.close(); 
		      }
			return courses;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Year> listYear() {
		Session session = sessionFactory.openSession();
		List<Year> year = null;
	      Transaction tx = null;
	      try{
	         tx = session.beginTransaction();
			
		
	         year = session.createQuery("from Year").list();
				 tx.commit();
			}catch (HibernateException e) {
		         if (tx!=null) tx.rollback();
		         //e.printStackTrace();
		         String genericUserMessage = searchExceptions(e);
			     logException(genericUserMessage);
		      }finally {
		         session.close(); 
		      }
			return year;
	}

}
