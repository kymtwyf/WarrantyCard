(function($){
  $(document).on('ready',function(){
      $(".invoice-pic").magnificPopup({type:'image',
        zoom: {
          enabled: true,
          duration: 300 ,// don't foget to change the duration also in CSS
          easing: 'ease-in-out'
        }});
      
      var btn_for_service = $(".warranty-detail span[class*='for-service']");
      btn_for_service.on('click',function(){
        var warrantyId = btn_for_service.parent().find('.warranty-number').text().split(':')[1];
        console.log('the warrantyId is '+warrantyId);
        
      })
  })
})(jQuery)