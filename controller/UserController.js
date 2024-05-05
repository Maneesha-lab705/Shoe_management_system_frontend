$("#singUp").click(function () {
    console.log("user")
    var signupData = {
        employeeId: $('#emId').val(),
        name: $('#fistName').val(),
        email: $('#userEmail').val(),
        password: $('#userPassword').val(),
        role: $('#role').val()
    };

    console.log(signupData)
    $.ajax({
        method:"POST",
        contentType:"application/json",
        url:"http://localhost:8080/shoe/api/v1/auth/signup",
        async:true,
        data: JSON.stringify(signupData),
        success: function (token1) {
            console.log(token1); // Log the token returned by the backend
            Swal.fire(
                'Success!',
                'Item has been saved successfully!',
                'success'
            );
        },
        error: function (xhr, exception) {
            Swal.fire(
                'Error!',
                'Item has been saved unsuccessfully!',
                'error'
            );
        }
    })
});
$("#userLogingbtn").click(function () {
    console.log("user")
    var signupData = {
        email: $('#loginEmail').val(),
        password: $('#loginPassword').val(),

    };

    console.log(signupData)
    $.ajax({
        method:"POST",
        contentType:"application/json",
        url:"http://localhost:8080/shoe/api/v1/auth/signin",
        async:true,
        data: JSON.stringify(signupData),
        success: function (token1) {
            console.log(token1); // Log the token returned by the backend
            Swal.fire(
                'Success!',
                'Login successfully!',
                'success'
            );
            $('#register_section').css('display','none');
            $('.navbar').css('display','block');
            $('#login').css('display','none');
            // $(document.body).css('background-image', 'url(assets/image/dash.jpg)');
            // $(document.body).css('background-color', 'black');
            $('.dashbord').css('display','block');
            $('.card-login').css('display','none');
            $('#logingForm').css('display','none');
            $('.bg-img').css('display','none');
        },
        error: function (xhr, exception) {
            Swal.fire(
                'Error!',
                'Your Email Or Password is wrong!',
                'error'
            );
        }
    })
});