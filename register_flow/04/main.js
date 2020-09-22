$('.choose-plan').click(function () {
  $('.modal, .modal-backdrop').addClass('show');
  $('.modal').css('display','block');
});


$(document).bind('click', function(e) {
  if($(e.target).closest('button.close').length === 1) {
     $('.modal, .modal-backdrop').removeClass('show');
    $('.modal').css('display','none');
  }
});