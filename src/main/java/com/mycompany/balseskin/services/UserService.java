/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.balseskin.services;

import com.mycompany.balseskin.model.Event;
import com.mycompany.balseskin.model.User;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

/**
 *
 * @author Luciana
 */
public class UserService {

    static DBService db = new DBService();
    EmailService emailService = new EmailService();

    public User createUser(User u) {
        User user = null;
        try {
            db.connect();
            if (db.insertUser(u.getUsername(), u.getPassword(), u.getType(), u.getEmail())) {
                user = new User(u.getUsername(), u.getPassword(), u.getType(), u.getEmail());
                 if (!u.getEmail().isEmpty())
                emailService.sendEmail(user, "welcome");
            }
            db.disconnect();
        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return user;
    }

    public User editUser(String username, String password, String type, String email) {
        User r = null;
        try {
            db.connect();
            if (db.updateUser(username, password, type, email)) {
                r = new User(username, password, type, email);
                if (!email.isEmpty())
                    emailService.sendEmail(r, "update");
                return r;
            }
            db.disconnect();

        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return r;
    }

    public User deleteUser(String username) {
        User u = null;
        try {
            db.connect();
            u = db.deleteUser(username);
            db.disconnect();
        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return u;
    }

    public Event createEvent(Event evt) throws ParseException {
        Event r = null;
        try {
            db.connect();
            if (db.insertEvent(evt.getTitle(), evt.getDescription(), evt.getDate())) {
                r = new Event(evt.getTitle(), evt.getDescription(), evt.getDate());
            }
            db.disconnect();
        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return r;
    }

    public Event editEvent(String title, String oldDate, String description, String date) throws ParseException {
        Event r = null;
        try {
            db.connect();
            r = db.updateEvent(title, oldDate, description, date);
            db.disconnect();
        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return r;
    }

    public Event deleteEvent(Event evt) {
        Event r = null;
        try {
            db.connect();
            r = db.deleteEvent(evt);
            db.disconnect();
        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return r;
    }

    public User userLogin(String username, String password) {

        User u = null;
        try {
            db.connect();
            u = db.userLogin(username);
            db.disconnect();
            if (u == null) {
                return null;
            } else if (u.getPassword().equalsIgnoreCase(password)) {

                return u;
            }

        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return null;
    }

    public User getUser(String username) {
        User u = null;
        try {
            db.connect();
            u = db.userLogin(username);
            db.disconnect();
            if (u == null) {
                return null;
            } else {
                return u;
            }

        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return null;
    }

    public List<Event> geEvents(String title) {

        List<Event> evt;
        try {
            db.connect();
            evt = db.selectEvents(title);

            db.disconnect();
            if (evt.isEmpty()) {
                return null;
            } else {
                return evt;
            }

        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return null;

    }

    public List<Event> geEvents() {
        List<Event> evt;
        try {
            db.connect();
            evt = db.selectEvents();

            db.disconnect();
            if (evt.isEmpty()) {
                return null;
            } else {
                return evt;
            }

        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return null;
    }

    public String getUsername(int id) {
        String u = null;
        try {
            db.connect();
            u = db.getUsername(id);
            db.disconnect();
            if (u == null) {
                return null;
            } else {
                return u;
            }

        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return null;
    }
    }

    


