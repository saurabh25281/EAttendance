package dao;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import util.HibernateUtil;
import domain.Teacher;

public class TeacherDAOImpl implements TeacherDAO {

	
	SessionFactory sessionFactory = HibernateUtil.getSessionFactory();  
	Session session =null;
	Transaction transaction=null;
	
	@Override
	public void saveOrUpdateTeacher(Teacher teacher) {
		Session session = sessionFactory.openSession();
	      Transaction tx = null;
		try {
			tx = session.beginTransaction();
		    session.saveOrUpdate(teacher);
		    tx.commit();  
		 }catch (HibernateException e) {
	         if (tx!=null) tx.rollback();
	         e.printStackTrace(); 
	      }finally {
	         session.close(); 
	      }

	}

	
	@Override
	public Teacher listTeacherById(int teacher_id) {
		Session session = sessionFactory.openSession();
		
	      Transaction tx = null;
	      Teacher teacher = null;
	      try{
	         tx = session.beginTransaction();
	         teacher = (Teacher) session.get(Teacher.class, teacher_id);
	         tx.commit();
		} catch (HibernateException e) {
	         if (tx!=null) tx.rollback();
	         e.printStackTrace(); 
	      }finally {
	         session.close(); 
	      }
		return teacher;
	}
	
	@Override
	public void deleteTeacher(int teacher_id) {
		Session session = sessionFactory.openSession();
	      Transaction tx = null;
	      try{
	    	  tx = session.beginTransaction();
			 
			
	    	  Teacher teacher = (Teacher) session.get(Teacher.class, teacher_id);
			session.delete(teacher);
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
