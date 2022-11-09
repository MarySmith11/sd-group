import Swiper, { Navigation, Pagination, EffectFade } from "swiper";
import interact from 'interactjs';

export default class ProjectPage {
    constructor() {
        this._page = document.querySelector('.project-page');
        if (!this._page) {
            return;
        }

        this._aboutSlider = this._page.querySelector('.project-page__about-slider');
        this._aboutSwiper = null;

        this._stuctureSlider = this._page.querySelector('.project-page__structure-slider');
        this._stuctureSwiper = null;

        this._accordionBlock = this._page.querySelector('.project-page__territory-accordion');
        this._accordionHiddenImageClass = 'project-page__territory-image--hidden';

        this._mapBlock = null;
        this._minZoom = 1;
        this._maxZoom = 2.5;
        this._zoomStep = 0.25;
        this._translatePositions = {
            x: 0,
            y: 0,
        };
        this._currentZoom = this._minZoom;
        this._inactiveButtonClass = 'project-page__structure-description-button--inactive';
        this._draggableMapClass = 'project-page__structure-details-picture--draggable';
        this._activeMapSelectorClass = 'project-page__structure-details-selector--active';

        this.initPlugins();
    }

    initPlugins() {
        this.initAboutSlider();
        this.initAccordion();
        this.initStructureSlider();
        this._initMap();
    }

    initAboutSlider() {
        if (!this._aboutSlider) {
            return;
        }

        const pagination = this._aboutSlider.querySelector('.project-page__about-slider-pagination');
        const nextBtn = this._aboutSlider.querySelector('.progress__slider-button--next');
        const prevBtn = this._aboutSlider.querySelector('.progress__slider-button--prev');
        this._aboutSwiper = new Swiper(this._aboutSlider, {
            modules: [Navigation, Pagination],
            direction: 'horizontal',
            slidesPerView: 1,
            width: 610,
            spaceBetween: 40,
            autoHeight: false,
            loop: false,
            breakpoints: {
                320: {
                    width: 204,
                    spaceBetween: 20,
                },
                768: {
                    width: 335,
                    spaceBetween: 22,
                },
                1366: {
                    width: 610,
                    spaceBetween: 40,
                },
            },
            autoplay: {
                delay: 3900,
            },
            pagination: {
                el: pagination,
                type: 'bullets',
                clickable: true,
            },
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
            },
        });

        Array.from(this._aboutSwiper.slides).forEach((item, index) => {
            if (index !== this._aboutSwiper.activeIndex && index !== (this._aboutSwiper.activeIndex + 1)) {
                item.classList.add('project-page__about-slide--blurry');
            } else {
                item.classList.remove('project-page__about-slide--blurry');
            }
        });

