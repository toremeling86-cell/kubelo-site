/* Kube – service worker, versjon e33c09b41dde */
const BASE = "/play/";
// Navnet inneholder stien, så flere apper på samme domene (for eksempel github.io) ikke rydder hverandres lager.
const PREFIX = 'kube:' + BASE + ':';
const CACHE = PREFIX + 'e33c09b41dde';
const FILES = ["/play/index.html","/play/manifest.webmanifest","/play/icons/icon-192.png","/play/icons/maskable-192.png","/play/icons/apple-touch-icon.png","/play/icons/favicon-32.png","/play/assets/AboutSheet-DYdVEGJu.js","/play/assets/actions-BlawBUkT.js","/play/assets/assemble-BIHyfXp9.js","/play/assets/bests-C0NZWAGw.js","/play/assets/board-BhBGU_uc.js","/play/assets/cheat-B8aknmu6.js","/play/assets/cheat-D9yFaCLB.css","/play/assets/clouds-C5OtG5hg.webp","/play/assets/cockpit-BCY7d2ez.js","/play/assets/cockpit-hDARFUH2.css","/play/assets/controls-02k5Asmh.js","/play/assets/core-6Fox2abY.js","/play/assets/cube-iSAOp81T.js","/play/assets/debug-e29s2OK3.js","/play/assets/download-CcAixvXA.js","/play/assets/duel-I0bRv1yw.css","/play/assets/DuelLayers-B_kNeX6a.js","/play/assets/earth-CKNcuYCE.js","/play/assets/earth-CvNxVQs_.webp","/play/assets/earthDownload-DljWNSyD.js","/play/assets/earthLevels-CSK8qppi.js","/play/assets/earthTextures-Bw0YS96s.js","/play/assets/engine-B1AW-fLo.js","/play/assets/environment-KxcmyIln.js","/play/assets/facelets-CtRHj3-H.js","/play/assets/features-BWnSIfqY.js","/play/assets/feedback-BxpD2JrN.js","/play/assets/FeedbackSheet-BB6glOAo.js","/play/assets/forest-Bxo4kRV7.js","/play/assets/format-KckXtkM8.js","/play/assets/gps-B7bcf14N.css","/play/assets/GpsScreen-B4qIcnXQ.js","/play/assets/GpsScreen-DtP78DDB.css","/play/assets/GuideCheck-D1rjx11d.js","/play/assets/helpShowsEdit-CZwEasbx.js","/play/assets/identity-Bxz_eaAH.js","/play/assets/index-BGk-e59C.css","/play/assets/index-BvTxow8s.js","/play/assets/jetbrains-mono-latin-500-normal-BWZEU5yA.woff2","/play/assets/jetbrains-mono-latin-ext-500-normal-Cut-4mMH.woff2","/play/assets/JoinScreen-BasvfAef.js","/play/assets/keys-BDWdPmJm.js","/play/assets/KTX2Loader-DPFYyMVZ.js","/play/assets/lang-e7_DpJAX.js","/play/assets/leave-sHR0cNV8.js","/play/assets/marks-DhD57rME.js","/play/assets/messages.nb-hApk6pK_.js","/play/assets/migrations-DUthVZB2.js","/play/assets/MovePad-DZ3nT9cN.js","/play/assets/MovePad-q7KtqyIy.css","/play/assets/MoveSigns-DZ8O4-4o.js","/play/assets/moveText-BJI-1Pr_.js","/play/assets/MyReplay-D3ZdwwoI.js","/play/assets/notation-CaTfMHiJ.js","/play/assets/ocean-CCs_4tww.js","/play/assets/orientation-Be_D1Qwf.js","/play/assets/paint-ChZoxm0R.js","/play/assets/pending-DItoQMQG.js","/play/assets/placeCache-Bils8dln.js","/play/assets/plan-CNiqgNfB.js","/play/assets/PlayHelpRow-DvcP6uT8.js","/play/assets/playPlan-D9wlQv-E.js","/play/assets/prefs-CtSzvr9l.js","/play/assets/preload-helper-6DGb1DyC.js","/play/assets/rankedFlow-HovkXtuL.js","/play/assets/RankedScreen-BvRUaKpJ.css","/play/assets/RankedScreen-PkL1BwgG.js","/play/assets/react-DUz72-CK.js","/play/assets/realStart-CRutV4F-.js","/play/assets/recognize-Deq9g4ol.js","/play/assets/replay-B86GcxDZ.js","/play/assets/replayDb-C6U2CxT7.js","/play/assets/replayLog-BZmcACTS.js","/play/assets/replays-Bo77FXtt.js","/play/assets/rolldown-runtime-XKyaHtl9.js","/play/assets/rounds-Bk2NBpDt.js","/play/assets/ScanExperience-BQ93NeA5.js","/play/assets/ScanScreen-C1U1Mi44.css","/play/assets/ScanScreen-CY20gMWL.js","/play/assets/scene-BKOFxEPa.js","/play/assets/schibsted-grotesk-latin-500-normal-rf9C4Thp.woff2","/play/assets/schibsted-grotesk-latin-600-normal-Czv9Obfv.woff2","/play/assets/schibsted-grotesk-latin-700-normal-BkH0uJ1o.woff2","/play/assets/schibsted-grotesk-latin-800-normal-CIaq-TR1.woff2","/play/assets/schibsted-grotesk-latin-ext-500-normal-Ch1izu81.woff2","/play/assets/schibsted-grotesk-latin-ext-600-normal-C5pQPdUJ.woff2","/play/assets/schibsted-grotesk-latin-ext-700-normal-o210KhU4.woff2","/play/assets/schibsted-grotesk-latin-ext-800-normal-CZWJQj-F.woff2","/play/assets/scrambler-D-geKehz.js","/play/assets/scrambler.worker-BdiG_Bnn.js","/play/assets/scrambles-DhCmVshz.js","/play/assets/ScrambleSheet-BSB9G_vD.js","/play/assets/ScramblesSheet-js6diWyQ.js","/play/assets/ScrambleView-DVYfIfdw.js","/play/assets/sea-CiXG2hjt.webp","/play/assets/session-Dwv5DYuJ.js","/play/assets/SettingsSheet-dn2VhMWn.js","/play/assets/shareCard-C4-tH5gu.js","/play/assets/ShareSheet-B-FtHpiQ.js","/play/assets/ShareSheet-D_a5F9BZ.css","/play/assets/Sheets-jawZCwDn.js","/play/assets/shell-SJRxzR8t.js","/play/assets/sky-rhsY4L5v.js","/play/assets/SkyRecords-5FKcJYvU.css","/play/assets/SkyRecords-Cz5jxaVC.js","/play/assets/slices-DZrzc4lX.js","/play/assets/snapshot-B6QYzhzh.js","/play/assets/SolveSheet--diyLPLW.js","/play/assets/store-9BHBgVJl.js","/play/assets/store-BuypJmzO.js","/play/assets/t-DVvSNBnF.js","/play/assets/terrain.worker-CqBzxqHc.js","/play/assets/terrainCache-us76TUyH.js","/play/assets/text-WBE1xM8k.js","/play/assets/three-DTSqHtj7.js","/play/assets/version-CtrYepqU.js","/play/assets/viewControl-CZjtZnyC.js","/play/assets/WatchLayer-Bc55KKRV.css","/play/assets/WatchLayer-NQfAwlUk.js","/play/assets/wipeFlow-h82Us82w.js","/play/assets/wiping-C43ZGAKh.js","/play/assets/World-BGLvd_9f.js","/play/assets/World-DLN7Zsc5.css","/play/assets/worldHint-DLo82n-8.js","/play/assets/WorldLink-DuuavFHQ.js","/play/assets/WorldWatch-Cdc8zgxn.js","/play/icons/monochrome-432.png","/play/leaderboard-rules.html","/play/privacy.html"];
// Sidene i bygget som ikke er appen (for eksempel personvern.html eller lisenser.txt), som stier i adressen.
const PAGES = ["/play/leaderboard-rules.html","/play/lisenser.txt","/play/privacy.html"];
const ENTRY = "/play/assets/index-BvTxow8s.js";
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
