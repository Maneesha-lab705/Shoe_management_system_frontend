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