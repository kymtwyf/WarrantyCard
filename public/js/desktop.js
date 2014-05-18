var WarrantyOnline = {};

(function(WO){
  WO.replaceLanguage = function(language){
    WO.lang = language;
  }
})(WarrantyOnline);


(function($){
  $(document).on('ready',function(){
    // $.cookie.json = true;
    /*
      for messageBox Display
    */
    var messageBox = $('#message-box>.alert');
    var allAlertTypes = 'alert-success alert-info alert-warning alert-danger';
    messageBox.bind('showMessage',function(event,content,alertType,time){
      console.log(arguments);
      if(content && content.trim()!=''){
        if(messageBox.hasClass('hidden')){
          messageBox.removeClass('hidden');
        }else{
          messageBox.slideDown('fast');
        }
        if(alertType){
          messageBox.removeClass(allAlertTypes);
          messageBox.addClass(alertType);
        }
        messageBox.text(content);
        setTimeout(function(){
          messageBox.slideUp();

        },time?time:1000)
      }else{
        console.log('not available message to show')
      }
      console.log('entered message');
    })
    /*
      Config the Local Language Tags
    */
    var urlForConfig = "/config/config.json";
    var langTag = $('.language.hidden').text();
    var localLanguage = localStorage['language'];
    // if(!localLanguage|| !JSON.parse(localLanguage)[langTag]){
      $.get(urlForConfig, function(result){
        console.log("requesting the languageagain");
        console.log(result);
        localStorage['language']= JSON.stringify(result);
        // $.cookie("language",JSON.stringify(result.cn),{path:"/"});
        WarrantyOnline.replaceLanguage(result[langTag]);
      });
    // }


    
    

   
  })
// setTimeout(function(){

//   $('#message-box>.alert').trigger('showMessage',["hello Message","alert-success"])
// },2000);

})(jQuery)
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

function clearAllActiveNav(){
  $(".nav-pills a").each(function(index,element){
      $(element).parent().removeClass("active");
  });
}
// $(document).ready(function(){
//   console.log("desktop onready");
//   var href = window.location.href;
//   // clearAllActiveNav();
//   if(href.indexOf('mywarrantycards') != -1){
//     $(".nav-pills a[href$='mywarrantycards']").parent().addClass("active");
//   }

//   if(href.indexOf('managecards') != -1){
//     $(".nav-pills a[href$='managecards']").parent().addClass("active");
//   }
  
// })