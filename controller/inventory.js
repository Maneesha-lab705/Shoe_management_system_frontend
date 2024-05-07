
document.addEventListener('DOMContentLoaded', function () {
    $("#inventoryQty").val(0);
    loaditemId();
    loadSupplierId();
});
/**
 * Load Supplier Id
 **/
const loaditemId = () => {
    $.ajax({
        method: 'GET',
        url: "http://localhost:8080/shoe/api/v1/item",
        async:true,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (item) {
            var selectElement = $("#itemCode");
            selectElement.empty();
            var option = $("<option>")
                .text("Item code")
            selectElement.append(option);
            item.forEach(function (items) {
                var option = $("<option>")
                    .val(items.shoeCode)
                    .text(items.shoeCode);
                selectElement.append(option);

            });
        }
        ,
        error: function (xhr, status, error) {
            console.error("Failed to fetch item data. Status code:");
        }
    });
};
$("#itemCode").on("change", function() {
    var selectedValue = $(this).val();

    $.ajax({
        method: 'GET',
        url: "http://localhost:8080/shoe/api/v1/item",
        async:true,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (items) {
            items.forEach(function (item) {

                if (selectedValue === item.shoeCode){
                    $("#itemCode").val(item.shoeCode)
                    $("#category").val(item.verities)
                    $("#desc").val(item.description)
                }
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch item data. Status code:");
        }
    });
});

const loadSupplierId = () => {
    $.ajax({
        method: 'GET',
        url: "http://localhost:8080/shoe/api/v1/supplier",
        async:true,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (supplier) {
            var selectElement = $("#supplierCode");
            selectElement.empty();

            var option = $("<option>")
                .text("Supplier Id")
            selectElement.append(option);
            supplier.forEach(function (suppliers) {
                var option = $("<option>")
                    .val(suppliers.code)
                    .text(suppliers.code);
                selectElement.append(option);
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch item data. Status code:");
        }
    });
};
$("#supplierCode").on("change", function() {
    var selectedValue = $(this).val();

    $.ajax({
        method: 'GET',
        url: "http://localhost:8080/shoe/api/v1/supplier",
        async:true,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (suppliers) {
            suppliers.forEach(function (supplier) {

                if (selectedValue === supplier.code){
                    $("#supplierCode").val(supplier.code)
                    $("#sName").val(supplier.name)
                }
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch item data. Status code:");
        }
    });
});


$(document).ready(function (){
    $('#btnAddtoCart').click(function (){
        let item_code = $("#itemCode").val();
        let itemdesc = $("#desc").val();
        let item_size = $("#size").val();
        let category = $("#category").val();
        let item_pic = $("#itemPic").val();
        let supplier_code = $("#supplierCode").val();
        let supplier_name = $("#sName").val();
        let sale_price = $("#sailPrice").val();
        let price_buy = $("#byPrice").val();
        let profit = $("#profit").val();
        let profit_margin = $("#prMargin").val();
        let qty = $("#inventoryQty").val();
        let status = $("#itemStatus").val();
        console.log(supplier_name)
        console.log(item_pic)
        console.log(category)
        console.log(status)
        console.log(supplier_code)


        // Create a new row for the table
        var newRow = $("<tr>");
        newRow.append("<td>" + item_code + "</td>");
        newRow.append("<td>" + itemdesc + "</td>");
        newRow.append("<td>" + item_size + "</td>");
        newRow.append("<td>" + category + "</td>");
        newRow.append("<td>" + supplier_code + "</td>");
        newRow.append("<td>" + supplier_name + "</td>");
        newRow.append("<td>" + sale_price + "</td>");
        newRow.append("<td>" + price_buy + "</td>");
        newRow.append("<td>" + profit + "</td>");
        newRow.append("<td>" + profit_margin + "</td>");
        newRow.append("<td>" + qty + "</td>");
        newRow.append("<td>" + status + "</td>");
        newRow.append("<td>" + item_pic + "</td>");

        // Append the new row to the table body
        $("#inventoryTable").append(newRow);



    })
})
function getOrderDetailArray() {
    var inventoryDtoList=[];

    $('#inventoryTable tr').each(function() {
        var inventoryDetailDto = {

            shoeCode: $(this).find('td:eq(0)').text(),
            description: $(this).find('td:eq(1)').text(),
            size: $(this).find('td:eq(2)').text(),
            category: $(this).find('td:eq(3)').text(),
            supplierCode: $('#supplierCode').val(),
            supplierName: $('#sName').val(),
            unitPriceSale: $(this).find('td:eq(6)').text(),
            unitPriceBuy: $(this).find('td:eq(7)').text(),
            expectedProfit: $(this).find('td:eq(8)').text(),
            profitMargin: $(this).find('td:eq(9)').text(),
            qty: $(this).find('td:eq(10)').text(),
            status: $(this).find('td:eq(11)').text(),
            pic: $(this).find('td:eq(12)').text()

        };

        inventoryDtoList.push(inventoryDetailDto);
    });
    console.log(inventoryDtoList)
    return inventoryDtoList;
}


    $("#order").on("click", function() {


        var inventDetailArray = getOrderDetailArray();

        console.log(inventDetailArray)
        $.ajax({
            method: 'POST',
            contentType:"application/json",
            url: "http://localhost:8080/shoe/api/v1/inventory",
            async:true,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: JSON.stringify(inventDetailArray),
            success: function() {
                Swal.fire(
                    'Success!',
                    'Order has been saved successfully!',
                    'success'
                );

            },
            error: function() {
                Swal.fire(
                    'Error!',
                    'Order has been saved unsuccessfully!',
                    'error'
                );
                $("#total").val(0);
            }
        });
    });
$(document).ready(function (){
    // Function to calculate sale price and profit
    function calculateSalePriceAndProfit() {
        // Get values from input fields
        var buyPrice = parseFloat($("#byPrice").val());
        var profitMargin = parseFloat($("#prMargin").val());

        // Calculate sale price and profit
        var salePrice = buyPrice + (buyPrice * profitMargin / 100);
        var profit = salePrice - buyPrice;

        // Update corresponding input fields
        $("#sailPrice").val(salePrice.toFixed(2)); // Round to 2 decimal places
        $("#profit").val(profit.toFixed(2)); // Round to 2 decimal places
    }

    // Event listener for buy price input field
    $("#byPrice").on("input", function() {
        calculateSalePriceAndProfit();
    });

    // Event listener for profit margin input field
    $("#prMargin").on("input", function() {
        calculateSalePriceAndProfit();
    });
});
$(document).ready(function (){
    // Function to update the status based on quantity
    function updateStatus() {
        // Get the quantity value
        var quantity = parseInt($("#inventoryQty").val());

        // Calculate 50% of the quantity
        var fiftyPercent = 0.5 * quantity;

        // Update the status text field based on quantity
        if (quantity < fiftyPercent) {
            $("#itemStatus").val("Low");
        } else {
            $("#itemStatus").val("Full");
        }
    }

    // Event listener for quantity input field
    $("#inventoryQty").on("input", function() {
        updateStatus();
    });
});