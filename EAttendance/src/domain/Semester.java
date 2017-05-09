package domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;


@NamedQueries(  
	    {  
	        @NamedQuery(  
	        name = "LoadStudentForCourse",  
	        query = "from Student s where s.course_id = :course_id and s.year_id =:year_id and s.sem_id= :sem_id"  
	        )  
	    }  
	)  


@Entity
@Table(name="Semester")
public class Semester {
	@Id
	@GeneratedValue
	@Column(name="sem_id")	
	private int sem_id;
	public int getSem_id() {
		return sem_id;
	}
	public void setSem_id(int sem_id) {
		this.sem_id = sem_id;
	}
	public String getSem_code() {
		return sem_code;
	}
	public void setSem_code(String sem_code) {
		this.sem_code = sem_code;
	}
	public int getCourse_id() {
		return course_id;
	}
	public void setCourse_id(int course_id) {
		this.course_id = course_id;
	}
	public int getYear_id() {
		return year_id;
	}
	public void setYear_id(int year_id) {
		this.year_id = year_id;
	}
	private String sem_code;
	private int course_id;
	private int year_id;
	

}
