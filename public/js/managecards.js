(function($){
  $(document).on('ready',function(){
   $(".appliance-pic-magnific").magnificPopup({type:'image',
      zoom: {
        enabled: true,
        duration: 300 ,// don't foget to change the duration also in CSS
        easing: 'ease-in-out'
      }});
  })
})(jQuery)