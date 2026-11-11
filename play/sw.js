/* Kube – service worker, versjon 87ffbf323a94 */
const BASE = "/play/";
// Navnet inneholder stien, så flere apper på samme domene (for eksempel github.io) ikke rydder hverandres lager.
const PREFIX = 'kube:' + BASE + ':';
const CACHE = PREFIX + '87ffbf323a94';
const FILES = ["/play/index.html","/play/manifest.webmanifest","/play/icons/icon-192.png","/play/icons/maskable-192.png","/play/icons/apple-touch-icon.png","/play/icons/favicon-32.png","/play/assets/AboutSheet-w02vsGEX.js","/play/assets/actions-t87sUJKt.js","/play/assets/assemble-BIHyfXp9.js","/play/assets/bests-CoS02kiS.js","/play/assets/board-PwaQffyX.js","/play/assets/cheat-D9yFaCLB.css","/play/assets/cheat-RNNhREj9.js","/play/assets/clouds-C5OtG5hg.webp","/play/assets/cockpit-CwRPnvtW.js","/play/assets/cockpit-hDARFUH2.css","/play/assets/controls-CVUlTB9p.js","/play/assets/core-6Fox2abY.js","/play/assets/cube-iSAOp81T.js","/play/assets/debug-e29s2OK3.js","/play/assets/download-1KvkqjAV.js","/play/assets/duel-I0bRv1yw.css","/play/assets/DuelLayers-Xtxm1JUB.js","/play/assets/earth-CvNxVQs_.webp","/play/assets/earth-DR0awTvk.js","/play/assets/earthDownload-D4gPWRTU.js","/play/assets/earthLevels-CSK8qppi.js","/play/assets/earthTextures-Bw0YS96s.js","/play/assets/engine-B6Fn99sx.js","/play/assets/environment-KxcmyIln.js","/play/assets/facelets-CtRHj3-H.js","/play/assets/features-BWnSIfqY.js","/play/assets/feedback-BxpD2JrN.js","/play/assets/FeedbackSheet-E5eCDad6.js","/play/assets/forest-Bxo4kRV7.js","/play/assets/format-CcNqnQmW.js","/play/assets/gps-B7bcf14N.css","/play/assets/GpsScreen-CU5PhSVk.js","/play/assets/GpsScreen-DtP78DDB.css","/play/assets/GuideCheck-CAx8XaK9.js","/play/assets/helpShowsEdit-DGVcrhKR.js","/play/assets/identity-CpmICJDs.js","/play/assets/index-B3wQKBe1.js","/play/assets/index-BGk-e59C.css","/play/assets/jetbrains-mono-latin-500-normal-BWZEU5yA.woff2","/play/assets/jetbrains-mono-latin-ext-500-normal-Cut-4mMH.woff2","/play/assets/JoinScreen-DyVPbkCD.js","/play/assets/keys-CA-94KRF.js","/play/assets/KTX2Loader-DPFYyMVZ.js","/play/assets/lang-C3O0t7o_.js","/play/assets/leave-vR_5GQ_d.js","/play/assets/marks-DhD57rME.js","/play/assets/messages.nb-CrLVwonp.js","/play/assets/migrations-B2OdtFE1.js","/play/assets/MovePad-CVxk9THg.js","/play/assets/MovePad-q7KtqyIy.css","/play/assets/MoveSigns-DZ8O4-4o.js","/play/assets/moveText-BJI-1Pr_.js","/play/assets/MyReplay-CnegwlU9.js","/play/assets/name-DwzOVzEQ.js","/play/assets/notation-CaTfMHiJ.js","/play/assets/ocean-CCs_4tww.js","/play/assets/orientation-Be_D1Qwf.js","/play/assets/paint-D1tawd4_.js","/play/assets/pending-C3-xHGy8.js","/play/assets/placeCache-Bils8dln.js","/play/assets/plan-CNiqgNfB.js","/play/assets/PlayHelpRow-CWKFvuqY.js","/play/assets/playPlan-ChyJ3EY5.js","/play/assets/prefs-Cp4dko0q.js","/play/assets/preload-helper-6DGb1DyC.js","/play/assets/rankedFlow-DIBrtGu8.js","/play/assets/RankedScreen-BvRUaKpJ.css","/play/assets/RankedScreen-DRHinouc.js","/play/assets/rankedSession-Csm-tEFU.js","/play/assets/rankedTwo-mmZXUCYE.js","/play/assets/react-DUz72-CK.js","/play/assets/realStart-DOG8QXAd.js","/play/assets/recognize-Deq9g4ol.js","/play/assets/replay-B86GcxDZ.js","/play/assets/replayDb-C6U2CxT7.js","/play/assets/replayLog-BZmcACTS.js","/play/assets/replays-BfcSLw3X.js","/play/assets/rolldown-runtime-XKyaHtl9.js","/play/assets/roundFlow-5djrTLzG.js","/play/assets/roundMachine-L-8DUXIa.js","/play/assets/rounds-Bk2NBpDt.js","/play/assets/RoundScreen-DNiFkZcm.css","/play/assets/RoundScreen-DTcZTuWP.js","/play/assets/roundView-DBtkTzzp.js","/play/assets/ScanExperience-Dj8wiaNX.js","/play/assets/ScanScreen-C1U1Mi44.css","/play/assets/ScanScreen-DDzY5aPC.js","/play/assets/scene-DjzlwPIQ.js","/play/assets/schibsted-grotesk-latin-500-normal-rf9C4Thp.woff2","/play/assets/schibsted-grotesk-latin-600-normal-Czv9Obfv.woff2","/play/assets/schibsted-grotesk-latin-700-normal-BkH0uJ1o.woff2","/play/assets/schibsted-grotesk-latin-800-normal-CIaq-TR1.woff2","/play/assets/schibsted-grotesk-latin-ext-500-normal-Ch1izu81.woff2","/play/assets/schibsted-grotesk-latin-ext-600-normal-C5pQPdUJ.woff2","/play/assets/schibsted-grotesk-latin-ext-700-normal-o210KhU4.woff2","/play/assets/schibsted-grotesk-latin-ext-800-normal-CZWJQj-F.woff2","/play/assets/scrambler-D-geKehz.js","/play/assets/scrambler.worker-BdiG_Bnn.js","/play/assets/scrambles-Zl24syBz.js","/play/assets/ScrambleSheet-DGGz2ODU.js","/play/assets/ScramblesSheet-BHyl5lQ5.js","/play/assets/ScrambleView-OG94p4id.js","/play/assets/sea-CiXG2hjt.webp","/play/assets/session-Dwv5DYuJ.js","/play/assets/SettingsSheet-B-xdDdv_.js","/play/assets/shareCard-qdvHvKmi.js","/play/assets/ShareSheet-DN9G9KIe.js","/play/assets/ShareSheet-D_a5F9BZ.css","/play/assets/Sheets-Drp99UBC.js","/play/assets/shell-DWz3zfJG.js","/play/assets/size2-C50Ndckd.js","/play/assets/sky-rhsY4L5v.js","/play/assets/SkyRecords-DYv8bFqg.js","/play/assets/SkyRecords-lTiU_hFx.css","/play/assets/slices-DZrzc4lX.js","/play/assets/snapshot-B6QYzhzh.js","/play/assets/SolveSheet-Dnfx4rDs.js","/play/assets/store-CJYEuLfM.js","/play/assets/store-elsXT-Ti.js","/play/assets/t-BohIz2A-.js","/play/assets/terrain.worker-CqBzxqHc.js","/play/assets/terrainCache-us76TUyH.js","/play/assets/text-By2tSSSD.js","/play/assets/three-DTSqHtj7.js","/play/assets/version-BYLMLwyo.js","/play/assets/viewControl-CZjtZnyC.js","/play/assets/WatchLayer-Bc55KKRV.css","/play/assets/WatchLayer-hH13naV8.js","/play/assets/wipeFlow-ngjI9Wam.js","/play/assets/wiping-C43ZGAKh.js","/play/assets/World-CYUgaVfz.js","/play/assets/World-DLN7Zsc5.css","/play/assets/worldHint-Bg9BQ8-e.js","/play/assets/WorldLeagues-DY3H0Xxa.js","/play/assets/WorldLink-CRUknf9f.js","/play/assets/worldModel-BTJdR51f.js","/play/assets/WorldWatch-DqbRXPKh.js","/play/icons/monochrome-432.png","/play/leaderboard-rules.html","/play/privacy.html"];
// Sidene i bygget som ikke er appen (for eksempel personvern.html eller lisenser.txt), som stier i adressen.
const PAGES = ["/play/leaderboard-rules.html","/play/lisenser.txt","/play/privacy.html"];
const ENTRY = "/play/assets/index-B3wQKBe1.js";
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
