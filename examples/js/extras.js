!(function (t, e) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var i = e();
        for (var o in i) ("object" == typeof exports ? exports : t)[o] = i[o];
    }
})(self, () =>
    (() => {
        var t = {
                708: (t) => {
                    t.exports = Object.assign(function () {}, {
                        FACE_1: 0,
                        FACE_2: 1,
                        FACE_3: 2,
                        FACE_4: 3,
                        L_SHOULDER_1: 4,
                        R_SHOULDER_1: 5,
                        L_SHOULDER_2: 6,
                        R_SHOULDER_2: 7,
                        SELECT: 8,
                        START: 9,
                        DPAD_UP: 12,
                        DPAD_DOWN: 13,
                        DPAD_LEFT: 14,
                        DPAD_RIGHT: 15,
                        VENDOR: 16,
                    });
                },
                816: (t) => {
                    t.exports = function (t, e, i) {
                        (this.type = t), (this.index = e), (this.pressed = i.pressed), (this.value = i.value);
                    };
                },
                226: () => {
                    !(function (t) {
                        var e = "KeyboardEvent" in t;
                        e ||
                            (t.KeyboardEvent = function () {
                                throw TypeError("Illegal constructor");
                            }),
                            "DOM_KEY_LOCATION_STANDARD" in t.KeyboardEvent || (t.KeyboardEvent.DOM_KEY_LOCATION_STANDARD = 0),
                            "DOM_KEY_LOCATION_LEFT" in t.KeyboardEvent || (t.KeyboardEvent.DOM_KEY_LOCATION_LEFT = 1),
                            "DOM_KEY_LOCATION_RIGHT" in t.KeyboardEvent || (t.KeyboardEvent.DOM_KEY_LOCATION_RIGHT = 2),
                            "DOM_KEY_LOCATION_NUMPAD" in t.KeyboardEvent || (t.KeyboardEvent.DOM_KEY_LOCATION_NUMPAD = 3);
                        var i = window.KeyboardEvent.DOM_KEY_LOCATION_STANDARD,
                            o = window.KeyboardEvent.DOM_KEY_LOCATION_LEFT,
                            n = window.KeyboardEvent.DOM_KEY_LOCATION_RIGHT,
                            s = window.KeyboardEvent.DOM_KEY_LOCATION_NUMPAD;
                        function r(t, e) {
                            return -1 !== String(t).indexOf(e);
                        }
                        var a = r(navigator.platform, "Win")
                                ? "win"
                                : r(navigator.platform, "Mac")
                                ? "mac"
                                : r(navigator.platform, "CrOS")
                                ? "cros"
                                : r(navigator.platform, "Linux")
                                ? "linux"
                                : r(navigator.userAgent, "iPad") || r(navigator.platform, "iPod") || r(navigator.platform, "iPhone")
                                ? "ios"
                                : "",
                            c = r(navigator.userAgent, "Chrome/")
                                ? "chrome"
                                : r(navigator.vendor, "Apple")
                                ? "safari"
                                : r(navigator.userAgent, "MSIE")
                                ? "ie"
                                : r(navigator.userAgent, "Gecko/")
                                ? "moz"
                                : r(navigator.userAgent, "Opera/")
                                ? "opera"
                                : "",
                            d = c + "-" + a;
                        function h(t, e, i) {
                            (d !== e && c !== e && a !== e) ||
                                Object.keys(i).forEach(function (e) {
                                    t[e] = i[e];
                                });
                        }
                        var l = {
                            3: { code: "Cancel" },
                            6: { code: "Help" },
                            8: { code: "Backspace" },
                            9: { code: "Tab" },
                            12: { code: "Clear" },
                            13: { code: "Enter" },
                            16: { code: "Shift" },
                            17: { code: "Control" },
                            18: { code: "Alt" },
                            19: { code: "Pause" },
                            20: { code: "CapsLock" },
                            21: { code: "KanaMode" },
                            22: { code: "HangulMode" },
                            23: { code: "JunjaMode" },
                            24: { code: "FinalMode" },
                            25: { code: "KanjiMode" },
                            27: { code: "Escape" },
                            28: { code: "Convert" },
                            29: { code: "NonConvert" },
                            30: { code: "Accept" },
                            31: { code: "ModeChange" },
                            32: { code: "Space" },
                            33: { code: "PageUp" },
                            34: { code: "PageDown" },
                            35: { code: "End" },
                            36: { code: "Home" },
                            37: { code: "ArrowLeft" },
                            38: { code: "ArrowUp" },
                            39: { code: "ArrowRight" },
                            40: { code: "ArrowDown" },
                            41: { code: "Select" },
                            42: { code: "Print" },
                            43: { code: "Execute" },
                            44: { code: "PrintScreen" },
                            45: { code: "Insert" },
                            46: { code: "Delete" },
                            47: { code: "Help" },
                            48: { code: "Digit0", keyCap: "0" },
                            49: { code: "Digit1", keyCap: "1" },
                            50: { code: "Digit2", keyCap: "2" },
                            51: { code: "Digit3", keyCap: "3" },
                            52: { code: "Digit4", keyCap: "4" },
                            53: { code: "Digit5", keyCap: "5" },
                            54: { code: "Digit6", keyCap: "6" },
                            55: { code: "Digit7", keyCap: "7" },
                            56: { code: "Digit8", keyCap: "8" },
                            57: { code: "Digit9", keyCap: "9" },
                            65: { code: "KeyA", keyCap: "a" },
                            66: { code: "KeyB", keyCap: "b" },
                            67: { code: "KeyC", keyCap: "c" },
                            68: { code: "KeyD", keyCap: "d" },
                            69: { code: "KeyE", keyCap: "e" },
                            70: { code: "KeyF", keyCap: "f" },
                            71: { code: "KeyG", keyCap: "g" },
                            72: { code: "KeyH", keyCap: "h" },
                            73: { code: "KeyI", keyCap: "i" },
                            74: { code: "KeyJ", keyCap: "j" },
                            75: { code: "KeyK", keyCap: "k" },
                            76: { code: "KeyL", keyCap: "l" },
                            77: { code: "KeyM", keyCap: "m" },
                            78: { code: "KeyN", keyCap: "n" },
                            79: { code: "KeyO", keyCap: "o" },
                            80: { code: "KeyP", keyCap: "p" },
                            81: { code: "KeyQ", keyCap: "q" },
                            82: { code: "KeyR", keyCap: "r" },
                            83: { code: "KeyS", keyCap: "s" },
                            84: { code: "KeyT", keyCap: "t" },
                            85: { code: "KeyU", keyCap: "u" },
                            86: { code: "KeyV", keyCap: "v" },
                            87: { code: "KeyW", keyCap: "w" },
                            88: { code: "KeyX", keyCap: "x" },
                            89: { code: "KeyY", keyCap: "y" },
                            90: { code: "KeyZ", keyCap: "z" },
                            91: { code: "OSLeft", location: o },
                            92: { code: "OSRight", location: n },
                            93: { code: "ContextMenu" },
                            95: { code: "Standby" },
                            96: { code: "Numpad0", keyCap: "0", location: s },
                            97: { code: "Numpad1", keyCap: "1", location: s },
                            98: { code: "Numpad2", keyCap: "2", location: s },
                            99: { code: "Numpad3", keyCap: "3", location: s },
                            100: { code: "Numpad4", keyCap: "4", location: s },
                            101: { code: "Numpad5", keyCap: "5", location: s },
                            102: { code: "Numpad6", keyCap: "6", location: s },
                            103: { code: "Numpad7", keyCap: "7", location: s },
                            104: { code: "Numpad8", keyCap: "8", location: s },
                            105: { code: "Numpad9", keyCap: "9", location: s },
                            106: { code: "NumpadMultiply", keyCap: "*", location: s },
                            107: { code: "NumpadAdd", keyCap: "+", location: s },
                            108: { code: "NumpadComma", keyCap: ",", location: s },
                            109: { code: "NumpadSubtract", keyCap: "-", location: s },
                            110: { code: "NumpadDecimal", keyCap: ".", location: s },
                            111: { code: "NumpadDivide", keyCap: "/", location: s },
                            112: { code: "F1" },
                            113: { code: "F2" },
                            114: { code: "F3" },
                            115: { code: "F4" },
                            116: { code: "F5" },
                            117: { code: "F6" },
                            118: { code: "F7" },
                            119: { code: "F8" },
                            120: { code: "F9" },
                            121: { code: "F10" },
                            122: { code: "F11" },
                            123: { code: "F12" },
                            124: { code: "F13" },
                            125: { code: "F14" },
                            126: { code: "F15" },
                            127: { code: "F16" },
                            128: { code: "F17" },
                            129: { code: "F18" },
                            130: { code: "F19" },
                            131: { code: "F20" },
                            132: { code: "F21" },
                            133: { code: "F22" },
                            134: { code: "F23" },
                            135: { code: "F24" },
                            144: { code: "NumLock", location: s },
                            145: { code: "ScrollLock" },
                            160: { code: "ShiftLeft", location: o },
                            161: { code: "ShiftRight", location: n },
                            162: { code: "ControlLeft", location: o },
                            163: { code: "ControlRight", location: n },
                            164: { code: "AltLeft", location: o },
                            165: { code: "AltRight", location: n },
                            166: { code: "BrowserBack" },
                            167: { code: "BrowserForward" },
                            168: { code: "BrowserRefresh" },
                            169: { code: "BrowserStop" },
                            170: { code: "BrowserSearch" },
                            171: { code: "BrowserFavorites" },
                            172: { code: "BrowserHome" },
                            173: { code: "VolumeMute" },
                            174: { code: "VolumeDown" },
                            175: { code: "VolumeUp" },
                            176: { code: "MediaTrackNext" },
                            177: { code: "MediaTrackPrevious" },
                            178: { code: "MediaStop" },
                            179: { code: "MediaPlayPause" },
                            180: { code: "LaunchMail" },
                            181: { code: "MediaSelect" },
                            182: { code: "LaunchApp1" },
                            183: { code: "LaunchApp2" },
                            186: { code: "Semicolon", keyCap: ";" },
                            187: { code: "Equal", keyCap: "=" },
                            188: { code: "Comma", keyCap: "," },
                            189: { code: "Minus", keyCap: "-" },
                            190: { code: "Period", keyCap: "." },
                            191: { code: "Slash", keyCap: "/" },
                            192: { code: "Backquote", keyCap: "`" },
                            219: { code: "BracketLeft", keyCap: "[" },
                            220: { code: "Backslash", keyCap: "\\" },
                            221: { code: "BracketRight", keyCap: "]" },
                            222: { code: "Quote", keyCap: "'" },
                            226: { code: "IntlBackslash", keyCap: "\\" },
                            229: { code: "Process" },
                            246: { code: "Attn" },
                            247: { code: "CrSel" },
                            248: { code: "ExSel" },
                            249: { code: "EraseEof" },
                            250: { code: "Play" },
                            251: { code: "ZoomToggle" },
                            254: { code: "Clear" },
                        };
                        h(l, "moz", {
                            59: { code: "Semicolon", keyCap: ";" },
                            61: { code: "Equal", keyCap: "=" },
                            107: { code: "Equal", keyCap: "=" },
                            109: { code: "Minus", keyCap: "-" },
                            187: { code: "NumpadAdd", keyCap: "+", location: s },
                            189: { code: "NumpadSubtract", keyCap: "-", location: s },
                        }),
                            h(l, "moz-mac", { 12: { code: "NumLock", location: s }, 173: { code: "Minus", keyCap: "-" } }),
                            h(l, "moz-win", { 173: { code: "Minus", keyCap: "-" } }),
                            h(l, "chrome-mac", { 93: { code: "OSRight", location: n } }),
                            h(l, "safari", { 3: { code: "Enter" }, 25: { code: "Tab" } }),
                            h(l, "ios", { 10: { code: "Enter", location: i } }),
                            h(l, "safari-mac", { 91: { code: "OSLeft", location: o }, 93: { code: "OSRight", location: n }, 229: { code: "KeyQ", keyCap: "Q" } });
                        var p = {};
                        "cros" === a &&
                            ((p["U+00A0"] = { code: "ShiftLeft", location: o }),
                            (p["U+00A1"] = { code: "ShiftRight", location: n }),
                            (p["U+00A2"] = { code: "ControlLeft", location: o }),
                            (p["U+00A3"] = { code: "ControlRight", location: n }),
                            (p["U+00A4"] = { code: "AltLeft", location: o }),
                            (p["U+00A5"] = { code: "AltRight", location: n })),
                            "chrome-mac" === d && (p["U+0010"] = { code: "ContextMenu" }),
                            "safari-mac" === d && (p["U+0010"] = { code: "ContextMenu" }),
                            "ios" === a &&
                                ((p["U+0010"] = { code: "Function" }),
                                (p["U+001C"] = { code: "ArrowLeft" }),
                                (p["U+001D"] = { code: "ArrowRight" }),
                                (p["U+001E"] = { code: "ArrowUp" }),
                                (p["U+001F"] = { code: "ArrowDown" }),
                                (p["U+0001"] = { code: "Home" }),
                                (p["U+0004"] = { code: "End" }),
                                (p["U+000B"] = { code: "PageUp" }),
                                (p["U+000C"] = { code: "PageDown" }));
                        var u = [];
                        (u[o] = { 16: { code: "ShiftLeft", location: o }, 17: { code: "ControlLeft", location: o }, 18: { code: "AltLeft", location: o } }),
                            (u[n] = { 16: { code: "ShiftRight", location: n }, 17: { code: "ControlRight", location: n }, 18: { code: "AltRight", location: n } }),
                            (u[s] = { 13: { code: "NumpadEnter", location: s } }),
                            h(u[s], "moz", { 109: { code: "NumpadSubtract", location: s }, 107: { code: "NumpadAdd", location: s } }),
                            h(u[o], "moz-mac", { 224: { code: "OSLeft", location: o } }),
                            h(u[n], "moz-mac", { 224: { code: "OSRight", location: n } }),
                            h(u[n], "moz-win", { 91: { code: "OSRight", location: n } }),
                            h(u[n], "mac", { 93: { code: "OSRight", location: n } }),
                            h(u[s], "chrome-mac", { 12: { code: "NumLock", location: s } }),
                            h(u[s], "safari-mac", {
                                12: { code: "NumLock", location: s },
                                187: { code: "NumpadAdd", location: s },
                                189: { code: "NumpadSubtract", location: s },
                                190: { code: "NumpadDecimal", location: s },
                                191: { code: "NumpadDivide", location: s },
                            });
                        var y = {
                            ShiftLeft: { key: "Shift" },
                            ShiftRight: { key: "Shift" },
                            ControlLeft: { key: "Control" },
                            ControlRight: { key: "Control" },
                            AltLeft: { key: "Alt" },
                            AltRight: { key: "Alt" },
                            OSLeft: { key: "OS" },
                            OSRight: { key: "OS" },
                            NumpadEnter: { key: "Enter" },
                            Space: { key: " " },
                            Digit0: { key: "0", shiftKey: ")" },
                            Digit1: { key: "1", shiftKey: "!" },
                            Digit2: { key: "2", shiftKey: "@" },
                            Digit3: { key: "3", shiftKey: "#" },
                            Digit4: { key: "4", shiftKey: "$" },
                            Digit5: { key: "5", shiftKey: "%" },
                            Digit6: { key: "6", shiftKey: "^" },
                            Digit7: { key: "7", shiftKey: "&" },
                            Digit8: { key: "8", shiftKey: "*" },
                            Digit9: { key: "9", shiftKey: "(" },
                            KeyA: { key: "a", shiftKey: "A" },
                            KeyB: { key: "b", shiftKey: "B" },
                            KeyC: { key: "c", shiftKey: "C" },
                            KeyD: { key: "d", shiftKey: "D" },
                            KeyE: { key: "e", shiftKey: "E" },
                            KeyF: { key: "f", shiftKey: "F" },
                            KeyG: { key: "g", shiftKey: "G" },
                            KeyH: { key: "h", shiftKey: "H" },
                            KeyI: { key: "i", shiftKey: "I" },
                            KeyJ: { key: "j", shiftKey: "J" },
                            KeyK: { key: "k", shiftKey: "K" },
                            KeyL: { key: "l", shiftKey: "L" },
                            KeyM: { key: "m", shiftKey: "M" },
                            KeyN: { key: "n", shiftKey: "N" },
                            KeyO: { key: "o", shiftKey: "O" },
                            KeyP: { key: "p", shiftKey: "P" },
                            KeyQ: { key: "q", shiftKey: "Q" },
                            KeyR: { key: "r", shiftKey: "R" },
                            KeyS: { key: "s", shiftKey: "S" },
                            KeyT: { key: "t", shiftKey: "T" },
                            KeyU: { key: "u", shiftKey: "U" },
                            KeyV: { key: "v", shiftKey: "V" },
                            KeyW: { key: "w", shiftKey: "W" },
                            KeyX: { key: "x", shiftKey: "X" },
                            KeyY: { key: "y", shiftKey: "Y" },
                            KeyZ: { key: "z", shiftKey: "Z" },
                            Numpad0: { key: "0" },
                            Numpad1: { key: "1" },
                            Numpad2: { key: "2" },
                            Numpad3: { key: "3" },
                            Numpad4: { key: "4" },
                            Numpad5: { key: "5" },
                            Numpad6: { key: "6" },
                            Numpad7: { key: "7" },
                            Numpad8: { key: "8" },
                            Numpad9: { key: "9" },
                            NumpadMultiply: { key: "*" },
                            NumpadAdd: { key: "+" },
                            NumpadComma: { key: "," },
                            NumpadSubtract: { key: "-" },
                            NumpadDecimal: { key: "." },
                            NumpadDivide: { key: "/" },
                            Semicolon: { key: ";", shiftKey: ":" },
                            Equal: { key: "=", shiftKey: "+" },
                            Comma: { key: ",", shiftKey: "<" },
                            Minus: { key: "-", shiftKey: "_" },
                            Period: { key: ".", shiftKey: ">" },
                            Slash: { key: "/", shiftKey: "?" },
                            Backquote: { key: "`", shiftKey: "~" },
                            BracketLeft: { key: "[", shiftKey: "{" },
                            Backslash: { key: "\\", shiftKey: "|" },
                            BracketRight: { key: "]", shiftKey: "}" },
                            Quote: { key: "'", shiftKey: '"' },
                            IntlBackslash: { key: "\\", shiftKey: "|" },
                        };
                        h(y, "mac", { OSLeft: { key: "Meta" }, OSRight: { key: "Meta" } });
                        var f,
                            m,
                            v,
                            g = {
                                Esc: "Escape",
                                Nonconvert: "NonConvert",
                                Left: "ArrowLeft",
                                Up: "ArrowUp",
                                Right: "ArrowRight",
                                Down: "ArrowDown",
                                Del: "Delete",
                                Menu: "ContextMenu",
                                MediaNextTrack: "MediaTrackNext",
                                MediaPreviousTrack: "MediaTrackPrevious",
                                SelectMedia: "MediaSelect",
                                HalfWidth: "Hankaku",
                                FullWidth: "Zenkaku",
                                RomanCharacters: "Romaji",
                                Crsel: "CrSel",
                                Exsel: "ExSel",
                                Zoom: "ZoomToggle",
                            },
                            k =
                                ((f = l),
                                (m = "code"),
                                (v = {}),
                                Object.keys(f).forEach(function (t) {
                                    var e = f[t];
                                    m in e && (v[e[m]] = e);
                                }),
                                v);
                        try {
                            var b = e && "location" in new KeyboardEvent("");
                        } catch (t) {}
                        function E(t) {
                            var e = "keyCode" in t ? t.keyCode : "which" in t ? t.which : 0,
                                i = (function () {
                                    if (b || "keyLocation" in t) {
                                        var i = b ? t.location : t.keyLocation;
                                        if (i && e in u[i]) return u[i][e];
                                    }
                                    return "keyIdentifier" in t && t.keyIdentifier in p ? p[t.keyIdentifier] : e in l ? l[e] : null;
                                })();
                            if (!i) return null;
                            var o,
                                n = (o = y[i.code]) ? (t.shiftKey && "shiftKey" in o ? o.shiftKey : o.key) : i.code;
                            return { code: i.code, key: n, location: i.location, keyCap: i.keyCap };
                        }
                        "KeyboardEvent" in t &&
                            "defineProperty" in Object &&
                            (function () {
                                function t(t, e, i) {
                                    e in t || Object.defineProperty(t, e, i);
                                }
                                if (
                                    (t(KeyboardEvent.prototype, "code", {
                                        get: function () {
                                            var t = E(this);
                                            return t ? t.code : "";
                                        },
                                    }),
                                    "key" in KeyboardEvent.prototype)
                                ) {
                                    var e = Object.getOwnPropertyDescriptor(KeyboardEvent.prototype, "key");
                                    Object.defineProperty(KeyboardEvent.prototype, "key", {
                                        get: function () {
                                            var t = e.get.call(this);
                                            return g.hasOwnProperty(t) ? g[t] : t;
                                        },
                                    });
                                }
                                t(KeyboardEvent.prototype, "key", {
                                    get: function () {
                                        var t = E(this);
                                        return t && "key" in t ? t.key : "Unidentified";
                                    },
                                }),
                                    t(KeyboardEvent.prototype, "location", {
                                        get: function () {
                                            var t = E(this);
                                            return t && "location" in t ? t.location : i;
                                        },
                                    }),
                                    t(KeyboardEvent.prototype, "locale", {
                                        get: function () {
                                            return "";
                                        },
                                    });
                            })(),
                            "queryKeyCap" in t.KeyboardEvent ||
                                (t.KeyboardEvent.queryKeyCap = function (t, e) {
                                    if (((t = String(t)), !k.hasOwnProperty(t))) return "Undefined";
                                    if (e && "en-us" !== String(e).toLowerCase()) throw Error("Unsupported locale");
                                    var i = k[t];
                                    return i.keyCap || i.code || "Undefined";
                                }),
                            (t.identifyKey = function (t) {
                                if (!("code" in t)) {
                                    var e = E(t);
                                    (t.code = e ? e.code : ""),
                                        (t.key = e && "key" in e ? e.key : "Unidentified"),
                                        (t.location = "location" in t ? t.location : "keyLocation" in t ? t.keyLocation : e && "location" in e ? e.location : i),
                                        (t.locale = "");
                                }
                            });
                    })(window);
                },
                694: (t) => {
                    window,
                        (t.exports = (function (t) {
                            var e = {};
                            function i(o) {
                                if (e[o]) return e[o].exports;
                                var n = (e[o] = { i: o, l: !1, exports: {} });
                                return t[o].call(n.exports, n, n.exports, i), (n.l = !0), n.exports;
                            }
                            return (
                                (i.m = t),
                                (i.c = e),
                                (i.d = function (t, e, o) {
                                    i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: o });
                                }),
                                (i.r = function (t) {
                                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
                                }),
                                (i.t = function (t, e) {
                                    if ((1 & e && (t = i(t)), 8 & e)) return t;
                                    if (4 & e && "object" == typeof t && t && t.__esModule) return t;
                                    var o = Object.create(null);
                                    if ((i.r(o), Object.defineProperty(o, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t))
                                        for (var n in t)
                                            i.d(
                                                o,
                                                n,
                                                function (e) {
                                                    return t[e];
                                                }.bind(null, n)
                                            );
                                    return o;
                                }),
                                (i.n = function (t) {
                                    var e =
                                        t && t.__esModule
                                            ? function () {
                                                  return t.default;
                                              }
                                            : function () {
                                                  return t;
                                              };
                                    return i.d(e, "a", e), e;
                                }),
                                (i.o = function (t, e) {
                                    return Object.prototype.hasOwnProperty.call(t, e);
                                }),
                                (i.p = ""),
                                i((i.s = 0))
                            );
                        })([
                            function (t, e, i) {
                                "use strict";
                                i.r(e);
                                var o,
                                    n = function (t, e) {
                                        var i = e.x - t.x,
                                            o = e.y - t.y;
                                        return Math.sqrt(i * i + o * o);
                                    },
                                    s = function (t) {
                                        return t * (Math.PI / 180);
                                    },
                                    r = new Map(),
                                    a = function (t) {
                                        r.has(t) && clearTimeout(r.get(t)), r.set(t, setTimeout(t, 100));
                                    },
                                    c = function (t, e, i) {
                                        for (var o, n = e.split(/[ ,]+/g), s = 0; s < n.length; s += 1) (o = n[s]), t.addEventListener ? t.addEventListener(o, i, !1) : t.attachEvent && t.attachEvent(o, i);
                                    },
                                    d = function (t, e, i) {
                                        for (var o, n = e.split(/[ ,]+/g), s = 0; s < n.length; s += 1) (o = n[s]), t.removeEventListener ? t.removeEventListener(o, i) : t.detachEvent && t.detachEvent(o, i);
                                    },
                                    h = function (t) {
                                        return t.preventDefault(), t.type.match(/^touch/) ? t.changedTouches : t;
                                    },
                                    l = function () {
                                        return {
                                            x: void 0 !== window.pageXOffset ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft,
                                            y: void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop,
                                        };
                                    },
                                    p = function (t, e) {
                                        e.top || e.right || e.bottom || e.left
                                            ? ((t.style.top = e.top), (t.style.right = e.right), (t.style.bottom = e.bottom), (t.style.left = e.left))
                                            : ((t.style.left = e.x + "px"), (t.style.top = e.y + "px"));
                                    },
                                    u = function (t, e, i) {
                                        var o = y(t);
                                        for (var n in o)
                                            if (o.hasOwnProperty(n))
                                                if ("string" == typeof e) o[n] = e + " " + i;
                                                else {
                                                    for (var s = "", r = 0, a = e.length; r < a; r += 1) s += e[r] + " " + i + ", ";
                                                    o[n] = s.slice(0, -2);
                                                }
                                        return o;
                                    },
                                    y = function (t) {
                                        var e = {};
                                        return (
                                            (e[t] = ""),
                                            ["webkit", "Moz", "o"].forEach(function (i) {
                                                e[i + t.charAt(0).toUpperCase() + t.slice(1)] = "";
                                            }),
                                            e
                                        );
                                    },
                                    f = function (t, e) {
                                        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
                                        return t;
                                    },
                                    m = function (t, e) {
                                        if (t.length) for (var i = 0, o = t.length; i < o; i += 1) e(t[i]);
                                        else e(t);
                                    },
                                    v = !!("ontouchstart" in window),
                                    g = !!window.PointerEvent,
                                    k = !!window.MSPointerEvent,
                                    b = { start: "mousedown", move: "mousemove", end: "mouseup" },
                                    E = {};
                                function x() {}
                                g
                                    ? (o = { start: "pointerdown", move: "pointermove", end: "pointerup, pointercancel" })
                                    : k
                                    ? (o = { start: "MSPointerDown", move: "MSPointerMove", end: "MSPointerUp" })
                                    : v
                                    ? ((o = { start: "touchstart", move: "touchmove", end: "touchend, touchcancel" }), (E = b))
                                    : (o = b),
                                    (x.prototype.on = function (t, e) {
                                        var i,
                                            o = t.split(/[ ,]+/g);
                                        this._handlers_ = this._handlers_ || {};
                                        for (var n = 0; n < o.length; n += 1) (i = o[n]), (this._handlers_[i] = this._handlers_[i] || []), this._handlers_[i].push(e);
                                        return this;
                                    }),
                                    (x.prototype.off = function (t, e) {
                                        return (
                                            (this._handlers_ = this._handlers_ || {}),
                                            void 0 === t
                                                ? (this._handlers_ = {})
                                                : void 0 === e
                                                ? (this._handlers_[t] = null)
                                                : this._handlers_[t] && this._handlers_[t].indexOf(e) >= 0 && this._handlers_[t].splice(this._handlers_[t].indexOf(e), 1),
                                            this
                                        );
                                    }),
                                    (x.prototype.trigger = function (t, e) {
                                        var i,
                                            o = this,
                                            n = t.split(/[ ,]+/g);
                                        o._handlers_ = o._handlers_ || {};
                                        for (var s = 0; s < n.length; s += 1)
                                            (i = n[s]),
                                                o._handlers_[i] &&
                                                    o._handlers_[i].length &&
                                                    o._handlers_[i].forEach(function (t) {
                                                        t.call(o, { type: i, target: o }, e);
                                                    });
                                    }),
                                    (x.prototype.config = function (t) {
                                        (this.options = this.defaults || {}),
                                            t &&
                                                (this.options = (function (t, e) {
                                                    var i = {};
                                                    for (var o in t) t.hasOwnProperty(o) && e.hasOwnProperty(o) ? (i[o] = e[o]) : t.hasOwnProperty(o) && (i[o] = t[o]);
                                                    return i;
                                                })(this.options, t));
                                    }),
                                    (x.prototype.bindEvt = function (t, e) {
                                        var i = this;
                                        return (
                                            (i._domHandlers_ = i._domHandlers_ || {}),
                                            (i._domHandlers_[e] = function () {
                                                "function" == typeof i["on" + e] ? i["on" + e].apply(i, arguments) : console.warn('[WARNING] : Missing "on' + e + '" handler.');
                                            }),
                                            c(t, o[e], i._domHandlers_[e]),
                                            E[e] && c(t, E[e], i._domHandlers_[e]),
                                            i
                                        );
                                    }),
                                    (x.prototype.unbindEvt = function (t, e) {
                                        return (this._domHandlers_ = this._domHandlers_ || {}), d(t, o[e], this._domHandlers_[e]), E[e] && d(t, E[e], this._domHandlers_[e]), delete this._domHandlers_[e], this;
                                    });
                                var w = x;
                                function C(t, e) {
                                    return (
                                        (this.identifier = e.identifier),
                                        (this.position = e.position),
                                        (this.frontPosition = e.frontPosition),
                                        (this.collection = t),
                                        (this.defaults = {
                                            size: 100,
                                            threshold: 0.1,
                                            color: "white",
                                            fadeTime: 250,
                                            dataOnly: !1,
                                            restJoystick: !0,
                                            restOpacity: 0.5,
                                            mode: "dynamic",
                                            zone: document.body,
                                            lockX: !1,
                                            lockY: !1,
                                            shape: "circle",
                                        }),
                                        this.config(e),
                                        "dynamic" === this.options.mode && (this.options.restOpacity = 0),
                                        (this.id = C.id),
                                        (C.id += 1),
                                        this.buildEl().stylize(),
                                        (this.instance = {
                                            el: this.ui.el,
                                            on: this.on.bind(this),
                                            off: this.off.bind(this),
                                            show: this.show.bind(this),
                                            hide: this.hide.bind(this),
                                            add: this.addToDom.bind(this),
                                            remove: this.removeFromDom.bind(this),
                                            destroy: this.destroy.bind(this),
                                            setPosition: this.setPosition.bind(this),
                                            resetDirection: this.resetDirection.bind(this),
                                            computeDirection: this.computeDirection.bind(this),
                                            trigger: this.trigger.bind(this),
                                            position: this.position,
                                            frontPosition: this.frontPosition,
                                            ui: this.ui,
                                            identifier: this.identifier,
                                            id: this.id,
                                            options: this.options,
                                        }),
                                        this.instance
                                    );
                                }
                                (C.prototype = new w()),
                                    (C.constructor = C),
                                    (C.id = 0),
                                    (C.prototype.buildEl = function (t) {
                                        return (
                                            (this.ui = {}),
                                            this.options.dataOnly ||
                                                ((this.ui.el = document.createElement("div")),
                                                (this.ui.back = document.createElement("div")),
                                                (this.ui.front = document.createElement("div")),
                                                (this.ui.el.className = "nipple collection_" + this.collection.id),
                                                (this.ui.back.className = "back"),
                                                (this.ui.front.className = "front"),
                                                this.ui.el.setAttribute("id", "nipple_" + this.collection.id + "_" + this.id),
                                                this.ui.el.appendChild(this.ui.back),
                                                this.ui.el.appendChild(this.ui.front)),
                                            this
                                        );
                                    }),
                                    (C.prototype.stylize = function () {
                                        if (this.options.dataOnly) return this;
                                        var t = this.options.fadeTime + "ms",
                                            e = (function (t, e) {
                                                var i = y("borderRadius");
                                                for (var o in i) i.hasOwnProperty(o) && (i[o] = "50%");
                                                return i;
                                            })(),
                                            i = u("transition", "opacity", t),
                                            o = {};
                                        return (
                                            (o.el = { position: "absolute", opacity: this.options.restOpacity, display: "block", zIndex: 999 }),
                                            (o.back = {
                                                position: "absolute",
                                                display: "block",
                                                width: this.options.size + "px",
                                                height: this.options.size + "px",
                                                marginLeft: -this.options.size / 2 + "px",
                                                marginTop: -this.options.size / 2 + "px",
                                                background: this.options.color,
                                                opacity: ".5",
                                            }),
                                            (o.front = {
                                                width: this.options.size / 2 + "px",
                                                height: this.options.size / 2 + "px",
                                                position: "absolute",
                                                display: "block",
                                                marginLeft: -this.options.size / 4 + "px",
                                                marginTop: -this.options.size / 4 + "px",
                                                background: this.options.color,
                                                opacity: ".5",
                                                transform: "translate(0px, 0px)",
                                            }),
                                            f(o.el, i),
                                            "circle" === this.options.shape && f(o.back, e),
                                            f(o.front, e),
                                            this.applyStyles(o),
                                            this
                                        );
                                    }),
                                    (C.prototype.applyStyles = function (t) {
                                        for (var e in this.ui) if (this.ui.hasOwnProperty(e)) for (var i in t[e]) this.ui[e].style[i] = t[e][i];
                                        return this;
                                    }),
                                    (C.prototype.addToDom = function () {
                                        return this.options.dataOnly || document.body.contains(this.ui.el) || this.options.zone.appendChild(this.ui.el), this;
                                    }),
                                    (C.prototype.removeFromDom = function () {
                                        return this.options.dataOnly || !document.body.contains(this.ui.el) || this.options.zone.removeChild(this.ui.el), this;
                                    }),
                                    (C.prototype.destroy = function () {
                                        clearTimeout(this.removeTimeout), clearTimeout(this.showTimeout), clearTimeout(this.restTimeout), this.trigger("destroyed", this.instance), this.removeFromDom(), this.off();
                                    }),
                                    (C.prototype.show = function (t) {
                                        var e = this;
                                        return (
                                            e.options.dataOnly ||
                                                (clearTimeout(e.removeTimeout),
                                                clearTimeout(e.showTimeout),
                                                clearTimeout(e.restTimeout),
                                                e.addToDom(),
                                                e.restCallback(),
                                                setTimeout(function () {
                                                    e.ui.el.style.opacity = 1;
                                                }, 0),
                                                (e.showTimeout = setTimeout(function () {
                                                    e.trigger("shown", e.instance), "function" == typeof t && t.call(this);
                                                }, e.options.fadeTime))),
                                            e
                                        );
                                    }),
                                    (C.prototype.hide = function (t) {
                                        var e = this;
                                        if (e.options.dataOnly) return e;
                                        if (
                                            ((e.ui.el.style.opacity = e.options.restOpacity),
                                            clearTimeout(e.removeTimeout),
                                            clearTimeout(e.showTimeout),
                                            clearTimeout(e.restTimeout),
                                            (e.removeTimeout = setTimeout(function () {
                                                var i = "dynamic" === e.options.mode ? "none" : "block";
                                                (e.ui.el.style.display = i), "function" == typeof t && t.call(e), e.trigger("hidden", e.instance);
                                            }, e.options.fadeTime)),
                                            e.options.restJoystick)
                                        ) {
                                            var i = e.options.restJoystick,
                                                o = {};
                                            (o.x = !0 === i || !1 !== i.x ? 0 : e.instance.frontPosition.x), (o.y = !0 === i || !1 !== i.y ? 0 : e.instance.frontPosition.y), e.setPosition(t, o);
                                        }
                                        return e;
                                    }),
                                    (C.prototype.setPosition = function (t, e) {
                                        var i = this;
                                        i.frontPosition = { x: e.x, y: e.y };
                                        var o = i.options.fadeTime + "ms",
                                            n = {};
                                        n.front = u("transition", ["transform"], o);
                                        var s = { front: {} };
                                        (s.front = { transform: "translate(" + i.frontPosition.x + "px," + i.frontPosition.y + "px)" }),
                                            i.applyStyles(n),
                                            i.applyStyles(s),
                                            (i.restTimeout = setTimeout(function () {
                                                "function" == typeof t && t.call(i), i.restCallback();
                                            }, i.options.fadeTime));
                                    }),
                                    (C.prototype.restCallback = function () {
                                        var t = {};
                                        (t.front = u("transition", "none", "")), this.applyStyles(t), this.trigger("rested", this.instance);
                                    }),
                                    (C.prototype.resetDirection = function () {
                                        this.direction = { x: !1, y: !1, angle: !1 };
                                    }),
                                    (C.prototype.computeDirection = function (t) {
                                        var e,
                                            i,
                                            o,
                                            n = t.angle.radian,
                                            s = Math.PI / 4,
                                            r = Math.PI / 2;
                                        if (
                                            (n > s && n < 3 * s && !t.lockX ? (e = "up") : n > -s && n <= s && !t.lockY ? (e = "left") : n > 3 * -s && n <= -s && !t.lockX ? (e = "down") : t.lockY || (e = "right"),
                                            t.lockY || (i = n > -r && n < r ? "left" : "right"),
                                            t.lockX || (o = n > 0 ? "up" : "down"),
                                            t.force > this.options.threshold)
                                        ) {
                                            var a,
                                                c = {};
                                            for (a in this.direction) this.direction.hasOwnProperty(a) && (c[a] = this.direction[a]);
                                            var d = {};
                                            for (a in ((this.direction = { x: i, y: o, angle: e }), (t.direction = this.direction), c)) c[a] === this.direction[a] && (d[a] = !0);
                                            if (d.x && d.y && d.angle) return t;
                                            (d.x && d.y) || this.trigger("plain", t), d.x || this.trigger("plain:" + i, t), d.y || this.trigger("plain:" + o, t), d.angle || this.trigger("dir dir:" + e, t);
                                        } else this.resetDirection();
                                        return t;
                                    });
                                var D = C;
                                function O(t, e) {
                                    (this.nipples = []),
                                        (this.idles = []),
                                        (this.actives = []),
                                        (this.ids = []),
                                        (this.pressureIntervals = {}),
                                        (this.manager = t),
                                        (this.id = O.id),
                                        (O.id += 1),
                                        (this.defaults = {
                                            zone: document.body,
                                            multitouch: !1,
                                            maxNumberOfNipples: 10,
                                            mode: "dynamic",
                                            position: { top: 0, left: 0 },
                                            catchDistance: 200,
                                            size: 100,
                                            threshold: 0.1,
                                            color: "white",
                                            fadeTime: 250,
                                            dataOnly: !1,
                                            restJoystick: !0,
                                            restOpacity: 0.5,
                                            lockX: !1,
                                            lockY: !1,
                                            shape: "circle",
                                            dynamicPage: !1,
                                            follow: !1,
                                        }),
                                        this.config(e),
                                        ("static" !== this.options.mode && "semi" !== this.options.mode) || (this.options.multitouch = !1),
                                        this.options.multitouch || (this.options.maxNumberOfNipples = 1);
                                    var i = getComputedStyle(this.options.zone.parentElement);
                                    return i && "flex" === i.display && (this.parentIsFlex = !0), this.updateBox(), this.prepareNipples(), this.bindings(), this.begin(), this.nipples;
                                }
                                (O.prototype = new w()),
                                    (O.constructor = O),
                                    (O.id = 0),
                                    (O.prototype.prepareNipples = function () {
                                        var t = this.nipples;
                                        (t.on = this.on.bind(this)),
                                            (t.off = this.off.bind(this)),
                                            (t.options = this.options),
                                            (t.destroy = this.destroy.bind(this)),
                                            (t.ids = this.ids),
                                            (t.id = this.id),
                                            (t.processOnMove = this.processOnMove.bind(this)),
                                            (t.processOnEnd = this.processOnEnd.bind(this)),
                                            (t.get = function (e) {
                                                if (void 0 === e) return t[0];
                                                for (var i = 0, o = t.length; i < o; i += 1) if (t[i].identifier === e) return t[i];
                                                return !1;
                                            });
                                    }),
                                    (O.prototype.bindings = function () {
                                        this.bindEvt(this.options.zone, "start"), (this.options.zone.style.touchAction = "none"), (this.options.zone.style.msTouchAction = "none");
                                    }),
                                    (O.prototype.begin = function () {
                                        var t = this.options;
                                        if ("static" === t.mode) {
                                            var e = this.createNipple(t.position, this.manager.getIdentifier());
                                            e.add(), this.idles.push(e);
                                        }
                                    }),
                                    (O.prototype.createNipple = function (t, e) {
                                        var i = this.manager.scroll,
                                            o = {},
                                            n = this.options,
                                            s = this.parentIsFlex ? i.x : i.x + this.box.left,
                                            r = this.parentIsFlex ? i.y : i.y + this.box.top;
                                        if (t.x && t.y) o = { x: t.x - s, y: t.y - r };
                                        else if (t.top || t.right || t.bottom || t.left) {
                                            var a = document.createElement("DIV");
                                            (a.style.display = "hidden"), (a.style.top = t.top), (a.style.right = t.right), (a.style.bottom = t.bottom), (a.style.left = t.left), (a.style.position = "absolute"), n.zone.appendChild(a);
                                            var c = a.getBoundingClientRect();
                                            n.zone.removeChild(a), (o = t), (t = { x: c.left + i.x, y: c.top + i.y });
                                        }
                                        var d = new D(this, {
                                            color: n.color,
                                            size: n.size,
                                            threshold: n.threshold,
                                            fadeTime: n.fadeTime,
                                            dataOnly: n.dataOnly,
                                            restJoystick: n.restJoystick,
                                            restOpacity: n.restOpacity,
                                            mode: n.mode,
                                            identifier: e,
                                            position: t,
                                            zone: n.zone,
                                            frontPosition: { x: 0, y: 0 },
                                            shape: n.shape,
                                        });
                                        return (
                                            n.dataOnly || (p(d.ui.el, o), p(d.ui.front, d.frontPosition)),
                                            this.nipples.push(d),
                                            this.trigger("added " + d.identifier + ":added", d),
                                            this.manager.trigger("added " + d.identifier + ":added", d),
                                            this.bindNipple(d),
                                            d
                                        );
                                    }),
                                    (O.prototype.updateBox = function () {
                                        this.box = this.options.zone.getBoundingClientRect();
                                    }),
                                    (O.prototype.bindNipple = function (t) {
                                        var e,
                                            i = this,
                                            o = function (t, o) {
                                                (e = t.type + " " + o.id + ":" + t.type), i.trigger(e, o);
                                            };
                                        t.on("destroyed", i.onDestroyed.bind(i)), t.on("shown hidden rested dir plain", o), t.on("dir:up dir:right dir:down dir:left", o), t.on("plain:up plain:right plain:down plain:left", o);
                                    }),
                                    (O.prototype.pressureFn = function (t, e, i) {
                                        var o = this,
                                            n = 0;
                                        clearInterval(o.pressureIntervals[i]),
                                            (o.pressureIntervals[i] = setInterval(
                                                function () {
                                                    var i = t.force || t.pressure || t.webkitForce || 0;
                                                    i !== n && (e.trigger("pressure", i), o.trigger("pressure " + e.identifier + ":pressure", i), (n = i));
                                                }.bind(o),
                                                100
                                            ));
                                    }),
                                    (O.prototype.onstart = function (t) {
                                        var e = this,
                                            i = e.options,
                                            o = t;
                                        return (
                                            (t = h(t)),
                                            e.updateBox(),
                                            m(t, function (n) {
                                                e.actives.length < i.maxNumberOfNipples
                                                    ? e.processOnStart(n)
                                                    : o.type.match(/^touch/) &&
                                                      (Object.keys(e.manager.ids).forEach(function (i) {
                                                          if (
                                                              Object.values(o.touches).findIndex(function (t) {
                                                                  return t.identifier === i;
                                                              }) < 0
                                                          ) {
                                                              var n = [t[0]];
                                                              (n.identifier = i), e.processOnEnd(n);
                                                          }
                                                      }),
                                                      e.actives.length < i.maxNumberOfNipples && e.processOnStart(n));
                                            }),
                                            e.manager.bindDocument(),
                                            !1
                                        );
                                    }),
                                    (O.prototype.processOnStart = function (t) {
                                        var e,
                                            i = this,
                                            o = i.options,
                                            s = i.manager.getIdentifier(t),
                                            r = t.force || t.pressure || t.webkitForce || 0,
                                            a = { x: t.pageX, y: t.pageY },
                                            c = i.getOrCreate(s, a);
                                        c.identifier !== s && i.manager.removeIdentifier(c.identifier), (c.identifier = s);
                                        var d = function (e) {
                                            e.trigger("start", e), i.trigger("start " + e.id + ":start", e), e.show(), r > 0 && i.pressureFn(t, e, e.identifier), i.processOnMove(t);
                                        };
                                        if (((e = i.idles.indexOf(c)) >= 0 && i.idles.splice(e, 1), i.actives.push(c), i.ids.push(c.identifier), "semi" !== o.mode)) d(c);
                                        else {
                                            if (!(n(a, c.position) <= o.catchDistance)) return c.destroy(), void i.processOnStart(t);
                                            d(c);
                                        }
                                        return c;
                                    }),
                                    (O.prototype.getOrCreate = function (t, e) {
                                        var i,
                                            o = this.options;
                                        return /(semi|static)/.test(o.mode)
                                            ? (i = this.idles[0])
                                                ? (this.idles.splice(0, 1), i)
                                                : "semi" === o.mode
                                                ? this.createNipple(e, t)
                                                : (console.warn("Coudln't find the needed nipple."), !1)
                                            : (i = this.createNipple(e, t));
                                    }),
                                    (O.prototype.processOnMove = function (t) {
                                        var e = this.options,
                                            i = this.manager.getIdentifier(t),
                                            o = this.nipples.get(i),
                                            r = this.manager.scroll;
                                        if (
                                            (function (t) {
                                                return isNaN(t.buttons) ? 0 !== t.pressure : 0 !== t.buttons;
                                            })(t)
                                        ) {
                                            if (!o) return console.error("Found zombie joystick with ID " + i), void this.manager.removeIdentifier(i);
                                            if (e.dynamicPage) {
                                                var a = o.el.getBoundingClientRect();
                                                o.position = { x: r.x + a.left, y: r.y + a.top };
                                            }
                                            o.identifier = i;
                                            var c = o.options.size / 2,
                                                d = { x: t.pageX, y: t.pageY };
                                            e.lockX && (d.y = o.position.y), e.lockY && (d.x = o.position.x);
                                            var h,
                                                l,
                                                p,
                                                u,
                                                y,
                                                f,
                                                m,
                                                v,
                                                g,
                                                k,
                                                b = n(d, o.position),
                                                E =
                                                    ((h = d),
                                                    (p = (l = o.position).x - h.x),
                                                    (u = l.y - h.y),
                                                    (function (t) {
                                                        return t * (180 / Math.PI);
                                                    })(Math.atan2(u, p))),
                                                x = s(E),
                                                w = b / c,
                                                C = { distance: b, position: d };
                                            if (
                                                ("circle" === o.options.shape
                                                    ? ((y = Math.min(b, c)), (m = o.position), (v = y), (k = { x: 0, y: 0 }), (g = s((g = E))), (k.x = m.x - v * Math.cos(g)), (k.y = m.y - v * Math.sin(g)), (f = k))
                                                    : ((f = (function (t, e, i) {
                                                          return { x: Math.min(Math.max(t.x, e.x - i), e.x + i), y: Math.min(Math.max(t.y, e.y - i), e.y + i) };
                                                      })(d, o.position, c)),
                                                      (y = n(f, o.position))),
                                                e.follow)
                                            ) {
                                                if (b > c) {
                                                    var D = d.x - f.x,
                                                        O = d.y - f.y;
                                                    (o.position.x += D),
                                                        (o.position.y += O),
                                                        (o.el.style.top = o.position.y - (this.box.top + r.y) + "px"),
                                                        (o.el.style.left = o.position.x - (this.box.left + r.x) + "px"),
                                                        (b = n(d, o.position));
                                                }
                                            } else (d = f), (b = y);
                                            var K = d.x - o.position.x,
                                                A = d.y - o.position.y;
                                            (o.frontPosition = { x: K, y: A }), e.dataOnly || (o.ui.front.style.transform = "translate(" + K + "px," + A + "px)");
                                            var M = {
                                                identifier: o.identifier,
                                                position: d,
                                                force: w,
                                                pressure: t.force || t.pressure || t.webkitForce || 0,
                                                distance: b,
                                                angle: { radian: x, degree: E },
                                                vector: { x: K / c, y: -A / c },
                                                raw: C,
                                                instance: o,
                                                lockX: e.lockX,
                                                lockY: e.lockY,
                                            };
                                            ((M = o.computeDirection(M)).angle = { radian: s(180 - E), degree: 180 - E }), o.trigger("move", M), this.trigger("move " + o.id + ":move", M);
                                        } else this.processOnEnd(t);
                                    }),
                                    (O.prototype.processOnEnd = function (t) {
                                        var e = this,
                                            i = e.options,
                                            o = e.manager.getIdentifier(t),
                                            n = e.nipples.get(o),
                                            s = e.manager.removeIdentifier(n.identifier);
                                        n &&
                                            (i.dataOnly ||
                                                n.hide(function () {
                                                    "dynamic" === i.mode && (n.trigger("removed", n), e.trigger("removed " + n.id + ":removed", n), e.manager.trigger("removed " + n.id + ":removed", n), n.destroy());
                                                }),
                                            clearInterval(e.pressureIntervals[n.identifier]),
                                            n.resetDirection(),
                                            n.trigger("end", n),
                                            e.trigger("end " + n.id + ":end", n),
                                            e.ids.indexOf(n.identifier) >= 0 && e.ids.splice(e.ids.indexOf(n.identifier), 1),
                                            e.actives.indexOf(n) >= 0 && e.actives.splice(e.actives.indexOf(n), 1),
                                            /(semi|static)/.test(i.mode) ? e.idles.push(n) : e.nipples.indexOf(n) >= 0 && e.nipples.splice(e.nipples.indexOf(n), 1),
                                            e.manager.unbindDocument(),
                                            /(semi|static)/.test(i.mode) && (e.manager.ids[s.id] = s.identifier));
                                    }),
                                    (O.prototype.onDestroyed = function (t, e) {
                                        this.nipples.indexOf(e) >= 0 && this.nipples.splice(this.nipples.indexOf(e), 1),
                                            this.actives.indexOf(e) >= 0 && this.actives.splice(this.actives.indexOf(e), 1),
                                            this.idles.indexOf(e) >= 0 && this.idles.splice(this.idles.indexOf(e), 1),
                                            this.ids.indexOf(e.identifier) >= 0 && this.ids.splice(this.ids.indexOf(e.identifier), 1),
                                            this.manager.removeIdentifier(e.identifier),
                                            this.manager.unbindDocument();
                                    }),
                                    (O.prototype.destroy = function () {
                                        for (var t in (this.unbindEvt(this.options.zone, "start"),
                                        this.nipples.forEach(function (t) {
                                            t.destroy();
                                        }),
                                        this.pressureIntervals))
                                            this.pressureIntervals.hasOwnProperty(t) && clearInterval(this.pressureIntervals[t]);
                                        this.trigger("destroyed", this.nipples), this.manager.unbindDocument(), this.off();
                                    });
                                var K = O;
                                function A(t) {
                                    var e = this;
                                    (e.ids = {}), (e.index = 0), (e.collections = []), (e.scroll = l()), e.config(t), e.prepareCollections();
                                    var i = function () {
                                        var t;
                                        e.collections.forEach(function (i) {
                                            i.forEach(function (i) {
                                                (t = i.el.getBoundingClientRect()), (i.position = { x: e.scroll.x + t.left, y: e.scroll.y + t.top });
                                            });
                                        });
                                    };
                                    c(window, "resize", function () {
                                        a(i);
                                    });
                                    var o = function () {
                                        e.scroll = l();
                                    };
                                    return (
                                        c(window, "scroll", function () {
                                            a(o);
                                        }),
                                        e.collections
                                    );
                                }
                                (A.prototype = new w()),
                                    (A.constructor = A),
                                    (A.prototype.prepareCollections = function () {
                                        var t = this;
                                        (t.collections.create = t.create.bind(t)),
                                            (t.collections.on = t.on.bind(t)),
                                            (t.collections.off = t.off.bind(t)),
                                            (t.collections.destroy = t.destroy.bind(t)),
                                            (t.collections.get = function (e) {
                                                var i;
                                                return (
                                                    t.collections.every(function (t) {
                                                        return !(i = t.get(e));
                                                    }),
                                                    i
                                                );
                                            });
                                    }),
                                    (A.prototype.create = function (t) {
                                        return this.createCollection(t);
                                    }),
                                    (A.prototype.createCollection = function (t) {
                                        var e = new K(this, t);
                                        return this.bindCollection(e), this.collections.push(e), e;
                                    }),
                                    (A.prototype.bindCollection = function (t) {
                                        var e,
                                            i = this,
                                            o = function (t, o) {
                                                (e = t.type + " " + o.id + ":" + t.type), i.trigger(e, o);
                                            };
                                        t.on("destroyed", i.onDestroyed.bind(i)), t.on("shown hidden rested dir plain", o), t.on("dir:up dir:right dir:down dir:left", o), t.on("plain:up plain:right plain:down plain:left", o);
                                    }),
                                    (A.prototype.bindDocument = function () {
                                        this.binded || (this.bindEvt(document, "move").bindEvt(document, "end"), (this.binded = !0));
                                    }),
                                    (A.prototype.unbindDocument = function (t) {
                                        (Object.keys(this.ids).length && !0 !== t) || (this.unbindEvt(document, "move").unbindEvt(document, "end"), (this.binded = !1));
                                    }),
                                    (A.prototype.getIdentifier = function (t) {
                                        var e;
                                        return (
                                            t ? void 0 === (e = void 0 === t.identifier ? t.pointerId : t.identifier) && (e = this.latest || 0) : (e = this.index),
                                            void 0 === this.ids[e] && ((this.ids[e] = this.index), (this.index += 1)),
                                            (this.latest = e),
                                            this.ids[e]
                                        );
                                    }),
                                    (A.prototype.removeIdentifier = function (t) {
                                        var e = {};
                                        for (var i in this.ids)
                                            if (this.ids[i] === t) {
                                                (e.id = i), (e.identifier = this.ids[i]), delete this.ids[i];
                                                break;
                                            }
                                        return e;
                                    }),
                                    (A.prototype.onmove = function (t) {
                                        return this.onAny("move", t), !1;
                                    }),
                                    (A.prototype.onend = function (t) {
                                        return this.onAny("end", t), !1;
                                    }),
                                    (A.prototype.oncancel = function (t) {
                                        return this.onAny("end", t), !1;
                                    }),
                                    (A.prototype.onAny = function (t, e) {
                                        var i,
                                            o = this,
                                            n = "processOn" + t.charAt(0).toUpperCase() + t.slice(1);
                                        e = h(e);
                                        var s = function (t, e, i) {
                                            i.ids.indexOf(e) >= 0 && (i[n](t), (t._found_ = !0));
                                        };
                                        return (
                                            m(e, function (t) {
                                                (i = o.getIdentifier(t)), m(o.collections, s.bind(null, t, i)), t._found_ || o.removeIdentifier(i);
                                            }),
                                            !1
                                        );
                                    }),
                                    (A.prototype.destroy = function () {
                                        this.unbindDocument(!0),
                                            (this.ids = {}),
                                            (this.index = 0),
                                            this.collections.forEach(function (t) {
                                                t.destroy();
                                            }),
                                            this.off();
                                    }),
                                    (A.prototype.onDestroyed = function (t, e) {
                                        if (this.collections.indexOf(e) < 0) return !1;
                                        this.collections.splice(this.collections.indexOf(e), 1);
                                    });
                                var M = new A();
                                e.default = {
                                    create: function (t) {
                                        return M.create(t);
                                    },
                                    factory: M,
                                };
                            },
                        ]).default);
                },
                659: (t) => {
                    t.exports = AFRAME.registerComponent("checkpoint-controls", {
                        schema: { enabled: { default: !0 }, mode: { default: "teleport", oneOf: ["teleport", "animate"] }, animateSpeed: { default: 3 } },
                        init: function () {
                            (this.active = !0), (this.checkpoint = null), (this.isNavMeshConstrained = !1), (this.offset = new THREE.Vector3()), (this.position = new THREE.Vector3()), (this.targetPosition = new THREE.Vector3());
                        },
                        play: function () {
                            this.active = !0;
                        },
                        pause: function () {
                            this.active = !1;
                        },
                        setCheckpoint: function (t) {
                            const e = this.el;
                            this.active &&
                                this.checkpoint !== t &&
                                (this.checkpoint && e.emit("navigation-end", { checkpoint: this.checkpoint }),
                                (this.checkpoint = t),
                                this.sync(),
                                this.position.distanceTo(this.targetPosition) < 0.1
                                    ? (this.checkpoint = null)
                                    : (e.emit("navigation-start", { checkpoint: t }),
                                      "teleport" === this.data.mode &&
                                          (this.el.setAttribute("position", this.targetPosition), (this.checkpoint = null), e.emit("navigation-end", { checkpoint: t }), e.components["movement-controls"].updateNavLocation())));
                        },
                        isVelocityActive: function () {
                            return !(!this.active || !this.checkpoint);
                        },
                        getVelocity: function () {
                            if (!this.active) return;
                            const t = this.data,
                                e = this.offset,
                                i = this.position,
                                o = this.targetPosition,
                                n = this.checkpoint;
                            return this.sync(), i.distanceTo(o) < 0.1 ? ((this.checkpoint = null), this.el.emit("navigation-end", { checkpoint: n }), e.set(0, 0, 0)) : (e.setLength(t.animateSpeed), e);
                        },
                        sync: function () {
                            const t = this.offset,
                                e = this.position,
                                i = this.targetPosition;
                            e.copy(this.el.getAttribute("position")), this.checkpoint.object3D.getWorldPosition(i), i.add(this.checkpoint.components.checkpoint.getOffset()), t.copy(i).sub(e);
                        },
                    });
                },
                793: (t, e, i) => {
                    const o = i(708),
                        n = i(816),
                        s = 0.2,
                        r = "left",
                        a = "right";
                    t.exports = AFRAME.registerComponent("gamepad-controls", {
                        GamepadButton: o,
                        schema: { enabled: { default: !0 }, rotationSensitivity: { default: 2 } },
                        init: function () {
                            const t = this.el.sceneEl;
                            (this.system = t.systems["tracked-controls-webxr"] || { controllers: [] }), (this.prevTime = window.performance.now()), (this.buttons = {});
                            const e = this.el.object3D.rotation;
                            (this.pitch = new THREE.Object3D()),
                                (this.pitch.rotation.x = e.x),
                                (this.yaw = new THREE.Object3D()),
                                (this.yaw.position.y = 10),
                                (this.yaw.rotation.y = e.y),
                                this.yaw.add(this.pitch),
                                (this._lookVector = new THREE.Vector2()),
                                (this._moveVector = new THREE.Vector2()),
                                (this._dpadVector = new THREE.Vector2()),
                                t.addBehavior(this);
                        },
                        update: function () {
                            this.tick();
                        },
                        tick: function (t, e) {
                            this.updateButtonState(), this.updateRotation(e);
                        },
                        remove: function () {},
                        isVelocityActive: function () {
                            if (!this.data.enabled || !this.isConnected()) return !1;
                            const t = this._dpadVector,
                                e = this._moveVector;
                            this.getDpad(t), this.getJoystick(1, e);
                            const i = t.x || e.x,
                                o = t.y || e.y;
                            return Math.abs(i) > s || Math.abs(o) > s;
                        },
                        getVelocityDelta: function () {
                            const t = this._dpadVector,
                                e = this._moveVector;
                            this.getDpad(t), this.getJoystick(1, e);
                            const i = t.x || e.x,
                                o = t.y || e.y,
                                n = new THREE.Vector3();
                            return Math.abs(i) > s && (n.x += i), Math.abs(o) > s && (n.z += o), n;
                        },
                        isRotationActive: function () {
                            if (!this.data.enabled || !this.isConnected()) return !1;
                            const t = this._lookVector;
                            return this.getJoystick(2, t), Math.abs(t.x) > s || Math.abs(t.y) > s;
                        },
                        updateRotation: function (t) {
                            if (!this.isRotationActive()) return;
                            const e = this.data,
                                i = this.yaw,
                                o = this.pitch;
                            (i.rotation.y = this.el.object3D.rotation.y), (o.rotation.x = this.el.object3D.rotation.x);
                            const n = this._lookVector;
                            this.getJoystick(2, n),
                                Math.abs(n.x) <= s && (n.x = 0),
                                Math.abs(n.y) <= s && (n.y = 0),
                                n.multiplyScalar((e.rotationSensitivity * t) / 1e3),
                                (i.rotation.y -= n.x),
                                (o.rotation.x -= n.y),
                                (o.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, o.rotation.x))),
                                this.el.object3D.rotation.set(o.rotation.x, i.rotation.y, 0);
                        },
                        updateButtonState: function () {
                            const t = this.getGamepad(a);
                            if (this.data.enabled && t)
                                for (var e = 0; e < t.buttons.length; e++)
                                    t.buttons[e].pressed && !this.buttons[e] ? this.emit(new n("gamepadbuttondown", e, t.buttons[e])) : !t.buttons[e].pressed && this.buttons[e] && this.emit(new n("gamepadbuttonup", e, t.buttons[e])),
                                        (this.buttons[e] = t.buttons[e].pressed);
                            else Object.keys(this.buttons) && (this.buttons = {});
                        },
                        emit: function (t) {
                            this.el.emit(t.type, t), this.el.emit(t.type + ":" + t.index, new n(t.type, t.index, t));
                        },
                        getGamepad: (function () {
                            const t = [],
                                e = [];
                            return function (i) {
                                const o = this.el.sceneEl.components["proxy-controls"],
                                    n = o && o.isConnected() && o.getGamepad(0);
                                if (n) return n;
                                t.length = 0;
                                for (let e = 0; e < this.system.controllers.length; e++) {
                                    const o = this.system.controllers[e],
                                        n = o ? o.gamepad : null;
                                    if ((t.push(n), n && o.handedness === i)) return n;
                                }
                                const s = navigator.getGamepads ? navigator.getGamepads() : e;
                                for (let t = 0; t < s.length; t++) {
                                    const e = s[t];
                                    if (e && e.hand === i) return e;
                                }
                                return t[0] || s[0];
                            };
                        })(),
                        getButton: function (t) {
                            return this.getGamepad(a).buttons[t];
                        },
                        getAxis: function (t) {
                            return this.getGamepad(t > 1 ? a : r).axes[t];
                        },
                        getJoystick: function (t, e) {
                            const i = this.getGamepad(1 === t ? r : a);
                            if (!i) return e.set(0, 0);
                            if ("xr-standard" === i.mapping)
                                switch (t) {
                                    case 1:
                                        return e.set(i.axes[2], i.axes[3]);
                                    case 2:
                                        return e.set(i.axes[2], 0);
                                }
                            else
                                switch (t) {
                                    case 1:
                                        return e.set(i.axes[0], i.axes[1]);
                                    case 2:
                                        return e.set(i.axes[2], i.axes[3]);
                                }
                            throw new Error('Unexpected joystick index "%d".', t);
                        },
                        getDpad: function (t) {
                            const e = this.getGamepad(r);
                            return e && e.buttons[o.DPAD_RIGHT]
                                ? t.set((e.buttons[o.DPAD_RIGHT].pressed ? 1 : 0) + (e.buttons[o.DPAD_LEFT].pressed ? -1 : 0), (e.buttons[o.DPAD_UP].pressed ? -1 : 0) + (e.buttons[o.DPAD_DOWN].pressed ? 1 : 0))
                                : t.set(0, 0);
                        },
                        isConnected: function () {
                            const t = this.getGamepad(r);
                            return !(!t || !t.connected);
                        },
                        getID: function () {
                            return this.getGamepad(r).id;
                        },
                    });
                },
                573: (t, e, i) => {
                    i(226);
                    const o = window.KeyboardEvent;
                    t.exports = AFRAME.registerComponent("keyboard-controls", {
                        schema: { enabled: { default: !0 }, debug: { default: !1 } },
                        init: function () {
                            (this.dVelocity = new THREE.Vector3()),
                                (this.localKeys = {}),
                                (this.listeners = { keydown: this.onKeyDown.bind(this), keyup: this.onKeyUp.bind(this), blur: this.onBlur.bind(this), onContextMenu: this.onContextMenu.bind(this) });
                        },
                        isVelocityActive: function () {
                            return this.data.enabled && !!Object.keys(this.getKeys()).length;
                        },
                        getVelocityDelta: function () {
                            const t = this.data,
                                e = this.getKeys();
                            return (
                                this.dVelocity.set(0, 0, 0),
                                t.enabled &&
                                    ((e.KeyW || e.ArrowUp) && (this.dVelocity.z -= 1),
                                    (e.KeyA || e.ArrowLeft) && (this.dVelocity.x -= 1),
                                    (e.KeyS || e.ArrowDown) && (this.dVelocity.z += 1),
                                    (e.KeyD || e.ArrowRight) && (this.dVelocity.x += 1)),
                                this.dVelocity.clone()
                            );
                        },
                        play: function () {
                            this.attachEventListeners();
                        },
                        pause: function () {
                            this.removeEventListeners();
                        },
                        attachEventListeners: function () {
                            window.addEventListener("contextmenu", this.listeners.onContextMenu, !1),
                                window.addEventListener("keydown", this.listeners.keydown, !1),
                                window.addEventListener("keyup", this.listeners.keyup, !1),
                                window.addEventListener("blur", this.listeners.blur, !1);
                        },
                        onContextMenu: function () {
                            for (const t in this.localKeys) this.localKeys.hasOwnProperty(t) && delete this.localKeys[t];
                        },
                        removeEventListeners: function () {
                            window.removeEventListener("keydown", this.listeners.keydown), window.removeEventListener("keyup", this.listeners.keyup), window.removeEventListener("blur", this.listeners.blur);
                        },
                        onKeyDown: function (t) {
                            AFRAME.utils.shouldCaptureKeyEvent(t) && ((this.localKeys[t.code] = !0), this.emit(t));
                        },
                        onKeyUp: function (t) {
                            AFRAME.utils.shouldCaptureKeyEvent(t) && (delete this.localKeys[t.code], this.emit(t));
                        },
                        onBlur: function () {
                            for (const t in this.localKeys) this.localKeys.hasOwnProperty(t) && delete this.localKeys[t];
                        },
                        emit: function (t) {
                            "__keyboard-controls-proxy" in t && this.el.emit(t.type, t), this.el.emit(t.type + ":" + t.code, new o(t.type, t)), this.data.debug && console.log(t.type + ":" + t.code);
                        },
                        isPressed: function (t) {
                            return t in this.getKeys();
                        },
                        getKeys: function () {
                            return this.isProxied() ? this.el.sceneEl.components["proxy-controls"].getKeyboard() : this.localKeys;
                        },
                        isProxied: function () {
                            const t = this.el.sceneEl.components["proxy-controls"];
                            return t && t.isConnected();
                        },
                    });
                },
                696: (t) => {
                    const e = "-controls";
                    t.exports = AFRAME.registerComponent("movement-controls", {
                        dependencies: ["rotation"],
                        schema: {
                            enabled: { default: !0 },
                            controls: { default: ["gamepad", "trackpad", "keyboard", "touch"] },
                            speed: { default: 0.3, min: 0 },
                            fly: { default: !1 },
                            constrainToNavMesh: { default: !1 },
                            camera: { default: "[movement-controls] [camera]", type: "selector" },
                        },
                        init: function () {
                            const t = this.el;
                            this.data.camera || (this.data.camera = t.querySelector("[camera]")),
                                (this.velocityCtrl = null),
                                (this.velocity = new THREE.Vector3()),
                                (this.heading = new THREE.Quaternion()),
                                (this.eventDetail = {}),
                                (this.navGroup = null),
                                (this.navNode = null),
                                t.sceneEl.hasLoaded ? this.injectControls() : t.sceneEl.addEventListener("loaded", this.injectControls.bind(this));
                        },
                        update: function (t) {
                            const i = this.el,
                                o = this.data,
                                n = i.sceneEl.systems.nav;
                            if ((i.sceneEl.hasLoaded && this.injectControls(), n && o.constrainToNavMesh !== t.constrainToNavMesh && (o.constrainToNavMesh ? n.addAgent(this) : n.removeAgent(this)), o.enabled !== t.enabled))
                                for (let t = 0; t < o.controls.length; t++) {
                                    const i = o.controls[t] + e;
                                    this.el.setAttribute(i, { enabled: this.data.enabled });
                                }
                        },
                        injectControls: function () {
                            const t = this.data;
                            for (let i = 0; i < t.controls.length; i++) {
                                const o = t.controls[i] + e;
                                this.el.setAttribute(o, { enabled: this.data.enabled });
                            }
                        },
                        updateNavLocation: function () {
                            (this.navGroup = null), (this.navNode = null);
                        },
                        tick: (function () {
                            const t = new THREE.Vector3(),
                                e = new THREE.Vector3(),
                                i = new THREE.Vector3();
                            return function (o, n) {
                                if (!n) return;
                                const s = this.el,
                                    r = this.data;
                                if (!r.enabled) return;
                                this.updateVelocityCtrl();
                                const a = this.velocityCtrl,
                                    c = this.velocity;
                                if (a)
                                    if ((n / 1e3 > 0.2 ? c.set(0, 0, 0) : this.updateVelocity(n), r.constrainToNavMesh && !1 !== a.isNavMeshConstrained)) {
                                        if (c.lengthSq() < 1e-5) return;
                                        t.copy(s.object3D.position),
                                            e
                                                .copy(c)
                                                .multiplyScalar(n / 1e3)
                                                .add(t);
                                        const o = s.sceneEl.systems.nav;
                                        (this.navGroup = null === this.navGroup ? o.getGroup(t) : this.navGroup),
                                            (this.navNode = this.navNode || o.getNode(t, this.navGroup)),
                                            (this.navNode = o.clampStep(t, e, this.navGroup, this.navNode, i)),
                                            s.object3D.position.copy(i);
                                    } else s.hasAttribute("velocity") ? s.setAttribute("velocity", c) : ((s.object3D.position.x += (c.x * n) / 1e3), (s.object3D.position.y += (c.y * n) / 1e3), (s.object3D.position.z += (c.z * n) / 1e3));
                            };
                        })(),
                        updateVelocityCtrl: function () {
                            const t = this.data;
                            if (t.enabled) {
                                for (let i = 0, o = t.controls.length; i < o; i++) {
                                    const o = this.el.components[t.controls[i] + e];
                                    if (o && o.isVelocityActive()) return void (this.velocityCtrl = o);
                                }
                                this.velocityCtrl = null;
                            }
                        },
                        updateVelocity: (function () {
                            const t = new THREE.Vector2(),
                                e = new THREE.Quaternion();
                            return function (i) {
                                let o;
                                const n = this.el,
                                    s = this.velocityCtrl,
                                    r = this.velocity,
                                    a = this.data;
                                if (s) {
                                    if (!s.getVelocityDelta) {
                                        if (s.getVelocity) return void r.copy(s.getVelocity());
                                        if (s.getPositionDelta) return void r.copy(s.getPositionDelta(i).multiplyScalar(1e3 / i));
                                        throw new Error("Incompatible movement controls: ", s);
                                    }
                                    o = s.getVelocityDelta(i);
                                }
                                if ((n.hasAttribute("velocity") && !a.constrainToNavMesh && r.copy(this.el.getAttribute("velocity")), o && a.enabled)) {
                                    const i = a.camera;
                                    e.copy(i.object3D.quaternion), e.premultiply(n.object3D.quaternion), o.applyQuaternion(e);
                                    const s = o.length();
                                    a.fly ? (r.copy(o), r.multiplyScalar(16.66667 * this.data.speed)) : (t.set(o.x, o.z), t.setLength(s * this.data.speed * 16.66667), (r.x = t.x), (r.y = 0), (r.z = t.y)),
                                        (0 === r.x && 0 === r.y && 0 === r.z) || ((this.eventDetail.velocity = r), this.el.emit("moved", this.eventDetail));
                                }
                            };
                        })(),
                    });
                },
                164: (t, e, i) => {
                    "use strict";
                    i.r(e);
                    var o = i(694),
                        n = i.n(o);
                    AFRAME.registerComponent("nipple-controls", {
                        schema: {
                            enabled: { default: !0 },
                            mode: { default: "dynamic", oneOf: ["static", "semi", "dynamic"] },
                            rotationSensitivity: { default: 1 },
                            moveJoystickEnabled: { default: !0 },
                            lookJoystickEnabled: { default: false },
                            sideMargin: { default: "30px" },
                            bottomMargin: { default: "70px" },
                            moveJoystickPosition: { default: "left", oneOf: ["left", "right"] },
                            lookJoystickPosition: { default: "right", oneOf: ["left", "right"] },
                        },
                        init() {
                            (this.dVelocity = new THREE.Vector3()), (this.lookVector = new THREE.Vector2());
                            const t = this.el.querySelector("[look-controls]").components["look-controls"];
                            (this.pitchObject = t.pitchObject), (this.yawObject = t.yawObject), (this.rigRotation = this.el.object3D.rotation), (this.moveData = void 0), (this.lookData = void 0), (this.moving = !1), (this.rotating = !1);
                        },
                        update(t) {
                            (this.data.moveJoystickPosition === t.moveJoystickPosition && this.data.sideMargin === t.sideMargin && this.data.bottomMargin === t.bottomMargin && this.data.mode === t.mode) || this.removeMoveJoystick(),
                                (this.data.lookJoystickPosition === t.lookJoystickPosition && this.data.sideMargin === t.sideMargin && this.data.bottomMargin === t.bottomMargin && this.data.mode === t.mode) || this.removeLookJoystick(),
                                this.data.enabled && this.data.moveJoystickEnabled ? this.createMoveJoystick() : this.removeMoveJoystick(),
                                this.data.enabled && this.data.lookJoystickEnabled ? this.createLookJoystick() : this.removeLookJoystick();
                        },
                        pause() {
                            (this.moving = !1), (this.rotating = !1);
                        },
                        remove() {
                            this.removeMoveJoystick(), this.removeLookJoystick();
                        },
                        isVelocityActive() {
                            return this.data.enabled && this.moving;
                        },
                        getVelocityDelta() {
                            if ((this.dVelocity.set(0, 0, 0), this.isVelocityActive())) {
                                const t = this.moveData.force < 1 ? this.moveData.force : 1,
                                    e = this.moveData.angle.radian,
                                    i = Math.cos(e) * t,
                                    o = -Math.sin(e) * t;
                                this.dVelocity.set(i, 0, o);
                            }
                            return this.dVelocity;
                        },
                        isRotationActive() {
                            return this.data.enabled && this.rotating;
                        },
                        updateRotation(t) {
                            if (!this.isRotationActive()) return;
                            const e = this.lookData.force < 1 ? this.lookData.force : 1,
                                i = this.lookData.angle.radian,
                                o = this.lookVector;
                            (o.x = Math.cos(i) * e), (o.y = Math.sin(i) * e), o.multiplyScalar((this.data.rotationSensitivity * t) / 1e3), (this.yawObject.rotation.y -= o.x);
                            let n = this.pitchObject.rotation.x + o.y;
                            (n = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, n))), (this.pitchObject.rotation.x = n);
                        },
                        tick: function (t, e) {
                            this.updateRotation(e);
                        },
                        initLeftZone() {
                            const t = document.createElement("div");
                            t.setAttribute("id", "joystickLeftZone"),
                                t.setAttribute("style", `position:absolute;${this.data.moveJoystickPosition}:${this.data.sideMargin};bottom:${this.data.bottomMargin};z-index:1`),
                                document.body.appendChild(t),
                                (this.leftZone = t);
                        },
                        initRightZone() {
                            const t = document.createElement("div");
                            t.setAttribute("id", "joystickRightZone"),
                                t.setAttribute("style", `position:absolute;${this.data.lookJoystickPosition}:${this.data.sideMargin};bottom:${this.data.bottomMargin};z-index:1`),
                                document.body.appendChild(t),
                                (this.rightZone = t);
                        },
                        createMoveJoystick() {
                            if (this.moveJoystick) return;
                            this.initLeftZone();
                            const t = { mode: this.data.mode, zone: this.leftZone, color: "white", fadeTime: 0 };
                            (this.leftZone.style.width = "100px"),
                                "static" === this.data.mode ? ((this.leftZone.style.height = "100px"), (t.position = { left: "50%", bottom: "50%" })) : (this.leftZone.style.height = "400px"),
                                (this.moveJoystick = n().create(t)),
                                this.moveJoystick.on("move", (t, e) => {
                                    (this.moveData = e), (this.moving = !0);
                                }),
                                this.moveJoystick.on("end", (t, e) => {
                                    this.moving = !1;
                                });
                        },
                        createLookJoystick() {
                            if (this.lookJoystick) return;
                            this.initRightZone();
                            const t = { mode: this.data.mode, zone: this.rightZone, color: "white", fadeTime: 0 };
                            (this.rightZone.style.width = "100px"),
                                "static" === this.data.mode ? ((this.rightZone.style.height = "100px"), (t.position = { left: "50%", bottom: "50%" })) : (this.rightZone.style.height = "400px"),
                                (this.lookJoystick = n().create(t)),
                                this.lookJoystick.on("move", (t, e) => {
                                    (this.lookData = e), (this.rotating = !0);
                                }),
                                this.lookJoystick.on("end", (t, e) => {
                                    this.rotating = !1;
                                });
                        },
                        removeMoveJoystick() {
                            this.moveJoystick && (this.moveJoystick.destroy(), (this.moveJoystick = void 0)), (this.moveData = void 0), this.leftZone && this.leftZone.parentNode && (this.leftZone.remove(), (this.leftZone = void 0));
                        },
                        removeLookJoystick() {
                            this.lookJoystick && (this.lookJoystick.destroy(), (this.lookJoystick = void 0)), (this.lookData = void 0), this.rightZone && this.rightZone.parentNode && (this.rightZone.remove(), (this.rightZone = void 0));
                        },
                    });
                },
                6: (t) => {
                    t.exports = AFRAME.registerComponent("touch-controls", {
                        schema: { enabled: { default: !0 }, reverseEnabled: { default: !0 } },
                        init: function () {
                            (this.dVelocity = new THREE.Vector3()), this.bindMethods(), (this.direction = 0);
                        },
                        play: function () {
                            this.addEventListeners();
                        },
                        pause: function () {
                            this.removeEventListeners(), this.dVelocity.set(0, 0, 0);
                        },
                        remove: function () {
                            this.pause();
                        },
                        addEventListeners: function () {
                            const t = this.el.sceneEl,
                                e = t.canvas;
                            if (!e) return void t.addEventListener("render-target-loaded", this.addEventListeners.bind(this));
                            e.addEventListener("touchstart", this.onTouchStart), e.addEventListener("touchend", this.onTouchEnd);
                            const i = t.getAttribute("vr-mode-ui");
                            i && i.cardboardModeEnabled && t.addEventListener("enter-vr", this.onEnterVR);
                        },
                        removeEventListeners: function () {
                            const t = this.el.sceneEl && this.el.sceneEl.canvas;
                            t && (t.removeEventListener("touchstart", this.onTouchStart), t.removeEventListener("touchend", this.onTouchEnd), this.el.sceneEl.removeEventListener("enter-vr", this.onEnterVR));
                        },
                        isVelocityActive: function () {
                            return this.data.enabled && !!this.direction;
                        },
                        getVelocityDelta: function () {
                            return (this.dVelocity.z = this.direction), this.dVelocity.clone();
                        },
                        bindMethods: function () {
                            (this.onTouchStart = this.onTouchStart.bind(this)), (this.onTouchEnd = this.onTouchEnd.bind(this)), (this.onEnterVR = this.onEnterVR.bind(this));
                        },
                        onTouchStart: function (t) {
                            (this.direction = -1), this.data.reverseEnabled && t.touches && 2 === t.touches.length && (this.direction = 1), t.preventDefault();
                        },
                        onTouchEnd: function (t) {
                            (this.direction = 0), t.preventDefault();
                        },
                        onEnterVR: function () {
                            const t = this.el.sceneEl.xrSession;
                            t && (t.addEventListener("selectstart", this.onTouchStart), t.addEventListener("selectend", this.onTouchEnd));
                        },
                    });
                },
                185: (t) => {
                    t.exports = AFRAME.registerComponent("trackpad-controls", {
                        schema: {
                            enabled: { default: !0 },
                            enableNegX: { default: !0 },
                            enablePosX: { default: !0 },
                            enableNegZ: { default: !0 },
                            enablePosZ: { default: !0 },
                            mode: { default: "touch", oneOf: ["swipe", "touch", "press"] },
                        },
                        init: function () {
                            (this.dVelocity = new THREE.Vector3()), (this.zVel = 0), (this.xVel = 0), this.bindMethods();
                        },
                        play: function () {
                            this.addEventListeners();
                        },
                        pause: function () {
                            this.removeEventListeners(), this.dVelocity.set(0, 0, 0);
                        },
                        remove: function () {
                            this.pause();
                        },
                        addEventListeners: function () {
                            const t = this.data,
                                e = this.el.sceneEl;
                            switch ((e.addEventListener("axismove", this.onAxisMove), t.mode)) {
                                case "swipe":
                                case "touch":
                                    e.addEventListener("trackpadtouchstart", this.onTouchStart), e.addEventListener("trackpadtouchend", this.onTouchEnd);
                                    break;
                                case "press":
                                    e.addEventListener("trackpaddown", this.onTouchStart), e.addEventListener("trackpadup", this.onTouchEnd);
                            }
                        },
                        removeEventListeners: function () {
                            const t = this.el.sceneEl;
                            t.removeEventListener("axismove", this.onAxisMove),
                                t.removeEventListener("trackpadtouchstart", this.onTouchStart),
                                t.removeEventListener("trackpadtouchend", this.onTouchEnd),
                                t.removeEventListener("trackpaddown", this.onTouchStart),
                                t.removeEventListener("trackpadup", this.onTouchEnd);
                        },
                        isVelocityActive: function () {
                            return this.data.enabled && this.isMoving;
                        },
                        getVelocityDelta: function () {
                            return (this.dVelocity.z = this.isMoving ? -this.zVel : 1), (this.dVelocity.x = this.isMoving ? this.xVel : 1), this.dVelocity.clone();
                        },
                        bindMethods: function () {
                            (this.onTouchStart = this.onTouchStart.bind(this)), (this.onTouchEnd = this.onTouchEnd.bind(this)), (this.onAxisMove = this.onAxisMove.bind(this));
                        },
                        onTouchStart: function (t) {
                            switch (this.data.mode) {
                                case "swipe":
                                    (this.canRecordAxis = !0), (this.startingAxisData = []);
                                    break;
                                case "touch":
                                case "press":
                                    this.isMoving = !0;
                            }
                            t.preventDefault();
                        },
                        onTouchEnd: function (t) {
                            "swipe" == this.data.mode && (this.startingAxisData = []), (this.isMoving = !1), t.preventDefault();
                        },
                        onAxisMove: function (t) {
                            switch (this.data.mode) {
                                case "swipe":
                                    return this.handleSwipeAxis(t);
                                case "touch":
                                case "press":
                                    return this.handleTouchAxis(t);
                            }
                        },
                        handleSwipeAxis: function (t) {
                            const e = this.data,
                                i = t.detail.axis;
                            if ((0 === this.startingAxisData.length && this.canRecordAxis && ((this.canRecordAxis = !1), (this.startingAxisData[0] = i[0]), (this.startingAxisData[1] = i[1])), this.startingAxisData.length > 0)) {
                                let t = 0,
                                    o = 0;
                                e.enableNegX && i[0] < this.startingAxisData[0] && (t = -1),
                                    e.enablePosX && i[0] > this.startingAxisData[0] && (t = 1),
                                    e.enablePosZ && i[1] > this.startingAxisData[1] && (o = -1),
                                    e.enableNegZ && i[1] < this.startingAxisData[1] && (o = 1);
                                const n = Math.abs(this.startingAxisData[1] - i[1]);
                                Math.abs(this.startingAxisData[0] - i[0]) > n ? ((this.zVel = 0), (this.xVel = t), (this.isMoving = !0)) : ((this.xVel = 0), (this.zVel = o), (this.isMoving = !0));
                            }
                        },
                        handleTouchAxis: function (t) {
                            const e = this.data,
                                i = t.detail.axis;
                            let o = 0,
                                n = 0;
                            e.enableNegX && i[0] < 0 && (o = -1),
                                e.enablePosX && i[0] > 0 && (o = 1),
                                e.enablePosZ && i[1] > 0 && (n = -1),
                                e.enableNegZ && i[1] < 0 && (n = 1),
                                Math.abs(i[0]) > Math.abs(i[1]) ? ((this.zVel = 0), (this.xVel = o)) : ((this.xVel = 0), (this.zVel = n));
                        },
                    });
                },
            },
            e = {};
        function i(o) {
            var n = e[o];
            if (void 0 !== n) return n.exports;
            var s = (e[o] = { exports: {} });
            return t[o](s, s.exports, i), s.exports;
        }
        return (
            (i.n = (t) => {
                var e = t && t.__esModule ? () => t.default : () => t;
                return i.d(e, { a: e }), e;
            }),
            (i.d = (t, e) => {
                for (var o in e) i.o(e, o) && !i.o(t, o) && Object.defineProperty(t, o, { enumerable: !0, get: e[o] });
            }),
            (i.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
            (i.r = (t) => {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
            }),
            i(659),
            i(793),
            i(573),
            i(6),
            i(696),
            i(185),
            i(164),
            {}
        );
    })()
);
//# sourceMappingURL=aframe-extras.controls.min.js.map
