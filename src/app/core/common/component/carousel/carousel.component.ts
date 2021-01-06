import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';

import {Images} from './interfaces';
import {Touches} from './touches';
import {Carousel} from './carousel';
import {Container} from './container';
import {Cells} from './cells';
import {Slide} from './slide';
import {Utils} from './utils';


@Component({
  selector: 'carousel, [carousel]',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})

export class CarouselComponent implements OnDestroy {
  carousel;
  container;
  utils;
  cells;
  slide;
  _id: string;
  touches: any;
  landscapeMode: any;
  minTimeout = 30;
  isVideoPlaying: boolean;
  _width: number;
  isMoving: boolean;
  isNgContent: boolean;
  cellLength: number;
  dotsArr: any;
  @Output() events: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() id: number;
  @Input() height: number = 200;
  @Input() width: number;
  @Input() autoplay: boolean = false;
  @Input() autoplayInterval: number = 5000;
  @Input() pauseOnHover: boolean = true;
  @Input() dots: boolean = false;
  @Input() borderRadius: number;
  @Input() margin: number = 10;
  @Input() objectFit: 'contain' | 'cover' | 'none' = 'cover';
  @Input() minSwipeDistance: number = 10;
  @Input() transitionDuration: number = 200;
  @Input() transitionTimingFunction: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' = 'ease-out';
  @Input() videoProperties: any;
  @Input() counterSeparator: string = " / ";
  @Input() overflowCellsLimit: number = 3;
  @Input() listeners: 'auto' | 'mouse and touch' = 'mouse and touch';
  @Input() cellsToShow: number;
  @Input() cellsToScroll: number = 1;
  @Input() freeScroll: boolean = false;
  @Input() arrows: boolean = true;
  @Input() arrowsOutside: boolean;
  @Input() arrowsTheme: 'light' | 'dark' = 'light';
  @HostBinding('class.carousel') hostClassCarousel: boolean = true;
  @HostBinding('style.height') hostStyleHeight: string;
  @HostBinding('style.width') hostStyleWidth: string;

  constructor(
    private elementRef: ElementRef,
    private ref: ChangeDetectorRef) {

  }

  _images: Images;

  get images() {
    return this._images;
  }

  @Input()
  set images(images: Images & any) {
    this._images = images;
  }

  _isCounter: boolean;

  get isCounter() {
    return this._isCounter && this.cellLength > 1;
  }

  @Input('counter') set isCounter(value: boolean) {
    if (value) {
      this._isCounter = value;
    }
  }

  _cellWidth: number | '100%' = 200;

  @Input('cellWidth') set cellWidth(value: number | '100%') {
    if (value) {
      this._cellWidth = value;
    }
  }

  _loop: boolean = false;

  get loop() {
    if (this.images) {
      return this._loop;
    } else {
      return false;
    }
  }

  @Input('loop') set loop(value: boolean) {
    if (value) {
      this._loop = value;
    }
  }

  _lightDOM: boolean = false;

  get lightDOM() {
    if (this.images) {
      return this._lightDOM;
    } else {
      return false;
    }
  }

  @Input('lightDOM') set lightDOM(value: boolean) {
    if (value) {
      this._lightDOM = value;
    }
  }

  get isContainerLocked() {
    return this.carousel.isContainerLocked;
  }

  get slideCounter() {
    return this.carousel.slideCounter;
  }

  get lapCounter() {
    return this.carousel.lapCounter;
  }

  get isLandscape() {
    return window.innerWidth > window.innerHeight;
  }

