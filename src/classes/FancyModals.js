import { Fancybox } from '@fancyapps/ui';

export default class FancyModals {
    constructor() {
        this._translationModalOpeners = document.querySelectorAll('.js-translation-modal');
        Fancybox.defaults.Image = { zoom: false };

        this._init();
    }

    _init() {
        this._initTranslationModals();
        this._initGalleryModals();
        this._initPlanModals();
    }

    _initTranslationModals() {
        if (!this._translationModalOpeners) {
            return;
        }

        Fancybox.bind('.js-translation-modal', {
            Image: {
                zoom: false,
                Panzoom: {
                    zoom: false,
                },
            },
            clickContent: false,
            showClass: false,
            template: {
                closeButton: '<svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="18.1211" y="16" width="23" height="3" rx="1.5" transform="rotate(45 18.1211 16)" fill="#C0AA9E"/><rect x="16.6924" y="32.9561" width="23" height="3" rx="1.5" transform="rotate(-45 16.6924 32.9561)" fill="#C0AA9E"/></svg>',
                main: `<div class="fancybox fancybox--translation"><div
                class="fancybox__container fancybox__translation"
                role="dialog"
                aria-modal="true"
                aria-hidden="true"
                aria-label="{{MODAL}}"
                tabindex="-1"
              >
                <div class="fancybox__backdrop"></div>
                <div class="fancybox__carousel"></div>
              </div>
              </div>`,
            },
        });
    }

    _initGalleryModals() {
        Fancybox.bind('.js-gallery-item', {
            zoom: false,
            showClass: false,
            hideClass: false,
            loop: false,
            closeButton: 'inside',
            groupAttr: 'data-gallery',
            template: {
                closeButton: '<svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="52" height="52" rx="10" fill="#E2D4CD"/><rect x="18.1211" y="16" width="23" height="3" rx="1.5" transform="rotate(45 18.1211 16)" fill="#C0AA9E"/><rect x="16.6924" y="32.9561" width="23" height="3" rx="1.5" transform="rotate(-45 16.6924 32.9561)" fill="#C0AA9E"/></svg>',
                main: `<div class="fancybox fancybox--gallery"><div
                class="fancybox__container fancybox__translation"
                role="dialog"
                aria-modal="true"
                aria-hidden="true"
                aria-label="{{MODAL}}"
                tabindex="-1"
              >
                <div class="fancybox__backdrop"></div>
                <div class="fancybox__carousel"></div>
              </div>
              </div>`,
            },
            Image: {
                zoom: false,
                click: null,
            },
            showClass: false,
            caption: function (fancybox, carousel, slide) {
                return (
                    ``
                );
            },
            on: {
                "Carousel.createSlide": (fancybox, carousel, slide) => {
                    const button = document.createElement('button');
                    button.classList.add('custom-close-button');
                    button.addEventListener('click', () => {
                        fancybox.close();
                        button.remove();
                    });
                    button.innerHTML = '<svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg"><rect class="line" x="18.1211" y="16" width="23" height="3" rx="1.5" transform="rotate(45 18.1211 16)" fill="#C0AA9E"/><rect class="line" x="16.6924" y="32.9561" width="23" height="3" rx="1.5" transform="rotate(-45 16.6924 32.9561)" fill="#C0AA9E"/></svg>';
                    const customCaption = document.createElement('p');
                    if (slide.caption) {
                        customCaption.classList.add('custom-caption');
                        const customCaptionText = document.createElement('p');
                        customCaptionText.classList.add('custom-caption-text');
                        customCaptionText.textContent = slide.caption;
                        const customCaptionCount = document.createElement('p');
                        customCaptionCount.classList.add('custom-caption-count');
                        customCaptionCount.textContent = `${carousel.slides.length} фото`;
                        customCaption.append(customCaptionText);
                        customCaption.append(customCaptionCount);
                    }

                    const mobileArrows = document.createElement('div');
                    mobileArrows.classList.add('mobile-arrows');

                    const buttonLeft = document.createElement('button');
                    buttonLeft.classList.add('custom-arrow-button');
                    buttonLeft.innerHTML = `<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.979129 4.62308C0.783867 4.42782 0.783867 4.11124 0.979129 3.91598L4.16111 0.733997C4.35637 0.538735 4.67295 0.538735 4.86822 0.733997C5.06348 0.92926 5.06348 1.24584 4.86822 1.4411L2.03979 4.26953L4.86822 7.09796C5.06348 7.29322 5.06348 7.6098 4.86822 7.80507C4.67295 8.00033 4.35637 8.00033 4.16111 7.80507L0.979129 4.62308ZM13.666 4.76953L1.33268 4.76953V3.76953L13.666 3.76953V4.76953Z" fill="#32281E"/>
                        </svg>`;
                    buttonLeft.addEventListener('click', () => {
                        fancybox.prev();
                    });

                    const buttonRight = document.createElement('button');
                    buttonRight.classList.add('custom-arrow-button');
                    buttonRight.innerHTML = `<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.0209 3.37692C13.2161 3.57218 13.2161 3.88876 13.0209 4.08402L9.83889 7.266C9.64363 7.46126 9.32705 7.46126 9.13178 7.266C8.93652 7.07074 8.93652 6.75416 9.13178 6.5589L11.9602 3.73047L9.13178 0.902042C8.93652 0.706779 8.93652 0.390197 9.13178 0.194935C9.32705 -0.000327349 9.64363 -0.000327349 9.83889 0.194935L13.0209 3.37692ZM0.333984 3.23047L12.6673 3.23047V4.23047L0.333984 4.23047L0.333984 3.23047Z" fill="#32281E"/>
                        </svg>`;
                    buttonRight.addEventListener('click', () => {
                        fancybox.next();
                    });

                    setTimeout(() => {
                        const slides = document.querySelectorAll('.fancybox__slide');
                        if (slides && Array.from(slides).length > 1) {
                            mobileArrows.append(buttonLeft);
                            mobileArrows.append(buttonRight);
                        }
                    }, 100);                    

                    setTimeout(() => {
                        slide.$content.append(button);
                        if (slide.caption) {
                            slide.$content.append(customCaption);
                        }
                        slide.$content.append(mobileArrows);
                    }, 100);
                },
            }
        });
    }

