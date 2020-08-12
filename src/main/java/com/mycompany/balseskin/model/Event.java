/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.balseskin.model;


/**
 *
 * @author Luciana
 */
public class Event {

    private String title;
    private String description;
    private String date;

    public Event() {

    }

    public Event(String title, String description, String date) {
        this.title = title;
        this.description = description;
        this.date = date;
        
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String t) {
        this.title = t;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

}
