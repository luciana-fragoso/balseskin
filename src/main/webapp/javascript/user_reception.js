/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var aux_user;


/* ADD_USER */
$(function () {
    $("#user_add_reception_button").click(function () {
        var username = $("#username_add").val();
        var password = $("#password_add").val();
        var type = "resident";

        if (username === "" || (!username.trim().length) || password === "" || (!password.trim().length)) {
            document.getElementById("add_error_message").innerHTML = "<p id='add_error_message' class='text-danger text-center font-weight-bold' style='visibility: visible'>All fields are mandatory</p>";
            document.getElementById("add_error_message").style.visibility = "visible";
        } else {
            var user = "{username:'" + username + "',password:'" + password + "',type:'" + type + "'}";
            $.ajax({
                type: "POST",
                url: "../api/balseskin/addUser",
                data: user,
                dataType: "json",
                contentType: "application/json"
            }).then(function (user) {
                if (user === null) {
                    document.getElementById("add_error_message").innerHTML = "<p id='add_error_message' class='text-danger text-center font-weight-bold' style='visibility: visible'>Username not available</p>";
                    document.getElementById("add_error_message").style.visibility = "visible";
                } else
                    window.location.href = "../index_fd.html";
            });

            document.getElementById("username_add").value = "";
            document.getElementById("password_add").value = "";
            document.getElementById("add_error_message").innerHTML = "";
        }
    });

    /* REMOVE_USER */

    $("#user_remove_button").click(function () {
        var username = $("#username_search_remove").val();


        if (username === "" || (!username.trim().length)) {
            document.getElementById("remove_error_message").innerHTML = "<p id='remove_error_message' class='text-danger text-center font-weight-bold' style='visibility: visible'>This field is mandatory</p>";
            document.getElementById("remove_error_message").style.visibility = "visible";
        } else {
            $.ajax({
                type: "GET",
                url: "../api/balseskin/" + username + "/getUser",
                dataType: "json",
                contentType: "application/json"
            }).then(function (user) {
                if (user === null) {
                    document.getElementById("remove_error_message").innerHTML = "<p id='remove_error_message' class='text-danger text-center font-weight-bold' style='visibility: visible'>User not found</p>";
                    document.getElementById("remove_error_message").style.visibility = "visible";
                } else {
                    document.getElementById("remove_error_message").innerHTML = "";
                    document.getElementById("username_search_remove").value = "";
                    document.getElementById("username_remove_label").innerHTML = " <label id='username_remove_label' class='form-control' style='visibility: visible'>" + user.username + "</label>";
                    document.getElementById("type_remove_label").innerHTML = " <label id='type_remove_label' class='form-control' style='visibility: visible'>" + user.type + "</label>";
                    aux_user = user;
                    document.getElementById("remove_user_div").style.visibility = "visible";
                }

            });

            document.getElementById("username_search_remove").value = "";
            document.getElementById("remove_error_message").style.visibility = "hidden";
        }
    });


    $("#user_remove_button_cancel").click(function () {
        document.getElementById("username_remove_label").value = "";
        document.getElementById("type_remove_label").value = "";
        window.location.href = "../index_manager.html";
    });

    $("#user_remove_button_confirm").click(function () {
        var u = "{username:'" + aux_user.username + "',password:'" + aux_user.password + "',type:'" + aux_user.type + "'}";
        $.ajax({
            type: "POST",
            url: "../api/balseskin/deleteUser",
            data: u,
            dataType: "json",
            contentType: "application/json"
        }).then(function (user) {
            if (user === null) {
                document.getElementById("final_remove_error_message").innerHTML = "<p id='add_error_message' class='text-danger text-center font-weight-bold' style='visibility: visible'>Unable to remove user</p>";
                document.getElementById("final_remove_error_message").style.visibility = "visible";
            } else
                window.location.href = "../index_manager.html";
        });

    });


    /* UPDATE USER */


    $("#user_edit_reception_button").click(function () {
        var username = $("#username_search_edit").val();
        

        if (username === "" || (!username.trim().length)) {
            document.getElementById("update_error_message").innerHTML = "<p id='update_error_message' class='text-danger text-center font-weight-bold' style='visibility: visible'>This field is mandatory</p>";
            document.getElementById("update_error_message").style.visibility = "visible";
        } else {
            $.ajax({
                type: "GET",
                url: "../api/balseskin/" + username + "/getUser",
                dataType: "json",
                contentType: "application/json"
            }).then(function (user) {
                if (user === null) {
                    document.getElementById("update_error_message").innerHTML = "<p id='update_error_message' class='text-danger text-center font-weight-bold' style='visibility: visible'>User not found</p>";
                    document.getElementById("update_error_message").style.visibility = "visible";
                } else {
                    document.getElementById("update_error_message").innerHTML = "";
                    document.getElementById("username_search_edit").value = "";
                    document.getElementById("username_edit").innerHTML = " <label id='username_edit' class='form-control' style='visibility: visible'>" + user.username + "</label>";
                    document.getElementById("password_edit").innerHTML = " <input id='password_edit' type='password' class='form-control' style='visibility: visible' placeholder='New password'>";
                    document.getElementById("password_edit").style.visibility = "visible";

                    document.getElementById("radio_edit").style.visibility = "visible";
                    document.getElementById("edit_user_div").style.visibility = "visible";
                    aux_user = user;
                }

            });

            document.getElementById("username_search_edit").value = "";
            document.getElementById("update_error_message").style.visibility = "hidden";
        }
    });

    $("#user_edit_button_cancel").click(function () {
        document.getElementById("username_edit").value = "";
        document.getElementById("password_edit").value = "";
        document.getElementById("radio_edit").style.visibility = "hidden";
        window.location.href = "../index_manager.html";
    });



    $("#user_edit_button_confirm").click(function () {
        var newPassword = $("#password_edit").val();
        var newType = $("input[name='optradio']:checked").val();
       
        if (newPassword === "" || (!newPassword.trim().length)) {
            document.getElementById("final_edit_error_message").innerHTML = "<p id='final_edit_error_message' class='text-danger text-center font-weight-bold' style='visibility: visible'>Password field is mandatory</p>";
        } else {
            $.ajax({
                type: "GET",
                url: "../api/balseskin/" + aux_user.username + "/editUser",
                data: {password: newPassword, type: newType},
                dataType: "json",
                contentType: "application/json"
            }).then(function (user) {
                if (user === null) {
                    document.getElementById("final_edit_error_message").innerHTML = "<p id='final_edit_error_message' class='text-danger text-center font-weight-bold' style='visibility: visible'>Unable to edit user</p>";
                    document.getElementById("final_edit_error_message").style.visibility = "visible";
                } else
                    window.location.href = "../index_manager.html";
            });
        }


    });


});

