/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.balseskin.resources;

import com.google.gson.Gson;
import com.mycompany.balseskin.model.Event;

import com.mycompany.balseskin.model.User;
import com.mycompany.balseskin.request.LoginRequestData;
import com.mycompany.balseskin.services.UserService;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

import java.text.ParseException;
import java.util.List;
import javax.servlet.http.HttpServlet;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author Luciana
 */
@Path("/balseskin")
public class UserResource extends HttpServlet {

    public static UserService us = new UserService();
    public static Gson gson = new Gson(); 
    
    

    //curl -v POST "http://localhost:49000/api/balseskin/addUser/" -d {"username":"'loyanne'","password":"'senha987'","type":"'resident'}
    @POST
    @Path("/addUser")
    @Produces(MediaType.APPLICATION_JSON)
    public Response createUser(String body) throws UnsupportedEncodingException, IOException {
        User requestData = gson.fromJson(body, User.class);
        User u = new User(requestData.getUsername(), requestData.getPassword(), requestData.getType(),requestData.getEmail());
        User user = us.createUser(u);
        return Response.status(Response.Status.OK).entity(gson.toJson(user)).build();

    }

    @GET
    @Path("{username}/getUser")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser(@PathParam("username") String username) {
        User user = us.getUser(username);
        return Response.status(Response.Status.OK).entity(gson.toJson(user)).build();
    }
    
    
    @GET
    @Path("{id}/getUsername")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUsername(@PathParam("id")int id) {
        String username = us.getUsername(id);
        return Response.status(Response.Status.OK).entity(gson.toJson(username)).build();
    }

    
    
    @POST
    @Path("/editUser")
    @Produces(MediaType.APPLICATION_JSON)
    public Response editUser(String body) {
        User requestData = gson.fromJson(body, User.class);
        User u = new User(requestData.getUsername(), requestData.getPassword(), requestData.getType(),requestData.getEmail());
       
        User user = us.editUser(u.getUsername(),u.getPassword(),u.getType(),u.getEmail());
        return Response.status(Response.Status.OK).entity(gson.toJson(user)).build();
    }

    //curl -v POST "http://localhost:49000/api/balseskin/deleteUser/" -d {"username":"'loyanne'"}
    @POST
    @Path("/deleteUser")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteUser(String body) throws UnsupportedEncodingException, IOException {
        User requestData = gson.fromJson(body, User.class);
        User user = us.deleteUser(requestData.getUsername());
        return Response.status(Response.Status.OK).entity(gson.toJson(user)).build();

    }

    // curl -v -X POST "http://localhost:49000/api/balseskin/userLogin" -d {"username":"'stefan'","password":"'senha'}
    @POST
    @Path("/userLogin")
    @Produces(MediaType.APPLICATION_JSON)
    public Response userLogin(String body) {
        LoginRequestData requestData = gson.fromJson(body, LoginRequestData.class);

        User u = us.userLogin(requestData.username, requestData.password);

        return Response.status(Response.Status.OK).entity(gson.toJson(u)).build();

    }

    //curl -v POST "http://localhost:49000/api/balseskin/createEvent/" -d {"title":"'party'","description":"'new party'","date":'11-11-2001'}
    @POST
    @Path("/createEvent")
    @Produces(MediaType.APPLICATION_JSON)
    public Response createEvent(String body) throws UnsupportedEncodingException, IOException, ParseException {

        Event requestData = gson.fromJson(body, Event.class);
        Event e = new Event(requestData.getTitle(), requestData.getDescription(), requestData.getDate());
        Event event = us.createEvent(e);
        return Response.status(Response.Status.OK).entity(gson.toJson(event)).build();

    }

    @GET
    @Path("{title}/getEvents")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getEvent(@PathParam("title") String title) {

        List<Event> e = us.geEvents(title);

        return Response.status(Response.Status.OK).entity(gson.toJson(e)).build();
    }
    
    
    @GET
    @Path("/getAllEvents")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllEvents() {
        
        List<Event> e = us.geEvents();

        return Response.status(Response.Status.OK).entity(gson.toJson(e)).build();
    }
    

    //curl -vi GET -G "http://localhost:49000/api/balseskin/party/2020-12-15/editEvent?description=novaFesta&date=2001-12-09"
    @GET
    @Path("{title}/{date}/editEvent")
    @Produces(MediaType.APPLICATION_JSON)
    public Response editEvent(@PathParam("title") String title, @PathParam("date") String oldDate, @QueryParam("description") String description, @QueryParam("newDate") String newDate) throws ParseException {
        
        Event e =  us.editEvent(title,oldDate,description, newDate);
        return Response.status(Response.Status.OK).entity(gson.toJson(e)).build();
     
    }

    //curl -v POST "http://localhost:49000/api/balseskin/deleteEvent/" -d {"title":"'party'"}
    @POST
    @Path("/deleteEvent")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteEvent(String body) throws UnsupportedEncodingException, IOException {
   
        Event requestData = gson.fromJson(body, Event.class);
        Event event = us.deleteEvent(requestData);
        return Response.status(Response.Status.OK).entity(gson.toJson(event)).build();

    }

}
