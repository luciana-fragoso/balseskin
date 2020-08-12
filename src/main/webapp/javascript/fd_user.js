var aux_user;
$(document).ready(function () {
    let userIdentifer = getUserIdentifier();

    if (isNaN(userIdentifer) || userIdentifer === -1) {
        document.getElementById("login_message").innerHTML = "You need to log in first";
        document.getElementById("login_message").style.visibility = "visible";


        document.querySelector(".all").style.display = "none";


    } else {
        document.getElementById("loginFirst").style.display = "none";
    }
});

/* ADD_USER */
$(function () {
    $("#user_add_button").click(function () {
        var username = $("#username_add").val();
        var password = $("#password_add").val();
        var type = "resident";
        var email = $("#email_add").val();

        if (username === "" || (!username.trim().length) || password === "" || (!password.trim().length)) {
            document.getElementById("add_error_message").innerHTML = "All fields are mandatory";
            document.getElementById("add_error_message").style.visibility = "visible";
        } else if ((email !== "" || (email.trim().length)) && (validateEmail(email) === false)) {
            document.getElementById("add_error_message").innerHTML = "Email provided not valid";
            document.getElementById("add_error_message").style.visibility = "visible";
        } else {
            var user = "{username:'" + username + "',password:'" + password + "',type:'" + type + "',email:'" + email + "'}";
            $.ajax({
                type: "POST",
                url: "../api/balseskin/addUser",
                data: user,
                dataType: "json",
                contentType: "application/json"
            }).then(function (user) {
                if (user === null) {
                    document.getElementById("add_error_message").innerHTML = "Username not available";
                    document.getElementById("add_error_message").style.visibility = "visible";
                } else
                    window.location.href = "../index_fd.html";
            });

            document.getElementById("username_add").value = "";
            document.getElementById("password_add").value = "";
            document.getElementById("email_add").value = "";
            document.getElementById("add_error_message").innerHTML = "";
        }
    });

    /* REMOVE_USER */

    $("#user_remove_button").click(function () {
        var username = $("#username_search_remove").val();

        document.getElementById("remove_error_message").style.visibility = "hidden";
        document.getElementById("remove_user_div").style.visibility = "hidden";
        document.getElementById("type_remove_label").style.visibility = "hidden";
        document.getElementById("username_remove_label").style.visibility = "hidden";
        document.getElementById("final_remove_error_message").innerHTML = "";
        document.getElementById("final_remove_error_message").visibility = "hidden";


        if (username === "" || (!username.trim().length)) {
            document.getElementById("remove_error_message").innerHTML = "This field is mandatory";
            document.getElementById("remove_error_message").style.visibility = "visible";
        } else {
            $.ajax({
                type: "GET",
                url: "../api/balseskin/" + username + "/getUser",
                dataType: "json",
                contentType: "application/json"
            }).then(function (user) {
                if (user === null) {
                    document.getElementById("remove_error_message").innerHTML = "User not found";
                    document.getElementById("remove_error_message").style.visibility = "visible";
                } else {
                    document.getElementById("remove_error_message").innerHTML = "";
                    document.getElementById("username_search_remove").value = "";
                    document.getElementById("username_remove_label").innerHTML = user.username;
                    document.getElementById("email_edit").value = user.email;
                    document.getElementById("type_remove_label").innerHTML = user.type;
                    if (user.type !== "resident") {
                        document.getElementById("remove_error_message").innerHTML = "You can't remove this user";
                        document.getElementById("remove_error_message").style.visibility = "visible";
                    } else {
                        aux_user = user;
                        document.getElementById("remove_user_div").style.visibility = "visible";
                        document.getElementById("username_remove_label").style.visibility = "visible";
                        document.getElementById("type_remove_label").style.visibility = "visible";
                    }

                }

            });

            document.getElementById("username_search_remove").value = "";
            document.getElementById("remove_error_message").style.visibility = "hidden";
        }
    });


    $("#user_remove_button_cancel").click(function () {
        document.getElementById("username_remove_label").value = "";
        document.getElementById("type_remove_label").value = "";
        window.location.href = "../index_fd.html";
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
                document.getElementById("final_remove_error_message").innerHTML = "Unable to remove user";
                document.getElementById("final_remove_error_message").style.visibility = "visible";
            } else
                window.location.href = "../index_fd.html";
        });

    });


    /* UPDATE USER */


    $("#user_edit_button").click(function () {
        var username = $("#username_search_edit").val();

        document.getElementById("update_error_message").style.visibility = "hidden";
        document.getElementById("password_edit").style.visibility = "hidden";
        document.getElementById("email_edit").style.visibility = "hidden";
        document.getElementById("username_edit").style.visibility = "hidden";
        document.getElementById("edit_user_div").style.visibility = "hidden";
        document.getElementById("final_edit_error_message").innerHTML = "";
        document.getElementById("final_edit_error_message").visibility = "hidden";

        if (username === "" || (!username.trim().length)) {
            document.getElementById("update_error_message").innerHTML = "This field is mandatory";
            document.getElementById("update_error_message").style.visibility = "visible";
            document.getElementById("final_edit_error_message").visibility = "hidden";
        } else {
            $.ajax({
                type: "GET",
                url: "../api/balseskin/" + username + "/getUser",
                dataType: "json",
                contentType: "application/json"
            }).then(function (user) {
                if (user === null) {
                    document.getElementById("password_edit").style.visibility = "hidden";
                    document.getElementById("email_edit").style.visibility = "hidden";
                    document.getElementById("username_edit").style.visibility = "hidden";
                    document.getElementById("edit_user_div").style.visibility = "hidden";

                    document.getElementById("final_edit_error_message").visibility = "hidden";
                    document.getElementById("update_error_message").innerHTML = "User not found";
                    document.getElementById("update_error_message").style.visibility = "visible";
                } else {
                    if (user.type !== "resident") {
                        document.getElementById("update_error_message").innerHTML = "You can't remove this user";
                        document.getElementById("update_error_message").style.visibility = "visible";
                    } else {
                        document.getElementById("update_error_message").visibility = "hidden";
                        document.getElementById("username_search_edit").value = "";
                        document.getElementById("username_edit").value = user.username;
                        document.getElementById("password_edit").style.visibility = "visible";
                        document.getElementById("email_edit").style.visibility = "visible";
                        document.getElementById("username_edit").style.visibility = "visible";
                        document.getElementById("edit_user_div").style.visibility = "visible";
                        document.getElementById("final_edit_error_message").visibility = "hidden";
                        aux_user = user;
                    }

                }

            });

            document.getElementById("username_search_edit").value = "";
            document.getElementById("update_error_message").style.visibility = "hidden";
            document.getElementById("password_edit").style.visibility = "hidden";
            document.getElementById("email_edit").style.visibility = "hidden";
            document.getElementById("username_edit").style.visibility = "hidden";
            document.getElementById("edit_user_div").style.visibility = "hidden";
            document.getElementById("final_edit_error_message").visibility = "hidden";
        }
    });

    $("#user_edit_button_cancel").click(function () {
        document.getElementById("username_edit").value = "";
        document.getElementById("password_edit").value = "";
        document.getElementById("email_edit").value = "";

        document.getElementById("final_edit_error_message").visibility = "hidden";
        window.location.href = "../index_fd.html";
    });



    $("#user_edit_button_confirm").click(function () {
        var newPassword = $("#password_edit").val();
        var newEmail = $("#email_edit").val();

        if (newPassword === "" || (!newPassword.trim().length)) {
            document.getElementById("final_edit_error_message").innerHTML = "This field is mandatory";
            document.getElementById("final_edit_error_message").style.visibility = "visible";
        } else if ((newEmail !== "" || (newEmail.trim().length)) && (validateEmail(newEmail) === false)) {
            document.getElementById("final_edit_error_message").innerHTML = "Email provided not valid";
            document.getElementById("final_edit_error_message").style.visibility = "visible";
        } else {
            var newUser = "{username:'" + aux_user.username + "',password:'" + newPassword + "',type:'resident',email:'" + newEmail + "'}";
            $.ajax({
                type: "POST",
                url: "../api/balseskin/editUser",
                data: newUser,
                dataType: "json",
                contentType: "application/json"
            }).then(function (user) {
                if (user === null) {
                    document.getElementById("final_edit_error_message").innerHTML = "Unable to edit user";
                    document.getElementById("final_edit_error_message").style.visibility = "visible";
                } else
                    window.location.href = "../index_fd.html";
            });

        }

    });


});


function validateEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}
