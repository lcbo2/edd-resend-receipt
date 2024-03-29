jQuery(document).ready(function($) {
    $("#edd_resend_button").on( "click", function(){
		$('#eddrr_response_div').html('<div class="eddrr-success"><p>' + eddrr_string_vars.please_wait + '</p></div>');
        var edd_resend_key = $("#edd_resend_key").val();
        var edd_rr_nonce = $("#edd_rr_nonce").val();
        var edd_resend_value = $('#edd_resend_value').val();
        var edd_resend_exclude = $('#edd_resend_exclude').val();
        var ajaxurl = $('#edd_resend_ajax').val();
        if(edd_resend_value == '') {
            $('#eddrr_response_div').html('<div class="eddrr-error"><p>' + eddrr_string_vars.enter_value + '</p></div>');
        } else {
            var data = {
                'action': 'edd_resend_receipt_on_post',
                'edd_resend_key': edd_resend_key,
                'edd_rr_nonce': edd_rr_nonce,
                'edd_resend_value': edd_resend_value,
                'edd_resend_exclude': edd_resend_exclude
            };

            // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
            $.post(ajaxurl, data, function(response) {
                    $('#eddrr_response_div').html(response).slideDown("slow");
            });
        }
        return false;
    });
	$(window).on("load", function(){
		var ph = $( "#edd_resend_key option:selected" ).text();
		$("#edd_resend_value").attr( "placeholder", eddrr_string_vars.field_pholder + ph );
	});
	$("#edd_resend_key").on( "change", function(){
		var ph = $("#edd_resend_key").val();
		var pholder;
		if( ph == "purchase_key" ){
			pholder = eddrr_string_vars.purchase_key;
		}
		if( ph == "payment_id" ){
			pholder = eddrr_string_vars.payment_id;
		}
		if( ph == "license_key" ){
			pholder = eddrr_string_vars.license_key;
		}
		$("#edd_resend_value").attr( "placeholder", eddrr_string_vars.field_pholder + pholder );
	});
});