var customerID =null;

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
    console.log($("#txtEmployeeName").val())
    formData.append('gender', $("input[name='flexRadioDefaultEmployee']:checked").val());
    console.log($("input[name='flexRadioDefaultEmployee']:checked").val())
    formData.append('status', $("#status").val());
    console.log($("#status").val())
    formData.append('designation', $("#designation").val());
    console.log($("#designation").val())
    formData.append('role', $("#emrole").val());
    console.log($("#emrole").val())
    formData.append('dob', $("#Edob").val());
    console.log($("#Edob").val())
    formData.append('dateOfJoin', $("#EJoinDate").val());
    console.log($("#EJoinDate").val())
    formData.append('branchName', $("#branchName").val());
    console.log($("#branchName").val())
    formData.append('address1', $("#Eaddress").val());
    console.log($("#Eaddress").val())
    formData.append('contact', $("#Econtact").val());
    console.log($("#EMcontact").val())
    formData.append('email', $("#Eemail").val());
    console.log($("#Eemail").val())
    formData.append('guardianName', $("#gurdian").val());
    console.log($("#gurdian").val())
    formData.append('emergencyContact', $("#EMcontact").val());
    console.log($("#EMcontact").val())
    formData.append('profilePic', $("#file").val());
    console.log($("#file").val())
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
            fetchCustomerData()
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
                row.append($('<img>').text(employee.profilePic));

                tableBody.append(row);
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch customer data. Status code:", status);
        }
    });
}
