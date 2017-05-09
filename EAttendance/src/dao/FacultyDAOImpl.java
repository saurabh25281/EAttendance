package dao;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import util.HibernateUtil;
import domain.Course;
import domain.Faculty;
import domain.Teacher;

public class FacultyDAOImpl implements FacultyDAO {

	
	SessionFactory sessionFactory = HibernateUtil.getSessionFactory();  
    Session session =null;
	Transaction transaction=null;
	
	@Override
	public void saveOrUpdateFaculty(Faculty faculty) {
		Session session = sessionFactory.openSession();
	      Transaction tx = null;
		try {
			tx = session.beginTransaction();
		    session.saveOrUpdate(faculty);
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
	public List<Faculty> listFaculty() {
		Session session = sessionFactory.openSession();
		List<Faculty> faculty = null;
	      Transaction tx = null;
	      try{
	         tx = session.beginTransaction();
			
		
	         faculty = session.createQuery("from Faculty").list();
				 tx.commit();
			}catch (HibernateException e) {
		         if (tx!=null) tx.rollback();
		         e.printStackTrace(); 
		      }finally {
		         session.close(); 
		      }
			return faculty;
	}

	@Override
	public Faculty listFacultyById(int facultyId) {
		
		Session session = sessionFactory.openSession();
		
	      Transaction tx = null;
	      Faculty faculty = null;
	      try{
	         tx = session.beginTransaction();
	         faculty = (Faculty) session.get(Faculty.class, facultyId);
	         tx.commit();
		} catch (HibernateException e) {
	         if (tx!=null) tx.rollback();
	         e.printStackTrace(); 
	      }finally {
	         session.close(); 
	      }
		return faculty;
	}

	@Override
	public void deleteFaculty(int facultyId) {
		Session session = sessionFactory.openSession();
	      Transaction tx = null;
	      try{
	    	  tx = session.beginTransaction();
			 
			
	    	  Faculty  faculty = (Faculty) session.get(Faculty.class, facultyId);
			session.delete(faculty);
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

	@SuppressWarnings("unchecked")
	@Override
	public List<Teacher> listTeacher() {

		Session session = sessionFactory.openSession();
		List<Teacher> teacher = null;
	      Transaction tx = null;
	      try{
	         tx = session.beginTransaction();
			
		
	         teacher = session.createQuery("from Teacher").list();
				 tx.commit();
			}catch (HibernateException e) {
		         if (tx!=null) tx.rollback();
		         e.printStackTrace(); 
		      }finally {
		         session.close(); 
		      }
			return teacher;
	}

}
