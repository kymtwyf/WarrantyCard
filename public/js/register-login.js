function checkRegisterInput(form){
  //passsword check
  var ret = {
    valid:null,
    detail:null
  }
  var valid = true,reason = '';
  var password = form.find('input[name="password"]').val();
  var rpt_password = form.find('input[name="rpt_password"]').val();
   

  return ret;
}

function clearError(form){
  form.find('.form-group').removeClass('error');
}

function addError(fieldName){

}
$(document).on('submit','.form-register',function(event){
  event.preventDefault();
  console.log('register form onsubmit');
  var name,password,email,address,phone,rpt_pwd;

  var $form = $(this),
      name = $form.find('input[name="name"]').val(),
      password = $form.find('input[name="password"]').val(),
      email = $form.find('input[name="email"]').val(),
      address = $form.find('input[name="address"]').val(),
      phone = $form.find('input[name="phone"]').val(),

      url = $form.attr('action'),
      redirect = $form.find('input[name="redirect"]').val();

  $.post(url,{
    name:name,
    password:password,
    email:email,
    address:address,
    telephone:phone,
    redirect:redirect
  }
  ,function(data){
    // console.log(data);s
   // alert($.session.get('username'));
    // if(typeof data == JSON)
    data = JSON.parse(data);
    if(data.status === 'error'){
      alert(data.detail);
    }else{
      console.log(JSON.stringify(data));
      console.log('success register');
      if(data.redirect){
        window.location.href = data.redirect
      }
    }
  }
  )
})

$(document).on('ready',function(){


  $("button#signin-submit").click(function(e){
      e.preventDefault();
      var email = $('input[name="email"]').val();
      var password = $('input[name="password"]').val();
      var signinurl = '/api/signin';
      console.log('email'+email);
      // console.log('password'+password);

      console.log('clicked');
      $.post(signinurl,{
        email:email,
        password:password
      },function(data){
        // console.log(JSONdata);
        data = JSON.parse(data);
        if(data.status =='success'){
          location.href = '/';
        }else{
          $('#message-box>.alert').trigger('showMessage',["邮箱或者密码错误，请重试！","alert-danger",2000]);
        }
      })
      var btn = $(this).button('loading');
      setTimeout(function () {
          btn.button('reset');
      }, 1000);
  }); 
})