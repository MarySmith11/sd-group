export default class Contacts {
  constructor(mapID) {
    this._mapContainer = document.querySelector(`#${mapID}`);
    this._mapPointArrowTriggers = document.querySelectorAll('.contacts__map-link');
    this.initEventListeners();
    if (this._mapContainer) {
      this._mapID = mapID;
      ymaps.ready(this.initContactsMap.bind(this));
    }
  }

  initContactsMap() {
    const mapData = this._mapContainer.dataset.map;
    this._mapData = JSON.parse(mapData);
    
      this._map = new ymaps.Map(this._mapID, {
        center: this._mapData.placemarks[0].coords,
        zoom: 15,
        behaviors: ['default', 'scrollZoom'],
        controls: []
      });
      if (this._mapData.placemarks && this._mapData.placemarks[0].coords) {
        this.addMark(this._mapData.placemarks[0]);
      }
      this._map.behaviors.enable('scrollZoom')
  }

  addMark(mark) {
    let customContentLayout = '';
            let offset = [];
            const color = mark.color ? mark.color : '#C0AA9E';
            customContentLayout = ymaps.templateLayoutFactory.createClass(`<div class="contacts__map-icon" style="background-color:${color};"><img class="contacts__map-logo" src="${mark.image}"><svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 13L0.138784 0.25L14.8612 0.25L7.5 13Z" fill="${color}"/></svg></div>`);
            offset = [-25, -66];
            const placemark = new ymaps.Placemark(mark.coords, {}, {
              iconLayout: 'default#imageWithContent',
              iconImageSize: [135, 44],
              iconImageOffset: offset,
              iconImageHref: '',
              iconContentLayout: customContentLayout
            });
            this._map.geoObjects.add(placemark);
  }

  initEventListeners() {
    if (this._mapPointArrowTriggers) {
      Array.from(this._mapPointArrowTriggers).forEach((arrow) => {
        arrow.addEventListener('click', (e) => {
          if (!e.target?.dataset?.id) {
            return;
          }

          this.goToPlaceMark(e.target.dataset.id);
        });
      });
    }
  }

  goToPlaceMark(id) {
    this._mapContainer.scrollIntoView({behavior: 'smooth', block: 'end'});
    let newCenter = null;
    if (this._mapData.placemarks) {
      this._map.geoObjects.removeAll();
      this._mapData.placemarks.forEach((mark) => {
        if (mark.id == id) {
          this.addMark(mark);
          newCenter = mark.coords;
        }
      });
      this._map.setCenter(newCenter);
    }
  }
}
