package com.umxinli.entity;

public class GlobalSettings extends BaseEntity {
    private static final long serialVersionUID = 1L;

    private Integer id;
    private String keyName;
    private String value;
    private String description;

    public GlobalSettings() {}

    public GlobalSettings(Integer id, String keyName, String value, String description) {
        this.id = id;
        this.keyName = keyName;
        this.value = value;
        this.description = description;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getKeyName() {
        return keyName;
    }

    public void setKeyName(String keyName) {
        this.keyName = keyName;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
