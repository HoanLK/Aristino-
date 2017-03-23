function el(el) {
    return document.querySelectorAll(el);
}

function cl(el) {
    return document.getElementsByClassName(el);
}

// NAVIGATION DRAWER

function Drawer() {
    var drawers = cl('drawer');
    if (drawers.length > 0) {
        var drawerCover = document.createElement("div");
        drawerCover.className = 'drawer_cover';
        document.body.appendChild(drawerCover);
        cl('nav_main')[0].onclick = function () {
            drawers[0].classList.toggle('drawer_in');
            cl('drawer_cover')[0].style.display = 'block';
        };
        cl('drawer_cover')[0].onclick = function () {
            drawers[0].classList.toggle('drawer_in');
            cl('drawer_cover')[0].style.display = 'none';
        };
        var draweri = cl('drawer_item > a');
        for (var i = 0; i < draweri.length; i++) {
            draweri[i].classList.add('ripple_effect');
            draweri[i].addEventListener("click", function () {
                var drawerI = this;
                for (var i = 0; i < cl('drawer_item > a').length; i++) {
                    cl('drawer_item > a')[i].classList.remove('drawer_item > a > aActive')
                }
                drawerI.classList.add('drawer_item > aActive');
                setTimeout(function () {
                    drawerI.parentNode.classList.toggle('drawer_in');
                    cl('drawer_cover')[0].style.display = 'none';
                }, 800);
            });
        }
    }
}

Drawer();

//NAVIGAION

function Navigation() {
    var navIcons = el('.nav_icon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons[i].innerHTML = navIcons[i].getAttribute("data-icon");
    }

    var navDowns = el('.nav_down, .nav_downIfRoom');
    if (navDowns.length !== 0) {
        var navDrop = document.createElement('div');
        navDrop.className = "nav_drop";
        var navMore = document.createElement('li');
        navMore.className = "nav_icon nav_more";
        navMore.innerHTML = "more_vert";
        for (i = 0; i < navDowns.length; i++) {
            var j = navDowns.length - i - 1;
            var navDown = navDowns[j].cloneNode(true);
            navDown.innerHTML = navDowns[j].getAttribute("data-nav");
            if (navDowns[j].classList.contains('nav_downIfRoom') === true) {
                navDown.classList.add('nav_down');
                navDowns[j].className = 'nav_icon nav_downIfRoomU';
            } else {
                navDowns[j].remove();
            }
            navDown.classList.add('ripple_effect');
            navDown.addEventListener("click", function () {
                setTimeout(function () {
                    navDown.parentNode.classList.remove('nav_dropDown');
                }, 800)
            })
            navDrop.appendChild(navDown);
        }
        navDrop.onmouseleave = function () {
            this.classList.remove('nav_dropDown');
        };
        navMore.onclick = function () {
            navDrop.classList.add('nav_dropDown');
        };
        el('.nav')[0].appendChild(navDrop);
        el('.nav')[0].insertBefore(navMore, el('.nav')[0].childNodes[0]);
    }
}

Navigation();

window.onresize = document.body.onload = function () {
    var navIconsL = Number(el('.nav_icon:not(.nav_down)').length) * 40 + Number(el('.nav_title')[0].offsetWidth) + 15;
    var navDownIfRoomsU = el('.nav_downIfRoomU');
    if (navIconsL > document.body.offsetWidth - 100) {
        for (var i = 0; i < navDownIfRoomsU.length; i++) {
            navDownIfRoomsU[i].style.display = 'none';
            el('.nav_downIfRoom')[i].style.display = 'block';
        }
    } else {
        for (i = 0; i < navDownIfRoomsU.length; i++) {
            navDownIfRoomsU[i].style.display = 'inline-block';
            el('.nav_downIfRoom')[i].style.display = 'none';
        }
    }
    if (el('.nav_drop > :not([style*="display: none"])').length == 0) {
        el('.nav_more')[0].style.display = 'none';
    } else {
        el('.nav_more')[0].style.display = 'block';
    }
};

// EXTRAS

var ripple_effect = document.getElementsByClassName("ripple_effect");
for (var i = 0; i < ripple_effect.length; i++) {
    ripple_effect[i].innerHTML = '<div class="ripple_effector"></div><span class="ripple_effectHolder">' + ripple_effect[i].innerHTML + '</span>';
    ripple_effect[i].onclick = function (e) {
        var ripple = e.currentTarget.getElementsByClassName('ripple_effector')[0];
        ripple.style.top = (e.clientY - ripple.parentNode.getBoundingClientRect().top + document.documentElement.scrollTop) + 'px';
        ripple.style.left = (e.clientX - ripple.parentNode.getBoundingClientRect().left + document.documentElement.scrollLeft) + 'px';
        ripple.classList.add('ripple_effectOut');
        setTimeout(function () {
            ripple.classList.remove('ripple_effectOut');
            ripple.style.opacity = "0.5"
        }, 1000)
    }
}
var ripple_effector = document.getElementsByClassName("ripple_effector");
for (var i = 0; i < ripple_effector.length; i++) {
    ripple_effector[i].style.background = ripple_effector[i].parentNode.getAttribute('data-ripple-effect')
}