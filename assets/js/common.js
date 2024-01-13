
jQuery(function ($) {
  
  // ページトップボタン
  var topBtn = $('.js-pagetop');
  topBtn.hide();

  // ページトップボタンの表示設定
  $(window).scroll(function () {
    if ($(this).scrollTop() > 70) {
      // 指定px以上のスクロールでボタンを表示
      topBtn.fadeIn();
    } else {
      // 画面が指定pxより上ならボタンを非表示
      topBtn.fadeOut();
    }
  });

  // ページトップボタンをクリックしたらスクロールして上に戻る
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 300, 'swing');
    return false;
  });

  // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動。ヘッダーの高さ考慮。)
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



//swiper - treatment
(() => {
  let swiper, swiperBool;
  const breakPoint = 768;

  window.addEventListener(
    "load",
    () => {
      if (breakPoint > window.innerWidth) {
        swiperBool = false;
      } else {
        createSwiper();
        swiperBool = true;
      }
    },
    false
  );

  window.addEventListener(
    "resize",
    () => {
      if (breakPoint > window.innerWidth && swiperBool) {
        swiper.destroy(false, true);
        swiperBool = false;
      } else if (breakPoint <= window.innerWidth && !swiperBool) {
        createSwiper();
        swiperBool = true;
      }
    },
    false
  );

  function createSwiper() {
    swiper = new Swiper(".p-top-treatment__swiper", {
      loop: true,
      slidesPerView: 3,
      speed: 15000,
      disableOnInteraction: false,
      spaceBetween: 80,
      autoplay: {
        delay: 0,
      },
    });
  }
})();


//swiper - blog
const swiperSlides = document.getElementsByClassName(".swiper-slide.p-top-blog__slide");
const breakPoint = 768; // ブレークポイントを設定
let swiper;
let swiperBool;

window.addEventListener(
  "load",
  () => {
    if (breakPoint < window.innerWidth) {
      swiperBool = false;
    } else {
      createSwiper();
      swiperBool = true;
    }
  },
  false
);

window.addEventListener(
  "resize",
  () => {
    if (breakPoint < window.innerWidth && swiperBool) {
      swiper.destroy(false, true);
      swiperBool = false;
    } else if (breakPoint >= window.innerWidth && !swiperBool) {
      createSwiper();
      swiperBool = true;
    }
  },
  false
);

const createSwiper = () => {
  swiper = new Swiper(".swiper.p-top-blog__swiper", {
    allowTouchMove: false,
    loopedSlides: 1,
    loop: true,
    spaceBetween: 25,
    speed: 15000,
    slidesPerView: 1,
    // disableOnInteraction: false, // 矢印をクリックしても自動再生を止めない
    // loopAdditionalSlides: 1, // ループさせるスライドの数
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    }
  });
};