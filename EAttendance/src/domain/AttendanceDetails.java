package domain;




import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name="attendacne_details")
public class AttendanceDetails {

	
		@Id
		@GeneratedValue(strategy=GenerationType.IDENTITY)
		@Column(name="attendance_id")
		int attendance_id;
		@Column(name="course_id")
		int course_id;
		@Column(name="teacher_id")
		int teacher_id;
		@Column(name="subject_id")
		int subject_id;
		@Column(name="year_id")
		int year_id;
		@Column(name="sem_id")
		int sem_id;
		
		@Column(name = "attendance_date", columnDefinition="DATETIME")
		@Temporal(TemporalType.TIMESTAMP)
		Date attendance_date;
		
		@OneToMany(mappedBy="attednaceDetails")
	    private Set<StudentAttendance> studentAttendance;
		
		public Set<StudentAttendance> getStudentAttendance() {
			return studentAttendance;
		}

		public void setStudentAttendance(Set<StudentAttendance> studentAttendance) {
			this.studentAttendance = studentAttendance;
		}

		public void setAttendance_id(int attendance_id) {
			this.attendance_id = attendance_id;
		}

		
		public int getSem_id() {
			return sem_id;
		}
		
		public void setSem_id(int sem_id) {
			this.sem_id = sem_id;
		}
		
		
		/*@Column(name = "startTime", columnDefinition="DATETIME")
		@Temporal(TemporalType.TIMESTAMP)
		private Date startTime;*/
		
		 public int getAttendance_id() {
			return attendance_id;
		}
		
		public Date getAttendance_date() {
			return attendance_date;
		}
		public int getCourse_id() {
			return course_id;
		}
		public int getTeacher_id() {
			return teacher_id;
		}
		public int getSubject_id() {
			return subject_id;
		}
		public int getYear_id() {
			return year_id;
		}
		public void setAttendance_date(Date attendance_date) {
			this.attendance_date = attendance_date;
		}
		public void setCourse_id(int course_id) {
			this.course_id = course_id;
		}
		public void setTeacher_id(int teacher_id) {
			this.teacher_id = teacher_id;
		}
		public void setSubject_id(int subject_id) {
			this.subject_id = subject_id;
		}
		public void setYear_id(int year_id) {
			this.year_id = year_id;
		}
		
		
}
	
