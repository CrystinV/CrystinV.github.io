// Dark mode
function toggleDark(){
	document.body.classList.toggle("dark-mode");
	var home = document.getElementById("home");
	home.classList.toggle("dark-mode");
}

// Stop slider/contact info when it gets above the footer
$(document).scroll(function() {
    checkOffset();
});

function checkOffset() {
    if($('.footer-float').offset().top + $('.footer-float').height() 
                                           >= $('#footer').offset().top + 5)
        $('.slider').css('display', 'none'),
		$('.contact .btn').css('display', 'none');
    if($(document).scrollTop() + window.innerHeight < $('#footer').offset().top + 15)
		$('.slider').css('display', 'inline-block'),
		$('.contact .btn').css('display', 'inline-block');
}
