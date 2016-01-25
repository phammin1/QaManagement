/* when the DOM is ready */
jQuery(document).ready(function() {
    var messageBox = $('#messageBox');
    // add empty row to allow putting in new element
    $(".paleblue tbody").append('<tr><td></td></tr>');
	/* grab important elements */
    var oldList, newList, item;
    
    var sendPostRequest = function (itemId, newState) {
        $.get("/polls/" + itemId + "/setState/" + newState)
            .done(function (data) {
                messageBox.text('Successfully set ' + itemId + ' to ' + newState);
            });

    }

    $('.paleblue tbody').sortable({
        items: "tr:not(.unsortable)",
        start: function(event, ui) {
            item = ui.item;
            newList = oldList = ui.item.parent().parent().parent().parent();
        },
        stop: function(event, ui) {       
            var itemId = item.find("td.id").text();
            var newState = newList.attr('id');
            var itemState = item.find("td.state");
            itemState.text(newState);
            messageBox.text("Sending post request");
            sendPostRequest(itemId, newState);
        },
        change: function(event, ui) {  
            if(ui.sender) newList = ui.placeholder.parent().parent().parent().parent();
        },
        connectWith: ".ui-sortable"
    }).disableSelection();
});