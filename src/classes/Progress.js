import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';

export default class Progress {
  constructor() {
    this._progressBlocks = document.querySelectorAll('.progress');
    this._initSliders();
  }

  _initSliders() {
    if (!this._progressBlocks) {
      return;
    }

    Array.from(this._progressBlocks).forEach((block, blockIndex) => {
      const slider = block.querySelector('.progress__slider');
      if (!slider) {
        return;
      }

      const bar = block.querySelector('.progress__pagination');
      if (bar) {
        this._initProgressBar(bar);
      }

      const nextBtn = slider.querySelector('.progress__slider-button--next');
      const prevBtn = slider.querySelector('.progress__slider-button--prev');
      const swiper = new Swiper(slider, {
        modules: [Navigation, Autoplay],
        direction: 'horizontal',
        slidesPerView: 1,
        autoHeight: false,
        loop: false,
        disableOnInteraction: false,
        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtn,
        },
      });

      swiper.on('slideChanged', (e) => {
        if (e.pagination.bullets) {
          Array.from(e.pagination.bullets).forEach((bullet) => {
            if (bullet.dataset.index < e.activeIndex) {
              bullet.classList.add('progress__pagination-history');
            } else {
              bullet.classList.remove('progress__pagination-history');
            }
          });
        }
      });
    });
  }

  _initProgressBar(bar) {
    const barInterval = setInterval(() => {
      const firstProgressBar = bar.querySelector('.swiper-pagination-bullet:not(.swiper-pagination-bullet-active,.progress__pagination-history)');
      const activeProgressBar = bar.querySelector('.swiper-pagination-bullet-active');
      if (activeProgressBar) {
        activeProgressBar.classList.add('progress__pagination-history');
        activeProgressBar.classList.remove('swiper-pagination-bullet-active');
      }
      if (firstProgressBar) {
        if (firstProgressBar.classList.contains('progress__pagination-history_stop')){
          clearInterval(barInterval);
        }
        firstProgressBar.classList.add('swiper-pagination-bullet-active');
      } else {
        clearInterval(barInterval);
      }
    }, 2000);    
  }
}