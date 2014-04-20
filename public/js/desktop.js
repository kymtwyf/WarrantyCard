
// $(document).on('submit','#header_signin_form',function(event){
//   event.preventDefault();
//   console.log('onsubmit');
//   var $form = $(this),
//       name = $form.find('input[name="user"]').val(),
//       password = $form.find('input[name="password"]').val(),
//       url = $form.attr('action'),
//       redirect = $form.find('input[name="redirect"]').val();

//   $.post(url,{
//     name:name,
//     password:password,
//     redirect:redirect
//   }
//   ,function(data){
//     // console.log(data);s
//    alert($.session.get('username'));
//     // if(typeof data == JSON)
//     data = JSON.parse(data);
//     if(data.status === 'error'){
//       alert("invalid username or password!");
//     }else{
//       console.log(JSON.stringify(data));
//       console.log('success login');
//       if(data.redirect){
//         window.location.href = data.redirect
//       }
//     }
//   }
//   )
// });

// $(document).on('submit','.form-register',function(event){
//   event.preventDefault();
//   console.log('register form onsubmit');
//   var name,password,email,address,phone,rpt_pwd;
//   var $form = $(this),
//       name = $form.find('input[name="name"]').val(),
//       password = $form.find('input[name="password"]').val(),
//       email = $form.find('input[name="email"]').val(),
//       address = $form.find('input[name="address"]').val(),
//       phone = $form.find('input[name="phone"]').val(),

//       url = $form.attr('action'),
//       redirect = $form.find('input[name="redirect"]').val();

//   $.post(url,{
//     name:name,
//     password:password,
//     email:email,
//     address:address,
//     telephone:phone,
//     redirect:redirect
//   }
//   ,function(data){
//     // console.log(data);s
//    alert($.session.get('username'));
//     // if(typeof data == JSON)
//     data = JSON.parse(data);
//     if(data.status === 'error'){
//       alert("invalid username or password!");
//     }else{
//       console.log(JSON.stringify(data));
//       console.log('success login');
//       if(data.redirect){
//         window.location.href = data.redirect
//       }
//     }
//   }
//   )
// })

