import Swiper, { Navigation, Pagination, EffectFade } from "swiper";
import interact from 'interactjs';

export default class AboutPage {
    constructor() {
        this._page = document.querySelector('.about-page');
        if (!this._page) {
            return;
        }

        this._historySlider = document.querySelector('.about-page__history-slider');
        this._managementSlider = document.querySelector('.about-page__management-slider');

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
        
        this._initHistorySlider();
        this._initManagementSlider();
        this._initMap();
    }

    _initHistorySlider() {
        if (!this._historySlider) {
            return;
        }

        const pagination = this._historySlider.querySelector('.about-page__history-slider-pagination');
        this._historySwiper = new Swiper(this._historySlider, {
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

    _initManagementSlider() {
        if (!this._managementSlider) {
            return;
        }

        const nextBtn = this._managementSlider.querySelector('.about-page__management-slider-button--next');
        const prevBtn = this._managementSlider.querySelector('.about-page__management-slider-button--prev');
        this._managementSwiper = new Swiper(this._managementSlider, {
            modules: [Navigation, Pagination],
            direction: 'horizontal',
            slidesPerView: 'auto',
            width: 350,
            spaceBetween: 40,
            autoHeight: false,
            loop: false,
            breakpoints: {
                320: {
                    width: 204,
                    spaceBetween: 20,
                },
                768: {
                    width: 271,
                    spaceBetween: 25,
                },
                1366: {
                    width: 350,
                    spaceBetween: 40,
                },
            },
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
            },
        });
    }

    _initMap() {
        this._mapBlock = this._page.querySelector('.about-page__map-picture');
        this._minimizeButton = this._page.querySelector('.about-page__map-button--minus');
        this._zoomButton = this._page.querySelector('.about-page__map-button--plus');

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
};
