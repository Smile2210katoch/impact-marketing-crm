package com.sitedata.backend.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
@Entity
@Table(name = "customer_details")
public class CustomerDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String mobile;

    private String houseNo;

    private String street;

    private String city;

    private String state;

    private String architectName;

    private String architectMobile;

    private String siteStage;

    private String enquiryType;

    private String source;

    private String locationLink;
 
    private String image1;

    private String image2;

    private String image3;

    private String image4;

    private String image5;

    // NEW FIELD

   

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getHouseNo() {
        return houseNo;
    }

    public void setHouseNo(String houseNo) {
        this.houseNo = houseNo;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getArchitectName() {
        return architectName;
    }

    public void setArchitectName(String architectName) {
        this.architectName = architectName;
    }

    public String getArchitectMobile() {
        return architectMobile;
    }

    public void setArchitectMobile(String architectMobile) {
        this.architectMobile = architectMobile;
    }

    public String getSiteStage() {
        return siteStage;
    }

    public void setSiteStage(String siteStage) {
        this.siteStage = siteStage;
    }

    public String getEnquiryType() {
        return enquiryType;
    }

    public void setEnquiryType(String enquiryType) {
        this.enquiryType = enquiryType;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    // NEW GETTER
    public String getLocationLink() {
        return locationLink;
    }

    // NEW SETTER
    public void setLocationLink(String locationLink) {
        this.locationLink = locationLink;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

public String getImage1() {
    return image1;
}

public void setImage1(String image1) {
    this.image1 = image1;
}

public String getImage2() {
    return image2;
}

public void setImage2(String image2) {
    this.image2 = image2;
}

public String getImage3() {
    return image3;
}

public void setImage3(String image3) {
    this.image3 = image3;
}

public String getImage4() {
    return image4;
}

public void setImage4(String image4) {
    this.image4 = image4;
}

public String getImage5() {
    return image5;
}

public void setImage5(String image5) {
    this.image5 = image5;
}
    
}