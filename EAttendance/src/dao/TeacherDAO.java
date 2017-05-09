package dao;

import java.util.List;

import domain.Teacher;

public interface TeacherDAO {
	
	
	public void saveOrUpdateTeacher(Teacher teacher);
	public List<Teacher> listTeacher();
	public Teacher listTeacherById(int teacher_id);
	public void deleteTeacher(int teacher_id);


}
