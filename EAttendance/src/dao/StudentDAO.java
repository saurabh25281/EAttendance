package dao;

import java.util.List;

import domain.Course;
import domain.Semester;
import domain.Student;
import domain.Year;

public interface StudentDAO {

	
	public void saveOrUpdateStudent(Student student);
	public List<Student> listStudent();
	public Student listStudentById(int studentId);
	public void deleteStudent(int studentId);
	
	public List<Course> listCourse();
	public List<Year> listYear();
	public List<Semester> listSemester();

}
