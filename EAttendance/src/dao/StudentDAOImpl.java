package dao;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import util.HibernateUtil;
import domain.Course;
import domain.Semester;
import domain.Student;
import domain.Year;

public class StudentDAOImpl implements StudentDAO {

	SessionFactory sessionFactory = HibernateUtil.getSessionFactory();  
	Session session =null;
	Transaction transaction=null;
	
	@Override
	public void saveOrUpdateStudent(Student student) {
		Session session = sessionFactory.openSession();
	      Transaction tx = null;
		try {
			tx = session.beginTransaction();
		    session.saveOrUpdate(student);
		    tx.commit();  
		 }catch (HibernateException e) {
	         if (tx!=null) tx.rollback();
	         e.printStackTrace(); 
	      }finally {
	         session.close(); 
	      }

	}

	@Override
	public void deleteStudent(int studentId) {
		Session session = sessionFactory.openSession();
	      Transaction tx = null;
	      try{
	    	  tx = session.beginTransaction();
			 
			
	    	  Student student = (Student) session.get(Student.class, studentId);
			session.delete(student);
			  tx.commit();
			
	      }catch (HibernateException e) {
	          if (tx!=null) tx.rollback();
	          e.printStackTrace(); 
	       }finally {
	          session.close(); 
	       }

	}

	@Override
	public Student listStudentById(int studentId) {
		Session session = sessionFactory.openSession();
		
	      Transaction tx = null;
	      Student student = null;
	      try{
	         tx = session.beginTransaction();
	         student = (Student) session.get(Student.class, studentId);
	         tx.commit();
		} catch (HibernateException e) {
	         if (tx!=null) tx.rollback();
	         e.printStackTrace(); 
	      }finally {
	         session.close(); 
	      }
		return student;
	}

	



	@SuppressWarnings("unchecked")
	@Override
	public List<Student> listStudent() {
		Session session = sessionFactory.openSession();
		List<Student> student = null;
	      Transaction tx = null;
	      try{
	         tx = session.beginTransaction();
			
		
	         student = session.createQuery("from Student").list();
				 tx.commit();
			}catch (HibernateException e) {
		         if (tx!=null) tx.rollback();
		         e.printStackTrace(); 
		      }finally {
		         session.close(); 
		      }
			return student;
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
		         e.printStackTrace(); 
		      }finally {
		         session.close(); 
		      }
			return year;
	}

}
