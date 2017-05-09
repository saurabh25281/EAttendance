package dao;

import java.util.List;

import domain.AttendanceDetails;
import domain.Course;
import domain.Faculty;
import domain.Semester;
import domain.Student;
import domain.Subject;
import domain.Teacher;
import domain.Year;

public interface MarkAttendacneDAO {
	
	public List<Course> listCourse();
	public List<Year> listYear();
	public List<Semester> listSemester();
	public List<Faculty> listFaculty();
	public List<Subject> listSubject();
	public List<Student> listStudent();
	public List<Student> listStudentAttendance(int course_id,int year_id,int sem_id);
	public List<Teacher>listTeacher();
	public void saveOrUpdateAttendance(AttendanceDetails attendance);
	

	
}
