var employeeID =null;

document.addEventListener('DOMContentLoaded', function () {
    fetchEmployeeData();
});
// Search functionality
$('#searchEmployeeID').on("keyup", function () {
    let value = $(this).val().toLowerCase();
    $("#employeetbl tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});
/**
 * Employee Save
 * */
$("#btnsaveEmployee").click(function () {
    var formData = new FormData();
    formData.append('name', $("#txtEmployeeName").val());
    formData.append('gender', $("input[name='flexRadioDefaultEmployee']:checked").val());
    formData.append('status', $("#status").val());
    formData.append('designation', $("#designation").val());
    formData.append('role', $("#emrole").val());
    formData.append('dob', $("#Edob").val());
    formData.append('dateOfJoin', $("#EJoinDate").val());
    formData.append('branchName', $("#branchName").val());
    formData.append('address1', $("#Eaddress").val());
    formData.append('contact', $("#Econtact").val());
    formData.append('email', $("#Eemail").val());
    formData.append('guardianName', $("#gurdian").val());
    formData.append('emergencyContact', $("#EMcontact").val());
    formData.append('profilePic', $("#file").val());
    $.ajax({
        method: "POST",
        url: "http://localhost:8080/shoe/api/v1/employee",
        processData: false,
        contentType: false,
        data: formData,
        success: function (data) {
            Swal.fire(
                'Success!',
                'Employee has been saved successfully!',
                'success'
            );
            fetchEmployeeData()
            cleanData();
        },
        error: function (xhr, exception) {
            Swal.fire(
                'Error!',
                'Employee has been saved unsuccessfully!',
                'error'
            );
        }
    });
});
function getSelectedRadioButtonValue() {
    var radioButtons = document.getElementsByName('flexRadioDefault');

    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return radioButtons[i].nextElementSibling.textContent.trim();

        }
    }
}

function fetchEmployeeData() {
    var tableBody = $('#employeetbl');

    $.ajax({
        method: 'GET',
        url: "http://localhost:8080/shoe/api/v1/employee",
        async: true,
        success: function (employee) {
            tableBody.empty();

            employee.forEach(function (employee) {
                var row = $('<tr>');
                row.append($('<td>').text(employee.employee_code));
                row.append($('<td>').text(employee.name));
                row.append($('<td>').text(employee.gender));
                row.append($('<td>').text(employee.designation));
                row.append($('<td>').text(employee.dateOfJoin));
                row.append($('<td>').text(employee.status));
                row.append($('<td>').text(employee.role));
                row.append($('<td>').text(employee.dob));
                row.append($('<td>').text(employee.address1));
                row.append($('<td>').text(employee.contact));
                row.append($('<td>').text(employee.emContact));
                row.append($('<td>').text(employee.guardianName));
                row.append($('<td>').text(employee.email));
                row.append($('<td>').text(employee.branchName));
                row.append($('<td>').text(employee.profilePic));

                tableBody.append(row);
                // Add click event for each table row
                row.click(function () {
                    // Get data from the clicked row
                    var code = $(this).find("td:eq(0)").text();
                    var name = $(this).find("td:eq(1)").text();
                    var gender = $(this).find("td:eq(2)").text();
                    var status = $(this).find("td:eq(3)").text();
                    var designation = $(this).find("td:eq(4)").text();
                    var rol = $(this).find("td:eq(5)").text();
                    var dob = $(this).find("td:eq(6)").text();
                    var dateOfJoin = $(this).find("td:eq(7)").text();
                    var branch = $(this).find("td:eq(8)").text();
                    var address = $(this).find("td:eq(9)").text();
                    var contact = $(this).find("td:eq(10)").text();
                    var email = $(this).find("td:eq(11)").text();
                    var guardianName = $(this).find("td:eq(12)").text();
                    var emergencyContact = $(this).find("td:eq(13)").text();
                    var pic = $(this).find("td:eq(14)").text();

                    employeeID=code;
                    $("#txtEmployeeName").val(name);
                    var radioMale = document.getElementById("flexRadioDefault3");
                    var radioFemale = document.getElementById("flexRadioDefault4");
                    if (gender === "MALE"){
                        radioMale.click();
                    }else {
                        radioFemale.click();
                    }
                    $("#status").val(status);
                    $("#employeeId").val(employeeID);
                    $("#designation").val(designation);
                    $("#emrole").val(rol);
                    $("#Edob").val(dob);
                    $("#EJoinDate").val(dateOfJoin);
                    $("#branchName").val(branch);
                    $("#Eaddress").val(address);
                    $("#Econtact").val(contact);
                    $("#Eemail").val(email);
                    $("#gurdian").val(guardianName);
                    $("#EMcontact").val(emergencyContact);
                });

            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch customer data. Status code:", status);
        }
    });
}
$(document).ready(function () {
    $("#btnDeleteEmployee").click(function () {
        console.log(employeeID)
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
                    url:"http://localhost:8080/shoe/api/v1/employee/"+employeeID,
                    async:true,
                    success: function (data) {
                        fetchEmployeeData();
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

$(document).ready(function (){
    $("#btnUpdateEmployee").click(function (){
        var code = employeeID;
        var name = $("#txtEmployeeName").val();
        var gender = $("input[name='flexRadioDefaultEmployee']:checked").val();
        var status = $("#status").val();
        var designation = $("#designation").val();
        var rol = $("#emrole").val();
        var dob = $("#Edob").val();
        var dateOfJoin = $("#EJoinDate").val();
        var branch = $("#branchName").val();
        var address = $("#Eaddress").val();
        var contact = $("#Econtact").val();
        var email = $("#Eemail").val();
        var guardianName = $("#gurdian").val();
        var emergencyContact = $("#EMcontact").val();
        var pic = $("#file").val();
        $.ajax({
            method:"PUT",
            contentType:"application/json",
            url:"http://localhost:8080/shoe/api/v1/employee",
            async:true,
            data:JSON.stringify({
                employee_code:code,
                name:name,
                profilePic:pic,
                gender:gender,
                status:status,
                designation:designation,
                rol:rol,
                dob:dob,
                dateOfJoin:dateOfJoin,
                branchName:branch,
                address1:address,
                contact:contact,
                email:email,
                guardianName:guardianName,
                emContact:emergencyContact
            }),
            success: function (data) {
                Swal.fire(
                    'Success!',
                    'Customer has been update successfully!',
                    'success'

                );
                fetchEmployeeData();
                cleanData();
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
function cleanData(){
    // var  id=document.getElementById("customer_id")
    var  name=document.getElementById("txtEmployeeName")
    var  pic=document.getElementById("file")
    var  gender=getSelectedRadioButtonValue();
    var  status=document.getElementById("status")
    var  designation=document.getElementById("designation")
    var  rol=document.getElementById("emrole")
    var  dob=document.getElementById("Edob")
    var  dateOfJoin=document.getElementById("EJoinDate")
    var  branchName=document.getElementById("branchName")
    var  address1=document.getElementById("Eaddress")
    var  contact=document.getElementById("Econtact")
    var  email=document.getElementById("Eemail")
    var  guardianName=document.getElementById("gurdian")
    var  emContact=document.getElementById("EMcontact")


    // id.value="";
    name.value="";
    pic.value="";
    gender.value="";
    status.value="";
    designation.value="";
    rol.value="";
    dateOfJoin.value="";
    dob.value="";
    branchName.value="";
    address1.value="";
    email.value="";
    guardianName.value="";
    emContact.value="";
}