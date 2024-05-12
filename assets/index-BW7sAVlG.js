var S=Object.defineProperty;var x=(a,e,t)=>e in a?S(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var o=(a,e,t)=>(x(a,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(s){if(s.ep)return;s.ep=!0;const l=t(s);fetch(s.href,l)}})();class A{constructor(){this.tabletResolution=1024,this.mobileResolution=640,this.extraMobileResolution=370}isTablet(){var e;try{return((e=window==null?void 0:window.matchMedia(`(max-width: ${this.tabletResolution}px)`))==null?void 0:e.matches)||!1}catch{return!1}}isMobile(){var e;try{return((e=window==null?void 0:window.matchMedia(`(max-width: ${this.mobileResolution}px)`))==null?void 0:e.matches)||!1}catch{return!1}}isExtra(){var e;try{return((e=window==null?void 0:window.matchMedia(`(max-width: ${this.extraMobileResolution}px)`))==null?void 0:e.matches)||!1}catch{return!1}}isCustom(e){var t;try{return((t=window==null?void 0:window.matchMedia(`(max-width: ${e}px)`))==null?void 0:t.matches)||!1}catch{return!1}}}const m=new A,b={tickerSlides:["Дело помощи утопающим — дело рук самих утопающих!","Шахматы двигают вперед не только культуру, но и экономику!","Лед тронулся, господа присяжные заседатели!"],tournamentTable:[{label:"Место проведения:",value:["Клуб &laquo;Картонажник&raquo;"]},{label:"Дата и&nbsp;время мероприятия:",value:["22&nbsp;июня 1927&nbsp;г.&nbsp;в&nbsp;18:00"]},{label:"Стоимость входных билетов:",value:["20&nbsp;коп."]},{label:"Плата за&nbsp;игру:",value:["50&nbsp;коп."]},{label:"Взнос на&nbsp;телеграммы:",value:["100&nbsp;руб.","21&nbsp;руб.&nbsp;16&nbsp;коп."]}],stages:[{value:"Строительство железнодорожной магистрали Москва-Васюки"},{value:"Открытие фешенебельной гостиницы &laquo;Проходная пешка&raquo; и&nbsp;других небоскрёбов",grouped:!0},{value:"Поднятие сельского хозяйства в&nbsp;радиусе на&nbsp;тысячу километров: производство овощей, фруктов, икры, шоколадных конфет",mod:"high"},{value:"Строительство дворца для&nbsp;турнира"},{value:"Размещение гаражей для&nbsp;гостевого автотранспорта",grouped:!0},{value:"Постройка сверхмощной радиостанции для передачи всему миру сенсационных результатов"},{value:"Создание аэропорта &laquo;Большие Васюки&raquo; с&nbsp;регулярным отправлением почтовых самолётов и&nbsp;дирижаблей во&nbsp;все концы света, включая Лос-Анжелос и&nbsp;Мельбурн",mod:"long"}],members:[{name:"Хозе-Рауль Капабланка",rank:"Чемпион мира по&nbsp;шахматам",url:"#",photo:""},{name:"Эммануил Ласкер",rank:"Чемпион мира по&nbsp;шахматам",url:"#",photo:""},{name:"Александр Алехин",rank:"Чемпион мира по&nbsp;шахматам",url:"#",photo:""},{name:"Арон Нимцович",rank:"Чемпион мира по&nbsp;шахматам",url:"#",photo:""},{name:"Рихард Рети",rank:"Чемпион мира по&nbsp;шахматам",url:"#",photo:""},{name:"Остап Бендер",rank:"Гроссмейстер",url:"#",photo:""}]};function d({tag:a,classes:e,text:t,html:i,attributes:s,callback:l,event:r}){const n=document.createElement(a);return Array.isArray(e)&&e.forEach(p=>{n.classList.add(p)}),typeof e=="string"&&(n.className=e),t&&(n.innerHTML=t),i&&(n.innerHTML=i),s&&Array.isArray(s)&&s.forEach(p=>{n.setAttribute(p.name,p.value)}),l&&n.addEventListener(r||"click",l),n}function P(a,e,t){if(a===e)return a;const i=l=>{const r=l.mod&&!a?["stages__item",`stages__item_${l.mod}`]:["stages__item"];return!a&&r.push("slider-slide"),d({tag:"li",classes:r,text:l.value})},s=document.querySelector(".stages__list");return s.innerHTML="",b.stages.forEach((l,r)=>{const n=i(l),p=!!t.find(v=>r===v),u=!p||!a?d({tag:"div",classes:"stages__item-overlay"}):null;let h=!p&&a?d({tag:"div",classes:["stages__items-group","slider-slide"]}):null;a?(h||(h=Array.from(s.querySelectorAll(".stages__items-group")).pop()),h.appendChild(n),u&&h.appendChild(u)):n.appendChild(u),s.appendChild(h||n)}),a}class C{constructor(e){o(this,"sliderElem",null);o(this,"params",null);o(this,"prewButton",null);o(this,"nextButton",null);o(this,"paginationWrapper",null);o(this,"wrapper",null);o(this,"slides",null);o(this,"bulits",null);o(this,"defaultSliderClassName","slider");o(this,"classNames",{default:{prewButton:`${this.defaultSliderClassName}-button__item_prew`,nextButton:`${this.defaultSliderClassName}-button__item_next`,paginationWrapper:`${this.defaultSliderClassName}-pagination`,wrapper:`${this.defaultSliderClassName}-wrapper`,slide:`${this.defaultSliderClassName}-slide`},paginationBulit:`${this.defaultSliderClassName}-pagination__bulit`});o(this,"modifiers",{active:"active"});o(this,"columnGap",null);o(this,"defaultParams",{loop:!1,autoplay:!1,pagination:"bulits",openingSlideIndex:0,slidesPerView:{desktop:1,tablet:1,mobile:1},transition:300});o(this,"autoplay",{timer:null,start:()=>{this.startAutoplay()},stop:()=>{this.stopAutoplay()},check:()=>{this.checkAutoplayParam()}});this.sliderElem=e,this.params=E[e.getAttribute(`${y}`)]||null,this.setDefaultParams(),this.checkCustomClassNames(),this.getElements(),this.createPagination(),this.manageActivityClass("add"),this.setButtonsAvailability(this.params.openingSlideIndex),this.addEvents(),this.autoplay.check()}getElements(){const e=t=>this.sliderElem.querySelector(`.${t}`);Object.keys(this.classNames.default).forEach(t=>{if(t==="slide"){this.slides=Array.from(this.sliderElem.querySelectorAll(`.${this.classNames.default.slide}`));return}this[t]=e(this.classNames.default[t])})}setButtonsAvailability(e=null){if(this.params.loop)return;const t=e||this.getActiveSlideIndex(),i=this.slides.length-1;this.prewButton.disabled=t===0,this.nextButton.disabled=i===t||t+this.getSlidesPerView()-1===i}createPagination(){const e=()=>{const i=this.getSlidesPerView();for(let s=1;s<=this.slides.length;s++)s%i===0&&this.paginationWrapper.appendChild(d({tag:"span",classes:this.classNames.paginationBulit}));this.bulits=this.paginationWrapper.querySelectorAll(`.${this.classNames.paginationBulit}`)},t=()=>{["","/",Math.ceil(this.slides.length/this.getSlidesPerView())].forEach(i=>{this.paginationWrapper.appendChild(d({tag:"span",text:i}))})};switch(this.paginationWrapper.innerHTML="",this.paginationWrapper.classList.contains(`${this.classNames.default.paginationWrapper}_${this.params.pagination}`)||this.paginationWrapper.classList.add(`${this.classNames.default.paginationWrapper}_${this.params.pagination}`),this.params.pagination){case"bulits":e();break;case"nums":t();break}}manageActivityClass(e,t=null){const i=(r,n,p)=>{n.classList[r](`${p}_${this.modifiers.active}`)},s=t||(e==="add"?this.params.openingSlideIndex:this.getActiveSlideIndex());(()=>{var n;const r=[{entity:this.slides[s],className:this.classNames.default.slide}];return((n=this.params)==null?void 0:n.pagination)==="bulits"&&r.push({entity:this.bulits[Math.floor(s/this.getSlidesPerView())],className:this.classNames.paginationBulit}),r})().forEach(r=>{var n;r.entity&&i(e,r.entity,r.className),((n=this.params)==null?void 0:n.pagination)==="nums"&&(this.paginationWrapper.querySelector("span").innerText=Math.floor(s/this.getSlidesPerView())+1)})}getActiveSlideIndex(){return this.slides.findIndex(e=>e.classList.contains(`${this.classNames.default.slide}_${this.modifiers.active}`))}getNewSlideIndex(e){if(this.params.loop){if(e==="next"&&this.getActiveSlideIndex()+this.getSlidesPerView()===this.slides.length)return 0;if(e==="prew"&&this.getActiveSlideIndex()-this.getSlidesPerView()<0)return this.slides.length-this.getSlidesPerView()}return e==="next"?this.getActiveSlideIndex()+this.getSlidesPerView():this.getActiveSlideIndex()-this.getSlidesPerView()}setDefaultParams(){if(!this.params){this.params=this.defaultParams;return}this.params.pagination!==!1&&!this.params.pagination&&(this.params.pagination=this.defaultParams.pagination),this.params.loop=this.params.loop||this.defaultParams.loop,this.params.openingSlideIndex=this.params.openingSlideIndex||this.defaultParams.openingSlideIndex,this.params.transition=this.params.transition||this.defaultParams.transition,this.params.slidesPerView=this.params.slidesPerView||{},this.params.slidesPerView.desktop=this.params.slidesPerView.desktop||1,this.params.slidesPerView.tablet=this.params.slidesPerView.tablet||1,this.params.slidesPerView.mobile=this.params.slidesPerView.mobile||1,this.params.autoplay&&Number.isInteger(this.params.autoplay)?this.params.loop=this.params.loop||!0:this.params.autoplay=!1}checkCustomClassNames(){Object.keys(this.classNames.default).forEach(e=>{this.params[e]&&(this.classNames.default[e]=this.params[e])})}addEvents(){this.nextClickHandler=e=>{this.autoplay.stop(),this.switchSlide("next",e),this.autoplay.check()},this.prewClickHandler=e=>{this.autoplay.stop(),this.switchSlide("prew",e),this.autoplay.check()},this.resizeHandler=()=>{this.getColumnGap(),this.wrapper.style.transform="translateX(0px)",this.manageActivityClass("remove"),this.slides=Array.from(this.sliderElem.querySelectorAll(`.${this.classNames.default.slide}`)),this.createPagination(),this.manageActivityClass("add"),this.setButtonsAvailability(0)},this.debouncedResizeHendler=this.resizeDebounce(this.resizeHandler,300),this.nextButton.addEventListener("click",this.nextClickHandler),this.prewButton.addEventListener("click",this.prewClickHandler)}switchSlide(e,t=null){t!=null&&t.target&&this.disableSliderButton(t),this.setTransition(),this.wrapper.style.transform=`translateX(${this.getTranslate(e)}px)`;const i=this.getNewSlideIndex(e);this.manageActivityClass("remove",this.getActiveSlideIndex()),this.manageActivityClass("add",i),this.setButtonsAvailability(i)}getColumnGap(){const e=window.getComputedStyle(this.wrapper).getPropertyValue("column-gap");let t=0;if(e&&e!=="normal"){const i=e.match(/\d+/);i&&i.length>0&&(t=parseInt(i[0],10))}return this.columnGap=t,t}getTranslate(e){var s;if(this.params.loop){if(e==="next"&&this.getActiveSlideIndex()+this.getSlidesPerView()===this.slides.length)return 0;if(e==="prew"&&this.getActiveSlideIndex()-this.getSlidesPerView()<0)return this.sliderElem.offsetWidth-this.wrapper.scrollWidth}const t=(this.slides[this.getActiveSlideIndex()].offsetWidth+(this.columnGap||this.getColumnGap()))*this.getSlidesPerView(),i=parseInt(((s=this.wrapper.style.transform.match(/translateX\(([-+]?\d+)px\)/))==null?void 0:s[1])||0,10);return e==="next"?i-t:i+t}setTransition(){this.wrapper.style.transition=`transform ${this.params.transition/1e3}s ease-in-out`,setTimeout(()=>{this.wrapper.style.transition=""},this.params.transition+5)}disableSliderButton({target:e}){e.style.pointerEvents="none",setTimeout(()=>{e.style.pointerEvents=""},this.params.transition+1)}resizeDebounce(e,t){return function(...s){let l=this.lastCall;this.lastCall=Date.now(),l&&this.lastCall-l<=t&&clearTimeout(this.lastCallTimer),this.lastCallTimer=setTimeout(()=>e(...s),t)}}getSlidesPerView(){return m.isMobile()?this.params.slidesPerView.mobile:m.isTablet()?this.params.slidesPerView.tablet:this.params.slidesPerView.desktop}startAutoplay(){this.autoplay.timer=setInterval(()=>{this.switchSlide("next")},this.params.autoplay)}stopAutoplay(){this.autoplay.timer&&clearInterval(this.autoplay.timer)}checkAutoplayParam(){this.params.autoplay&&this.startAutoplay()}destroy(){const e=()=>{this.prewButton.removeEventListener("click",this.prewClickHandler),this.prewClickHandler=null,this.nextButton.removeEventListener("click",this.nextClickHandler),this.nextClickHandler=null,window.removeEventListener("resize",this.resizeHandler),this.resizeHandler=null},t=()=>{this.prewButton.disabled=!1,this.nextButton.disabled=!1},i=()=>{this.paginationWrapper.innerHTML="",this.paginationWrapper.classList.remove(`${this.classNames.default.paginationWrapper}_bulits`)},s=()=>{Object.keys(this).forEach(l=>{const r=this[l];r!==null&&typeof r!="function"&&(this[l]=null)})};e(),t(),i(),s()}}const y="data-slider-name",E={stages:{wrapper:"stages__list"},members:{slidesPerView:{desktop:3,tablet:2,mobile:1},pagination:"nums",autoplay:4e3}};function N(){return Array.from(document.querySelectorAll(`[${y}]`)).map(a=>new C(a))}let f=null,c=null,g=null;const w=()=>{c||(c=b.stages.map((a,e)=>a.grouped?e:null).filter(a=>a!==null)),f=P(m.isMobile(),f,c)};document.addEventListener("DOMContentLoaded",()=>{w(),g=N(),window.addEventListener("resize",()=>{w(),g.forEach(a=>{a.debouncedResizeHendler()})})});
