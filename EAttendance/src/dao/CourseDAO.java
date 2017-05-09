package dao;
import java.util.List;
import domain.Course;

public interface CourseDAO {
	
	
	public void saveOrUpdateCourse(Course course);
	public List<Course> listCourse();
	public Course listCourseById(int CourseId);
	public void deleteCourse(int CourseId);

}