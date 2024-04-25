var customerID =null;
$(document).ready(function (){
    $("#btnSaveCustomer").click(function (){
        // let customer_id = $("#customer_id").val().AUTO;
        let name = $("#txtCusName").val();
        let gender = getSelectedRadioButtonValue();
        let joindate = $("#JoinDate").val();
        let level = $("#level").val();
        let totPoint = $("#point").val();
        let dob = $("#dob").val();
        let address1 = $("#address").val();
        // let address2 = $("#phone").val();
        // let address3 = $("#phone").val();
        // let address4 = $("#phone").val();
        // let address5 = $("#phone").val();
        let contact = $("#contact").val();
        let email = $("#email").val();
        $.ajax({
            method:"POST",
            contentType:"application/json",
            url:"http://localhost:8080/shoe/api/v1/customer",
            async:true,
            data:JSON.stringify({
                customer_name:name,
                gender:gender,
                date:joindate,
                level:level,
                total_points:totPoint,
                dob:dob,
                address:address1,
                contact:contact,
                email:email
            }),

            success: function (data) {
                Swal.fire(
                    'Success!',
                    'Customer has been saved successfully!',
                    'success'
                );
                fetchCustomerData();
                cleanData();
            },
            error: function (xhr, exception) {
                Swal.fire(
                    'UnSuccess !',
                    'Customer has been saved unsuccessfully!',
                    'UnSuccess'
                );
            }

        })
        // cleanData();
    })
})

function getSelectedRadioButtonValue() {
    var radioButtons = document.getElementsByName('flexRadioDefault');

    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return radioButtons[i].nextElementSibling.textContent.trim();

        }
    }
}

$(document).ready(function () {
    // Function to fetch and display customer data in the table body

    // Call fetchCustomerData on page load
    fetchCustomerData();

    // Search functionality
    $('#searchCusId').on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $("#customerTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});
function fetchCustomerData() {
    var tableBody = $('#customerTable');

    // Fetch customer data using AJAX
    $.ajax({
        method: 'GET',
        url: "http://localhost:8080/shoe/api/v1/customer",
        async: true,
        success: function (customers) {
            tableBody.empty();

            customers.forEach(function (customer) {
                var row = $('<tr>');

                row.append($('<td>').text(customer.customer_code));
                row.append($('<td>').text(customer.customer_name));
                row.append($('<td>').text(customer.gender));
                row.append($('<td>').text(customer.date));
                row.append($('<td>').text(customer.level));
                row.append($('<td>').text(customer.total_points));
                row.append($('<td>').text(customer.dob));
                row.append($('<td>').text(customer.address));
                row.append($('<td>').text(customer.contact));
                row.append($('<td>').text(customer.email));

                tableBody.append(row);

                // // Add click event for each table row
                row.click(function () {
                    // Get data from the clicked row
                    customerID = $(this).find('td:eq(0)').text();
                    var name = $(this).find('td:eq(1)').text();
                    var gender = $(this).find('td:eq(2)').text();
                    var date = $(this).find('td:eq(3)').text();
                    var level = $(this).find('td:eq(4)').text();
                    var totalPoint = $(this).find('td:eq(5)').text();
                    var dob = $(this).find('td:eq(6)').text();
                    var address = $(this).find('td:eq(7)').text();
                    var contact = $(this).find('td:eq(8)').text();
                    var email = $(this).find('td:eq(9)').text();

                    //
                    //
                    //     // Set data in text fields
                    //     $('#txtCusName').val(name);
                    //     $('#address').val(address);
                    //     $('#email').val(email);
                    //     $('#contact').val(contact);
                    //     $('#g').val(contact);
                    //     $('#phone').val(contact);
                    //     $('#phone').val(contact);
                    //     $('#phone').val(contact);
                    //     $('#phone').val(contact);
                    // });
                    $("#txtCusName").val(name);
                    var radioMale = document.getElementById("flexRadioDefault1");
                    var radioFemale = document.getElementById("flexRadioDefault2");
                    if (gender === "MALE") {
                        radioMale.click();
                    } else {
                        radioFemale.click();
                    }
                    $("#JoinDate").val(date);
                    $("#level").val(level);
                    $("#point").val(totalPoint);
                    $("#dob").val(dob);
                    $("#contact").val(contact);
                    $("#address").val(address);
                    $("#email").val(email);
                });
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch customer data. Status code:", status);
        }
    });
}

$(document).ready(function (){
    $("#btnUpdateCustomer").click(function (){
        let name = $("#txtCusName").val();
        let gender = getSelectedRadioButtonValue();
        let joindate = $("#JoinDate").val();
        let level = $("#level").val();
        let totPoint = $("#point").val();
        let dob = $("#dob").val();
        let address1 = $("#address").val();
        // let address2 = $("#phone").val();
        // let address3 = $("#phone").val();
        // let address4 = $("#phone").val();
        // let address5 = $("#phone").val();
        let contact = $("#contact").val();
        let email = $("#email").val();
        $.ajax({
            method:"PATCH",
            contentType:"application/json",
            url:"http://localhost:8080/shoe/api/v1/customer",
            async:true,
            data:JSON.stringify({
                customer_code:customerID,
                customer_name:name,
                gender:gender,
                date:joindate,
                level:level,
                total_points:totPoint,
                dob:dob,
                address:address1,
                contact:contact,
                email:email,
            }),
            success: function (data) {
                Swal.fire(
                    'Success!',
                    'Customer has been update successfully!',
                    'success'

                );
                fetchCustomerData();
            },
            error: function (xhr, exception) {
                Swal.fire(
                    'UnSuccess !',
                    'Customer has been update unsuccessfully!',
                    'UnSuccess'
                );
            }
        })
    })
})
$(document).ready(function () {
    $("#btnDeleteCustomer").click(function () {
        console.log(customerID)
        // Show confirmation dialog
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true


        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    method:"DELETE",
                    contentType:"application/json",
                    url:"http://localhost:8080/shoe/api/v1/customer/"+customerID,
                    async:true,
                    success: function (data) {
                        fetchCustomerData();
                        cleanData()
                    },
                })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"

                });
            }

        });


    });

});

function cleanData(){
    // var  id=document.getElementById("customer_id")
    var  name=document.getElementById("txtCusName")
    var  address=document.getElementById("address")
    var  email=document.getElementById("email")
    var  contact=document.getElementById("contact")
    var  date=document.getElementById("JoinDate")
    var  dob=document.getElementById("dob")
    var  gender=getSelectedRadioButtonValue();
    var  point=document.getElementById("point")
    var  level=document.getElementById("level")


    // id.value="";
    name.value="";
    address.value="";
    email.value="";
    contact.value="";
    date.value="";
    dob.value="";
    gender.value="";
    point.value="";
    level.value="";
}
