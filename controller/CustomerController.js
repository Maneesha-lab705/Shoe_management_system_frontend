var customerID =null;
$(document).ready(function (){
    $("#customer-batons>button[type='button']").eq(0).click(function (){
        // let customer_id = $("#customer_id").val().AUTO;
        let name = $("#name").val();
        let address = $("#address").val();
        let email = $("#email").val();
        let phone = $("#phone").val();
        $.ajax({
            method:"POST",
            contentType:"application/json",
            url:"http://localhost:8080/shop/api/v1/customer",
            async:true,
            data:JSON.stringify({
                // id:customer_id,
                name:name,

            }),

            success: function (data) {
                Swal.fire(
                    'Success!',
                    'Customer has been saved successfully!',
                    'success'
                );
                fetchCustomerData();
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