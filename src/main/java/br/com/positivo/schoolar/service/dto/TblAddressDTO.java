package br.com.positivo.schoolar.service.dto;

import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;

public class TblAddressDTO implements Serializable {

    private Long id;

    @Size(max = 20)
    private String strLabel;

    @Size(max = 10)
    private String strPostCode;

    @Size(max = 200)
    private String strStreet;

    @Size(max = 10)
    private String strNumber;

    @Size(max = 50)
    private String strNeighborhood;

    @Size(max = 200)
    private String strComplement;

    @Size(max = 50)
    private String strCity;

    @Size(max = 2)
    private String strState;

    @Size(max = 20)
    private String strCountry;

    private Integer intExcluded;

    private Instant dtmCreate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStrLabel() {
        return strLabel;
    }

    public void setStrLabel(String strLabel) {
        this.strLabel = strLabel;
    }

    public String getStrPostCode() {
        return strPostCode;
    }

    public void setStrPostCode(String strPostCode) {
        this.strPostCode = strPostCode;
    }

    public String getStrStreet() {
        return strStreet;
    }

    public void setStrStreet(String strStreet) {
        this.strStreet = strStreet;
    }

    public String getStrNumber() {
        return strNumber;
    }

    public void setStrNumber(String strNumber) {
        this.strNumber = strNumber;
    }

    public String getStrNeighborhood() {
        return strNeighborhood;
    }

    public void setStrNeighborhood(String strNeighborhood) {
        this.strNeighborhood = strNeighborhood;
    }

    public String getStrComplement() {
        return strComplement;
    }

    public void setStrComplement(String strComplement) {
        this.strComplement = strComplement;
    }

    public String getStrCity() {
        return strCity;
    }

    public void setStrCity(String strCity) {
        this.strCity = strCity;
    }

    public String getStrState() {
        return strState;
    }

    public void setStrState(String strState) {
        this.strState = strState;
    }

    public String getStrCountry() {
        return strCountry;
    }

    public void setStrCountry(String strCountry) {
        this.strCountry = strCountry;
    }

    public Integer getIntExcluded() {
        return intExcluded;
    }

    public void setIntExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
    }

    public Instant getDtmCreate() {
        return dtmCreate;
    }

    public void setDtmCreate(Instant dtmCreate) {
        this.dtmCreate = dtmCreate;
    }
}
