/* AI한컷 Intro SDK 1.1.0 — standalone, no host-app dependencies. */
(function (global) {
  'use strict';
  if (global.AIHancutIntro) return;
  var doc = global.document;
  var scriptUrl = doc.currentScript && doc.currentScript.src;
  var active = null;

  function callback(fn, value) {
    if (typeof fn !== 'function') return;
    try { fn(value); } catch (error) { console.error('AIHancutIntro callback:', error); }
  }

  function play(options) {
    if (active) return active.promise;
    options = options || {};
    var parentOrigin = typeof global.origin === 'string' ? global.origin : global.location.origin;
    var userClicked = !!(global.navigator && global.navigator.userActivation && global.navigator.userActivation.isActive);
    var motion = ['full', 'reduce', 'auto'].indexOf(options.motion) >= 0 ? options.motion : userClicked ? 'full' : 'auto';
    var embedUrl;
    try {
      var base = options.baseUrl ? new URL(options.baseUrl, global.location.href) : new URL('./', scriptUrl);
      if (!/^https?:$/.test(base.protocol)) throw new Error('HTTP(S) player required');
      if (!base.pathname.endsWith('/')) base.pathname += '/';
      embedUrl = new URL('embed/', base);
    } catch (_) {
      var configurationError = { code: 'configuration', message: 'Load intro.js from an HTTP(S) host or set baseUrl.' };
      callback(options.onError, configurationError);
      return Promise.resolve({ status: 'error', error: configurationError });
    }
    if (!doc.body) {
      var domError = { code: 'not-ready', message: 'Call play() after the document body is available.' };
      callback(options.onError, domError);
      return Promise.resolve({ status: 'error', error: domError });
    }

    var channel = global.crypto.randomUUID ? global.crypto.randomUUID()
      : Array.from(global.crypto.getRandomValues(new Uint8Array(16)), function (byte) { return byte.toString(16).padStart(2, '0'); }).join('');
    embedUrl.searchParams.set('parentOrigin', parentOrigin);
    embedUrl.searchParams.set('channel', channel);
    embedUrl.searchParams.set('v', '1.1.0');
    var overlay = doc.createElement('div');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'AI한컷 우주 오프닝');
    Object.assign(overlay.style, {
      position: 'fixed', inset: '0', width: '100%', height: '100%', zIndex: '2147483647',
      background: '#020308', opacity: '1', transition: 'opacity 380ms ease', isolation: 'isolate'
    });
    var frame = doc.createElement('iframe');
    frame.src = embedUrl.href;
    frame.setAttribute('title', '우주에서 인천으로');
    frame.setAttribute('allow', 'autoplay');
    frame.setAttribute('sandbox', 'allow-scripts allow-same-origin');
    frame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    Object.assign(frame.style, { display: 'block', width: '100%', height: '100%', border: '0', background: '#020308' });
    overlay.appendChild(frame);
    var previousFocus = doc.activeElement;
    var previousOverflow = doc.documentElement.style.overflow;
    var inertState = Array.from(doc.body.children).map(function (node) { return [node, node.inert]; });
    inertState.forEach(function (entry) { entry[0].inert = true; });
    doc.documentElement.style.overflow = 'hidden';

    var resolve;
    var promise = new Promise(function (done) { resolve = done; });
    var finished = false, started = false, timeout, fadeTimer;
    var remaining = typeof options.timeoutMs === 'number' && Number.isFinite(options.timeoutMs)
      ? Math.max(5000, Math.min(120000, options.timeoutMs)) : 45000;
    var timerStarted = 0;

    function finish(result, fade) {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);
      global.removeEventListener('message', onMessage);
      doc.removeEventListener('keydown', onKey);
      doc.removeEventListener('visibilitychange', onVisibility);
      frame.removeEventListener('error', onFrameError);
      function cleanup() {
        clearTimeout(fadeTimer);
        overlay.remove();
        inertState.forEach(function (entry) { if (entry[0].isConnected) entry[0].inert = entry[1]; });
        if (doc.documentElement.style.overflow === 'hidden') doc.documentElement.style.overflow = previousOverflow;
        if (previousFocus && previousFocus.isConnected && previousFocus.focus) previousFocus.focus({ preventScroll: true });
        active = null;
        if (result.status === 'completed') callback(options.onComplete, result);
        else if (result.status === 'error') callback(options.onError, result.error);
        resolve(result);
      }
      if (fade) { overlay.style.opacity = '0'; fadeTimer = setTimeout(cleanup, 380); }
      else cleanup();
    }
    function fail(code, message) { finish({ status: 'error', error: { code: code, message: message } }, false); }
    function onFrameError() { fail('load', 'The intro could not be loaded.'); }
    function onKey(event) { if (event.key === 'Escape') finish({ status: 'cancelled' }, false); }
    function onMessage(event) {
      var data = event.data;
      var originMatches = event.origin === embedUrl.origin || (parentOrigin === 'null' && event.origin === 'null');
      if (finished || !originMatches || event.source !== frame.contentWindow || !data ||
        data.namespace !== 'aihancut-intro' || data.version !== 1 || data.channel !== channel) return;
      if (data.type === 'ready' && !started) {
        started = true;
        frame.contentWindow.postMessage({ namespace: 'aihancut-intro', version: 1, channel: channel,
          type: 'start', sound: options.sound === true, motion: motion }, event.origin === 'null' ? '*' : embedUrl.origin);
      } else if (data.type === 'complete' && started) {
        finish({ status: 'completed', destination: 'Incheon', reducedMotion: data.reducedMotion === true }, true);
      } else if (data.type === 'cancel') finish({ status: 'cancelled' }, false);
      else if (data.type === 'error') fail('playback', 'The intro could not be played on this device.');
    }
    function armTimeout() {
      timerStarted = Date.now();
      timeout = setTimeout(function () { fail('timeout', 'The intro timed out.'); }, remaining);
    }
    function onVisibility() {
      if (finished) return;
      if (doc.hidden) { clearTimeout(timeout); remaining = Math.max(0, remaining - (Date.now() - timerStarted)); }
      else armTimeout();
    }
    active = { promise: promise, close: function () { finish({ status: 'cancelled' }, false); } };
    global.addEventListener('message', onMessage);
    doc.addEventListener('keydown', onKey);
    doc.addEventListener('visibilitychange', onVisibility);
    frame.addEventListener('error', onFrameError);
    doc.body.appendChild(overlay);
    frame.focus();
    if (!doc.hidden) armTimeout();
    return promise;
  }
  global.AIHancutIntro = Object.freeze({ version: '1.1.0', play: play,
    close: function () { if (active) active.close(); } });
})(window);
