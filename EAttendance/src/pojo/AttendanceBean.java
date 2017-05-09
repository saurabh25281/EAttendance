package pojo;

import java.util.Map;

public class AttendanceBean {

	String roll_no;
	String enrollment_no;
	String student_name;
	String attendance;
	String noPeriod_total;
	String noPeriod_att;
	String attPer;
	
	

	public AttendanceBean(String roll_no, String enrollment_no,
			String student_name, String attendance, String noPeriod_total,
			String noPeriod_att, String attPer) {
		
		this.roll_no = roll_no;
		this.enrollment_no = enrollment_no;
		this.student_name = student_name;
		this.attendance = attendance;
		this.noPeriod_total = noPeriod_total;
		this.noPeriod_att = noPeriod_att;
		this.attPer = attPer;
	}

	public String getRoll_no() {
		return roll_no;
	}

	public String getEnrollment_no() {
		return enrollment_no;
	}

	public String getStudent_name() {
		return student_name;
	}

	public String getAttendance() {
		return attendance;
	}

	public String getNoPeriod_total() {
		return noPeriod_total;
	}

	public String getNoPeriod_att() {
		return noPeriod_att;
	}

	public String getAttPer() {
		return attPer;
	}

	public void setRoll_no(String roll_no) {
		this.roll_no = roll_no;
	}

	public void setEnrollment_no(String enrollment_no) {
		this.enrollment_no = enrollment_no;
	}

	public void setStudent_name(String student_name) {
		this.student_name = student_name;
	}

	public void setAttendance(String attendance) {
		this.attendance = attendance;
	}

	public void setNoPeriod_total(String noPeriod_total) {
		this.noPeriod_total = noPeriod_total;
	}

	public void setNoPeriod_att(String noPeriod_att) {
		this.noPeriod_att = noPeriod_att;
	}

	public void setAttPer(String attPer) {
		this.attPer = attPer;
	} 
}
