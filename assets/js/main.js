jQuery(document).ready(function() {
     
    // navigation menu
$('#toggle').click(function() {
   $(this).toggleClass('active');
   $('#mask').toggleClass('open');
  });

$(".form-group").focus(function(){
  $(this).parent().addClass("focus-button");
});
    /*
	    Contact form
	*/
    $('.contact-form form').submit(function(e) {
    	e.preventDefault();

    	var form = $(this);
    	var nameLabel = form.find('label[for="contact-name"]');
    	var emailLabel = form.find('label[for="contact-email"]');
    	var messageLabel = form.find('label[for="contact-message"]');
    	
    	nameLabel.html('Nome');
    	emailLabel.html('Email');
    	messageLabel.html('Mensagem');
        
        var postdata = form.serialize();
        
        $.ajax({
            type: 'POST',
            url: 'assets/contact.php',
            data: postdata,
            dataType: 'json',
            success: function(json) {
                if(json.nameMessage != '') {
                	nameLabel.append(' - <span class="colored-text error-label"> ' + json.nameMessage + '</span>');
                }
                if(json.emailMessage != '') {
                	emailLabel.append(' - <span class="colored-text error-label"> ' + json.emailMessage + '</span>');
                }
                if(json.messageMessage != '') {
                	messageLabel.append(' - <span class="colored-text error-label"> ' + json.messageMessage + '</span>');
                }
                if(json.nameMessage == '' && json.emailMessage == '' && json.messageMessage == '') {
                	form.fadeOut('fast', function() {
                		form.parent('.contact-form').append('<p><span class="colored-text">Obrigada. Em breve retorno o contato.</p>');
                    });
                }
            }
        });
    });
	
});