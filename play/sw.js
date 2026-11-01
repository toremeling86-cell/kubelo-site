/* Kube – service worker, versjon fdc5c5b56f29 */
const BASE = "/play/";
// Navnet inneholder stien, så flere apper på samme domene (for eksempel github.io) ikke rydder hverandres lager.
const PREFIX = 'kube:' + BASE + ':';
const CACHE = PREFIX + 'fdc5c5b56f29';
const FILES = ["/play/index.html","/play/manifest.webmanifest","/play/icons/icon-192.png","/play/icons/maskable-192.png","/play/icons/apple-touch-icon.png","/play/icons/favicon-32.png","/play/assets/AboutSheet-CG1gW7QE.js","/play/assets/actions-70JhaTGk.js","/play/assets/assemble-BsLtXLlg.js","/play/assets/bests-CV8R_zn-.js","/play/assets/board-CbhBPYCm.js","/play/assets/cheat-CMrYBvuE.js","/play/assets/cheat-D9yFaCLB.css","/play/assets/cockpit-DjCl0iBR.js","/play/assets/cockpit-DOp6sQ08.css","/play/assets/controls-BH14u6bE.js","/play/assets/core-6Fox2abY.js","/play/assets/cube-iSAOp81T.js","/play/assets/debug-e29s2OK3.js","/play/assets/duel-I0bRv1yw.css","/play/assets/DuelLayers-B6wp_mbt.js","/play/assets/earth-DkqvwfAd.js","/play/assets/earthDownload-BAK8L3RH.js","/play/assets/earthLevels-DHF8_OCB.js","/play/assets/engine-BqcisOZy.js","/play/assets/environment-CiK3Clox.js","/play/assets/facelets-Cx602QR_.js","/play/assets/features-Bt-1FL1b.js","/play/assets/feedback-DghntjsL.js","/play/assets/FeedbackSheet-od6DF6K4.js","/play/assets/forest-DvSezZ1-.js","/play/assets/format-DhFkyXlU.js","/play/assets/gps-sUGouh5b.css","/play/assets/GpsScreen-DA47SN7d.js","/play/assets/GpsScreen-DtP78DDB.css","/play/assets/GuideCheck-X9H9cN9V.js","/play/assets/helpShowsEdit-D9lf6lsj.js","/play/assets/identity-C19oHWEP.js","/play/assets/index-BX1X7bg9.js","/play/assets/index-CtxXAPvE.css","/play/assets/jetbrains-mono-latin-500-normal-BWZEU5yA.woff2","/play/assets/jetbrains-mono-latin-ext-500-normal-Cut-4mMH.woff2","/play/assets/JoinScreen-BKk42C56.js","/play/assets/keys-DQ4KKp-W.js","/play/assets/KTX2Loader-DPFYyMVZ.js","/play/assets/lang-B_9uR5ty.js","/play/assets/leave-Cl8BB1VY.js","/play/assets/messages.nb-k9Y1s_3c.js","/play/assets/migrations-D_YVxBEw.js","/play/assets/MovePad-D-GsfZcM.js","/play/assets/MovePad-q7KtqyIy.css","/play/assets/MoveSigns-DZ8O4-4o.js","/play/assets/moveText-BJI-1Pr_.js","/play/assets/MyReplay-BGcaZKwp.js","/play/assets/notation-CaTfMHiJ.js","/play/assets/ocean-CdoSDhsi.js","/play/assets/orientation-Be_D1Qwf.js","/play/assets/paint-DnykaZvO.js","/play/assets/pending-ggU_3Ci9.js","/play/assets/placeStatus-D8rH0Cqp.js","/play/assets/plan-D8jPzu5m.js","/play/assets/PlayHelpRow-kQV3wSse.js","/play/assets/playPlan-ByflTqv5.js","/play/assets/prefs-r3Rvkw9Z.js","/play/assets/preload-helper-6DGb1DyC.js","/play/assets/rankedFlow-CoTNvC5G.js","/play/assets/RankedScreen-BvRUaKpJ.css","/play/assets/RankedScreen-jgBWEdaB.js","/play/assets/react-DUz72-CK.js","/play/assets/realStart-BWyAWffQ.js","/play/assets/recognize-Deq9g4ol.js","/play/assets/replay-WyZ4TCEC.js","/play/assets/replayDb-C6U2CxT7.js","/play/assets/replayLog-BNdAASpU.js","/play/assets/replays-BGIuzrxz.js","/play/assets/retiredSettings-C6RQ2_0F.js","/play/assets/rolldown-runtime-XKyaHtl9.js","/play/assets/scan-vwcXFlzT.js","/play/assets/ScanExperience-BzYDhkox.js","/play/assets/ScanScreen-DV-EZxiw.js","/play/assets/ScanScreen-k09YTq9J.css","/play/assets/scene-Dpfd7zPH.js","/play/assets/schibsted-grotesk-latin-500-normal-rf9C4Thp.woff2","/play/assets/schibsted-grotesk-latin-600-normal-Czv9Obfv.woff2","/play/assets/schibsted-grotesk-latin-700-normal-BkH0uJ1o.woff2","/play/assets/schibsted-grotesk-latin-800-normal-CIaq-TR1.woff2","/play/assets/schibsted-grotesk-latin-ext-500-normal-Ch1izu81.woff2","/play/assets/schibsted-grotesk-latin-ext-600-normal-C5pQPdUJ.woff2","/play/assets/schibsted-grotesk-latin-ext-700-normal-o210KhU4.woff2","/play/assets/schibsted-grotesk-latin-ext-800-normal-CZWJQj-F.woff2","/play/assets/scrambler-B5R5t7hA.js","/play/assets/scrambler.worker-BdiG_Bnn.js","/play/assets/scrambles-Cj2kJBkL.js","/play/assets/ScrambleSheet-BQ0kUBZ0.js","/play/assets/ScramblesSheet-DSjO_gGm.js","/play/assets/ScrambleView-BlqVGmvu.js","/play/assets/session-Dwv5DYuJ.js","/play/assets/SettingsSheet-CIH6Ko6P.js","/play/assets/shareCard-FKm8Vqwe.js","/play/assets/ShareSheet-DZ0IXB1h.js","/play/assets/ShareSheet-D_a5F9BZ.css","/play/assets/Sheets-BogtUOhP.js","/play/assets/sky-Dw02_Q9d.js","/play/assets/SkyRecords-BqVx08ov.js","/play/assets/SkyRecords-BYt-ORYl.css","/play/assets/slices-fMwRku9-.js","/play/assets/snapshot-ixfDyWis.js","/play/assets/SolveSheet-CP13HSfr.js","/play/assets/store-B-nXSC1M.js","/play/assets/store-Ddr5EESH.js","/play/assets/t-Djnm3zTE.js","/play/assets/terrain.worker-CqBzxqHc.js","/play/assets/terrainCache-WthounQz.js","/play/assets/text-CGlsyREv.js","/play/assets/three-DTSqHtj7.js","/play/assets/viewControl-Cz3Gavmw.js","/play/assets/WatchLayer-Bn4hIizE.css","/play/assets/WatchLayer-MJaAq38N.js","/play/assets/wipeFlow-BlBTJDWJ.js","/play/assets/wiping-C43ZGAKh.js","/play/assets/World-DdCTAgn9.js","/play/assets/World-DLN7Zsc5.css","/play/assets/worldHint-CDctuaI0.js","/play/assets/WorldLink-BobqWC_2.js","/play/assets/WorldWatch-OVvzRKLB.js","/play/icons/monochrome-432.png","/play/leaderboard-rules.html","/play/privacy.html"];
// Sidene i bygget som ikke er appen (for eksempel personvern.html eller lisenser.txt), som stier i adressen.
const PAGES = ["/play/leaderboard-rules.html","/play/lisenser.txt","/play/privacy.html"];
const ENTRY = "/play/assets/index-BX1X7bg9.js";
// Filene med innholdet i navnet.
const ASSETS = BASE + 'assets/';
// Bildene til stedene som lastes ned (jorda, sted-jorda.md 2.4): et eget, varig lager. Navnet begynner ikke med PREFIX («kube:»), ellers sletter activate det ved hver oppdatering, og 10 MB måtte lastes ned på nytt.
// Appen rydder gamle versjoner selv (src/engine/world/placeCache.ts) og sletter lageret i «Delete all data».
const PLACES_CACHE = 'kube-steder:' + BASE;
const PLACES_DIR = BASE + 'steder/';

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      // Lagrene fra tidligere versjoner. Bare lagrene til denne appen (PREFIX): andre apper på samme domene har sine egne.
      const older = (await caches.keys()).filter((k) => k.startsWith(PREFIX) && k !== CACHE);
      const previous = async (url) => {
        for (const name of older) {
          const hit = await caches.match(url, { cacheName: name });
          if (hit) return hit;
        }
        return null;
      };
      const responses = await Promise.all(
        FILES.map(async (url) => {
          const hashed = url.startsWith(ASSETS);
          const kept = hashed ? await previous(url) : null;
          if (kept) return [url, kept];
          const res = await fetch(hashed ? new Request(url) : new Request(url, { cache: 'reload' }));
          if (!res.ok) throw new Error('Mangler ' + url + ' (' + res.status + ')');
          return [url, res];
        }),
      );
      const index = responses.find(([url]) => url === BASE + 'index.html');
      // Svarer serveren eller et mellomlager med en eldre side, avbrytes installasjonen og den gamle versjonen blir stående.
      if (index && ENTRY && !(await index[1].clone().text()).includes(ENTRY.slice(BASE.length))) throw new Error('Utdatert index.html');
      const cache = await caches.open(CACHE);
      await Promise.all(responses.map(([url, res]) => cache.put(url, res)));
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});

