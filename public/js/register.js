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
      console.log('success login');
      if(data.redirect){
        window.location.href = data.redirect
      }
    }
  }
  )
})