  get isSafari(): any {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') !== -1) {
      return !(ua.indexOf('chrome') > -1);
    }
  }

  get counter() {
    let counter;

    if (this.loop) {
      counter = this.slideCounter % this.cellLength;
    } else {
      counter = this.slideCounter;
    }

    return counter + 1 + this.counterSeparator + this.cellLength;
  }

  get cellsElement() {
    return this.elementRef.nativeElement.querySelector('.carousel-cells');
  }

  get isArrows() {
    return this.arrows && !this.freeScroll;
  }

  get activeDotIndex() {
    return this.slideCounter % this.cellLength;
  }

  get cellLimit() {
    if (this.carousel) {
      return this.carousel.cellLimit;
    }
  }

  selectItem(item: any) {
    this.selectChange.emit(this.carousel.getImage(item).image);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.landscapeMode = this.isLandscape;
    this.ref.detectChanges();

    this.initCarousel();
    this.carousel.lineUpCells();
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    if (this.autoplay && this.pauseOnHover) {
      this.carousel.stopAutoplay();
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseleave(event: MouseEvent) {
    if (this.autoplay && this.pauseOnHover) {
      this.carousel.autoplay();
    }
  }

  ngOnInit() {
    this.isNgContent = this.cellsElement.children.length > 0;

    this.touches = new Touches({
      element: this.cellsElement,
      listeners: this.listeners,
      mouseListeners: {
        "mousedown": "handleMousedown",
        "mouseup": "handleMouseup"
      }
    });

    this.touches.on('touchstart', this.handleTouchstart);
    this.touches.on('horizontal-swipe', this.handleHorizontalSwipe);
    this.touches.on('touchend', this.handleTouchend);
    this.touches.on('mousedown', this.handleTouchstart);
    this.touches.on('mouseup', this.handleTouchend);
    this.touches.on('tap', this.handleTap);

    this.setDimensions();
  }

  ngAfterViewInit() {
    this.initCarousel();

    if (this.autoplay) {
      this.carousel.autoplay();
    }

    this.cellLength = this.getCellLength();
    this.dotsArr = Array(this.cellLength).fill(1);
    this.ref.detectChanges();
    this.carousel.lineUpCells();

    /* Start detecting changes in the DOM tree */
    this.detectDomChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.width || changes.height || changes.images) {
      this.setDimensions();
      this.initCarousel();
      this.carousel.lineUpCells();
      this.ref.detectChanges();
    }
  }

  ngOnDestroy() {
    this.touches.destroy();
    //this.carousel.destroy();
  }

  initCarousel() {
    let carouselProperties = {
      id: this.id,
      cellsElement: this.elementRef.nativeElement.querySelector('.carousel-cells'),
      hostElement: this.elementRef.nativeElement,
      images: this.images,
      cellWidth: this.getCellWidth(),
      loop: this.loop,
      autoplayInterval: this.autoplayInterval,
      overflowCellsLimit: this.overflowCellsLimit,
      visibleWidth: this.width,
      margin: this.margin,
      minSwipeDistance: this.minSwipeDistance,
      transitionDuration: this.transitionDuration,
      transitionTimingFunction: this.transitionTimingFunction,
      videoProperties: this.videoProperties,
      eventHandler: this.events,
      freeScroll: this.freeScroll,
      lightDOM: this.lightDOM
    };

    this.utils = new Utils(carouselProperties);
    this.cells = new Cells(carouselProperties, this.utils);
    this.container = new Container(carouselProperties, this.utils, this.cells);
    this.slide = new Slide(carouselProperties, this.utils, this.cells, this.container);
    this.carousel = new Carousel(carouselProperties, this.utils, this.cells, this.container, this.slide);
  }

  detectDomChanges() {
    const observer = new MutationObserver((mutations) => {
      this.onDomChanges();
    });

    var config = {
      attributes: true,
      childList: true,
      characterData: true
    };
    observer.observe(this.elementRef.nativeElement, config);
  }

  onDomChanges() {
    this.cellLength = this.getCellLength();
    this.carousel.lineUpCells();
    this.ref.detectChanges();
  }

  setDimensions() {
    this.hostStyleHeight = this.height + 'px';
    this.hostStyleWidth = this.width + 'px';
  }

  getImage(index) {
    return this.carousel.getImage(index);
  }

  handleTouchstart = (event: any) => {
    //event.preventDefault();
    this.touches.addEventListeners("mousemove", "handleMousemove");
    this.carousel.handleTouchstart(event);
    this.isMoving = true;
  }

  handleHorizontalSwipe = (event: any) => {
    event.preventDefault();
    this.carousel.handleHorizontalSwipe(event);
  }

  handleTouchend = (event: any) => {
    const touches = event.touches;
    this.carousel.handleTouchend(event);
    this.touches.removeEventListeners("mousemove", "handleMousemove");
    this.isMoving = false;
  }

  handleTap = (event: any) => {
    let outboundEvent: any = {
      name: 'click'
    }
    let nodes = Array.prototype.slice.call(this.cellsElement.children);
    let cellElement = event.srcElement.closest(".carousel-cell");
    const i = nodes.indexOf(cellElement);
    const cellIndex = nodes.indexOf(cellElement);

    if (this.images) {
      //outboundEvent.fileIndex = this.carousel.getFileIndex(i);
      //outboundEvent.file = this.carousel.getFile(cellIndex);
    } else {
      outboundEvent.cellIndex = cellIndex;
    }
  }

  handleTransitionendCellContainer(event) {
    this.carousel.handleTransitionend();
  }

  toggleVideo(video) {
    event.preventDefault();
    if (this.videoProperties.noPlay) {
      return;
    }

    if (video.paused) {
      video.play();
      this.isVideoPlaying = true;
    } else {
      video.pause();
      this.isVideoPlaying = false;
    }

    this.ref.detectChanges();
  }

  getCellWidth() {
    let elementWidth = this.elementRef.nativeElement.clientWidth;

    if (this.cellsToShow) {
      let margin = this.cellsToShow > 1 ? this.margin : 0;
      let totalMargin = margin * (this.cellsToShow - 1);
      return (elementWidth - totalMargin) / this.cellsToShow;
    }

    if (this._cellWidth === '100%') {
      return elementWidth;
    } else {
      return this._cellWidth;
    }
  }

  next() {
    this.carousel.next(this.cellsToScroll);
    this.carousel.stopAutoplay();
  }

  prev() {
    this.carousel.prev(this.cellsToScroll);
    this.carousel.stopAutoplay();
  }

  isNextArrowDisabled() {
    if (this.carousel) {
      return this.carousel.isNextArrowDisabled();
    }
  }

  isPrevArrowDisabled() {
    if (this.carousel) {
      return this.carousel.isPrevArrowDisabled();
    }
  }

  getCellLength() {
    if (this.images) {
      return this.images.length;
    } else {
      return this.cellsElement.children.length;
    }
  }
}