    _initPlanModals() {
        Fancybox.defaults.Image = { zoom: false };
        Fancybox.bind('.js-plan-item', {
            Image: {
                zoom: false,
                click: null,
            },
            showClass: false,
            clickContent: false,
            closeButton: 'inside',
            groupAttr: 'data-gallery',
            template: {
                closeButton: '<svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="18.1211" y="16" width="23" height="3" rx="1.5" transform="rotate(45 18.1211 16)" fill="#C0AA9E"/><rect x="16.6924" y="32.9561" width="23" height="3" rx="1.5" transform="rotate(-45 16.6924 32.9561)" fill="#C0AA9E"/></svg>',
                main: `<div class="fancybox fancybox--plan"><div
                class="fancybox__container fancybox__translation"
                role="dialog"
                aria-modal="true"
                aria-hidden="true"
                aria-label="{{MODAL}}"
                tabindex="-1"
              >
                <div class="fancybox__backdrop"></div>
                <div class="fancybox__carousel"></div>
              </div>
              </div>`,
            },
            caption: function (fancybox, carousel, slide) {
                return (
                    ``
                );
            },
            on: {
                "Carousel.createSlide": (fancybox, carousel, slide) => {
                    const button = document.createElement('button');
                    button.classList.add('custom-close-button');
                    button.classList.add('custom-close-button--dark');
                    button.addEventListener('click', () => {
                        fancybox.close();
                        button.remove();
                    });
                    button.innerHTML = '<svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg"><rect class="line" x="18.1211" y="16" width="23" height="3" rx="1.5" transform="rotate(45 18.1211 16)" fill="#C0AA9E"/><rect class="line" x="16.6924" y="32.9561" width="23" height="3" rx="1.5" transform="rotate(-45 16.6924 32.9561)" fill="#C0AA9E"/></svg>';
                    if (slide.caption) {
                        const customCaption = document.createElement('p');
                        customCaption.classList.add('custom-caption');
                        const customCaptionText = document.createElement('p');
                        customCaptionText.classList.add('custom-caption-text');
                        customCaptionText.textContent = slide.caption;
                        const customCaptionCount = document.createElement('p');
                        customCaptionCount.classList.add('custom-caption-count');
                        customCaptionCount.textContent = `${carousel.slides.length} фото`;
                        customCaption.append(customCaptionText);
                        customCaption.append(customCaptionCount);
                    }

                    const mobileArrows = document.createElement('div');
                    mobileArrows.classList.add('mobile-arrows');

                    const buttonLeft = document.createElement('button');
                    buttonLeft.classList.add('custom-arrow-button');
                    buttonLeft.innerHTML = `<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.979129 4.62308C0.783867 4.42782 0.783867 4.11124 0.979129 3.91598L4.16111 0.733997C4.35637 0.538735 4.67295 0.538735 4.86822 0.733997C5.06348 0.92926 5.06348 1.24584 4.86822 1.4411L2.03979 4.26953L4.86822 7.09796C5.06348 7.29322 5.06348 7.6098 4.86822 7.80507C4.67295 8.00033 4.35637 8.00033 4.16111 7.80507L0.979129 4.62308ZM13.666 4.76953L1.33268 4.76953V3.76953L13.666 3.76953V4.76953Z" fill="#32281E"/>
                        </svg>`;
                    buttonLeft.addEventListener('click', () => {
                        fancybox.prev();
                    });

                    const buttonRight = document.createElement('button');
                    buttonRight.classList.add('custom-arrow-button');
                    buttonRight.innerHTML = `<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.0209 3.37692C13.2161 3.57218 13.2161 3.88876 13.0209 4.08402L9.83889 7.266C9.64363 7.46126 9.32705 7.46126 9.13178 7.266C8.93652 7.07074 8.93652 6.75416 9.13178 6.5589L11.9602 3.73047L9.13178 0.902042C8.93652 0.706779 8.93652 0.390197 9.13178 0.194935C9.32705 -0.000327349 9.64363 -0.000327349 9.83889 0.194935L13.0209 3.37692ZM0.333984 3.23047L12.6673 3.23047V4.23047L0.333984 4.23047L0.333984 3.23047Z" fill="#32281E"/>
                        </svg>`;
                    buttonRight.addEventListener('click', () => {
                        fancybox.next();
                    });


                    setTimeout(() => {
                        const slides = document.querySelectorAll('.fancybox__slide');
                        if (slides && Array.from(slides).length > 1) {
                            mobileArrows.append(buttonLeft);
                            mobileArrows.append(buttonRight);
                        }
                    }, 100);  

                    setTimeout(() => {
                        slide.$content.append(button);
                        if (slide.caption) {
                            slide.$content.append(customCaption);
                        }
                        slide.$content.append(mobileArrows);
                    }, 100);
                },
            }
        });
    }
}