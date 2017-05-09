package dao;

import java.util.List;

import domain.Course;
import domain.Semester;
import domain.Year;


public interface SemesterDAO {
	
	public void saveOrUpdateSemester(Semester semester);
	public List<Semester> listSemester();
	public Semester listSemesterById(int semesterId);
	public void deleteSemester(int semesterId);
	public List<Course> listCourse();
	public List<Year> listYear();

}
