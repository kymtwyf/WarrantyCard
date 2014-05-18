$(document).on('ready',function(){
  function findUserByEmail(email){

  }
  $('input[name="email"]').on('blur',function(){
    var email = $(this).val();
    var regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    var alertText = $(this).closest(".form-group").find(".alert-text");

    if(email == ''){
      return;
    }
    if(!regex.test(email)){
      alertText.removeClass('hidden');
      alertText.text("invalid email");
      alertText.next().attr("value","");

      return ;
    }else{
      $(this).closest(".form-group").find(".alert-text").text("")
      var loadingimg = $(this).closest(".form-group").find("img");
      loadingimg.removeClass('hidden');
      var url = '/api/user/searchCustomers';
      var conditions = {
        email:email
      }
      $.post(url,{
        conditions:conditions
      },function(data){
        console.log(JSON.stringify(data));
        loadingimg.addClass('hidden');
        alertText.removeClass('hidden');
        if(data.users.length == 0 ){

          alertText.text("没有此用户名");
          $('.click-to-register').removeClass('hidden');
          return;
        }
        alertText.text(data.users[0].name);
        alertText.next().attr("value",data.users[0]._id);

      })

    }
    console.log("email "+email);

  })

  $('input[name="SN"]').on('blur',function(){
    var SN = $(this).val();
    var alertText = $(this).closest(".form-group").find(".alert-text");
    alertText.text("");
    
    if(SN == ''){

      return;
      // alertText.text("不得为空");
    }
    var loadingimg = $(this).closest(".form-group").find("img");
    loadingimg.removeClass('hidden');
    var url = '/api/appliance/search';
    var conditions = {
      SN:SN
    }
    $.post(url,{
      conditions:conditions
    },function(data){
      console.log(JSON.stringify(data));
      loadingimg.addClass('hidden');
      alertText.removeClass('hidden');

      if(data.appliances.length == 0 ){
        alertText.text("无此设备，请重新输入");
        return
      }
      alertText.text(data.appliances[0].name);
      alertText.next().text(data.appliances[0]._id);
      $('input[name="KY"]').attr("value",data.appliances[0].KY).text(data.appliances[0].KY);

    })

  

  })
  $('#btn-submit').on('click',function(event){
    var formData = new FormData($('#new-card-form')[0]);
    // console.log(formData);
    if(false){
      return;
    }
    var url = "/api/warrantycard/create";
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      async: false,
      cache: false,
      contentType: false,
      processData: false,
      success: function (data) {
        // alert(returndata);
        data = JSON.parse(data);
        if(data.status == 'success'){
          console.log("success");
          $('input').val('');
          $('input.hidden').attr('value','');
          // var control = $('input[type="file"]');
          // control.replaceWith( control = control.clone( true ) )
          // $('.alert-text').addClass('hidden');

          // $('.alert-result.alert-success').removeClass('hidden');
          $("#message-box>.alert").trigger("showMessage",["successfully created warranty card!!!","alert-success",3000]);
        }else{          
          console.log("fail");
          // alert(data);
          // $('.alert-result.alert-danger').removeClass('hidden');
          $("#message-box>.alert").trigger("showMessage",["error "+JSON.stringify(data),"alert-danger",3000]);

        }
      }
  });
  })

  $('input[type=file]').bootstrapFileInput();
})