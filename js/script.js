"use strict";$(".burger").click((function(){$(".header__nav").toggleClass("header__nav--active"),$(document.body).toggleClass("stop-scroll")})),$(".nav__close-btn").click((function(){$(".header__nav").removeClass("header__nav--active"),$(document.body).removeClass("stop-scroll")})),$(".nav__link").each((function(e,o){$(this).click((function(){$(".header__nav").removeClass("header__nav--active"),$(document.body).removeClass("stop-scroll")}))}));var obj={},prop=null==obj?void 0:obj.prop;
//# sourceMappingURL=script.js.map
