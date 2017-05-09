package domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="year")
public class Year {

	@Id
	@GeneratedValue
	@Column(name="year_id")
	private int year_id;
	@Column(name="year_name")
	private String year_name;
	
	public int getYear_id() {
		return year_id;
	}
	public void setYear_id(int year_id) {
		this.year_id = year_id;
	}
	public String getYear_name() {
		return year_name;
	}
	public void setYear_name(String year_name) {
		this.year_name = year_name;
	}
	
}
