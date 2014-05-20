(function($){
  $(document).on('ready',function(){
      $(".invoice-pic").magnificPopup({type:'image',
        zoom: {
          enabled: true,
          duration: 300 ,// don't foget to change the duration also in CSS
          easing: 'ease-in-out'
        }});
      
      var modalElement = $('#createRecordModal');
      
      var btn_for_service = $(".warranty-detail span[class*='for-service']");
      btn_for_service.on('click',function(){
        var warrantyId = btn_for_service.parent().find('.warranty-number').text().split(':')[1];
        console.log('the warrantyId is '+warrantyId);
        modalElement.find('.warranty-number').text(warrantyId);
        modalElement.modal('show');

      })

      $('#btn-submit-service').on('click',function(){
        var warrantyId = modalElement.find('.warranty-number').text();
        var openReason = $('#service-type').val();
        var message = $('#service-message').val();
        var url = '/api/servicerecord/create';
        $.post(url,{
          openReason:openReason,
          message:message,
          warrantyId:warrantyId
          },function(data){
          console.log(data);
          // data = JSON.parse(data);
          if(data.status == 'error'){
            console.log('error when submiting service ');
            console.log(data.detail);

          }else{
            $('#message-box>.alert').trigger('showMessage',["创建成功","alert-success",2000]);
            modalElement.modal('hide');
          }
        })
      })
  })
})(jQuery)