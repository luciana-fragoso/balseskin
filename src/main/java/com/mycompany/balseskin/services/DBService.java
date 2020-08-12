/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.balseskin.services;

import com.mycompany.balseskin.model.Event;
import com.mycompany.balseskin.model.User;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Luciana
 */
public class DBService {

    Connection conn = null;
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
    private User aux_user = new User();

    public Connection connect() throws SQLException {

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/balseskin?serverTimezone=UTC", "root", "root");
        } catch (ClassNotFoundException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return conn;
    }

    public void disconnect() {
        try {
            conn.close();
        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
    }

    public boolean insertUser(String username, String password, String type, String email) {
        try {

            String firstQuery = "select username from user where username='" + username + "'";
            PreparedStatement firstStmt = conn.prepareStatement(firstQuery);
            ResultSet firstRs = firstStmt.executeQuery(firstQuery);

            if (firstRs.next() != false) {
                return false;
            }

            String query = "insert into user values (default, ?, ?,?,?)";
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setString(1, username.toLowerCase());
            stmt.setString(2, password.toLowerCase());
            stmt.setString(3, type);
            stmt.setString(4, email);

            int result = stmt.executeUpdate();
            return result > 0;

        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return false;
    }

    public boolean updateUser(String username, String password, String type, String email) {
        try {
            this.aux_user = selectUser(username);
            String query = "update user set user_password = ?, user_type = ? , email = ? where username = ?;";

            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setString(1, password);
            stmt.setString(2, type);
            stmt.setString(3, email);
            stmt.setString(4, username);

            int result = stmt.executeUpdate();
            return result > 0;

        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return false;
    }

    public User deleteUser(String username) {
        try {
            this.aux_user = selectUser(username);
            String query = "delete from user where username = ?;";

            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setString(1, username);

            int result = stmt.executeUpdate();
            if (result > 0) {
                return this.aux_user;
            }

        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return null;
    }

    public boolean insertEvent(String title, String description, String date) throws ParseException {
        try {

            String query = "insert into event values (?, ?,?)";
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setString(1, title);

            java.util.Date utilDate = format.parse(date);
            java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());

            stmt.setDate(2, sqlDate);
            stmt.setString(3, description);

            int result = stmt.executeUpdate();
            return result > 0;

        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return false;
    }

    public Event updateEvent(String title, String oldDate, String description, String date) throws ParseException {
        try {

            String query = "update event set event_date = ? , event_description = ? where title = ? and event_date = ?";
            PreparedStatement stmt = conn.prepareStatement(query);
            java.util.Date utilDate = format.parse(date);
            java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
            stmt.setDate(1, sqlDate);
            stmt.setString(2, description);
            stmt.setString(3, title);
            stmt.setString(4, oldDate);

            int result = stmt.executeUpdate();
            if (result > 0) {
                return new Event(title, description, date);
            } else {
                return null;
            }

        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return null;
    }

    public Event deleteEvent(Event evt) {
        try {

            String query = "delete from event where title = ? and event_date = ? and event_description = ? ;";

            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setString(1, evt.getTitle());
            stmt.setString(2, evt.getDate());
            stmt.setString(3, evt.getDescription());

            int result = stmt.executeUpdate();
            if (result > 0) {
                return evt;
            } else {
                return null;
            }
        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return null;
    }

    public User userLogin(String username) {
        User u = null;

        try {

            String query = "select user_password,user_type,user_id,email from user where username = '" + username.toLowerCase() + "';";
            PreparedStatement stmt = conn.prepareStatement(query);
            ResultSet rs = stmt.executeQuery(query);
            if (rs.next() == false) {
                u = null;
            } else {
                u = new User(username, rs.getString(1), rs.getString(2).toLowerCase(), rs.getString(4));
                u.setIdentifier(Integer.parseInt(rs.getString(3)));
            }

        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return u;
    }

    public User selectUser(String username) {
        User u = null;

        try {

            String query = "select user_password,user_type from user where username = '" + username.toLowerCase() + "';";
            PreparedStatement stmt = conn.prepareStatement(query);
            ResultSet rs = stmt.executeQuery(query);
            if (rs.next() == false) {
                u = null;
            } else {
                u = new User(username, rs.getString(1), rs.getString(2).toLowerCase());
            }

        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return u;
    }

    public List<Event> selectEvents(String title) {
        List<Event> events = new ArrayList<>();
        try {
            String query = "select title,event_date,event_description from event where title like '%" + title + "%';";
            PreparedStatement stmt = conn.prepareStatement(query);
            ResultSet rs = stmt.executeQuery(query);
            if (rs.next() == false) {
                return events;
            } else {
                do {

                    events.add(new Event(rs.getString(1), rs.getString(3).toLowerCase(), rs.getString(2)));
                } while (rs.next());
            }

        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return events;
    }

    public List<Event> selectEvents() {
        List<Event> events = new ArrayList<>();
        try {
            String query = "select title,event_date,event_description from event;";
            PreparedStatement stmt = conn.prepareStatement(query);
            ResultSet rs = stmt.executeQuery(query);
            if (rs.next() == false) {
                return events;
            } else {
                do {
                    //DateFormat format = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
                    // Date date = format.parse(rs.getString(2));
                    //DateFormat df = new SimpleDateFormat("MM/dd/yyyy");
                    //String result = df.format(date);

                    events.add(new Event(rs.getString(1), rs.getString(2), rs.getString(3).toLowerCase()));
                } while (rs.next());
            }

        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        } //catch (ParseException ex) {
        // Logger.getLogger(DBService.class.getName()).log(Level.SEVERE, null, ex);
        //}
        return events;
    }

    public String getUsername(int id) {
        String u = null;

        try {

            String query = "select username from user where user_id = " + id + ";";
            PreparedStatement stmt = conn.prepareStatement(query);
            ResultSet rs = stmt.executeQuery(query);
            if (rs.next() == false) {
                u = null;
            } else {
                u  = rs.getString(1);
                return u;  
            }

        } catch (SQLException e) {
            System.out.println("Unnable to connect database: " + e);
        }
        return u;
    }
}
