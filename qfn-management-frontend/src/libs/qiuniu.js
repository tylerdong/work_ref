const QPlayer= function () {
  "use strict";
  var n = function (e, t) {
    return (n = Object.setPrototypeOf || {
        __proto__: []
      }
      instanceof Array && function (e, t) {
        e.__proto__ = t
      } || function (e, t) {
        for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
      })(e, t)
  };

  function t(e, t) {
    function r() {
      this.constructor = e
    }
    n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
  }
  var a = function () {
    return (a = Object.assign || function (e) {
      for (var t, r = 1, n = arguments.length; r < n; r++)
        for (var i in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
      return e
    }).apply(this, arguments)
  };

  function i(a, o, s, l) {
    return new(s || (s = Promise))(function (e, t) {
      function r(e) {
        try {
          i(l.next(e))
        } catch (e) {
          t(e)
        }
      }

      function n(e) {
        try {
          i(l.throw(e))
        } catch (e) {
          t(e)
        }
      }

      function i(t) {
        t.done ? e(t.value) : new s(function (e) {
          e(t.value)
        }).then(r, n)
      }
      i((l = l.apply(a, o || [])).next())
    })
  }

  function u(r, n) {
    var i, a, o, e, s = {
      label: 0,
      sent: function () {
        if (1 & o[0]) throw o[1];
        return o[1]
      },
      trys: [],
      ops: []
    };
    return e = {
      next: t(0),
      throw: t(1),
      return: t(2)
    }, "function" == typeof Symbol && (e[Symbol.iterator] = function () {
      return this
    }), e;

    function t(t) {
      return function (e) {
        return function (t) {
          if (i) throw new TypeError("Generator is already executing.");
          for (; s;) try {
            if (i = 1, a && (o = 2 & t[0] ? a.return : t[0] ? a.throw || ((o = a.return) && o.call(a), 0) : a.next) && !(o = o.call(a, t[1])).done) return o;
            switch (a = 0, o && (t = [2 & t[0], o.value]), t[0]) {
              case 0:
              case 1:
                o = t;
                break;
              case 4:
                return s.label++, {
                  value: t[1],
                  done: !1
                };
              case 5:
                s.label++, a = t[1], t = [0];
                continue;
              case 7:
                t = s.ops.pop(), s.trys.pop();
                continue;
              default:
                if (!(o = 0 < (o = s.trys).length && o[o.length - 1]) && (6 === t[0] || 2 === t[0])) {
                  s = 0;
                  continue
                }
                if (3 === t[0] && (!o || t[1] > o[0] && t[1] < o[3])) {
                  s.label = t[1];
                  break
                }
                if (6 === t[0] && s.label < o[1]) {
                  s.label = o[1], o = t;
                  break
                }
                if (o && s.label < o[2]) {
                  s.label = o[2], s.ops.push(t);
                  break
                }
                o[2] && s.ops.pop(), s.trys.pop();
                continue
            }
            t = n.call(r, s)
          } catch (e) {
            t = [6, e], a = 0
          } finally {
            i = o = 0
          }
          if (5 & t[0]) throw t[1];
          return {
            value: t[0] ? t[1] : void 0,
            done: !0
          }
        }([t, e])
      }
    }
  }! function (n) {
    function t(e, t) {
      var r = n.createEvent("Event");
      r.initEvent(e, !0, !1), t.dispatchEvent(r)
    }

    function r(e) {
      return function (t, r) {
        return e !== o.exit || n[i.element] ? (n.addEventListener(i.events.change, function e() {
          t(), n.removeEventListener(i.events.change, e, !1)
        }, !1), void n.addEventListener(i.events.error, function e() {
          r(new TypeError), n.removeEventListener(i.events.error, e, !1)
        }, !1)) : void setTimeout(function () {
          r(new TypeError)
        }, 1)
      }
    }
    var i, e, a = {
        w3: {
          enabled: "fullscreenEnabled",
          element: "fullscreenElement",
          request: "requestFullscreen",
          exit: "exitFullscreen",
          events: {
            change: "fullscreenchange",
            error: "fullscreenerror"
          }
        },
        webkit: {
          enabled: "webkitFullscreenEnabled",
          element: "webkitCurrentFullScreenElement",
          request: "webkitRequestFullscreen",
          exit: "webkitExitFullscreen",
          events: {
            change: "webkitfullscreenchange",
            error: "webkitfullscreenerror"
          }
        },
        moz: {
          enabled: "mozFullScreenEnabled",
          element: "mozFullScreenElement",
          request: "mozRequestFullScreen",
          exit: "mozCancelFullScreen",
          events: {
            change: "mozfullscreenchange",
            error: "mozfullscreenerror"
          }
        },
        ms: {
          enabled: "msFullscreenEnabled",
          element: "msFullscreenElement",
          request: "msRequestFullscreen",
          exit: "msExitFullscreen",
          events: {
            change: "MSFullscreenChange",
            error: "MSFullscreenError"
          }
        }
      },
      o = a.w3;
    for (e in a)
      if (a[e].enabled in n) {
        i = a[e];
        break
      } o.enabled in n || !i || (n.addEventListener(i.events.change, function (e) {
      e.stopPropagation(), e.stopImmediatePropagation(), n[o.enabled] = n[i.enabled], n[o.element] = n[i.element], t(o.events.change, e.target)
    }, !1), n.addEventListener(i.events.error, function (e) {
      t(o.events.error, e.target)
    }, !1), n[o.enabled] = n[i.enabled], n[o.element] = n[i.element], n[o.exit] = function () {
      var e = n[i.exit]();
      return !e && Promise ? new Promise(r(o.exit)) : e
    }, Element.prototype[o.request] = function () {
      var e = this[i.request].apply(this, arguments);
      return !e && Promise ? new Promise(r(o.request)) : e
    })
  }(document);
  "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;

  function e(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
  }

  function r(e, t) {
    return e(t = {
      exports: {}
    }, t.exports), t.exports
  }
  e(r(function (e, t) {
    ! function (s) {
      var l = {
        searchParams: "URLSearchParams" in self,
        iterable: "Symbol" in self && "iterator" in Symbol,
        blob: "FileReader" in self && "Blob" in self && function () {
          try {
            return new Blob, !0
          } catch (e) {
            return !1
          }
        }(),
        formData: "FormData" in self,
        arrayBuffer: "ArrayBuffer" in self
      };
      if (l.arrayBuffer) var t = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
        r = ArrayBuffer.isView || function (e) {
          return e && -1 < t.indexOf(Object.prototype.toString.call(e))
        };

      function n(e) {
        if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");
        return e.toLowerCase()
      }

      function i(e) {
        return "string" != typeof e && (e = String(e)), e
      }

      function e(t) {
        var e = {
          next: function () {
            var e = t.shift();
            return {
              done: void 0 === e,
              value: e
            }
          }
        };
        return l.iterable && (e[Symbol.iterator] = function () {
          return e
        }), e
      }

      function u(t) {
        this.map = {}, t instanceof u ? t.forEach(function (e, t) {
          this.append(t, e)
        }, this) : Array.isArray(t) ? t.forEach(function (e) {
          this.append(e[0], e[1])
        }, this) : t && Object.getOwnPropertyNames(t).forEach(function (e) {
          this.append(e, t[e])
        }, this)
      }

      function a(e) {
        if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
        e.bodyUsed = !0
      }

      function o(r) {
        return new Promise(function (e, t) {
          r.onload = function () {
            e(r.result)
          }, r.onerror = function () {
            t(r.error)
          }
        })
      }

      function d(e) {
        var t = new FileReader,
          r = o(t);
        return t.readAsArrayBuffer(e), r
      }

      function c(e) {
        if (e.slice) return e.slice(0);
        var t = new Uint8Array(e.byteLength);
        return t.set(new Uint8Array(e)), t.buffer
      }

      function f() {
        return this.bodyUsed = !1, this._initBody = function (e) {
          var t;
          (this._bodyInit = e) ? "string" == typeof e ? this._bodyText = e : l.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : l.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : l.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : l.arrayBuffer && l.blob && (t = e) && DataView.prototype.isPrototypeOf(t) ? (this._bodyArrayBuffer = c(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : l.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || r(e)) ? this._bodyArrayBuffer = c(e) : this._bodyText = e = Object.prototype.toString.call(e): this._bodyText = "", this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : l.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
        }, l.blob && (this.blob = function () {
          var e = a(this);
          if (e) return e;
          if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
          if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          if (this._bodyFormData) throw new Error("could not read FormData body as blob");
          return Promise.resolve(new Blob([this._bodyText]))
        }, this.arrayBuffer = function () {
          return this._bodyArrayBuffer ? a(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(d)
        }), this.text = function () {
          var e, t, r, n = a(this);
          if (n) return n;
          if (this._bodyBlob) return e = this._bodyBlob, t = new FileReader, r = o(t), t.readAsText(e), r;
          if (this._bodyArrayBuffer) return Promise.resolve(function (e) {
            for (var t = new Uint8Array(e), r = new Array(t.length), n = 0; n < t.length; n++) r[n] = String.fromCharCode(t[n]);
            return r.join("")
          }(this._bodyArrayBuffer));
          if (this._bodyFormData) throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText)
        }, l.formData && (this.formData = function () {
          return this.text().then(g)
        }), this.json = function () {
          return this.text().then(JSON.parse)
        }, this
      }
      u.prototype.append = function (e, t) {
        e = n(e), t = i(t);
        var r = this.map[e];
        this.map[e] = r ? r + ", " + t : t
      }, u.prototype.delete = function (e) {
        delete this.map[n(e)]
      }, u.prototype.get = function (e) {
        return e = n(e), this.has(e) ? this.map[e] : null
      }, u.prototype.has = function (e) {
        return this.map.hasOwnProperty(n(e))
      }, u.prototype.set = function (e, t) {
        this.map[n(e)] = i(t)
      }, u.prototype.forEach = function (e, t) {
        for (var r in this.map) this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this)
      }, u.prototype.keys = function () {
        var r = [];
        return this.forEach(function (e, t) {
          r.push(t)
        }), e(r)
      }, u.prototype.values = function () {
        var t = [];
        return this.forEach(function (e) {
          t.push(e)
        }), e(t)
      }, u.prototype.entries = function () {
        var r = [];
        return this.forEach(function (e, t) {
          r.push([t, e])
        }), e(r)
      }, l.iterable && (u.prototype[Symbol.iterator] = u.prototype.entries);
      var p = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];

      function h(e, t) {
        var r, n, i = (t = t || {}).body;
        if (e instanceof h) {
          if (e.bodyUsed) throw new TypeError("Already read");
          this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new u(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, i || null == e._bodyInit || (i = e._bodyInit, e.bodyUsed = !0)
        } else this.url = String(e);
        if (this.credentials = t.credentials || this.credentials || "same-origin", !t.headers && this.headers || (this.headers = new u(t.headers)), this.method = (r = t.method || this.method || "GET", n = r.toUpperCase(), -1 < p.indexOf(n) ? n : r), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && i) throw new TypeError("Body not allowed for GET or HEAD requests");
        this._initBody(i)
      }

      function g(e) {
        var i = new FormData;
        return e.trim().split("&").forEach(function (e) {
          if (e) {
            var t = e.split("="),
              r = t.shift().replace(/\+/g, " "),
              n = t.join("=").replace(/\+/g, " ");
            i.append(decodeURIComponent(r), decodeURIComponent(n))
          }
        }), i
      }

      function y(e, t) {
        t || (t = {}), this.type = "default", this.status = void 0 === t.status ? 200 : t.status, this.ok = 200 <= this.status && this.status < 300, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new u(t.headers), this.url = t.url || "", this._initBody(e)
      }
      h.prototype.clone = function () {
        return new h(this, {
          body: this._bodyInit
        })
      }, f.call(h.prototype), f.call(y.prototype), y.prototype.clone = function () {
        return new y(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new u(this.headers),
          url: this.url
        })
      }, y.error = function () {
        var e = new y(null, {
          status: 0,
          statusText: ""
        });
        return e.type = "error", e
      };
      var m = [301, 302, 303, 307, 308];
      y.redirect = function (e, t) {
        if (-1 === m.indexOf(t)) throw new RangeError("Invalid status code");
        return new y(null, {
          status: t,
          headers: {
            location: e
          }
        })
      }, s.DOMException = self.DOMException;
      try {
        new s.DOMException
      } catch (e) {
        s.DOMException = function (e, t) {
          this.message = e, this.name = t;
          var r = Error(e);
          this.stack = r.stack
        }, s.DOMException.prototype = Object.create(Error.prototype), s.DOMException.prototype.constructor = s.DOMException
      }

      function v(i, o) {
        return new Promise(function (n, e) {
          var t = new h(i, o);
          if (t.signal && t.signal.aborted) return e(new s.DOMException("Aborted", "AbortError"));
          var a = new XMLHttpRequest;

          function r() {
            a.abort()
          }
          a.onload = function () {
            var e, i, t = {
              status: a.status,
              statusText: a.statusText,
              headers: (e = a.getAllResponseHeaders() || "", i = new u, e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function (e) {
                var t = e.split(":"),
                  r = t.shift().trim();
                if (r) {
                  var n = t.join(":").trim();
                  i.append(r, n)
                }
              }), i)
            };
            t.url = "responseURL" in a ? a.responseURL : t.headers.get("X-Request-URL");
            var r = "response" in a ? a.response : a.responseText;
            n(new y(r, t))
          }, a.onerror = function () {
            e(new TypeError("Network request failed"))
          }, a.ontimeout = function () {
            e(new TypeError("Network request failed"))
          }, a.onabort = function () {
            e(new s.DOMException("Aborted", "AbortError"))
          }, a.open(t.method, t.url, !0), "include" === t.credentials ? a.withCredentials = !0 : "omit" === t.credentials && (a.withCredentials = !1), "responseType" in a && l.blob && (a.responseType = "blob"), t.headers.forEach(function (e, t) {
            a.setRequestHeader(t, e)
          }), t.signal && (t.signal.addEventListener("abort", r), a.onreadystatechange = function () {
            4 === a.readyState && t.signal.removeEventListener("abort", r)
          }), a.send(void 0 === t._bodyInit ? null : t._bodyInit)
        })
      }
      v.polyfill = !0, self.fetch || (self.fetch = v, self.Headers = u, self.Request = h, self.Response = y), s.Headers = u, s.Request = h, s.Response = y, s.fetch = v, Object.defineProperty(s, "__esModule", {
        value: !0
      })
    }(t)
  }));
  var s, o, l, d, c = r(function (e, t) {
      "undefined" != typeof window && (e.exports = function (r) {
        var n = {};

        function i(e) {
          if (n[e]) return n[e].exports;
          var t = n[e] = {
            i: e,
            l: !1,
            exports: {}
          };
          return r[e].call(t.exports, t, t.exports, i), t.l = !0, t.exports
        }
        return i.m = r, i.c = n, i.d = function (e, t, r) {
          i.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
          })
        }, i.r = function (e) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
          }), Object.defineProperty(e, "__esModule", {
            value: !0
          })
        }, i.t = function (t, e) {
          if (1 & e && (t = i(t)), 8 & e) return t;
          if (4 & e && "object" == typeof t && t && t.__esModule) return t;
          var r = Object.create(null);
          if (i.r(r), Object.defineProperty(r, "default", {
              enumerable: !0,
              value: t
            }), 2 & e && "string" != typeof t)
            for (var n in t) i.d(r, n, function (e) {
              return t[e]
            }.bind(null, n));
          return r
        }, i.n = function (e) {
          var t = e && e.__esModule ? function () {
            return e.default
          } : function () {
            return e
          };
          return i.d(t, "a", t), t
        }, i.o = function (e, t) {
          return Object.prototype.hasOwnProperty.call(e, t)
        }, i.p = "/dist/", i(i.s = 24)
      }([function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var n = r(6);

        function o() {}
        var i = {
            trace: o,
            debug: o,
            log: o,
            warn: o,
            info: o,
            error: o
          },
          s = i,
          l = n.getSelfScope();
        t.enableLogs = function (e) {
          if (!0 === e || "object" == typeof e) {
            ! function (t) {
              for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
              e.forEach(function (e) {
                var i, a;
                s[e] = t[e] ? t[e].bind(t) : (i = e, (a = l.console[i]) ? function () {
                  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                  var r, n;
                  e[0] && (e[0] = (r = i, n = e[0], n = "[" + r + "] > " + n)), a.apply(l.console, e)
                } : o)
              })
            }(e, "debug", "log", "info", "warn", "error");
            try {
              s.log()
            } catch (e) {
              s = i
            }
          } else s = i
        }, t.logger = s
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.default = {
          MEDIA_ATTACHING: "hlsMediaAttaching",
          MEDIA_ATTACHED: "hlsMediaAttached",
          MEDIA_DETACHING: "hlsMediaDetaching",
          MEDIA_DETACHED: "hlsMediaDetached",
          BUFFER_RESET: "hlsBufferReset",
          BUFFER_CODECS: "hlsBufferCodecs",
          BUFFER_CREATED: "hlsBufferCreated",
          BUFFER_APPENDING: "hlsBufferAppending",
          BUFFER_APPENDED: "hlsBufferAppended",
          BUFFER_EOS: "hlsBufferEos",
          BUFFER_FLUSHING: "hlsBufferFlushing",
          BUFFER_FLUSHED: "hlsBufferFlushed",
          MANIFEST_LOADING: "hlsManifestLoading",
          MANIFEST_LOADED: "hlsManifestLoaded",
          MANIFEST_PARSED: "hlsManifestParsed",
          LEVEL_SWITCHING: "hlsLevelSwitching",
          LEVEL_SWITCHED: "hlsLevelSwitched",
          LEVEL_LOADING: "hlsLevelLoading",
          LEVEL_LOADED: "hlsLevelLoaded",
          LEVEL_UPDATED: "hlsLevelUpdated",
          LEVEL_PTS_UPDATED: "hlsLevelPtsUpdated",
          AUDIO_TRACKS_UPDATED: "hlsAudioTracksUpdated",
          AUDIO_TRACK_SWITCHING: "hlsAudioTrackSwitching",
          AUDIO_TRACK_SWITCHED: "hlsAudioTrackSwitched",
          AUDIO_TRACK_LOADING: "hlsAudioTrackLoading",
          AUDIO_TRACK_LOADED: "hlsAudioTrackLoaded",
          SUBTITLE_TRACKS_UPDATED: "hlsSubtitleTracksUpdated",
          SUBTITLE_TRACK_SWITCH: "hlsSubtitleTrackSwitch",
          SUBTITLE_TRACK_LOADING: "hlsSubtitleTrackLoading",
          SUBTITLE_TRACK_LOADED: "hlsSubtitleTrackLoaded",
          SUBTITLE_FRAG_PROCESSED: "hlsSubtitleFragProcessed",
          INIT_PTS_FOUND: "hlsInitPtsFound",
          FRAG_LOADING: "hlsFragLoading",
          FRAG_LOAD_PROGRESS: "hlsFragLoadProgress",
          FRAG_LOAD_EMERGENCY_ABORTED: "hlsFragLoadEmergencyAborted",
          FRAG_LOADED: "hlsFragLoaded",
          FRAG_DECRYPTED: "hlsFragDecrypted",
          FRAG_PARSING_INIT_SEGMENT: "hlsFragParsingInitSegment",
          FRAG_PARSING_USERDATA: "hlsFragParsingUserdata",
          FRAG_PARSING_METADATA: "hlsFragParsingMetadata",
          FRAG_PARSING_DATA: "hlsFragParsingData",
          FRAG_PARSED: "hlsFragParsed",
          FRAG_BUFFERED: "hlsFragBuffered",
          FRAG_CHANGED: "hlsFragChanged",
          FPS_DROP: "hlsFpsDrop",
          FPS_DROP_LEVEL_CAPPING: "hlsFpsDropLevelCapping",
          ERROR: "hlsError",
          DESTROYING: "hlsDestroying",
          KEY_LOADING: "hlsKeyLoading",
          KEY_LOADED: "hlsKeyLoaded",
          STREAM_STATE_TRANSITION: "hlsStreamStateTransition"
        }
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var n = r(6).getSelfScope().Number;
        (t.Number = n).isFinite = n.isFinite || function (e) {
          return "number" == typeof e && isFinite(e)
        }
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.ErrorTypes = {
          NETWORK_ERROR: "networkError",
          MEDIA_ERROR: "mediaError",
          KEY_SYSTEM_ERROR: "keySystemError",
          MUX_ERROR: "muxError",
          OTHER_ERROR: "otherError"
        }, t.ErrorDetails = {
          KEY_SYSTEM_NO_KEYS: "keySystemNoKeys",
          KEY_SYSTEM_NO_ACCESS: "keySystemNoAccess",
          KEY_SYSTEM_NO_SESSION: "keySystemNoSession",
          KEY_SYSTEM_LICENSE_REQUEST_FAILED: "keySystemLicenseRequestFailed",
          MANIFEST_LOAD_ERROR: "manifestLoadError",
          MANIFEST_LOAD_TIMEOUT: "manifestLoadTimeOut",
          MANIFEST_PARSING_ERROR: "manifestParsingError",
          MANIFEST_INCOMPATIBLE_CODECS_ERROR: "manifestIncompatibleCodecsError",
          LEVEL_LOAD_ERROR: "levelLoadError",
          LEVEL_LOAD_TIMEOUT: "levelLoadTimeOut",
          LEVEL_SWITCH_ERROR: "levelSwitchError",
          AUDIO_TRACK_LOAD_ERROR: "audioTrackLoadError",
          AUDIO_TRACK_LOAD_TIMEOUT: "audioTrackLoadTimeOut",
          FRAG_LOAD_ERROR: "fragLoadError",
          FRAG_LOAD_TIMEOUT: "fragLoadTimeOut",
          FRAG_DECRYPT_ERROR: "fragDecryptError",
          FRAG_PARSING_ERROR: "fragParsingError",
          REMUX_ALLOC_ERROR: "remuxAllocError",
          KEY_LOAD_ERROR: "keyLoadError",
          KEY_LOAD_TIMEOUT: "keyLoadTimeOut",
          BUFFER_ADD_CODEC_ERROR: "bufferAddCodecError",
          BUFFER_APPEND_ERROR: "bufferAppendError",
          BUFFER_APPENDING_ERROR: "bufferAppendingError",
          BUFFER_STALLED_ERROR: "bufferStalledError",
          BUFFER_FULL_ERROR: "bufferFullError",
          BUFFER_SEEK_OVER_HOLE: "bufferSeekOverHole",
          BUFFER_NUDGE_ON_STALL: "bufferNudgeOnStall",
          INTERNAL_EXCEPTION: "internalException"
        }
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var n = r(0),
          i = r(3),
          a = r(1),
          o = {
            hlsEventGeneric: !0,
            hlsHandlerDestroying: !0,
            hlsHandlerDestroyed: !0
          },
          s = function () {
            function e(e) {
              for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
              this.hls = e, this.onEvent = this.onEvent.bind(this), this.handledEvents = t, this.useGenericHandler = !0, this.registerListeners()
            }
            return e.prototype.destroy = function () {
              this.onHandlerDestroying(), this.unregisterListeners(), this.onHandlerDestroyed()
            }, e.prototype.onHandlerDestroying = function () {}, e.prototype.onHandlerDestroyed = function () {}, e.prototype.isEventHandler = function () {
              return "object" == typeof this.handledEvents && this.handledEvents.length && "function" == typeof this.onEvent
            }, e.prototype.registerListeners = function () {
              this.isEventHandler() && this.handledEvents.forEach(function (e) {
                if (o[e]) throw new Error("Forbidden event-name: " + e);
                this.hls.on(e, this.onEvent)
              }, this)
            }, e.prototype.unregisterListeners = function () {
              this.isEventHandler() && this.handledEvents.forEach(function (e) {
                this.hls.off(e, this.onEvent)
              }, this)
            }, e.prototype.onEvent = function (e, t) {
              this.onEventGeneric(e, t)
            }, e.prototype.onEventGeneric = function (e, t) {
              try {
                (function (e, t) {
                  var r = "on" + e.replace("hls", "");
                  if ("function" != typeof this[r]) throw new Error("Event " + e + " has no generic handler in this " + this.constructor.name + " class (tried " + r + ")");
                  return this[r].bind(this, t)
                }).call(this, e, t).call()
              } catch (t) {
                n.logger.error("An internal error happened while handling event " + e + '. Error message: "' + t.message + '". Here is a stacktrace:', t), this.hls.trigger(a.default.ERROR, {
                  type: i.ErrorTypes.OTHER_ERROR,
                  details: i.ErrorDetails.INTERNAL_EXCEPTION,
                  fatal: !1,
                  event: e,
                  err: t
                })
              }
            }, e
          }();
        t.default = s
      }, function (e, t) {
        e.exports = void 0
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.getSelfScope = function () {
          return "undefined" == typeof window ? self : window
        }
      }, function (e, t, r) {
        var n, d, i, a, c;
        n = /^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/?#]*)?((?:[^\/\?#]*\/)*.*?)??(;.*?)?(\?.*?)?(#.*?)?$/, d = /^([^\/?#]*)(.*)$/, i = /(?:\/|^)\.(?=\/)/g, a = /(?:\/|^)\.\.\/(?!\.\.\/).*?(?=\/)/g, c = {
          buildAbsoluteURL: function (e, t, r) {
            if (r = r || {}, e = e.trim(), !(t = t.trim())) {
              if (!r.alwaysNormalize) return e;
              var n = c.parseURL(e);
              if (!n) throw new Error("Error trying to parse base URL.");
              return n.path = c.normalizePath(n.path), c.buildURLFromParts(n)
            }
            var i = c.parseURL(t);
            if (!i) throw new Error("Error trying to parse relative URL.");
            if (i.scheme) return r.alwaysNormalize ? (i.path = c.normalizePath(i.path), c.buildURLFromParts(i)) : t;
            var a = c.parseURL(e);
            if (!a) throw new Error("Error trying to parse base URL.");
            if (!a.netLoc && a.path && "/" !== a.path[0]) {
              var o = d.exec(a.path);
              a.netLoc = o[1], a.path = o[2]
            }
            a.netLoc && !a.path && (a.path = "/");
            var s = {
              scheme: a.scheme,
              netLoc: i.netLoc,
              path: null,
              params: i.params,
              query: i.query,
              fragment: i.fragment
            };
            if (!i.netLoc && (s.netLoc = a.netLoc, "/" !== i.path[0]))
              if (i.path) {
                var l = a.path,
                  u = l.substring(0, l.lastIndexOf("/") + 1) + i.path;
                s.path = c.normalizePath(u)
              } else s.path = a.path, i.params || (s.params = a.params, i.query || (s.query = a.query));
            return null === s.path && (s.path = r.alwaysNormalize ? c.normalizePath(i.path) : i.path), c.buildURLFromParts(s)
          },
          parseURL: function (e) {
            var t = n.exec(e);
            return t ? {
              scheme: t[1] || "",
              netLoc: t[2] || "",
              path: t[3] || "",
              params: t[4] || "",
              query: t[5] || "",
              fragment: t[6] || ""
            } : null
          },
          normalizePath: function (e) {
            for (e = e.split("").reverse().join("").replace(i, ""); e.length !== (e = e.replace(a, "")).length;);
            return e.split("").reverse().join("")
          },
          buildURLFromParts: function (e) {
            return e.scheme + e.netLoc + e.path + e.params + e.query + e.fragment
          }
        }, e.exports = c
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var n = function () {
          function e() {}
          return e.isBuffered = function (e, t) {
            try {
              if (e)
                for (var r = e.buffered, n = 0; n < r.length; n++)
                  if (t >= r.start(n) && t <= r.end(n)) return !0
            } catch (e) {}
            return !1
          }, e.bufferInfo = function (e, t, r) {
            try {
              if (e) {
                var n = e.buffered,
                  i = [],
                  a = void 0;
                for (a = 0; a < n.length; a++) i.push({
                  start: n.start(a),
                  end: n.end(a)
                });
                return this.bufferedInfo(i, t, r)
              }
            } catch (e) {}
            return {
              len: 0,
              start: t,
              end: t,
              nextStart: void 0
            }
          }, e.bufferedInfo = function (e, t, r) {
            var n, i, a, o, s, l = [];
            for (e.sort(function (e, t) {
                var r = e.start - t.start;
                return r || t.end - e.end
              }), s = 0; s < e.length; s++) {
              var u = l.length;
              if (u) {
                var d = l[u - 1].end;
                e[s].start - d < r ? e[s].end > d && (l[u - 1].end = e[s].end) : l.push(e[s])
              } else l.push(e[s])
            }
            for (n = s = 0, i = a = t; s < l.length; s++) {
              var c = l[s].start,
                f = l[s].end;
              if (c <= t + r && t < f) i = c, n = (a = f) - t;
              else if (t + r < c) {
                o = c;
                break
              }
            }
            return {
              len: n,
              start: i,
              end: a,
              nextStart: o
            }
          }, e
        }();
        t.BufferHelper = n
      }, function (e, s, r) {
        (function (n) {
          var i, t = this && this.__extends || (i = Object.setPrototypeOf || {
              __proto__: []
            }
            instanceof Array && function (e, t) {
              e.__proto__ = t
            } || function (e, t) {
              for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function (e, t) {
              function r() {
                this.constructor = e
              }
              i(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            });
          Object.defineProperty(s, "__esModule", {
            value: !0
          });
          var a = r(4),
            o = r(1);
          s.FragmentState = {
            NOT_LOADED: "NOT_LOADED",
            APPENDING: "APPENDING",
            PARTIAL: "PARTIAL",
            OK: "OK"
          };
          var e = function (r) {
            function e(e) {
              var t = r.call(this, e, o.default.BUFFER_APPENDED, o.default.FRAG_BUFFERED, o.default.FRAG_LOADED) || this;
              return t.bufferPadding = .2, t.fragments = Object.create(null), t.timeRanges = Object.create(null), t.config = e.config, t
            }
            return t(e, r), e.prototype.destroy = function () {
              this.fragments = null, this.timeRanges = null, this.config = null, a.default.prototype.destroy.call(this), r.prototype.destroy.call(this)
            }, e.prototype.getBufferedFrag = function (n, i) {
              var a = this.fragments,
                e = Object.keys(a).filter(function (e) {
                  var t = a[e];
                  if (t.body.type !== i) return !1;
                  if (!t.buffered) return !1;
                  var r = t.body;
                  return r.startPTS <= n && n <= r.endPTS
                });
              if (0 === e.length) return null;
              var t = e.pop();
              return a[t].body
            }, e.prototype.detectEvictedFragments = function (i, a) {
              var o, s, l = this;
              Object.keys(this.fragments).forEach(function (e) {
                var t = l.fragments[e];
                if (!0 === t.buffered) {
                  var r = t.range[i];
                  if (r) {
                    o = r.time;
                    for (var n = 0; n < o.length; n++)
                      if (s = o[n], !1 === l.isTimeBuffered(s.startPTS, s.endPTS, a)) {
                        l.removeFragment(t.body);
                        break
                      }
                  }
                }
              })
            }, e.prototype.detectPartialFragments = function (r) {
              var n = this,
                e = this.getFragmentKey(r),
                i = this.fragments[e];
              i && (i.buffered = !0, Object.keys(this.timeRanges).forEach(function (e) {
                if (r.hasElementaryStream(e)) {
                  var t = n.timeRanges[e];
                  i.range[e] = n.getBufferedTimes(r.startPTS, r.endPTS, t)
                }
              }))
            }, e.prototype.getBufferedTimes = function (e, t, r) {
              for (var n, i, a = [], o = !1, s = 0; s < r.length; s++) {
                if (n = r.start(s) - this.bufferPadding, i = r.end(s) + this.bufferPadding, n <= e && t <= i) {
                  a.push({
                    startPTS: Math.max(e, r.start(s)),
                    endPTS: Math.min(t, r.end(s))
                  });
                  break
                }
                if (e < i && n < t) a.push({
                  startPTS: Math.max(e, r.start(s)),
                  endPTS: Math.min(t, r.end(s))
                }), o = !0;
                else if (t <= n) break
              }
              return {
                time: a,
                partial: o
              }
            }, e.prototype.getFragmentKey = function (e) {
              return e.type + "_" + e.level + "_" + e.urlId + "_" + e.sn
            }, e.prototype.getPartialFragment = function (r) {
              var n, i, a, o = this,
                s = null,
                l = 0;
              return Object.keys(this.fragments).forEach(function (e) {
                var t = o.fragments[e];
                o.isPartial(t) && (i = t.body.startPTS - o.bufferPadding, a = t.body.endPTS + o.bufferPadding, i <= r && r <= a && (n = Math.min(r - i, a - r), l <= n && (s = t.body, l = n)))
              }), s
            }, e.prototype.getState = function (e) {
              var t = this.getFragmentKey(e),
                r = this.fragments[t],
                n = s.FragmentState.NOT_LOADED;
              return void 0 !== r && (n = r.buffered ? !0 === this.isPartial(r) ? s.FragmentState.PARTIAL : s.FragmentState.OK : s.FragmentState.APPENDING), n
            }, e.prototype.isPartial = function (e) {
              return !0 === e.buffered && (void 0 !== e.range.video && !0 === e.range.video.partial || void 0 !== e.range.audio && !0 === e.range.audio.partial)
            }, e.prototype.isTimeBuffered = function (e, t, r) {
              for (var n, i, a = 0; a < r.length; a++) {
                if (n = r.start(a) - this.bufferPadding, i = r.end(a) + this.bufferPadding, n <= e && t <= i) return !0;
                if (t <= n) return !1
              }
              return !1
            }, e.prototype.onFragLoaded = function (e) {
              var t = e.frag;
              n.isFinite(t.sn) && !t.bitrateTest && (this.fragments[this.getFragmentKey(t)] = {
                body: t,
                range: Object.create(null),
                buffered: !1
              })
            }, e.prototype.onBufferAppended = function (e) {
              var r = this;
              this.timeRanges = e.timeRanges, Object.keys(this.timeRanges).forEach(function (e) {
                var t = r.timeRanges[e];
                r.detectEvictedFragments(e, t)
              })
            }, e.prototype.onFragBuffered = function (e) {
              this.detectPartialFragments(e.frag)
            }, e.prototype.hasFragment = function (e) {
              var t = this.getFragmentKey(e);
              return void 0 !== this.fragments[t]
            }, e.prototype.removeFragment = function (e) {
              var t = this.getFragmentKey(e);
              delete this.fragments[t]
            }, e.prototype.removeAllFragments = function () {
              this.fragments = Object.create(null)
            }, e
          }(a.default);
          s.FragmentTracker = e
        }).call(this, r(2).Number)
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.default = {
          search: function (e, t) {
            for (var r = 0, n = e.length - 1, i = null, a = null; r <= n;) {
              var o = t(a = e[i = (r + n) / 2 | 0]);
              if (0 < o) r = i + 1;
              else {
                if (!(o < 0)) return a;
                n = i - 1
              }
            }
            return null
          }
        }
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var n = function () {
            function s() {}
            return s.isHeader = function (e, t) {
              return t + 10 <= e.length && 73 === e[t] && 68 === e[t + 1] && 51 === e[t + 2] && e[t + 3] < 255 && e[t + 4] < 255 && e[t + 6] < 128 && e[t + 7] < 128 && e[t + 8] < 128 && e[t + 9] < 128
            }, s.isFooter = function (e, t) {
              return t + 10 <= e.length && 51 === e[t] && 68 === e[t + 1] && 73 === e[t + 2] && e[t + 3] < 255 && e[t + 4] < 255 && e[t + 6] < 128 && e[t + 7] < 128 && e[t + 8] < 128 && e[t + 9] < 128
            }, s.getID3Data = function (e, t) {
              for (var r = t, n = 0; s.isHeader(e, t);) n += 10, n += s._readSize(e, t + 6), s.isFooter(e, t + 10) && (n += 10), t += n;
              if (0 < n) return e.subarray(r, r + n)
            }, s._readSize = function (e, t) {
              var r = 0;
              return r = (127 & e[t]) << 21, r |= (127 & e[t + 1]) << 14, r |= (127 & e[t + 2]) << 7, r |= 127 & e[t + 3]
            }, s.getTimeStamp = function (e) {
              for (var t = s.getID3Frames(e), r = 0; r < t.length; r++) {
                var n = t[r];
                if (s.isTimeStampFrame(n)) return s._readTimeStamp(n)
              }
            }, s.isTimeStampFrame = function (e) {
              return e && "PRIV" === e.key && "com.apple.streaming.transportStreamTimestamp" === e.info
            }, s._getFrameData = function (e) {
              var t = String.fromCharCode(e[0], e[1], e[2], e[3]),
                r = s._readSize(e, 4);
              return {
                type: t,
                size: r,
                data: e.subarray(10, 10 + r)
              }
            }, s.getID3Frames = function (e) {
              for (var t = 0, r = []; s.isHeader(e, t);) {
                for (var n = s._readSize(e, t + 6), i = (t += 10) + n; t + 8 < i;) {
                  var a = s._getFrameData(e.subarray(t)),
                    o = s._decodeFrame(a);
                  o && r.push(o), t += a.size + 10
                }
                s.isFooter(e, t) && (t += 10)
              }
              return r
            }, s._decodeFrame = function (e) {
              return "PRIV" === e.type ? s._decodePrivFrame(e) : "T" === e.type[0] ? s._decodeTextFrame(e) : "W" === e.type[0] ? s._decodeURLFrame(e) : void 0
            }, s._readTimeStamp = function (e) {
              if (8 === e.data.byteLength) {
                var t = new Uint8Array(e.data),
                  r = 1 & t[3],
                  n = (t[4] << 23) + (t[5] << 15) + (t[6] << 7) + t[7];
                return n /= 45, r && (n += 47721858.84), Math.round(n)
              }
            }, s._decodePrivFrame = function (e) {
              if (!(e.size < 2)) {
                var t = s._utf8ArrayToStr(e.data, !0),
                  r = new Uint8Array(e.data.subarray(t.length + 1));
                return {
                  key: e.type,
                  info: t,
                  data: r.buffer
                }
              }
            }, s._decodeTextFrame = function (e) {
              if (!(e.size < 2)) {
                if ("TXXX" === e.type) {
                  var t = 1,
                    r = s._utf8ArrayToStr(e.data.subarray(t));
                  t += r.length + 1;
                  var n = s._utf8ArrayToStr(e.data.subarray(t));
                  return {
                    key: e.type,
                    info: r,
                    data: n
                  }
                }
                var i = s._utf8ArrayToStr(e.data.subarray(1));
                return {
                  key: e.type,
                  data: i
                }
              }
            }, s._decodeURLFrame = function (e) {
              if ("WXXX" === e.type) {
                if (e.size < 2) return;
                var t = 1,
                  r = s._utf8ArrayToStr(e.data.subarray(t));
                t += r.length + 1;
                var n = s._utf8ArrayToStr(e.data.subarray(t));
                return {
                  key: e.type,
                  info: r,
                  data: n
                }
              }
              var i = s._utf8ArrayToStr(e.data);
              return {
                key: e.type,
                data: i
              }
            }, s._utf8ArrayToStr = function (e, t) {
              void 0 === t && (t = !1);
              for (var r, n, i, a = e.length, o = "", s = 0; s < a;) {
                if (0 === (r = e[s++]) && t) return o;
                if (0 !== r && 3 !== r) switch (r >> 4) {
                  case 0:
                  case 1:
                  case 2:
                  case 3:
                  case 4:
                  case 5:
                  case 6:
                  case 7:
                    o += String.fromCharCode(r);
                    break;
                  case 12:
                  case 13:
                    n = e[s++], o += String.fromCharCode((31 & r) << 6 | 63 & n);
                    break;
                  case 14:
                    n = e[s++], i = e[s++], o += String.fromCharCode((15 & r) << 12 | (63 & n) << 6 | (63 & i) << 0)
                }
              }
              return o
            }, s
          }(),
          i = n._utf8ArrayToStr;
        t.utf8ArrayToStr = i, t.default = n
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.getMediaSource = function () {
          if ("undefined" != typeof window) return window.MediaSource || window.WebKitMediaSource
        }
      }, function (e, o, s) {
        (function (y) {
          var n, e = this && this.__extends || (n = Object.setPrototypeOf || {
              __proto__: []
            }
            instanceof Array && function (e, t) {
              e.__proto__ = t
            } || function (e, t) {
              for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function (e, t) {
              function r() {
                this.constructor = e
              }
              n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            });
          Object.defineProperty(o, "__esModule", {
            value: !0
          });
          var m = s(1),
            t = s(4),
            l = s(3),
            f = s(0),
            a = s(14),
            v = s(25),
            b = window.performance,
            E = {
              MANIFEST: "manifest",
              LEVEL: "level",
              AUDIO_TRACK: "audioTrack",
              SUBTITLE_TRACK: "subtitleTrack"
            },
            i = {
              MAIN: "main",
              AUDIO: "audio",
              SUBTITLE: "subtitle"
            },
            r = function (r) {
              function g(e) {
                var t = r.call(this, e, m.default.MANIFEST_LOADING, m.default.LEVEL_LOADING, m.default.AUDIO_TRACK_LOADING, m.default.SUBTITLE_TRACK_LOADING) || this;
                return t.loaders = {}, t
              }
              return e(g, r), Object.defineProperty(g, "ContextType", {
                get: function () {
                  return E
                },
                enumerable: !0,
                configurable: !0
              }), Object.defineProperty(g, "LevelType", {
                get: function () {
                  return i
                },
                enumerable: !0,
                configurable: !0
              }), g.canHaveQualityLevels = function (e) {
                return e !== E.AUDIO_TRACK && e !== E.SUBTITLE_TRACK
              }, g.mapContextToLevelType = function (e) {
                switch (e.type) {
                  case E.AUDIO_TRACK:
                    return i.AUDIO;
                  case E.SUBTITLE_TRACK:
                    return i.SUBTITLE;
                  default:
                    return i.MAIN
                }
              }, g.getResponseUrl = function (e, t) {
                var r = e.url;
                return void 0 !== r && 0 !== r.indexOf("data:") || (r = t.url), r
              }, g.prototype.createInternalLoader = function (e) {
                var t = this.hls.config,
                  r = t.pLoader,
                  n = t.loader,
                  i = new(r || n)(t);
                return e.loader = i, this.loaders[e.type] = i
              }, g.prototype.getInternalLoader = function (e) {
                return this.loaders[e.type]
              }, g.prototype.resetInternalLoader = function (e) {
                this.loaders[e] && delete this.loaders[e]
              }, g.prototype.destroyInternalLoaders = function () {
                for (var e in this.loaders) {
                  var t = this.loaders[e];
                  t && t.destroy(), this.resetInternalLoader(e)
                }
              }, g.prototype.destroy = function () {
                this.destroyInternalLoaders(), r.prototype.destroy.call(this)
              }, g.prototype.onManifestLoading = function (e) {
                this.load(e.url, {
                  type: E.MANIFEST,
                  level: 0,
                  id: null
                })
              }, g.prototype.onLevelLoading = function (e) {
                this.load(e.url, {
                  type: E.LEVEL,
                  level: e.level,
                  id: e.id
                })
              }, g.prototype.onAudioTrackLoading = function (e) {
                this.load(e.url, {
                  type: E.AUDIO_TRACK,
                  level: null,
                  id: e.id
                })
              }, g.prototype.onSubtitleTrackLoading = function (e) {
                this.load(e.url, {
                  type: E.SUBTITLE_TRACK,
                  level: null,
                  id: e.id
                })
              }, g.prototype.load = function (e, t) {
                var r = this.hls.config;
                f.logger.debug("Loading playlist of type " + t.type + ", level: " + t.level + ", id: " + t.id);
                var n, i, a, o, s = this.getInternalLoader(t);
                if (s) {
                  var l = s.context;
                  if (l && l.url === e) return f.logger.trace("playlist request ongoing"), !1;
                  f.logger.warn("aborting previous loader for type: " + t.type), s.abort()
                }
                switch (t.type) {
                  case E.MANIFEST:
                    n = r.manifestLoadingMaxRetry, i = r.manifestLoadingTimeOut, a = r.manifestLoadingRetryDelay, o = r.manifestLoadingMaxRetryTimeout;
                    break;
                  case E.LEVEL:
                    n = 0, i = r.levelLoadingTimeOut;
                    break;
                  default:
                    n = r.levelLoadingMaxRetry, i = r.levelLoadingTimeOut, a = r.levelLoadingRetryDelay, o = r.levelLoadingMaxRetryTimeout
                }
                s = this.createInternalLoader(t), t.url = e, t.responseType = t.responseType || "";
                var u = {
                    timeout: i,
                    maxRetry: n,
                    retryDelay: a,
                    maxRetryDelay: o
                  },
                  d = {
                    onSuccess: this.loadsuccess.bind(this),
                    onError: this.loaderror.bind(this),
                    onTimeout: this.loadtimeout.bind(this)
                  };
                return f.logger.debug("Calling internal loader delegate for URL: " + e), s.load(t, u, d), !0
              }, g.prototype.loadsuccess = function (e, t, r, n) {
                if (void 0 === n && (n = null), r.isSidxRequest) return this._handleSidxRequest(e, r), void this._handlePlaylistLoaded(e, t, r, n);
                this.resetInternalLoader(r.type);
                var i = e.data;
                t.tload = b.now(), 0 === i.indexOf("#EXTM3U") ? 0 < i.indexOf("#EXTINF:") || 0 < i.indexOf("#EXT-X-TARGETDURATION:") ? this._handleTrackOrLevelPlaylist(e, t, r, n) : this._handleMasterPlaylist(e, t, r, n) : this._handleManifestParsingError(e, r, "no EXTM3U delimiter", n)
              }, g.prototype.loaderror = function (e, t, r) {
                void 0 === r && (r = null), this._handleNetworkError(t, r, !1, e)
              }, g.prototype.loadtimeout = function (e, t, r) {
                void 0 === r && (r = null), this._handleNetworkError(t, r, !0)
              }, g.prototype._handleMasterPlaylist = function (e, t, r, n) {
                var i = this.hls,
                  a = e.data,
                  o = g.getResponseUrl(e, r),
                  s = v.default.parseMasterPlaylist(a, o);
                if (s.length) {
                  var l = s.map(function (e) {
                      return {
                        id: e.attrs.AUDIO,
                        codec: e.audioCodec
                      }
                    }),
                    u = v.default.parseMasterPlaylistMedia(a, o, "AUDIO", l),
                    d = v.default.parseMasterPlaylistMedia(a, o, "SUBTITLES");
                  if (u.length) {
                    var c = !1;
                    u.forEach(function (e) {
                      e.url || (c = !0)
                    }), !1 === c && s[0].audioCodec && !s[0].attrs.AUDIO && (f.logger.log("audio codec signaled in quality level, but no embedded audio track signaled, create one"), u.unshift({
                      type: "main",
                      name: "main"
                    }))
                  }
                  i.trigger(m.default.MANIFEST_LOADED, {
                    levels: s,
                    audioTracks: u,
                    subtitles: d,
                    url: o,
                    stats: t,
                    networkDetails: n
                  })
                } else this._handleManifestParsingError(e, r, "no level found in manifest", n)
              }, g.prototype._handleTrackOrLevelPlaylist = function (e, t, r, n) {
                var i = this.hls,
                  a = r.id,
                  o = r.level,
                  s = r.type,
                  l = g.getResponseUrl(e, r),
                  u = y.isFinite(a) ? a : 0,
                  d = y.isFinite(o) ? o : u,
                  c = g.mapContextToLevelType(r),
                  f = v.default.parseLevelPlaylist(e.data, l, d, c, u);
                if (f.tload = t.tload, s === E.MANIFEST) {
                  var p = {
                    url: l,
                    details: f
                  };
                  i.trigger(m.default.MANIFEST_LOADED, {
                    levels: [p],
                    audioTracks: [],
                    url: l,
                    stats: t,
                    networkDetails: n
                  })
                }
                if (t.tparsed = b.now(), f.needSidxRanges) {
                  var h = f.initSegment.url;
                  this.load(h, {
                    isSidxRequest: !0,
                    type: s,
                    level: o,
                    levelDetails: f,
                    id: a,
                    rangeStart: 0,
                    rangeEnd: 2048,
                    responseType: "arraybuffer"
                  })
                } else r.levelDetails = f, this._handlePlaylistLoaded(e, t, r, n)
              }, g.prototype._handleSidxRequest = function (e, t) {
                var r = a.default.parseSegmentIndex(new Uint8Array(e.data));
                if (r) {
                  var n = r.references,
                    i = t.levelDetails;
                  n.forEach(function (e, t) {
                    var r = e.info,
                      n = i.fragments[t];
                    0 === n.byteRange.length && (n.rawByteRange = String(1 + r.end - r.start) + "@" + String(r.start))
                  }), i.initSegment.rawByteRange = String(r.moovEndOffset) + "@0"
                }
              }, g.prototype._handleManifestParsingError = function (e, t, r, n) {
                this.hls.trigger(m.default.ERROR, {
                  type: l.ErrorTypes.NETWORK_ERROR,
                  details: l.ErrorDetails.MANIFEST_PARSING_ERROR,
                  fatal: !0,
                  url: e.url,
                  reason: r,
                  networkDetails: n
                })
              }, g.prototype._handleNetworkError = function (e, t, r, n) {
                var i, a;
                void 0 === r && (r = !1), void 0 === n && (n = null), f.logger.info("A network error occured while loading a " + e.type + "-type playlist");
                var o = this.getInternalLoader(e);
                switch (e.type) {
                  case E.MANIFEST:
                    i = r ? l.ErrorDetails.MANIFEST_LOAD_TIMEOUT : l.ErrorDetails.MANIFEST_LOAD_ERROR, a = !0;
                    break;
                  case E.LEVEL:
                    i = r ? l.ErrorDetails.LEVEL_LOAD_TIMEOUT : l.ErrorDetails.LEVEL_LOAD_ERROR, a = !1;
                    break;
                  case E.AUDIO_TRACK:
                    i = r ? l.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT : l.ErrorDetails.AUDIO_TRACK_LOAD_ERROR, a = !1;
                    break;
                  default:
                    a = !1
                }
                o && (o.abort(), this.resetInternalLoader(e.type));
                var s = {
                  type: l.ErrorTypes.NETWORK_ERROR,
                  details: i,
                  fatal: a,
                  url: o.url,
                  loader: o,
                  context: e,
                  networkDetails: t
                };
                n && (s.response = n), this.hls.trigger(m.default.ERROR, s)
              }, g.prototype._handlePlaylistLoaded = function (e, t, r, n) {
                var i = r.type,
                  a = r.level,
                  o = r.id,
                  s = r.levelDetails;
                if (s.targetduration)
                  if (g.canHaveQualityLevels(r.type)) this.hls.trigger(m.default.LEVEL_LOADED, {
                    details: s,
                    level: a || 0,
                    id: o || 0,
                    stats: t,
                    networkDetails: n
                  });
                  else switch (i) {
                    case E.AUDIO_TRACK:
                      this.hls.trigger(m.default.AUDIO_TRACK_LOADED, {
                        details: s,
                        id: o,
                        stats: t,
                        networkDetails: n
                      });
                      break;
                    case E.SUBTITLE_TRACK:
                      this.hls.trigger(m.default.SUBTITLE_TRACK_LOADED, {
                        details: s,
                        id: o,
                        stats: t,
                        networkDetails: n
                      })
                  } else this._handleManifestParsingError(e, r, "invalid target duration", n)
              }, g
            }(t.default);
          o.default = r
        }).call(this, s(2).Number)
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var f = r(0),
          l = r(1),
          s = Math.pow(2, 32) - 1,
          n = function () {
            function g(e, t) {
              this.observer = e, this.remuxer = t
            }
            return g.prototype.resetTimeStamp = function (e) {
              this.initPTS = e
            }, g.prototype.resetInitSegment = function (e, t, r, n) {
              if (e && e.byteLength) {
                var i = this.initData = g.parseInitSegment(e);
                null == t && (t = "mp4a.40.5"), null == r && (r = "avc1.42e01e");
                var a = {};
                i.audio && i.video ? a.audiovideo = {
                  container: "video/mp4",
                  codec: t + "," + r,
                  initSegment: n ? e : null
                } : (i.audio && (a.audio = {
                  container: "audio/mp4",
                  codec: t,
                  initSegment: n ? e : null
                }), i.video && (a.video = {
                  container: "video/mp4",
                  codec: r,
                  initSegment: n ? e : null
                })), this.observer.trigger(l.default.FRAG_PARSING_INIT_SEGMENT, {
                  tracks: a
                })
              } else t && (this.audioCodec = t), r && (this.videoCodec = r)
            }, g.probe = function (e) {
              return 0 < g.findBox({
                data: e,
                start: 0,
                end: Math.min(e.length, 16384)
              }, ["moof"]).length
            }, g.bin2str = function (e) {
              return String.fromCharCode.apply(null, e)
            }, g.readUint16 = function (e, t) {
              e.data && (t += e.start, e = e.data);
              var r = e[t] << 8 | e[t + 1];
              return r < 0 ? 65536 + r : r
            }, g.readUint32 = function (e, t) {
              e.data && (t += e.start, e = e.data);
              var r = e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3];
              return r < 0 ? 4294967296 + r : r
            }, g.writeUint32 = function (e, t, r) {
              e.data && (t += e.start, e = e.data), e[t] = r >> 24, e[t + 1] = r >> 16 & 255, e[t + 2] = r >> 8 & 255, e[t + 3] = 255 & r
            }, g.findBox = function (e, t) {
              var r, n, i, a, o, s, l, u = [];
              if (e.data ? (s = e.start, a = e.end, e = e.data) : (s = 0, a = e.byteLength), !t.length) return null;
              for (r = s; r < a;) n = g.readUint32(e, r), i = g.bin2str(e.subarray(r + 4, r + 8)), l = 1 < n ? r + n : a, i === t[0] && (1 === t.length ? u.push({
                data: e,
                start: r + 8,
                end: l
              }) : (o = g.findBox({
                data: e,
                start: r + 8,
                end: l
              }, t.slice(1))).length && (u = u.concat(o))), r = l;
              return u
            }, g.parseSegmentIndex = function (e) {
              var t, r = g.findBox(e, ["moov"])[0],
                n = r ? r.end : null,
                i = 0,
                a = g.findBox(e, ["sidx"]);
              if (!a || !a[0]) return null;
              t = [];
              var o = (a = a[0]).data[0],
                s = g.readUint32(a, i = 0 === o ? 8 : 16);
              i += 4, i += 0 === o ? 8 : 16, i += 2;
              var l = a.end + 0,
                u = g.readUint16(a, i);
              i += 2;
              for (var d = 0; d < u; d++) {
                var c = i,
                  f = g.readUint32(a, c);
                c += 4;
                var p = 2147483647 & f;
                if (1 == (2147483648 & f) >>> 31) return void console.warn("SIDX has hierarchical references (not supported)");
                var h = g.readUint32(a, c);
                c += 4, t.push({
                  referenceSize: p,
                  subsegmentDuration: h,
                  info: {
                    duration: h / s,
                    start: l,
                    end: l + p - 1
                  }
                }), l += p, i = c += 4
              }
              return {
                earliestPresentationTime: 0,
                timescale: s,
                version: o,
                referencesCount: u,
                references: t,
                moovEndOffset: n
              }
            }, g.parseInitSegment = function (e) {
              var c = [];
              return g.findBox(e, ["moov", "trak"]).forEach(function (e) {
                var t = g.findBox(e, ["tkhd"])[0];
                if (t) {
                  var r = t.data[t.start],
                    n = 0 === r ? 12 : 20,
                    i = g.readUint32(t, n),
                    a = g.findBox(e, ["mdia", "mdhd"])[0];
                  if (a) {
                    n = 0 === (r = a.data[a.start]) ? 12 : 20;
                    var o = g.readUint32(a, n),
                      s = g.findBox(e, ["mdia", "hdlr"])[0];
                    if (s) {
                      var l = {
                        soun: "audio",
                        vide: "video"
                      } [g.bin2str(s.data.subarray(s.start + 8, s.start + 12))];
                      if (l) {
                        var u = g.findBox(e, ["mdia", "minf", "stbl", "stsd"]);
                        if (u.length) {
                          u = u[0];
                          var d = g.bin2str(u.data.subarray(u.start + 12, u.start + 16));
                          f.logger.log("MP4Demuxer:" + l + ":" + d + " found")
                        }
                        c[i] = {
                          timescale: o,
                          type: l
                        }, c[l] = {
                          timescale: o,
                          id: i
                        }
                      }
                    }
                  }
                }
              }), c
            }, g.getStartDTS = function (i, e) {
              var t, r, n;
              return t = g.findBox(e, ["moof", "traf"]), r = [].concat.apply([], t.map(function (n) {
                return g.findBox(n, ["tfhd"]).map(function (e) {
                  var t, r;
                  return t = g.readUint32(e, 4), r = i[t].timescale || 9e4, g.findBox(n, ["tfdt"]).map(function (e) {
                    var t, r;
                    return t = e.data[e.start], r = g.readUint32(e, 4), 1 === t && (r *= Math.pow(2, 32), r += g.readUint32(e, 8)), r
                  })[0] / r
                })
              })), n = Math.min.apply(null, r), isFinite(n) ? n : 0
            }, g.offsetStartDTS = function (n, e, o) {
              g.findBox(e, ["moof", "traf"]).map(function (r) {
                return g.findBox(r, ["tfhd"]).map(function (e) {
                  var t = g.readUint32(e, 4),
                    a = n[t].timescale || 9e4;
                  g.findBox(r, ["tfdt"]).map(function (e) {
                    var t = e.data[e.start],
                      r = g.readUint32(e, 4);
                    if (0 === t) g.writeUint32(e, 4, r - o * a);
                    else {
                      r *= Math.pow(2, 32), r += g.readUint32(e, 8), r -= o * a, r = Math.max(r, 0);
                      var n = Math.floor(r / (s + 1)),
                        i = Math.floor(r % (s + 1));
                      g.writeUint32(e, 4, n), g.writeUint32(e, 8, i)
                    }
                  })
                })
              })
            }, g.prototype.append = function (e, t, r, n) {
              var i = this.initData;
              i || (this.resetInitSegment(e, this.audioCodec, this.videoCodec, !1), i = this.initData);
              var a, o = this.initPTS;
              if (void 0 === o) {
                var s = g.getStartDTS(i, e);
                this.initPTS = o = s - t, this.observer.trigger(l.default.INIT_PTS_FOUND, {
                  initPTS: o
                })
              }
              g.offsetStartDTS(i, e, o), a = g.getStartDTS(i, e), this.remuxer.remux(i.audio, i.video, null, null, a, r, n, e)
            }, g.prototype.destroy = function () {}, g
          }();
        t.default = n
      }, function (e, i, a) {
        (function (r) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var e = a(7),
            n = a(16),
            t = function () {
              function t() {
                var e;
                this._url = null, this._byteRange = null, this._decryptdata = null, this.tagList = [], this.programDateTime = null, this.rawProgramDateTime = null, this._elementaryStreams = ((e = {})[t.ElementaryStreamTypes.AUDIO] = !1, e[t.ElementaryStreamTypes.VIDEO] = !1, e)
              }
              return Object.defineProperty(t, "ElementaryStreamTypes", {
                get: function () {
                  return {
                    AUDIO: "audio",
                    VIDEO: "video"
                  }
                },
                enumerable: !0,
                configurable: !0
              }), Object.defineProperty(t.prototype, "url", {
                get: function () {
                  return !this._url && this.relurl && (this._url = e.buildAbsoluteURL(this.baseurl, this.relurl, {
                    alwaysNormalize: !0
                  })), this._url
                },
                set: function (e) {
                  this._url = e
                },
                enumerable: !0,
                configurable: !0
              }), Object.defineProperty(t.prototype, "byteRange", {
                get: function () {
                  if (!this._byteRange && !this.rawByteRange) return [];
                  if (this._byteRange) return this._byteRange;
                  var e = [];
                  if (this.rawByteRange) {
                    var t = this.rawByteRange.split("@", 2);
                    if (1 === t.length) {
                      var r = this.lastByteRangeEndOffset;
                      e[0] = r || 0
                    } else e[0] = parseInt(t[1]);
                    e[1] = parseInt(t[0]) + e[0], this._byteRange = e
                  }
                  return e
                },
                enumerable: !0,
                configurable: !0
              }), Object.defineProperty(t.prototype, "byteRangeStartOffset", {
                get: function () {
                  return this.byteRange[0]
                },
                enumerable: !0,
                configurable: !0
              }), Object.defineProperty(t.prototype, "byteRangeEndOffset", {
                get: function () {
                  return this.byteRange[1]
                },
                enumerable: !0,
                configurable: !0
              }), Object.defineProperty(t.prototype, "decryptdata", {
                get: function () {
                  return this._decryptdata || (this._decryptdata = this.fragmentDecryptdataFromLevelkey(this.levelkey, this.sn)), this._decryptdata
                },
                enumerable: !0,
                configurable: !0
              }), Object.defineProperty(t.prototype, "endProgramDateTime", {
                get: function () {
                  if (!r.isFinite(this.programDateTime)) return null;
                  var e = r.isFinite(this.duration) ? this.duration : 0;
                  return this.programDateTime + 1e3 * e
                },
                enumerable: !0,
                configurable: !0
              }), Object.defineProperty(t.prototype, "encrypted", {
                get: function () {
                  return !(!this.decryptdata.isQiniuDRM || null !== this.decryptdata.key) || !(!this.decryptdata || null === this.decryptdata.uri || null !== this.decryptdata.key)
                },
                enumerable: !0,
                configurable: !0
              }), t.prototype.addElementaryStream = function (e) {
                this._elementaryStreams[e] = !0
              }, t.prototype.hasElementaryStream = function (e) {
                return !0 === this._elementaryStreams[e]
              }, t.prototype.createInitializationVector = function (e) {
                for (var t = new Uint8Array(16), r = 12; r < 16; r++) t[r] = e >> 8 * (15 - r) & 255;
                return t
              }, t.prototype.fragmentDecryptdataFromLevelkey = function (e, t) {
                var r = e;
                return e && e.method && e.uri && !e.iv && ((r = new n.default).method = e.method, r.baseuri = e.baseuri, r.reluri = e.reluri, r.iv = this.createInitializationVector(t)), r
              }, t
            }();
          i.default = t
        }).call(this, a(2).Number)
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var n = r(7),
          i = function () {
            function e() {
              this.method = null, this.key = null, this.iv = null, this._uri = null, this.isQiniuDRM = !1
            }
            return Object.defineProperty(e.prototype, "uri", {
              get: function () {
                return !this._uri && this.reluri && (this._uri = n.buildAbsoluteURL(this.baseuri, this.reluri, {
                  alwaysNormalize: !0
                })), this._uri
              },
              enumerable: !0,
              configurable: !0
            }), e
          }();
        t.default = i
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var n = {
          audio: {
            a3ds: !0,
            "ac-3": !0,
            "ac-4": !0,
            alac: !0,
            alaw: !0,
            dra1: !0,
            "dts+": !0,
            "dts-": !0,
            dtsc: !0,
            dtse: !0,
            dtsh: !0,
            "ec-3": !0,
            enca: !0,
            g719: !0,
            g726: !0,
            m4ae: !0,
            mha1: !0,
            mha2: !0,
            mhm1: !0,
            mhm2: !0,
            mlpa: !0,
            mp4a: !0,
            "raw ": !0,
            Opus: !0,
            samr: !0,
            sawb: !0,
            sawp: !0,
            sevc: !0,
            sqcp: !0,
            ssmv: !0,
            twos: !0,
            ulaw: !0
          },
          video: {
            avc1: !0,
            avc2: !0,
            avc3: !0,
            avc4: !0,
            avcp: !0,
            drac: !0,
            dvav: !0,
            dvhe: !0,
            encv: !0,
            hev1: !0,
            hvc1: !0,
            mjp2: !0,
            mp4v: !0,
            mvc1: !0,
            mvc2: !0,
            mvc3: !0,
            mvc4: !0,
            resv: !0,
            rv60: !0,
            s263: !0,
            svc1: !0,
            svc2: !0,
            "vc-1": !0,
            vp08: !0,
            vp09: !0
          }
        };
        t.isCodecType = function (e, t) {
          var r = n[t];
          return !!r && !0 === r[e.slice(0, 4)]
        }, t.isCodecSupportedInMp4 = function (e, t) {
          return window.MediaSource.isTypeSupported((t || "video") + '/mp4;codecs="' + e + '"')
        }
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var g, T = r(1),
          w = r(3),
          y = r(19),
          L = r(36),
          A = r(14),
          R = r(37),
          D = r(40),
          x = r(41),
          I = r(44),
          n = r(6),
          i = r(0),
          a = n.getSelfScope();
        try {
          g = a.performance.now.bind(a.performance)
        } catch (e) {
          i.logger.debug("Unable to use Performance API on this environment"), g = a.Date.now
        }
        var o = function () {
          function e(e, t, r, n) {
            this.observer = e, this.typeSupported = t, this.config = r, this.vendor = n
          }
          return e.prototype.destroy = function () {
            var e = this.demuxer;
            e && e.destroy()
          }, e.prototype.push = function (e, r, n, i, a, o, s, l, u, d, c, f) {
            var p = this;
            if (0 < e.byteLength && null != r && null != r.key && ("AES-128" === r.method || r.isQiniuDRM)) {
              var t = this.decrypter;
              null == t && (t = this.decrypter = new y.default(this.observer, this.config));
              var h = g();
              t.decrypt(e, r.key.buffer, r.iv.buffer, function (e) {
                var t = g();
                p.observer.trigger(T.default.FRAG_DECRYPTED, {
                  stats: {
                    tstart: h,
                    tdecrypt: t
                  }
                }), p.pushDecrypted(new Uint8Array(e), r, new Uint8Array(n), i, a, o, s, l, u, d, c, f)
              })
            } else this.pushDecrypted(new Uint8Array(e), r, new Uint8Array(n), i, a, o, s, l, u, d, c, f)
          }, e.prototype.pushDecrypted = function (e, t, r, n, i, a, o, s, l, u, d, c) {
            var f = this.demuxer;
            if (!f || (o || s) && !this.probe(e)) {
              for (var p = this.observer, h = this.typeSupported, g = this.config, y = [{
                  demux: R.default,
                  remux: x.default
                }, {
                  demux: A.default,
                  remux: I.default
                }, {
                  demux: L.default,
                  remux: x.default
                }, {
                  demux: D.default,
                  remux: x.default
                }], m = 0, v = y.length; m < v; m++) {
                var b = y[m],
                  E = b.demux.probe;
                if (E(e)) {
                  var S = this.remuxer = new b.remux(p, g, h, this.vendor);
                  f = new b.demux(p, S, g, h), this.probe = E;
                  break
                }
              }
              if (!f) return void p.trigger(T.default.ERROR, {
                type: w.ErrorTypes.MEDIA_ERROR,
                details: w.ErrorDetails.FRAG_PARSING_ERROR,
                fatal: !0,
                reason: "no demux matching with content found"
              });
              this.demuxer = f
            }
            var _ = this.remuxer;
            (o || s) && (f.resetInitSegment(r, n, i, u), _.resetInitSegment()), o && (f.resetTimeStamp(c), _.resetTimeStamp(c)), "function" == typeof f.setDecryptData && f.setDecryptData(t), f.append(e, a, l, d)
          }, e
        }();
        t.default = o
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var s = r(33),
          l = r(34),
          u = r(35),
          a = r(3),
          d = r(0),
          o = r(1),
          c = r(6).getSelfScope(),
          n = function () {
            function e(e, t, r) {
              var n = (void 0 === r ? {} : r).removePKCS7Padding,
                i = void 0 === n || n;
              if (this.logEnabled = !0, this.observer = e, this.config = t, this.removePKCS7Padding = i) try {
                var a = c.crypto;
                a && (this.subtle = a.subtle || a.webkitSubtle)
              } catch (e) {}
              this.disableWebCrypto = !this.subtle
            }
            return e.prototype.isSync = function () {
              return this.disableWebCrypto && this.config.enableSoftwareAES
            }, e.prototype.decrypt = function (t, r, n, i) {
              var a = this;
              if (this.disableWebCrypto && this.config.enableSoftwareAES) {
                this.logEnabled && (d.logger.log("JS AES decrypt"), this.logEnabled = !1);
                var e = this.decryptor;
                e || (this.decryptor = e = new u.default), e.expandKey(r), i(e.decrypt(t, 0, n, this.removePKCS7Padding))
              } else {
                this.logEnabled && (d.logger.log("WebCrypto AES decrypt"), this.logEnabled = !1);
                var o = this.subtle;
                this.key !== r && (this.key = r, this.fastAesKey = new l.default(o, r)), this.fastAesKey.expandKey().then(function (e) {
                  new s.default(o, n).decrypt(t, e).catch(function (e) {
                    a.onWebCryptoError(e, t, r, n, i)
                  }).then(function (e) {
                    i(e)
                  })
                }).catch(function (e) {
                  a.onWebCryptoError(e, t, r, n, i)
                })
              }
            }, e.prototype.onWebCryptoError = function (e, t, r, n, i) {
              this.config.enableSoftwareAES ? (d.logger.log("WebCrypto Error, disable WebCrypto API"), this.disableWebCrypto = !0, this.logEnabled = !0, this.decrypt(t, r, n, i)) : (d.logger.error("decrypting error : " + e.message), this.observer.trigger(o.default.ERROR, {
                type: a.ErrorTypes.MEDIA_ERROR,
                details: a.ErrorDetails.FRAG_DECRYPT_ERROR,
                fatal: !0,
                reason: e.message
              }))
            }, e.prototype.destroy = function () {
              var e = this.decryptor;
              e && (e.destroy(), this.decryptor = void 0)
            }, e
          }();
        t.default = n
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var f = r(0),
          p = r(3),
          h = r(1);

        function o(e, t, r, n) {
          var i, a, o, s, l, u = navigator.userAgent.toLowerCase(),
            d = n,
            c = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];
          if (i = 1 + ((192 & t[r + 2]) >>> 6), !((a = (60 & t[r + 2]) >>> 2) > c.length - 1)) return s = (1 & t[r + 2]) << 2, s |= (192 & t[r + 3]) >>> 6, f.logger.log("manifest codec:" + n + ",ADTS data:type:" + i + ",sampleingIndex:" + a + "[" + c[a] + "Hz],channelConfig:" + s), o = /firefox/i.test(u) ? 6 <= a ? (i = 5, l = new Array(4), a - 3) : (i = 2, l = new Array(2), a) : -1 !== u.indexOf("android") ? (i = 2, l = new Array(2), a) : (i = 5, l = new Array(4), n && (-1 !== n.indexOf("mp4a.40.29") || -1 !== n.indexOf("mp4a.40.5")) || !n && 6 <= a ? a - 3 : ((n && -1 !== n.indexOf("mp4a.40.2") && (6 <= a && 1 === s || /vivaldi/i.test(u)) || !n && 1 === s) && (i = 2, l = new Array(2)), a)), l[0] = i << 3, l[0] |= (14 & a) >> 1, l[1] |= (1 & a) << 7, l[1] |= s << 3, 5 === i && (l[1] |= (14 & o) >> 1, l[2] = (1 & o) << 7, l[2] |= 8, l[3] = 0), {
            config: l,
            samplerate: c[a],
            channelCount: s,
            codec: "mp4a.40." + i,
            manifestCodec: d
          };
          e.trigger(h.default.ERROR, {
            type: p.ErrorTypes.MEDIA_ERROR,
            details: p.ErrorDetails.FRAG_PARSING_ERROR,
            fatal: !0,
            reason: "invalid ADTS sampling index:" + a
          })
        }

        function i(e, t) {
          return 255 === e[t] && 240 == (246 & e[t + 1])
        }

        function l(e, t) {
          return 1 & e[t + 1] ? 7 : 9
        }

        function u(e, t) {
          return (3 & e[t + 3]) << 11 | e[t + 4] << 3 | (224 & e[t + 5]) >>> 5
        }

        function d(e) {
          return 9216e4 / e
        }

        function c(e, t, r, n, i) {
          var a, o, s = e.length;
          if (a = l(e, t), o = u(e, t), 0 < (o -= a) && t + a + o <= s) return {
            headerLength: a,
            frameLength: o,
            stamp: r + n * i
          }
        }
        t.getAudioConfig = o, t.isHeaderPattern = i, t.getHeaderLength = l, t.getFullFrameLength = u, t.isHeader = function (e, t) {
          return !!(t + 1 < e.length && i(e, t))
        }, t.probe = function (e, t) {
          if (t + 1 < e.length && i(e, t)) {
            var r = l(e, t);
            t + 5 < e.length && (r = u(e, t));
            var n = t + r;
            if (n === e.length || n + 1 < e.length && i(e, n)) return !0
          }
          return !1
        }, t.initTrackConfig = function (e, t, r, n, i) {
          if (!e.samplerate) {
            var a = o(t, r, n, i);
            e.config = a.config, e.samplerate = a.samplerate, e.channelCount = a.channelCount, e.codec = a.codec, e.manifestCodec = a.manifestCodec, f.logger.log("parsed codec:" + e.codec + ",rate:" + a.samplerate + ",nb channel:" + a.channelCount)
          }
        }, t.getFrameDuration = d, t.parseFrameHeader = c, t.appendFrame = function (e, t, r, n, i) {
          var a = c(t, r, n, i, d(e.samplerate));
          if (a) {
            var o = a.stamp,
              s = a.headerLength,
              l = a.frameLength,
              u = {
                unit: t.subarray(r + s, r + s + l),
                pts: o,
                dts: o
              };
            return e.samples.push(u), e.len += l, {
              sample: u,
              length: l + s
            }
          }
        }
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var g = {
          BitratesMap: [32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
          SamplingRateMap: [44100, 48e3, 32e3, 22050, 24e3, 16e3, 11025, 12e3, 8e3],
          SamplesCoefficients: [
            [0, 72, 144, 12],
            [0, 0, 0, 0],
            [0, 72, 144, 12],
            [0, 144, 144, 12]
          ],
          BytesInSlot: [0, 1, 1, 4],
          appendFrame: function (e, t, r, n, i) {
            if (!(r + 24 > t.length)) {
              var a = this.parseHeader(t, r);
              if (a && r + a.frameLength <= t.length) {
                var o = n + i * (9e4 * a.samplesPerFrame / a.sampleRate),
                  s = {
                    unit: t.subarray(r, r + a.frameLength),
                    pts: o,
                    dts: o
                  };
                return e.config = [], e.channelCount = a.channelCount, e.samplerate = a.sampleRate, e.samples.push(s), e.len += a.frameLength, {
                  sample: s,
                  length: a.frameLength
                }
              }
            }
          },
          parseHeader: function (e, t) {
            var r = e[t + 1] >> 3 & 3,
              n = e[t + 1] >> 1 & 3,
              i = e[t + 2] >> 4 & 15,
              a = e[t + 2] >> 2 & 3,
              o = e[t + 2] >> 1 & 1;
            if (1 !== r && 0 !== i && 15 !== i && 3 !== a) {
              var s = 3 === r ? 3 - n : 3 === n ? 3 : 4,
                l = 1e3 * g.BitratesMap[14 * s + i - 1],
                u = 3 === r ? 0 : 2 === r ? 1 : 2,
                d = g.SamplingRateMap[3 * u + a],
                c = e[t + 3] >> 6 == 3 ? 1 : 2,
                f = g.SamplesCoefficients[r][n],
                p = g.BytesInSlot[n],
                h = 8 * f * p;
              return {
                sampleRate: d,
                channelCount: c,
                frameLength: parseInt(f * l / d + o, 10) * p,
                samplesPerFrame: h
              }
            }
          },
          isHeaderPattern: function (e, t) {
            return 255 === e[t] && 224 == (224 & e[t + 1]) && 0 != (6 & e[t + 1])
          },
          isHeader: function (e, t) {
            return !!(t + 1 < e.length && this.isHeaderPattern(e, t))
          },
          probe: function (e, t) {
            if (t + 1 < e.length && this.isHeaderPattern(e, t)) {
              var r = this.parseHeader(e, t),
                n = 4;
              r && r.frameLength && (n = r.frameLength);
              var i = t + n;
              if (i === e.length || i + 1 < e.length && this.isHeaderPattern(e, i)) return !0
            }
            return !1
          }
        };
        t.default = g
      }, function (e, t, r) {
        var n, i = this && this.__extends || (n = Object.setPrototypeOf || {
            __proto__: []
          }
          instanceof Array && function (e, t) {
            e.__proto__ = t
          } || function (e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
          },
          function (e, t) {
            function r() {
              this.constructor = e
            }
            n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
          });
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var a = function (e) {
          function t() {
            return null !== e && e.apply(this, arguments) || this
          }
          return i(t, e), t.prototype.trigger = function (e) {
            for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
            this.emit.apply(this, [e, e].concat(t))
          }, t
        }(r(45).EventEmitter);
        t.Observer = a
      }, function (e, t, r) {
        (function (p) {
          Object.defineProperty(t, "__esModule", {
            value: !0
          });
          var h = r(0);

          function g(e, t, r) {
            var n = e[t],
              i = e[r],
              a = i.startPTS;
            p.isFinite(a) ? t < r ? (n.duration = a - n.start, n.duration < 0 && h.logger.warn("negative duration computed for frag " + n.sn + ",level " + n.level + ", there should be some duration drift between playlist and fragment!")) : (i.duration = n.start - a, i.duration < 0 && h.logger.warn("negative duration computed for frag " + i.sn + ",level " + i.level + ", there should be some duration drift between playlist and fragment!")) : i.start = t < r ? n.start + n.duration : Math.max(n.start - i.duration, 0)
          }

          function y(e, t, r, n, i, a) {
            var o = r;
            if (p.isFinite(t.startPTS)) {
              var s = Math.abs(t.startPTS - r);
              p.isFinite(t.deltaPTS) ? t.deltaPTS = Math.max(s, t.deltaPTS) : t.deltaPTS = s, o = Math.max(r, t.startPTS), r = Math.min(r, t.startPTS), n = Math.max(n, t.endPTS), i = Math.min(i, t.startDTS), a = Math.max(a, t.endDTS)
            }
            var l = r - t.start;
            t.start = t.startPTS = r, t.maxStartPTS = o, t.endPTS = n, t.startDTS = i, t.endDTS = a, t.duration = n - r;
            var u, d, c, f = t.sn;
            if (!e || f < e.startSN || f > e.endSN) return 0;
            for (u = f - e.startSN, (d = e.fragments)[u] = t, c = u; 0 < c; c--) g(d, c, c - 1);
            for (c = u; c < d.length - 1; c++) g(d, c, c + 1);
            return e.PTSKnown = !0, l
          }
          t.addGroupId = function (e, t, r) {
            switch (t) {
              case "audio":
                e.audioGroupIds || (e.audioGroupIds = []), e.audioGroupIds.push(r);
                break;
              case "text":
                e.textGroupIds || (e.textGroupIds = []), e.textGroupIds.push(r)
            }
          }, t.updatePTS = g, t.updateFragPTSDTS = y, t.mergeDetails = function (e, t) {
            var r, n = Math.max(e.startSN, t.startSN) - t.startSN,
              i = Math.min(e.endSN, t.endSN) - t.startSN,
              a = t.startSN - e.startSN,
              o = e.fragments,
              s = t.fragments,
              l = 0;
            if (t.initSegment && e.initSegment && (t.initSegment = e.initSegment), i < n) t.PTSKnown = !1;
            else {
              for (var u = n; u <= i; u++) {
                var d = o[a + u],
                  c = s[u];
                c && d && (l = d.cc - c.cc, p.isFinite(d.startPTS) && (c.start = c.startPTS = d.startPTS, c.endPTS = d.endPTS, c.duration = d.duration, c.backtracked = d.backtracked, c.dropped = d.dropped, r = c))
              }
              if (l)
                for (h.logger.log("discontinuity sliding from playlist, take drift into account"), u = 0; u < s.length; u++) s[u].cc += l;
              if (r) y(t, r, r.startPTS, r.endPTS, r.startDTS, r.endDTS);
              else if (0 <= a && a < o.length) {
                var f = o[a].start;
                for (u = 0; u < s.length; u++) s[u].start += f
              }
              t.PTSKnown = e.PTSKnown
            }
          }
        }).call(this, r(2).Number)
      }, function (e, t, r) {
        var n, i = this && this.__extends || (n = Object.setPrototypeOf || {
            __proto__: []
          }
          instanceof Array && function (e, t) {
            e.__proto__ = t
          } || function (e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
          },
          function (e, t) {
            function r() {
              this.constructor = e
            }
            n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
          });
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var a = r(7),
          o = r(3),
          _ = r(13),
          T = r(28),
          w = r(29),
          L = r(9),
          A = r(30),
          R = r(54),
          D = r(55),
          s = r(57),
          x = r(0),
          l = r(58),
          u = r(1),
          d = function (E) {
            function S(e) {
              void 0 === e && (e = {});
              var t = E.call(this) || this,
                r = S.DefaultConfig;
              if ((e.liveSyncDurationCount || e.liveMaxLatencyDurationCount) && (e.liveSyncDuration || e.liveMaxLatencyDuration)) throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration");
              for (var n in r) n in e || (e[n] = r[n]);
              if (void 0 !== e.liveMaxLatencyDurationCount && e.liveMaxLatencyDurationCount <= e.liveSyncDurationCount) throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be gt "liveSyncDurationCount"');
              if (void 0 !== e.liveMaxLatencyDuration && (e.liveMaxLatencyDuration <= e.liveSyncDuration || void 0 === e.liveSyncDuration)) throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be gt "liveSyncDuration"');
              x.enableLogs(e.debug), t.config = e, t._autoLevelCapping = -1;
              var i = t.abrController = new e.abrController(t),
                a = new e.bufferController(t),
                o = new e.capLevelController(t),
                s = new e.fpsController(t),
                l = new _.default(t),
                u = new T.default(t),
                d = new w.default(t),
                c = new D.default(t),
                f = t.levelController = new R.default(t),
                p = new L.FragmentTracker(t),
                h = [f, t.streamController = new A.default(t, p)],
                g = e.audioStreamController;
              g && h.push(new g(t, p)), t.networkControllers = h;
              var y = [l, u, d, i, a, o, s, c, p];
              if (g = e.audioTrackController) {
                var m = new g(t);
                t.audioTrackController = m, y.push(m)
              }
              if (g = e.subtitleTrackController) {
                var v = new g(t);
                t.subtitleTrackController = v, y.push(v)
              }
              if (g = e.emeController) {
                var b = new g(t);
                t.emeController = b, y.push(b)
              }
              return (g = e.subtitleStreamController) && y.push(new g(t, p)), (g = e.timelineController) && y.push(new g(t)), t.coreComponents = y, t
            }
            return i(S, E), Object.defineProperty(S, "version", {
              get: function () {
                return "0.0.0"
              },
              enumerable: !0,
              configurable: !0
            }), S.isSupported = function () {
              return s.isSupported()
            }, Object.defineProperty(S, "Events", {
              get: function () {
                return u.default
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(S, "ErrorTypes", {
              get: function () {
                return o.ErrorTypes
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(S, "ErrorDetails", {
              get: function () {
                return o.ErrorDetails
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(S, "DefaultConfig", {
              get: function () {
                return S.defaultConfig ? S.defaultConfig : l.hlsDefaultConfig
              },
              set: function (e) {
                S.defaultConfig = e
              },
              enumerable: !0,
              configurable: !0
            }), S.prototype.destroy = function () {
              x.logger.log("destroy"), this.trigger(u.default.DESTROYING), this.detachMedia(), this.coreComponents.concat(this.networkControllers).forEach(function (e) {
                e.destroy()
              }), this.url = null, this.removeAllListeners(), this._autoLevelCapping = -1
            }, S.prototype.attachMedia = function (e) {
              x.logger.log("attachMedia"), this.media = e, this.trigger(u.default.MEDIA_ATTACHING, {
                media: e
              })
            }, S.prototype.detachMedia = function () {
              x.logger.log("detachMedia"), this.trigger(u.default.MEDIA_DETACHING), this.media = null
            }, S.prototype.loadSource = function (e) {
              e = a.buildAbsoluteURL(window.location.href, e, {
                alwaysNormalize: !0
              }), x.logger.log("loadSource:" + e), this.url = e, this.trigger(u.default.MANIFEST_LOADING, {
                url: e
              })
            }, S.prototype.startLoad = function (t) {
              void 0 === t && (t = -1), x.logger.log("startLoad(" + t + ")"), this.networkControllers.forEach(function (e) {
                e.startLoad(t)
              })
            }, S.prototype.stopLoad = function () {
              x.logger.log("stopLoad"), this.networkControllers.forEach(function (e) {
                e.stopLoad()
              })
            }, S.prototype.swapAudioCodec = function () {
              x.logger.log("swapAudioCodec"), this.streamController.swapAudioCodec()
            }, S.prototype.recoverMediaError = function () {
              x.logger.log("recoverMediaError");
              var e = this.media;
              this.detachMedia(), this.attachMedia(e)
            }, Object.defineProperty(S.prototype, "levels", {
              get: function () {
                return this.levelController.levels
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(S.prototype, "currentLevel", {
              get: function () {
                return this.streamController.currentLevel
              },
              set: function (e) {
                x.logger.log("set currentLevel:" + e), this.loadLevel = e, this.streamController.immediateLevelSwitch()
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(S.prototype, "nextLevel", {
              get: function () {
                return this.streamController.nextLevel
              },
              set: function (e) {
                x.logger.log("set nextLevel:" + e), this.levelController.manualLevel = e, this.streamController.nextLevelSwitch()
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(S.prototype, "loadLevel", {
              get: function () {
                return this.levelController.level
              },
              set: function (e) {
                x.logger.log("set loadLevel:" + e), this.levelController.manualLevel = e
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(S.prototype, "nextLoadLevel", {
              get: function () {
                return this.levelController.nextLoadLevel
              },
              set: function (e) {
                this.levelController.nextLoadLevel = e
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(S.prototype, "firstLevel", {
              get: function () {
                return Math.max(this.levelController.firstLevel, this.minAutoLevel)
              },
              set: function (e) {
                x.logger.log("set firstLevel:" + e), this.levelController.firstLevel = e
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(S.prototype, "startLevel", {
              get: function () {
                return this.levelController.startLevel
              },
              set: function (e) {
                x.logger.log("set startLevel:" + e), -1 !== e && (e = Math.max(e, this.minAutoLevel)), this.levelController.startLevel = e
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(S.prototype, "autoLevelCapping", {
              get: function () {
                return this._autoLevelCapping
              },
              set: function (e) {
                x.logger.log("set autoLevelCapping:" + e), this._autoLevelCapping = e
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(S.prototype, "autoLevelEnabled", {
              get: function () {
                return -1 === this.levelController.manualLevel
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(S.prototype, "manualLevel", {
              get: function () {
                return this.levelController.manualLevel
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(S.prototype, "minAutoLevel", {
              get: function () {
                for (var e = this.levels, t = this.config.minAutoBitrate, r = e ? e.length : 0, n = 0; n < r; n++)
                  if ((e[n].realBitrate ? Math.max(e[n].realBitrate, e[n].bitrate) : e[n].bitrate) > t) return n;
                return 0
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(S.prototype, "maxAutoLevel", {
              get: function () {
                var e = this.levels,
                  t = this.autoLevelCapping;
                return -1 === t && e && e.length ? e.length - 1 : t
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(S.prototype, "nextAutoLevel", {
              get: function () {
                return Math.min(Math.max(this.abrController.nextAutoLevel, this.minAutoLevel), this.maxAutoLevel)
              },
              set: function (e) {
                this.abrController.nextAutoLevel = Math.max(this.minAutoLevel, e)
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(S.prototype, "audioTracks", {
              get: function () {
                var e = this.audioTrackController;
                return e ? e.audioTracks : []
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(S.prototype, "audioTrack", {
              get: function () {
                var e = this.audioTrackController;
                return e ? e.audioTrack : -1
              },
              set: function (e) {
                var t = this.audioTrackController;
                t && (t.audioTrack = e)
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(S.prototype, "liveSyncPosition", {
              get: function () {
                return this.streamController.liveSyncPosition
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(S.prototype, "subtitleTracks", {
              get: function () {
                var e = this.subtitleTrackController;
                return e ? e.subtitleTracks : []
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(S.prototype, "subtitleTrack", {
              get: function () {
                var e = this.subtitleTrackController;
                return e ? e.subtitleTrack : -1
              },
              set: function (e) {
                var t = this.subtitleTrackController;
                t && (t.subtitleTrack = e)
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(S.prototype, "subtitleDisplay", {
              get: function () {
                var e = this.subtitleTrackController;
                return !!e && e.subtitleDisplay
              },
              set: function (e) {
                var t = this.subtitleTrackController;
                t && (t.subtitleDisplay = e)
              },
              enumerable: !0,
              configurable: !0
            }), S
          }(r(22).Observer);
        t.default = d
      }, function (e, t, n) {
        (function (O) {
          Object.defineProperty(t, "__esModule", {
            value: !0
          });
          var r = n(7),
            P = n(15),
            M = n(26),
            C = n(16),
            k = n(27),
            N = n(0),
            l = n(17),
            u = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g,
            c = /#EXT-X-MEDIA:(.*)/g,
            F = new RegExp([/#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source, /|(?!#)([\S+ ?]+)/.source, /|#EXT-X-BYTERANGE:*(.+)/.source, /|#EXT-X-PROGRAM-DATE-TIME:(.+)/.source, /|#.*/.source].join(""), "g"),
            B = /(?:(?:#(EXTM3U))|(?:#EXT-X-(PLAYLIST-TYPE):(.+))|(?:#EXT-X-(MEDIA-SEQUENCE): *(\d+))|(?:#EXT-X-(TARGETDURATION): *(\d+))|(?:#EXT-X-(KEY):(.+))|(?:#EXT-X-(START):(.+))|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DISCONTINUITY-SEQ)UENCE:(\d+))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(VERSION):(\d+))|(?:#EXT-X-(MAP):(.+))|(?:(#)([^:]*):(.*))|(?:(#)(.*))(?:.*)\r?\n?/,
            U = /\.(mp4|m4s|m4v|m4a)$/i,
            e = function () {
              function d() {}
              return d.findGroup = function (e, t) {
                if (!e) return null;
                for (var r = null, n = 0; n < e.length; n++) {
                  var i = e[n];
                  i.id === t && (r = i)
                }
                return r
              }, d.convertAVC1ToAVCOTI = function (e) {
                var t, r = e.split(".");
                return 2 < r.length ? (t = r.shift() + ".", t += parseInt(r.shift()).toString(16), t += ("000" + parseInt(r.shift()).toString(16)).substr(-4)) : t = e, t
              }, d.resolve = function (e, t) {
                return r.buildAbsoluteURL(t, e, {
                  alwaysNormalize: !0
                })
              }, d.parseMasterPlaylist = function (e, t) {
                var r, n = [];

                function i(n, i) {
                  ["video", "audio"].forEach(function (t) {
                    var r = n.filter(function (e) {
                      return l.isCodecType(e, t)
                    });
                    if (r.length) {
                      var e = r.filter(function (e) {
                        return 0 === e.lastIndexOf("avc1", 0) || 0 === e.lastIndexOf("mp4a", 0)
                      });
                      i[t + "Codec"] = 0 < e.length ? e[0] : r[0], n = n.filter(function (e) {
                        return -1 === r.indexOf(e)
                      })
                    }
                  }), i.unknownCodecs = n
                }
                for (u.lastIndex = 0; null != (r = u.exec(e));) {
                  var a = {},
                    o = a.attrs = new k.default(r[1]);
                  a.url = d.resolve(r[2], t);
                  var s = o.decimalResolution("RESOLUTION");
                  s && (a.width = s.width, a.height = s.height), a.bitrate = o.decimalInteger("AVERAGE-BANDWIDTH") || o.decimalInteger("BANDWIDTH"), a.name = o.NAME, i([].concat((o.CODECS || "").split(/[ ,]+/)), a), a.videoCodec && -1 !== a.videoCodec.indexOf("avc1") && (a.videoCodec = d.convertAVC1ToAVCOTI(a.videoCodec)), n.push(a)
                }
                return n
              }, d.parseMasterPlaylistMedia = function (e, t, r, n) {
                var i;
                void 0 === n && (n = []);
                var a = [],
                  o = 0;
                for (c.lastIndex = 0; null !== (i = c.exec(e));) {
                  var s = {},
                    l = new k.default(i[1]);
                  if (l.TYPE === r) {
                    if (s.groupId = l["GROUP-ID"], s.name = l.NAME, s.type = r, s.default = "YES" === l.DEFAULT, s.autoselect = "YES" === l.AUTOSELECT, s.forced = "YES" === l.FORCED, l.URI && (s.url = d.resolve(l.URI, t)), s.lang = l.LANGUAGE, s.name || (s.name = s.lang), n.length) {
                      var u = d.findGroup(n, s.groupId);
                      s.audioCodec = u ? u.codec : n[0].codec
                    }
                    s.id = o++, a.push(s)
                  }
                }
                return a
              }, d.parseLevelPlaylist = function (e, t, r, n, i) {
                var a, o, s, l, u = 0,
                  d = 0,
                  c = new M.default(t),
                  f = new C.default,
                  p = 0,
                  h = null,
                  g = new P.default,
                  y = null;
                for (F.lastIndex = 0; null !== (a = F.exec(e));) {
                  var m = a[1];
                  if (m) {
                    g.duration = parseFloat(m);
                    var v = (" " + a[2]).slice(1);
                    g.title = v || null, g.tagList.push(v ? ["INF", m, v] : ["INF", m])
                  } else if (a[3]) {
                    if (O.isFinite(g.duration)) {
                      var b = u++;
                      g.type = n, g.start = d, g.levelkey = f, g.sn = b, g.level = r, g.cc = p, g.urlId = i, g.baseurl = t, g.relurl = (" " + a[3]).slice(1), l = h, (s = g).rawProgramDateTime ? s.programDateTime = Date.parse(s.rawProgramDateTime) : l && l.programDateTime && (s.programDateTime = l.endProgramDateTime), O.isFinite(s.programDateTime) || (s.programDateTime = null, s.rawProgramDateTime = null), c.fragments.push(g), d += (h = g).duration, g = new P.default
                    }
                  } else if (a[4]) {
                    if (g.rawByteRange = (" " + a[4]).slice(1), h) {
                      var E = h.byteRangeEndOffset;
                      E && (g.lastByteRangeEndOffset = E)
                    }
                  } else if (a[5]) g.rawProgramDateTime = (" " + a[5]).slice(1), g.tagList.push(["PROGRAM-DATE-TIME", g.rawProgramDateTime]), null === y && (y = c.fragments.length);
                  else {
                    for (a = a[0].match(B), o = 1; o < a.length && void 0 === a[o]; o++);
                    var S = (" " + a[o + 1]).slice(1),
                      _ = (" " + a[o + 2]).slice(1);
                    switch (a[o]) {
                      case "#":
                        g.tagList.push(_ ? [S, _] : [S]);
                        break;
                      case "PLAYLIST-TYPE":
                        c.type = S.toUpperCase();
                        break;
                      case "MEDIA-SEQUENCE":
                        u = c.startSN = parseInt(S);
                        break;
                      case "TARGETDURATION":
                        c.targetduration = parseFloat(S);
                        break;
                      case "VERSION":
                        c.version = parseInt(S);
                        break;
                      case "EXTM3U":
                        break;
                      case "ENDLIST":
                        c.live = !1;
                        break;
                      case "DIS":
                        p++, g.tagList.push(["DIS"]);
                        break;
                      case "DISCONTINUITY-SEQ":
                        p = parseInt(S);
                        break;
                      case "KEY":
                        var T = S,
                          w = new k.default(T),
                          L = w.enumeratedString("METHOD"),
                          A = w.URI,
                          R = w.hexadecimalInteger("IV");
                        L && (f = new C.default, A && 0 <= ["AES-128", "SAMPLE-AES", "SAMPLE-AES-CENC"].indexOf(L) ? (f.method = L, f.baseuri = t, f.reluri = A, f.key = null, f.iv = R) : L.startsWith("QINIU-PROTECT") && (f.method = L, f.iv = R, f.key = null, f.isQiniuDRM = !0));
                        break;
                      case "START":
                        var D = S,
                          x = new k.default(D).decimalFloatingPoint("TIME-OFFSET");
                        O.isFinite(x) && (c.startTimeOffset = x);
                        break;
                      case "MAP":
                        var I = new k.default(S);
                        g.relurl = I.URI, g.rawByteRange = I.BYTERANGE, g.baseurl = t, g.level = r, g.type = n, g.sn = "initSegment", c.initSegment = g, (g = new P.default).rawProgramDateTime = c.initSegment.rawProgramDateTime;
                        break;
                      default:
                        N.logger.warn("line parsed but not handled: " + a)
                    }
                  }
                }
                return (g = h) && !g.relurl && (c.fragments.pop(), d -= g.duration), c.totalduration = d, c.averagetargetduration = d / c.fragments.length, c.endSN = u - 1, c.startCC = c.fragments[0] ? c.fragments[0].cc : 0, c.endCC = p, !c.initSegment && c.fragments.length && c.fragments.every(function (e) {
                  return U.test(e.relurl)
                }) && (N.logger.warn("MP4 fragments found but no init segment (probably no MAP, incomplete M3U8), trying to fetch SIDX"), (g = new P.default).relurl = c.fragments[0].relurl, g.baseurl = t, g.level = r, g.type = n, g.sn = "initSegment", c.initSegment = g, c.needSidxRanges = !0), y && function (e, t) {
                  for (var r = e[t], n = t - 1; 0 <= n; n--) {
                    var i = e[n];
                    i.programDateTime = r.programDateTime - 1e3 * i.duration, r = i
                  }
                }(c.fragments, y), c
              }, d
            }();
          t.default = e
        }).call(this, n(2).Number)
      }, function (e, r, t) {
        (function (t) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var e = function () {
            function e(e) {
              this.endCC = 0, this.endSN = 0, this.fragments = [], this.initSegment = null, this.live = !0, this.needSidxRanges = !1, this.startCC = 0, this.startSN = 0, this.startTimeOffset = null, this.targetduration = 0, this.totalduration = 0, this.type = null, this.url = e, this.version = null
            }
            return Object.defineProperty(e.prototype, "hasProgramDateTime", {
              get: function () {
                return !(!this.fragments[0] || !t.isFinite(this.fragments[0].programDateTime))
              },
              enumerable: !0,
              configurable: !0
            }), e
          }();
          r.default = e
        }).call(this, t(2).Number)
      }, function (e, t, r) {
        (function (n) {
          Object.defineProperty(t, "__esModule", {
            value: !0
          });
          var i = /^(\d+)x(\d+)$/,
            a = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g,
            e = function () {
              function r(e) {
                for (var t in "string" == typeof e && (e = r.parseAttrList(e)), e) e.hasOwnProperty(t) && (this[t] = e[t])
              }
              return r.prototype.decimalInteger = function (e) {
                var t = parseInt(this[e], 10);
                return t > n.MAX_SAFE_INTEGER ? 1 / 0 : t
              }, r.prototype.hexadecimalInteger = function (e) {
                if (this[e]) {
                  var t = (this[e] || "0x").slice(2);
                  t = (1 & t.length ? "0" : "") + t;
                  for (var r = new Uint8Array(t.length / 2), n = 0; n < t.length / 2; n++) r[n] = parseInt(t.slice(2 * n, 2 * n + 2), 16);
                  return r
                }
                return null
              }, r.prototype.hexadecimalIntegerAsNumber = function (e) {
                var t = parseInt(this[e], 16);
                return t > n.MAX_SAFE_INTEGER ? 1 / 0 : t
              }, r.prototype.decimalFloatingPoint = function (e) {
                return parseFloat(this[e])
              }, r.prototype.enumeratedString = function (e) {
                return this[e]
              }, r.prototype.decimalResolution = function (e) {
                var t = i.exec(this[e]);
                if (null !== t) return {
                  width: parseInt(t[1], 10),
                  height: parseInt(t[2], 10)
                }
              }, r.parseAttrList = function (e) {
                var t, r = {};
                for (a.lastIndex = 0; null !== (t = a.exec(e));) {
                  var n = t[2];
                  0 === n.indexOf('"') && n.lastIndexOf('"') === n.length - 1 && (n = n.slice(1, -1)), r[t[1]] = n
                }
                return r
              }, r
            }();
          t.default = e
        }).call(this, r(2).Number)
      }, function (e, i, s) {
        (function (p) {
          var n, t = this && this.__extends || (n = Object.setPrototypeOf || {
              __proto__: []
            }
            instanceof Array && function (e, t) {
              e.__proto__ = t
            } || function (e, t) {
              for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function (e, t) {
              function r() {
                this.constructor = e
              }
              n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            });
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var o = s(1),
            e = s(4),
            a = s(3),
            h = s(0),
            r = function (n) {
              function e(e) {
                var t = n.call(this, e, o.default.FRAG_LOADING) || this;
                return t.loaders = {}, t
              }
              return t(e, n), e.prototype.destroy = function () {
                var e = this.loaders;
                for (var t in e) {
                  var r = e[t];
                  r && r.destroy()
                }
                this.loaders = {}, n.prototype.destroy.call(this)
              }, e.prototype.onFragLoading = function (e) {
                var t = e.frag,
                  r = t.type,
                  n = this.loaders,
                  i = this.hls.config,
                  a = i.fLoader,
                  o = i.loader;
                t.loaded = 0;
                var s, l, u, d = n[r];
                d && (h.logger.warn("abort previous fragment loader for type: " + r), d.abort()), d = n[r] = t.loader = i.fLoader ? new a(i) : new o(i), s = {
                  url: t.url,
                  frag: t,
                  responseType: "arraybuffer",
                  progressData: !1
                };
                var c = t.byteRangeStartOffset,
                  f = t.byteRangeEndOffset;
                p.isFinite(c) && p.isFinite(f) && (s.rangeStart = c, s.rangeEnd = f), l = {
                  timeout: i.fragLoadingTimeOut,
                  maxRetry: 0,
                  retryDelay: 0,
                  maxRetryDelay: i.fragLoadingMaxRetryTimeout
                }, u = {
                  onSuccess: this.loadsuccess.bind(this),
                  onError: this.loaderror.bind(this),
                  onTimeout: this.loadtimeout.bind(this),
                  onProgress: this.loadprogress.bind(this)
                }, d.load(s, l, u)
              }, e.prototype.loadsuccess = function (e, t, r, n) {
                void 0 === n && (n = null);
                var i = e.data,
                  a = r.frag;
                a.loader = void 0, this.loaders[a.type] = void 0, this.hls.trigger(o.default.FRAG_LOADED, {
                  payload: i,
                  frag: a,
                  stats: t,
                  networkDetails: n
                })
              }, e.prototype.loaderror = function (e, t, r) {
                void 0 === r && (r = null);
                var n = t.frag,
                  i = n.loader;
                i && i.abort(), this.loaders[n.type] = void 0, this.hls.trigger(o.default.ERROR, {
                  type: a.ErrorTypes.NETWORK_ERROR,
                  details: a.ErrorDetails.FRAG_LOAD_ERROR,
                  fatal: !1,
                  frag: t.frag,
                  response: e,
                  networkDetails: r
                })
              }, e.prototype.loadtimeout = function (e, t, r) {
                void 0 === r && (r = null);
                var n = t.frag,
                  i = n.loader;
                i && i.abort(), this.loaders[n.type] = void 0, this.hls.trigger(o.default.ERROR, {
                  type: a.ErrorTypes.NETWORK_ERROR,
                  details: a.ErrorDetails.FRAG_LOAD_TIMEOUT,
                  fatal: !1,
                  frag: t.frag,
                  networkDetails: r
                })
              }, e.prototype.loadprogress = function (e, t, r, n) {
                void 0 === n && (n = null);
                var i = t.frag;
                i.loaded = e.loaded, this.hls.trigger(o.default.FRAG_LOAD_PROGRESS, {
                  frag: i,
                  stats: e,
                  networkDetails: n
                })
              }, e
            }(e.default);
          i.default = r
        }).call(this, s(2).Number)
      }, function (e, t, r) {
        var n, i = this && this.__extends || (n = Object.setPrototypeOf || {
            __proto__: []
          }
          instanceof Array && function (e, t) {
            e.__proto__ = t
          } || function (e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
          },
          function (e, t) {
            function r() {
              this.constructor = e
            }
            n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
          });
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var d = r(1),
          a = r(4),
          o = r(3),
          c = r(0),
          s = function (r) {
            function e(e) {
              var t = r.call(this, e, d.default.KEY_LOADING) || this;
              return t.loaders = {}, t.decryptkey = null, t.decrypturl = null, t.qiniuDRMKey = e.config.qiniuDRMKey, t
            }
            return i(e, r), e.prototype.destroy = function () {
              for (var e in this.loaders) {
                var t = this.loaders[e];
                t && t.destroy()
              }
              this.loaders = {}, a.default.prototype.destroy.call(this)
            }, e.prototype.onKeyLoading = function (e) {
              if (this.qiniuDRMKey) this.loadQiniuDRMKey(e);
              else {
                var t = e.frag,
                  r = t.type,
                  n = this.loaders[r],
                  i = t.decryptdata,
                  a = i.uri;
                if (a !== this.decrypturl || null === this.decryptkey) {
                  var o, s, l, u = this.hls.config;
                  n && (c.logger.warn("abort previous key loader for type:" + r), n.abort()), t.loader = this.loaders[r] = new u.loader(u), this.decrypturl = a, this.decryptkey = null, o = {
                    url: a,
                    frag: t,
                    responseType: "arraybuffer"
                  }, s = {
                    timeout: u.fragLoadingTimeOut,
                    maxRetry: 0,
                    retryDelay: u.fragLoadingRetryDelay,
                    maxRetryDelay: u.fragLoadingMaxRetryTimeout
                  }, l = {
                    onSuccess: this.loadsuccess.bind(this),
                    onError: this.loaderror.bind(this),
                    onTimeout: this.loadtimeout.bind(this)
                  }, t.loader.load(o, s, l)
                } else this.decryptkey && (i.key = this.decryptkey, this.hls.trigger(d.default.KEY_LOADED, {
                  frag: t
                }))
              }
            }, e.prototype.loadsuccess = function (e, t, r) {
              var n = r.frag;
              this.decryptkey = n.decryptdata.key = new Uint8Array(e.data), n.loader = void 0, this.loaders[n.type] = void 0, this.hls.trigger(d.default.KEY_LOADED, {
                frag: n
              })
            }, e.prototype.loaderror = function (e, t) {
              var r = t.frag,
                n = r.loader;
              n && n.abort(), this.loaders[t.type] = void 0, this.hls.trigger(d.default.ERROR, {
                type: o.ErrorTypes.NETWORK_ERROR,
                details: o.ErrorDetails.KEY_LOAD_ERROR,
                fatal: !1,
                frag: r,
                response: e
              })
            }, e.prototype.loadtimeout = function (e, t) {
              var r = t.frag,
                n = r.loader;
              n && n.abort(), this.loaders[t.type] = void 0, this.hls.trigger(d.default.ERROR, {
                type: o.ErrorTypes.NETWORK_ERROR,
                details: o.ErrorDetails.KEY_LOAD_TIMEOUT,
                fatal: !1,
                frag: r
              })
            }, e.prototype.loadQiniuDRMKey = function (e) {
              var t = e.frag;
              this.decryptkey = t.decryptdata.key = new Uint8Array(this.qiniuDRMKey), t.loader = void 0, this.loaders[t.type] = void 0, this.hls.trigger(d.default.KEY_LOADED, {
                frag: t
              })
            }, e
          }(a.default);
        t.default = s
      }, function (e, l, E) {
        (function (u) {
          var n, t = this && this.__extends || (n = Object.setPrototypeOf || {
              __proto__: []
            }
            instanceof Array && function (e, t) {
              e.__proto__ = t
            } || function (e, t) {
              for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function (e, t) {
              function r() {
                this.constructor = e
              }
              n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            });
          Object.defineProperty(l, "__esModule", {
            value: !0
          });
          var h = E(10),
            f = E(8),
            p = E(31),
            g = E(1),
            r = E(9),
            d = E(15),
            i = E(13),
            c = E(23),
            a = E(48),
            o = E(3),
            y = E(0),
            m = E(49),
            v = E(50),
            s = E(51),
            b = E(52),
            e = function (n) {
              function e(e, t) {
                var r = n.call(this, e, g.default.MEDIA_ATTACHED, g.default.MEDIA_DETACHING, g.default.MANIFEST_LOADING, g.default.MANIFEST_PARSED, g.default.LEVEL_LOADED, g.default.KEY_LOADED, g.default.FRAG_LOADED, g.default.FRAG_LOAD_EMERGENCY_ABORTED, g.default.FRAG_PARSING_INIT_SEGMENT, g.default.FRAG_PARSING_DATA, g.default.FRAG_PARSED, g.default.ERROR, g.default.AUDIO_TRACK_SWITCHING, g.default.AUDIO_TRACK_SWITCHED, g.default.BUFFER_CREATED, g.default.BUFFER_APPENDED, g.default.BUFFER_FLUSHED) || this;
                return r.fragmentTracker = t, r.config = e.config, r.audioCodecSwap = !1, r._state = b.State.STOPPED, r.stallReported = !1, r.gapController = null, r.lastAutoLevelEnabled = r.hls.autoLevelEnabled, r
              }
              return t(e, n), e.prototype.onHandlerDestroying = function () {
                this.stopLoad(), n.prototype.onHandlerDestroying.call(this)
              }, e.prototype.onHandlerDestroyed = function () {
                this.state = b.State.STOPPED, this.fragmentTracker = null, n.prototype.onHandlerDestroyed.call(this)
              }, e.prototype.startLoad = function (e) {
                if (this.levels) {
                  var t = this.lastCurrentTime,
                    r = this.hls;
                  if (this.stopLoad(), this.setInterval(100), this.level = -1, this.fragLoadError = 0, !this.startFragRequested) {
                    var n = r.startLevel; - 1 === n && (n = 0, this.bitrateTest = !0), this.level = r.nextLoadLevel = n, this.loadedmetadata = !1
                  }
                  0 < t && -1 === e && (y.logger.log("override startPosition with lastCurrentTime @" + t.toFixed(3)), e = t), this.state = b.State.IDLE, this.nextLoadPosition = this.startPosition = this.lastCurrentTime = e, this.tick()
                } else this.forceStartLoad = !0, this.state = b.State.STOPPED
              }, e.prototype.stopLoad = function () {
                var e = this.fragCurrent;
                e && (e.loader && e.loader.abort(), this.fragmentTracker.removeFragment(e), this.fragCurrent = null), this.fragPrevious = null, this.demuxer && (this.demuxer.destroy(), this.demuxer = null), this.clearInterval(), this.state = b.State.STOPPED, this.forceStartLoad = !1
              }, e.prototype.doTick = function () {
                switch (this.state) {
                  case b.State.BUFFER_FLUSHING:
                    this.fragLoadError = 0;
                    break;
                  case b.State.IDLE:
                    this._doTickIdle();
                    break;
                  case b.State.WAITING_LEVEL:
                    var e = this.levels[this.level];
                    e && e.details && (this.state = b.State.IDLE);
                    break;
                  case b.State.FRAG_LOADING_WAITING_RETRY:
                    var t = window.performance.now(),
                      r = this.retryDate;
                    (!r || r <= t || this.media && this.media.seeking) && (y.logger.log("mediaController: retryDate reached, switch back to IDLE state"), this.state = b.State.IDLE);
                    break;
                  case b.State.ERROR:
                  case b.State.STOPPED:
                  case b.State.FRAG_LOADING:
                  case b.State.PARSING:
                  case b.State.PARSED:
                  case b.State.ENDED:
                }
                this._checkBuffer(), this._checkFragmentChanged()
              }, e.prototype._doTickIdle = function () {
                var e = this.hls,
                  t = e.config,
                  r = this.media;
                if (void 0 !== this.levelLastLoaded && (r || !this.startFragRequested && t.startFragPrefetch)) {
                  var n;
                  n = this.loadedmetadata ? r.currentTime : this.nextLoadPosition;
                  var i = e.nextLoadLevel,
                    a = this.levels[i];
                  if (a) {
                    var o, s = a.bitrate;
                    o = s ? Math.max(8 * t.maxBufferSize / s, t.maxBufferLength) : t.maxBufferLength, o = Math.min(o, t.maxMaxBufferLength);
                    var l = f.BufferHelper.bufferInfo(this.mediaBuffer ? this.mediaBuffer : r, n, t.maxBufferHole),
                      u = l.len;
                    if (!(o <= u)) {
                      y.logger.trace("buffer length of " + u.toFixed(3) + " is below max of " + o.toFixed(3) + ". checking for more payload ..."), this.level = e.nextLoadLevel = i;
                      var d = a.details;
                      if (!d || d.live && this.levelLastLoaded !== i) this.state = b.State.WAITING_LEVEL;
                      else {
                        if (this._streamEnded(l, d)) {
                          var c = {};
                          return this.altAudio && (c.type = "video"), this.hls.trigger(g.default.BUFFER_EOS, c), void(this.state = b.State.ENDED)
                        }
                        this._fetchPayloadOrEos(n, l, d)
                      }
                    }
                  }
                }
              }, e.prototype._fetchPayloadOrEos = function (e, t, r) {
                var n = this.fragPrevious,
                  i = this.level,
                  a = r.fragments,
                  o = a.length;
                if (0 !== o) {
                  var s, l = a[0].start,
                    u = a[o - 1].start + a[o - 1].duration,
                    d = t.end;
                  if (r.initSegment && !r.initSegment.data) s = r.initSegment;
                  else if (r.live) {
                    var c = this.config.initialLiveManifestSize;
                    if (o < c) return void y.logger.warn("Can not start playback of a level, reason: not enough fragments " + o + " < " + c);
                    if (null === (s = this._ensureFragmentAtLivePoint(r, d, l, u, n, a, o))) return
                  } else d < l && (s = a[0]);
                  s || (s = this._findFragment(l, n, o, a, d, u, r)), s && (s.encrypted ? (y.logger.log("Loading key for " + s.sn + " of [" + r.startSN + " ," + r.endSN + "],level " + i), this._loadKey(s)) : (y.logger.log("Loading " + s.sn + " of [" + r.startSN + " ," + r.endSN + "],level " + i + ", currentTime:" + e.toFixed(3) + ",bufferEnd:" + d.toFixed(3)), this._loadFragment(s)))
                }
              }, e.prototype._ensureFragmentAtLivePoint = function (e, t, r, n, i, a, o) {
                var s, l = this.hls.config,
                  u = this.media,
                  d = void 0 !== l.liveMaxLatencyDuration ? l.liveMaxLatencyDuration : l.liveMaxLatencyDurationCount * e.targetduration;
                if (t < Math.max(r - l.maxFragLookUpTolerance, n - d)) {
                  var c = this.liveSyncPosition = this.computeLivePosition(r, e);
                  y.logger.log("buffer end: " + t.toFixed(3) + " is located too far from the end of live sliding playlist, reset currentTime to : " + c.toFixed(3)), t = c, u && u.readyState && u.duration > c && (u.currentTime = c), this.nextLoadPosition = c
                }
                if (e.PTSKnown && n < t && u && u.readyState) return null;
                if (this.startFragRequested && !e.PTSKnown) {
                  if (i)
                    if (e.hasProgramDateTime) y.logger.log("live playlist, switching playlist, load frag with same PDT: " + i.programDateTime), s = v.findFragmentByPDT(a, i.endProgramDateTime, l.maxFragLookUpTolerance);
                    else {
                      var f = i.sn + 1;
                      if (f >= e.startSN && f <= e.endSN) {
                        var p = a[f - e.startSN];
                        i.cc === p.cc && (s = p, y.logger.log("live playlist, switching playlist, load frag with next SN: " + s.sn))
                      }
                      s || (s = h.default.search(a, function (e) {
                        return i.cc - e.cc
                      })) && y.logger.log("live playlist, switching playlist, load frag with same CC: " + s.sn)
                    } s || (s = a[Math.min(o - 1, Math.round(o / 2))], y.logger.log("live playlist, switching playlist, unknown, load middle frag : " + s.sn))
                }
                return s
              }, e.prototype._findFragment = function (e, t, r, n, i, a, o) {
                var s, l = this.hls.config;
                if (i < a) {
                  var u = i > a - l.maxFragLookUpTolerance ? 0 : l.maxFragLookUpTolerance;
                  s = v.findFragmentByPTS(t, n, i, u)
                } else s = n[r - 1];
                if (s) {
                  var d = s.sn - o.startSN,
                    c = t && s.level === t.level,
                    f = n[d - 1],
                    p = n[d + 1];
                  if (t && s.sn === t.sn)
                    if (c && !s.backtracked)
                      if (s.sn < o.endSN) {
                        var h = t.deltaPTS;
                        h && h > l.maxBufferHole && t.dropped && d ? (s = f, y.logger.warn("SN just loaded, with large PTS gap between audio and video, maybe frag is not starting with a keyframe ? load previous one to try to overcome this")) : (s = p, y.logger.log("SN just loaded, load next one: " + s.sn, s))
                      } else s = null;
                  else s.backtracked && (p && p.backtracked ? (y.logger.warn("Already backtracked from fragment " + p.sn + ", will not backtrack to fragment " + s.sn + ". Loading fragment " + p.sn), s = p) : (y.logger.warn("Loaded fragment with dropped frames, backtracking 1 segment to find a keyframe"), s.dropped = 0, f ? (s = f).backtracked = !0 : d && (s = null)))
                }
                return s
              }, e.prototype._loadKey = function (e) {
                this.state = b.State.KEY_LOADING, this.hls.trigger(g.default.KEY_LOADING, {
                  frag: e
                })
              }, e.prototype._loadFragment = function (e) {
                var t = this.fragmentTracker.getState(e);
                this.fragCurrent = e, this.startFragRequested = !0, u.isFinite(e.sn) && !e.bitrateTest && (this.nextLoadPosition = e.start + e.duration), e.backtracked || t === r.FragmentState.NOT_LOADED || t === r.FragmentState.PARTIAL ? (e.autoLevel = this.hls.autoLevelEnabled, e.bitrateTest = this.bitrateTest, this.hls.trigger(g.default.FRAG_LOADING, {
                  frag: e
                }), this.demuxer || (this.demuxer = new p.default(this.hls, "main")), this.state = b.State.FRAG_LOADING) : t === r.FragmentState.APPENDING && this._reduceMaxBufferLength(e.duration) && this.fragmentTracker.removeFragment(e)
              }, Object.defineProperty(e.prototype, "state", {
                get: function () {
                  return this._state
                },
                set: function (e) {
                  if (this.state !== e) {
                    var t = this.state;
                    this._state = e, y.logger.log("main stream:" + t + "->" + e), this.hls.trigger(g.default.STREAM_STATE_TRANSITION, {
                      previousState: t,
                      nextState: e
                    })
                  }
                },
                enumerable: !0,
                configurable: !0
              }), e.prototype.getBufferedFrag = function (e) {
                return this.fragmentTracker.getBufferedFrag(e, i.default.LevelType.MAIN)
              }, Object.defineProperty(e.prototype, "currentLevel", {
                get: function () {
                  var e = this.media;
                  if (e) {
                    var t = this.getBufferedFrag(e.currentTime);
                    if (t) return t.level
                  }
                  return -1
                },
                enumerable: !0,
                configurable: !0
              }), Object.defineProperty(e.prototype, "nextBufferedFrag", {
                get: function () {
                  var e = this.media;
                  return e ? this.followingBufferedFrag(this.getBufferedFrag(e.currentTime)) : null
                },
                enumerable: !0,
                configurable: !0
              }), e.prototype.followingBufferedFrag = function (e) {
                return e ? this.getBufferedFrag(e.endPTS + .5) : null
              }, Object.defineProperty(e.prototype, "nextLevel", {
                get: function () {
                  var e = this.nextBufferedFrag;
                  return e ? e.level : -1
                },
                enumerable: !0,
                configurable: !0
              }), e.prototype._checkFragmentChanged = function () {
                var e, t, r = this.media;
                if (r && r.readyState && (!1 === r.seeking || 1 === r.readyState) && ((t = r.currentTime) > this.lastCurrentTime && (this.lastCurrentTime = t), f.BufferHelper.isBuffered(r, t) ? e = this.getBufferedFrag(t) : f.BufferHelper.isBuffered(r, t + .1) && (e = this.getBufferedFrag(t + .1)), e)) {
                  var n = e;
                  if (this.hls.autoLevelEnabled !== this.lastAutoLevelEnabled && (this.hls.trigger(g.default.LEVEL_SWITCHED, {
                      level: n.level
                    }), this.lastAutoLevelEnabled = this.hls.autoLevelEnabled), n !== this.fragPlaying) {
                    this.hls.trigger(g.default.FRAG_CHANGED, {
                      frag: n
                    });
                    var i = n.level;
                    this.lastAutoLevelEnabled = this.hls.autoLevelEnabled, this.fragPlaying && this.fragPlaying.level === i && this.fragPlaying.autoLevel === n.autoLevel || this.hls.trigger(g.default.LEVEL_SWITCHED, {
                      level: i
                    }), this.fragPlaying = n
                  }
                }
              }, e.prototype.immediateLevelSwitch = function () {
                if (y.logger.log("immediateLevelSwitch"), !this.immediateSwitch) {
                  this.immediateSwitch = !0;
                  var e = this.media,
                    t = void 0;
                  e ? (t = e.paused, e.pause()) : t = !0, this.previouslyPaused = t
                }
                var r = this.fragCurrent;
                r && r.loader && r.loader.abort(), this.fragCurrent = null, this.flushMainBuffer(0, u.POSITIVE_INFINITY)
              }, e.prototype.immediateLevelSwitchEnd = function () {
                var e = this.media;
                e && e.buffered.length && (this.immediateSwitch = !1, f.BufferHelper.isBuffered(e, e.currentTime) && (e.currentTime -= 1e-4), this.previouslyPaused || e.play())
              }, e.prototype.nextLevelSwitch = function () {
                var e = this.media;
                if (e && e.readyState) {
                  var t, r = void 0,
                    n = void 0;
                  if ((t = this.getBufferedFrag(e.currentTime)) && 1 < t.startPTS && this.flushMainBuffer(0, t.startPTS - 1), e.paused) r = 0;
                  else {
                    var i = this.hls.nextLoadLevel,
                      a = this.levels[i],
                      o = this.fragLastKbps;
                    r = o && this.fragCurrent ? this.fragCurrent.duration * a.bitrate / (1e3 * o) + 1 : 0
                  }
                  if ((n = this.getBufferedFrag(e.currentTime + r)) && (n = this.followingBufferedFrag(n))) {
                    var s = this.fragCurrent;
                    s && s.loader && s.loader.abort(), this.fragCurrent = null, this.flushMainBuffer(n.maxStartPTS, u.POSITIVE_INFINITY)
                  }
                }
              }, e.prototype.flushMainBuffer = function (e, t) {
                this.state = b.State.BUFFER_FLUSHING;
                var r = {
                  startOffset: e,
                  endOffset: t
                };
                this.altAudio && (r.type = "video"), this.hls.trigger(g.default.BUFFER_FLUSHING, r)
              }, e.prototype.onMediaAttached = function (e) {
                var t = this.media = this.mediaBuffer = e.media;
                this.onvseeking = this.onMediaSeeking.bind(this), this.onvseeked = this.onMediaSeeked.bind(this), this.onvended = this.onMediaEnded.bind(this), t.addEventListener("seeking", this.onvseeking), t.addEventListener("seeked", this.onvseeked), t.addEventListener("ended", this.onvended);
                var r = this.config;
                this.levels && r.autoStartLoad && this.hls.startLoad(r.startPosition), this.gapController = new s.default(r, t, this.fragmentTracker, this.hls)
              }, e.prototype.onMediaDetaching = function () {
                var e = this.media;
                e && e.ended && (y.logger.log("MSE detaching and video ended, reset startPosition"), this.startPosition = this.lastCurrentTime = 0);
                var t = this.levels;
                t && t.forEach(function (e) {
                  e.details && e.details.fragments.forEach(function (e) {
                    e.backtracked = void 0
                  })
                }), e && (e.removeEventListener("seeking", this.onvseeking), e.removeEventListener("seeked", this.onvseeked), e.removeEventListener("ended", this.onvended), this.onvseeking = this.onvseeked = this.onvended = null), this.media = this.mediaBuffer = null, this.loadedmetadata = !1, this.stopLoad()
              }, e.prototype.onMediaSeeked = function () {
                var e = this.media,
                  t = e ? e.currentTime : void 0;
                u.isFinite(t) && y.logger.log("media seeked to " + t.toFixed(3)), this.tick()
              }, e.prototype.onManifestLoading = function () {
                y.logger.log("trigger BUFFER_RESET"), this.hls.trigger(g.default.BUFFER_RESET), this.fragmentTracker.removeAllFragments(), this.stalled = !1, this.startPosition = this.lastCurrentTime = 0
              }, e.prototype.onManifestParsed = function (e) {
                var t, r = !1,
                  n = !1;
                e.levels.forEach(function (e) {
                  (t = e.audioCodec) && (-1 !== t.indexOf("mp4a.40.2") && (r = !0), -1 !== t.indexOf("mp4a.40.5") && (n = !0))
                }), this.audioCodecSwitch = r && n, this.audioCodecSwitch && y.logger.log("both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"), this.levels = e.levels, this.startFragRequested = !1;
                var i = this.config;
                (i.autoStartLoad || this.forceStartLoad) && this.hls.startLoad(i.startPosition)
              }, e.prototype.onLevelLoaded = function (e) {
                var t = e.details,
                  r = e.level,
                  n = this.levels[this.levelLastLoaded],
                  i = this.levels[r],
                  a = t.totalduration,
                  o = 0;
                if (y.logger.log("level " + r + " loaded [" + t.startSN + "," + t.endSN + "],duration:" + a), t.live) {
                  var s = i.details;
                  s && 0 < t.fragments.length ? (c.mergeDetails(s, t), o = t.fragments[0].start, this.liveSyncPosition = this.computeLivePosition(o, s), t.PTSKnown && u.isFinite(o) ? y.logger.log("live playlist sliding:" + o.toFixed(3)) : (y.logger.log("live playlist - outdated PTS, unknown sliding"), m.alignStream(this.fragPrevious, n, t))) : (y.logger.log("live playlist - first load, unknown sliding"), t.PTSKnown = !1, m.alignStream(this.fragPrevious, n, t))
                } else t.PTSKnown = !1;
                if (i.details = t, this.levelLastLoaded = r, this.hls.trigger(g.default.LEVEL_UPDATED, {
                    details: t,
                    level: r
                  }), !1 === this.startFragRequested) {
                  if (-1 === this.startPosition || -1 === this.lastCurrentTime) {
                    var l = t.startTimeOffset;
                    u.isFinite(l) ? (l < 0 && (y.logger.log("negative start time offset " + l + ", count from end of last fragment"), l = o + a + l), y.logger.log("start time offset found in playlist, adjust startPosition to " + l), this.startPosition = l) : t.live ? (this.startPosition = this.computeLivePosition(o, t), y.logger.log("configure startPosition to " + this.startPosition)) : this.startPosition = 0, this.lastCurrentTime = this.startPosition
                  }
                  this.nextLoadPosition = this.startPosition
                }
                this.state === b.State.WAITING_LEVEL && (this.state = b.State.IDLE), this.tick()
              }, e.prototype.onKeyLoaded = function () {
                this.state === b.State.KEY_LOADING && (this.state = b.State.IDLE, this.tick())
              }, e.prototype.onFragLoaded = function (e) {
                var t = this.fragCurrent,
                  r = this.hls,
                  n = this.levels,
                  i = this.media,
                  a = e.frag;
                if (this.state === b.State.FRAG_LOADING && t && "main" === a.type && a.level === t.level && a.sn === t.sn) {
                  var o = e.stats,
                    s = n[t.level],
                    l = s.details;
                  if (this.bitrateTest = !1, this.stats = o, y.logger.log("Loaded " + t.sn + " of [" + l.startSN + " ," + l.endSN + "],level " + t.level), a.bitrateTest && r.nextLoadLevel) this.state = b.State.IDLE, this.startFragRequested = !1, o.tparsed = o.tbuffered = window.performance.now(), r.trigger(g.default.FRAG_BUFFERED, {
                    stats: o,
                    frag: t,
                    id: "main"
                  }), this.tick();
                  else if ("initSegment" === a.sn) this.state = b.State.IDLE, o.tparsed = o.tbuffered = window.performance.now(), l.initSegment.data = e.payload, r.trigger(g.default.FRAG_BUFFERED, {
                    stats: o,
                    frag: t,
                    id: "main"
                  }), this.tick();
                  else {
                    y.logger.log("Parsing " + t.sn + " of [" + l.startSN + " ," + l.endSN + "],level " + t.level + ", cc " + t.cc), this.state = b.State.PARSING, this.pendingBuffering = !0, this.appended = !1, a.bitrateTest && (a.bitrateTest = !1, this.fragmentTracker.onFragLoaded({
                      frag: a
                    }));
                    var u = !(i && i.seeking) && (l.PTSKnown || !l.live),
                      d = l.initSegment ? l.initSegment.data : [],
                      c = this._getAudioCodec(s);
                    (this.demuxer = this.demuxer || new p.default(this.hls, "main")).push(e.payload, d, c, s.videoCodec, t, l.totalduration, u)
                  }
                }
                this.fragLoadError = 0
              }, e.prototype.onFragParsingInitSegment = function (e) {
                var t = this.fragCurrent,
                  r = e.frag;
                if (t && "main" === e.id && r.sn === t.sn && r.level === t.level && this.state === b.State.PARSING) {
                  var n = e.tracks,
                    i = void 0,
                    a = void 0;
                  if (n.audio && this.altAudio && delete n.audio, a = n.audio) {
                    var o = this.levels[this.level].audioCodec,
                      s = navigator.userAgent.toLowerCase();
                    o && this.audioCodecSwap && (y.logger.log("swapping playlist audio codec"), o = -1 !== o.indexOf("mp4a.40.5") ? "mp4a.40.2" : "mp4a.40.5"), this.audioCodecSwitch && 1 !== a.metadata.channelCount && -1 === s.indexOf("firefox") && (o = "mp4a.40.5"), -1 !== s.indexOf("android") && "audio/mpeg" !== a.container && (o = "mp4a.40.2", y.logger.log("Android: force audio codec to " + o)), a.levelCodec = o, a.id = e.id
                  }
                  for (i in (a = n.video) && (a.levelCodec = this.levels[this.level].videoCodec, a.id = e.id), this.hls.trigger(g.default.BUFFER_CODECS, n), n) {
                    a = n[i], y.logger.log("main track:" + i + ",container:" + a.container + ",codecs[level/parsed]=[" + a.levelCodec + "/" + a.codec + "]");
                    var l = a.initSegment;
                    l && (this.appended = !0, this.pendingBuffering = !0, this.hls.trigger(g.default.BUFFER_APPENDING, {
                      type: i,
                      data: l,
                      parent: "main",
                      content: "initSegment"
                    }))
                  }
                  this.tick()
                }
              }, e.prototype.onFragParsingData = function (t) {
                var r = this,
                  e = this.fragCurrent,
                  n = t.frag;
                if (e && "main" === t.id && n.sn === e.sn && n.level === e.level && ("audio" !== t.type || !this.altAudio) && this.state === b.State.PARSING) {
                  var i = this.levels[this.level],
                    a = e;
                  if (u.isFinite(t.endPTS) || (t.endPTS = t.startPTS + e.duration, t.endDTS = t.startDTS + e.duration), !0 === t.hasAudio && a.addElementaryStream(d.default.ElementaryStreamTypes.AUDIO), !0 === t.hasVideo && a.addElementaryStream(d.default.ElementaryStreamTypes.VIDEO), y.logger.log("Parsed " + t.type + ",PTS:[" + t.startPTS.toFixed(3) + "," + t.endPTS.toFixed(3) + "],DTS:[" + t.startDTS.toFixed(3) + "/" + t.endDTS.toFixed(3) + "],nb:" + t.nb + ",dropped:" + (t.dropped || 0)), "video" === t.type)
                    if (a.dropped = t.dropped, a.dropped)
                      if (a.backtracked) y.logger.warn("Already backtracked on this fragment, appending with the gap", a.sn);
                      else {
                        var o = i.details;
                        if (!o || a.sn !== o.startSN) return y.logger.warn("missing video frame(s), backtracking fragment", a.sn), this.fragmentTracker.removeFragment(a), a.backtracked = !0, this.nextLoadPosition = t.startPTS, this.state = b.State.IDLE, this.fragPrevious = a, void this.tick();
                        y.logger.warn("missing video frame(s) on first frag, appending with gap", a.sn)
                      }
                  else a.backtracked = !1;
                  var s = c.updateFragPTSDTS(i.details, a, t.startPTS, t.endPTS, t.startDTS, t.endDTS),
                    l = this.hls;
                  l.trigger(g.default.LEVEL_PTS_UPDATED, {
                    details: i.details,
                    level: this.level,
                    drift: s,
                    type: t.type,
                    start: t.startPTS,
                    end: t.endPTS
                  }), [t.data1, t.data2].forEach(function (e) {
                    e && e.length && r.state === b.State.PARSING && (r.appended = !0, r.pendingBuffering = !0, l.trigger(g.default.BUFFER_APPENDING, {
                      type: t.type,
                      data: e,
                      parent: "main",
                      content: "data"
                    }))
                  }), this.tick()
                }
              }, e.prototype.onFragParsed = function (e) {
                var t = this.fragCurrent,
                  r = e.frag;
                t && "main" === e.id && r.sn === t.sn && r.level === t.level && this.state === b.State.PARSING && (this.stats.tparsed = window.performance.now(), this.state = b.State.PARSED, this._checkAppendedParsed())
              }, e.prototype.onAudioTrackSwitching = function (e) {
                var t = !!e.url,
                  r = e.id;
                if (!t) {
                  if (this.mediaBuffer !== this.media) {
                    y.logger.log("switching on main audio, use media.buffered to schedule main fragment loading"), this.mediaBuffer = this.media;
                    var n = this.fragCurrent;
                    n.loader && (y.logger.log("switching to main audio track, cancel main fragment load"), n.loader.abort()), this.fragCurrent = null, this.fragPrevious = null, this.demuxer && (this.demuxer.destroy(), this.demuxer = null), this.state = b.State.IDLE
                  }
                  var i = this.hls;
                  i.trigger(g.default.BUFFER_FLUSHING, {
                    startOffset: 0,
                    endOffset: u.POSITIVE_INFINITY,
                    type: "audio"
                  }), i.trigger(g.default.AUDIO_TRACK_SWITCHED, {
                    id: r
                  }), this.altAudio = !1
                }
              }, e.prototype.onAudioTrackSwitched = function (e) {
                var t = e.id,
                  r = !!this.hls.audioTracks[t].url;
                if (r) {
                  var n = this.videoBuffer;
                  n && this.mediaBuffer !== n && (y.logger.log("switching on alternate audio, use video.buffered to schedule main fragment loading"), this.mediaBuffer = n)
                }
                this.altAudio = r, this.tick()
              }, e.prototype.onBufferCreated = function (e) {
                var t, r, n = e.tracks,
                  i = !1;
                for (var a in n) {
                  var o = n[a];
                  "main" === o.id ? (t = o, "video" === (r = a) && (this.videoBuffer = n[a].buffer)) : i = !0
                }
                this.mediaBuffer = i && t ? (y.logger.log("alternate track found, use " + r + ".buffered to schedule main fragment loading"), t.buffer) : this.media
              }, e.prototype.onBufferAppended = function (e) {
                if ("main" === e.parent) {
                  var t = this.state;
                  t !== b.State.PARSING && t !== b.State.PARSED || (this.pendingBuffering = 0 < e.pending, this._checkAppendedParsed())
                }
              }, e.prototype._checkAppendedParsed = function () {
                if (!(this.state !== b.State.PARSED || this.appended && this.pendingBuffering)) {
                  var e = this.fragCurrent;
                  if (e) {
                    var t = this.mediaBuffer ? this.mediaBuffer : this.media;
                    y.logger.log("main buffered : " + a.default.toString(t.buffered)), this.fragPrevious = e;
                    var r = this.stats;
                    r.tbuffered = window.performance.now(), this.fragLastKbps = Math.round(8 * r.total / (r.tbuffered - r.tfirst)), this.hls.trigger(g.default.FRAG_BUFFERED, {
                      stats: r,
                      frag: e,
                      id: "main"
                    }), this.state = b.State.IDLE
                  }
                  this.tick()
                }
              }, e.prototype.onError = function (e) {
                var t = e.frag || this.fragCurrent;
                if (!t || "main" === t.type) {
                  var r = !!this.media && f.BufferHelper.isBuffered(this.media, this.media.currentTime) && f.BufferHelper.isBuffered(this.media, this.media.currentTime + .5);
                  switch (e.details) {
                    case o.ErrorDetails.FRAG_LOAD_ERROR:
                    case o.ErrorDetails.FRAG_LOAD_TIMEOUT:
                    case o.ErrorDetails.KEY_LOAD_ERROR:
                    case o.ErrorDetails.KEY_LOAD_TIMEOUT:
                      if (!e.fatal)
                        if (this.fragLoadError + 1 <= this.config.fragLoadingMaxRetry) {
                          var n = Math.min(Math.pow(2, this.fragLoadError) * this.config.fragLoadingRetryDelay, this.config.fragLoadingMaxRetryTimeout);
                          y.logger.warn("mediaController: frag loading failed, retry in " + n + " ms"), this.retryDate = window.performance.now() + n, this.loadedmetadata || (this.startFragRequested = !1, this.nextLoadPosition = this.startPosition), this.fragLoadError++, this.state = b.State.FRAG_LOADING_WAITING_RETRY
                        } else y.logger.error("mediaController: " + e.details + " reaches max retry, redispatch as fatal ..."), e.fatal = !0, this.state = b.State.ERROR;
                      break;
                    case o.ErrorDetails.LEVEL_LOAD_ERROR:
                    case o.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                      this.state !== b.State.ERROR && (e.fatal ? (this.state = b.State.ERROR, y.logger.warn("streamController: " + e.details + ",switch to " + this.state + " state ...")) : e.levelRetry || this.state !== b.State.WAITING_LEVEL || (this.state = b.State.IDLE));
                      break;
                    case o.ErrorDetails.BUFFER_FULL_ERROR:
                      "main" !== e.parent || this.state !== b.State.PARSING && this.state !== b.State.PARSED || (r ? (this._reduceMaxBufferLength(this.config.maxBufferLength), this.state = b.State.IDLE) : (y.logger.warn("buffer full error also media.currentTime is not buffered, flush everything"), this.fragCurrent = null, this.flushMainBuffer(0, u.POSITIVE_INFINITY)))
                  }
                }
              }, e.prototype._reduceMaxBufferLength = function (e) {
                var t = this.config;
                return t.maxMaxBufferLength >= e && (t.maxMaxBufferLength /= 2, y.logger.warn("main:reduce max buffer length to " + t.maxMaxBufferLength + "s"), !0)
              }, e.prototype._checkBuffer = function () {
                var e = this.media;
                if (e && 0 !== e.readyState) {
                  var t = (this.mediaBuffer ? this.mediaBuffer : e).buffered;
                  !this.loadedmetadata && t.length ? (this.loadedmetadata = !0, this._seekToStartPos()) : this.immediateSwitch ? this.immediateLevelSwitchEnd() : this.gapController.poll(this.lastCurrentTime, t)
                }
              }, e.prototype.onFragLoadEmergencyAborted = function () {
                this.state = b.State.IDLE, this.loadedmetadata || (this.startFragRequested = !1, this.nextLoadPosition = this.startPosition), this.tick()
              }, e.prototype.onBufferFlushed = function () {
                var e = this.mediaBuffer ? this.mediaBuffer : this.media;
                e && this.fragmentTracker.detectEvictedFragments(d.default.ElementaryStreamTypes.VIDEO, e.buffered), this.state = b.State.IDLE, this.fragPrevious = null
              }, e.prototype.swapAudioCodec = function () {
                this.audioCodecSwap = !this.audioCodecSwap
              }, e.prototype.computeLivePosition = function (e, t) {
                var r = void 0 !== this.config.liveSyncDuration ? this.config.liveSyncDuration : this.config.liveSyncDurationCount * t.targetduration;
                return e + Math.max(0, t.totalduration - r)
              }, e.prototype._seekToStartPos = function () {
                var e = this.media,
                  t = e.currentTime,
                  r = e.seeking ? t : this.startPosition;
                t !== r && (y.logger.log("target start position not buffered, seek to buffered.start(0) " + r + " from current time " + t + " "), e.currentTime = r)
              }, e.prototype._getAudioCodec = function (e) {
                var t = this.config.defaultAudioCodec || e.audioCodec;
                return this.audioCodecSwap && (y.logger.log("swapping playlist audio codec"), t && (t = -1 !== t.indexOf("mp4a.40.5") ? "mp4a.40.2" : "mp4a.40.5")), t
              }, Object.defineProperty(e.prototype, "liveSyncPosition", {
                get: function () {
                  return this._liveSyncPosition
                },
                set: function (e) {
                  this._liveSyncPosition = e
                },
                enumerable: !0,
                configurable: !0
              }), e
            }(b.default);
          l.default = e
        }).call(this, E(2).Number)
      }, function (e, n, i) {
        (function (m) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var u = i(32),
            d = i(1),
            c = i(18),
            v = i(0),
            f = i(3),
            e = i(12),
            t = i(6),
            p = i(22),
            h = t.getSelfScope(),
            g = e.getMediaSource(),
            r = function () {
              function e(r, e) {
                var n = this;
                this.hls = r, this.id = e;
                var t = this.observer = new p.Observer,
                  i = r.config,
                  a = function (e, t) {
                    (t = t || {}).frag = n.frag, t.id = n.id, r.trigger(e, t)
                  };
                t.on(d.default.FRAG_DECRYPTED, a), t.on(d.default.FRAG_PARSING_INIT_SEGMENT, a), t.on(d.default.FRAG_PARSING_DATA, a), t.on(d.default.FRAG_PARSED, a), t.on(d.default.ERROR, a), t.on(d.default.FRAG_PARSING_METADATA, a), t.on(d.default.FRAG_PARSING_USERDATA, a), t.on(d.default.INIT_PTS_FOUND, a);
                var o = {
                    mp4: g.isTypeSupported("video/mp4"),
                    mpeg: g.isTypeSupported("audio/mpeg"),
                    mp3: g.isTypeSupported('audio/mp4; codecs="mp3"')
                  },
                  s = navigator.vendor;
                if (i.enableWorker && "undefined" != typeof Worker) {
                  v.logger.log("demuxing in webworker");
                  var l = void 0;
                  try {
                    l = this.w = u(46), this.onwmsg = this.onWorkerMessage.bind(this), l.addEventListener("message", this.onwmsg), l.onerror = function (e) {
                      r.trigger(d.default.ERROR, {
                        type: f.ErrorTypes.OTHER_ERROR,
                        details: f.ErrorDetails.INTERNAL_EXCEPTION,
                        fatal: !0,
                        event: "demuxerWorker",
                        err: {
                          message: e.message + " (" + e.filename + ":" + e.lineno + ")"
                        }
                      })
                    }, l.postMessage({
                      cmd: "init",
                      typeSupported: o,
                      vendor: s,
                      id: e,
                      config: JSON.stringify(i)
                    })
                  } catch (r) {
                    v.logger.warn("Error in worker:", r), v.logger.error("Error while initializing DemuxerWorker, fallback on DemuxerInline"), l && h.URL.revokeObjectURL(l.objectURL), this.demuxer = new c.default(t, o, i, s), this.w = void 0
                  }
                } else this.demuxer = new c.default(t, o, i, s)
              }
              return e.prototype.destroy = function () {
                var e = this.w;
                if (e) e.removeEventListener("message", this.onwmsg), e.terminate(), this.w = null;
                else {
                  var t = this.demuxer;
                  t && (t.destroy(), this.demuxer = null)
                }
                var r = this.observer;
                r && (r.removeAllListeners(), this.observer = null)
              }, e.prototype.push = function (e, t, r, n, i, a, o, s) {
                var l = this.w,
                  u = m.isFinite(i.startPTS) ? i.startPTS : i.start,
                  d = i.decryptdata,
                  c = this.frag,
                  f = !(c && i.cc === c.cc),
                  p = !(c && i.level === c.level),
                  h = c && i.sn === c.sn + 1,
                  g = !p && h;
                if (f && v.logger.log(this.id + ":discontinuity detected"), p && v.logger.log(this.id + ":switch detected"), this.frag = i, l) l.postMessage({
                  cmd: "demux",
                  data: e,
                  decryptdata: d,
                  initSegment: t,
                  audioCodec: r,
                  videoCodec: n,
                  timeOffset: u,
                  discontinuity: f,
                  trackSwitch: p,
                  contiguous: g,
                  duration: a,
                  accurateTimeOffset: o,
                  defaultInitPTS: s
                }, e instanceof ArrayBuffer ? [e] : []);
                else {
                  var y = this.demuxer;
                  y && y.push(e, d, t, r, n, u, f, p, g, a, o, s)
                }
              }, e.prototype.onWorkerMessage = function (e) {
                var t = e.data,
                  r = this.hls;
                switch (t.event) {
                  case "init":
                    h.URL.revokeObjectURL(this.w.objectURL);
                    break;
                  case d.default.FRAG_PARSING_DATA:
                    t.data.data1 = new Uint8Array(t.data1), t.data2 && (t.data.data2 = new Uint8Array(t.data2));
                  default:
                    t.data = t.data || {}, t.data.frag = this.frag, t.data.id = this.id, r.trigger(t.event, t.data)
                }
              }, e
            }();
          n.default = r
        }).call(this, i(2).Number)
      }, function (e, t, p) {
        function l(r) {
          var n = {};

          function i(e) {
            if (n[e]) return n[e].exports;
            var t = n[e] = {
              i: e,
              l: !1,
              exports: {}
            };
            return r[e].call(t.exports, t, t.exports, i), t.l = !0, t.exports
          }
          i.m = r, i.c = n, i.i = function (e) {
            return e
          }, i.d = function (e, t, r) {
            i.o(e, t) || Object.defineProperty(e, t, {
              configurable: !1,
              enumerable: !0,
              get: r
            })
          }, i.r = function (e) {
            Object.defineProperty(e, "__esModule", {
              value: !0
            })
          }, i.n = function (e) {
            var t = e && e.__esModule ? function () {
              return e.default
            } : function () {
              return e
            };
            return i.d(t, "a", t), t
          }, i.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
          }, i.p = "/", i.oe = function (e) {
            throw console.error(e), e
          };
          var e = i(i.s = ENTRY_MODULE);
          return e.default || e
        }
        var h = "[\\.|\\-|\\+|\\w|/|@]+",
          g = "\\((/\\*.*?\\*/)?s?.*?(" + h + ").*?\\)";

        function y(e) {
          return (e + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
        }

        function f(e, t, r) {
          var n = {};
          n[r] = [];
          var i, a = t.toString(),
            o = a.match(/^function\s?\(\w+,\s*\w+,\s*(\w+)\)/);
          if (!o) return n;
          for (var s, l = o[1], u = new RegExp("(\\\\n|\\W)" + y(l) + g, "g"); s = u.exec(a);) "dll-reference" !== s[3] && n[r].push(s[3]);
          for (u = new RegExp("\\(" + y(l) + '\\("(dll-reference\\s(' + h + '))"\\)\\)' + g, "g"); s = u.exec(a);) e[s[2]] || (n[r].push(s[1]), e[s[2]] = p(s[1]).m), n[s[2]] = n[s[2]] || [], n[s[2]].push(s[4]);
          for (var d = Object.keys(n), c = 0; c < d.length; c++)
            for (var f = 0; f < n[d[c]].length; f++) i = n[d[c]][f], !isNaN(1 * i) && (n[d[c]][f] = 1 * n[d[c]][f]);
          return n
        }

        function m(r) {
          return Object.keys(r).reduce(function (e, t) {
            return e || 0 < r[t].length
          }, !1)
        }
        e.exports = function (e, t) {
          t = t || {};
          var r = {
              main: p.m
            },
            n = t.all ? {
              main: Object.keys(r.main)
            } : function (e, t) {
              for (var r = {
                  main: [t]
                }, n = {
                  main: []
                }, i = {
                  main: {}
                }; m(r);)
                for (var a = Object.keys(r), o = 0; o < a.length; o++) {
                  var s = a[o],
                    l = r[s].pop();
                  if (i[s] = i[s] || {}, !i[s][l] && e[s][l]) {
                    i[s][l] = !0, n[s] = n[s] || [], n[s].push(l);
                    for (var u = f(e, e[s][l], s), d = Object.keys(u), c = 0; c < d.length; c++) r[d[c]] = r[d[c]] || [], r[d[c]] = r[d[c]].concat(u[d[c]])
                  }
                }
              return n
            }(r, e),
            i = "";
          Object.keys(n).filter(function (e) {
            return "main" !== e
          }).forEach(function (t) {
            for (var e = 0; n[t][e];) e++;
            n[t].push(e), r[t][e] = "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })", i = i + "var " + t + " = (" + l.toString().replace("ENTRY_MODULE", JSON.stringify(e)) + ")({" + n[t].map(function (e) {
              return JSON.stringify(e) + ": " + r[t][e].toString()
            }).join(",") + "});\n"
          }), i = i + "new ((" + l.toString().replace("ENTRY_MODULE", JSON.stringify(e)) + ")({" + n.main.map(function (e) {
            return JSON.stringify(e) + ": " + r.main[e].toString()
          }).join(",") + "}))(self);";
          var a = new window.Blob([i], {
            type: "text/javascript"
          });
          if (t.bare) return a;
          var o = (window.URL || window.webkitURL || window.mozURL || window.msURL).createObjectURL(a),
            s = new window.Worker(o);
          return s.objectURL = o, s
        }
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var n = function () {
          function e(e, t) {
            this.subtle = e, this.aesIV = t
          }
          return e.prototype.decrypt = function (e, t) {
            return this.subtle.decrypt({
              name: "AES-CBC",
              iv: this.aesIV
            }, t, e)
          }, e
        }();
        t.default = n
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var n = function () {
          function e(e, t) {
            this.subtle = e, this.key = t
          }
          return e.prototype.expandKey = function () {
            return this.subtle.importKey("raw", this.key, {
              name: "AES-CBC"
            }, !1, ["encrypt", "decrypt"])
          }, e
        }();
        t.default = n
      }, function (e, t, r) {
        function C(e) {
          var t = e.byteLength,
            r = t && new DataView(e).getUint8(t - 1);
          return r ? e.slice(0, t - r) : e
        }
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.removePadding = C;
        var n = function () {
          function e() {
            this.rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], this.subMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)], this.invSubMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)], this.sBox = new Uint32Array(256), this.invSBox = new Uint32Array(256), this.key = new Uint32Array(0), this.initTable()
          }
          return e.prototype.uint8ArrayToUint32Array_ = function (e) {
            for (var t = new DataView(e), r = new Uint32Array(4), n = 0; n < 4; n++) r[n] = t.getUint32(4 * n);
            return r
          }, e.prototype.initTable = function () {
            var e = this.sBox,
              t = this.invSBox,
              r = this.subMix,
              n = r[0],
              i = r[1],
              a = r[2],
              o = r[3],
              s = this.invSubMix,
              l = s[0],
              u = s[1],
              d = s[2],
              c = s[3],
              f = new Uint32Array(256),
              p = 0,
              h = 0,
              g = 0;
            for (g = 0; g < 256; g++) f[g] = g < 128 ? g << 1 : g << 1 ^ 283;
            for (g = 0; g < 256; g++) {
              var y = h ^ h << 1 ^ h << 2 ^ h << 3 ^ h << 4;
              y = y >>> 8 ^ 255 & y ^ 99, e[p] = y, t[y] = p;
              var m = f[p],
                v = f[m],
                b = f[v],
                E = 257 * f[y] ^ 16843008 * y;
              n[p] = E << 24 | E >>> 8, i[p] = E << 16 | E >>> 16, a[p] = E << 8 | E >>> 24, o[p] = E, E = 16843009 * b ^ 65537 * v ^ 257 * m ^ 16843008 * p, l[y] = E << 24 | E >>> 8, u[y] = E << 16 | E >>> 16, d[y] = E << 8 | E >>> 24, c[y] = E, p ? (p = m ^ f[f[f[b ^ m]]], h ^= f[f[h]]) : p = h = 1
            }
          }, e.prototype.expandKey = function (e) {
            for (var t = this.uint8ArrayToUint32Array_(e), r = !0, n = 0; n < t.length && r;) r = t[n] === this.key[n], n++;
            if (!r) {
              this.key = t;
              var i = this.keySize = t.length;
              if (4 !== i && 6 !== i && 8 !== i) throw new Error("Invalid aes key size=" + i);
              var a, o, s, l, u = this.ksRows = 4 * (i + 6 + 1),
                d = this.keySchedule = new Uint32Array(u),
                c = this.invKeySchedule = new Uint32Array(u),
                f = this.sBox,
                p = this.rcon,
                h = this.invSubMix,
                g = h[0],
                y = h[1],
                m = h[2],
                v = h[3];
              for (a = 0; a < u; a++) a < i ? s = d[a] = t[a] : (l = s, a % i == 0 ? (l = f[(l = l << 8 | l >>> 24) >>> 24] << 24 | f[l >>> 16 & 255] << 16 | f[l >>> 8 & 255] << 8 | f[255 & l], l ^= p[a / i | 0] << 24) : 6 < i && a % i == 4 && (l = f[l >>> 24] << 24 | f[l >>> 16 & 255] << 16 | f[l >>> 8 & 255] << 8 | f[255 & l]), d[a] = s = (d[a - i] ^ l) >>> 0);
              for (o = 0; o < u; o++) a = u - o, l = 3 & o ? d[a] : d[a - 4], c[o] = o < 4 || a <= 4 ? l : g[f[l >>> 24]] ^ y[f[l >>> 16 & 255]] ^ m[f[l >>> 8 & 255]] ^ v[f[255 & l]], c[o] = c[o] >>> 0
            }
          }, e.prototype.networkToHostOrderSwap = function (e) {
            return e << 24 | (65280 & e) << 8 | (16711680 & e) >> 8 | e >>> 24
          }, e.prototype.decrypt = function (e, t, r, n) {
            for (var i, a, o, s, l, u, d, c, f, p, h, g, y, m, v = this.keySize + 6, b = this.invKeySchedule, E = this.invSBox, S = this.invSubMix, _ = S[0], T = S[1], w = S[2], L = S[3], A = this.uint8ArrayToUint32Array_(r), R = A[0], D = A[1], x = A[2], I = A[3], O = new Int32Array(e), P = new Int32Array(O.length), M = this.networkToHostOrderSwap; t < O.length;) {
              for (f = M(O[t]), p = M(O[t + 1]), h = M(O[t + 2]), g = M(O[t + 3]), l = f ^ b[0], u = g ^ b[1], d = h ^ b[2], c = p ^ b[3], y = 4, m = 1; m < v; m++) i = _[l >>> 24] ^ T[u >> 16 & 255] ^ w[d >> 8 & 255] ^ L[255 & c] ^ b[y], a = _[u >>> 24] ^ T[d >> 16 & 255] ^ w[c >> 8 & 255] ^ L[255 & l] ^ b[y + 1], o = _[d >>> 24] ^ T[c >> 16 & 255] ^ w[l >> 8 & 255] ^ L[255 & u] ^ b[y + 2], s = _[c >>> 24] ^ T[l >> 16 & 255] ^ w[u >> 8 & 255] ^ L[255 & d] ^ b[y + 3], l = i, u = a, d = o, c = s, y += 4;
              i = E[l >>> 24] << 24 ^ E[u >> 16 & 255] << 16 ^ E[d >> 8 & 255] << 8 ^ E[255 & c] ^ b[y], a = E[u >>> 24] << 24 ^ E[d >> 16 & 255] << 16 ^ E[c >> 8 & 255] << 8 ^ E[255 & l] ^ b[y + 1], o = E[d >>> 24] << 24 ^ E[c >> 16 & 255] << 16 ^ E[l >> 8 & 255] << 8 ^ E[255 & u] ^ b[y + 2], s = E[c >>> 24] << 24 ^ E[l >> 16 & 255] << 16 ^ E[u >> 8 & 255] << 8 ^ E[255 & d] ^ b[y + 3], y += 3, P[t] = M(i ^ R), P[t + 1] = M(s ^ D), P[t + 2] = M(o ^ x), P[t + 3] = M(a ^ I), R = f, D = p, x = h, I = g, t += 4
            }
            return n ? C(P.buffer) : P.buffer
          }, e.prototype.destroy = function () {
            this.key = void 0, this.keySize = void 0, this.ksRows = void 0, this.sBox = void 0, this.invSBox = void 0, this.subMix = void 0, this.invSubMix = void 0, this.keySchedule = void 0, this.invKeySchedule = void 0, this.rcon = void 0
          }, e
        }();
        t.default = n
      }, function (e, t, r) {
        (function (h) {
          Object.defineProperty(t, "__esModule", {
            value: !0
          });
          var g = r(20),
            y = r(0),
            m = r(11),
            e = function () {
              function e(e, t, r) {
                this.observer = e, this.config = r, this.remuxer = t
              }
              return e.prototype.resetInitSegment = function (e, t, r, n) {
                this._audioTrack = {
                  container: "audio/adts",
                  type: "audio",
                  id: 0,
                  sequenceNumber: 0,
                  isAAC: !0,
                  samples: [],
                  len: 0,
                  manifestCodec: t,
                  duration: n,
                  inputTimeScale: 9e4
                }
              }, e.prototype.resetTimeStamp = function () {}, e.probe = function (e) {
                if (!e) return !1;
                for (var t = (m.default.getID3Data(e, 0) || []).length, r = e.length; t < r; t++)
                  if (g.probe(e, t)) return y.logger.log("ADTS sync word found !"), !0;
                return !1
              }, e.prototype.append = function (e, t, r, n) {
                for (var i = this._audioTrack, a = m.default.getID3Data(e, 0) || [], o = m.default.getTimeStamp(a), s = h.isFinite(o) ? 90 * o : 9e4 * t, l = 0, u = s, d = e.length, c = a.length, f = [{
                    pts: u,
                    dts: u,
                    data: a
                  }]; c < d - 1;)
                  if (g.isHeader(e, c) && c + 5 < d) {
                    g.initTrackConfig(i, this.observer, e, c, i.manifestCodec);
                    var p = g.appendFrame(i, e, c, s, l);
                    if (!p) {
                      y.logger.log("Unable to parse AAC frame");
                      break
                    }
                    c += p.length, u = p.sample.pts, l++
                  } else m.default.isHeader(e, c) ? (a = m.default.getID3Data(e, c), f.push({
                    pts: u,
                    dts: u,
                    data: a
                  }), c += a.length) : c++;
                this.remuxer.remux(i, {
                  samples: []
                }, {
                  samples: f,
                  inputTimeScale: 9e4
                }, {
                  samples: []
                }, t, r, n)
              }, e.prototype.destroy = function () {}, e
            }();
          t.default = e
        }).call(this, r(2).Number)
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var y = r(20),
          s = r(21),
          P = r(1),
          w = r(38),
          n = r(39),
          M = r(0),
          C = r(3),
          i = {
            video: 1,
            audio: 2,
            id3: 3,
            text: 4
          },
          a = function () {
            function O(e, t, r, n) {
              this.observer = e, this.config = r, this.typeSupported = n, this.remuxer = t, this.sampleAes = null
            }
            return O.prototype.setDecryptData = function (e) {
              null != e && null != e.key && "SAMPLE-AES" === e.method ? this.sampleAes = new n.default(this.observer, this.config, e, this.discardEPB) : this.sampleAes = null
            }, O.probe = function (e) {
              var t = O._syncOffset(e);
              return !(t < 0 || (t && M.logger.warn("MPEG2-TS detected but first sync word found @ offset " + t + ", junk ahead ?"), 0))
            }, O._syncOffset = function (e) {
              for (var t = Math.min(1e3, e.length - 564), r = 0; r < t;) {
                if (71 === e[r] && 71 === e[r + 188] && 71 === e[r + 376]) return r;
                r++
              }
              return -1
            }, O.createTrack = function (e, t) {
              return {
                container: "video" === e || "audio" === e ? "video/mp2t" : void 0,
                type: e,
                id: i[e],
                pid: -1,
                inputTimeScale: 9e4,
                sequenceNumber: 0,
                samples: [],
                len: 0,
                dropped: "video" === e ? 0 : void 0,
                isAAC: "audio" === e || void 0,
                duration: "audio" === e ? t : void 0
              }
            }, O.prototype.resetInitSegment = function (e, t, r, n) {
              this.pmtParsed = !1, this._pmtId = -1, this._avcTrack = O.createTrack("video", n), this._audioTrack = O.createTrack("audio", n), this._id3Track = O.createTrack("id3", n), this._txtTrack = O.createTrack("text", n), this.aacOverFlow = null, this.aacLastPTS = null, this.avcSample = null, this.audioCodec = t, this.videoCodec = r, this._duration = n
            }, O.prototype.resetTimeStamp = function () {}, O.prototype.append = function (e, t, r, n) {
              var i, a, o, s, l, u = e.length,
                d = !1;
              this.contiguous = r;
              var c = this.pmtParsed,
                f = this._avcTrack,
                p = this._audioTrack,
                h = this._id3Track,
                g = f.pid,
                y = p.pid,
                m = h.pid,
                v = this._pmtId,
                b = f.pesData,
                E = p.pesData,
                S = h.pesData,
                _ = this._parsePAT,
                T = this._parsePMT,
                w = this._parsePES,
                L = this._parseAVCPES.bind(this),
                A = this._parseAACPES.bind(this),
                R = this._parseMPEGPES.bind(this),
                D = this._parseID3PES.bind(this),
                x = O._syncOffset(e);
              for (u -= (u + x) % 188, i = x; i < u; i += 188)
                if (71 === e[i]) {
                  if (a = !!(64 & e[i + 1]), o = ((31 & e[i + 1]) << 8) + e[i + 2], 1 < (48 & e[i + 3]) >> 4) {
                    if ((s = i + 5 + e[i + 4]) === i + 188) continue
                  } else s = i + 4;
                  switch (o) {
                    case g:
                      a && (b && (l = w(b)) && void 0 !== l.pts && L(l, !1), b = {
                        data: [],
                        size: 0
                      }), b && (b.data.push(e.subarray(s, i + 188)), b.size += i + 188 - s);
                      break;
                    case y:
                      a && (E && (l = w(E)) && void 0 !== l.pts && (p.isAAC ? A(l) : R(l)), E = {
                        data: [],
                        size: 0
                      }), E && (E.data.push(e.subarray(s, i + 188)), E.size += i + 188 - s);
                      break;
                    case m:
                      a && (S && (l = w(S)) && void 0 !== l.pts && D(l), S = {
                        data: [],
                        size: 0
                      }), S && (S.data.push(e.subarray(s, i + 188)), S.size += i + 188 - s);
                      break;
                    case 0:
                      a && (s += e[s] + 1), v = this._pmtId = _(e, s);
                      break;
                    case v:
                      a && (s += e[s] + 1);
                      var I = T(e, s, !0 === this.typeSupported.mpeg || !0 === this.typeSupported.mp3, null != this.sampleAes);
                      0 < (g = I.avc) && (f.pid = g), 0 < (y = I.audio) && (p.pid = y, p.isAAC = I.isAAC), 0 < (m = I.id3) && (h.pid = m), d && !c && (M.logger.log("reparse from beginning"), d = !1, i = x - 188), c = this.pmtParsed = !0;
                      break;
                    case 17:
                    case 8191:
                      break;
                    default:
                      d = !0
                  }
                } else this.observer.trigger(P.default.ERROR, {
                  type: C.ErrorTypes.MEDIA_ERROR,
                  details: C.ErrorDetails.FRAG_PARSING_ERROR,
                  fatal: !1,
                  reason: "TS packet did not start with 0x47"
                });
              b && (l = w(b)) && void 0 !== l.pts ? (L(l, !0), f.pesData = null) : f.pesData = b, E && (l = w(E)) && void 0 !== l.pts ? (p.isAAC ? A(l) : R(l), p.pesData = null) : (E && E.size && M.logger.log("last AAC PES packet truncated,might overlap between fragments"), p.pesData = E), S && (l = w(S)) && void 0 !== l.pts ? (D(l), h.pesData = null) : h.pesData = S, null == this.sampleAes ? this.remuxer.remux(p, f, h, this._txtTrack, t, r, n) : this.decryptAndRemux(p, f, h, this._txtTrack, t, r, n)
            }, O.prototype.decryptAndRemux = function (e, t, r, n, i, a, o) {
              if (e.samples && e.isAAC) {
                var s = this;
                this.sampleAes.decryptAacSamples(e.samples, 0, function () {
                  s.decryptAndRemuxAvc(e, t, r, n, i, a, o)
                })
              } else this.decryptAndRemuxAvc(e, t, r, n, i, a, o)
            }, O.prototype.decryptAndRemuxAvc = function (e, t, r, n, i, a, o) {
              if (t.samples) {
                var s = this;
                this.sampleAes.decryptAvcSamples(t.samples, 0, 0, function () {
                  s.remuxer.remux(e, t, r, n, i, a, o)
                })
              } else this.remuxer.remux(e, t, r, n, i, a, o)
            }, O.prototype.destroy = function () {
              this._initPTS = this._initDTS = void 0, this._duration = 0
            }, O.prototype._parsePAT = function (e, t) {
              return (31 & e[t + 10]) << 8 | e[t + 11]
            }, O.prototype._parsePMT = function (e, t, r, n) {
              var i, a, o = {
                audio: -1,
                avc: -1,
                id3: -1,
                isAAC: !0
              };
              for (i = t + 3 + ((15 & e[t + 1]) << 8 | e[t + 2]) - 4, t += 12 + ((15 & e[t + 10]) << 8 | e[t + 11]); t < i;) {
                switch (a = (31 & e[t + 1]) << 8 | e[t + 2], e[t]) {
                  case 207:
                    if (!n) {
                      M.logger.log("unkown stream type:" + e[t]);
                      break
                    }
                  case 15:
                    -1 === o.audio && (o.audio = a);
                    break;
                  case 21:
                    -1 === o.id3 && (o.id3 = a);
                    break;
                  case 219:
                    if (!n) {
                      M.logger.log("unkown stream type:" + e[t]);
                      break
                    }
                  case 27:
                    -1 === o.avc && (o.avc = a);
                    break;
                  case 3:
                  case 4:
                    r ? -1 === o.audio && (o.audio = a, o.isAAC = !1) : M.logger.log("MPEG audio found, not supported in this browser for now");
                    break;
                  case 36:
                    M.logger.warn("HEVC stream type found, not supported for now");
                    break;
                  default:
                    M.logger.log("unkown stream type:" + e[t])
                }
                t += 5 + ((15 & e[t + 3]) << 8 | e[t + 4])
              }
              return o
            }, O.prototype._parsePES = function (e) {
              var t, r, n, i, a, o, s, l, u = 0,
                d = e.data;
              if (!e || 0 === e.size) return null;
              for (; d[0].length < 19 && 1 < d.length;) {
                var c = new Uint8Array(d[0].length + d[1].length);
                c.set(d[0]), c.set(d[1], d[0].length), d[0] = c, d.splice(1, 1)
              }
              if (1 !== ((t = d[0])[0] << 16) + (t[1] << 8) + t[2]) return null;
              if ((n = (t[4] << 8) + t[5]) && n > e.size - 6) return null;
              192 & (r = t[7]) && (4294967295 < (o = 536870912 * (14 & t[9]) + 4194304 * (255 & t[10]) + 16384 * (254 & t[11]) + 128 * (255 & t[12]) + (254 & t[13]) / 2) && (o -= 8589934592), 64 & r ? (4294967295 < (s = 536870912 * (14 & t[14]) + 4194304 * (255 & t[15]) + 16384 * (254 & t[16]) + 128 * (255 & t[17]) + (254 & t[18]) / 2) && (s -= 8589934592), 54e5 < o - s && (M.logger.warn(Math.round((o - s) / 9e4) + "s delta between PTS and DTS, align them"), o = s)) : s = o), l = (i = t[8]) + 9, e.size -= l, a = new Uint8Array(e.size);
              for (var f = 0, p = d.length; f < p; f++) {
                var h = (t = d[f]).byteLength;
                if (l) {
                  if (h < l) {
                    l -= h;
                    continue
                  }
                  t = t.subarray(l), h -= l, l = 0
                }
                a.set(t, u), u += h
              }
              return n && (n -= i + 3), {
                data: a,
                pts: o,
                dts: s,
                len: n
              }
            }, O.prototype.pushAccesUnit = function (e, t) {
              if (e.units.length && e.frame) {
                var r = t.samples,
                  n = r.length;
                !this.config.forceKeyFrameOnDiscontinuity || !0 === e.key || t.sps && (n || this.contiguous) ? (e.id = n, r.push(e)) : t.dropped++
              }
              e.debug.length && M.logger.log(e.pts + "/" + e.dts + ":" + e.debug)
            }, O.prototype._parseAVCPES = function (h, e) {
              var g, y, m, v = this,
                b = this._avcTrack,
                t = this._parseAVCNALu(h.data),
                E = this.avcSample,
                S = !1,
                _ = this.pushAccesUnit.bind(this),
                T = function (e, t, r, n) {
                  return {
                    key: e,
                    pts: t,
                    dts: r,
                    units: [],
                    debug: n
                  }
                };
              h.data = null, E && t.length && !b.audFound && (_(E, b), E = this.avcSample = T(!1, h.pts, h.dts, "")), t.forEach(function (e) {
                switch (e.type) {
                  case 1:
                    y = !0, E || (E = v.avcSample = T(!0, h.pts, h.dts, "")), E.frame = !0;
                    var t = e.data;
                    if (S && 4 < t.length) {
                      var r = new w.default(t).readSliceType();
                      2 !== r && 4 !== r && 7 !== r && 9 !== r || (E.key = !0)
                    }
                    break;
                  case 5:
                    y = !0, E || (E = v.avcSample = T(!0, h.pts, h.dts, "")), E.key = !0, E.frame = !0;
                    break;
                  case 6:
                    y = !0, (g = new w.default(v.discardEPB(e.data))).readUByte();
                    for (var n = 0, i = 0, a = !1, o = 0; !a && 1 < g.bytesAvailable;) {
                      for (n = 0; n += o = g.readUByte(), 255 === o;);
                      for (i = 0; i += o = g.readUByte(), 255 === o;);
                      if (4 === n && 0 !== g.bytesAvailable) {
                        if (a = !0, 181 === g.readUByte() && 49 === g.readUShort() && 1195456820 === g.readUInt() && 3 === g.readUByte()) {
                          var s = g.readUByte(),
                            l = 31 & s,
                            u = [s, g.readUByte()];
                          for (m = 0; m < l; m++) u.push(g.readUByte()), u.push(g.readUByte()), u.push(g.readUByte());
                          v._insertSampleInOrder(v._txtTrack.samples, {
                            type: 3,
                            pts: h.pts,
                            bytes: u
                          })
                        }
                      } else if (i < g.bytesAvailable)
                        for (m = 0; m < i; m++) g.readUByte()
                    }
                    break;
                  case 7:
                    if (S = y = !0, !b.sps) {
                      var d = (g = new w.default(e.data)).readSPS();
                      b.width = d.width, b.height = d.height, b.pixelRatio = d.pixelRatio, b.sps = [e.data], b.duration = v._duration;
                      var c = e.data.subarray(1, 4),
                        f = "avc1.";
                      for (m = 0; m < 3; m++) {
                        var p = c[m].toString(16);
                        p.length < 2 && (p = "0" + p), f += p
                      }
                      b.codec = f
                    }
                    break;
                  case 8:
                    y = !0, b.pps || (b.pps = [e.data]);
                    break;
                  case 9:
                    y = !1, b.audFound = !0, E && _(E, b), E = v.avcSample = T(!1, h.pts, h.dts, "");
                    break;
                  case 12:
                    y = !1;
                    break;
                  default:
                    y = !1, E && (E.debug += "unknown NAL " + e.type + " ")
                }
                E && y && E.units.push(e)
              }), e && E && (_(E, b), this.avcSample = null)
            }, O.prototype._insertSampleInOrder = function (e, t) {
              var r = e.length;
              if (0 < r) {
                if (t.pts >= e[r - 1].pts) e.push(t);
                else
                  for (var n = r - 1; 0 <= n; n--)
                    if (t.pts < e[n].pts) {
                      e.splice(n, 0, t);
                      break
                    }
              } else e.push(t)
            }, O.prototype._getLastNalUnit = function () {
              var e, t = this.avcSample;
              if (!t || 0 === t.units.length) {
                var r = this._avcTrack.samples;
                t = r[r.length - 1]
              }
              if (t) {
                var n = t.units;
                e = n[n.length - 1]
              }
              return e
            }, O.prototype._parseAVCNALu = function (e) {
              var t, r, n, i, a = 0,
                o = e.byteLength,
                s = this._avcTrack,
                l = s.naluState || 0,
                u = l,
                d = [],
                c = -1;
              for (-1 === l && (i = 31 & e[c = 0], l = 0, a = 1); a < o;)
                if (t = e[a++], l)
                  if (1 !== l)
                    if (t)
                      if (1 === t) {
                        var f, p;
                        0 <= c ? (n = {
                          data: e.subarray(c, a - l - 1),
                          type: i
                        }, d.push(n)) : (f = this._getLastNalUnit()) && (u && a <= 4 - u && f.state && (f.data = f.data.subarray(0, f.data.byteLength - u)), 0 < (r = a - l - 1) && ((p = new Uint8Array(f.data.byteLength + r)).set(f.data, 0), p.set(e.subarray(0, r), f.data.byteLength), f.data = p)), l = a < o ? (i = 31 & e[c = a], 0) : -1
                      } else l = 0;
              else l = 3;
              else l = t ? 0 : 2;
              else l = t ? 0 : 1;
              return 0 <= c && 0 <= l && (n = {
                data: e.subarray(c, o),
                type: i,
                state: l
              }, d.push(n)), 0 === d.length && (f = this._getLastNalUnit()) && ((p = new Uint8Array(f.data.byteLength + e.byteLength)).set(f.data, 0), p.set(e, f.data.byteLength), f.data = p), s.naluState = l, d
            }, O.prototype.discardEPB = function (e) {
              for (var t, r, n = e.byteLength, i = [], a = 1; a < n - 2;) 0 === e[a] && 0 === e[a + 1] && 3 === e[a + 2] ? (i.push(a + 2), a += 2) : a++;
              if (0 === i.length) return e;
              t = n - i.length, r = new Uint8Array(t);
              var o = 0;
              for (a = 0; a < t; o++, a++) o === i[0] && (o++, i.shift()), r[a] = e[o];
              return r
            }, O.prototype._parseAACPES = function (e) {
              var t, r, n, i, a, o = this._audioTrack,
                s = e.data,
                l = e.pts,
                u = this.aacOverFlow,
                d = this.aacLastPTS;
              if (u) {
                var c = new Uint8Array(u.byteLength + s.byteLength);
                c.set(u, 0), c.set(s, u.byteLength), s = c
              }
              for (n = 0, a = s.length; n < a - 1 && !y.isHeader(s, n); n++);
              if (n) {
                var f = void 0,
                  p = void 0;
                if (p = n < a - 1 ? (f = "AAC PES did not start with ADTS header,offset:" + n, !1) : (f = "no ADTS header found in AAC PES", !0), M.logger.warn("parsing error:" + f), this.observer.trigger(P.default.ERROR, {
                    type: C.ErrorTypes.MEDIA_ERROR,
                    details: C.ErrorDetails.FRAG_PARSING_ERROR,
                    fatal: p,
                    reason: f
                  }), p) return
              }
              if (y.initTrackConfig(o, this.observer, s, n, this.audioCodec), r = 0, t = y.getFrameDuration(o.samplerate), u && d) {
                var h = d + t;
                1 < Math.abs(h - l) && (M.logger.log("AAC: align PTS for overlapping frames by " + Math.round((h - l) / 90)), l = h)
              }
              for (; n < a;)
                if (y.isHeader(s, n) && n + 5 < a) {
                  var g = y.appendFrame(o, s, n, l, r);
                  if (!g) break;
                  n += g.length, i = g.sample.pts, r++
                } else n++;
              u = n < a ? s.subarray(n, a) : null, this.aacOverFlow = u, this.aacLastPTS = i
            }, O.prototype._parseMPEGPES = function (e) {
              for (var t = e.data, r = t.length, n = 0, i = 0, a = e.pts; i < r;)
                if (s.default.isHeader(t, i)) {
                  var o = s.default.appendFrame(this._audioTrack, t, i, a, n);
                  if (!o) break;
                  i += o.length, n++
                } else i++
            }, O.prototype._parseID3PES = function (e) {
              this._id3Track.samples.push(e)
            }, O
          }();
        t.default = a
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var n = r(0),
          i = function () {
            function e(e) {
              this.data = e, this.bytesAvailable = e.byteLength, this.word = 0, this.bitsAvailable = 0
            }
            return e.prototype.loadWord = function () {
              var e = this.data,
                t = this.bytesAvailable,
                r = e.byteLength - t,
                n = new Uint8Array(4),
                i = Math.min(4, t);
              if (0 === i) throw new Error("no bytes available");
              n.set(e.subarray(r, r + i)), this.word = new DataView(n.buffer).getUint32(0), this.bitsAvailable = 8 * i, this.bytesAvailable -= i
            }, e.prototype.skipBits = function (e) {
              var t;
              this.bitsAvailable > e || (e -= this.bitsAvailable, e -= (t = e >> 3) >> 3, this.bytesAvailable -= t, this.loadWord()), this.word <<= e, this.bitsAvailable -= e
            }, e.prototype.readBits = function (e) {
              var t = Math.min(this.bitsAvailable, e),
                r = this.word >>> 32 - t;
              return 32 < e && n.logger.error("Cannot read more than 32 bits at a time"), this.bitsAvailable -= t, 0 < this.bitsAvailable ? this.word <<= t : 0 < this.bytesAvailable && this.loadWord(), 0 < (t = e - t) && this.bitsAvailable ? r << t | this.readBits(t) : r
            }, e.prototype.skipLZ = function () {
              var e;
              for (e = 0; e < this.bitsAvailable; ++e)
                if (0 != (this.word & 2147483648 >>> e)) return this.word <<= e, this.bitsAvailable -= e, e;
              return this.loadWord(), e + this.skipLZ()
            }, e.prototype.skipUEG = function () {
              this.skipBits(1 + this.skipLZ())
            }, e.prototype.skipEG = function () {
              this.skipBits(1 + this.skipLZ())
            }, e.prototype.readUEG = function () {
              var e = this.skipLZ();
              return this.readBits(e + 1) - 1
            }, e.prototype.readEG = function () {
              var e = this.readUEG();
              return 1 & e ? 1 + e >>> 1 : -1 * (e >>> 1)
            }, e.prototype.readBoolean = function () {
              return 1 === this.readBits(1)
            }, e.prototype.readUByte = function () {
              return this.readBits(8)
            }, e.prototype.readUShort = function () {
              return this.readBits(16)
            }, e.prototype.readUInt = function () {
              return this.readBits(32)
            }, e.prototype.skipScalingList = function (e) {
              var t, r = 8,
                n = 8;
              for (t = 0; t < e; t++) 0 !== n && (n = (r + this.readEG() + 256) % 256), r = 0 === n ? r : n
            }, e.prototype.readSPS = function () {
              var e, t, r, n, i, a, o, s = 0,
                l = 0,
                u = 0,
                d = 0,
                c = this.readUByte.bind(this),
                f = this.readBits.bind(this),
                p = this.readUEG.bind(this),
                h = this.readBoolean.bind(this),
                g = this.skipBits.bind(this),
                y = this.skipEG.bind(this),
                m = this.skipUEG.bind(this),
                v = this.skipScalingList.bind(this);
              if (c(), e = c(), f(5), g(3), c(), m(), 100 === e || 110 === e || 122 === e || 244 === e || 44 === e || 83 === e || 86 === e || 118 === e || 128 === e) {
                var b = p();
                if (3 === b && g(1), m(), m(), g(1), h())
                  for (a = 3 !== b ? 8 : 12, o = 0; o < a; o++) h() && v(o < 6 ? 16 : 64)
              }
              m();
              var E = p();
              if (0 === E) p();
              else if (1 === E)
                for (g(1), y(), y(), t = p(), o = 0; o < t; o++) y();
              m(), g(1), r = p(), n = p(), 0 === (i = f(1)) && g(1), g(1), h() && (s = p(), l = p(), u = p(), d = p());
              var S = [1, 1];
              if (h() && h()) switch (c()) {
                case 1:
                  S = [1, 1];
                  break;
                case 2:
                  S = [12, 11];
                  break;
                case 3:
                  S = [10, 11];
                  break;
                case 4:
                  S = [16, 11];
                  break;
                case 5:
                  S = [40, 33];
                  break;
                case 6:
                  S = [24, 11];
                  break;
                case 7:
                  S = [20, 11];
                  break;
                case 8:
                  S = [32, 11];
                  break;
                case 9:
                  S = [80, 33];
                  break;
                case 10:
                  S = [18, 11];
                  break;
                case 11:
                  S = [15, 11];
                  break;
                case 12:
                  S = [64, 33];
                  break;
                case 13:
                  S = [160, 99];
                  break;
                case 14:
                  S = [4, 3];
                  break;
                case 15:
                  S = [3, 2];
                  break;
                case 16:
                  S = [2, 1];
                  break;
                case 255:
                  S = [c() << 8 | c(), c() << 8 | c()]
              }
              return {
                width: Math.ceil(16 * (r + 1) - 2 * s - 2 * l),
                height: (2 - i) * (n + 1) * 16 - (i ? 2 : 4) * (u + d),
                pixelRatio: S
              }
            }, e.prototype.readSliceType = function () {
              return this.readUByte(), this.readUEG(), this.readUEG()
            }, e
          }();
        t.default = i
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var i = r(19),
          n = function () {
            function e(e, t, r, n) {
              this.decryptdata = r, this.discardEPB = n, this.decrypter = new i.default(e, t, {
                removePKCS7Padding: !1
              })
            }
            return e.prototype.decryptBuffer = function (e, t) {
              this.decrypter.decrypt(e, this.decryptdata.key.buffer, this.decryptdata.iv.buffer, t)
            }, e.prototype.decryptAacSample = function (t, r, n, i) {
              var a = t[r].unit,
                e = a.subarray(16, a.length - a.length % 16),
                o = e.buffer.slice(e.byteOffset, e.byteOffset + e.length),
                s = this;
              this.decryptBuffer(o, function (e) {
                e = new Uint8Array(e), a.set(e, 16), i || s.decryptAacSamples(t, r + 1, n)
              })
            }, e.prototype.decryptAacSamples = function (e, t, r) {
              for (;; t++) {
                if (t >= e.length) return void r();
                if (!(e[t].unit.length < 32)) {
                  var n = this.decrypter.isSync();
                  if (this.decryptAacSample(e, t, r, n), !n) return
                }
              }
            }, e.prototype.getAvcEncryptedData = function (e) {
              for (var t = 16 * Math.floor((e.length - 48) / 160) + 16, r = new Int8Array(t), n = 0, i = 32; i <= e.length - 16; i += 160, n += 16) r.set(e.subarray(i, i + 16), n);
              return r
            }, e.prototype.getAvcDecryptedUnit = function (e, t) {
              t = new Uint8Array(t);
              for (var r = 0, n = 32; n <= e.length - 16; n += 160, r += 16) e.set(t.subarray(r, r + 16), n);
              return e
            }, e.prototype.decryptAvcSample = function (t, r, n, i, a, o) {
              var s = this.discardEPB(a.data),
                e = this.getAvcEncryptedData(s),
                l = this;
              this.decryptBuffer(e.buffer, function (e) {
                a.data = l.getAvcDecryptedUnit(s, e), o || l.decryptAvcSamples(t, r, n + 1, i)
              })
            }, e.prototype.decryptAvcSamples = function (e, t, r, n) {
              for (;; t++, r = 0) {
                if (t >= e.length) return void n();
                for (var i = e[t].units; !(r >= i.length); r++) {
                  var a = i[r];
                  if (!(a.length <= 48 || 1 !== a.type && 5 !== a.type)) {
                    var o = this.decrypter.isSync();
                    if (this.decryptAvcSample(e, t, r, n, a, o), !o) return
                  }
                }
              }
            }, e
          }();
        t.default = n
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var h = r(11),
          i = r(0),
          g = r(21),
          n = function () {
            function e(e, t, r) {
              this.observer = e, this.config = r, this.remuxer = t
            }
            return e.prototype.resetInitSegment = function (e, t, r, n) {
              this._audioTrack = {
                container: "audio/mpeg",
                type: "audio",
                id: -1,
                sequenceNumber: 0,
                isAAC: !1,
                samples: [],
                len: 0,
                manifestCodec: t,
                duration: n,
                inputTimeScale: 9e4
              }
            }, e.prototype.resetTimeStamp = function () {}, e.probe = function (e) {
              var t, r, n = h.default.getID3Data(e, 0);
              if (n && void 0 !== h.default.getTimeStamp(n))
                for (t = n.length, r = Math.min(e.length - 1, t + 100); t < r; t++)
                  if (g.default.probe(e, t)) return i.logger.log("MPEG Audio sync word found !"), !0;
              return !1
            }, e.prototype.append = function (e, t, r, n) {
              for (var i = h.default.getID3Data(e, 0), a = h.default.getTimeStamp(i), o = a ? 90 * a : 9e4 * t, s = i.length, l = e.length, u = 0, d = 0, c = this._audioTrack, f = [{
                  pts: o,
                  dts: o,
                  data: i
                }]; s < l;)
                if (g.default.isHeader(e, s)) {
                  var p = g.default.appendFrame(c, e, s, o, u);
                  if (!p) break;
                  s += p.length, d = p.sample.pts, u++
                } else h.default.isHeader(e, s) ? (i = h.default.getID3Data(e, s), f.push({
                  pts: d,
                  dts: d,
                  data: i
                }), s += i.length) : s++;
              this.remuxer.remux(c, {
                samples: []
              }, {
                samples: f,
                inputTimeScale: 9e4
              }, {
                samples: []
              }, t, r, n)
            }, e.prototype.destroy = function () {}, e
          }();
        t.default = n
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var H = r(42),
          Z = r(43),
          X = r(1),
          Q = r(3),
          J = r(0),
          n = function () {
            function e(e, t, r, n) {
              this.observer = e, this.config = t, this.typeSupported = r;
              var i = navigator.userAgent;
              this.isSafari = n && -1 < n.indexOf("Apple") && i && !i.match("CriOS"), this.ISGenerated = !1
            }
            return e.prototype.destroy = function () {}, e.prototype.resetTimeStamp = function (e) {
              this._initPTS = this._initDTS = e
            }, e.prototype.resetInitSegment = function () {
              this.ISGenerated = !1
            }, e.prototype.remux = function (e, t, r, n, i, a, o) {
              if (this.ISGenerated || this.generateIS(e, t, i), this.ISGenerated) {
                var s = e.samples.length,
                  l = t.samples.length,
                  u = i,
                  d = i;
                if (s && l) {
                  var c = (e.samples[0].pts - t.samples[0].pts) / t.inputTimeScale;
                  u += Math.max(0, c), d += Math.max(0, -c)
                }
                if (s) {
                  e.timescale || (J.logger.warn("regenerate InitSegment as audio detected"), this.generateIS(e, t, i));
                  var f = this.remuxAudio(e, u, a, o);
                  if (l) {
                    var p = void 0;
                    f && (p = f.endPTS - f.startPTS), t.timescale || (J.logger.warn("regenerate InitSegment as video detected"), this.generateIS(e, t, i)), this.remuxVideo(t, d, a, p, o)
                  }
                } else if (l) {
                  var h = this.remuxVideo(t, d, a, 0, o);
                  h && e.codec && this.remuxEmptyAudio(e, u, a, h)
                }
              }
              r.samples.length && this.remuxID3(r, i), n.samples.length && this.remuxText(n, i), this.observer.trigger(X.default.FRAG_PARSED)
            }, e.prototype.generateIS = function (e, t, r) {
              var n, i, a = this.observer,
                o = e.samples,
                s = t.samples,
                l = this.typeSupported,
                u = "audio/mp4",
                d = {},
                c = {
                  tracks: d
                },
                f = void 0 === this._initPTS;
              if (f && (n = i = 1 / 0), e.config && o.length && (e.timescale = e.samplerate, J.logger.log("audio sampling rate : " + e.samplerate), e.isAAC || (l.mpeg ? (u = "audio/mpeg", e.codec = "") : l.mp3 && (e.codec = "mp3")), d.audio = {
                  container: u,
                  codec: e.codec,
                  initSegment: !e.isAAC && l.mpeg ? new Uint8Array : Z.default.initSegment([e]),
                  metadata: {
                    channelCount: e.channelCount
                  }
                }, f && (n = i = o[0].pts - e.inputTimeScale * r)), t.sps && t.pps && s.length) {
                var p = t.inputTimeScale;
                t.timescale = p, d.video = {
                  container: "video/mp4",
                  codec: t.codec,
                  initSegment: Z.default.initSegment([t]),
                  metadata: {
                    width: t.width,
                    height: t.height
                  }
                }, f && (n = Math.min(n, s[0].pts - p * r), i = Math.min(i, s[0].dts - p * r), this.observer.trigger(X.default.INIT_PTS_FOUND, {
                  initPTS: n
                }))
              }
              Object.keys(d).length ? (a.trigger(X.default.FRAG_PARSING_INIT_SEGMENT, c), this.ISGenerated = !0, f && (this._initPTS = n, this._initDTS = i)) : a.trigger(X.default.ERROR, {
                type: Q.ErrorTypes.MEDIA_ERROR,
                details: Q.ErrorDetails.FRAG_PARSING_ERROR,
                fatal: !1,
                reason: "no audio/video samples found"
              })
            }, e.prototype.remuxVideo = function (e, t, r, n, i) {
              var a, o, s, l, u, d, c, f = 8,
                p = e.timescale,
                h = e.samples,
                g = [],
                y = h.length,
                m = this._PTSNormalize,
                v = this._initPTS,
                b = this.nextAvcDts,
                E = this.isSafari;
              if (0 !== y) {
                E && (r |= h.length && b && (i && Math.abs(t - b / p) < .1 || Math.abs(h[0].pts - b - v) < p / 5)), r || (b = t * p), h.forEach(function (e) {
                  e.pts = m(e.pts - v, b), e.dts = m(e.dts - v, b)
                }), h.sort(function (e, t) {
                  var r = e.dts - t.dts,
                    n = e.pts - t.pts;
                  return r || n || e.id - t.id
                });
                var S = h.reduce(function (e, t) {
                  return Math.max(Math.min(e, t.pts - t.dts), -18e3)
                }, 0);
                if (S < 0) {
                  J.logger.warn("PTS < DTS detected in video samples, shifting DTS by " + Math.round(S / 90) + " ms to overcome this issue");
                  for (var _ = 0; _ < h.length; _++) h[_].dts += S
                }
                var T = h[0];
                u = Math.max(T.dts, 0), l = Math.max(T.pts, 0);
                var w = Math.round((u - b) / 90);
                r && w && (1 < w ? J.logger.log("AVC:" + w + " ms hole between fragments detected,filling it") : w < -1 && J.logger.log("AVC:" + -w + " ms overlapping between fragments detected"), u = b, h[0].dts = u, l = Math.max(l - w, b), h[0].pts = l, J.logger.log("Video/PTS/DTS adjusted: " + Math.round(l / 90) + "/" + Math.round(u / 90) + ",delta:" + w + " ms")), T = h[h.length - 1], c = Math.max(T.dts, 0), d = Math.max(T.pts, 0, c), E && (a = Math.round((c - u) / (h.length - 1)));
                var L = 0,
                  A = 0;
                for (_ = 0; _ < y; _++) {
                  for (var R = h[_], D = R.units, x = D.length, I = 0, O = 0; O < x; O++) I += D[O].data.length;
                  A += I, L += x, R.length = I, R.dts = E ? u + _ * a : Math.max(R.dts, u), R.pts = Math.max(R.pts, R.dts)
                }
                var P = A + 4 * L + 8;
                try {
                  o = new Uint8Array(P)
                } catch (e) {
                  return void this.observer.trigger(X.default.ERROR, {
                    type: Q.ErrorTypes.MUX_ERROR,
                    details: Q.ErrorDetails.REMUX_ALLOC_ERROR,
                    fatal: !1,
                    bytes: P,
                    reason: "fail allocating video mdat " + P
                  })
                }
                var M = new DataView(o.buffer);
                for (M.setUint32(0, P), o.set(Z.default.types.mdat, 4), _ = 0; _ < y; _++) {
                  var C = h[_],
                    k = C.units,
                    N = 0,
                    F = void 0;
                  for (O = 0, x = k.length; O < x; O++) {
                    var B = k[O],
                      U = B.data,
                      j = B.data.byteLength;
                    M.setUint32(f, j), f += 4, o.set(U, f), f += j, N += 4 + j
                  }
                  if (E) F = Math.max(0, a * Math.round((C.pts - C.dts) / a));
                  else {
                    if (_ < y - 1) a = h[_ + 1].dts - C.dts;
                    else {
                      var q = this.config,
                        G = C.dts - h[0 < _ ? _ - 1 : _].dts;
                      if (q.stretchShortVideoTrack) {
                        var H = q.maxBufferHole,
                          V = Math.floor(H * p),
                          z = (n ? l + n * p : this.nextAudioPts) - C.pts;
                        V < z ? ((a = z - G) < 0 && (a = G), J.logger.log("It is approximately " + z / 90 + " ms to the next segment; using duration " + a / 90 + " ms for the last video frame.")) : a = G
                      } else a = G
                    }
                    F = Math.round(C.pts - C.dts)
                  }
                  g.push({
                    size: N,
                    duration: a,
                    cts: F,
                    flags: {
                      isLeading: 0,
                      isDependedOn: 0,
                      hasRedundancy: 0,
                      degradPrio: 0,
                      dependsOn: C.key ? 2 : 1,
                      isNonSync: C.key ? 0 : 1
                    }
                  })
                }
                this.nextAvcDts = c + a;
                var W = e.dropped;
                if (e.len = 0, e.nbNalu = 0, e.dropped = 0, g.length && -1 < navigator.userAgent.toLowerCase().indexOf("chrome")) {
                  var K = g[0].flags;
                  K.dependsOn = 2, K.isNonSync = 0
                }
                e.samples = g, s = Z.default.moof(e.sequenceNumber++, u, e), e.samples = [];
                var Y = {
                  data1: s,
                  data2: o,
                  startPTS: l / p,
                  endPTS: (d + a) / p,
                  startDTS: u / p,
                  endDTS: this.nextAvcDts / p,
                  type: "video",
                  hasAudio: !1,
                  hasVideo: !0,
                  nb: g.length,
                  dropped: W
                };
                return this.observer.trigger(X.default.FRAG_PARSING_DATA, Y), Y
              }
            }, e.prototype.remuxAudio = function (e, t, r, n) {
              var i, a, o, s, l, u, d, c = e.inputTimeScale,
                f = e.timescale,
                p = c / f,
                h = (e.isAAC ? 1024 : 1152) * p,
                g = this._PTSNormalize,
                y = this._initPTS,
                m = !e.isAAC && this.typeSupported.mpeg,
                v = e.samples,
                b = [],
                E = this.nextAudioPts;
              if (r |= v.length && E && (n && Math.abs(t - E / c) < .1 || Math.abs(v[0].pts - E - y) < 20 * h), v.forEach(function (e) {
                  e.pts = e.dts = g(e.pts - y, t * c)
                }), 0 !== (v = v.filter(function (e) {
                  return 0 <= e.pts
                })).length) {
                if (r || (E = n ? t * c : v[0].pts), e.isAAC)
                  for (var S = this.config.maxAudioFramesDrift, _ = 0, T = E; _ < v.length;) {
                    var w, L = v[_];
                    w = (M = L.pts) - T;
                    var A = Math.abs(1e3 * w / c);
                    if (w <= -S * h) J.logger.warn("Dropping 1 audio frame @ " + (T / c).toFixed(3) + "s due to " + Math.round(A) + " ms overlap."), v.splice(_, 1), e.len -= L.unit.length;
                    else if (S * h <= w && A < 1e4 && T) {
                      var R = Math.round(w / h);
                      J.logger.warn("Injecting " + R + " audio frame @ " + (T / c).toFixed(3) + "s due to " + Math.round(1e3 * w / c) + " ms gap.");
                      for (var D = 0; D < R; D++) {
                        var x = Math.max(T, 0);
                        (o = H.default.getSilentFrame(e.manifestCodec || e.codec, e.channelCount)) || (J.logger.log("Unable to get silent frame for given audio codec; duplicating last frame instead."), o = L.unit.subarray()), v.splice(_, 0, {
                          unit: o,
                          pts: x,
                          dts: x
                        }), e.len += o.length, T += h, _++
                      }
                      L.pts = L.dts = T, T += h, _++
                    } else L.pts = L.dts = T, T += h, _++
                  }
                D = 0;
                for (var I = v.length; D < I; D++) {
                  var O = v[D],
                    P = O.unit,
                    M = O.pts;
                  if (void 0 !== d) a.duration = Math.round((M - d) / p);
                  else {
                    var C = Math.round(1e3 * (M - E) / c),
                      k = 0;
                    if (r && e.isAAC && C) {
                      if (0 < C && C < 1e4) k = Math.round((M - E) / h), J.logger.log(C + " ms hole between AAC samples detected,filling it"), 0 < k && ((o = H.default.getSilentFrame(e.manifestCodec || e.codec, e.channelCount)) || (o = P.subarray()), e.len += k * o.length);
                      else if (C < -12) {
                        J.logger.log("drop overlapping AAC sample, expected/parsed/delta:" + (E / c).toFixed(3) + "s/" + (M / c).toFixed(3) + "s/" + -C + "ms"), e.len -= P.byteLength;
                        continue
                      }
                      M = E
                    }
                    if (u = M, !(0 < e.len)) return;
                    var N = m ? e.len : e.len + 8;
                    i = m ? 0 : 8;
                    try {
                      s = new Uint8Array(N)
                    } catch (e) {
                      return void this.observer.trigger(X.default.ERROR, {
                        type: Q.ErrorTypes.MUX_ERROR,
                        details: Q.ErrorDetails.REMUX_ALLOC_ERROR,
                        fatal: !1,
                        bytes: N,
                        reason: "fail allocating audio mdat " + N
                      })
                    }
                    for (m || (new DataView(s.buffer).setUint32(0, N), s.set(Z.default.types.mdat, 4)), _ = 0; _ < k; _++)(o = H.default.getSilentFrame(e.manifestCodec || e.codec, e.channelCount)) || (J.logger.log("Unable to get silent frame for given audio codec; duplicating this frame instead."), o = P.subarray()), s.set(o, i), i += o.byteLength, a = {
                      size: o.byteLength,
                      cts: 0,
                      duration: 1024,
                      flags: {
                        isLeading: 0,
                        isDependedOn: 0,
                        hasRedundancy: 0,
                        degradPrio: 0,
                        dependsOn: 1
                      }
                    }, b.push(a)
                  }
                  s.set(P, i);
                  var F = P.byteLength;
                  i += F, a = {
                    size: F,
                    cts: 0,
                    duration: 0,
                    flags: {
                      isLeading: 0,
                      isDependedOn: 0,
                      hasRedundancy: 0,
                      degradPrio: 0,
                      dependsOn: 1
                    }
                  }, b.push(a), d = M
                }
                var B = 0,
                  U = b.length;
                if (2 <= U && (B = b[U - 2].duration, a.duration = B), U) {
                  this.nextAudioPts = E = d + p * B, e.len = 0, e.samples = b, l = m ? new Uint8Array : Z.default.moof(e.sequenceNumber++, u / p, e), e.samples = [];
                  var j = u / c,
                    q = E / c,
                    G = {
                      data1: l,
                      data2: s,
                      startPTS: j,
                      endPTS: q,
                      startDTS: j,
                      endDTS: q,
                      type: "audio",
                      hasAudio: !0,
                      hasVideo: !1,
                      nb: U
                    };
                  return this.observer.trigger(X.default.FRAG_PARSING_DATA, G), G
                }
                return null
              }
            }, e.prototype.remuxEmptyAudio = function (e, t, r, n) {
              var i = e.inputTimeScale,
                a = i / (e.samplerate ? e.samplerate : i),
                o = this.nextAudioPts,
                s = (void 0 !== o ? o : n.startDTS * i) + this._initDTS,
                l = n.endDTS * i + this._initDTS,
                u = 1024 * a,
                d = Math.ceil((l - s) / u),
                c = H.default.getSilentFrame(e.manifestCodec || e.codec, e.channelCount);
              if (J.logger.warn("remux empty Audio"), c) {
                for (var f = [], p = 0; p < d; p++) {
                  var h = s + p * u;
                  f.push({
                    unit: c,
                    pts: h,
                    dts: h
                  }), e.len += c.length
                }
                e.samples = f, this.remuxAudio(e, t, r)
              } else J.logger.trace("Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec!")
            }, e.prototype.remuxID3 = function (e) {
              var t, r = e.samples.length,
                n = e.inputTimeScale,
                i = this._initPTS,
                a = this._initDTS;
              if (r) {
                for (var o = 0; o < r; o++)(t = e.samples[o]).pts = (t.pts - i) / n, t.dts = (t.dts - a) / n;
                this.observer.trigger(X.default.FRAG_PARSING_METADATA, {
                  samples: e.samples
                })
              }
              e.samples = []
            }, e.prototype.remuxText = function (e) {
              e.samples.sort(function (e, t) {
                return e.pts - t.pts
              });
              var t, r = e.samples.length,
                n = e.inputTimeScale,
                i = this._initPTS;
              if (r) {
                for (var a = 0; a < r; a++)(t = e.samples[a]).pts = (t.pts - i) / n;
                this.observer.trigger(X.default.FRAG_PARSING_USERDATA, {
                  samples: e.samples
                })
              }
              e.samples = []
            }, e.prototype._PTSNormalize = function (e, t) {
              var r;
              if (void 0 === t) return e;
              for (r = t < e ? -8589934592 : 8589934592; 4294967296 < Math.abs(e - t);) e += r;
              return e
            }, e
          }();
        t.default = n
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var n = function () {
          function e() {}
          return e.getSilentFrame = function (e, t) {
            switch (e) {
              case "mp4a.40.2":
                if (1 === t) return new Uint8Array([0, 200, 0, 128, 35, 128]);
                if (2 === t) return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]);
                if (3 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]);
                if (4 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]);
                if (5 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]);
                if (6 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]);
                break;
              default:
                if (1 === t) return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                if (2 === t) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                if (3 === t) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94])
            }
            return null
          }, e
        }();
        t.default = n
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var s = Math.pow(2, 32) - 1,
          n = function () {
            function f() {}
            return f.init = function () {
              var e;
              for (e in f.types = {
                  avc1: [],
                  avcC: [],
                  btrt: [],
                  dinf: [],
                  dref: [],
                  esds: [],
                  ftyp: [],
                  hdlr: [],
                  mdat: [],
                  mdhd: [],
                  mdia: [],
                  mfhd: [],
                  minf: [],
                  moof: [],
                  moov: [],
                  mp4a: [],
                  ".mp3": [],
                  mvex: [],
                  mvhd: [],
                  pasp: [],
                  sdtp: [],
                  stbl: [],
                  stco: [],
                  stsc: [],
                  stsd: [],
                  stsz: [],
                  stts: [],
                  tfdt: [],
                  tfhd: [],
                  traf: [],
                  trak: [],
                  trun: [],
                  trex: [],
                  tkhd: [],
                  vmhd: [],
                  smhd: []
                }) f.types.hasOwnProperty(e) && (f.types[e] = [e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3)]);
              var t = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0]),
                r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]);
              f.HDLR_TYPES = {
                video: t,
                audio: r
              };
              var n = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]),
                i = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
              f.STTS = f.STSC = f.STCO = i, f.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), f.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]), f.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), f.STSD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);
              var a = new Uint8Array([105, 115, 111, 109]),
                o = new Uint8Array([97, 118, 99, 49]),
                s = new Uint8Array([0, 0, 0, 1]);
              f.FTYP = f.box(f.types.ftyp, a, s, a, o), f.DINF = f.box(f.types.dinf, f.box(f.types.dref, n))
            }, f.box = function (e) {
              for (var t, r = Array.prototype.slice.call(arguments, 1), n = 8, i = r.length, a = i; i--;) n += r[i].byteLength;
              for ((t = new Uint8Array(n))[0] = n >> 24 & 255, t[1] = n >> 16 & 255, t[2] = n >> 8 & 255, t[3] = 255 & n, t.set(e, 4), i = 0, n = 8; i < a; i++) t.set(r[i], n), n += r[i].byteLength;
              return t
            }, f.hdlr = function (e) {
              return f.box(f.types.hdlr, f.HDLR_TYPES[e])
            }, f.mdat = function (e) {
              return f.box(f.types.mdat, e)
            }, f.mdhd = function (e, t) {
              t *= e;
              var r = Math.floor(t / (s + 1)),
                n = Math.floor(t % (s + 1));
              return f.box(f.types.mdhd, new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, r >> 24, r >> 16 & 255, r >> 8 & 255, 255 & r, n >> 24, n >> 16 & 255, n >> 8 & 255, 255 & n, 85, 196, 0, 0]))
            }, f.mdia = function (e) {
              return f.box(f.types.mdia, f.mdhd(e.timescale, e.duration), f.hdlr(e.type), f.minf(e))
            }, f.mfhd = function (e) {
              return f.box(f.types.mfhd, new Uint8Array([0, 0, 0, 0, e >> 24, e >> 16 & 255, e >> 8 & 255, 255 & e]))
            }, f.minf = function (e) {
              return "audio" === e.type ? f.box(f.types.minf, f.box(f.types.smhd, f.SMHD), f.DINF, f.stbl(e)) : f.box(f.types.minf, f.box(f.types.vmhd, f.VMHD), f.DINF, f.stbl(e))
            }, f.moof = function (e, t, r) {
              return f.box(f.types.moof, f.mfhd(e), f.traf(r, t))
            }, f.moov = function (e) {
              for (var t = e.length, r = []; t--;) r[t] = f.trak(e[t]);
              return f.box.apply(null, [f.types.moov, f.mvhd(e[0].timescale, e[0].duration)].concat(r).concat(f.mvex(e)))
            }, f.mvex = function (e) {
              for (var t = e.length, r = []; t--;) r[t] = f.trex(e[t]);
              return f.box.apply(null, [f.types.mvex].concat(r))
            }, f.mvhd = function (e, t) {
              t *= e;
              var r = Math.floor(t / (s + 1)),
                n = Math.floor(t % (s + 1)),
                i = new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, r >> 24, r >> 16 & 255, r >> 8 & 255, 255 & r, n >> 24, n >> 16 & 255, n >> 8 & 255, 255 & n, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]);
              return f.box(f.types.mvhd, i)
            }, f.sdtp = function (e) {
              var t, r, n = e.samples || [],
                i = new Uint8Array(4 + n.length);
              for (r = 0; r < n.length; r++) t = n[r].flags, i[r + 4] = t.dependsOn << 4 | t.isDependedOn << 2 | t.hasRedundancy;
              return f.box(f.types.sdtp, i)
            }, f.stbl = function (e) {
              return f.box(f.types.stbl, f.stsd(e), f.box(f.types.stts, f.STTS), f.box(f.types.stsc, f.STSC), f.box(f.types.stsz, f.STSZ), f.box(f.types.stco, f.STCO))
            }, f.avc1 = function (e) {
              var t, r, n, i = [],
                a = [];
              for (t = 0; t < e.sps.length; t++) n = (r = e.sps[t]).byteLength, i.push(n >>> 8 & 255), i.push(255 & n), i = i.concat(Array.prototype.slice.call(r));
              for (t = 0; t < e.pps.length; t++) n = (r = e.pps[t]).byteLength, a.push(n >>> 8 & 255), a.push(255 & n), a = a.concat(Array.prototype.slice.call(r));
              var o = f.box(f.types.avcC, new Uint8Array([1, i[3], i[4], i[5], 255, 224 | e.sps.length].concat(i).concat([e.pps.length]).concat(a))),
                s = e.width,
                l = e.height,
                u = e.pixelRatio[0],
                d = e.pixelRatio[1];
              return f.box(f.types.avc1, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, s >> 8 & 255, 255 & s, l >> 8 & 255, 255 & l, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 18, 100, 97, 105, 108, 121, 109, 111, 116, 105, 111, 110, 47, 104, 108, 115, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]), o, f.box(f.types.btrt, new Uint8Array([0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192])), f.box(f.types.pasp, new Uint8Array([u >> 24, u >> 16 & 255, u >> 8 & 255, 255 & u, d >> 24, d >> 16 & 255, d >> 8 & 255, 255 & d])))
            }, f.esds = function (e) {
              var t = e.config.length;
              return new Uint8Array([0, 0, 0, 0, 3, 23 + t, 0, 1, 0, 4, 15 + t, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([t]).concat(e.config).concat([6, 1, 2]))
            }, f.mp4a = function (e) {
              var t = e.samplerate;
              return f.box(f.types.mp4a, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, e.channelCount, 0, 16, 0, 0, 0, 0, t >> 8 & 255, 255 & t, 0, 0]), f.box(f.types.esds, f.esds(e)))
            }, f.mp3 = function (e) {
              var t = e.samplerate;
              return f.box(f.types[".mp3"], new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, e.channelCount, 0, 16, 0, 0, 0, 0, t >> 8 & 255, 255 & t, 0, 0]))
            }, f.stsd = function (e) {
              return "audio" === e.type ? e.isAAC || "mp3" !== e.codec ? f.box(f.types.stsd, f.STSD, f.mp4a(e)) : f.box(f.types.stsd, f.STSD, f.mp3(e)) : f.box(f.types.stsd, f.STSD, f.avc1(e))
            }, f.tkhd = function (e) {
              var t = e.id,
                r = e.duration * e.timescale,
                n = e.width,
                i = e.height,
                a = Math.floor(r / (s + 1)),
                o = Math.floor(r % (s + 1));
              return f.box(f.types.tkhd, new Uint8Array([1, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t, 0, 0, 0, 0, a >> 24, a >> 16 & 255, a >> 8 & 255, 255 & a, o >> 24, o >> 16 & 255, o >> 8 & 255, 255 & o, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, n >> 8 & 255, 255 & n, 0, 0, i >> 8 & 255, 255 & i, 0, 0]))
            }, f.traf = function (e, t) {
              var r = f.sdtp(e),
                n = e.id,
                i = Math.floor(t / (s + 1)),
                a = Math.floor(t % (s + 1));
              return f.box(f.types.traf, f.box(f.types.tfhd, new Uint8Array([0, 0, 0, 0, n >> 24, n >> 16 & 255, n >> 8 & 255, 255 & n])), f.box(f.types.tfdt, new Uint8Array([1, 0, 0, 0, i >> 24, i >> 16 & 255, i >> 8 & 255, 255 & i, a >> 24, a >> 16 & 255, a >> 8 & 255, 255 & a])), f.trun(e, r.length + 16 + 20 + 8 + 16 + 8 + 8), r)
            }, f.trak = function (e) {
              return e.duration = e.duration || 4294967295, f.box(f.types.trak, f.tkhd(e), f.mdia(e))
            }, f.trex = function (e) {
              var t = e.id;
              return f.box(f.types.trex, new Uint8Array([0, 0, 0, 0, t >> 24, t >> 16 & 255, t >> 8 & 255, 255 & t, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]))
            }, f.trun = function (e, t) {
              var r, n, i, a, o, s, l = e.samples || [],
                u = l.length,
                d = 12 + 16 * u,
                c = new Uint8Array(d);
              for (t += 8 + d, c.set([0, 0, 15, 1, u >>> 24 & 255, u >>> 16 & 255, u >>> 8 & 255, 255 & u, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t], 0), r = 0; r < u; r++) i = (n = l[r]).duration, a = n.size, o = n.flags, s = n.cts, c.set([i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, a >>> 24 & 255, a >>> 16 & 255, a >>> 8 & 255, 255 & a, o.isLeading << 2 | o.dependsOn, o.isDependedOn << 6 | o.hasRedundancy << 4 | o.paddingValue << 1 | o.isNonSync, 61440 & o.degradPrio, 15 & o.degradPrio, s >>> 24 & 255, s >>> 16 & 255, s >>> 8 & 255, 255 & s], 12 + 16 * r);
              return f.box(f.types.trun, c)
            }, f.initSegment = function (e) {
              f.types || f.init();
              var t, r = f.moov(e);
              return (t = new Uint8Array(f.FTYP.byteLength + r.byteLength)).set(f.FTYP), t.set(r, f.FTYP.byteLength), t
            }, f
          }();
        t.default = n
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var d = r(1),
          n = function () {
            function e(e) {
              this.observer = e
            }
            return e.prototype.destroy = function () {}, e.prototype.resetTimeStamp = function () {}, e.prototype.resetInitSegment = function () {}, e.prototype.remux = function (e, t, r, n, i, a, o, s) {
              var l = this.observer,
                u = "";
              e && (u += "audio"), t && (u += "video"), l.trigger(d.default.FRAG_PARSING_DATA, {
                data1: s,
                startPTS: i,
                startDTS: i,
                type: u,
                hasAudio: !!e,
                hasVideo: !!t,
                nb: 1,
                dropped: 0
              }), l.trigger(d.default.FRAG_PARSED)
            }, e
          }();
        t.default = n
      }, function (e, t, r) {
        var n = Object.prototype.hasOwnProperty,
          p = "~";

        function i() {}

        function a(e, t, r, n, i) {
          if ("function" != typeof r) throw new TypeError("The listener must be a function");
          var a = new function (e, t, r) {
              this.fn = e, this.context = t, this.once = r || !1
            }(r, n || e, i),
            o = p ? p + t : t;
          return e._events[o] ? e._events[o].fn ? e._events[o] = [e._events[o], a] : e._events[o].push(a) : (e._events[o] = a, e._eventsCount++), e
        }

        function u(e, t) {
          0 == --e._eventsCount ? e._events = new i : delete e._events[t]
        }

        function o() {
          this._events = new i, this._eventsCount = 0
        }
        Object.create && (i.prototype = Object.create(null), (new i).__proto__ || (p = !1)), o.prototype.eventNames = function () {
          var e, t, r = [];
          if (0 === this._eventsCount) return r;
          for (t in e = this._events) n.call(e, t) && r.push(p ? t.slice(1) : t);
          return Object.getOwnPropertySymbols ? r.concat(Object.getOwnPropertySymbols(e)) : r
        }, o.prototype.listeners = function (e) {
          var t = p ? p + e : e,
            r = this._events[t];
          if (!r) return [];
          if (r.fn) return [r.fn];
          for (var n = 0, i = r.length, a = new Array(i); n < i; n++) a[n] = r[n].fn;
          return a
        }, o.prototype.listenerCount = function (e) {
          var t = p ? p + e : e,
            r = this._events[t];
          return r ? r.fn ? 1 : r.length : 0
        }, o.prototype.emit = function (e, t, r, n, i, a) {
          var o = p ? p + e : e;
          if (!this._events[o]) return !1;
          var s, l, u = this._events[o],
            d = arguments.length;
          if (u.fn) {
            switch (u.once && this.removeListener(e, u.fn, void 0, !0), d) {
              case 1:
                return u.fn.call(u.context), !0;
              case 2:
                return u.fn.call(u.context, t), !0;
              case 3:
                return u.fn.call(u.context, t, r), !0;
              case 4:
                return u.fn.call(u.context, t, r, n), !0;
              case 5:
                return u.fn.call(u.context, t, r, n, i), !0;
              case 6:
                return u.fn.call(u.context, t, r, n, i, a), !0
            }
            for (l = 1, s = new Array(d - 1); l < d; l++) s[l - 1] = arguments[l];
            u.fn.apply(u.context, s)
          } else {
            var c, f = u.length;
            for (l = 0; l < f; l++) switch (u[l].once && this.removeListener(e, u[l].fn, void 0, !0), d) {
              case 1:
                u[l].fn.call(u[l].context);
                break;
              case 2:
                u[l].fn.call(u[l].context, t);
                break;
              case 3:
                u[l].fn.call(u[l].context, t, r);
                break;
              case 4:
                u[l].fn.call(u[l].context, t, r, n);
                break;
              default:
                if (!s)
                  for (c = 1, s = new Array(d - 1); c < d; c++) s[c - 1] = arguments[c];
                u[l].fn.apply(u[l].context, s)
            }
          }
          return !0
        }, o.prototype.on = function (e, t, r) {
          return a(this, e, t, r, !1)
        }, o.prototype.once = function (e, t, r) {
          return a(this, e, t, r, !0)
        }, o.prototype.removeListener = function (e, t, r, n) {
          var i = p ? p + e : e;
          if (!this._events[i]) return this;
          if (!t) return u(this, i), this;
          var a = this._events[i];
          if (a.fn) a.fn !== t || n && !a.once || r && a.context !== r || u(this, i);
          else {
            for (var o = 0, s = [], l = a.length; o < l; o++)(a[o].fn !== t || n && !a[o].once || r && a[o].context !== r) && s.push(a[o]);
            s.length ? this._events[i] = 1 === s.length ? s[0] : s : u(this, i)
          }
          return this
        }, o.prototype.removeAllListeners = function (e) {
          var t;
          return e ? (t = p ? p + e : e, this._events[t] && u(this, t)) : (this._events = new i, this._eventsCount = 0), this
        }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = p, o.EventEmitter = o, e.exports = o
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var o = r(18),
          s = r(1),
          l = r(0),
          u = r(47);
        t.default = function (i) {
          var n = new u.EventEmitter;
          n.trigger = function (e) {
            for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
            n.emit.apply(n, [e, e].concat(t))
          }, n.off = function (e) {
            for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
            n.removeListener.apply(n, [e].concat(t))
          };
          var a = function (e, t) {
            i.postMessage({
              event: e,
              data: t
            })
          };
          i.addEventListener("message", function (e) {
            var t = e.data;
            switch (t.cmd) {
              case "init":
                var r = JSON.parse(t.config);
                i.demuxer = new o.default(n, t.typeSupported, r, t.vendor), l.enableLogs(r.debug), a("init", null);
                break;
              case "demux":
                i.demuxer.push(t.data, t.decryptdata, t.initSegment, t.audioCodec, t.videoCodec, t.timeOffset, t.discontinuity, t.trackSwitch, t.contiguous, t.duration, t.accurateTimeOffset, t.defaultInitPTS)
            }
          }), n.on(s.default.FRAG_DECRYPTED, a), n.on(s.default.FRAG_PARSING_INIT_SEGMENT, a), n.on(s.default.FRAG_PARSED, a), n.on(s.default.ERROR, a), n.on(s.default.FRAG_PARSING_METADATA, a), n.on(s.default.FRAG_PARSING_USERDATA, a), n.on(s.default.INIT_PTS_FOUND, a), n.on(s.default.FRAG_PARSING_DATA, function (e, t) {
            var r = [],
              n = {
                event: e,
                data: t
              };
            t.data1 && (n.data1 = t.data1.buffer, r.push(t.data1.buffer), delete t.data1), t.data2 && (n.data2 = t.data2.buffer, r.push(t.data2.buffer), delete t.data2), i.postMessage(n, r)
          })
        }
      }, function (e, t) {
        function n() {
          this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function l(e) {
          return "function" == typeof e
        }

        function u(e) {
          return "object" == typeof e && null !== e
        }

        function d(e) {
          return void 0 === e
        }((e.exports = n).EventEmitter = n).prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function (e) {
          if ("number" != typeof e || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
          return this._maxListeners = e, this
        }, n.prototype.emit = function (e) {
          var t, r, n, i, a, o;
          if (this._events || (this._events = {}), "error" === e && (!this._events.error || u(this._events.error) && !this._events.error.length)) {
            if ((t = arguments[1]) instanceof Error) throw t;
            var s = new Error('Uncaught, unspecified "error" event. (' + t + ")");
            throw s.context = t, s
          }
          if (d(r = this._events[e])) return !1;
          if (l(r)) switch (arguments.length) {
            case 1:
              r.call(this);
              break;
            case 2:
              r.call(this, arguments[1]);
              break;
            case 3:
              r.call(this, arguments[1], arguments[2]);
              break;
            default:
              i = Array.prototype.slice.call(arguments, 1), r.apply(this, i)
          } else if (u(r))
            for (i = Array.prototype.slice.call(arguments, 1), n = (o = r.slice()).length, a = 0; a < n; a++) o[a].apply(this, i);
          return !0
        }, n.prototype.on = n.prototype.addListener = function (e, t) {
          var r;
          if (!l(t)) throw TypeError("listener must be a function");
          return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, l(t.listener) ? t.listener : t), this._events[e] ? u(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, u(this._events[e]) && !this._events[e].warned && (r = d(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners) && 0 < r && this._events[e].length > r && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace()), this
        }, n.prototype.once = function (e, t) {
          if (!l(t)) throw TypeError("listener must be a function");
          var r = !1;

          function n() {
            this.removeListener(e, n), r || (r = !0, t.apply(this, arguments))
          }
          return n.listener = t, this.on(e, n), this
        }, n.prototype.removeListener = function (e, t) {
          var r, n, i, a;
          if (!l(t)) throw TypeError("listener must be a function");
          if (!this._events || !this._events[e]) return this;
          if (i = (r = this._events[e]).length, n = -1, r === t || l(r.listener) && r.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
          else if (u(r)) {
            for (a = i; 0 < a--;)
              if (r[a] === t || r[a].listener && r[a].listener === t) {
                n = a;
                break
              } if (n < 0) return this;
            1 === r.length ? (r.length = 0, delete this._events[e]) : r.splice(n, 1), this._events.removeListener && this.emit("removeListener", e, t)
          }
          return this
        }, n.prototype.removeAllListeners = function (e) {
          var t, r;
          if (!this._events) return this;
          if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
          if (0 === arguments.length) {
            for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
            return this.removeAllListeners("removeListener"), this._events = {}, this
          }
          if (l(r = this._events[e])) this.removeListener(e, r);
          else if (r)
            for (; r.length;) this.removeListener(e, r[r.length - 1]);
          return delete this._events[e], this
        }, n.prototype.listeners = function (e) {
          return this._events && this._events[e] ? l(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
        }, n.prototype.listenerCount = function (e) {
          if (this._events) {
            var t = this._events[e];
            if (l(t)) return 1;
            if (t) return t.length
          }
          return 0
        }, n.listenerCount = function (e, t) {
          return e.listenerCount(t)
        }
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.default = {
          toString: function (e) {
            for (var t = "", r = e.length, n = 0; n < r; n++) t += "[" + e.start(n).toFixed(3) + "," + e.end(n).toFixed(3) + "]";
            return t
          }
        }
      }, function (e, t, c) {
        (function (i) {
          Object.defineProperty(t, "__esModule", {
            value: !0
          });
          var r = c(10),
            a = c(0);

          function o(e, t) {
            for (var r = null, n = 0; n < e.length; n += 1) {
              var i = e[n];
              if (i && i.cc === t) {
                r = i;
                break
              }
            }
            return r
          }

          function s(e, t, r) {
            var n = !1;
            return t && t.details && r && (r.endCC > r.startCC || e && e.cc < r.startCC) && (n = !0), n
          }

          function l(e, t) {
            var r = e.fragments,
              n = t.fragments;
            if (n.length && r.length) {
              var i = o(r, n[0].cc);
              if (i && (!i || i.startPTS)) return i;
              a.logger.log("No frag in previous level to align on")
            } else a.logger.log("No fragments to align")
          }

          function u(r, e) {
            e.fragments.forEach(function (e) {
              if (e) {
                var t = e.start + r;
                e.start = e.startPTS = t, e.endPTS = t + e.duration
              }
            }), e.PTSKnown = !0
          }

          function n(e, t, r) {
            if (s(e, r, t)) {
              var n = l(r.details, t);
              n && (a.logger.log("Adjusting PTS using last level due to CC increase within current level"), u(n.start, t))
            }
          }

          function d(e, t) {
            if (t && t.fragments.length) {
              if (!e.hasProgramDateTime || !t.hasProgramDateTime) return;
              var r = t.fragments[0].programDateTime,
                n = (e.fragments[0].programDateTime - r) / 1e3 + t.fragments[0].start;
              i.isFinite(n) && (a.logger.log("adjusting PTS using programDateTime delta, sliding:" + n.toFixed(3)), u(n, e))
            }
          }
          t.findFirstFragWithCC = o, t.findFragWithCC = function (e, t) {
            return r.default.search(e, function (e) {
              return e.cc < t ? 1 : e.cc > t ? -1 : 0
            })
          }, t.shouldAlignOnDiscontinuities = s, t.findDiscontinuousReferenceFrag = l, t.adjustPts = u, t.alignStream = function (e, t, r) {
            n(e, r, t), !r.PTSKnown && t && d(r, t.details)
          }, t.alignDiscontinuities = n, t.alignPDT = d
        }).call(this, c(2).Number)
      }, function (e, t, r) {
        (function (a) {
          Object.defineProperty(t, "__esModule", {
            value: !0
          });
          var o = r(10);

          function s(e, t, r) {
            void 0 === e && (e = 0), void 0 === t && (t = 0);
            var n = Math.min(t, r.duration + (r.deltaPTS ? r.deltaPTS : 0));
            return r.start + r.duration - n <= e ? 1 : r.start - n > e && r.start ? -1 : 0
          }

          function l(e, t, r) {
            var n = 1e3 * Math.min(t, r.duration + (r.deltaPTS ? r.deltaPTS : 0));
            return r.endProgramDateTime - n > e
          }
          t.findFragmentByPDT = function (e, t, r) {
            if (!Array.isArray(e) || !e.length || !a.isFinite(t)) return null;
            if (t < e[0].programDateTime) return null;
            if (t >= e[e.length - 1].endProgramDateTime) return null;
            r = r || 0;
            for (var n = 0; n < e.length; ++n) {
              var i = e[n];
              if (l(t, r, i)) return i
            }
            return null
          }, t.findFragmentByPTS = function (e, t, r, n) {
            void 0 === r && (r = 0), void 0 === n && (n = 0);
            var i = e ? t[e.sn - t[0].sn + 1] : null;
            return i && !s(r, n, i) ? i : o.default.search(t, s.bind(null, r, n))
          }, t.fragmentWithinToleranceTest = s, t.pdtWithinToleranceTest = l
        }).call(this, r(2).Number)
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var l = r(8),
          s = r(3),
          u = r(1),
          d = r(0),
          n = function () {
            function e(e, t, r, n) {
              this.config = e, this.media = t, this.fragmentTracker = r, this.hls = n, this.stallReported = !1
            }
            return e.prototype.poll = function (e, t) {
              var r = this.config,
                n = this.media,
                i = n.currentTime,
                a = window.performance.now();
              if (i !== e) return this.stallReported && (d.logger.warn("playback not stuck anymore @" + i + ", after " + Math.round(a - this.stalled) + "ms"), this.stallReported = !1), this.stalled = null, void(this.nudgeRetry = 0);
              if (!(n.ended || !n.buffered.length || 2 < n.readyState || n.seeking && l.BufferHelper.isBuffered(n, i))) {
                var o = a - this.stalled,
                  s = l.BufferHelper.bufferInfo(n, i, r.maxBufferHole);
                this.stalled ? (1e3 <= o && this._reportStall(s.len), this._tryFixBufferStall(s, o)) : this.stalled = a
              }
            }, e.prototype._tryFixBufferStall = function (e, t) {
              var r = this.config,
                n = this.fragmentTracker,
                i = this.media.currentTime,
                a = n.getPartialFragment(i);
              a && this._trySkipBufferHole(a), .5 < e.len && t > 1e3 * r.highBufferWatchdogPeriod && (this.stalled = null, this._tryNudgeBuffer())
            }, e.prototype._reportStall = function (e) {
              var t = this.hls,
                r = this.media;
              this.stallReported || (this.stallReported = !0, d.logger.warn("Playback stalling at @" + r.currentTime + " due to low buffer"), t.trigger(u.default.ERROR, {
                type: s.ErrorTypes.MEDIA_ERROR,
                details: s.ErrorDetails.BUFFER_STALLED_ERROR,
                fatal: !1,
                buffer: e
              }))
            }, e.prototype._trySkipBufferHole = function (e) {
              for (var t = this.hls, r = this.media, n = r.currentTime, i = 0, a = 0; a < r.buffered.length; a++) {
                var o = r.buffered.start(a);
                if (i <= n && n < o) return r.currentTime = Math.max(o, r.currentTime + .1), d.logger.warn("skipping hole, adjusting currentTime from " + n + " to " + r.currentTime), this.stalled = null, void t.trigger(u.default.ERROR, {
                  type: s.ErrorTypes.MEDIA_ERROR,
                  details: s.ErrorDetails.BUFFER_SEEK_OVER_HOLE,
                  fatal: !1,
                  reason: "fragment loaded with buffer holes, seeking from " + n + " to " + r.currentTime,
                  frag: e
                });
                i = r.buffered.end(a)
              }
            }, e.prototype._tryNudgeBuffer = function () {
              var e = this.config,
                t = this.hls,
                r = this.media,
                n = r.currentTime,
                i = (this.nudgeRetry || 0) + 1;
              if ((this.nudgeRetry = i) < e.nudgeMaxRetry) {
                var a = n + i * e.nudgeOffset;
                d.logger.log("adjust currentTime from " + n + " to " + a), r.currentTime = a, t.trigger(u.default.ERROR, {
                  type: s.ErrorTypes.MEDIA_ERROR,
                  details: s.ErrorDetails.BUFFER_NUDGE_ON_STALL,
                  fatal: !1
                })
              } else d.logger.error("still stuck in high buffer @" + n + " after " + e.nudgeMaxRetry + ", raise fatal error"), t.trigger(u.default.ERROR, {
                type: s.ErrorTypes.MEDIA_ERROR,
                details: s.ErrorDetails.BUFFER_STALLED_ERROR,
                fatal: !0
              })
            }, e
          }();
        t.default = n
      }, function (e, p, i) {
        (function (d) {
          var n, r = this && this.__extends || (n = Object.setPrototypeOf || {
              __proto__: []
            }
            instanceof Array && function (e, t) {
              e.__proto__ = t
            } || function (e, t) {
              for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function (e, t) {
              function r() {
                this.constructor = e
              }
              n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            });
          Object.defineProperty(p, "__esModule", {
            value: !0
          });
          var e = i(53),
            a = i(9),
            c = i(8),
            f = i(0);
          p.State = {
            STOPPED: "STOPPED",
            STARTING: "STARTING",
            IDLE: "IDLE",
            PAUSED: "PAUSED",
            KEY_LOADING: "KEY_LOADING",
            FRAG_LOADING: "FRAG_LOADING",
            FRAG_LOADING_WAITING_RETRY: "FRAG_LOADING_WAITING_RETRY",
            WAITING_TRACK: "WAITING_TRACK",
            PARSING: "PARSING",
            PARSED: "PARSED",
            BUFFER_FLUSHING: "BUFFER_FLUSHING",
            ENDED: "ENDED",
            ERROR: "ERROR",
            WAITING_INIT_PTS: "WAITING_INIT_PTS",
            WAITING_LEVEL: "WAITING_LEVEL"
          };
          var t = function (e) {
            function t() {
              return null !== e && e.apply(this, arguments) || this
            }
            return r(t, e), t.prototype.doTick = function () {}, t.prototype._streamEnded = function (e, t) {
              var r = this.fragCurrent,
                n = this.fragmentTracker;
              if (t.live || !r || r.backtracked || r.sn !== t.endSN || e.nextStart) return !1;
              var i = n.getState(r);
              return i === a.FragmentState.PARTIAL || i === a.FragmentState.OK
            }, t.prototype.onMediaSeeking = function () {
              var e = this.config,
                t = this.media,
                r = this.mediaBuffer,
                n = this.state,
                i = t ? t.currentTime : null,
                a = c.BufferHelper.bufferInfo(r || t, i, this.config.maxBufferHole);
              if (d.isFinite(i) && f.logger.log("media seeking to " + i.toFixed(3)), n === p.State.FRAG_LOADING) {
                var o = this.fragCurrent;
                if (0 === a.len && o) {
                  var s = e.maxFragLookUpTolerance,
                    l = o.start - s,
                    u = o.start + o.duration + s;
                  i < l || u < i ? (o.loader && (f.logger.log("seeking outside of buffer while fragment load in progress, cancel fragment load"), o.loader.abort()), this.fragCurrent = null, this.fragPrevious = null, this.state = p.State.IDLE) : f.logger.log("seeking outside of buffer but within currently loaded fragment range")
                }
              } else n === p.State.ENDED && (0 === a.len && (this.fragPrevious = null, this.fragCurrent = null), this.state = p.State.IDLE);
              t && (this.lastCurrentTime = i), this.loadedmetadata || (this.nextLoadPosition = this.startPosition = i), this.tick()
            }, t.prototype.onMediaEnded = function () {
              this.startPosition = this.lastCurrentTime = 0
            }, t
          }(e.default);
          p.default = t
        }).call(this, i(2).Number)
      }, function (e, t, r) {
        var n, a = this && this.__extends || (n = Object.setPrototypeOf || {
            __proto__: []
          }
          instanceof Array && function (e, t) {
            e.__proto__ = t
          } || function (e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
          },
          function (e, t) {
            function r() {
              this.constructor = e
            }
            n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
          });
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var i = function (i) {
          function e(e) {
            for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
            var n = i.apply(this, [e].concat(t)) || this;
            return n._tickInterval = null, n._tickTimer = null, n._tickCallCount = 0, n._boundTick = n.tick.bind(n), n
          }
          return a(e, i), e.prototype.onHandlerDestroying = function () {
            this.clearNextTick(), this.clearInterval()
          }, e.prototype.hasInterval = function () {
            return !!this._tickInterval
          }, e.prototype.hasNextTick = function () {
            return !!this._tickTimer
          }, e.prototype.setInterval = function (e) {
            return !this._tickInterval && (this._tickInterval = setInterval(this._boundTick, e), !0)
          }, e.prototype.clearInterval = function () {
            return !(!this._tickInterval || (clearInterval(this._tickInterval), this._tickInterval = null))
          }, e.prototype.clearNextTick = function () {
            return !(!this._tickTimer || (clearTimeout(this._tickTimer), this._tickTimer = null))
          }, e.prototype.tick = function () {
            this._tickCallCount++, 1 === this._tickCallCount && (this.doTick(), 1 < this._tickCallCount && (this.clearNextTick(), this._tickTimer = setTimeout(this._boundTick, 0)), this._tickCallCount = 0)
          }, e.prototype.doTick = function () {}, e
        }(r(4).default);
        t.default = i
      }, function (e, t, r) {
        var n, i = this && this.__extends || (n = Object.setPrototypeOf || {
            __proto__: []
          }
          instanceof Array && function (e, t) {
            e.__proto__ = t
          } || function (e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
          },
          function (e, t) {
            function r() {
              this.constructor = e
            }
            n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
          });
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var u, d = r(1),
          a = r(4),
          c = r(0),
          f = r(3),
          p = r(17),
          h = r(23),
          l = window.performance,
          o = function (r) {
            function e(e) {
              var t = r.call(this, e, d.default.MANIFEST_LOADED, d.default.LEVEL_LOADED, d.default.AUDIO_TRACK_SWITCHED, d.default.FRAG_LOADED, d.default.ERROR) || this;
              return t.canload = !1, t.currentLevelIndex = null, t.manualLevelIndex = -1, t.timer = null, u = /chrome|firefox/.test(navigator.userAgent.toLowerCase()), t
            }
            return i(e, r), e.prototype.onHandlerDestroying = function () {
              this.clearTimer(), this.manualLevelIndex = -1
            }, e.prototype.clearTimer = function () {
              null !== this.timer && (clearTimeout(this.timer), this.timer = null)
            }, e.prototype.startLoad = function () {
              var e = this._levels;
              this.canload = !0, this.levelRetryCount = 0, e && e.forEach(function (e) {
                e.loadError = 0;
                var t = e.details;
                t && t.live && (e.details = void 0)
              }), null !== this.timer && this.loadLevel()
            }, e.prototype.stopLoad = function () {
              this.canload = !1
            }, e.prototype.onManifestLoaded = function (e) {
              var t, r = [],
                n = [],
                i = {},
                a = null,
                o = !1,
                s = !1;
              if (e.levels.forEach(function (e) {
                  var t = e.attrs;
                  e.loadError = 0, e.fragmentError = !1, o = o || !!e.videoCodec, s = s || !!e.audioCodec, u && e.audioCodec && -1 !== e.audioCodec.indexOf("mp4a.40.34") && (e.audioCodec = void 0), (a = i[e.bitrate]) ? a.url.push(e.url) : (e.url = [e.url], e.urlId = 0, i[e.bitrate] = e, r.push(e)), t && (t.AUDIO && (s = !0, h.addGroupId(a || e, "audio", t.AUDIO)), t.SUBTITLES && h.addGroupId(a || e, "text", t.SUBTITLES))
                }), o && s && (r = r.filter(function (e) {
                  return !!e.videoCodec
                })), r = r.filter(function (e) {
                  var t = e.audioCodec,
                    r = e.videoCodec;
                  return (!t || p.isCodecSupportedInMp4(t, "audio")) && (!r || p.isCodecSupportedInMp4(r, "video"))
                }), e.audioTracks && (n = e.audioTracks.filter(function (e) {
                  return !e.audioCodec || p.isCodecSupportedInMp4(e.audioCodec, "audio")
                })).forEach(function (e, t) {
                  e.id = t
                }), 0 < r.length) {
                t = r[0].bitrate, r.sort(function (e, t) {
                  return e.bitrate - t.bitrate
                }), this._levels = r;
                for (var l = 0; l < r.length; l++)
                  if (r[l].bitrate === t) {
                    this._firstLevel = l, c.logger.log("manifest loaded," + r.length + " level(s) found, first bitrate:" + t);
                    break
                  } this.hls.trigger(d.default.MANIFEST_PARSED, {
                  levels: r,
                  audioTracks: n,
                  firstLevel: this._firstLevel,
                  stats: e.stats,
                  audio: s,
                  video: o,
                  altAudio: n.some(function (e) {
                    return !!e.url
                  })
                })
              } else this.hls.trigger(d.default.ERROR, {
                type: f.ErrorTypes.MEDIA_ERROR,
                details: f.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
                fatal: !0,
                url: this.hls.url,
                reason: "no level with compatible codecs found in manifest"
              })
            }, Object.defineProperty(e.prototype, "levels", {
              get: function () {
                return this._levels
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(e.prototype, "level", {
              get: function () {
                return this.currentLevelIndex
              },
              set: function (e) {
                var t = this._levels;
                t && (e = Math.min(e, t.length - 1), this.currentLevelIndex === e && t[e].details || this.setLevelInternal(e))
              },
              enumerable: !0,
              configurable: !0
            }), e.prototype.setLevelInternal = function (e) {
              var t = this._levels,
                r = this.hls;
              if (0 <= e && e < t.length) {
                if (this.clearTimer(), this.currentLevelIndex !== e) {
                  c.logger.log("switching to level " + e), this.currentLevelIndex = e;
                  var n = t[e];
                  n.level = e, r.trigger(d.default.LEVEL_SWITCHING, n)
                }
                var i = t[e],
                  a = i.details;
                if (!a || a.live) {
                  var o = i.urlId;
                  r.trigger(d.default.LEVEL_LOADING, {
                    url: i.url[o],
                    level: e,
                    id: o
                  })
                }
              } else r.trigger(d.default.ERROR, {
                type: f.ErrorTypes.OTHER_ERROR,
                details: f.ErrorDetails.LEVEL_SWITCH_ERROR,
                level: e,
                fatal: !1,
                reason: "invalid level idx"
              })
            }, Object.defineProperty(e.prototype, "manualLevel", {
              get: function () {
                return this.manualLevelIndex
              },
              set: function (e) {
                this.manualLevelIndex = e, void 0 === this._startLevel && (this._startLevel = e), -1 !== e && (this.level = e)
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(e.prototype, "firstLevel", {
              get: function () {
                return this._firstLevel
              },
              set: function (e) {
                this._firstLevel = e
              },
              enumerable: !0,
              configurable: !0
            }), Object.defineProperty(e.prototype, "startLevel", {
              get: function () {
                if (void 0 !== this._startLevel) return this._startLevel;
                var e = this.hls.config.startLevel;
                return void 0 !== e ? e : this._firstLevel
              },
              set: function (e) {
                this._startLevel = e
              },
              enumerable: !0,
              configurable: !0
            }), e.prototype.onError = function (e) {
              if (e.fatal) e.type === f.ErrorTypes.NETWORK_ERROR && this.clearTimer();
              else {
                var t, r = !1,
                  n = !1;
                switch (e.details) {
                  case f.ErrorDetails.FRAG_LOAD_ERROR:
                  case f.ErrorDetails.FRAG_LOAD_TIMEOUT:
                  case f.ErrorDetails.KEY_LOAD_ERROR:
                  case f.ErrorDetails.KEY_LOAD_TIMEOUT:
                    t = e.frag.level, n = !0;
                    break;
                  case f.ErrorDetails.LEVEL_LOAD_ERROR:
                  case f.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                    t = e.context.level, r = !0;
                    break;
                  case f.ErrorDetails.REMUX_ALLOC_ERROR:
                    t = e.level, r = !0
                }
                void 0 !== t && this.recoverLevel(e, t, r, n)
              }
            }, e.prototype.recoverLevel = function (e, t, r, n) {
              var i, a, o, s = this,
                l = this.hls.config,
                u = e.details,
                d = this._levels[t];
              if (d.loadError++, d.fragmentError = n, r) {
                if (!(this.levelRetryCount + 1 <= l.levelLoadingMaxRetry)) return c.logger.error("level controller, cannot recover from " + u + " error"), this.currentLevelIndex = null, this.clearTimer(), void(e.fatal = !0);
                a = Math.min(Math.pow(2, this.levelRetryCount) * l.levelLoadingRetryDelay, l.levelLoadingMaxRetryTimeout), this.timer = setTimeout(function () {
                  return s.loadLevel()
                }, a), e.levelRetry = !0, this.levelRetryCount++, c.logger.warn("level controller, " + u + ", retry in " + a + " ms, current retry count is " + this.levelRetryCount)
              }(r || n) && (1 < (i = d.url.length) && d.loadError < i ? (d.urlId = (d.urlId + 1) % i, d.details = void 0, c.logger.warn("level controller, " + u + " for level " + t + ": switching to redundant URL-id " + d.urlId)) : -1 === this.manualLevelIndex ? (o = 0 === t ? this._levels.length - 1 : t - 1, c.logger.warn("level controller, " + u + ": switch to " + o), this.hls.nextAutoLevel = this.currentLevelIndex = o) : n && (c.logger.warn("level controller, " + u + ": reload a fragment"), this.currentLevelIndex = null))
            }, e.prototype.onFragLoaded = function (e) {
              var t = e.frag;
              if (void 0 !== t && "main" === t.type) {
                var r = this._levels[t.level];
                void 0 !== r && (r.fragmentError = !1, r.loadError = 0, this.levelRetryCount = 0)
              }
            }, e.prototype.onLevelLoaded = function (e) {
              var t = this,
                r = e.level;
              if (r === this.currentLevelIndex) {
                var n = this._levels[r];
                n.fragmentError || (n.loadError = 0, this.levelRetryCount = 0);
                var i = e.details;
                if (i.live) {
                  var a = 1e3 * (i.averagetargetduration ? i.averagetargetduration : i.targetduration),
                    o = a,
                    s = n.details;
                  s && i.endSN === s.endSN && (o /= 2, c.logger.log("same live playlist, reload twice faster")), o -= l.now() - e.stats.trequest, o = Math.max(a / 2, Math.round(o)), c.logger.log("live playlist, reload in " + Math.round(o) + " ms"), this.timer = setTimeout(function () {
                    return t.loadLevel()
                  }, o)
                } else this.clearTimer()
              }
            }, e.prototype.onAudioTrackSwitched = function (e) {
              var t = this.hls.audioTracks[e.id].groupId,
                r = this.hls.levels[this.currentLevelIndex];
              if (r && r.audioGroupIds) {
                var n = r.audioGroupIds.findIndex(function (e) {
                  return e === t
                });
                n !== r.urlId && (r.urlId = n, this.startLoad())
              }
            }, e.prototype.loadLevel = function () {
              if (c.logger.debug("call to loadLevel"), null !== this.currentLevelIndex && this.canload) {
                var e = this._levels[this.currentLevelIndex];
                if ("object" == typeof e && 0 < e.url.length) {
                  var t = this.currentLevelIndex,
                    r = e.urlId,
                    n = e.url[r];
                  c.logger.log("Attempt loading level index " + t + " with URL-id " + r), this.hls.trigger(d.default.LEVEL_LOADING, {
                    url: n,
                    level: t,
                    id: r
                  })
                }
              }
            }, Object.defineProperty(e.prototype, "nextLoadLevel", {
              get: function () {
                return -1 !== this.manualLevelIndex ? this.manualLevelIndex : this.hls.nextAutoLevel
              },
              set: function (e) {
                this.level = e, -1 === this.manualLevelIndex && (this.hls.nextAutoLevel = e)
              },
              enumerable: !0,
              configurable: !0
            }), e
          }(a.default);
        t.default = o
      }, function (e, t, r) {
        var n, i = this && this.__extends || (n = Object.setPrototypeOf || {
            __proto__: []
          }
          instanceof Array && function (e, t) {
            e.__proto__ = t
          } || function (e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
          },
          function (e, t) {
            function r() {
              this.constructor = e
            }
            n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
          });
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var a = r(1),
          o = r(4),
          c = r(11),
          s = r(56),
          l = function (r) {
            function e(e) {
              var t = r.call(this, e, a.default.MEDIA_ATTACHED, a.default.MEDIA_DETACHING, a.default.FRAG_PARSING_METADATA) || this;
              return t.id3Track = void 0, t.media = void 0, t
            }
            return i(e, r), e.prototype.destroy = function () {
              o.default.prototype.destroy.call(this)
            }, e.prototype.onMediaAttached = function (e) {
              this.media = e.media, this.media
            }, e.prototype.onMediaDetaching = function () {
              s.clearCurrentCues(this.id3Track), this.id3Track = void 0, this.media = void 0
            }, e.prototype.getID3Track = function (e) {
              for (var t = 0; t < e.length; t++) {
                var r = e[t];
                if ("metadata" === r.kind && "id3" === r.label) return s.sendAddTrackEvent(r, this.media), r
              }
              return this.media.addTextTrack("metadata", "id3")
            }, e.prototype.onFragParsingMetadata = function (e) {
              var t = e.frag,
                r = e.samples;
              this.id3Track || (this.id3Track = this.getID3Track(this.media.textTracks), this.id3Track.mode = "hidden");
              for (var n = window.WebKitDataCue || window.VTTCue || window.TextTrackCue, i = 0; i < r.length; i++) {
                var a = c.default.getID3Frames(r[i].data);
                if (a) {
                  var o = r[i].pts,
                    s = i < r.length - 1 ? r[i + 1].pts : t.endPTS;
                  o === s && (s += 1e-4);
                  for (var l = 0; l < a.length; l++) {
                    var u = a[l];
                    if (!c.default.isTimeStampFrame(u)) {
                      var d = new n(o, s, "");
                      d.value = u, this.id3Track.addCue(d)
                    }
                  }
                }
              }
            }, e
          }(o.default);
        t.default = l
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.sendAddTrackEvent = function (e, t) {
          var r = null;
          try {
            r = new window.Event("addtrack")
          } catch (e) {
            (r = document.createEvent("Event")).initEvent("addtrack", !1, !1)
          }
          r.track = e, t.dispatchEvent(r)
        }, t.clearCurrentCues = function (e) {
          if (e && e.cues)
            for (; 0 < e.cues.length;) e.removeCue(e.cues[0])
        }
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var i = r(12);
        t.isSupported = function () {
          var e = i.getMediaSource(),
            t = window.SourceBuffer || window.WebKitSourceBuffer,
            r = e && "function" == typeof e.isTypeSupported && e.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),
            n = !t || t.prototype && "function" == typeof t.prototype.appendBuffer && "function" == typeof t.prototype.remove;
          return !!r && !!n
        }
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var n = r(59),
          i = r(62),
          a = r(63),
          o = r(64),
          s = r(65),
          l = (r(5), r(5), r(5), r(5), r(5), r(5), r(5), r(66));
        t.hlsDefaultConfig = {
          autoStartLoad: !0,
          startPosition: -1,
          defaultAudioCodec: void 0,
          debug: !1,
          capLevelOnFPSDrop: !1,
          capLevelToPlayerSize: !1,
          initialLiveManifestSize: 1,
          maxBufferLength: 30,
          maxBufferSize: 6e7,
          maxBufferHole: .5,
          lowBufferWatchdogPeriod: .5,
          highBufferWatchdogPeriod: 3,
          nudgeOffset: .1,
          nudgeMaxRetry: 3,
          maxFragLookUpTolerance: .25,
          liveSyncDurationCount: 3,
          liveMaxLatencyDurationCount: 1 / 0,
          liveSyncDuration: void 0,
          liveMaxLatencyDuration: void 0,
          liveDurationInfinity: !1,
          liveBackBufferLength: 1 / 0,
          maxMaxBufferLength: 600,
          enableWorker: !0,
          enableSoftwareAES: !0,
          manifestLoadingTimeOut: 1e4,
          manifestLoadingMaxRetry: 1,
          manifestLoadingRetryDelay: 1e3,
          manifestLoadingMaxRetryTimeout: 64e3,
          startLevel: void 0,
          levelLoadingTimeOut: 1e4,
          levelLoadingMaxRetry: 4,
          levelLoadingRetryDelay: 1e3,
          levelLoadingMaxRetryTimeout: 64e3,
          fragLoadingTimeOut: 2e4,
          fragLoadingMaxRetry: 6,
          fragLoadingRetryDelay: 1e3,
          fragLoadingMaxRetryTimeout: 64e3,
          startFragPrefetch: !1,
          fpsDroppedMonitoringPeriod: 5e3,
          fpsDroppedMonitoringThreshold: .2,
          appendErrorMaxRetry: 3,
          loader: s.default,
          fLoader: void 0,
          pLoader: void 0,
          xhrSetup: void 0,
          licenseXhrSetup: void 0,
          abrController: n.default,
          bufferController: i.default,
          capLevelController: a.default,
          fpsController: o.default,
          stretchShortVideoTrack: !1,
          maxAudioFramesDrift: 1,
          forceKeyFrameOnDiscontinuity: !0,
          abrEwmaFastLive: 3,
          abrEwmaSlowLive: 9,
          abrEwmaFastVoD: 3,
          abrEwmaSlowVoD: 9,
          abrEwmaDefaultEstimate: 5e5,
          abrBandWidthFactor: .95,
          abrBandWidthUpFactor: .7,
          abrMaxWithRealBitrate: !1,
          maxStarvationDelay: 4,
          maxLoadingDelay: 4,
          minAutoBitrate: 0,
          emeEnabled: !1,
          widevineLicenseUrl: void 0,
          requestMediaKeySystemAccessFunc: l.requestMediaKeySystemAccess,
          qiniuDRMKey: void 0
        }
      }, function (e, r, l) {
        (function (o) {
          var n, t = this && this.__extends || (n = Object.setPrototypeOf || {
              __proto__: []
            }
            instanceof Array && function (e, t) {
              e.__proto__ = t
            } || function (e, t) {
              for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function (e, t) {
              function r() {
                this.constructor = e
              }
              n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            });
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var b = l(1),
            i = l(4),
            E = l(8),
            a = l(3),
            S = l(0),
            s = l(60),
            _ = window.performance,
            e = function (r) {
              function e(e) {
                var t = r.call(this, e, b.default.FRAG_LOADING, b.default.FRAG_LOADED, b.default.FRAG_BUFFERED, b.default.ERROR) || this;
                return t.lastLoadedFragLevel = 0, t._nextAutoLevel = -1, t.hls = e, t.timer = null, t._bwEstimator = null, t.onCheck = t._abandonRulesCheck.bind(t), t
              }
              return t(e, r), e.prototype.destroy = function () {
                this.clearTimer(), i.default.prototype.destroy.call(this)
              }, e.prototype.onFragLoading = function (e) {
                var t = e.frag;
                if ("main" === t.type && (this.timer || (this.fragCurrent = t, this.timer = setInterval(this.onCheck, 100)), !this._bwEstimator)) {
                  var r = this.hls,
                    n = r.config,
                    i = t.level,
                    a = void 0,
                    o = void 0;
                  o = r.levels[i].details.live ? (a = n.abrEwmaFastLive, n.abrEwmaSlowLive) : (a = n.abrEwmaFastVoD, n.abrEwmaSlowVoD), this._bwEstimator = new s.default(r, o, a, n.abrEwmaDefaultEstimate)
                }
              }, e.prototype._abandonRulesCheck = function () {
                var e = this.hls,
                  t = e.media,
                  r = this.fragCurrent;
                if (r) {
                  var n = r.loader,
                    i = e.minAutoLevel;
                  if (!n || n.stats && n.stats.aborted) return S.logger.warn("frag loader destroy or aborted, disarm abandonRules"), this.clearTimer(), void(this._nextAutoLevel = -1);
                  var a = n.stats;
                  if (t && a && (!t.paused && 0 !== t.playbackRate || !t.readyState) && r.autoLevel && r.level) {
                    var o = _.now() - a.trequest,
                      s = Math.abs(t.playbackRate);
                    if (o > 500 * r.duration / s) {
                      var l = e.levels,
                        u = Math.max(1, a.bw ? a.bw / 8 : 1e3 * a.loaded / o),
                        d = l[r.level],
                        c = d.realBitrate ? Math.max(d.realBitrate, d.bitrate) : d.bitrate,
                        f = a.total ? a.total : Math.max(a.loaded, Math.round(r.duration * c / 8)),
                        p = t.currentTime,
                        h = (f - a.loaded) / u,
                        g = (E.BufferHelper.bufferInfo(t, p, e.config.maxBufferHole).end - p) / s;
                      if (g < 2 * r.duration / s && g < h) {
                        var y = void 0,
                          m = void 0;
                        for (m = r.level - 1; i < m; m--) {
                          var v = l[m].realBitrate ? Math.max(l[m].realBitrate, l[m].bitrate) : l[m].bitrate;
                          if ((y = r.duration * v / (6.4 * u)) < g) break
                        }
                        y < h && (S.logger.warn("loading too slow, abort fragment loading and switch to level " + m + ":fragLoadedDelay[" + m + "]<fragLoadedDelay[" + (r.level - 1) + "];bufferStarvationDelay:" + y.toFixed(1) + "<" + h.toFixed(1) + ":" + g.toFixed(1)), e.nextLoadLevel = m, this._bwEstimator.sample(o, a.loaded), n.abort(), this.clearTimer(), e.trigger(b.default.FRAG_LOAD_EMERGENCY_ABORTED, {
                          frag: r,
                          stats: a
                        }))
                      }
                    }
                  }
                }
              }, e.prototype.onFragLoaded = function (e) {
                var t = e.frag;
                if ("main" === t.type && o.isFinite(t.sn)) {
                  if (this.clearTimer(), this.lastLoadedFragLevel = t.level, this._nextAutoLevel = -1, this.hls.config.abrMaxWithRealBitrate) {
                    var r = this.hls.levels[t.level],
                      n = (r.loaded ? r.loaded.bytes : 0) + e.stats.loaded,
                      i = (r.loaded ? r.loaded.duration : 0) + e.frag.duration;
                    r.loaded = {
                      bytes: n,
                      duration: i
                    }, r.realBitrate = Math.round(8 * n / i)
                  }
                  if (e.frag.bitrateTest) {
                    var a = e.stats;
                    a.tparsed = a.tbuffered = a.tload, this.onFragBuffered(e)
                  }
                }
              }, e.prototype.onFragBuffered = function (e) {
                var t = e.stats,
                  r = e.frag;
                if (!0 !== t.aborted && "main" === r.type && o.isFinite(r.sn) && (!r.bitrateTest || t.tload === t.tbuffered)) {
                  var n = t.tparsed - t.trequest;
                  S.logger.log("latency/loading/parsing/append/kbps:" + Math.round(t.tfirst - t.trequest) + "/" + Math.round(t.tload - t.tfirst) + "/" + Math.round(t.tparsed - t.tload) + "/" + Math.round(t.tbuffered - t.tparsed) + "/" + Math.round(8 * t.loaded / (t.tbuffered - t.trequest))), this._bwEstimator.sample(n, t.loaded), t.bwEstimate = this._bwEstimator.getEstimate(), r.bitrateTest ? this.bitrateTestDelay = n / 1e3 : this.bitrateTestDelay = 0
                }
              }, e.prototype.onError = function (e) {
                switch (e.details) {
                  case a.ErrorDetails.FRAG_LOAD_ERROR:
                  case a.ErrorDetails.FRAG_LOAD_TIMEOUT:
                    this.clearTimer()
                }
              }, e.prototype.clearTimer = function () {
                clearInterval(this.timer), this.timer = null
              }, Object.defineProperty(e.prototype, "nextAutoLevel", {
                get: function () {
                  var e = this._nextAutoLevel,
                    t = this._bwEstimator;
                  if (!(-1 === e || t && t.canEstimate())) return e;
                  var r = this._nextABRAutoLevel;
                  return -1 !== e && (r = Math.min(e, r)), r
                },
                set: function (e) {
                  this._nextAutoLevel = e
                },
                enumerable: !0,
                configurable: !0
              }), Object.defineProperty(e.prototype, "_nextABRAutoLevel", {
                get: function () {
                  var e = this.hls,
                    t = e.maxAutoLevel,
                    r = e.levels,
                    n = e.config,
                    i = e.minAutoLevel,
                    a = e.media,
                    o = this.lastLoadedFragLevel,
                    s = this.fragCurrent ? this.fragCurrent.duration : 0,
                    l = a ? a.currentTime : 0,
                    u = a && 0 !== a.playbackRate ? Math.abs(a.playbackRate) : 1,
                    d = this._bwEstimator ? this._bwEstimator.getEstimate() : n.abrEwmaDefaultEstimate,
                    c = (E.BufferHelper.bufferInfo(a, l, n.maxBufferHole).end - l) / u,
                    f = this._findBestLevel(o, s, d, i, t, c, n.abrBandWidthFactor, n.abrBandWidthUpFactor, r);
                  if (0 <= f) return f;
                  S.logger.trace("rebuffering expected to happen, lets try to find a quality level minimizing the rebuffering");
                  var p = s ? Math.min(s, n.maxStarvationDelay) : n.maxStarvationDelay,
                    h = n.abrBandWidthFactor,
                    g = n.abrBandWidthUpFactor;
                  if (0 === c) {
                    var y = this.bitrateTestDelay;
                    y && (p = (s ? Math.min(s, n.maxLoadingDelay) : n.maxLoadingDelay) - y, S.logger.trace("bitrate test took " + Math.round(1e3 * y) + "ms, set first fragment max fetchDuration to " + Math.round(1e3 * p) + " ms"), h = g = 1)
                  }
                  return f = this._findBestLevel(o, s, d, i, t, c + p, h, g, r), Math.max(f, 0)
                },
                enumerable: !0,
                configurable: !0
              }), e.prototype._findBestLevel = function (e, t, r, n, i, a, o, s, l) {
                for (var u = i; n <= u; u--) {
                  var d = l[u];
                  if (d) {
                    var c = d.details,
                      f = c ? c.totalduration / c.fragments.length : t,
                      p = !!c && c.live,
                      h = void 0;
                    h = u <= e ? o * r : s * r;
                    var g = l[u].realBitrate ? Math.max(l[u].realBitrate, l[u].bitrate) : l[u].bitrate,
                      y = g * f / h;
                    if (S.logger.trace("level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: " + u + "/" + Math.round(h) + "/" + g + "/" + f + "/" + a + "/" + y), g < h && (!y || p && !this.bitrateTestDelay || y < a)) return u
                  }
                }
                return -1
              }, e
            }(i.default);
          r.default = e
        }).call(this, l(2).Number)
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var i = r(61),
          n = function () {
            function e(e, t, r, n) {
              this.hls = e, this.defaultEstimate_ = n, this.minWeight_ = .001, this.minDelayMs_ = 50, this.slow_ = new i.default(t), this.fast_ = new i.default(r)
            }
            return e.prototype.sample = function (e, t) {
              var r = 8e3 * t / (e = Math.max(e, this.minDelayMs_)),
                n = e / 1e3;
              this.fast_.sample(n, r), this.slow_.sample(n, r)
            }, e.prototype.canEstimate = function () {
              var e = this.fast_;
              return e && e.getTotalWeight() >= this.minWeight_
            }, e.prototype.getEstimate = function () {
              return this.canEstimate() ? Math.min(this.fast_.getEstimate(), this.slow_.getEstimate()) : this.defaultEstimate_
            }, e.prototype.destroy = function () {}, e
          }();
        t.default = n
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var n = function () {
          function e(e) {
            this.alpha_ = e ? Math.exp(Math.log(.5) / e) : 0, this.estimate_ = 0, this.totalWeight_ = 0
          }
          return e.prototype.sample = function (e, t) {
            var r = Math.pow(this.alpha_, e);
            this.estimate_ = t * (1 - r) + r * this.estimate_, this.totalWeight_ += e
          }, e.prototype.getTotalWeight = function () {
            return this.totalWeight_
          }, e.prototype.getEstimate = function () {
            if (this.alpha_) {
              var e = 1 - Math.pow(this.alpha_, this.totalWeight_);
              return this.estimate_ / e
            }
            return this.estimate_
          }, e
        }();
        t.default = n
      }, function (e, r, s) {
        (function (n) {
          var i, t = this && this.__extends || (i = Object.setPrototypeOf || {
              __proto__: []
            }
            instanceof Array && function (e, t) {
              e.__proto__ = t
            } || function (e, t) {
              for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function (e, t) {
              function r() {
                this.constructor = e
              }
              i(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            });
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var l = s(1),
            a = s(4),
            u = s(0),
            d = s(3),
            o = s(12).getMediaSource(),
            e = function (r) {
              function e(e) {
                var t = r.call(this, e, l.default.MEDIA_ATTACHING, l.default.MEDIA_DETACHING, l.default.MANIFEST_PARSED, l.default.BUFFER_RESET, l.default.BUFFER_APPENDING, l.default.BUFFER_CODECS, l.default.BUFFER_EOS, l.default.BUFFER_FLUSHING, l.default.LEVEL_PTS_UPDATED, l.default.LEVEL_UPDATED) || this;
                return t._msDuration = null, t._levelDuration = null, t._levelTargetDuration = 10, t._live = null, t._objectUrl = null, t.bufferCodecEventsExpected = 0, t.onsbue = t.onSBUpdateEnd.bind(t), t.onsbe = t.onSBUpdateError.bind(t), t.pendingTracks = {}, t.tracks = {}, t
              }
              return t(e, r), e.prototype.destroy = function () {
                a.default.prototype.destroy.call(this)
              }, e.prototype.onLevelPtsUpdated = function (e) {
                var t = e.type,
                  r = this.tracks.audio;
                if ("audio" === t && r && "audio/mpeg" === r.container) {
                  var n = this.sourceBuffer.audio;
                  if (.1 < Math.abs(n.timestampOffset - e.start)) {
                    var i = n.updating;
                    try {
                      n.abort()
                    } catch (e) {
                      u.logger.warn("can not abort audio buffer: " + e)
                    }
                    i ? this.audioTimestampOffset = e.start : (u.logger.warn("change mpeg audio timestamp offset from " + n.timestampOffset + " to " + e.start), n.timestampOffset = e.start)
                  }
                }
              }, e.prototype.onManifestParsed = function (e) {
                this.bufferCodecEventsExpected = e.altAudio ? 2 : 1, u.logger.log(this.bufferCodecEventsExpected + " bufferCodec event(s) expected")
              }, e.prototype.onMediaAttaching = function (e) {
                var t = this.media = e.media;
                if (t) {
                  var r = this.mediaSource = new o;
                  this.onmso = this.onMediaSourceOpen.bind(this), this.onmse = this.onMediaSourceEnded.bind(this), this.onmsc = this.onMediaSourceClose.bind(this), r.addEventListener("sourceopen", this.onmso), r.addEventListener("sourceended", this.onmse), r.addEventListener("sourceclose", this.onmsc), t.src = window.URL.createObjectURL(r), this._objectUrl = t.src
                }
              }, e.prototype.onMediaDetaching = function () {
                u.logger.log("media source detaching");
                var e = this.mediaSource;
                if (e) {
                  if ("open" === e.readyState) try {
                    e.endOfStream()
                  } catch (e) {
                    u.logger.warn("onMediaDetaching:" + e.message + " while calling endOfStream")
                  }
                  e.removeEventListener("sourceopen", this.onmso), e.removeEventListener("sourceended", this.onmse), e.removeEventListener("sourceclose", this.onmsc), this.media && (window.URL.revokeObjectURL(this._objectUrl), this.media.src === this._objectUrl ? (this.media.removeAttribute("src"), this.media.load()) : u.logger.warn("media.src was changed by a third party - skip cleanup")), this.mediaSource = null, this.media = null, this._objectUrl = null, this.pendingTracks = {}, this.tracks = {}, this.sourceBuffer = {}, this.flushRange = [], this.segments = [], this.appended = 0
                }
                this.onmso = this.onmse = this.onmsc = null, this.hls.trigger(l.default.MEDIA_DETACHED)
              }, e.prototype.onMediaSourceOpen = function () {
                u.logger.log("media source opened"), this.hls.trigger(l.default.MEDIA_ATTACHED, {
                  media: this.media
                });
                var e = this.mediaSource;
                e && e.removeEventListener("sourceopen", this.onmso), this.checkPendingTracks()
              }, e.prototype.checkPendingTracks = function () {
                var e = this.bufferCodecEventsExpected,
                  t = this.pendingTracks,
                  r = Object.keys(t).length;
                (r && !e || 2 === r) && (this.createSourceBuffers(t), this.pendingTracks = {}, this.doAppending())
              }, e.prototype.onMediaSourceClose = function () {
                u.logger.log("media source closed")
              }, e.prototype.onMediaSourceEnded = function () {
                u.logger.log("media source ended")
              }, e.prototype.onSBUpdateEnd = function () {
                if (this.audioTimestampOffset) {
                  var e = this.sourceBuffer.audio;
                  u.logger.warn("change mpeg audio timestamp offset from " + e.timestampOffset + " to " + this.audioTimestampOffset), e.timestampOffset = this.audioTimestampOffset, delete this.audioTimestampOffset
                }
                this._needsFlush && this.doFlush(), this._needsEos && this.checkEos(), this.appending = !1;
                var r = this.parent,
                  t = this.segments.reduce(function (e, t) {
                    return t.parent === r ? e + 1 : e
                  }, 0),
                  n = {},
                  i = this.sourceBuffer;
                for (var a in i) n[a] = i[a].buffered;
                this.hls.trigger(l.default.BUFFER_APPENDED, {
                  parent: r,
                  pending: t,
                  timeRanges: n
                }), this._needsFlush || this.doAppending(), this.updateMediaElementDuration(), 0 === t && this.flushLiveBackBuffer()
              }, e.prototype.onSBUpdateError = function (e) {
                u.logger.error("sourceBuffer error:", e), this.hls.trigger(l.default.ERROR, {
                  type: d.ErrorTypes.MEDIA_ERROR,
                  details: d.ErrorDetails.BUFFER_APPENDING_ERROR,
                  fatal: !1
                })
              }, e.prototype.onBufferReset = function () {
                var e = this.sourceBuffer;
                for (var t in e) {
                  var r = e[t];
                  try {
                    this.mediaSource.removeSourceBuffer(r), r.removeEventListener("updateend", this.onsbue), r.removeEventListener("error", this.onsbe)
                  } catch (e) {}
                }
                this.sourceBuffer = {}, this.flushRange = [], this.segments = [], this.appended = 0
              }, e.prototype.onBufferCodecs = function (t) {
                var r = this;
                if (!Object.keys(this.sourceBuffer).length) {
                  Object.keys(t).forEach(function (e) {
                    r.pendingTracks[e] = t[e]
                  });
                  var e = this.mediaSource;
                  this.bufferCodecEventsExpected = Math.max(this.bufferCodecEventsExpected - 1, 0), e && "open" === e.readyState && this.checkPendingTracks()
                }
              }, e.prototype.createSourceBuffers = function (e) {
                var t = this.sourceBuffer,
                  r = this.mediaSource;
                for (var n in e)
                  if (!t[n]) {
                    var i = e[n],
                      a = i.levelCodec || i.codec,
                      o = i.container + ";codecs=" + a;
                    u.logger.log("creating sourceBuffer(" + o + ")");
                    try {
                      var s = t[n] = r.addSourceBuffer(o);
                      s.addEventListener("updateend", this.onsbue), s.addEventListener("error", this.onsbe), this.tracks[n] = {
                        codec: a,
                        container: i.container
                      }, i.buffer = s
                    } catch (e) {
                      u.logger.error("error while trying to add sourceBuffer:" + e.message), this.hls.trigger(l.default.ERROR, {
                        type: d.ErrorTypes.MEDIA_ERROR,
                        details: d.ErrorDetails.BUFFER_ADD_CODEC_ERROR,
                        fatal: !1,
                        err: e,
                        mimeType: o
                      })
                    }
                  } this.hls.trigger(l.default.BUFFER_CREATED, {
                  tracks: e
                })
              }, e.prototype.onBufferAppending = function (e) {
                this._needsFlush || (this.segments ? this.segments.push(e) : this.segments = [e], this.doAppending())
              }, e.prototype.onBufferAppendFail = function (e) {
                u.logger.error("sourceBuffer error:", e.event), this.hls.trigger(l.default.ERROR, {
                  type: d.ErrorTypes.MEDIA_ERROR,
                  details: d.ErrorDetails.BUFFER_APPENDING_ERROR,
                  fatal: !1
                })
              }, e.prototype.onBufferEos = function (e) {
                var t = this.sourceBuffer,
                  r = e.type;
                for (var n in t) r && n !== r || t[n].ended || (t[n].ended = !0, u.logger.log(n + " sourceBuffer now EOS"));
                this.checkEos()
              }, e.prototype.checkEos = function () {
                var e = this.sourceBuffer,
                  t = this.mediaSource;
                if (t && "open" === t.readyState) {
                  for (var r in e) {
                    var n = e[r];
                    if (!n.ended) return;
                    if (n.updating) return void(this._needsEos = !0)
                  }
                  u.logger.log("all media data are available, signal endOfStream() to MediaSource and stop loading fragment");
                  try {
                    t.endOfStream()
                  } catch (e) {
                    u.logger.warn("exception while calling mediaSource.endOfStream()")
                  }
                  this._needsEos = !1
                } else this._needsEos = !1
              }, e.prototype.onBufferFlushing = function (e) {
                this.flushRange.push({
                  start: e.startOffset,
                  end: e.endOffset,
                  type: e.type
                }), this.flushBufferCounter = 0, this.doFlush()
              }, e.prototype.flushLiveBackBuffer = function () {
                if (this._live) {
                  var e = this.hls.config.liveBackBufferLength;
                  if (isFinite(e) && !(e < 0))
                    for (var t = this.media.currentTime, r = this.sourceBuffer, n = Object.keys(r), i = t - Math.max(e, this._levelTargetDuration), a = n.length - 1; 0 <= a; a--) {
                      var o = n[a],
                        s = r[o].buffered;
                      0 < s.length && i > s.start(0) && this.removeBufferRange(o, r[o], 0, i)
                    }
                }
              }, e.prototype.onLevelUpdated = function (e) {
                var t = e.details;
                0 < t.fragments.length && (this._levelDuration = t.totalduration + t.fragments[0].start, this._levelTargetDuration = t.averagetargetduration || t.targetduration || 10, this._live = t.live, this.updateMediaElementDuration())
              }, e.prototype.updateMediaElementDuration = function () {
                var e, t = this.hls.config;
                if (null !== this._levelDuration && this.media && this.mediaSource && this.sourceBuffer && 0 !== this.media.readyState && "open" === this.mediaSource.readyState) {
                  for (var r in this.sourceBuffer)
                    if (!0 === this.sourceBuffer[r].updating) return;
                  e = this.media.duration, null === this._msDuration && (this._msDuration = this.mediaSource.duration), !0 === this._live && !0 === t.liveDurationInfinity ? (u.logger.log("Media Source duration is set to Infinity"), this._msDuration = this.mediaSource.duration = 1 / 0) : (this._levelDuration > this._msDuration && this._levelDuration > e || !n.isFinite(e)) && (u.logger.log("Updating Media Source duration to " + this._levelDuration.toFixed(3)), this._msDuration = this.mediaSource.duration = this._levelDuration)
                }
              }, e.prototype.doFlush = function () {
                for (; this.flushRange.length;) {
                  var e = this.flushRange[0];
                  if (!this.flushBuffer(e.start, e.end, e.type)) return void(this._needsFlush = !0);
                  this.flushRange.shift(), this.flushBufferCounter = 0
                }
                if (0 === this.flushRange.length) {
                  this._needsFlush = !1;
                  var t = 0,
                    r = this.sourceBuffer;
                  try {
                    for (var n in r) t += r[n].buffered.length
                  } catch (e) {
                    u.logger.error("error while accessing sourceBuffer.buffered")
                  }
                  this.appended = t, this.hls.trigger(l.default.BUFFER_FLUSHED)
                }
              }, e.prototype.doAppending = function () {
                var e = this.hls,
                  t = this.segments,
                  r = this.sourceBuffer;
                if (Object.keys(r).length) {
                  if (this.media.error) return this.segments = [], void u.logger.error("trying to append although a media error occured, flush segment and abort");
                  if (this.appending) return;
                  if (t && t.length) {
                    var n = t.shift();
                    try {
                      var i = r[n.type];
                      i ? i.updating ? t.unshift(n) : (i.ended = !1, this.parent = n.parent, i.appendBuffer(n.data), this.appendError = 0, this.appended++, this.appending = !0) : this.onSBUpdateEnd()
                    } catch (r) {
                      u.logger.error("error while trying to append buffer:" + r.message), t.unshift(n);
                      var a = {
                        type: d.ErrorTypes.MEDIA_ERROR,
                        parent: n.parent
                      };
                      22 !== r.code ? (this.appendError ? this.appendError++ : this.appendError = 1, a.details = d.ErrorDetails.BUFFER_APPEND_ERROR, this.appendError > e.config.appendErrorMaxRetry ? (u.logger.log("fail " + e.config.appendErrorMaxRetry + " times to append segment in sourceBuffer"), this.segments = [], a.fatal = !0) : a.fatal = !1) : (this.segments = [], a.details = d.ErrorDetails.BUFFER_FULL_ERROR, a.fatal = !1), e.trigger(l.default.ERROR, a)
                    }
                  }
                }
              }, e.prototype.flushBuffer = function (e, t, r) {
                var n, i = this.sourceBuffer;
                if (Object.keys(i).length) {
                  if (u.logger.log("flushBuffer,pos/start/end: " + this.media.currentTime.toFixed(3) + "/" + e + "/" + t), this.flushBufferCounter < this.appended) {
                    for (var a in i)
                      if (!r || a === r) {
                        if ((n = i[a]).ended = !1, n.updating) return u.logger.warn("cannot flush, sb updating in progress"), !1;
                        if (this.removeBufferRange(a, n, e, t)) return this.flushBufferCounter++, !1
                      }
                  } else u.logger.warn("abort flushing too many retries");
                  u.logger.log("buffer flushed")
                }
                return !0
              }, e.prototype.removeBufferRange = function (e, t, r, n) {
                try {
                  for (var i = 0; i < t.buffered.length; i++) {
                    var a = t.buffered.start(i),
                      o = t.buffered.end(i),
                      s = Math.max(a, r),
                      l = Math.min(o, n);
                    if (.5 < Math.min(l, o) - s) return u.logger.log("sb remove " + e + " [" + s + "," + l + "], of [" + a + "," + o + "], pos:" + this.media.currentTime), t.remove(s, l), !0
                  }
                } catch (e) {
                  u.logger.warn("removeBufferRange failed", e)
                }
                return !1
              }, e
            }(a.default);
          r.default = e
        }).call(this, s(2).Number)
      }, function (e, r, o) {
        (function (n) {
          var i, e = this && this.__extends || (i = Object.setPrototypeOf || {
              __proto__: []
            }
            instanceof Array && function (e, t) {
              e.__proto__ = t
            } || function (e, t) {
              for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            },
            function (e, t) {
              function r() {
                this.constructor = e
              }
              i(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
            });
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = o(1),
            t = function (r) {
              function i(e) {
                var t = r.call(this, e, a.default.FPS_DROP_LEVEL_CAPPING, a.default.MEDIA_ATTACHING, a.default.MANIFEST_PARSED, a.default.BUFFER_CODECS, a.default.MEDIA_DETACHING) || this;
                return t.autoLevelCapping = n.POSITIVE_INFINITY, t.firstLevel = null, t.levels = [], t.media = null, t.restrictedLevels = [], t.timer = null, t
              }
              return e(i, r), i.prototype.destroy = function () {
                this.hls.config.capLevelToPlayerSize && (this.media = null, this._stopCapping())
              }, i.prototype.onFpsDropLevelCapping = function (e) {
                i.isLevelAllowed(e.droppedLevel, this.restrictedLevels) && this.restrictedLevels.push(e.droppedLevel)
              }, i.prototype.onMediaAttaching = function (e) {
                this.media = e.media instanceof window.HTMLVideoElement ? e.media : null
              }, i.prototype.onManifestParsed = function (e) {
                var t = this.hls;
                this.restrictedLevels = [], this.levels = e.levels, this.firstLevel = e.firstLevel, t.config.capLevelToPlayerSize && e.video && this._startCapping()
              }, i.prototype.onBufferCodecs = function (e) {
                this.hls.config.capLevelToPlayerSize && e.video && this._startCapping()
              }, i.prototype.onLevelsUpdated = function (e) {
                this.levels = e.levels
              }, i.prototype.onMediaDetaching = function () {
                this._stopCapping()
              }, i.prototype.detectPlayerSize = function () {
                if (this.media) {
                  var e = this.levels ? this.levels.length : 0;
                  if (e) {
                    var t = this.hls;
                    t.autoLevelCapping = this.getMaxLevel(e - 1), t.autoLevelCapping > this.autoLevelCapping && t.streamController.nextLevelSwitch(), this.autoLevelCapping = t.autoLevelCapping
                  }
                }
              }, i.prototype.getMaxLevel = function (r) {
                var n = this;
                if (!this.levels) return -1;
                var e = this.levels.filter(function (e, t) {
                  return i.isLevelAllowed(t, n.restrictedLevels) && t <= r
                });
                return i.getMaxLevelByMediaSize(e, this.mediaWidth, this.mediaHeight)
              }, i.prototype._startCapping = function () {
                this.timer || (this.autoLevelCapping = n.POSITIVE_INFINITY, this.hls.firstLevel = this.getMaxLevel(this.firstLevel), clearInterval(this.timer), this.timer = setInterval(this.detectPlayerSize.bind(this), 1e3), this.detectPlayerSize())
              }, i.prototype._stopCapping = function () {
                this.restrictedLevels = [], this.firstLevel = null, this.autoLevelCapping = n.POSITIVE_INFINITY, this.timer && (this.timer = clearInterval(this.timer), this.timer = null)
              }, Object.defineProperty(i.prototype, "mediaWidth", {
                get: function () {
                  var e, t = this.media;
                  return t && (e = t.width || t.clientWidth || t.offsetWidth, e *= i.contentScaleFactor), e
                },
                enumerable: !0,
                configurable: !0
              }), Object.defineProperty(i.prototype, "mediaHeight", {
                get: function () {
                  var e, t = this.media;
                  return t && (e = t.height || t.clientHeight || t.offsetHeight, e *= i.contentScaleFactor), e
                },
                enumerable: !0,
                configurable: !0
              }), Object.defineProperty(i, "contentScaleFactor", {
                get: function () {
                  var e = 1;
                  try {
                    e = window.devicePixelRatio
                  } catch (e) {}
                  return e
                },
                enumerable: !0,
                configurable: !0
              }), i.isLevelAllowed = function (e, t) {
                return void 0 === t && (t = []), -1 === t.indexOf(e)
              }, i.getMaxLevelByMediaSize = function (e, t, r) {
                if (!e || e && !e.length) return -1;
                for (var n = e.length - 1, i = 0; i < e.length; i += 1) {
                  var a = e[i];
                  if ((a.width >= t || a.height >= r) && (o = a, !(s = e[i + 1]) || o.width !== s.width || o.height !== s.height)) {
                    n = i;
                    break
                  }
                }
                var o, s;
                return n
              }, i
            }(o(4).default);
          r.default = t
        }).call(this, o(2).Number)
      }, function (e, t, r) {
        var n, i = this && this.__extends || (n = Object.setPrototypeOf || {
            __proto__: []
          }
          instanceof Array && function (e, t) {
            e.__proto__ = t
          } || function (e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
          },
          function (e, t) {
            function r() {
              this.constructor = e
            }
            n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
          });
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var d = r(1),
          a = r(4),
          c = r(0),
          f = window.performance,
          o = function (t) {
            function e(e) {
              return t.call(this, e, d.default.MEDIA_ATTACHING) || this
            }
            return i(e, t), e.prototype.destroy = function () {
              this.timer && clearInterval(this.timer), this.isVideoPlaybackQualityAvailable = !1
            }, e.prototype.onMediaAttaching = function (e) {
              var t = this.hls.config;
              t.capLevelOnFPSDrop && ("function" == typeof (this.video = e.media instanceof window.HTMLVideoElement ? e.media : null).getVideoPlaybackQuality && (this.isVideoPlaybackQualityAvailable = !0), clearInterval(this.timer), this.timer = setInterval(this.checkFPSInterval.bind(this), t.fpsDroppedMonitoringPeriod))
            }, e.prototype.checkFPS = function (e, t, r) {
              var n = f.now();
              if (t) {
                if (this.lastTime) {
                  var i = n - this.lastTime,
                    a = r - this.lastDroppedFrames,
                    o = t - this.lastDecodedFrames,
                    s = 1e3 * a / i,
                    l = this.hls;
                  if (l.trigger(d.default.FPS_DROP, {
                      currentDropped: a,
                      currentDecoded: o,
                      totalDroppedFrames: r
                    }), 0 < s && a > l.config.fpsDroppedMonitoringThreshold * o) {
                    var u = l.currentLevel;
                    c.logger.warn("drop FPS ratio greater than max allowed value for currentLevel: " + u), 0 < u && (-1 === l.autoLevelCapping || l.autoLevelCapping >= u) && (u -= 1, l.trigger(d.default.FPS_DROP_LEVEL_CAPPING, {
                      level: u,
                      droppedLevel: l.currentLevel
                    }), l.autoLevelCapping = u, l.streamController.nextLevelSwitch())
                  }
                }
                this.lastTime = n, this.lastDroppedFrames = r, this.lastDecodedFrames = t
              }
            }, e.prototype.checkFPSInterval = function () {
              var e = this.video;
              if (e)
                if (this.isVideoPlaybackQualityAvailable) {
                  var t = e.getVideoPlaybackQuality();
                  this.checkFPS(e, t.totalVideoFrames, t.droppedVideoFrames)
                } else this.checkFPS(e, e.webkitDecodedFrameCount, e.webkitDroppedFrameCount)
            }, e
          }(a.default);
        t.default = o
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var d = r(0),
          c = window.performance,
          i = window.XMLHttpRequest,
          n = function () {
            function e(e) {
              e && e.xhrSetup && (this.xhrSetup = e.xhrSetup)
            }
            return e.prototype.destroy = function () {
              this.abort(), this.loader = null
            }, e.prototype.abort = function () {
              var e = this.loader;
              e && 4 !== e.readyState && (this.stats.aborted = !0, e.abort()), window.clearTimeout(this.requestTimeout), this.requestTimeout = null, window.clearTimeout(this.retryTimeout), this.retryTimeout = null
            }, e.prototype.load = function (e, t, r) {
              this.context = e, this.config = t, this.callbacks = r, this.stats = {
                trequest: c.now(),
                retry: 0
              }, this.retryDelay = t.retryDelay, this.loadInternal()
            }, e.prototype.loadInternal = function () {
              var e, t = this.context;
              e = this.loader = new i;
              var r = this.stats;
              r.tfirst = 0, r.loaded = 0;
              var n = this.xhrSetup;
              try {
                if (n) try {
                  n(e, t.url)
                } catch (r) {
                  e.open("GET", t.url, !0), n(e, t.url)
                }
                e.readyState || e.open("GET", t.url, !0)
              } catch (r) {
                return void this.callbacks.onError({
                  code: e.status,
                  text: r.message
                }, t, e)
              }
              t.rangeEnd && e.setRequestHeader("Range", "bytes=" + t.rangeStart + "-" + (t.rangeEnd - 1)), e.onreadystatechange = this.readystatechange.bind(this), e.onprogress = this.loadprogress.bind(this), e.responseType = t.responseType, this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), this.config.timeout), e.send()
            }, e.prototype.readystatechange = function (e) {
              var t = e.currentTarget,
                r = t.readyState,
                n = this.stats,
                i = this.context,
                a = this.config;
              if (!n.aborted && 2 <= r)
                if (window.clearTimeout(this.requestTimeout), 0 === n.tfirst && (n.tfirst = Math.max(c.now(), n.trequest)), 4 === r) {
                  var o = t.status;
                  if (200 <= o && o < 300) {
                    n.tload = Math.max(n.tfirst, c.now());
                    var s = void 0,
                      l = void 0;
                    l = "arraybuffer" === i.responseType ? (s = t.response).byteLength : (s = t.responseText).length, n.loaded = n.total = l;
                    var u = {
                      url: t.responseURL,
                      data: s
                    };
                    this.callbacks.onSuccess(u, n, i, t)
                  } else n.retry >= a.maxRetry || 400 <= o && o < 499 ? (d.logger.error(o + " while loading " + i.url), this.callbacks.onError({
                    code: o,
                    text: t.statusText
                  }, i, t)) : (d.logger.warn(o + " while loading " + i.url + ", retrying in " + this.retryDelay + "..."), this.destroy(), this.retryTimeout = window.setTimeout(this.loadInternal.bind(this), this.retryDelay), this.retryDelay = Math.min(2 * this.retryDelay, a.maxRetryDelay), n.retry++)
                } else this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), a.timeout)
            }, e.prototype.loadtimeout = function () {
              d.logger.warn("timeout while loading " + this.context.url), this.callbacks.onTimeout(this.stats, this.context, null)
            }, e.prototype.loadprogress = function (e) {
              var t = e.currentTarget,
                r = this.stats;
              r.loaded = e.loaded, e.lengthComputable && (r.total = e.total);
              var n = this.callbacks.onProgress;
              n && n(r, this.context, null, t)
            }, e
          }();
        t.default = n
      }, function (e, t, r) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var n = "undefined" != typeof window && window.navigator && window.navigator.requestMediaKeySystemAccess ? window.navigator.requestMediaKeySystemAccess.bind(window.navigator) : null;
        t.requestMediaKeySystemAccess = n
      }]).default)
    }),
    f = e(c),
    p = (c.Hls, function () {
      function e(e, t, r) {
        this.category = e, this.code = t, this.name = t.toString(), this.message = r;
        try {
          throw new Error(this.toString())
        } catch (e) {
          this.stack = e.stack
        }
      }
      return e.prototype.toString = function () {
        return "QPlayError." + this.category + "." + this.code + ": " + this.message
      }, e
    }());
  (o = s || (s = {})).COMMON = "COMMON", o.HLS = "HLS", o.NATIVE = "NATIVE", (d = l || (l = {}))[d.UNSUPPORT = 1e4] = "UNSUPPORT", d[d.UNKNOWN_FORMAT = 10001] = "UNKNOWN_FORMAT", d[d.CAN_NOT_FETCH = 10002] = "CAN_NOT_FETCH", d[d.FULLSCRREN_NOTSUPPORT = 10003] = "FULLSCRREN_NOTSUPPORT", d[d.VIDEO_SOURCE_STALLED = 10004] = "VIDEO_SOURCE_STALLED", d[d.VIDEO_ELEMENT_ERROR = 10005] = "VIDEO_ELEMENT_ERROR", d[d.VIDEO_PLAY_FAILD = 10006] = "VIDEO_PLAY_FAILD", d[d.INVALID_CONFIG = 10007] = "INVALID_CONFIG", d[d.UNEXPECTED_ERROR = 10008] = "UNEXPECTED_ERROR", d[d.HLS_FATAL_ERROR = 10009] = "HLS_FATAL_ERROR";
  var h, g = "object" == typeof Reflect ? Reflect : null,
    y = g && "function" == typeof g.apply ? g.apply : function (e, t, r) {
      return Function.prototype.apply.call(e, t, r)
    };
  h = g && "function" == typeof g.ownKeys ? g.ownKeys : Object.getOwnPropertySymbols ? function (e) {
    return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))
  } : function (e) {
    return Object.getOwnPropertyNames(e)
  };
  var m = Number.isNaN || function (e) {
    return e != e
  };

  function v() {
    v.init.call(this)
  }
  var b = v;
  (v.EventEmitter = v).prototype._events = void 0, v.prototype._eventsCount = 0, v.prototype._maxListeners = void 0;
  var E = 10;

  function S(e) {
    return void 0 === e._maxListeners ? v.defaultMaxListeners : e._maxListeners
  }

  function _(e, t, r, n) {
    var i, a, o, s;
    if ("function" != typeof r) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof r);
    if (void 0 === (a = e._events) ? (a = e._events = Object.create(null), e._eventsCount = 0) : (void 0 !== a.newListener && (e.emit("newListener", t, r.listener ? r.listener : r), a = e._events), o = a[t]), void 0 === o) o = a[t] = r, ++e._eventsCount;
    else if ("function" == typeof o ? o = a[t] = n ? [r, o] : [o, r] : n ? o.unshift(r) : o.push(r), 0 < (i = S(e)) && o.length > i && !o.warned) {
      o.warned = !0;
      var l = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      l.name = "MaxListenersExceededWarning", l.emitter = e, l.type = t, l.count = o.length, s = l, console && console.warn && console.warn(s)
    }
    return e
  }

  function T(e, t, r) {
    var n = {
        fired: !1,
        wrapFn: void 0,
        target: e,
        type: t,
        listener: r
      },
      i = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e.push(arguments[t]);
        this.fired || (this.target.removeListener(this.type, this.wrapFn), this.fired = !0, y(this.listener, this.target, e))
      }.bind(n);
    return i.listener = r, n.wrapFn = i
  }

  function w(e, t, r) {
    var n = e._events;
    if (void 0 === n) return [];
    var i = n[t];
    return void 0 === i ? [] : "function" == typeof i ? r ? [i.listener || i] : [i] : r ? function (e) {
      for (var t = new Array(e.length), r = 0; r < t.length; ++r) t[r] = e[r].listener || e[r];
      return t
    }(i) : A(i, i.length)
  }

  function L(e) {
    var t = this._events;
    if (void 0 !== t) {
      var r = t[e];
      if ("function" == typeof r) return 1;
      if (void 0 !== r) return r.length
    }
    return 0
  }

  function A(e, t) {
    for (var r = new Array(t), n = 0; n < t; ++n) r[n] = e[n];
    return r
  }
  Object.defineProperty(v, "defaultMaxListeners", {
    enumerable: !0,
    get: function () {
      return E
    },
    set: function (e) {
      if ("number" != typeof e || e < 0 || m(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
      E = e
    }
  }), v.init = function () {
    void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
  }, v.prototype.setMaxListeners = function (e) {
    if ("number" != typeof e || e < 0 || m(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
    return this._maxListeners = e, this
  }, v.prototype.getMaxListeners = function () {
    return S(this)
  }, v.prototype.emit = function (e) {
    for (var t = [], r = 1; r < arguments.length; r++) t.push(arguments[r]);
    var n = "error" === e,
      i = this._events;
    if (void 0 !== i) n = n && void 0 === i.error;
    else if (!n) return !1;
    if (n) {
      var a;
      if (0 < t.length && (a = t[0]), a instanceof Error) throw a;
      var o = new Error("Unhandled error." + (a ? " (" + a.message + ")" : ""));
      throw o.context = a, o
    }
    var s = i[e];
    if (void 0 === s) return !1;
    if ("function" == typeof s) y(s, this, t);
    else {
      var l = s.length,
        u = A(s, l);
      for (r = 0; r < l; ++r) y(u[r], this, t)
    }
    return !0
  }, v.prototype.on = v.prototype.addListener = function (e, t) {
    return _(this, e, t, !1)
  }, v.prototype.prependListener = function (e, t) {
    return _(this, e, t, !0)
  }, v.prototype.once = function (e, t) {
    if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
    return this.on(e, T(this, e, t)), this
  }, v.prototype.prependOnceListener = function (e, t) {
    if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
    return this.prependListener(e, T(this, e, t)), this
  }, v.prototype.off = v.prototype.removeListener = function (e, t) {
    var r, n, i, a, o;
    if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
    if (void 0 === (n = this._events)) return this;
    if (void 0 === (r = n[e])) return this;
    if (r === t || r.listener === t) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete n[e], n.removeListener && this.emit("removeListener", e, r.listener || t));
    else if ("function" != typeof r) {
      for (i = -1, a = r.length - 1; 0 <= a; a--)
        if (r[a] === t || r[a].listener === t) {
          o = r[a].listener, i = a;
          break
        } if (i < 0) return this;
      0 === i ? r.shift() : function (e, t) {
        for (; t + 1 < e.length; t++) e[t] = e[t + 1];
        e.pop()
      }(r, i), 1 === r.length && (n[e] = r[0]), void 0 !== n.removeListener && this.emit("removeListener", e, o || t)
    }
    return this
  }, v.prototype.removeAllListeners = function (e) {
    var t, r, n;
    if (void 0 === (r = this._events)) return this;
    if (void 0 === r.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== r[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete r[e]), this;
    if (0 === arguments.length) {
      var i, a = Object.keys(r);
      for (n = 0; n < a.length; ++n) "removeListener" !== (i = a[n]) && this.removeAllListeners(i);
      return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
    }
    if ("function" == typeof (t = r[e])) this.removeListener(e, t);
    else if (void 0 !== t)
      for (n = t.length - 1; 0 <= n; n--) this.removeListener(e, t[n]);
    return this
  }, v.prototype.listeners = function (e) {
    return w(this, e, !0)
  }, v.prototype.rawListeners = function (e) {
    return w(this, e, !1)
  }, v.listenerCount = function (e, t) {
    return "function" == typeof e.listenerCount ? e.listenerCount(t) : L.call(e, t)
  }, v.prototype.listenerCount = L, v.prototype.eventNames = function () {
    return 0 < this._eventsCount ? h(this._events) : []
  };
  var R = function (i) {
      function e(e, t, r) {
        var n = i.call(this) || this;
        return n.supportFeatures = {
          bitrate: !1
        }, n.eventList = [], n.config = t, n.render = e, n.eventList = n.eventList.concat(r), n
      }
      return t(e, i), Object.defineProperty(e.prototype, "video", {
        get: function () {
          return this.render.video
        },
        enumerable: !0,
        configurable: !0
      }), e.probe = function (e, t, r) {
        return !1
      }, e.playConfigToEngineConfig = function (e, t) {}, e.isSupport = function () {
        return !1
      }, e.prototype.replaceRender = function (e) {
        this.render = e
      }, e.prototype.handleRenderEvents = function () {
        var t = this;
        this.render.canplay ? this.emit("ready", this.render.totalTime) : this.render.once("canplay", function (e) {
          t.emit("ready", e)
        })
      }, e
    }(b),
    D = function (n) {
      function e(e, t, r) {
        return n.call(this, e, t, r) || this
      }
      return t(e, n), e
    }(R),
    x = {
      VERBOSE: 0,
      DEBUG: 1,
      WARNING: 2,
      DISABLE: 3
    },
    I = new(function () {
      function e(e) {
        this.name = e, this.level = "VERBOSE"
      }
      return e.prototype.verbose = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        if (!(x[this.level] > x.VERBOSE)) {
          var r = "%c" + this.name + "-verbose";
          console.info.apply(console, [r, "color: #66ccff;"].concat(e))
        }
      }, e.prototype.debug = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        if (!(x[this.level] > x.DEBUG)) {
          var r = "%c" + this.name + "-debug";
          console.info.apply(console, [r, "color: #A28148; font-weight: bold;"].concat(e))
        }
      }, e.prototype.warning = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        if (!(x[this.level] > x.WARNING)) {
          var r = "%c" + this.name + "-WARNING";
          console.warn.apply(console, [r, "color: #E44F44; font-weight: bold;"].concat(e))
        }
      }, e.prototype.setLevel = function (e) {
        for (var t in x)
          if (x[t] === e) return void(this.level = t);
        this.level = "DEBUG"
      }, e
    }())("QPLAYER"),
    O = function (n) {
      function i(e, t) {
        var r = n.call(this, e, t, ["#hls:mainfest-parsed"]) || this;
        if (r.supportFeatures = {
            bitrate: !0
          }, r.config = t, !i.isSupport()) throw new p(s.HLS, l.UNSUPPORT, "not support hls");
        return r.initHLS(), r
      }
      return t(i, n), i.isSupport = function () {
        return f.isSupported()
      }, i.probe = function (e, t) {
        return !!e.split("?")[0].endsWith("m3u8") || ("application/x-mpegurl" === t || "vnd.apple.mpegURL" === t)
      }, i.prototype.toggleAutoQualityControl = function () {
        this.hls.autoLevelEnabled ? this.hls.nextLevel = this.hls.currentLevel : this.hls.nextLevel = -1, this.emit("@auto-quality-switch-change", this.hls.autoLevelEnabled)
      }, Object.defineProperty(i.prototype, "currentQuality", {
        get: function () {
          var t = -1 === this.hls.currentLevel ? this.hls.firstLevel : this.hls.currentLevel;
          return {
            quality: this.qualityList.find(function (e) {
              return e.id === t
            }) || null,
            isAuto: this.hls.autoLevelEnabled
          }
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(i.prototype, "qualityList", {
        get: function () {
          var r = this;
          return this.hls.levels.sort().map(function (e, t) {
            return {
              id: t,
              name: r.config.qualityName ? r.config.qualityName[t] : e.name || "unknown",
              bitrate: e.bitrate,
              url: e.url[0],
              type: "hls"
            }
          })
        },
        enumerable: !0,
        configurable: !0
      }), i.prototype.changeQuality = function (e) {
        this.hls.autoLevelEnabled && -1 !== e && this.emit("@auto-quality-switch-change", !1), this.hls.currentLevel = e
      }, i.playConfigToEngineConfig = function (e, t) {
        return a({
          url: e
        }, t.hls)
      }, i.prototype.switchSource = function (e) {
        I.verbose("switch url")
      }, i.prototype.reload = function () {
        this.hls.destroy(), this.initHLS()
      }, i.prototype.destroy = function () {
        this.hls.destroy(), this.removeAllListeners()
      }, i.prototype.initHLS = function () {
        var r = this,
          e = {
            debug: "WARNING" !== I.level && "DISABLE" !== I.level,
            qiniuDRMKey: this.config.DRMKey ? this.config.DRMKey : void 0
          },
          n = !0,
          i = !0;
        this.hls = new f(e), this.hls.loadSource(this.config.url), this.hls.attachMedia(this.render.video), this.hls.once(f.Events.MANIFEST_PARSED, function () {
          I.verbose("hls: mainfest parsed"), r.emit("#hls:mainfest-parsed"), r.emit("@get-quality-list", r.qualityList)
        }), this.hls.on(f.Events.LEVEL_SWITCHING, function (e, t) {
          r.hls.autoLevelEnabled || (r.render.isLoading = !0, r.render.setLoadingStateLock(!0)), n ? n = !1 : r.emit("@quality-switching", t.level)
        }), this.hls.on(f.Events.LEVEL_SWITCHED, function (e, t) {
          r.render.setLoadingStateLock(!1), r.render.isLoading = !1, i ? i = !1 : r.emit("@quality-switched", r.currentQuality.quality.id)
        }), this.hls.on(f.Events.ERROR, function (e, t) {
          if (t.fatal) switch (t.type) {
            case f.ErrorTypes.NETWORK_ERROR:
              if (t.response && 400 < t.response.code && t.response.code < 500) return void r.emit("error", new p(s.COMMON, l.CAN_NOT_FETCH, t.details));
              I.warning("hls network fatal error, try to recovery"), r.hls.startLoad();
              break;
            case f.ErrorTypes.MEDIA_ERROR:
              I.warning("hls media fatal error, try to recovery"), r.hls.recoverMediaError();
              break;
            default:
              r.emit("error", new p(s.HLS, l.HLS_FATAL_ERROR, t.details))
          }
        }), this.handleRenderEvents()
      }, i
    }(D),
    P = function (n) {
      function i(e, t) {
        var r = n.call(this, e, t, []) || this;
        if (!i.isSupport()) throw new p(s.NATIVE, l.UNSUPPORT, "not support html5 video/audio");
        return r.initNative(), r
      }
      return t(i, n), i.isSupport = function () {
        return !!document.createElement("video").canPlayType
      }, i.probe = function (e, t, r) {
        if (r.hls && r.hls.DRMKey) return !1;
        if (!t) return !1;
        switch (document.createElement("video").canPlayType(t)) {
          case "maybe":
            return I.verbose("can't detect if " + e + " can be played"), !0;
          case "probably":
            return !0;
          default:
            return !1
        }
      }, i.playConfigToEngineConfig = function (e, t) {
        return {
          url: e
        }
      }, i.prototype.switchSource = function (e) {
        var t = this,
          r = this.render.currentTime;
        this.render.isLoading = !0, this.config.url = e, this.render.video.src = e, this.render.once("canplay", function () {
          t.render.seek(r), t.render.play()
        })
      }, i.prototype.reload = function () {
        var e = this.render.video.src;
        this.render.video.src = "", this.render.video.load(), this.render.video.src = e, this.render.play()
      }, i.prototype.destroy = function () {
        this.removeAllListeners()
      }, i.prototype.initNative = function () {
        this.render.video.src = this.config.url, this.handleRenderEvents()
      }, i
    }(R);

  function M(e, t) {
    return e(t = {
      exports: {}
    }, t.exports), t.exports
  }
  var C = M(function (e) {
      var t = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
      "number" == typeof __g && (__g = t)
    }),
    k = M(function (e) {
      var t = e.exports = {
        version: "2.6.3"
      };
      "number" == typeof __e && (__e = t)
    }),
    N = (k.version, function (e) {
      return "object" == typeof e ? null !== e : "function" == typeof e
    }),
    F = function (e) {
      if (!N(e)) throw TypeError(e + " is not an object!");
      return e
    },
    B = function (e) {
      try {
        return !!e()
      } catch (e) {
        return !0
      }
    },
    U = !B(function () {
      return 7 != Object.defineProperty({}, "a", {
        get: function () {
          return 7
        }
      }).a
    }),
    j = C.document,
    q = N(j) && N(j.createElement),
    G = !U && !B(function () {
      return 7 != Object.defineProperty((e = "div", q ? j.createElement(e) : {}), "a", {
        get: function () {
          return 7
        }
      }).a;
      var e
    }),
    H = Object.defineProperty,
    V = {
      f: U ? Object.defineProperty : function (e, t, r) {
        if (F(e), t = function (e, t) {
            if (!N(e)) return e;
            var r, n;
            if (t && "function" == typeof (r = e.toString) && !N(n = r.call(e))) return n;
            if ("function" == typeof (r = e.valueOf) && !N(n = r.call(e))) return n;
            if (!t && "function" == typeof (r = e.toString) && !N(n = r.call(e))) return n;
            throw TypeError("Can't convert object to primitive value")
          }(t, !0), F(r), G) try {
          return H(e, t, r)
        } catch (e) {}
        if ("get" in r || "set" in r) throw TypeError("Accessors not supported!");
        return "value" in r && (e[t] = r.value), e
      }
    },
    z = U ? function (e, t, r) {
      return V.f(e, t, {
        enumerable: !((n = 1) & n),
        configurable: !(2 & n),
        writable: !(4 & n),
        value: r
      });
      var n
    } : function (e, t, r) {
      return e[t] = r, e
    },
    W = {}.hasOwnProperty,
    K = function (e, t) {
      return W.call(e, t)
    },
    Y = 0,
    Z = Math.random(),
    X = M(function (e) {
      var t, a = "Symbol(".concat(void 0 === (t = "src") ? "" : t, ")_", (++Y + Z).toString(36)),
        r = "toString",
        n = Function[r],
        o = ("" + n).split(r);
      k.inspectSource = function (e) {
        return n.call(e)
      }, (e.exports = function (e, t, r, n) {
        var i = "function" == typeof r;
        i && (K(r, "name") || z(r, "name", t)), e[t] !== r && (i && (K(r, a) || z(r, a, e[t] ? "" + e[t] : o.join(String(t)))), e === C ? e[t] = r : n ? e[t] ? e[t] = r : z(e, t, r) : (delete e[t], z(e, t, r)))
      })(Function.prototype, r, function () {
        return "function" == typeof this && this[a] || n.call(this)
      })
    }),
    Q = function (n, i, e) {
      if (function (e) {
          if ("function" != typeof e) throw TypeError(e + " is not a function!")
        }(n), void 0 === i) return n;
      switch (e) {
        case 1:
          return function (e) {
            return n.call(i, e)
          };
        case 2:
          return function (e, t) {
            return n.call(i, e, t)
          };
        case 3:
          return function (e, t, r) {
            return n.call(i, e, t, r)
          }
      }
      return function () {
        return n.apply(i, arguments)
      }
    },
    J = "prototype",
    $ = function (e, t, r) {
      var n, i, a, o, s = e & $.F,
        l = e & $.G,
        u = e & $.S,
        d = e & $.P,
        c = e & $.B,
        f = l ? C : u ? C[t] || (C[t] = {}) : (C[t] || {})[J],
        p = l ? k : k[t] || (k[t] = {}),
        h = p[J] || (p[J] = {});
      for (n in l && (r = t), r) a = ((i = !s && f && void 0 !== f[n]) ? f : r)[n], o = c && i ? Q(a, C) : d && "function" == typeof a ? Q(Function.call, a) : a, f && X(f, n, a, e & $.U), p[n] != a && z(p, n, o), d && h[n] != a && (h[n] = a)
    };
  C.core = k, $.F = 1, $.G = 2, $.S = 4, $.P = 8, $.B = 16, $.W = 32, $.U = 64, $.R = 128;
  var ee = $,
    te = Math.ceil,
    re = Math.floor,
    ne = function (e) {
      return isNaN(e = +e) ? 0 : (0 < e ? re : te)(e)
    },
    ie = Math.min,
    ae = function (e) {
      if (null == e) throw TypeError("Can't call method on  " + e);
      return e
    },
    oe = function (e, t, r, n) {
      var i, a = String(ae(e)),
        o = a.length,
        s = void 0 === r ? " " : String(r),
        l = 0 < (i = t) ? ie(ne(i), 9007199254740991) : 0;
      if (l <= o || "" == s) return a;
      var u = l - o,
        d = function (e) {
          var t = String(ae(this)),
            r = "",
            n = ne(e);
          if (n < 0 || n == 1 / 0) throw RangeError("Count can't be negative");
          for (; 0 < n;
            (n >>>= 1) && (t += t)) 1 & n && (r += t);
          return r
        }.call(s, Math.ceil(u / s.length));
      return d.length > u && (d = d.slice(0, u)), n ? d + a : a + d
    },
    se = C.navigator,
    le = se && se.userAgent || "";
  ee(ee.P + ee.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(le), "String", {
    padStart: function (e) {
      return oe(this, e, 1 < arguments.length ? arguments[1] : void 0, !0)
    }
  });
  k.String.padStart;
  var ue = function () {},
    de = {},
    ce = [],
    fe = [];

  function pe(e, t) {
    var r, n, i, a, o = fe;
    for (a = arguments.length; 2 < a--;) ce.push(arguments[a]);
    for (t && null != t.children && (ce.length || ce.push(t.children), delete t.children); ce.length;)
      if ((n = ce.pop()) && void 0 !== n.pop)
        for (a = n.length; a--;) ce.push(n[a]);
      else "boolean" == typeof n && (n = null), (i = "function" != typeof e) && (null == n ? n = "" : "number" == typeof n ? n = String(n) : "string" != typeof n && (i = !1)), i && r ? o[o.length - 1] += n : o === fe ? o = [n] : o.push(n), r = i;
    var s = new ue;
    return s.nodeName = e, s.children = o, s.attributes = null == t ? void 0 : t, s.key = null == t ? void 0 : t.key, s
  }

  function he(e, t) {
    for (var r in t) e[r] = t[r];
    return e
  }

  function ge(e, t) {
    null != e && ("function" == typeof e ? e(t) : e.current = t)
  }
  var ye = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
    me = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
    ve = [];

  function be(e) {
    !e._dirty && (e._dirty = !0) && 1 == ve.push(e) && ye(Ee)
  }

  function Ee() {
    for (var e; e = ve.pop();) e._dirty && Ue(e)
  }

  function Se(e, t) {
    return e.normalizedNodeName === t || e.nodeName.toLowerCase() === t.toLowerCase()
  }

  function _e(e) {
    var t = he({}, e.attributes);
    t.children = e.children;
    var r = e.nodeName.defaultProps;
    if (void 0 !== r)
      for (var n in r) void 0 === t[n] && (t[n] = r[n]);
    return t
  }

  function Te(e) {
    var t = e.parentNode;
    t && t.removeChild(e)
  }

  function we(e, t, r, n, i) {
    if ("className" === t && (t = "class"), "key" === t);
    else if ("ref" === t) ge(r, null), ge(n, e);
    else if ("class" !== t || i)
      if ("style" === t) {
        if (n && "string" != typeof n && "string" != typeof r || (e.style.cssText = n || ""), n && "object" == typeof n) {
          if ("string" != typeof r)
            for (var a in r) a in n || (e.style[a] = "");
          for (var a in n) e.style[a] = "number" == typeof n[a] && !1 === me.test(a) ? n[a] + "px" : n[a]
        }
      } else if ("dangerouslySetInnerHTML" === t) n && (e.innerHTML = n.__html || "");
    else if ("o" == t[0] && "n" == t[1]) {
      var o = t !== (t = t.replace(/Capture$/, ""));
      t = t.toLowerCase().substring(2), n ? r || e.addEventListener(t, Le, o) : e.removeEventListener(t, Le, o), (e._listeners || (e._listeners = {}))[t] = n
    } else if ("list" !== t && "type" !== t && !i && t in e) {
      try {
        e[t] = null == n ? "" : n
      } catch (e) {}
      null != n && !1 !== n || "spellcheck" == t || e.removeAttribute(t)
    } else {
      var s = i && t !== (t = t.replace(/^xlink:?/, ""));
      null == n || !1 === n ? s ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof n && (s ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), n) : e.setAttribute(t, n))
    } else e.className = n || ""
  }

  function Le(e) {
    return this._listeners[e.type](e)
  }
  var Ae = [],
    Re = 0,
    De = !1,
    xe = !1;

  function Ie() {
    for (var e; e = Ae.shift();) e.componentDidMount && e.componentDidMount()
  }

  function Oe(e, t, r, n, i, a) {
    Re++ || (De = null != i && void 0 !== i.ownerSVGElement, xe = null != e && !("__preactattr_" in e));
    var o = Pe(e, t, r, n, a);
    return i && o.parentNode !== i && i.appendChild(o), --Re || (xe = !1, a || Ie()), o
  }

  function Pe(e, t, r, n, i) {
    var a = e,
      o = De;
    if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || i) ? e.nodeValue != t && (e.nodeValue = t) : (a = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(a, e), Me(e, !0))), a.__preactattr_ = !0, a;
    var s, l, u = t.nodeName;
    if ("function" == typeof u) return function (e, t, r, n) {
      var i = e && e._component,
        a = i,
        o = e,
        s = i && e._componentConstructor === t.nodeName,
        l = s,
        u = _e(t);
      for (; i && !l && (i = i._parentComponent);) l = i.constructor === t.nodeName;
      i && l && (!n || i._component) ? (Be(i, u, 3, r, n), e = i.base) : (a && !s && (je(a), e = o = null), i = Ne(t.nodeName, u, r), e && !i.nextBase && (i.nextBase = e, o = null), Be(i, u, 1, r, n), e = i.base, o && e !== o && (o._component = null, Me(o, !1)));
      return e
    }(e, t, r, n);
    if (De = "svg" === u || "foreignObject" !== u && De, u = String(u), (!e || !Se(e, u)) && (s = u, (l = De ? document.createElementNS("http://www.w3.org/2000/svg", s) : document.createElement(s)).normalizedNodeName = s, a = l, e)) {
      for (; e.firstChild;) a.appendChild(e.firstChild);
      e.parentNode && e.parentNode.replaceChild(a, e), Me(e, !0)
    }
    var d = a.firstChild,
      c = a.__preactattr_,
      f = t.children;
    if (null == c) {
      c = a.__preactattr_ = {};
      for (var p = a.attributes, h = p.length; h--;) c[p[h].name] = p[h].value
    }
    return !xe && f && 1 === f.length && "string" == typeof f[0] && null != d && void 0 !== d.splitText && null == d.nextSibling ? d.nodeValue != f[0] && (d.nodeValue = f[0]) : (f && f.length || null != d) && function (e, t, r, n, i) {
        var a, o, s, l, u, d = e.childNodes,
          c = [],
          f = {},
          p = 0,
          h = 0,
          g = d.length,
          y = 0,
          m = t ? t.length : 0;
        if (0 !== g)
          for (var v = 0; v < g; v++) {
            var b = d[v],
              E = b.__preactattr_,
              S = m && E ? b._component ? b._component.__key : E.key : null;
            null != S ? (p++, f[S] = b) : (E || (void 0 !== b.splitText ? !i || b.nodeValue.trim() : i)) && (c[y++] = b)
          }
        if (0 !== m)
          for (var v = 0; v < m; v++) {
            l = t[v], u = null;
            var S = l.key;
            if (null != S) p && void 0 !== f[S] && (u = f[S], f[S] = void 0, p--);
            else if (h < y)
              for (a = h; a < y; a++)
                if (void 0 !== c[a] && (_ = o = c[a], w = i, "string" == typeof (T = l) || "number" == typeof T ? void 0 !== _.splitText : "string" == typeof T.nodeName ? !_._componentConstructor && Se(_, T.nodeName) : w || _._componentConstructor === T.nodeName)) {
                  u = o, c[a] = void 0, a === y - 1 && y--, a === h && h++;
                  break
                } u = Pe(u, l, r, n), s = d[v], u && u !== e && u !== s && (null == s ? e.appendChild(u) : u === s.nextSibling ? Te(s) : e.insertBefore(u, s))
          }
        var _, T, w;
        if (p)
          for (var v in f) void 0 !== f[v] && Me(f[v], !1);
        for (; h <= y;) void 0 !== (u = c[y--]) && Me(u, !1)
      }(a, f, r, n, xe || null != c.dangerouslySetInnerHTML),
      function (e, t, r) {
        var n;
        for (n in r) t && null != t[n] || null == r[n] || we(e, n, r[n], r[n] = void 0, De);
        for (n in t) "children" === n || "innerHTML" === n || n in r && t[n] === ("value" === n || "checked" === n ? e[n] : r[n]) || we(e, n, r[n], r[n] = t[n], De)
      }(a, t.attributes, c), De = o, a
  }

  function Me(e, t) {
    var r = e._component;
    r ? je(r) : (null != e.__preactattr_ && ge(e.__preactattr_.ref, null), !1 !== t && null != e.__preactattr_ || Te(e), Ce(e))
  }

  function Ce(e) {
    for (e = e.lastChild; e;) {
      var t = e.previousSibling;
      Me(e, !0), e = t
    }
  }
  var ke = [];

  function Ne(e, t, r) {
    var n, i = ke.length;
    for (e.prototype && e.prototype.render ? (n = new e(t, r), qe.call(n, t, r)) : ((n = new qe(t, r)).constructor = e, n.render = Fe); i--;)
      if (ke[i].constructor === e) return n.nextBase = ke[i].nextBase, ke.splice(i, 1), n;
    return n
  }

  function Fe(e, t, r) {
    return this.constructor(e, r)
  }

  function Be(e, t, r, n, i) {
    e._disable || (e._disable = !0, e.__ref = t.ref, e.__key = t.key, delete t.ref, delete t.key, void 0 === e.constructor.getDerivedStateFromProps && (!e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, n)), n && n !== e.context && (e.prevContext || (e.prevContext = e.context), e.context = n), e.prevProps || (e.prevProps = e.props), e.props = t, e._disable = !1, 0 !== r && (1 !== r && !1 === de.syncComponentUpdates && e.base ? be(e) : Ue(e, 1, i)), ge(e.__ref, e))
  }

  function Ue(e, t, r, n) {
    if (!e._disable) {
      var i, a, o, s = e.props,
        l = e.state,
        u = e.context,
        d = e.prevProps || s,
        c = e.prevState || l,
        f = e.prevContext || u,
        p = e.base,
        h = e.nextBase,
        g = p || h,
        y = e._component,
        m = !1,
        v = f;
      if (e.constructor.getDerivedStateFromProps && (l = he(he({}, l), e.constructor.getDerivedStateFromProps(s, l)), e.state = l), p && (e.props = d, e.state = c, e.context = f, 2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(s, l, u) ? m = !0 : e.componentWillUpdate && e.componentWillUpdate(s, l, u), e.props = s, e.state = l, e.context = u), e.prevProps = e.prevState = e.prevContext = e.nextBase = null, e._dirty = !1, !m) {
        i = e.render(s, l, u), e.getChildContext && (u = he(he({}, u), e.getChildContext())), p && e.getSnapshotBeforeUpdate && (v = e.getSnapshotBeforeUpdate(d, c));
        var b, E, S = i && i.nodeName;
        if ("function" == typeof S) {
          var _ = _e(i);
          (a = y) && a.constructor === S && _.key == a.__key ? Be(a, _, 1, u, !1) : (b = a, e._component = a = Ne(S, _, u), a.nextBase = a.nextBase || h, a._parentComponent = e, Be(a, _, 0, u, !1), Ue(a, 1, r, !0)), E = a.base
        } else o = g, (b = y) && (o = e._component = null), (g || 1 === t) && (o && (o._component = null), E = Oe(o, i, u, r || !p, g && g.parentNode, !0));
        if (g && E !== g && a !== y) {
          var T = g.parentNode;
          T && E !== T && (T.replaceChild(E, g), b || (g._component = null, Me(g, !1)))
        }
        if (b && je(b), (e.base = E) && !n) {
          for (var w = e, L = e; L = L._parentComponent;)(w = L).base = E;
          E._component = w, E._componentConstructor = w.constructor
        }
      }
      for (!p || r ? Ae.push(e) : m || e.componentDidUpdate && e.componentDidUpdate(d, c, v); e._renderCallbacks.length;) e._renderCallbacks.pop().call(e);
      Re || n || Ie()
    }
  }

  function je(e) {
    var t = e.base;
    e._disable = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;
    var r = e._component;
    r ? je(r) : t && (null != t.__preactattr_ && ge(t.__preactattr_.ref, null), Te(e.nextBase = t), ke.push(e), Ce(t)), ge(e.__ref, null)
  }

  function qe(e, t) {
    this._dirty = !0, this.context = t, this.props = e, this.state = this.state || {}, this._renderCallbacks = []
  }

  function Ge(e, t, r) {
    return Oe(r, e, {}, !1, t, !1)
  }
  he(qe.prototype, {
    setState: function (e, t) {
      this.prevState || (this.prevState = this.state), this.state = he(he({}, this.state), "function" == typeof e ? e(this.state, this.props) : e), t && this._renderCallbacks.push(t), be(this)
    },
    forceUpdate: function (e) {
      e && this._renderCallbacks.push(e), Ue(this, 2)
    },
    render: function () {}
  });
  var He = function (e, t) {
    return (He = Object.setPrototypeOf || {
        __proto__: []
      }
      instanceof Array && function (e, t) {
        e.__proto__ = t
      } || function (e, t) {
        for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
      })(e, t)
  };

  function Ve(e, t) {
    function r() {
      this.constructor = e
    }
    He(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
  }
  var ze = M(function (e) {
    ! function () {
      var o = {}.hasOwnProperty;

      function s() {
        for (var e = [], t = 0; t < arguments.length; t++) {
          var r = arguments[t];
          if (r) {
            var n = typeof r;
            if ("string" === n || "number" === n) e.push(r);
            else if (Array.isArray(r) && r.length) {
              var i = s.apply(null, r);
              i && e.push(i)
            } else if ("object" === n)
              for (var a in r) o.call(r, a) && r[a] && e.push(a)
          }
        }
        return e.join(" ")
      }
      e.exports ? (s.default = s, e.exports = s) : window.classNames = s
    }()
  });

  function We(e, t) {
    void 0 === t && (t = {});
    var r = t.insertAt;
    if (e && "undefined" != typeof document) {
      var n = document.head || document.getElementsByTagName("head")[0],
        i = document.createElement("style");
      i.type = "text/css", "top" === r && n.firstChild ? n.insertBefore(i, n.firstChild) : n.appendChild(i), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(document.createTextNode(e))
    }
  }
  We(".qplayer, .qplayer * {\n  box-sizing: border-box;\n  -webkit-tap-highlight-color: transparent;\n  margin: 0;\n  padding: 0;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.qplayer button {\n    background: none;\n    border: none;\n    outline: none;\n    border-radius: 0;\n  }\n\n.qplayer, .qplayer-wrapper, .qplayer-video {\n  width: 100%;\n  height: 100%;\n}\n\n.qplayer {\n  position: relative;\n}\n\n.qplayer-wrapper {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  z-index: 2;\n  background: #000;\n  left: 0;\n}\n\n.qplayer-error {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  flex-direction: column;\n  justify-content: center;\n  background: #000;\n  display: none\n}\n\n.qplayer-error.qplayer-active {\n    display: flex;\n  }\n\n.qplayer-error-title {\n  color: #ff0000;\n  font-size: 18px;\n  text-align: center;\n  margin-bottom: 10px;\n}\n\n.qplayer-error-content {\n  color: rgba(255, 255, 255, .6);\n  text-align: center;\n  font-size: 14px;\n}\n\n.qplayer-loading {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(255, 255, 255, .4);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0;\n  z-index: -1;\n  transition: opacity ease 0.2s\n}\n\n.qplayer-loading.qplayer-active {\n    opacity: 1;\n    z-index: 1;\n  }\n\n.qplayer-controlswrapper {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  z-index: 2;\n}\n\n.qplayer-controls {\n  width: 100%;\n  height: 40px;\n  position: absolute;\n  bottom: 0;\n  background: rgba(0, 0, 0, .5);\n  transition: opacity ease 0.1s, -webkit-transform ease 0.2s;\n  transition: transform ease 0.2s, opacity ease 0.1s;\n  transition: transform ease 0.2s, opacity ease 0.1s, -webkit-transform ease 0.2s;\n  -webkit-transform: translateY(38px);\n          transform: translateY(38px);\n  pointer-events: none\n}\n\n.qplayer-controls.qplayer-active {\n    pointer-events: auto;\n    -webkit-transform: translateY(0px);\n            transform: translateY(0px);\n  }\n\n.qplayer-center-btn {\n  position: absolute;\n  width: 80px;\n  height: 80px;\n  left: calc(50% - 40px);\n  top: calc(50% - 40px);\n  background: rgba(0, 0, 0, .5) !important;\n  border-radius: 50% !important;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity ease 0.2s;\n  cursor: pointer;\n  z-index: 3\n}\n\n.qplayer-center-btn.qplayer-active {\n    opacity: 1;\n    pointer-events: auto;\n  }\n\n.qplayer-center-btn img {\n    position: absolute;\n    left: calc(50% - 15px);\n    top: calc(50% - 15px);\n    width: 30px;\n    height: 30px;\n  }\n\n.qplayer-gesture-wrapper {\n  width: 100%;\n  height: calc(100% - 40px);\n  position: absolute;\n  top: 0;\n  left: 0;\n\n}\n\n.qplayer-gesture-tips {\n  width: 150px;\n  height: 80px;\n  border-radius: 4px;\n  background: rgba(0, 0, 0, .5);\n  position: absolute;\n  left: calc(50% - 75px);\n  top: calc(50% - 50px);\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  align-items: center;\n  padding: 10px;\n}\n\n.qplayer-gesture-volume-wrapper {\n  width: 120px;\n  height: 6px;\n  border-radius: 6px;\n  background: rgba(255, 255, 255, .4);\n  overflow: hidden;\n}\n\n.qplayer-gesture-volume-current {\n  height: 100%;\n  background: #fff;\n  border-radius: 6px;\n}\n\n.qplayer-gesture-seek-text {\n  color: #fff;\n  font-size: 26px;\n}\n\n.qplayer-gesture-seek-text span {\n    margin: 0 2px;\n    font-size: 20px;\n    color: rgba(255, 255, 255, .6);\n  }\n\n.qplayer-playbtn {\n  position: relative;\n  width: 30px;\n  height: 30px;\n  cursor: pointer;\n}\n\n.qplayer-play, .qplayer-pause {\n  position: absolute !important;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  pointer-events: none;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: opacity ease 0.2s\n}\n\n.qplayer-play.qplayer-active, .qplayer-pause.qplayer-active {\n    pointer-events: auto;\n    opacity: 1;\n  }\n\n.qplayer-time {\n  color: rgba(255, 255, 255, .78);\n  font-size: 13px;\n  width: 44px;\n  text-align: center;\n}\n\n.qplayer-fullscreen {\n  display: flex;\n  align-items: center;\n}\n\n.qplayer-controlbtns {\n  padding: 8px 12px 0px 12px;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n}\n\n.qplayer-controlbtns button {\n  }\n\n.qplayer-blank {\n  flex: 1;\n}\n\n.qplayer-volume {\n  position: absolute;\n  bottom: 0;\n  z-index: 2\n}\n\n.qplayer-volume:hover .qplayer-sidewrapper {\n    opacity: 1;\n    pointer-events: auto;\n    z-index: 3;\n    height: 120px;\n    margin-bottom: 10px;\n  }\n\n.qplayer-volumewrapper {\n  height: 100%;\n  width: 24px;\n  margin-right: 15px;\n  position: relative;\n}\n\n.qplayer-sidewrapper {\n  opacity: 0;\n  height: 0;\n  pointer-events: none;\n  z-index: -1;\n  transition: opacity ease 0.3s;\n  width: 30px;\n  border-radius: 4px;\n  overflow: hidden;\n}\n\n.qplayer-volume_side {\n  justify-content: space-around;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  color: #fff;\n  font-size: 13px;\n  background: rgba(0, 0, 0, .7);\n  padding: 5px;\n  height: 120px;\n}\n\n.qplayer-volumebtn {\n  width: 30px;\n  height: 20px;\n  margin-bottom: 6px;\n}\n\n.qplayer-volumebtn img {\n    width: 100%;\n    height: 100%;\n  }\n\n.qplayer-settings-btn {\n  margin-right: 10px;\n  height: 20px;\n}\n\n\n.qplayer-controller-slot {\n  margin-right: 10px;\n}\n\n\n.qplayer-controller-slot button {\n    color: #fff;\n    cursor: pointer;\n  }\n");
  We("button[data-balloon] {\n  overflow: visible; }\n\n[data-balloon] {\n  position: relative;\n  cursor: pointer; }\n  [data-balloon]:after {\n    filter: alpha(opacity=0);\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n    -moz-opacity: 0;\n    -khtml-opacity: 0;\n    opacity: 0;\n    pointer-events: none;\n    transition: all 0.1s ease-out 0.1s;\n    font-family: sans-serif !important;\n    font-weight: normal !important;\n    font-style: normal !important;\n    text-shadow: none !important;\n    font-size: 12px !important;\n    background: rgba(17, 17, 17, 0.9);\n    border-radius: 4px;\n    color: #fff;\n    content: attr(data-balloon);\n    padding: .5em 1em;\n    position: absolute;\n    white-space: nowrap;\n    z-index: 1; }\n  [data-balloon]:before {\n    background: no-repeat url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba(17, 17, 17, 0.9)%22%20transform%3D%22rotate(0)%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E\");\n    background-size: 100% auto;\n    width: 18px;\n    height: 6px;\n    filter: alpha(opacity=0);\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n    -moz-opacity: 0;\n    -khtml-opacity: 0;\n    opacity: 0;\n    pointer-events: none;\n    transition: all 0.1s ease-out 0.1s;\n    content: '';\n    position: absolute;\n    z-index: 1; }\n  [data-balloon]:hover:before, [data-balloon]:hover:after, [data-balloon][data-balloon-visible]:before, [data-balloon][data-balloon-visible]:after {\n    filter: alpha(opacity=100);\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";\n    -moz-opacity: 1;\n    -khtml-opacity: 1;\n    opacity: 1;\n    pointer-events: auto; }\n  [data-balloon].font-awesome:after {\n    font-family: FontAwesome; }\n  [data-balloon][data-balloon-break]:after {\n    white-space: pre; }\n  [data-balloon][data-balloon-blunt]:before, [data-balloon][data-balloon-blunt]:after {\n    transition: none; }\n  [data-balloon]:after {\n    bottom: 100%;\n    left: 50%;\n    margin-bottom: 11px;\n    -webkit-transform: translate(-50%, 10px);\n    transform: translate(-50%, 10px);\n    -webkit-transform-origin: top;\n    transform-origin: top; }\n  [data-balloon]:before {\n    bottom: 100%;\n    left: 50%;\n    margin-bottom: 5px;\n    -webkit-transform: translate(-50%, 10px);\n    transform: translate(-50%, 10px);\n    -webkit-transform-origin: top;\n    transform-origin: top; }\n  [data-balloon]:hover:after, [data-balloon][data-balloon-visible]:after {\n    -webkit-transform: translate(-50%, 0);\n    transform: translate(-50%, 0); }\n  [data-balloon]:hover:before, [data-balloon][data-balloon-visible]:before {\n    -webkit-transform: translate(-50%, 0);\n    transform: translate(-50%, 0); }\n  [data-balloon][data-balloon-length='small']:after {\n    white-space: normal;\n    width: 80px; }\n  [data-balloon][data-balloon-length='medium']:after {\n    white-space: normal;\n    width: 150px; }\n  [data-balloon][data-balloon-length='fit']:after {\n    white-space: normal;\n    width: 100%; }\n");
  We('\n.qplayer[data-device="mobile"] [data-balloon]:after {\n    display: none !important;\n  }\n  .qplayer[data-device="mobile"] [data-balloon]:before {\n    display: none !important;\n  }\n  .qplayer[data-device="mobile"] .qplayer-volumewrapper {\n    display: none;\n  }\n  .qplayer[data-device="mobile"] .qplayer-settings {\n    width: 100% !important;\n    height: 100% !important;\n    top: 0;\n    left: 0;\n    background: rgba(0, 0, 0, .5);\n  }\n  .qplayer[data-device="mobile"] .qplayer-setting-close {\n    position: absolute;\n    right: 8px;\n    top: 8px;\n    display: block !important;\n  }\n  .qplayer[data-device="mobile"] .qplayer-setting-tab {\n    height: 100% !important;\n    background: none;\n    -webkit-transform: translateX(100%) !important;\n            transform: translateX(100%) !important\n  }\n  .qplayer[data-device="mobile"] .qplayer-setting-tab.qplayer-main-setting {\n      -webkit-transform: translateX(-100%) !important;\n              transform: translateX(-100%) !important;\n    }\n  .qplayer[data-device="mobile"] .qplayer-setting-tab.qplayer-active {\n      -webkit-transform: translateX(0) !important;\n              transform: translateX(0) !important;\n    }\n  .qplayer[data-device="mobile"] .qplayer-setting-header {\n    display: block !important;\n    width: 100%;\n    color: #fff;\n    font-size: 16px;\n    padding: 8px;\n    border-bottom: 1px solid #fff;\n  }\n  .qplayer[data-device="mobile"] .qplayer-subsetting {\n    height: 100%;\n    width: 100%;\n    padding: 0 !important;\n    display: flex;\n    flex-direction: column;\n  }\n  .qplayer[data-device="mobile"] .qplayer-subsetting button {\n      position: absolute;\n      right: 8px;\n      top: 8px;\n    }\n  .qplayer[data-device="mobile"] .qplayer-setting-list {\n    flex: 1;\n    overflow: auto;\n  }\n  .qplayer[data-device="mobile"] .qplayer-setting-listitem {\n    padding: 8px !important;\n  }\n');
  We(".qplayer-barwrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n}\n\n.qplayer-bar{\n  width: 100%;\n  margin: auto;\n  height: 8px;\n}\n\n.qplayer-barcurr, .qplayer-barbuff {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n}\n\n.qplayer-barbuff {\n}\n\n.qplayer-indicator {\n  position: absolute;\n  top: -10px;\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n}\n\n.qplayer-timetooltip {\n  width: 10px;\n  height: 100%;\n  position: absolute !important;\n  z-index: 1;\n}\n");
  var Ke = function (e) {
    function t() {
      var r = null !== e && e.apply(this, arguments) || this;
      return r.state = {
        buffered: void 0,
        timeTooltipPos: 0,
        timeTooltipText: "0:00"
      }, r.handleProgress = function (e) {
        r.setState({
          buffered: e
        })
      }, r.handleMouseUp = function (e) {
        var t = r.getCurrentTimeFromMouseEvent(e);
        r.props.player.seek(t)
      }, r.handleRef = function (e) {
        e !== r.bar && (r.bar = e)
      }, r.handleHoverTooltips = function (e) {
        if (0 === r.props.totalTime) return 0;
        var t = r.getCurrentTimeFromMouseEvent(e);
        r.setState({
          timeTooltipText: $e(t),
          timeTooltipPos: 100 * t / r.props.totalTime
        })
      }, r
    }
    return Ve(t, e), t.prototype.componentDidMount = function () {
      this.props.player.on("progress", this.handleProgress)
    }, t.prototype.getCurrentPersent = function () {
      return 0 === this.props.totalTime ? 0 : this.props.currentTime / this.props.totalTime
    }, t.prototype.getCurrentTimeFromMouseEvent = function (e) {
      if (!this.bar) return 0;
      var t = this.bar.clientWidth;
      return this.props.totalTime * (e.pageX - this.bar.getBoundingClientRect().left) / t
    }, t.prototype.getBufferBars = function () {
      if (!this.state.buffered || 0 === this.props.totalTime) return [];
      for (var e = [], t = 0; t < this.state.buffered.length; t += 1) {
        var r = this.state.buffered.start(t),
          n = this.state.buffered.end(t);
        e.push({
          left: r / this.props.totalTime * 100,
          width: (n - r) / this.props.totalTime * 100
        })
      }
      return e
    }, t.prototype.render = function () {
      var e = 100 * this.getCurrentPersent(),
        t = this.getBufferBars(),
        r = this.props.player.config.defaultViewConfig;
      return pe("div", {
        onClick: this.handleMouseUp,
        onMouseMove: this.handleHoverTooltips,
        ref: this.handleRef,
        style: "background: " + r.playerBarBackground,
        className: "qplayer-bar"
      }, t.map(function (e, t) {
        return pe("div", {
          className: "qplayer-barbuff",
          key: t,
          style: "background: " + r.playerBarBufferedBackground + "; width: " + e.width + "%; left: " + e.left + "%"
        })
      }), pe("div", {
        className: "qplayer-barcurr",
        style: "background: " + r.playerBarPlayedBackground + "; width: " + e + "%"
      }), pe("div", {
        style: {
          left: this.state.timeTooltipPos + "%"
        },
        className: "qplayer-timetooltip",
        "data-balloon": this.state.timeTooltipText
      }))
    }, t
  }(qe);
  We(".qplayer-volume_sliderwrapper {\n  cursor: pointer;\n  position: relative;\n  height: 70px;\n}\n\n.qplayer-volume_slider, .qplayer-volume_slider_active {\n  height: 100%;\n  width: 4px;\n  border-radius: 4px;\n  background: rgba(255, 255, 255, .5);\n  position: absolute;\n  bottom: 0;\n  left: calc(50% - 2px);\n}\n\n.qplayer-volume_slider_active {\n  background: rgba(255, 255, 255, .9);\n  height: 50%;\n}\n\n.qplayer-volume_thumb {\n  width: 14px;\n  height: 14px;\n  border-radius: 50%;\n  background: #fafafa;\n  position: absolute;\n  left: calc(50% - 7px);\n  -webkit-transform: scale(1);\n          transform: scale(1);\n  transition: -webkit-transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), -webkit-transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  z-index: 3\n}\n\n.qplayer-volume_thumb:hover {\n    -webkit-transform-origin: center;\n            transform-origin: center;\n    -webkit-transform: scale(1.3);\n            transform: scale(1.3);\n  }");
  var Ye = function (e) {
    function t() {
      var r = null !== e && e.apply(this, arguments) || this;
      return r.handleMouseDown = function (e) {
        window.document.addEventListener("mousemove", r.handleMouseMove), window.document.addEventListener("mouseup", r.handleMouseUp)
      }, r.handleMouseMove = function (e) {
        var t = r.updateValueFromMouseEvent(e);
        t < 0 || r.props.onChange(t)
      }, r.handleMouseUp = function (e) {
        var t = r.updateValueFromMouseEvent(e);
        t < 0 || (r.props.onChange(t), window.document.removeEventListener("mousemove", r.handleMouseMove), window.document.removeEventListener("mouseup", r.handleMouseUp))
      }, r.handleRef = function (e) {
        e !== r.wrapper && (r.wrapper = e)
      }, r
    }
    return Ve(t, e), t.prototype.updateValueFromMouseEvent = function (e) {
      if (!this.wrapper) return -1;
      var t = this.wrapper.clientHeight,
        r = (this.wrapper.getBoundingClientRect().bottom - e.pageY) / t;
      return r = Math.min(r, this.props.maxValue), r = Math.max(r, this.props.minValue)
    }, t.prototype.render = function () {
      return pe("div", {
        ref: this.handleRef,
        className: "qplayer-volume_sliderwrapper",
        onMouseDown: this.handleMouseDown
      }, pe("div", {
        className: "qplayer-volume_slider"
      }), pe("div", {
        style: {
          bottom: "calc(" + 100 * this.props.value + "% - 7px)"
        },
        className: "qplayer-volume_thumb"
      }), pe("div", {
        style: {
          height: 100 * this.props.value + "%"
        },
        className: "qplayer-volume_slider_active"
      }))
    }, t
  }(qe);
  We(".qplayer-setting-wrapper {\n  width: 100%;\n  height: 100%;\n}\n\n.qplayer-settings {\n  width: 180px;\n  position: absolute;\n  overflow: hidden;\n  bottom: 43px;\n  right: 10px;\n  opacity: 0;\n  z-index: 2;\n  pointer-events: none;\n  transition: opacity ease 0.2s\n}\n\n.qplayer-settings.qplayer-active {\n    opacity: 1;\n    pointer-events: auto;\n  }\n\n.qplayer-settings span {\n    color: #fff;\n  }\n\n.qplayer-setting-close {\n  display: none;\n}\n\n.qplayer-setting-tab {\n  border-radius: 4px;\n  width: 100%;\n  background: rgba(0, 0, 0, .7);\n  padding: 4px 0;\n  position: absolute;\n  transition: -webkit-transform ease 0.2s;\n  transition: transform ease 0.2s;\n  transition: transform ease 0.2s, -webkit-transform ease 0.2s;\n  bottom: 0;\n  left: 0;\n  -webkit-transform: translateX(180px);\n          transform: translateX(180px)\n}\n\n.qplayer-setting-tab.qplayer-main-setting {\n    -webkit-transform: translateX(-180px);\n            transform: translateX(-180px);\n  }\n\n.qplayer-setting-tab.qplayer-active {\n    -webkit-transform: translateX(0);\n            transform: translateX(0);\n  }\n\n.qplayer-setting-header {\n  display: none;\n}\n\n.qplayer-setting-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px;\n  cursor: pointer;\n  transition: ease background 0.2s\n}\n\n.qplayer-setting-item:hover {\n    background: rgba(255, 255, 255, .2);\n  }\n\n.qplayer-setting-item-title {\n  color: rgba(255, 255, 255, .8);\n  font-size: 14px;\n\n}\n\n.qplayer-setting-item-value {\n  font-size: 14px;\n  font-weight: bold;\n  color: #fff;\n}\n\n\n.qplayer-subsetting {\n  padding: 4px;\n}\n\n\n.qplayer-subsetting button {\n    margin-left: 2px;\n    cursor: pointer;\n  }\n\n.qplayer-setting-list {\n  list-style: none;\n}\n\n.qplayer-setting-listitem {\n  cursor: pointer;\n  padding: 3px;\n  transition: ease background 0.2s;\n  font-size: 14px;\n\n}\n\n.qplayer-setting-listitem span {\n    color: rgba(255, 255, 255, .7);\n  }\n\n.qplayer-setting-listitem:hover {\n    background: rgba(255, 255, 255, .2);\n  }\n\n.qplayer-setting-listitem .qplayer-active {\n    color: #fff;\n    font-weight: bold;\n  }\n");
  var Ze, Xe, Qe = function (r) {
    function e(e) {
      var t = r.call(this, e) || this;
      return t.handleChangeLoop = function (e) {
        t.props.player.isLoop !== e && (t.props.player.toggleLoop(), t.setState({
          isLoop: e,
          currentSetting: null
        }), t.props.onClose())
      }, t.state = {
        currentQuality: null,
        isAutoQualitySwitch: !1,
        isSupportAutoQualitySwitch: !1,
        qualityList: [],
        currentSpeed: 1,
        currentSetting: null,
        isLoop: !1
      }, t
    }
    return Ve(e, r), e.prototype.componentDidMount = function () {
      var r = this;
      this.props.player.on("get-quality-list", function (e) {
        var t = r.props.player.qualityController;
        e.length <= 1 || r.setState({
          qualityList: e,
          currentQuality: t.currentQuality.quality,
          isAutoQualitySwitch: t.currentQuality.isAuto,
          isSupportAutoQualitySwitch: t.isSupportAutoQualitySwitch
        })
      }), this.props.player.on("quality-switching", function (t) {
        var e = r.props.player.qualityController.qualityList.find(function (e) {
          return e.id === t
        });
        e && (r.state.currentQuality === e || r.state.isAutoQualitySwitch || r.props.player.sendNotification("æ­£åœ¨åˆ‡æ¢åˆ°æ¸…æ™°åº¦ " + r.getQualityName(e, r.state.isAutoQualitySwitch)), r.setState({
          currentQuality: e
        }))
      }), this.props.player.on("quality-switched", function (t) {
        var e = r.state.qualityList.find(function (e) {
          return e.id === t
        });
        e && (r.state.isAutoQualitySwitch || r.props.player.sendNotification("å·²ç»åˆ‡æ¢åˆ°æ¸…æ™°åº¦ " + r.getQualityName(e, r.state.isAutoQualitySwitch)))
      }), this.props.player.on("auto-quality-switch-change", function (e) {
        r.setState({
          isAutoQualitySwitch: e
        })
      }), this.props.player.on("ratechange", function (e) {
        r.setState({
          currentSpeed: e
        })
      })
    }, e.prototype.handleChangeSpeed = function (e) {
      this.props.player.setPlaybackRate(e), this.setState({
        currentSetting: null
      }), this.props.onClose()
    }, e.prototype.handleChangeQuality = function (e) {
      this.setState({
        currentSetting: null
      }), this.props.onClose();
      var t = this.props.player.qualityController;
      if ("auto" === e) {
        if (t.currentQuality.isAuto) return;
        t.toggleAutoQualitySwitch()
      } else t.switchQuality(e)
    }, e.prototype.getQualityName = function (e, t) {
      return t ? "è‡ªåŠ¨ï¼ˆ" + e.name + "ï¼‰" : e.name
    }, e.prototype.render = function () {
      var e, t = this,
        r = "è®¾ç½®";
      switch (this.state.currentSetting) {
        case "speed":
          e = 8, r = "æ’­æ”¾é€Ÿåº¦";
          break;
        case "quality":
          e = this.state.qualityList ? this.state.qualityList.length + 1 : 0, r = "æ¸…æ™°åº¦";
          break;
        case "loop":
          e = 2, r = "å¾ªçŽ¯æ’­æ”¾";
        default:
          e = this.state.qualityList ? 3 : 2
      }
      if (this.props.player.config.isLive && (e -= 2), !e) return null;
      var n = this.props.player.config.defaultViewConfig;
      return pe("div", {
        style: {
          height: 45 + 26 * e
        },
        onMouseLeave: this.props.onClose,
        ref: function (e) {
          return t.element = e
        },
        className: ze({
          "qplayer-settings": !0,
          "qplayer-active": this.props.show
        })
      }, pe("div", {
        className: ze({
          "qplayer-setting-tab": !0,
          "qplayer-active": null === this.state.currentSetting,
          "qplayer-main-setting": !0
        })
      }, pe("div", {
        className: "qplayer-setting-header"
      }, r), pe("button", {
        className: "qplayer-setting-close",
        onClick: this.props.onClose
      }, pe("img", {
        src: n.closeIcon
      })), this.state.currentQuality && pe("div", {
        onClick: function () {
          return t.setState({
            currentSetting: "quality"
          })
        },
        className: "qplayer-setting-item"
      }, pe("span", {
        className: "qplayer-setting-item-title"
      }, "æ¸…æ™°åº¦"), pe("span", {
        className: "qplayer-setting-item-value"
      }, this.getQualityName(this.state.currentQuality, this.state.isAutoQualitySwitch))), pe("div", {
        className: "qplayer-setting-item",
        onClick: function () {
          return t.setState({
            currentSetting: "speed"
          })
        }
      }, pe("span", {
        className: "qplayer-setting-item-title"
      }, "æ’­æ”¾é€Ÿåº¦"), pe("span", {
        className: "qplayer-setting-item-value"
      }, this.state.currentSpeed)), pe("div", {
        className: "qplayer-setting-item",
        onClick: function () {
          return t.setState({
            currentSetting: "loop"
          })
        }
      }, pe("span", {
        className: "qplayer-setting-item-title"
      }, "å¾ªçŽ¯æ’­æ”¾"), pe("span", {
        className: "qplayer-setting-item-value"
      }, this.state.isLoop ? "æ‰“å¼€" : "å…³é—­"))), pe("div", {
        className: ze({
          "qplayer-setting-tab": !0,
          "qplayer-active": null !== this.state.currentSetting
        })
      }, this.renderSubSetting(r)))
    }, e.prototype.renderSubSetting = function (e) {
      var t = this,
        r = this.props.player.config.defaultViewConfig;
      switch (this.state.currentSetting) {
        case "quality":
          var n = this.state.currentQuality;
          return pe("div", {
            className: "qplayer-subsetting"
          }, pe("div", {
            className: "qplayer-setting-header"
          }, e), pe("button", {
            onClick: function () {
              return t.setState({
                currentSetting: null
              })
            }
          }, pe("img", {
            src: r.backIcon
          })), pe("ul", {
            className: "qplayer-setting-list"
          }, this.state.isSupportAutoQualitySwitch && pe("li", {
            className: "qplayer-setting-listitem",
            key: "auto",
            onClick: function () {
              return t.handleChangeQuality("auto")
            }
          }, pe("span", {
            className: this.state.isAutoQualitySwitch ? "qplayer-active" : void 0
          }, " ", "è‡ªåŠ¨ï¼ˆ" + n.name + "ï¼‰", " ")), this.state.qualityList.map(function (e) {
            return pe("li", {
              className: "qplayer-setting-listitem",
              key: e.id,
              onClick: function () {
                return t.handleChangeQuality(e.id)
              }
            }, pe("span", {
              className: n.id !== e.id || t.state.isAutoQualitySwitch ? void 0 : "qplayer-active"
            }, " ", e.name, " "))
          })));
        case "speed":
          return pe("div", {
            className: "qplayer-subsetting"
          }, pe("div", {
            className: "qplayer-setting-header"
          }, e), pe("button", {
            onClick: function () {
              return t.setState({
                currentSetting: null
              })
            }
          }, pe("img", {
            src: r.backIcon
          })), pe("ul", {
            className: "qplayer-setting-list"
          }, [.25, .5, .75, 1, 1.25, 1.5, 1.75, 2].map(function (e) {
            return pe("li", {
              className: "qplayer-setting-listitem",
              key: e,
              onClick: function () {
                return t.handleChangeSpeed(e)
              }
            }, pe("span", {
              className: t.state.currentSpeed === e ? "qplayer-active" : void 0
            }, " ", e, " "))
          })));
        case "loop":
          return pe("div", {
            className: "qplayer-subsetting"
          }, pe("div", {
            className: "qplayer-setting-header"
          }, e), pe("button", {
            onClick: function () {
              return t.setState({
                currentSetting: null
              })
            }
          }, pe("img", {
            src: r.backIcon
          })), pe("ul", {
            className: "qplayer-setting-list"
          }, pe("li", {
            className: "qplayer-setting-listitem",
            onClick: function () {
              return t.handleChangeLoop(!0)
            }
          }, pe("span", null, "æ‰“å¼€")), pe("li", {
            className: "qplayer-setting-listitem",
            onClick: function () {
              return t.handleChangeLoop(!1)
            }
          }, pe("span", null, "å…³é—­"))))
      }
      return null
    }, e
  }(qe);
  (Xe = Ze || (Ze = {})).VOLUME_CONTROL = "volume", Xe.SEEK_CONTROL = "seek";
  var Je = function (t) {
    function e(e) {
      var s = t.call(this) || this;
      return s.touchStartX = 0, s.touchStartY = 0, s.touchStartVolume = 0, s.handleFullscreenChange = function (e) {
        s.setState({
          isFullscreen: e
        })
      }, s.handleVolumeChange = function (e, t) {
        s.setState({
          isMuted: t,
          volume: e
        })
      }, s.handlePlay = function () {
        s.props.player.play()
      }, s.handlePause = function () {
        s.props.player.pause()
      }, s.handleToggleFullscreen = function () {
        s.props.player.toggleFullscreen()
      }, s.handleToggleMute = function () {
        s.props.player.toggleMute()
      }, s.handleToggleSettings = function () {
        s.setState({
          showSettings: !s.state.showSettings
        })
      }, s.handleCloseSettings = function () {
        s.setState({
          showSettings: !1
        })
      }, s.handleSetVolume = function (e) {
        s.props.player.setVolume(e)
      }, s.handleGesture = function (e, t) {
        var r = e.touches.item(0);
        switch (t) {
          case "start":
            s.touchStartX = r.clientX, s.touchStartY = r.clientY;
            break;
          case "move":
            e.preventDefault();
            var n = r.clientX - s.touchStartX,
              i = r.clientY - s.touchStartY;
            if (s.touchX || s.touchY) switch (s.state.gestureType) {
                case Ze.SEEK_CONTROL:
                  s.setState({
                    gestureSeekTime: .3 * n
                  });
                  break;
                case Ze.VOLUME_CONTROL:
                  var a = s.touchStartVolume - .01 * i;
                  s.setState({
                    gestureVolume: Math.max(0, Math.min(1, a))
                  }), s.props.player.setVolume(s.state.gestureVolume)
              } else if (Math.abs(n) > Math.abs(i)) s.setState({
                gestureType: Ze.SEEK_CONTROL,
                gestureSeekTime: 0
              });
              else {
                if (/iPad|iPhone|iPod/.test(navigator.userAgent)) break;
                s.setState({
                  gestureType: Ze.VOLUME_CONTROL,
                  gestureVolume: s.props.player.volume
                }), s.touchStartVolume = s.props.player.volume
              } s.touchX = r.clientX, s.touchY = r.clientY;
            break;
          case "end":
            switch (s.touchX = void 0, s.touchY = void 0, s.state.gestureType) {
              case Ze.SEEK_CONTROL:
                var o = s.props.player.currentTime + s.state.gestureSeekTime;
                s.props.player.seek(Math.min(s.props.player.totalTime, Math.max(0, o)))
            }
            s.setState({
              gestureType: void 0
            })
        }
      }, s.state = {
        isFullscreen: !1,
        showSettings: !1,
        isMuted: e.player.isMuted,
        volume: e.player.volume,
        showControlBtn: !e.player.config.isLive,
        gestureSeekTime: 0,
        gestureVolume: 0
      }, s
    }
    return Ve(e, t), e.prototype.componentDidMount = function () {
      var t = this;
      this.props.player.on("fullscreenchange", this.handleFullscreenChange), this.props.player.on("volumechange", this.handleVolumeChange), this.props.player.on("get-quality-list", function (e) {
        1 < e.length && !t.state.showControlBtn && t.setState({
          showControlBtn: !0
        })
      })
    }, e.prototype.componentWillReceiveProps = function (e) {
      !e.show && this.props.show && this.handleCloseSettings()
    }, e.prototype.render = function () {
      var t = this,
        e = this.props.player.config.defaultViewConfig;
      return pe("div", {
        className: "qplayer-controlswrapper"
      }, pe("button", {
        onClick: this.props.showPlay ? this.handlePlay : this.handlePause,
        className: ze({
          "qplayer-center-btn": !0,
          "qplayer-active": this.props.show && !this.state.showSettings
        })
      }, pe("img", {
        src: this.props.showPlay ? e.playIcon : e.pauseIcon
      })), pe("div", {
        onMouseLeave: this.props.onNotKeepControls,
        onMouseEnter: this.props.onKeepControls,
        className: ze({
          "qplayer-controls": !0,
          "qplayer-active": this.props.show || this.state.showSettings
        })
      }, !this.props.isLive && pe("div", {
        className: "qplayer-barwrapper"
      }, pe(Ke, {
        player: this.props.player,
        currentTime: this.props.currentTime,
        totalTime: this.props.totalTime
      })), pe("div", {
        className: "qplayer-controlbtns"
      }, pe("div", {
        className: "qplayer-playbtn"
      }, pe("button", {
        "data-balloon": "æ’­æ”¾",
        onClick: this.handlePlay,
        className: ze({
          "qplayer-active": this.props.showPlay,
          "qplayer-play": !0
        })
      }, pe("img", {
        src: e.playIcon
      })), pe("button", {
        "data-balloon": "æš‚åœ",
        onClick: this.handlePause,
        className: ze({
          "qplayer-active": this.props.showPause,
          "qplayer-pause": !0
        })
      }, pe("img", {
        src: e.pauseIcon
      }))), !this.props.isLive && pe("p", {
        className: "qplayer-time"
      }, pe("span", {
        className: "qplayer-currtime"
      }, $e(this.props.currentTime)), "/", pe("span", {
        className: "qplayer-totaltime"
      }, $e(this.props.totalTime))), pe("div", {
        className: "qplayer-blank"
      }), pe("div", {
        className: "qplayer-controller-slot"
      }), pe("div", {
        className: "qplayer-volumewrapper"
      }, pe("div", {
        className: "qplayer-volume",
        onMouseEnter: this.handleCloseSettings
      }, pe("div", {
        className: "qplayer-sidewrapper"
      }, pe("div", {
        className: "qplayer-volume_side"
      }, pe("p", {
        className: "qplayer-volume_value"
      }, (100 * this.state.volume).toFixed(0)), pe(Ye, {
        maxValue: 1,
        minValue: 0,
        value: this.state.volume,
        onChange: this.handleSetVolume
      }))), pe("button", {
        onClick: this.handleToggleMute,
        className: "qplayer-volumebtn"
      }, this.state.isMuted ? pe("img", {
        src: e.volumeOffIcon
      }) : pe("img", {
        src: e.volumeIcon
      })))), this.state.showControlBtn && pe("button", {
        className: "qplayer-control-btn qplayer-settings-btn",
        onClick: this.handleToggleSettings
      }, pe("img", {
        src: e.settingsIcon
      })), pe("button", {
        "data-balloon": this.state.isFullscreen ? "é€€å‡ºå…¨å±" : "å…¨å±",
        className: "qplayer-fullscreen",
        onClick: this.handleToggleFullscreen
      }, this.state.isFullscreen ? pe("img", {
        src: e.fullscreenExitIcon
      }) : pe("img", {
        src: e.fullscreenIcon
      })))), this.props.isMobile && pe("div", {
        onTouchStart: function (e) {
          return t.handleGesture(e, "start")
        },
        onTouchMove: function (e) {
          return t.handleGesture(e, "move")
        },
        onTouchEnd: function (e) {
          return t.handleGesture(e, "end")
        },
        className: "qplayer-gesture-wrapper"
      }, this.state.gestureType === Ze.VOLUME_CONTROL && pe("div", {
        className: "qplayer-gesture-tips"
      }, pe("img", {
        src: e.volumeIcon
      }), pe("div", {
        className: "qplayer-gesture-volume-wrapper"
      }, pe("div", {
        className: "qplayer-gesture-volume-current",
        style: {
          width: 100 * this.state.gestureVolume + "%"
        }
      }))), this.state.gestureType === Ze.SEEK_CONTROL && pe("div", {
        className: "qplayer-gesture-tips"
      }, pe("p", {
        className: "qplayer-gesture-seek-text"
      }, pe("span", null, this.state.gestureSeekTime < 0 ? "-" : "+"), Math.abs(this.state.gestureSeekTime).toFixed(1), pe("span", null, "s")))), pe(Qe, {
        show: this.state.showSettings,
        onClose: this.handleCloseSettings,
        player: this.props.player
      }))
    }, e
  }(qe);

  function $e(e) {
    if (e <= 0) return "0:00";
    var t = Math.floor(e / 60),
      r = Math.round(e - 60 * t);
    return t.toString() + ":" + r.toString().padStart(2, "0")
  }
  We(".sk-fading-circle {\n  position: relative;\n}\n\n.sk-fading-circle .sk-circle {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.sk-fading-circle .sk-circle:before {\n  content: '';\n  display: block;\n  margin: 0 auto;\n  width: 15%;\n  height: 15%;\n  background-color: #333;\n  border-radius: 100%;\n  -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\n          animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\n}\n.sk-fading-circle .sk-circle2 {\n  -webkit-transform: rotate(30deg);\n          transform: rotate(30deg);\n}\n.sk-fading-circle .sk-circle3 {\n  -webkit-transform: rotate(60deg);\n          transform: rotate(60deg);\n}\n.sk-fading-circle .sk-circle4 {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n.sk-fading-circle .sk-circle5 {\n  -webkit-transform: rotate(120deg);\n          transform: rotate(120deg);\n}\n.sk-fading-circle .sk-circle6 {\n  -webkit-transform: rotate(150deg);\n          transform: rotate(150deg);\n}\n.sk-fading-circle .sk-circle7 {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n.sk-fading-circle .sk-circle8 {\n  -webkit-transform: rotate(210deg);\n          transform: rotate(210deg);\n}\n.sk-fading-circle .sk-circle9 {\n  -webkit-transform: rotate(240deg);\n          transform: rotate(240deg);\n}\n.sk-fading-circle .sk-circle10 {\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n.sk-fading-circle .sk-circle11 {\n  -webkit-transform: rotate(300deg);\n          transform: rotate(300deg); \n}\n.sk-fading-circle .sk-circle12 {\n  -webkit-transform: rotate(330deg);\n          transform: rotate(330deg); \n}\n.sk-fading-circle .sk-circle2:before {\n  -webkit-animation-delay: -1.1s;\n          animation-delay: -1.1s; \n}\n.sk-fading-circle .sk-circle3:before {\n  -webkit-animation-delay: -1s;\n          animation-delay: -1s; \n}\n.sk-fading-circle .sk-circle4:before {\n  -webkit-animation-delay: -0.9s;\n          animation-delay: -0.9s; \n}\n.sk-fading-circle .sk-circle5:before {\n  -webkit-animation-delay: -0.8s;\n          animation-delay: -0.8s; \n}\n.sk-fading-circle .sk-circle6:before {\n  -webkit-animation-delay: -0.7s;\n          animation-delay: -0.7s; \n}\n.sk-fading-circle .sk-circle7:before {\n  -webkit-animation-delay: -0.6s;\n          animation-delay: -0.6s; \n}\n.sk-fading-circle .sk-circle8:before {\n  -webkit-animation-delay: -0.5s;\n          animation-delay: -0.5s; \n}\n.sk-fading-circle .sk-circle9:before {\n  -webkit-animation-delay: -0.4s;\n          animation-delay: -0.4s;\n}\n.sk-fading-circle .sk-circle10:before {\n  -webkit-animation-delay: -0.3s;\n          animation-delay: -0.3s;\n}\n.sk-fading-circle .sk-circle11:before {\n  -webkit-animation-delay: -0.2s;\n          animation-delay: -0.2s;\n}\n.sk-fading-circle .sk-circle12:before {\n  -webkit-animation-delay: -0.1s;\n          animation-delay: -0.1s;\n}\n\n@-webkit-keyframes sk-circleFadeDelay {\n  0%, 39%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n}\n\n@keyframes sk-circleFadeDelay {\n  0%, 39%, 100% { opacity: 0; }\n  40% { opacity: 1; } \n}");
  var et = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this
    }
    return Ve(t, e), t.prototype.render = function () {
      return pe("div", {
        class: "sk-fading-circle",
        style: {
          width: this.props.width || 40,
          height: this.props.height || 40,
          margin: this.props.margin
        }
      }, pe("div", {
        class: "sk-circle1 sk-circle"
      }), pe("div", {
        class: "sk-circle2 sk-circle"
      }), pe("div", {
        class: "sk-circle3 sk-circle"
      }), pe("div", {
        class: "sk-circle4 sk-circle"
      }), pe("div", {
        class: "sk-circle5 sk-circle"
      }), pe("div", {
        class: "sk-circle6 sk-circle"
      }), pe("div", {
        class: "sk-circle7 sk-circle"
      }), pe("div", {
        class: "sk-circle8 sk-circle"
      }), pe("div", {
        class: "sk-circle9 sk-circle"
      }), pe("div", {
        class: "sk-circle10 sk-circle"
      }), pe("div", {
        class: "sk-circle11 sk-circle"
      }), pe("div", {
        class: "sk-circle12 sk-circle"
      }))
    }, t
  }(qe);
  We(".qplayer-toast {\n  background: rgba(0, 0, 0, .7);\n  border-radius: 4px;\n  padding: 8px;\n  max-width: 300px;\n  display: flex;\n  align-items: center;\n  z-index: 3;\n  -webkit-transform: translateY(30px);\n          transform: translateY(30px);\n  opacity: 0;\n  pointer-events: none;\n  transition: all ease 0.2s;\n  position: absolute;\n  bottom: 50px;\n  left: 10px\n}\n\n.qplayer-toast.qplayer-active {\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n    opacity: 1;\n    pointer-events: auto;\n  }\n\n.qplayer-toast-content {\n  font-size: 13px;\n  color: #fff;\n  word-break: break-all;\n}\n");
  var tt = function (e) {
      function t() {
        return null !== e && e.apply(this, arguments) || this
      }
      return Ve(t, e), t.prototype.render = function () {
        return pe("div", {
          className: ze({
            "qplayer-toast": !0,
            "qplayer-active": this.props.show
          })
        }, pe("p", {
          className: "qplayer-toast-content"
        }, this.props.message))
      }, t
    }(qe),
    rt = function (e) {
      function t() {
        var r = null !== e && e.apply(this, arguments) || this;
        return r.state = {
          isPlay: !1,
          isPause: !1,
          isCanplay: !1,
          isLoading: !1,
          currentTime: 0,
          totalTime: 0,
          bufferStart: 0,
          bufferEnd: 0,
          showControls: !0,
          currentToastMessage: void 0,
          showToast: !1
        }, r.isCloseControlsTimeoutCancel = !1, r.handleError = function (e) {
          switch (r.setState({
            showToast: !1
          }), e.code) {
            case 10001:
              r.setState({
                errorMessage: "æ— æ³•æ”¯æŒçš„åª’ä½“æ ¼å¼ï¼Œæ‚¨çš„æµè§ˆå™¨å¯èƒ½ä¸æ”¯æŒæ­¤è§†é¢‘æº"
              });
              break;
            case 10002:
              r.setState({
                errorMessage: "æ— æ³•åŠ è½½è§†é¢‘æºï¼Œè¯·æ£€æŸ¥è§†é¢‘åœ°å€å’Œæ‚¨çš„ç½‘ç»œé…ç½®"
              });
              break;
            case 10007:
              r.setState({
                errorMessage: "é…ç½®æ ¼å¼ä¸æ­£ç¡®"
              });
              break;
            case 10006:
              r.props.player.sendNotification("è‡ªåŠ¨æ’­æ”¾å¤±è´¥ï¼Œè¯·æ‰‹åŠ¨ç‚¹å‡»æ’­æ”¾æŒ‰é’®");
              break;
            case 10008:
              r.setState({
                errorMessage: "æœªçŸ¥é”™è¯¯"
              })
          }
        }, r.handlePlay = function () {
          r.setState({
            isPlay: !0,
            isPause: !1
          })
        }, r.handlePause = function () {
          r.setState({
            isPause: !0,
            isPlay: !1
          })
        }, r.handleCanplay = function (e) {
          r.setState({
            isCanplay: !0,
            totalTime: e,
            showToast: !1
          })
        }, r.handlePlaying = function (e, t) {
          r.setState({
            currentTime: e,
            totalTime: t
          })
        }, r.handleLoading = function (e) {
          r.setState({
            isLoading: e
          })
        }, r.handleNotification = function (e) {
          r.notificationTimeout && window.clearTimeout(r.notificationTimeout), e.message ? (r.setState({
            currentToastMessage: e.message,
            showToast: !0
          }), e.timeout < 0 || (r.notificationTimeout = window.setTimeout(function () {
            r.notificationTimeout = void 0, r.setState({
              showToast: !1
            })
          }, e.timeout))) : r.setState({
            showToast: !1
          })
        }, r.handleVideoRef = function (e) {
          e !== r.video && (r.video = e)
        }, r.handleContainerRef = function (e) {
          e !== r.container && (r.container = e)
        }, r.handleCloseControls = function () {
          r.closeControlsTimeout && (window.clearTimeout(r.closeControlsTimeout), r.closeControlsTimeout = void 0), r.setState({
            showControls: !1
          })
        }, r.handleShowControls = function () {
          if (r.setState({
              showControls: !0
            }), !r.isCloseControlsTimeoutCancel) {
            r.closeControlsTimeout && (window.clearTimeout(r.closeControlsTimeout), r.closeControlsTimeout = void 0);
            var e = r.props.player.config.defaultViewConfig;
            r.closeControlsTimeout = window.setTimeout(r.handleCloseControls, e.inactiveTimeout)
          }
        }, r.handleCancelCloseTimeout = function () {
          r.isCloseControlsTimeoutCancel = !0, r.closeControlsTimeout && (window.clearTimeout(r.closeControlsTimeout), r.closeControlsTimeout = void 0)
        }, r.handleStartCloseTimeout = function () {
          r.isCloseControlsTimeoutCancel = !1;
          var e = r.props.player.config.defaultViewConfig;
          r.closeControlsTimeout = window.setTimeout(r.handleCloseControls, e.inactiveTimeout)
        }, r
      }
      return Ve(t, e), t.prototype.componentDidMount = function () {
        this.props.player.on("play", this.handlePlay), this.props.player.on("pause", this.handlePause), this.props.player.on("ready", this.handleCanplay), this.props.player.on("loading", this.handleLoading), this.props.player.on("timeupdate", this.handlePlaying), this.props.player.on("notification", this.handleNotification), this.props.player.on("error", this.handleError), this.closeControlsTimeout = window.setTimeout(this.handleCloseControls, this.props.player.config.defaultViewConfig.inactiveTimeout), this.props.player.sendNotification("æ­£åœ¨åŠ è½½è§†é¢‘æº...", -1), this.container && this.container.addEventListener("contextmenu", function (e) {
          e.preventDefault()
        }, !0)
      }, t.prototype.render = function () {
        var e = this.props.player.config.defaultViewConfig;
        return pe("div", {
          ref: this.handleContainerRef,
          className: "qplayer",
          "data-device": this.props.isMobile ? "mobile" : "desktop"
        }, pe("div", {
          onMouseMove: this.handleShowControls,
          onMouseEnter: this.handleShowControls,
          onMouseLeave: this.handleCloseControls,
          className: ze({
            "qplayer-wrapper": !0
          })
        }, pe("div", {
          className: ze({
            "qplayer-error": !0,
            "qplayer-active": this.state.errorMessage
          })
        }, pe("p", {
          className: "qplayer-error-title"
        }, "é”™è¯¯"), pe("p", {
          className: "qplayer-error-content"
        }, this.state.errorMessage)), !this.props.isNoControl && pe("div", {
          className: ze({
            "qplayer-loading": !0,
            "qplayer-active": this.state.isLoading
          })
        }, pe(et, {
          margin: 0
        })), pe("div", {
          className: "qplayer-video",
          ref: this.handleVideoRef
        }), !this.props.isNoControl && pe(Je, {
          isLive: !!this.props.player.config.isLive,
          show: e.showControls || this.state.showControls && !this.state.errorMessage,
          onKeepControls: this.handleCancelCloseTimeout,
          onNotKeepControls: this.handleStartCloseTimeout,
          onShow: this.handleShowControls,
          onClose: this.handleCloseControls,
          player: this.props.player,
          showPlay: !this.state.isPlay,
          showPause: this.state.isPlay,
          currentTime: this.state.currentTime,
          totalTime: this.state.totalTime,
          isMobile: this.props.isMobile
        }), pe(tt, {
          show: !this.state.errorMessage && this.state.showToast,
          message: this.state.currentToastMessage
        })))
      }, t
    }(qe),
    nt = new(function () {
      function e() {
        var t = this;
        this.isNoControl = !1, this.handleRef = function (e) {
          e && e !== t.component && (t.component = e)
        }
      }
      return e.prototype.init = function (e, t) {
        this.player = e, this.isNoControl = t || this.player.config.defaultViewConfig.noControls;
        var r = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        Ge(pe(rt, {
          isNoControl: this.isNoControl,
          player: this.player,
          ref: this.handleRef,
          isMobile: r
        }), this.player.config.container)
      }, e.prototype.getVideoElementSlot = function () {
        return this.component.video
      }, e.prototype.getContainerElementSlot = function () {
        return this.isNoControl ? this.component.video : this.component.container
      }, e.prototype.destroy = function () {
        Ge(pe(function () {
          return null
        }, null), this.player.config.container, this.component.container)
      }, e
    }()),
    it = {
      url: "",
      container: document.body,
      autoplay: !1,
      muted: !1,
      volume: 1,
      view: nt,
      loggerLevel: 1,
      defaultViewConfig: {
        playIcon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNOCA1djE0bDExLTd6IiBmaWxsPSIjZmZmZmZmIi8+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==",
        pauseIcon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNiAxOWg0VjVINnYxNHptOC0xNHYxNGg0VjVoLTR6IiBmaWxsPSIjZmZmZmZmIi8+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==",
        indicatorIcon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJub25lIiBkPSJNMjQgMjRIMFYwaDI0djI0eiIvPjxjaXJjbGUgZmlsbD0iI2ZmZmZmZiIgY3g9IjEyIiBjeT0iMTIiIHI9IjgiLz48L3N2Zz4=",
        fullscreenIcon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTcgMTRINXY1aDV2LTJIN3YtM3ptLTItNGgyVjdoM1Y1SDV2NXptMTIgN2gtM3YyaDV2LTVoLTJ2M3pNMTQgNXYyaDN2M2gyVjVoLTV6IiBmaWxsPSIjZmZmZmZmIi8+PC9zdmc+",
        fullscreenExitIcon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTUgMTZoM3YzaDJ2LTVINXYyem0zLThINXYyaDVWNUg4djN6bTYgMTFoMnYtM2gzdi0yaC01djV6bTItMTFWNWgtMnY1aDVWOGgtM3oiLz48L3N2Zz4=",
        volumeIcon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMyA5djZoNGw1IDVWNEw3IDlIM3ptMTMuNSAzYzAtMS43Ny0xLjAyLTMuMjktMi41LTQuMDN2OC4wNWMxLjQ4LS43MyAyLjUtMi4yNSAyLjUtNC4wMnpNMTQgMy4yM3YyLjA2YzIuODkuODYgNSAzLjU0IDUgNi43MXMtMi4xMSA1Ljg1LTUgNi43MXYyLjA2YzQuMDEtLjkxIDctNC40OSA3LTguNzdzLTIuOTktNy44Ni03LTguNzd6IiBmaWxsPSIjZmZmZmZmIi8+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==",
        volumeOffIcon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTYuNSAxMmMwLTEuNzctMS4wMi0zLjI5LTIuNS00LjAzdjIuMjFsMi40NSAyLjQ1Yy4wMy0uMi4wNS0uNDEuMDUtLjYzem0yLjUgMGMwIC45NC0uMiAxLjgyLS41NCAyLjY0bDEuNTEgMS41MUMyMC42MyAxNC45MSAyMSAxMy41IDIxIDEyYzAtNC4yOC0yLjk5LTcuODYtNy04Ljc3djIuMDZjMi44OS44NiA1IDMuNTQgNSA2Ljcxek00LjI3IDNMMyA0LjI3IDcuNzMgOUgzdjZoNGw1IDV2LTYuNzNsNC4yNSA0LjI1Yy0uNjcuNTItMS40Mi45My0yLjI1IDEuMTh2Mi4wNmMxLjM4LS4zMSAyLjYzLS45NSAzLjY5LTEuODFMMTkuNzMgMjEgMjEgMTkuNzNsLTktOUw0LjI3IDN6TTEyIDRMOS45MSA2LjA5IDEyIDguMThWNHoiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+",
        settingsIcon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDIwdjIwSDBWMHoiLz48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTUuOTUgMTAuNzhjLjAzLS4yNS4wNS0uNTEuMDUtLjc4cy0uMDItLjUzLS4wNi0uNzhsMS42OS0xLjMyYy4xNS0uMTIuMTktLjM0LjEtLjUxbC0xLjYtMi43N2MtLjEtLjE4LS4zMS0uMjQtLjQ5LS4xOGwtMS45OS44Yy0uNDItLjMyLS44Ni0uNTgtMS4zNS0uNzhMMTIgMi4zNGMtLjAzLS4yLS4yLS4zNC0uNC0uMzRIOC40Yy0uMiAwLS4zNi4xNC0uMzkuMzRsLS4zIDIuMTJjLS40OS4yLS45NC40Ny0xLjM1Ljc4bC0xLjk5LS44Yy0uMTgtLjA3LS4zOSAwLS40OS4xOGwtMS42IDIuNzdjLS4xLjE4LS4wNi4zOS4xLjUxbDEuNjkgMS4zMmMtLjA0LjI1LS4wNy41Mi0uMDcuNzhzLjAyLjUzLjA2Ljc4TDIuMzcgMTIuMWMtLjE1LjEyLS4xOS4zNC0uMS41MWwxLjYgMi43N2MuMS4xOC4zMS4yNC40OS4xOGwxLjk5LS44Yy40Mi4zMi44Ni41OCAxLjM1Ljc4bC4zIDIuMTJjLjA0LjIuMi4zNC40LjM0aDMuMmMuMiAwIC4zNy0uMTQuMzktLjM0bC4zLTIuMTJjLjQ5LS4yLjk0LS40NyAxLjM1LS43OGwxLjk5LjhjLjE4LjA3LjM5IDAgLjQ5LS4xOGwxLjYtMi43N2MuMS0uMTguMDYtLjM5LS4xLS41MWwtMS42Ny0xLjMyek0xMCAxM2MtMS42NSAwLTMtMS4zNS0zLTNzMS4zNS0zIDMtMyAzIDEuMzUgMyAzLTEuMzUgMy0zIDN6Ii8+PC9zdmc+",
        backIcon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTIwIDExSDcuODNsNS41OS01LjU5TDEyIDRsLTggOCA4IDggMS40MS0xLjQxTDcuODMgMTNIMjB2LTJ6Ii8+PC9zdmc+",
        closeIcon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgNi40MUwxNy41OSA1IDEyIDEwLjU5IDYuNDEgNSA1IDYuNDEgMTAuNTkgMTIgNSAxNy41OSA2LjQxIDE5IDEyIDEzLjQxIDE3LjU5IDE5IDE5IDE3LjU5IDEzLjQxIDEyeiIgZmlsbD0iI2ZmZmZmZiIgLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+",
        inactiveTimeout: 2e3,
        playerBarBackground: "rgba(255, 255, 255, .2)",
        playerBarBufferedBackground: "rgba(255, 255, 255, .4)",
        playerBarPlayedBackground: "#fafafa"
      }
    },
    at = function (n) {
      function e(e, t) {
        var r = n.call(this) || this;
        return r.handleFullScreenChange = function () {
          r.emit("fullscreenchange")
        }, r.container = e, r.videoElement = t, document.addEventListener("fullscreenchange", r.handleFullScreenChange), r
      }
      return t(e, n), Object.defineProperty(e.prototype, "isFullScreen", {
        get: function () {
          return !!document.fullscreenElement
        },
        enumerable: !0,
        configurable: !0
      }), e.prototype.fullscreen = function () {
        if (this.container.requestFullscreen) this.container.requestFullscreen();
        else {
          if (!this.videoElement.webkitEnterFullScreen) throw new p(s.COMMON, l.FULLSCRREN_NOTSUPPORT, "not support fullscreen api");
          this.videoElement.webkitEnterFullscreen()
        }
      }, e.prototype.exitFullScreen = function () {
        if (document.exitFullscreen) document.exitFullscreen();
        else {
          if (!this.videoElement.webkitExitFullScreen) throw new p(s.COMMON, l.FULLSCRREN_NOTSUPPORT, "not support fullscreen api");
          this.videoElement.webkitExitFullscreen()
        }
      }, e.prototype.toggle = function () {
        this.isFullScreen ? this.exitFullScreen() : this.fullscreen()
      }, e.prototype.changeContainer = function (e, t) {
        this.container = e, this.videoElement = t
      }, e
    }(b),
    ot = function (r) {
      function e(e) {
        var t = r.call(this) || this;
        return t.eventList = [], t.canplay = !1, t.isPlay = !1, t.isPause = !1, t.isEnd = !1, t.currentTime = 0, t.totalTime = 0, t.playbackRate = 1, t.volume = 100, t._isLoading = !1, t.loadingStateLock = !1, t.config = e, t.isMuted = !!t.config.muted, t.volume = t.config.volume, t
      }
      return t(e, r), Object.defineProperty(e.prototype, "isLoading", {
        get: function () {
          return this._isLoading
        },
        set: function (e) {
          this.loadingStateLock || (this._isLoading !== e && this.emit("#loading", e), this._isLoading = e)
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(e.prototype, "isLoop", {
        get: function () {
          return this.video.loop
        },
        enumerable: !0,
        configurable: !0
      }), e.prototype.setContainer = function (e) {
        this.container = e, this.container.appendChild(this.video)
      }, e.prototype.setLoadingStateLock = function (e) {
        this.loadingStateLock = e
      }, e
    }(b);

  function st(e) {
    Promise.resolve().then(e)
  }
  var lt = r(function (e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i = function (e, t, r) {
      this.name = e, this.version = t, this.os = r
    };
    t.BrowserInfo = i;
    var r = function (e) {
      this.version = e, this.name = "node", this.os = process.platform
    };
    t.NodeInfo = r;
    var o = function () {
      this.bot = !0, this.name = "bot", this.version = null, this.os = null
    };
    t.BotInfo = o;
    var s = 3,
      l = [
        ["aol", /AOLShield\/([0-9\._]+)/],
        ["edge", /Edge\/([0-9\._]+)/],
        ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
        ["vivaldi", /Vivaldi\/([0-9\.]+)/],
        ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
        ["samsung", /SamsungBrowser\/([0-9\.]+)/],
        ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
        ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
        ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
        ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
        ["fxios", /FxiOS\/([0-9\.]+)/],
        ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
        ["opera", /OPR\/([0-9\.]+)(:?\s|$)$/],
        ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
        ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
        ["ie", /MSIE\s(7\.0)/],
        ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
        ["android", /Android\s([0-9\.]+)/],
        ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
        ["safari", /Version\/([0-9\._]+).*Safari/],
        ["facebook", /FBAV\/([0-9\.]+)/],
        ["instagram", /Instagram\s([0-9\.]+)/],
        ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
        ["searchbot", /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/]
      ],
      a = [
        ["iOS", /iP(hone|od|ad)/],
        ["Android OS", /Android/],
        ["BlackBerry OS", /BlackBerry|BB10/],
        ["Windows Mobile", /IEMobile/],
        ["Amazon OS", /Kindle/],
        ["Windows 3.11", /Win16/],
        ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
        ["Windows 98", /(Windows 98)|(Win98)/],
        ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
        ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
        ["Windows Server 2003", /(Windows NT 5.2)/],
        ["Windows Vista", /(Windows NT 6.0)/],
        ["Windows 7", /(Windows NT 6.1)/],
        ["Windows 8", /(Windows NT 6.2)/],
        ["Windows 8.1", /(Windows NT 6.3)/],
        ["Windows 10", /(Windows NT 10.0)/],
        ["Windows ME", /Windows ME/],
        ["Open BSD", /OpenBSD/],
        ["Sun OS", /SunOS/],
        ["Linux", /(Linux)|(X11)/],
        ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
        ["QNX", /QNX/],
        ["BeOS", /BeOS/],
        ["OS/2", /OS\/2/],
        ["Search Bot", /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/]
      ];

    function n(a) {
      var e = "" !== a && l.reduce(function (e, t) {
        var r = t[0],
          n = t[1];
        if (e) return e;
        var i = n.exec(a);
        return !!i && [r, i]
      }, !1);
      if (!e) return null;
      var t = e[0],
        r = e[1];
      if ("searchbot" === t) return new o;
      var n = r[1] && r[1].split(/[._]/).slice(0, 3);
      return n ? n.length < s && (n = n.concat(function (e) {
        for (var t = [], r = 0; r < e; r++) t.push("0");
        return t
      }(s - n.length))) : n = [], new i(t, n.join("."), u(a))
    }

    function u(e) {
      for (var t = 0, r = a.length; t < r; t++) {
        var n = a[t],
          i = n[0];
        if (n[1].test(e)) return i
      }
      return null
    }

    function d() {
      return "undefined" != typeof process && process.version ? new r(process.version.slice(1)) : null
    }
    t.detect = function () {
      return "undefined" != typeof navigator ? n(navigator.userAgent) : d()
    }, t.parseUserAgent = n, t.detectOS = u, t.getNodeVersion = d
  });
  e(lt);
  lt.BrowserInfo, lt.NodeInfo, lt.BotInfo;
  var ut = lt.detect,
    dt = (lt.parseUserAgent, lt.detectOS, lt.getNodeVersion, {
      playsinline: !0
    }),
    ct = function () {
      var e = ut(),
        t = navigator.userAgent;
      t.match(/MQQBrowser/) && (e.name = "qq");
      t.match(/UCBrowser/) && (e.name = "uc");
      return e
    }();
  var ft = function () {
      if (!ct) return dt;
      switch (ct.name) {
        case "ios":
          return {
            playsinline: (e = ct.version, t = e.split("."), 10 < Number(t[0]))
          };
        case "android":
        case "qq":
        case "uc":
        case "ios-webview":
          return {
            playsinline: !1
          }
      }
      var e, t;
      return dt
    }(),
    pt = function (r) {
      function e(e) {
        var t = r.call(this, e) || this;
        return t.playWhenReady = !1, t.videoElementEvents = ["loadedmetadata", "canplay", "play", "playing", "pause", "ended", "waiting", "seeking", "timeupdate", "durationchange", "progress", "seeked", "error", "volumechange", "ratechange"], t.eventList = ["#autoplay-faild", "#play", "#pause", "#ended", "#timeupdate", "#progress", "#loading", "#durationchange", "#seeked", "#volumechange", "#ratechange", "stalled", "canplay"], t.handleVideoElementEvent = function (e) {
          switch (e.type) {
            case "loadedmetadata":
              I.verbose("loadedmetadata"), t.canplay = !0, t.totalTime = t.videoElement.duration, (t.playWhenReady || t.config.autoplay) && t.play(), st(function () {
                return t.emit("canplay", t.totalTime)
              });
              break;
            case "canplay":
              break;
            case "play":
              t.isPlay = !0, t.isPause = !1, t.currentTime = t.videoElement.currentTime, t.emit("#play");
              break;
            case "playing":
              t.isPlay = !0, t.isPause = !1, t.emit("#play");
              break;
            case "pause":
              t.isPause = !0, t.isPlay = !1, t.emit("#pause");
              break;
            case "ended":
              t.isEnd = !0, t.isPause = !1, t.isPlay = !1, t.emit("#ended");
              break;
            case "waiting":
            case "seeking":
              t.isLoading = !0;
              break;
            case "timeupdate":
              if (t.videoElement.currentTime <= t.currentTime) return;
              t.isLoading = !1, t.currentTime = t.videoElement.currentTime, t.totalTime = t.videoElement.duration, t.emit("#timeupdate", t.currentTime, t.totalTime);
              break;
            case "durationchange":
              t.totalTime = t.videoElement.duration, t.emit("#durationchange", t.totalTime);
              break;
            case "progress":
              t.buffered = t.videoElement.buffered, t.emit("#progress", t.videoElement.buffered);
              break;
            case "seeked":
              t.currentTime = t.videoElement.currentTime, t.emit("#seeked", t.isPlay), t.emit("#timeupdate", t.currentTime, t.totalTime), t.isLoading = !1, t.isPlay && t.play();
              break;
            case "error":
              I.warning(t.videoElement.error), t.emit("error", new p(s.COMMON, l.VIDEO_ELEMENT_ERROR, ""));
              break;
            case "volumechange":
              t.isMuted = t.videoElement.muted, t.volume = t.videoElement.volume, t.emit("#volumechange", t.videoElement.volume, t.videoElement.muted);
              break;
            case "ratechange":
              t.emit("#ratechange", t.videoElement.playbackRate), t.playbackRate = t.videoElement.playbackRate
          }
        }, t.createVideoElement(), t
      }
      return t(e, r), Object.defineProperty(e.prototype, "video", {
        get: function () {
          return this.videoElement
        },
        enumerable: !0,
        configurable: !0
      }), e.prototype.play = function () {
        var n = this;
        if (this.canplay) {
          I.verbose("play operation");
          var e = this.videoElement.play();
          if (void 0 === e) I.debug("play success"), I.debug("play success");
          else {
            var t = new Promise(function (e, t) {
              var r = function () {
                n.videoElement.removeEventListener("pause", r), n.isLoading = !1, t()
              };
              n.videoElement.addEventListener("pause", r)
            });
            Promise.race([e, t]).then(function () {
              I.debug("play success")
            }).catch(function (e) {
              "NotAllowedError" === e.name && (I.warning("can not play", e), n.emit("error", new p(s.COMMON, l.VIDEO_PLAY_FAILD, "can not play " + e.toString())))
            })
          }
        } else this.playWhenReady = !0
      }, e.prototype.pause = function () {
        this.videoElement.pause()
      }, e.prototype.toggleMute = function () {
        this.videoElement.muted = !this.videoElement.muted
      }, e.prototype.toggleLoop = function () {
        this.videoElement.loop = !this.videoElement.loop
      }, e.prototype.setVolume = function (e) {
        this.videoElement.volume = e
      }, e.prototype.seek = function (e) {
        var t = this;
        if (e = Math.max(0, e), e = Math.min(this.totalTime, e), this.videoElement.ended) {
          var r = function () {
            t.videoElement.play(), t.videoElement.removeEventListener("seeked", r)
          };
          this.videoElement.addEventListener("seeked", r)
        }
        this.videoElement.currentTime = e
      }, e.prototype.setPlaybackRate = function (e) {
        this.videoElement.playbackRate = e
      }, e.prototype.getCurrentFrame = function () {
        var e = document.createElement("canvas");
        e.width = this.videoElement.videoWidth, e.height = this.videoElement.videoHeight;
        var t = e.getContext("2d");
        if (!t) return "data:,";
        t.drawImage(this.videoElement, 0, 0, this.videoElement.videoWidth, this.videoElement.videoHeight);
        var r = e.toDataURL();
        return e.remove(), r
      }, e.prototype.createVideoElement = function () {
        this.videoElement = document.createElement("video"), ft.playsinline ? (this.videoElement.setAttribute("webkit-playsinline", ""), this.videoElement.setAttribute("playsinline", "")) : this.videoElement.controls = !0, this.config.anonymous && (this.videoElement.crossOrigin = "anonymous"), this.config.muted && (this.videoElement.muted = !0), this.videoElement.volume = this.config.volume, this.videoElement.style.width = "100%", this.videoElement.style.height = "100%", this.videoElement.poster = this.config.poster || "", this.videoElement.loop = !1;
        for (var e = 0, t = this.videoElementEvents; e < t.length; e++) {
          var r = t[e];
          this.videoElement.addEventListener(r, this.handleVideoElementEvent)
        }
      }, e.prototype.destroy = function () {
        this.removeAllListeners();
        for (var e = 0, t = this.videoElementEvents; e < t.length; e++) {
          var r = t[e];
          this.videoElement.removeEventListener(r, this.handleVideoElementEvent)
        }
        this.videoElement.pause(), this.videoElement.src = "", this.videoElement.load(), this.videoElement.remove()
      }, e
    }(ot),
    ht = function () {
      function e(e) {
        var t = this;
        if (this._currentQuality = 0, this.player = e, !this.player.engine) throw new p(s.COMMON, l.UNEXPECTED_ERROR, "");
        this.player.config.qualityList ? st(function () {
          return t.player.emit("get-quality-list", t.qualityList)
        }) : this.player.engine instanceof D && (this.player.engine.on("@get-quality-list", function () {
          t.player.emit("get-quality-list", t.qualityList)
        }), this.player.engine.on("@quality-switching", function (e) {
          t.player.emit("quality-switching", e)
        }), this.player.engine.on("@quality-switched", function (e) {
          t.player.emit("quality-switched", e)
        }), this.player.engine.on("@auto-quality-switch-change", function (e) {
          t.player.emit("auto-quality-switch-change", e)
        }))
      }
      return Object.defineProperty(e.prototype, "isSupportAutoQualitySwitch", {
        get: function () {
          return !this.player.config.qualityList && this.player.engine instanceof D
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(e.prototype, "qualityList", {
        get: function () {
          return this.player.config.qualityList ? this.player.config.qualityList : this.player.engine instanceof D ? this.player.engine.qualityList : []
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(e.prototype, "currentQuality", {
        get: function () {
          return this.player.config.qualityList ? {
            quality: this.qualityList[this._currentQuality],
            isAuto: !1
          } : this.player.engine instanceof D ? this.player.engine.currentQuality : (I.warning("can not get quality"), {
            quality: null,
            isAuto: !1
          })
        },
        enumerable: !0,
        configurable: !0
      }), e.prototype.toggleAutoQualitySwitch = function () {
        this.isSupportAutoQualitySwitch ? this.player.engine instanceof D && this.player.engine.toggleAutoQualityControl() : I.debug("not support auto quality switch!")
      }, e.prototype.switchQuality = function (t) {
        var s = this;
        if (this.player.config.qualityList) {
          var l = this.qualityList.find(function (e) {
            return e.id === t
          });
          if (l) {
            I.verbose("qualitu-switching", l), this.player.emit("quality-switching", l.id), this.tempRender = new pt({
              autoplay: !0,
              muted: !0,
              volume: this.player.volume,
              anonymous: this.player.config.anonymous
            });
            this.player.getEngineFromURL(l.url, this.tempRender).then(function (o) {
              (s.tempEngine = o).once("ready", function () {
                return i(s, void 0, void 0, function () {
                  var n, i, a = this;
                  return u(this, function (e) {
                    switch (e.label) {
                      case 0:
                        return this.tempRender ? (n = 0, [4, new Promise(function (t) {
                          a.tempRender.on("#timeupdate", function (e) {
                            a.tempRender.removeAllListeners(), 0 < e && t()
                          })
                        })]) : [2];
                      case 1:
                        e.sent(), e.label = 2;
                      case 2:
                        return [4, (t = this.tempRender, r = n, new Promise(function (e) {
                          t.seek(s.player.render.currentTime + r), t.once("#seeked", function () {
                            e(s.player.render.currentTime - t.currentTime)
                          })
                        }))];
                      case 3:
                        return i = e.sent(), I.verbose("latency", i), 0 <= i && i <= .3 ? [3, 4] : (n = i / 2, [3, 2]);
                      case 4:
                        return this.player.replaceEngineAndRender(o, this.tempRender), this.player.emit("quality-switched", l.id), [2]
                    }
                    var t, r
                  })
                })
              })
            })
          }
        } else this.player.engine instanceof D ? this.player.engine.changeQuality(t) : I.warning("not support change quality in this config")
      }, e.prototype.destroy = function () {
        this.tempRender && (this.tempRender.destroy(), this.tempRender = void 0), this.tempEngine && (this.tempEngine.destroy(), this.tempEngine = void 0)
      }, e
    }();

  function gt(i, a, o) {
    return void 0 === a && (a = 4), new Promise(function (r, n) {
      var e = new XMLHttpRequest;
      e.withCredentials = !!o, e.onreadystatechange = function () {
        e.readyState === e.HEADERS_RECEIVED && (r(e.getResponseHeader("Content-Type")), e.abort())
      }, e.onerror = function (e) {
        var t;
        0 < a ? (I.warning("fetch " + i + " error,", e), (t = 500, new Promise(function (e) {
          window.setTimeout(e, t)
        })).then(function () {
          r(gt(i, a - 1, !o))
        })) : n(new p(s.COMMON, l.CAN_NOT_FETCH, "get not fetch " + i))
      }, e.open("GET", i, !0), e.send()
    })
  }
  return function (r) {
    function e(e) {
      var t = r.call(this) || this;
      return t._isReady = !1, I.setLevel(void 0 === e.loggerLevel ? it.loggerLevel : e.loggerLevel), I.debug("browser", ct), t.processConfig(e), I.debug("final config", t.config), t.init(), t.initEngine().catch(function (e) {
        t.emitError(e)
      }), t
    }
    return t(e, r), Object.defineProperty(e.prototype, "currentTime", {
      get: function () {
        return this.engine ? this.engine.render.currentTime : 0
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "totalTime", {
      get: function () {
        return this.engine ? this.engine.render.totalTime : 0
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "buffered", {
      get: function () {
        if (this.engine) return this.engine.render.buffered
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "volume", {
      get: function () {
        return this.render.volume
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "isFullscreen", {
      get: function () {
        return this.fullscreenController.isFullScreen
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "isPlay", {
      get: function () {
        return !!this.engine && this.engine.render.isPlay
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "isPause", {
      get: function () {
        return !!this.engine && this.engine.render.isPause
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "isEnded", {
      get: function () {
        return !!this.engine && this.engine.render.isEnd
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "isMuted", {
      get: function () {
        return this.render.isMuted
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "isLoop", {
      get: function () {
        return this.render.isLoop
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.play = function () {
      this._isReady && this.engine ? this.engine.render.play() : I.warning("player is not ready")
    }, e.prototype.pause = function () {
      this._isReady && this.engine ? this.engine.render.pause() : I.warning("player is not ready")
    }, e.prototype.seek = function (e) {
      this._isReady && this.engine ? this.engine.render.seek(e) : I.warning("player is not ready")
    }, e.prototype.toggleFullscreen = function () {
      this.fullscreenController.toggle()
    }, e.prototype.toggleMute = function () {
      this.render.toggleMute()
    }, e.prototype.toggleLoop = function () {
      this.render.toggleLoop()
    }, e.prototype.setVolume = function (e) {
      this.render.setVolume(e)
    }, e.prototype.setPlaybackRate = function (e) {
      this.render.setPlaybackRate(e)
    }, e.prototype.getCurrentFrame = function () {
      return this.render.getCurrentFrame()
    }, e.prototype.sendNotification = function (e, t) {
      void 0 === t && (t = 3e3), this.emit("notification", {
        message: e,
        timeout: t
      })
    }, e.prototype.replaceEngineAndRender = function (e, t) {
      if (this.engine) {
        var r = this.render.isMuted;
        t.setVolume(this.render.volume), t.setPlaybackRate(this.render.playbackRate), this.engine.destroy(), this.render.destroy(), this.render = t, this.engine = e, this.view ? (this.render.setContainer(this.view.getVideoElementSlot()), this.fullscreenController.changeContainer(this.view.getContainerElementSlot(), this.render.video)) : (this.render.video.controls = !0, this.render.setContainer(this.config.container), this.fullscreenController.changeContainer(this.render.video, this.render.video)), r !== this.render.isMuted && this.render.toggleMute(), this.emit("loading", this.render.isLoading), this.handleEngineEvents(e, t), this.render.play(), this.emit("play")
      }
    }, e.prototype.destroy = function () {
      this.qualityController && this.qualityController.destroy(), this.view && this.view.destroy(), this.render.destroy(), this.engine && this.engine.destroy()
    }, e.prototype.processConfig = function (e) {
      if (this.config = function e(t, r) {
          for (var n in r) try {
            r[n].constructor === Object ? t[n] = e(t[n], r[n]) : t[n] = r[n]
          } catch (e) {
            t[n] = r[n]
          }
          return t
        }(a({}, it), e), !this.config.url && !this.config.qualityList) throw new p(s.COMMON, l.INVALID_CONFIG, "can not find url in config!");
      if (this.config.qualityList && 0 === this.config.qualityList.length) throw new p(s.COMMON, l.INVALID_CONFIG, "qualityList is empty!");
      this.config.url && this.config.qualityList && (I.warning("qualityList will be ignored"), this.config.qualityList = void 0), this.config.qualityList && (this.config.qualityList = this.config.qualityList.map(function (e, t) {
        return e.id = t, e
      })), this.config.hls && this.config.hls.DRMKey && (this.config.hls.DRMKey = new Uint8Array(this.config.hls.DRMKey)), this.currentURL = this.config.url || this.config.qualityList[0].url
    }, e.prototype.init = function () {
      this.render = new pt({
        autoplay: this.config.autoplay,
        muted: this.config.muted,
        volume: this.config.volume,
        poster: this.config.poster,
        anonymous: this.config.anonymous
      }), this.config.view ? (this.view = this.config.view, this.config.view.init(this, !ft.playsinline), this.render.setContainer(this.view.getVideoElementSlot())) : (this.render.video.controls = !0, this.render.setContainer(this.config.container)), this.view ? this.fullscreenController = new at(this.view.getContainerElementSlot(), this.render.video) : this.fullscreenController = new at(this.render.video, this.render.video)
    }, e.prototype.getEngineFromURL = function (a, o) {
      return i(this, void 0, void 0, function () {
        var t, r, n, i;
        return u(this, function (e) {
          switch (e.label) {
            case 0:
              return [4, gt(a)];
            case 1:
              for (t = e.sent(), I.verbose("get content type", t), r = 0, n = [O, P]; r < n.length; r++)
                if ((i = n[r]).isSupport()) try {
                  if (i.probe(a, t || "", this.config)) return [2, new i(o, i.playConfigToEngineConfig(a, this.config))]
                } catch (e) {
                  I.warning("probe engine faild", e);
                  continue
                }
              throw new p(s.COMMON, l.UNKNOWN_FORMAT, "can not parse " + this.config.url)
          }
        })
      })
    }, e.prototype.initEngine = function () {
      return i(this, void 0, void 0, function () {
        var t;
        return u(this, function (e) {
          switch (e.label) {
            case 0:
              return [4, (t = this).getEngineFromURL(this.currentURL, this.render)];
            case 1:
              return t.engine = e.sent(), this.qualityController = new ht(this), this.handleEngineEvents(this.engine, this.render), this.handleControllerEvents(), [2]
          }
        })
      })
    }, e.prototype.handleEngineEvents = function (e, t) {
      for (var n = this, r = t.eventList.filter(function (e) {
          return "#" === e[0]
        }), i = function (r) {
          t.on(r, function () {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            n.emit.apply(n, [r.slice(1, r.length)].concat(e))
          })
        }, a = 0, o = r; a < o.length; a++) {
        i(o[a])
      }
      for (var s = function (r) {
          e.on(r, function () {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            n.emit.apply(n, [r.slice(1, r.length)].concat(e)), I.verbose.apply(I, [r.slice(1, r.length)].concat(e))
          })
        }, l = 0, u = r = e.eventList.filter(function (e) {
          return "#" === e[0]
        }); l < u.length; l++) {
        s(u[l])
      }
      e.once("ready", function (e) {
        n._isReady = !0, n.emit("ready", e), I.debug("event: player ready", e)
      }), e.on("error", this.emitError.bind(this)), t.on("error", this.emitError.bind(this))
    }, e.prototype.handleControllerEvents = function () {
      var e = this;
      this.fullscreenController.on("fullscreenchange", function () {
        e.emit("fullscreenchange", e.fullscreenController.isFullScreen), I.verbose("fullscreen change", e.fullscreenController.isFullScreen)
      })
    }, e.prototype.emitError = function (e) {
      10005 === e.code && this.engine && (I.debug("reload engine"), this.engine.reload()), this.emit("error", e)
    }, e
  }(b)
}();
export default QPlayer;
