/* Kube – service worker, versjon 9e5b6fd5c460 */
const BASE = "/play/";
// Navnet inneholder stien, så flere apper på samme domene (for eksempel github.io) ikke rydder hverandres lager.
const PREFIX = 'kube:' + BASE + ':';
const CACHE = PREFIX + '9e5b6fd5c460';
const FILES = ["/play/index.html","/play/manifest.webmanifest","/play/icons/icon-192.png","/play/icons/maskable-192.png","/play/icons/apple-touch-icon.png","/play/icons/favicon-32.png","/play/assets/AboutSheet-IZHgWw0F.js","/play/assets/actions-CD6mcEy8.js","/play/assets/assemble-BIHyfXp9.js","/play/assets/bests-ByGUsC_W.js","/play/assets/board-BhBGU_uc.js","/play/assets/cheat-CWrOS256.js","/play/assets/cheat-D9yFaCLB.css","/play/assets/clouds-C5OtG5hg.webp","/play/assets/cockpit-BfoUprsC.js","/play/assets/cockpit-CeXwegLD.css","/play/assets/controls-CDByxIjy.js","/play/assets/core-6Fox2abY.js","/play/assets/cube-iSAOp81T.js","/play/assets/debug-e29s2OK3.js","/play/assets/duel-I0bRv1yw.css","/play/assets/DuelLayers-DipXJwYd.js","/play/assets/earth-Bh9Olzfj.js","/play/assets/earth-CvNxVQs_.webp","/play/assets/earthDownload-Bj0p8iCG.js","/play/assets/earthLevels-CSK8qppi.js","/play/assets/earthTextures-Bw0YS96s.js","/play/assets/engine-CnnDReGV.js","/play/assets/environment-KxcmyIln.js","/play/assets/facelets-CtRHj3-H.js","/play/assets/features-Bt-1FL1b.js","/play/assets/feedback-DghntjsL.js","/play/assets/FeedbackSheet-4-RGuLOv.js","/play/assets/forest-Bxo4kRV7.js","/play/assets/format-XZdDR9vo.js","/play/assets/gps-sUGouh5b.css","/play/assets/GpsScreen-DtP78DDB.css","/play/assets/GpsScreen-DuT3iZLn.js","/play/assets/GuideCheck-B_dPML_6.js","/play/assets/helpShowsEdit-B92YXdaN.js","/play/assets/identity-C19oHWEP.js","/play/assets/index-Bv6GsA73.css","/play/assets/index-BZMmMpSN.js","/play/assets/jetbrains-mono-latin-500-normal-BWZEU5yA.woff2","/play/assets/jetbrains-mono-latin-ext-500-normal-Cut-4mMH.woff2","/play/assets/JoinScreen-DY0XsXR2.js","/play/assets/keys-DQ4KKp-W.js","/play/assets/KTX2Loader-DPFYyMVZ.js","/play/assets/lang-DivIat2e.js","/play/assets/leave-DoOyQKD4.js","/play/assets/marks-DhD57rME.js","/play/assets/messages.nb-BMQCpGlt.js","/play/assets/migrations-D_YVxBEw.js","/play/assets/MovePad-DnAsd-FS.js","/play/assets/MovePad-q7KtqyIy.css","/play/assets/MoveSigns-DZ8O4-4o.js","/play/assets/moveText-BJI-1Pr_.js","/play/assets/MyReplay-BCO3RNH6.js","/play/assets/notation-CaTfMHiJ.js","/play/assets/ocean-CCs_4tww.js","/play/assets/orientation-Be_D1Qwf.js","/play/assets/paint-sD8Nf9KP.js","/play/assets/pending-xRNzd1Lk.js","/play/assets/placeCache-Bils8dln.js","/play/assets/plan-D8jPzu5m.js","/play/assets/PlayHelpRow-pliRG9wY.js","/play/assets/playPlan-ByflTqv5.js","/play/assets/prefs-r3Rvkw9Z.js","/play/assets/preload-helper-6DGb1DyC.js","/play/assets/rankedFlow-CxuZZszp.js","/play/assets/RankedScreen-BvRUaKpJ.css","/play/assets/RankedScreen-Tm8Yikh2.js","/play/assets/react-DUz72-CK.js","/play/assets/realStart-BUFTaBjK.js","/play/assets/recognize-Deq9g4ol.js","/play/assets/replay-B86GcxDZ.js","/play/assets/replayDb-C6U2CxT7.js","/play/assets/replayLog-BZmcACTS.js","/play/assets/replays-BShCpguJ.js","/play/assets/retiredSettings-C6RQ2_0F.js","/play/assets/rolldown-runtime-XKyaHtl9.js","/play/assets/scan-DQ0nZx4K.js","/play/assets/ScanExperience-C1quaZP-.js","/play/assets/ScanScreen-k09YTq9J.css","/play/assets/ScanScreen-PjBxbDAP.js","/play/assets/scene-DV-nNL5P.js","/play/assets/schibsted-grotesk-latin-500-normal-rf9C4Thp.woff2","/play/assets/schibsted-grotesk-latin-600-normal-Czv9Obfv.woff2","/play/assets/schibsted-grotesk-latin-700-normal-BkH0uJ1o.woff2","/play/assets/schibsted-grotesk-latin-800-normal-CIaq-TR1.woff2","/play/assets/schibsted-grotesk-latin-ext-500-normal-Ch1izu81.woff2","/play/assets/schibsted-grotesk-latin-ext-600-normal-C5pQPdUJ.woff2","/play/assets/schibsted-grotesk-latin-ext-700-normal-o210KhU4.woff2","/play/assets/schibsted-grotesk-latin-ext-800-normal-CZWJQj-F.woff2","/play/assets/scrambler-D-geKehz.js","/play/assets/scrambler.worker-BdiG_Bnn.js","/play/assets/scrambles-YWBRrCsD.js","/play/assets/ScrambleSheet-jA-10JFy.js","/play/assets/ScramblesSheet-DA0ftaFZ.js","/play/assets/ScrambleView-ClAe_y1f.js","/play/assets/sea-CiXG2hjt.webp","/play/assets/session-Dwv5DYuJ.js","/play/assets/SettingsSheet-c2ifI_gr.js","/play/assets/shareCard-DI9YYERc.js","/play/assets/ShareSheet-D_a5F9BZ.css","/play/assets/ShareSheet-LWn39A6w.js","/play/assets/Sheets-BT_OLape.js","/play/assets/sky-rhsY4L5v.js","/play/assets/SkyRecords-5FKcJYvU.css","/play/assets/SkyRecords-zjCVdLwk.js","/play/assets/slices-DZrzc4lX.js","/play/assets/snapshot-B6QYzhzh.js","/play/assets/SolveSheet-Bh_gvutw.js","/play/assets/store-BjzQY--P.js","/play/assets/store-D6w_8W-b.js","/play/assets/t-XC9q46yd.js","/play/assets/terrain.worker-CqBzxqHc.js","/play/assets/terrainCache-us76TUyH.js","/play/assets/text-CD5DFKdV.js","/play/assets/three-DTSqHtj7.js","/play/assets/viewControl-CZjtZnyC.js","/play/assets/WatchLayer-Bn4hIizE.css","/play/assets/WatchLayer-C8-tHLXv.js","/play/assets/wipeFlow-DkRMBuVT.js","/play/assets/wiping-C43ZGAKh.js","/play/assets/World-BNde0Q__.js","/play/assets/World-DLN7Zsc5.css","/play/assets/worldHint-CDctuaI0.js","/play/assets/WorldLink-CxcFA0XE.js","/play/assets/WorldWatch-DXGjr4ie.js","/play/icons/monochrome-432.png","/play/leaderboard-rules.html","/play/privacy.html"];
// Sidene i bygget som ikke er appen (for eksempel personvern.html eller lisenser.txt), som stier i adressen.
const PAGES = ["/play/leaderboard-rules.html","/play/lisenser.txt","/play/privacy.html"];
const ENTRY = "/play/assets/index-BZMmMpSN.js";
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
