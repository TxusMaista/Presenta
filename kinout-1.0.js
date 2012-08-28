(function() {
    window.KINOUT = {slides: 0,index: {horizontal: 0,vertical: 0},init: function(c) {
            if (c == null)
                c = {};
            this.Element.init(c);
            this.Events.init();
            this.Url.read()
        }}
}).call(this);
(function() {
    KINOUT.Constants = {MARKUP: {GLOW: '<div class="glow"></div>',COPYRIGHT: '<div class="copyright"><img style="border-radius:5px;" width="100px" src="assets/image/mu.jpg" /></div>',PROGRESS: {horizontal: "<div class='progress horizontal' value='0' max='100'><span></span></div>",vertical: "<div class='progress vertical' value='0' max='100'><span></span></div>"}},SELECTOR: {KINOUT: ".kinout",SLIDE: ".kinout>section",SUBSLIDE: ".kinout>section.present>article",STEP: "section.present > article.present [data-step]",STEP_TO_SHOW: ":not([data-run='success'])",
            STEP_TO_HIDE: "[data-run='success']",PROGRESS: {horizontal: ".progress.horizontal",vertical: ".progress.vertical"}},STYLE: {PAST: "past",PRESENT: "present",FUTURE: "future"}}
}).call(this);
(function() {
    KINOUT.Element = function(c) {
        var f, a, d, h, l;
        a = c.Constants.SELECTOR;
        f = c.Constants.MARKUP;
        d = {parent: void 0,slides: [],steps: [],progress: {horizontal: void 0,vertical: void 0}};
        h = function() {
            var e, j, k, i, g;
            e = false;
            g = $$(a.STEP + a.STEP_TO_SHOW);
            k = 0;
            for (i = g.length; k < i; k++) {
                j = g[k];
                j = $$(j);
                if (j.data("run") !== "success") {
                    j.data("run", "success");
                    e = true;
                    break
                }
            }
            return e
        };
        l = function() {
            var e, j, k, i;
            e = false;
            i = $$(a.STEP + a.STEP_TO_HIDE);
            for (j = i.length; j > 0; ) {
                k = $$(i[j - 1]);
                if (k.data("run") === "success") {
                    k.data("run",
                    "");
                    e = true;
                    break
                }
                j--
            }
            return e
        };
        return {init: function(e) {
                d.parent = $$(a.KINOUT);
                e.template && d.parent.addClass(e.template);
                return d.parent.prepend(f.GLOW).append(f.COPYRIGHT)
            },slides: function() {
                if (!(d.slides.length > 0))
                    d.slides = d.parent.children("section");
                return d.slides
            },subslides: function(e) {
                return $$(d.slides[e]).children("article")
            },steps: function(e) {
                return e ? h() : l()
            },progress: function(e, j) {
                if (e == null)
                    e = "horizontal";
                if (j == null)
                    j = 0;
                if (!d.progress[e]) {
                    d.parent.append(f.PROGRESS[e]);
                    d.progress[e] = d.parent.children(a.PROGRESS[e]).children("span")
                }
                d.progress[e].style(e ===
                "horizontal" ? "width" : "height", "" + j + "%")
            }}
    }(KINOUT)
}).call(this);
(function() {
    KINOUT.Events = function(c, f) {
        var a, d, h, l, e, j, k, i, g;
        d = {KEYDOWN: "keydown",CLICK: "click",TOUCH: "touchstart",HASHCHANGE: "hashchange",MOUSEWHEEL: "mousewheel"};
        a = {LEFT: "left",RIGHT: "right",UP: "up",DOWN: "down"};
        g = function() {
            if (f.isMobile())
                f(document).on(d.TOUCH, k, false);
            else {
                f(document).on(d.KEYDOWN, j, false);
                f(document).on(d.CLICK, e, false);
                f(document).on(d.MOUSEWHEEL, i, false)
            }
        };
        j = function(b) {
            if (b.keyCode >= 37 && b.keyCode <= 40) {
                h(b);
                b.preventDefault()
            }
        };
        k = function(b) {
            if (b.touches.length === 1) {
                b.preventDefault();
                b = {x: b.touches[0].clientX,y: b.touches[0].clientY};
                l(b)
            }
        };
        e = function(b) {
            b.preventDefault();
            l({x: b.clientX,y: b.clientY})
        };
        i = function() {
        };
        h = function(b) {
            console.log('func mueve b = '+b);
            console.log('func mueve b data= '+b.keyCode);
            switch (b.keyCode) {
                case 37:
                    console.log("entra");
                    c.Router.direction(a.LEFT);
                    nav('37');
                    break;
                case 39:
                    c.Router.direction(a.RIGHT);
                    nav('39');
                    break;
                case 38:
                    c.Router.direction(a.UP);
                    nav('38');
                    break;
                case 40:
                    c.Router.direction(a.DOWN);
                    nav('40');

            }
        };
        mueve = function(b) {
            console.log('func mueve b = '+b);
            console.log('func mueve b data= '+b.keyCode);
            switch (b.keyCode) {
                case 37:
                    c.Router.direction(a.LEFT);
                    console.log('entra');
                    break;
                case 39:
                    c.Router.direction(a.RIGHT);
                    break;
                case 38:
                    c.Router.direction(a.UP);
                    break;
                case 40:
                    c.Router.direction(a.DOWN);
            }
            // if(b.keyCode === 37){
            //         c.Router.direction(a.LEFT);
            //         console.log('func mueve LEFT');
            // }else if(b.keyCode === 39){
            //         c.Router.direction(a.RIGHT);
            //         console.log('func mueve LEFT');
            // }else if(b.keyCode === 38){
            //         c.Router.direction(a.UP);
            //         console.log('func mueve LEFT');
            // }else if(b.keyCode === 40){
            //         c.Router.direction(a.DOWN);
            //         console.log('func mueve LEFT');
            // }
        };
        l = function(b) {
            var m, n;
            n = window.innerWidth * 0.3;
            m = window.innerHeight * 0.3;
            if (b.x < n)
                c.Router.direction(a.LEFT);
            else if (b.x > window.innerWidth - n)
                c.Router.direction(a.RIGHT);
            else if (b.y <
            m)
                c.Router.direction(a.UP);
            else
                b.y > window.innerHeight - m && c.Router.direction(a.DOWN)
        };
        return {init: function() {
                g()
            },
            move: function(data) {
                var lol = new Object();
                console.log('func move data= '+data);
                lol.keyCode = parseInt(data);
                console.log('func move lol = '+lol);
                mueve(lol);
            }
        }
    }(KINOUT, Quo)
}).call(this);
(function() {
    KINOUT.Router = function(c) {
        var f, a, d, h, l;
        a = {};
        d = function() {
            a.horizontal--;
            c.View.slide(a.horizontal, 0, false)
        };
        h = function() {
            a.horizontal++;
            c.View.slide(a.horizontal, 0)
        };
        l = function() {
            a.vertical--;
            c.View.slide(a.horizontal, a.vertical, false)
        };
        f = function() {
            a.vertical++;
            c.View.slide(a.horizontal, a.vertical)
        };
        return {direction: function(e) {
                a = c.View.index();
                switch (e) {
                    case "left":
                        return d();
                    case "right":
                        return h();
                    case "up":
                        return l();
                    case "down":
                        return f()
                }
            }}
    }(KINOUT)
}).call(this);
(function() {
    KINOUT.Step = function() {
        return {show: function() {
                return this
            },hide: function() {
            }}
    }(KINOUT)
}).call(this);
(function() {
    KINOUT.Url = function(c) {
        return {read: function() {
                var f, a;
                f = window.location.hash.slice(2).split("/");
                a = f[0] ? parseInt(f[0]) : 0;
                f = f[1] ? parseInt(f[1]) : 0;
                c.View.slide(a, f)
            },write: function(f, a) {
                var d;
                d = "/";
                if (f > 0 || a > 0)
                    d += f;
                if (a > 0)
                    d += "/" + a;
                window.location.hash = d
            }}
    }(KINOUT)
}).call(this);
(function() {
    KINOUT.View = function(c) {
        var f, a, d, h, l, e, j, k;
        f = c.Constants.SELECTOR;
        a = c.Constants.STYLE;
        h = c.index;
        l = function(i, g) {
            h.horizontal = i === undefined ? h.horizontal : i;
            h.vertical = g === undefined ? h.vertical : g
        };
        j = function() {
            h.horizontal = k(f.SLIDE, h.horizontal);
            h.vertical = k(f.SUBSLIDE, h.vertical);
            e()
        };
        e = function() {
            var i, g, b;
            g = c.Element.slides();
            i = parseInt(h.horizontal * 100 / (g.length - 1));
            window.requestAnimationFrame(function() {
                return c.Element.progress("horizontal", i)
            });
            b = 0;
            g = c.Element.subslides(h.horizontal);
            if (g.length > 1)
                b = parseInt((h.vertical + 1) * 100 / g.length);
            return window.requestAnimationFrame(function() {
                return c.Element.progress("vertical", b)
            })
        };
        k = function(i, g) {
            var b;
            b = Array.prototype.slice.call(document.querySelectorAll(i));
            if (b.length) {
                g = Math.max(Math.min(g, b.length - 1), 0);
                d(b, g)
            } else
                g = 0;
            return g
        };
        d = function(i, g) {
            i[g].setAttribute("class", a.PRESENT);
            i.slice(0, g).map(function(b) {
                return b.setAttribute("class", a.PAST)
            });
            return i.slice(g + 1).map(function(b) {
                return b.setAttribute("class", a.FUTURE)
            })
        };
        return {slide: function(i, g, b) {
                if (b == null)
                    b = true;
                if (!c.Element.steps(b)) {
                    l(i, g);
                    j();
                    c.Url.write(h.horizontal, h.vertical)
                }
            },index: function() {
                return {horizontal: h.horizontal,vertical: h.vertical}
            },render: d}
    }(KINOUT, Quo)
}).call(this);
