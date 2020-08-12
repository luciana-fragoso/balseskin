/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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

    $.ajax({
        type: "GET",
        url: "../api/balseskin/" + userIdentifer + "/getUsername",
        dataType: "json",
        contentType: "application/json"
    }).then(function (username) {
        document.getElementById("welcome").innerHTML = "Welcome, "+username;
        document.getElementById("welcome").style.visibility = "visible";
         document.getElementById("welcome_div").style.visibility = "visible";
        


    });

});