        this._aboutSwiper.on('init slideChange', (instance) => {
            Array.from(instance.slides).forEach((item, index) => {
                if (index !== instance.activeIndex && index !== (instance.activeIndex + 1)) {
                    item.classList.add('project-page__about-slide--blurry');
                } else {
                    item.classList.remove('project-page__about-slide--blurry');
                }
            });
        });
    }

    initAccordion() {
        if (!this._accordionBlock) {
            return;
        }

        const items = this._accordionBlock.querySelectorAll('.project-page__territory-accordion-item');
        if (items) {
            Array.from(items).forEach(
                (item) => {
                    item.querySelector('.project-page__territory-accordion-title').addEventListener('click', this.accordionClickListener.bind(this));
                }
            );
        }
    }

    accordionClickListener(e) {
        const clickedTitle = e.target.closest('.project-page__territory-accordion-title');
        const item = clickedTitle.closest('.project-page__territory-accordion-item');
        const itemImageSrc = clickedTitle.dataset.image;
        const visibleImage = this._page.querySelector(`.project-page__territory-image:not(.${this._accordionHiddenImageClass})`);
        const hiddenImage = this._page.querySelector(`.${this._accordionHiddenImageClass}`);
        if (!item || !clickedTitle) {
            return;
        }

        const needOpen = !item.classList.contains('project-page__territory-accordion-item--active');
        const activeAccordions = document.querySelectorAll('.project-page__territory-accordion-item--active');
        if (activeAccordions) {
            Array.from(activeAccordions).forEach(otherItem => otherItem.classList.remove('project-page__territory-accordion-item--active'));
        }

        item.classList.toggle('project-page__territory-accordion-item--active', needOpen);
        if (needOpen) {
            hiddenImage.src = itemImageSrc;
            hiddenImage.classList.remove(this._accordionHiddenImageClass);
            visibleImage.classList.add(this._accordionHiddenImageClass);
        }
    }

    initStructureSlider() {
        if (!this._stuctureSlider) {
            return;
        }

        const pagination = this._stuctureSlider.querySelector('.project-page__structure-slider-pagination');
        this._aboutSwiper = new Swiper(this._stuctureSlider, {
            modules: [Pagination, EffectFade],
            virtualTranslate: true,
            speed: 1000,
            fadeEffect: { crossFade: true },
            effect: 'fade',
            slidesPerView: 1,
            autoHeight: false,
            loop: false,
            pagination: {
                el: pagination,
                type: 'bullets',
                clickable: true,
                renderBullet: function (i, className) {
                    const activeTitle = this.slides[i].dataset.activeTitle;
                    const shortTitle = this.slides[i].dataset.shortTitle;
                    return `<div class="${className}" data-index="${i}"><span class="short-title">${shortTitle}</span><span class="active-title">${activeTitle}</span></div>`;
                },
            },
        });
    }

    _initMap() {
        this._mapBlock = this._page.querySelector('.project-page__structure-details-picture');
        this._minimizeButton = this._page.querySelector('.project-page__structure-description-button--minus');
        this._zoomButton = this._page.querySelector('.project-page__structure-description-button--plus');
        this._mapSelectorButtons = this._page.querySelectorAll('.js-project-map-selector');

        this._initMapEvents();
        this._applyMapZoom(this._minZoom);
    }

    _initMapEvents() {
        if (this._minimizeButton) {
            this._minimizeButton.addEventListener('click', this._minimizeMap.bind(this));
        }

        if (this._zoomButton) {
            this._zoomButton.addEventListener('click', this._zoomMap.bind(this));
        }

        if (this._mapSelectorButtons) {
            Array.from(this._mapSelectorButtons).forEach((button) => {
                button.addEventListener('click', this._selectMapData.bind(this));
            });
        }

        this._initInteract();
    }

    _zoomMap(e) {
        e.preventDefault();
        if (!this._mapBlock || this._zoomButton.classList.contains(this._inactiveButtonClass)) {
            return;
        }

        let newZoom = this._currentZoom + this._zoomStep;
        this._currentZoom = (newZoom > this._maxZoom) ? this._maxZoom : newZoom;
        this._applyMapZoom();
    }

    _minimizeMap(e) {
        e.preventDefault();
        if (!this._mapBlock || this._minimizeButton.classList.contains(this._inactiveButtonClass)) {
            return;
        }

        let newZoom = this._currentZoom - this._zoomStep;
        this._currentZoom = (newZoom < this._minZoom) ? this._minZoom : newZoom;
        this._applyMapZoom();
    }

    _applyMapZoom() {
        this._minimizeButton.classList.toggle(this._inactiveButtonClass, (this._currentZoom === this._minZoom));
        this._zoomButton.classList.toggle(this._inactiveButtonClass, (this._currentZoom === this._maxZoom));
        this._mapBlock.style.transform = `scale(${this._currentZoom})`;
        this._mapBlock.classList.toggle(this._draggableMapClass, (this._currentZoom !== this._minZoom));
    }

    _initInteract() {
        const _self = this;
        interact(this._mapBlock).draggable({
            listeners: {
                move(event) {
                    if (_self._currentZoom === _self._minZoom) {
                        return;
                    }

                    _self._translatePositions.x += event.dx / _self._currentZoom;
                    _self._translatePositions.y += event.dy / _self._currentZoom;

                    event.target.style.transform =
                        `scale(${_self._currentZoom}) translate(${_self._translatePositions.x}px, ${_self._translatePositions.y}px)`
                },
            }
        });
    }

    _selectMapData(e) {
        const button = e.target;
        const type = button.dataset.target;
        const addActive = !button.classList.contains(this._activeMapSelectorClass);
        Array.from(this._mapSelectorButtons).forEach((button) => {
            button.classList.remove(this._activeMapSelectorClass);
        });
        button.classList.toggle(this._activeMapSelectorClass, addActive);
        this._changeMapSelectedData(addActive ? type : '');
    }

    _changeMapSelectedData(type) {
        const allSvgInteractiveItems = this._mapBlock.querySelectorAll('.svg-map-icon');
        if (allSvgInteractiveItems) {
            Array.from(allSvgInteractiveItems).forEach(element => {
                element.classList.toggle('svg-map-icon--hidden', !!type);
            });
        }

        if (type) {
            const typeSvgInteractiveItems = this._mapBlock.querySelectorAll(`.svg-map-icon--${type}`);
            if (typeSvgInteractiveItems) {
                Array.from(typeSvgInteractiveItems).forEach(element => {
                    element.classList.remove('svg-map-icon--hidden');
                });
            }
        }
    }
}
