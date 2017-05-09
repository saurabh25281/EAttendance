package dao;

import java.util.List;


import domain.Course;
import domain.Faculty;
import domain.Teacher;

public interface FacultyDAO {

	
		
		public void saveOrUpdateFaculty(Faculty faculty);
		public List<Faculty> listFaculty();
		public Faculty listFacultyById(int facultyId);
		public void deleteFaculty(int facultyId);
		public List<Course> listCourse();
		public List<Teacher> listTeacher();



}
