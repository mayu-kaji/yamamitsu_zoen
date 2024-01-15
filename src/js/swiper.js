
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

