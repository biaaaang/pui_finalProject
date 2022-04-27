document.addEventListener("DOMContentLoaded", function(){
    window.addEventListener('scroll', function() {

        scroll = $('.header_title').clientHeight;
        if (window.scrollY > 149.3) {
          $('#navbar_top').addClass('fixed-top');
          var item = $('.header_container');
          $('#navbarNav').css("padding-left", item.css('padding-left'));
          $('#navbarNav').css("margin-left", item.css('margin-left'));

          
      
          
          // add padding top to show content behind navbar
          navbar_height = $('#navbar_top').css('height');
          console.log(navbar_height);
          document.body.style.paddingTop = navbar_height;
        } 
        else {
          $('#navbar_top').removeClass('fixed-top');
          $('#navbar_top').css("paddingLeft", 0);
          $('#navbarNav').css("padding-left", 0);
          $('#navbarNav').css("margin-left", 0);

           
          // remove padding top from body
          document.body.style.paddingTop = '0';
        } 
    });
  }); 

function home() {
  window.location.href = 'index.html';
}