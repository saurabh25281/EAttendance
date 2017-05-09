package domain;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name="student")
public class Student {

@Id
@GeneratedValue
@Column(name="id")
private int id; 

private String first_name;

private String middle_name;

private String last_name; 

private int course_id; 

private int sem_id;

private int year_id;

private int roll_no; 

private Date date_of_birth;

private char gender; 

private String address; 

private String phone ;

private String login; 

private String password; 
 


String  pfirst_name; 
public String getPfirst_name() {
	return pfirst_name;
}
public void setPfirst_name(String pfirst_name) {
	this.pfirst_name = pfirst_name;
}
public String getPlast_name() {
	return plast_name;
}
public void setPlast_name(String plast_name) {
	this.plast_name = plast_name;
}
public String getPlogin() {
	return plogin;
}
public void setPlogin(String plogin) {
	this.plogin = plogin;
}
public String getPpassword() {
	return ppassword;
}
public void setPpassword(String ppassword) {
	this.ppassword = ppassword;
}
public String getPphone() {
	return pphone;
}
public void setPphone(String pphone) {
	this.pphone = pphone;
}
public String getPaddress() {
	return paddress;
}
public void setPaddress(String paddress) {
	this.paddress = paddress;
}
public String getPprofession() {
	return pprofession;
}
public void setPprofession(String pprofession) {
	this.pprofession = pprofession;
}

@Column(name="plast_name")
String  plast_name;
@Column(name="plogin")
String plogin;
@Column(name="ppassword")
String ppassword; 
@Column(name="pphone")
String pphone;
@Column(name="paddress")
String  paddress; 
@Column(name="pprofession")
String  pprofession;

public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}
@Column(name="first_name")
public String getFirst_name() {
	return first_name;
}
@Column(name="date_of_birth")
public Date getDate_of_birth() {
	return date_of_birth;
}
public void setDate_of_birth(Date date_of_birth) {
	this.date_of_birth = date_of_birth;
}
public void setFirst_name(String first_name) {
	this.first_name = first_name;
}
@Column(name="middle_name")
public String getMiddle_name() {
	return middle_name;
}
public void setMiddle_name(String middle_name) {
	this.middle_name = middle_name;
}
@Column(name="last_name")
public String getLast_name() {
	return last_name;
}
public void setLast_name(String last_name) {
	this.last_name = last_name;
}
@Column(name="course_id")
public int getCourse_id() {
	return course_id;
}
public void setCourse_id(int course_id) {
	this.course_id = course_id;
}
@Column(name="sem_id")
public int getSem_id() {
	return sem_id;
}
public void setSem_id(int sem_id) {
	this.sem_id = sem_id;
}
@Column(name="year_id")
public int getYear_id() {
	return year_id;
}

public void setYear_id(int year_id) {
	this.year_id = year_id;
}
@Column(name="roll_no")
public int getRoll_no() {
	return roll_no;
}
public void setRoll_no(int roll_no) {
	this.roll_no = roll_no;
}



@Column(name="gender")
public char getGender() {
	return gender;
}


public void setGender(char gender) {
	this.gender = gender;
}

@Column(name="address")
public String getAddress() {
	return address;
}
public void setAddress(String address) {
	this.address = address;
}
@Column(name="phone")
public String getPhone() {
	return phone;
}
public void setPhone(String phone) {
	this.phone = phone;
}
public String getLogin() {
	return login;
}
@Column(name="login")
public void setLogin(String login) {
	this.login = login;
}
@Column(name="password")
public String getPassword() {
	return password;
}
public void setPassword(String password) {
	this.password = password;
}
			  
}