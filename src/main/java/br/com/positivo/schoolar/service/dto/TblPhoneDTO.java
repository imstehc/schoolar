package br.com.positivo.schoolar.service.dto;

import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;

public class TblPhoneDTO implements Serializable {

    private Long id;

    @Size(max = 3)
    private String strPrefix;

    @Size(max = 10)
    private String strNumber;

    @Size(max = 10)
    private String strPhoneType;

    @Size(max = 20)
    private String strLabel;

    private Integer intExcluded;

    private Instant dtmCreated;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStrPrefix() {
        return strPrefix;
    }

    public void setStrPrefix(String strPrefix) {
        this.strPrefix = strPrefix;
    }

    public String getStrNumber() {
        return strNumber;
    }

    public void setStrNumber(String strNumber) {
        this.strNumber = strNumber;
    }

    public String getStrPhoneType() {
        return strPhoneType;
    }

    public void setStrPhoneType(String strPhoneType) {
        this.strPhoneType = strPhoneType;
    }

    public String getStrLabel() {
        return strLabel;
    }

    public void setStrLabel(String strLabel) {
        this.strLabel = strLabel;
    }

    public Integer getIntExcluded() {
        return intExcluded;
    }

    public void setIntExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
    }

    public Instant getDtmCreated() {
        return dtmCreated;
    }

    public void setDtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
    }
}
