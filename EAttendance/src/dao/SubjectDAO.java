package dao;
import java.util.List;

import domain.Semester;
import domain.Subject;

public interface SubjectDAO {
	
	
	public void saveOrUpdateSubject(Subject subject);
	public List<Subject> listSubject();
	public Subject listSubjectById(int SubjectId);
	public void deleteSubject(int SubjectId);
	public List<Semester> listSemester();
}