
jQuery(function ($) {

  // top-btn
  var topBtn = $('.js-pagetop');
  topBtn.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 70) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });

  // scroll - top
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 500, 'swing');
    return false;
  });


  $(document).on('click', 'a[href*="#"]', function () {
    let time = 400;
    let header = $('header').innerHeight();
    let target = $(this.hash);
    if (!target.length) return;
    let targetY = target.offset().top - header;
    $('html,body').animate({ scrollTop: targetY }, time, 'swing');
    return false;
  });

});


//hamburger
$(function(){
  $('.c-hamburger__btn').on('click', function(){
    $('.js-nav').toggleClass('is-active');
    $('.p-nav-box').toggleClass('is-active');
  });
}());

$(".js-open").click(function () {
  $(this).toggleClass('active');
  $("body").toggleClass("active");
});




/**
 * 動きの参考
 * @see https://aimoriyama.com/
 */

/* spanタグに分割 */
let splitTarget = document.querySelectorAll('.js-splitText');
splitTarget.forEach(function (target) {
  if (!target.classList.contains('is-active')) {
    newText = '';
    spanText = target.innerHTML;
    spanText.split('').forEach((char) => {
      newText += '<span>' + char + '</span>';
    });
    target.innerHTML = newText;
  }
});

let animationText = document.querySelectorAll('.js-textAnimation');
let timeIds = [];

animationText.forEach(function (word) {
  word.addEventListener('mouseover', function () {
    let texts = word.children;

    timeIds.forEach(function (timeId) {
      clearTimeout(timeId);
    })

    for (let i = 0; i < texts.length; i++) {
      timeIds.push(setTimeout(function () {
        texts[i].classList.add('is-active');
      }, Math.floor(Math.random() * (400 - 30 + 1) + 30)))
    }
  });


  word.addEventListener('mouseleave', function () {
    let texts = word.children;

    timeIds.forEach(function (timeId) {
      clearTimeout(timeId);
    })

    for (let i = 0; i < texts.length; i++) {
      timeIds.push(setTimeout(function () {
        texts[i].classList.remove('is-active');
      }, Math.floor(Math.random() * (700 - 100 + 1) + 100)))
    }
  });
});


//checkbox
$(".js-check").click(function() {
  var $radio = $(this).find('input[type="radio"]');

  $(".js-check").not(this).removeClass("click");
  $(this).addClass("click");

  if (!$radio.is(':checked')) {
    $radio.prop("checked", true);
  }
});
