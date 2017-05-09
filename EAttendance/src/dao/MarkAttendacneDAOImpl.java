package dao;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import util.HibernateUtil;
import domain.AttendanceDetails;
import domain.Course;
import domain.Faculty;
import domain.Semester;
import domain.Student;
import domain.StudentAttendance;
import domain.Subject;
import domain.Teacher;
import domain.Year;

public class MarkAttendacneDAOImpl implements MarkAttendacneDAO {


	SessionFactory sessionFactory = HibernateUtil.getSessionFactory();  
	Session session =null;
	Transaction transaction=null;
	
	
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
	public List<Student> listStudentAttendance(int course_id,int year_id,int sem_id) {
		Session session = sessionFactory.openSession();
		List<Student> student = null;
	      Transaction tx = null;
	      try{
	         tx = session.beginTransaction();
			
		
	         Query query = session.getNamedQuery("LoadStudentForCourse");  
	         query.setInteger("course_id", course_id); 
	         query.setInteger("year_id", year_id); 
	         query.setInteger("sem_id", sem_id); 
	         
	         student = query.list();
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
	public void saveOrUpdateAttendance(AttendanceDetails attendance) {
		
		Session session = sessionFactory.openSession();
	      Transaction tx = null;
		try {
			tx = session.beginTransaction();
			session.save(attendance);
			
			System.out.println("Attendance ID="+attendance.getAttendance_id());
	       
			for(StudentAttendance smap:attendance.getStudentAttendance() )
			{
				session.save(smap);
				 System.out.println("StudentAttendance ID="+smap.getId()+", Foreign Key Cart ID="+smap.getAttednaceDetails().getAttendance_id());
			}
			
			
	      
			
		    tx.commit();  
		 }catch (HibernateException e) {
	         if (tx!=null) tx.rollback();
	         e.printStackTrace(); 
	      }finally {
	         session.close(); 
	      }
	}
	

}
