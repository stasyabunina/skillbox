$('.burger').click(() => {
  $('.header__nav').toggleClass('header__nav--active');
  $(document.body).toggleClass('stop-scroll');
})

$('.nav__close-btn').click(() => {
  $('.header__nav').removeClass('header__nav--active');
  $(document.body).removeClass('stop-scroll');
})

$('.nav__link').each(function (index, value) {
  $(this).click(() => {
    $('.header__nav').removeClass('header__nav--active');
    $(document.body).removeClass('stop-scroll');
  })
})
