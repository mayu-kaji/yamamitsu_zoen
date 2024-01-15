
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
      slidesPerView: "auto",
      speed: 2000,
      freeMode: true,
      freeModeMomentum: false,
      spaceBetween: 80,
      // loopAdditionalSlides: 6,
      centerInsufficientSlides: true,//スライドが少ない場合に中央寄せ
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
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
    slidesPerView: 2,
    loopedSlides: 1,
    loop: true,
    spaceBetween: 25,
    speed: 5000,
    freeModeMomentum: true,//スライドのスピードを一定にする
    centerInsufficientSlides: true,
    loopAdditionalSlides: 4, // ループさせるスライドの数
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    }
  });
};



//ホバーアニメーション　GSAP
const paragraphs = document.querySelectorAll(".js-text");


paragraphs.forEach(paragraph => {

  const textContent = paragraph.textContent;
  const newTextContent = [...textContent]
    .map((char) => `<span>${char}</span>`)
    .join("");
  paragraph.innerHTML = newTextContent;

  // ホバー時のイベントリスナー
paragraph.addEventListener('mouseover', () => {
  const spans = paragraph.querySelectorAll('span');
  spans.forEach(span => {
    setTimeout(() => {
      span.style.color = 'grey';
    }, Math.random() * 400);
  });
});

// ホバーが外れた時のイベントリスナー
paragraph.addEventListener('mouseout', () => {
  const spans = paragraph.querySelectorAll('span');
  spans.forEach(span => {
    setTimeout(() => {
      span.style.color = '#000';
    }, Math.random() * 500);
  });
});
});

// G-SAP アニメーション
gsap.fromTo(
  ".js-text span", {
    autoAlpha: 0,
  },
  {
    autoAlpha: 1,
    repeatDelay: 1.2,
    stagger: {
      each: 0.2,
      from: "random",
    },
  }
);

// ランダムな赤色を生成する関数
function getRandomGrayColor() {
  const gray = Math.floor(Math.random() * 256);
  return `rgb(${gray}, ${gray}, ${gray})`;
}
