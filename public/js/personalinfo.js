(function ($) {
  $.fn.editable.defaults.mode = 'inline';
  $(document).on('ready',function(){
  var allEditables = [];
  allEditables.push($('a.person-name'));
  allEditables.push($('a.person-telephone'));
  allEditables.push($('a.person-address'));

    $('.btn-edit').on('click',function(){
      $(this).addClass('hidden');
      $('.btn-save').removeClass('hidden');
      $('.btn-cancel').removeClass('hidden');

      $.each(allEditables,function(index,element){
        element.editable();
      })
      // allEditables.each(function(element){
      //   element.enable();
      // })
      console.log('clicked edit');
    })
    $('.btn-save').on('click',function(){
      $(this).addClass('hidden');
      $(".btn-cancel").addClass('hidden');
      $('.btn-edit').removeClass('hidden');

       ///submit values 

       $.each(allEditables,function(index,element){
        element.editable('destroy');
      })
    })
    $('.btn-cancel').on('click',function(){
      $(this).addClass('hidden');
      $('.btn-save').addClass('hidden');
      $('.btn-edit').removeClass('hidden');

       $.each(allEditables,function(index,element){
        element.editable('destroy');
      })
    })
  })


})(jQuery);
