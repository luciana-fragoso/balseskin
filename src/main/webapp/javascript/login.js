
$(function () {
    $("#loginButton").click(function () {
        
        var username = $("#usernameLogin").val() || '';
        var password = $("#passwordLogin").val() || '';
        
         if (username === "" || (!username.trim().length) || password === "" || (!password.trim().length)) {
           document.getElementById("login_error_message").innerHTML  = "All fields are mandatory";
            document.getElementById("login_error_message").style.visibility = "visible";
        }
        else {
            $.ajax({
            type: 'POST',
            url: 'api/balseskin/userLogin',
            data: JSON.stringify({
                username: username,
                password: password
            }),
            dataType: 'json',
            contentType: 'application/json'
          
        }).then(function (user) {
            if (user === null){
                document.getElementById("login_error_message").innerHTML  = "Incorrect username/password";
            document.getElementById("login_error_message").style.visibility = "visible";
            }
            else {
             setUserIdentifier(user.identifier);
            if (user.type === "manager")
                window.location.href = 'index_manager.html';
            else if (user.type === "resident")
                window.location.href = 'index_resident.html';
            else if (user.type === "reception")
                window.location.href = 'index_fd.html';
            }
            
              document.getElementById("usernameLogin").innerHTML  = "";
              document.getElementById("passwordLogin").innerHTML  = "";
        });
        }
        
    });
});

