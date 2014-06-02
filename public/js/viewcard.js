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
            location.reload();
          }
        })
      })


      function flattenMessage(parent,messages){
            parent.empty();
        for(var i = 0 ; i < messages.length; i ++){
          var message = messages[i];
            console.log('parent')
            console.log(parent);
            var tmp = $('#message-template').clone();
            var user = message.user;
            var msg = _.isEmpty(message.message)?"你好":message.message;
            tmp.attr('id','');
            tmp.css('display','block')
            // tmp.attr('display','none');
            //set name
            tmp.find('.name-time .name').text(message.user.name);
            //set time
            tmp.find('.name-time .time').text(new Date(message.time).toLocaleDateString())
            //set message
            tmp.find('.message-body').text(msg)
            console.log(tmp);

            // parent.append(tmp);
            tmp.appendTo(parent);
            // tmp.slideDown('slow')
      }
        
      }
      $('.record-status').on('click',function(e){
        console.log(e.target)
        var record = $(e.target);
        // console.log(record)
        var record_messages = record.closest('.record').find('.record-messages');
        var record_details = record.closest('.record').find('.record-details');
        console.log(record_messages)
        if(record_messages && !record_messages.is(':visible')){
          console.log('explanding and downloading');
          console.log(record_messages.parent());
          var recordId = record_messages.closest('.record').find('.record-id').text();
          console.log('recordId '+recordId);
          var url = '/api/servicerecord/getMessageList'
          $.post(url,{
            recordId:recordId
          },function(data){
            console.log(data);
            // data = JSON.parse(data);
            if(data.status == 'success'){
                           
              flattenMessage(record_messages,data.messages);
              
              // record_messages.next().css('display','block');
              record_details.slideDown('slow');
            }else{
              console.log(data)
            }
          })

        }else{
              record_details.slideUp('slow');

        }
      })

      $('.btn-reply').on('click',function(e){
        var btn = $(e.target);
        var msg =btn.prev().val();
        if(msg.trim()==''){
          alert('请输入消息！');
          return;
        }
        var recordId = btn.closest('.record').find('.record-id').text();
        var record_messages = btn.closest('.record').find('.record-messages');
        console.log('record-id '+recordId);
        var url = '/api/servicerecord/insertMessage';
        $.post(url,{
          recordId:recordId,  
          message:msg
        },function(data){
          console.log(data);
          if(data.status =='success'){
            // alert('成功添加留言');
            btn.prev().val('')
            record_messages.empty();
            flattenMessage(record_messages,data.record.message)

          }
        })
      })

      $('.btn-close-service').on('click',function(e){
        var btn = $(e.target);
        console.log("clicked!!!");
        var closeRecordModal = $('#closeRecordModal');
        var recordId = btn.closest('.record').find('.record-id').text()
        closeRecordModal.find('#record-id').text(recordId)
        closeRecordModal.modal('show');
      })

      $('#btn-close-service-submit').on('click',function(){
        var reason = $('#reason-for-close').val();
        var closeRecordModal = $('#closeRecordModal');
        var rating = $('#closeRecordModal').find('#rating').val();

        var recordId = closeRecordModal.find('#record-id').text()
        console.log('recordId'+recordId);
        console.log('recordId'+rating);
        console.log('recordId'+reason);

        var url = '/api/servicerecord/closeRecord';

        $.post(url,{
          rating:rating,
          recordId:recordId,
          reason:reason
        },function(data){
          if(data.status =='success'){
            console.log(data);
            closeRecordModal.modal('hide');
            location.reload();
          }else{
            console.lo
          }
        })
      })

  })
})(jQuery)