var itemCode =null;
$(document).ready(function (){
    $("#btnSaveItem").click(function (){

        let description = $("#itemDescription").val();
        let itemgender = $("#itemGender").val();
        let occation = $("#occasion").val();
        let veritie = $("#verities").val();
        $.ajax({
            method:"POST",
            contentType:"application/json",
            url:"http://localhost:8080/shoe/api/v1/item",
            async:true,
            data:JSON.stringify({
                description:description,
                itemGender:itemgender,
                ocation:occation,
                verities:veritie,
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
    $('#searchItemId').on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $("#itemTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});
function fetchCustomerData() {
    var tableBody = $('#itemTable');

    // Fetch customer data using AJAX
    $.ajax({
        method: 'GET',
        url: "http://localhost:8080/shoe/api/v1/item",
        async: true,
        success: function (items) {
            tableBody.empty();

            items.forEach(function (item) {
                var row = $('<tr>');

                row.append($('<td>').text(item.shoeCode));
                row.append($('<td>').text(item.description));
                row.append($('<td>').text(item.itemGender));
                row.append($('<td>').text(item.ocation));
                row.append($('<td>').text(item.verities));


                tableBody.append(row);

                // // Add click event for each table row
                row.click(function () {
                    // Get data from the clicked row
                    itemCode = $(this).find('td:eq(0)').text();
                    var description = $(this).find('td:eq(1)').text();
                    var itemgender = $(this).find('td:eq(2)').text();
                    var occation = $(this).find('td:eq(3)').text();
                    var verities = $(this).find('td:eq(4)').text();


                    $("#itemDescription").val(description);
                    $("#itemGender").val(itemgender);
                    $("#occasion").val(occation);
                    $("#verities").val(verities);
                });
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch customer data. Status code:", status);
        }
    });
}

$(document).ready(function () {
    $("#btnDeleteItem").click(function () {
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
                    url:"http://localhost:8080/shoe/api/v1/item/"+itemCode,
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
    var  descriptian=document.getElementById("itemDescription")
    var  gender=document.getElementById("itemGender")
    var  occation=document.getElementById("occasion")
    var  verities=document.getElementById("verities")


    // id.value="";
    descriptian.value="";
    gender.value="";
    occation.value="";
    verities.value="";

}