// Fra lageret først, ellers fra nettet. Det som hentes, lagres under key til neste gang, også uten nett.
function cachedOrFetched(key, req) {
  return caches.match(key, { cacheName: CACHE }).then(
    (hit) =>
      hit ||
      fetch(req).then((res) => {
        if (res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(key, copy));
        }
        return res;
      }),
  );
}

// Bildene til stedene: fra lageret først, ellers fra nettet og så lagret til neste gang, også uten nett. Feiler nettet første gang, feiler henting (appen viser meldingen).
function placeFetched(req) {
  return caches.open(PLACES_CACHE).then((cache) =>
    cache.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok && res.status === 200 && res.type !== 'opaque') cache.put(req, res.clone());
          return res;
        }),
    ),
  );
}

// Siden en adresse viser til, også uten «.html», slik vertene serverer den (/personvern gir personvern.html).
function pageFor(path) {
  if (PAGES.includes(path)) return path;
  if (PAGES.includes(path + '.html')) return path + '.html';
  return null;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return;
  if (req.mode === 'navigate') {
    // En side i bygget, for eksempel personvern.html eller lisenser.txt, vises som seg selv.
    const page = pageFor(url.pathname);
    if (page) {
      event.respondWith(cachedOrFetched(page, req));
      return;
    }
    // Alle andre sidebesøk er appen: lagret index.html først, så den åpner seg med en gang, også uten nett.
    // Nye versjoner kommer via en ventende service worker og knappen Oppdater.
    event.respondWith(caches.match(BASE + 'index.html', { cacheName: CACHE }).then((hit) => hit || fetch(req)));
    return;
  }
  if (url.pathname.startsWith(PLACES_DIR)) {
    event.respondWith(placeFetched(req));
    return;
  }
  event.respondWith(cachedOrFetched(req, req));
});
