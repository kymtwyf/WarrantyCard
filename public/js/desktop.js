var WarrantyOnline = {
  lang:null
};

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
    console.log('language tag '+langTag);
    var localLanguage = localStorage['language'];
    // console.log(!localLanguage);
    // console.log(JSON.parse(localLanguage)[langTag]);
    if(!localLanguage|| !JSON.parse(localLanguage)[langTag]){
      $.get(urlForConfig, function(result){
        console.log("requesting the languageagain");
        console.log(result);
        localStorage['language']= JSON.stringify(result);
        // $.cookie("language",JSON.stringify(result.cn),{path:"/"});
        WarrantyOnline.replaceLanguage(result[langTag]);
      });
    }else{
      // if(!WarrantyOnline.lang && localStorage['language']){
        console.log('replacing language ');
        WarrantyOnline.replaceLanguage(JSON.parse(localLanguage)[langTag] );
      // }
    }

    $('#search ul li a').on('click',function(e){
      var a = $(e.target);
      console.log(a)
      var btn = a.parent().parent().prev();
      var span = btn.find('span');
      console.log(btn);

      btn.html(a.text());
      btn.attr('value',a.attr('value'));
      btn.append(span);

    })

    $('#search-submit').on('click',function(){
      // console.log('searching');
      // var 
      var keyword = $('#search input').val();
      if(keyword == '') {
        alert("请输入查询关键字");
        return;
      }
      var field = $('#search ul').prev().attr('value');
      console.log(field);
      location.href = '/search?keyword='+keyword+"&field="+field;
    })
    

   
  })
// setTimeout(function(){

//   $('#message-box>.alert').trigger('showMessage',["消息","alert-success",10000000])
// },2000);

})(jQuery)
