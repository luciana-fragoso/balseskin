package com.mycompany.balseskin.services;

import com.mycompany.balseskin.model.User;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class EmailService {

    private final String from = "balseskinreceptioncentre@gmail.com";
    private final String host = "smtp.gmail.com";
    private String subject = "";
    private String text = "";

    public boolean sendEmail(User u,String type) {
        
        if (type.equalsIgnoreCase("welcome")){
            this.subject = "Welcome";
            this.text = "You have been registered into the Balseskin website. \nUsername: " + u.getUsername() + "\nPassword: " + u.getPassword();
        } else if (type.equalsIgnoreCase("update")){
            this.subject = "Update";
            this.text = "Your login details into the Balseskin website have been updated. \nUsername: " + u.getUsername() + "\nPassword: " + u.getPassword();
        }
        String to = u.getEmail();

        Properties properties = System.getProperties();

        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");

        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {

            @Override
            protected PasswordAuthentication getPasswordAuthentication() {

                return new PasswordAuthentication(from, "password8043");
            }

        });

        session.setDebug(true);

        try {

            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(from));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject(subject);
            message.setText(text);

            Transport.send(message);
            return true;

        } catch (MessagingException mex) {
            return false;
        }
    }

}
