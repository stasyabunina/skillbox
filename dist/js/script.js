"use strict";var burger=document.querySelector(".burger"),menu=document.querySelector(".header__nav"),menuLinks=menu.querySelectorAll(".nav__link"),closeNav=document.querySelector(".nav__close-btn");burger.addEventListener("click",(function(){menu.classList.toggle("header__nav--active"),document.body.classList.toggle("stop-scroll")})),menuLinks.forEach((function(e){e.addEventListener("click",(function(){menu.classList.remove("header__nav--active"),document.body.classList.remove("stop-scroll")}))})),closeNav.addEventListener("click",(function(){menu.classList.remove("header__nav--active"),document.body.classList.remove("stop-scroll")}));var obj={},prop=null==obj?void 0:obj.prop;
//# sourceMappingURL=script.js.map
