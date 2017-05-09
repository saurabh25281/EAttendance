package dao;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import util.HibernateUtil;


import domain.Course;

public class CourseDAOImpl implements CourseDAO{
	
	  
	SessionFactory sessionFactory = HibernateUtil.getSessionFactory();  
    Session session =null;
	Transaction transaction=null;
	  	
	
	 
	    
	  
	@Override
	public void saveOrUpdateCourse(Course course) {
		 Session session = sessionFactory.openSession();
	      Transaction tx = null;
		try {
			tx = session.beginTransaction();
		    session.saveOrUpdate(course);
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
		         e.printStackTrace(); 
		      }finally {
		         session.close(); 
		      }
			return courses;
	}

	@Override
	public Course listCourseById(int CourseId) {
		Session session = sessionFactory.openSession();
		
	      Transaction tx = null;
	      Course course = null;
	      try{
	         tx = session.beginTransaction();
	         course = (Course) session.get(Course.class, CourseId);
	         tx.commit();
		} catch (HibernateException e) {
	         if (tx!=null) tx.rollback();
	         e.printStackTrace(); 
	      }finally {
	         session.close(); 
	      }
		return course;
	}
	

	@Override
	public void deleteCourse(int CourseId) {
		Session session = sessionFactory.openSession();
	      Transaction tx = null;
	      try{
	    	  tx = session.beginTransaction();
			 
			
			Course course = (Course) session.get(Course.class, CourseId);
			session.delete(course);
			  tx.commit();
			
	      }catch (HibernateException e) {
	          if (tx!=null) tx.rollback();
	          e.printStackTrace(); 
	       }finally {
	          session.close(); 
	       }
		
	}
	

}
