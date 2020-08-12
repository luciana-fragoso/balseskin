/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var aux_event;
var txt = "";
var aux_events;
$(document).ready(function () {
let userIdentifer = getUserIdentifier();
    
    if (isNaN(userIdentifer) || userIdentifer === -1) {
        document.getElementById("login_message").innerHTML = "You need to log in first";
        document.getElementById("login_message").style.visibility = "visible";
       
        
        document.querySelector(".all").style.display = "none";
       // document.getElementById("all").style.visibility = "hidden";
        
    } else {
        document.getElementById("loginFirst").style.display = "none";
    }
    });
/* ADD_EVENT */
$(function () {
    $("#event_add_button").click(function () {
        var title = $("#event_title_add").val();
        var date = $("#event_date_add").val();
        var description = $("#event_description_add").val();

        if (title === "" || (!title.trim().length) || date === "" || (!date.trim().length)) {
            document.getElementById("add_error_message").innerHTML = "Title and date are mandatory";
            document.getElementById("add_error_message").style.visibility = "visible";
        } else {
            var event = "{title:'" + title + "',description:'" + description + "',date:'" + date + "'}";
            $.ajax({
                type: "POST",
                url: "../api/balseskin/createEvent",
                data: event,
                dataType: "json",
                contentType: "application/json"
            }).then(function (e) {
                if (e === null) {
                    document.getElementById("add_error_message").innerHTML = "<p id='add_error_message' class='text-danger text-center font-weight-bold' style='visibility: visible'>Unable to add event</p>";
                    document.getElementById("add_error_message").style.visibility = "visible";
                } else
                    window.location.href = "../index_manager.html";
            });

            document.getElementById("event_title_add").value = "";
            document.getElementById("event_date_add").value = "";
            document.getElementById("event_description_add").value = "";
        }
    });

    /* EDIT_EVENT */

    $("#event_edit_button").click(function () {

        var title = $("#event_search_edit").val();
         
       if (title === "" || (!title.trim().length)) {
            document.getElementById("edit_error_message").innerHTML = "This field is mandatory";
            document.getElementById("edit_error_message").style.visibility = "visible";
        } else {
            $.ajax({
                type: "GET",
                url: "../api/balseskin/" + title + "/getEvents",
                dataType: "json",
                contentType: "application/json"
            }).then(function (events) {
                document.getElementById("edit_error_message").innerHTML = "";
                document.getElementById("event_search_edit").value = "";
                
                if (events === null) {
                    document.getElementById("edit_error_message").innerHTML = "Event not found";
                    document.getElementById("edit_error_message").style.visibility = "visible";
                } else {
                    document.getElementById("edit_first_div").style.display = "none";
                    txt = "";
                    aux_events = events;
                    for (i = 0; i < events.length; i++) {
                        txt += "<tr onClick='showEventEdit(" + i + ");'><td id='event_title_edit'>" + events[i].title + "</td><td id='event_date_edit'>" + events[i].date + "</td></tr>";
                    }

                    document.getElementById("table_event_edit").innerHTML = txt;
                    document.getElementById("table_event_edit").style.visibility = "visible";
                    document.getElementById("event_edit_div").style.visibility = "visible";
                }

            });


        }
    });

    $("#event_edit_button_cancel").click(function () {
        window.location.href = "../index_manager.html";
    });

    $("#event_edit_button_confirm").click(function () {

        var newDate = document.getElementById("event_date_edit_final").value;
        var newDescription = document.getElementById("event_description_edit_final").value;
        var oldDate = aux_event.date;
        $.ajax({
            type: "GET",
            url: "../api/balseskin/" + aux_event.title +"/"+oldDate+"/editEvent",
                data: {description: newDescription, newDate: newDate},
                dataType: "json",
                contentType: "application/json"           
        }).then(function (e) {
            if (e === null) {
                document.getElementById("final_remove_error_message").innerHTML = "Unable to remove event";
                document.getElementById("final_remove_error_message").style.visibility = "visible";
            } else
                window.location.href = "../index_manager.html";
        });

    });

    /* REMOVE_EVENT */

    $("#event_remove_button").click(function () {
        var title = $("#event_search_remove").val();

        document.getElementById("event_remove_div_final").style.visibility = "hidden";


        if (title === "" || (!title.trim().length)) {
            document.getElementById("remove_error_message").innerHTML = "This field is mandatory";
            document.getElementById("remove_error_message").style.visibility = "visible";
        } else {
            $.ajax({
                type: "GET",
                url: "../api/balseskin/" + title + "/getEvents",
                dataType: "json",
                contentType: "application/json"
            }).then(function (events) {

                if (events === null) {
                    document.getElementById("remove_error_message").innerHTML = "Event not found";
                    document.getElementById("remove_error_message").style.visibility = "visible";
                } else {
                    document.getElementById("remove_error_message").innerHTML = "";
                    document.getElementById("event_search_remove").value = "";
                    document.getElementById("remove_first_div").style.display = "none";
                    txt = "";
                    aux_events = events;
                    for (i = 0; i < events.length; i++) {
                        txt += "<tr onClick='showEventRemove(" + i + ");'><td id='event_title_remove'>" + events[i].title + "</td><td id='event_date_remove'>" + events[i].date + "</td></tr>";
                    }

                    document.getElementById("table_event_remove").innerHTML = txt;
                    document.getElementById("table_event_remove").style.visibility = "visible";
                    document.getElementById("event_remove_div").style.visibility = "visible";
                }

            });
            document.getElementById("event_search_remove").value = "";
            document.getElementById("remove_error_message").style.visibility = "hidden";
        }
    });


    $("#event_remove_button_cancel").click(function () {
        window.location.href = "../index_manager.html";
    });

    $("#event_remove_button_confirm").click(function () {
        var e = "{title:'" + aux_event.title + "',description:'" + aux_event.description + "',date:'" + aux_event.date + "'}";
        $.ajax({
            type: "POST",
            url: "../api/balseskin/deleteEvent",
            data: e,
            dataType: "json",
            contentType: "application/json"
        }).then(function (e) {
            if (e === null) {
                document.getElementById("final_remove_error_message").innerHTML = "Unable to remove event";
                document.getElementById("final_remove_error_message").style.visibility = "visible";
            } else
                window.location.href = "../index_manager.html";
        });

    });



});


function showEventRemove(i) {
    aux_event = aux_events[i];
        
    document.getElementById("event_remove_title_final").innerHTML = aux_event.title;
    document.getElementById("event_date_remove_final").innerHTML = aux_event.date;
    document.getElementById("event_description_remove_final").innerHTML = aux_event.description;

    document.getElementById("event_remove_div_final").style.visibility = "visible";
    document.getElementById("event_remove_div").style.display = "none";

}


function showEventEdit(i) {
    aux_event = aux_events[i];
    var aux_date = aux_event.date;
    document.getElementById("event_edit_title_final").innerHTML = aux_event.title;
    document.getElementById("event_date_edit_final").value = aux_date;
    document.getElementById("event_description_edit_final").value = aux_event.description;
    document.getElementById("event_edit_div_final").style.visibility = "visible";
    document.getElementById("event_edit_div").style.display = "none";

}







