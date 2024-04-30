var SupplierId =null;
$(document).ready(function (){
    $("#btnsaveSupplier").click(function (){
        let name = $("#nameSupplier").val();
        let catagory = $("#inputCategory").val();
        let address1 = $("#inputAddress").val();
        let address2 = $("#inputAddress2").val();
        let address3 = $("#inputAddress3").val();
        let address4 = $("#inputCity").val();
        let address5 = $("#inputState").val();
        let address6 = $("#inputZip").val();
        let contact1 = $("#inputcontact1").val();
        let contact2 = $("#inputcontact2").val();
        let email = $("#inputEmail").val();
        $.ajax({
            method:"POST",
            contentType:"application/json",
            url:"http://localhost:8080/shoe/api/v1/supplier",
            async:true,
            data:JSON.stringify({
              name:name,
                category:catagory,
                address1:address1,
                address2:address2,
                address3:address3,
                address4:address4,
                address5:address5,
                address6:address6,
                contact1:contact1,
                contact2:contact2,
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
        cleanData();
    })
})

$(document).ready(function () {
    // Function to fetch and display customer data in the table body

    // Call fetchCustomerData on page load
    fetchCustomerData();

    // Search functionality
    $('#serchSupplier').on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $("#supplierTbl tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});
function fetchCustomerData() {
    var tableBody = $('#supplierTbl');

    // Fetch customer data using AJAX
    $.ajax({
        method: 'GET',
        url: "http://localhost:8080/shoe/api/v1/supplier",
        async: true,
        success: function (suppliers) {
            tableBody.empty();

            suppliers.forEach(function (supplier) {
                var row = $('<tr>');

                row.append($('<td>').text(supplier.code));
                row.append($('<td>').text(supplier.name));
                row.append($('<td>').text(supplier.category));
                row.append($('<td>').text(supplier.address1));
                row.append($('<td>').text(supplier.address2));
                row.append($('<td>').text(supplier.address3));
                row.append($('<td>').text(supplier.address4));
                row.append($('<td>').text(supplier.address5));
                row.append($('<td>').text(supplier.address6));
                row.append($('<td>').text(supplier.contact1));
                row.append($('<td>').text(supplier.contact2));
                row.append($('<td>').text(supplier.email));


                tableBody.append(row);

                // // Add click event for each table row
                row.click(function () {
                    // Get data from the clicked row
                    SupplierId = $(this).find('td:eq(0)').text();
                    var name = $(this).find('td:eq(1)').text();
                    var category = $(this).find('td:eq(2)').text();
                    var add1 = $(this).find('td:eq(3)').text();
                    var add2 = $(this).find('td:eq(4)').text();
                    var add3 = $(this).find('td:eq(5)').text();
                    var add4 = $(this).find('td:eq(6)').text();
                    var add5 = $(this).find('td:eq(7)').text();
                    var add6 = $(this).find('td:eq(8)').text();
                    var contact1 = $(this).find('td:eq(9)').text();
                    var contact2 = $(this).find('td:eq(10)').text();
                    var email = $(this).find('td:eq(11)').text();

                    //
                    //
                    //     // Set data in text fields
                        $('#nameSupplier').val(name);
                        $('#inputCategory').val(category);
                        $('#inputAddress').val(add1);
                        $('#inputAddress2').val(add2);
                        $('#inputAddress3').val(add3);
                        $('#inputCity').val(add4);
                        $('#inputState').val(add5);
                        $('#inputZip').val(add6);
                        $('#inputEmail').val(email);
                        $('#inputcontact1').val(contact1);
                        $('#inputcontact2').val(contact2);
                    // });
                });
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch customer data. Status code:", status);
        }
    });
}
$(document).ready(function (){
    $("#btnUpdateSupplier").click(function (){
        let name = $("#nameSupplier").val();
        let catagory = $("#inputCategory").val();
        let address1 = $("#inputAddress").val();
        let address2 = $("#inputAddress2").val();
        let address3 = $("#inputAddress3").val();
        let address4 = $("#inputCity").val();
        let address5 = $("#inputState").val();
        let address6 = $("#inputZip").val();
        let contact1 = $("#inputcontact1").val();
        let contact2 = $("#inputcontact2").val();
        let email = $("#inputEmail").val();
        $.ajax({
            method:"PUT",
            contentType:"application/json",
            url:"http://localhost:8080/shoe/api/v1/supplier",
            async:true,
            data:JSON.stringify({
                code:SupplierId,
                name:name,
                category:catagory,
                address1:address1,
                address2:address2,
                address3:address3,
                address4:address4,
                address5:address5,
                address6:address6,
                contact1:contact1,
                contact2:contact2,
                email:email
            }),
            success: function (data) {
                Swal.fire(
                    'Success!',
                    'Customer has been update successfully!',
                    'success'

                );
                fetchCustomerData();
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
$(document).ready(function () {
    $("#btnDeleteSupplier").click(function () {
        console.log(SupplierId)
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
                    url:"http://localhost:8080/shoe/api/v1/supplier/"+SupplierId,
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
    var  name=document.getElementById("nameSupplier")
    var  address=document.getElementById("inputAddress")
    var  address1=document.getElementById("inputAddress2")
    var  address2=document.getElementById("inputAddress3")
    var  address3=document.getElementById("inputCity")
    var  address4=document.getElementById("inputState")
    var  address5=document.getElementById("inputZip")
    var  category=document.getElementById("inputCategory")
    var  contact1=document.getElementById("inputcontact1")
    var  contact2=document.getElementById("inputcontact2")
    var  email=document.getElementById("inputEmail")


    // id.value="";
    name.value="";
    address1.value="";
    address2.value="";
    address3.value="";
    address4.value="";
    address5.value="";
    address.value="";
    contact1.value="";
    contact2.value="";
    email.value="";
    category.value="";
}