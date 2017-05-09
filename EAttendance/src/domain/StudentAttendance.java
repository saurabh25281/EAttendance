package domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name="student_attendance")
public class StudentAttendance {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	int id;
	
	int student_id;
	boolean marked;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	
	
	
	
	public int getStudent_id() {
		return student_id;
	}
	public boolean isMarked() {
		return marked;
	}
	
	public void setStudent_id(int student_id) {
		this.student_id = student_id;
	}
	public void setMarked(boolean marked) {
		this.marked = marked;
	}
	
	
	
	@ManyToOne
    @JoinColumn(name="attendance_id", nullable=false)
    private AttendanceDetails attednaceDetails;
	
	public AttendanceDetails getAttednaceDetails() {
		return attednaceDetails;
	}
	public void setAttednaceDetails(AttendanceDetails attednaceDetails) {
		this.attednaceDetails = attednaceDetails;
	}
	public StudentAttendance()
	{
		
	}
	public StudentAttendance(int student_id, boolean marked,
			AttendanceDetails attednaceDetails) {
		this.student_id = student_id;
		this.marked = marked;
		this.attednaceDetails = attednaceDetails;
	}
	
	
	

}
