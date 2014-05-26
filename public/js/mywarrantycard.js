$(document).on('ready',function(){
  $(".row.card-detail").fadeOut("fast");
  // $(".row.card-detail").removeStyle()

  $("button.view-details").on('click',function(){
    // console.log("clicked view detail");
    // var element = $(this).closest(".card").find(".card-detail");
    // if(element.is(':visible') ){
    //   element.slideUp("slow");
    // }else{
    //   element.slideDown("slow");
    // }
    var warrantynumber = $(this).closest(".card").find(".card-number").text().split(':')[1];
    location.href = location.href+'/'+warrantynumber;
  })

  $("button.post-message").on('click',function(event){
    event.preventDefault();
    var userName = $("#userName").html();
    var message = $(this).parent().find("textarea").val();
    var warrantyId = $(this).closest(".card").find(".card-number").html();
    var apiurl = "/api/warrantycard/insertMessage";
    console.log(userName);
    console.log(message)
    warrantyId = warrantyId.split(':')[1]
    console.log(warrantyId);
    if(message && message!= ""){
      $.post(apiurl,{
        user:{
          name:userName
        },
        warrantyId:warrantyId,
        message:message
      })  
    }
    
  })

  $(".appliance-pic-magnific").magnificPopup({type:'image',
    zoom: {
      enabled: true,
      duration: 300 ,// don't foget to change the duration also in CSS
      easing: 'ease-in-out'
    }});
  // console.log(locale);
})