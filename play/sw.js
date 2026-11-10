/* Kube – service worker, versjon f3ade1a9daa0 */
const BASE = "/play/";
// Navnet inneholder stien, så flere apper på samme domene (for eksempel github.io) ikke rydder hverandres lager.
const PREFIX = 'kube:' + BASE + ':';
const CACHE = PREFIX + 'f3ade1a9daa0';
const FILES = ["/play/index.html","/play/manifest.webmanifest","/play/icons/icon-192.png","/play/icons/maskable-192.png","/play/icons/apple-touch-icon.png","/play/icons/favicon-32.png","/play/assets/AboutSheet-DL2fcAbq.js","/play/assets/actions-De2FuiKQ.js","/play/assets/assemble-BIHyfXp9.js","/play/assets/bests-CTTyZ7aO.js","/play/assets/board-BhBGU_uc.js","/play/assets/cheat-D9yFaCLB.css","/play/assets/cheat-Dxjytn-U.js","/play/assets/clouds-C5OtG5hg.webp","/play/assets/cockpit-CwRPnvtW.js","/play/assets/cockpit-hDARFUH2.css","/play/assets/controls-CVUlTB9p.js","/play/assets/core-6Fox2abY.js","/play/assets/cube-iSAOp81T.js","/play/assets/debug-e29s2OK3.js","/play/assets/download-1KvkqjAV.js","/play/assets/duel-I0bRv1yw.css","/play/assets/DuelLayers-D-vzbnIs.js","/play/assets/earth-C7fLuAEU.js","/play/assets/earth-CvNxVQs_.webp","/play/assets/earthDownload-BcmQCmt2.js","/play/assets/earthLevels-CSK8qppi.js","/play/assets/earthTextures-Bw0YS96s.js","/play/assets/engine-RAnPGcXo.js","/play/assets/environment-KxcmyIln.js","/play/assets/facelets-CtRHj3-H.js","/play/assets/features-BWnSIfqY.js","/play/assets/feedback-BxpD2JrN.js","/play/assets/FeedbackSheet-DFXrr7kM.js","/play/assets/forest-Bxo4kRV7.js","/play/assets/format-CcNqnQmW.js","/play/assets/gps-B7bcf14N.css","/play/assets/GpsScreen-DtP78DDB.css","/play/assets/GpsScreen-Sxfc8Zfs.js","/play/assets/GuideCheck-Cq-vkdKX.js","/play/assets/helpShowsEdit-CXyRGU-H.js","/play/assets/identity-CpmICJDs.js","/play/assets/index-BGk-e59C.css","/play/assets/index-DQ6XiKMk.js","/play/assets/jetbrains-mono-latin-500-normal-BWZEU5yA.woff2","/play/assets/jetbrains-mono-latin-ext-500-normal-Cut-4mMH.woff2","/play/assets/JoinScreen-BL8xYpiw.js","/play/assets/keys-CA-94KRF.js","/play/assets/KTX2Loader-DPFYyMVZ.js","/play/assets/lang-C3O0t7o_.js","/play/assets/leave-fFGF8yiz.js","/play/assets/marks-DhD57rME.js","/play/assets/messages.nb-CrLVwonp.js","/play/assets/migrations-B2OdtFE1.js","/play/assets/MovePad-BUkVHUID.js","/play/assets/MovePad-q7KtqyIy.css","/play/assets/MoveSigns-DZ8O4-4o.js","/play/assets/moveText-BJI-1Pr_.js","/play/assets/MyReplay-CaiA-YZG.js","/play/assets/name-DwzOVzEQ.js","/play/assets/notation-CaTfMHiJ.js","/play/assets/ocean-CCs_4tww.js","/play/assets/orientation-Be_D1Qwf.js","/play/assets/paint-DzUczLoq.js","/play/assets/pending-BBRZu5Zb.js","/play/assets/placeCache-Bils8dln.js","/play/assets/plan-CNiqgNfB.js","/play/assets/PlayHelpRow-BrBr2chx.js","/play/assets/playPlan-D9wlQv-E.js","/play/assets/prefs-Cp4dko0q.js","/play/assets/preload-helper-6DGb1DyC.js","/play/assets/rankedFlow-CuxFFzbb.js","/play/assets/RankedScreen-BL0tND_I.js","/play/assets/RankedScreen-BvRUaKpJ.css","/play/assets/rankedSession-vHP7IIxC.js","/play/assets/react-DUz72-CK.js","/play/assets/realStart-yB2jIfS_.js","/play/assets/recognize-Deq9g4ol.js","/play/assets/replay-B86GcxDZ.js","/play/assets/replayDb-C6U2CxT7.js","/play/assets/replayLog-BZmcACTS.js","/play/assets/replays-BkCZ4CMZ.js","/play/assets/rolldown-runtime-XKyaHtl9.js","/play/assets/roundFlow-CdMGmMBn.js","/play/assets/rounds-Bk2NBpDt.js","/play/assets/ScanExperience-Cm-jr15u.js","/play/assets/ScanScreen-C1U1Mi44.css","/play/assets/ScanScreen-z_maVEwz.js","/play/assets/scene-K3fGiOqs.js","/play/assets/schibsted-grotesk-latin-500-normal-rf9C4Thp.woff2","/play/assets/schibsted-grotesk-latin-600-normal-Czv9Obfv.woff2","/play/assets/schibsted-grotesk-latin-700-normal-BkH0uJ1o.woff2","/play/assets/schibsted-grotesk-latin-800-normal-CIaq-TR1.woff2","/play/assets/schibsted-grotesk-latin-ext-500-normal-Ch1izu81.woff2","/play/assets/schibsted-grotesk-latin-ext-600-normal-C5pQPdUJ.woff2","/play/assets/schibsted-grotesk-latin-ext-700-normal-o210KhU4.woff2","/play/assets/schibsted-grotesk-latin-ext-800-normal-CZWJQj-F.woff2","/play/assets/scrambler-D-geKehz.js","/play/assets/scrambler.worker-BdiG_Bnn.js","/play/assets/scrambles-Zl24syBz.js","/play/assets/ScrambleSheet-C9xSe82-.js","/play/assets/ScramblesSheet-CuweoNCN.js","/play/assets/ScrambleView-DRkUvG4l.js","/play/assets/sea-CiXG2hjt.webp","/play/assets/session-Dwv5DYuJ.js","/play/assets/SettingsSheet-CMlPbOj6.js","/play/assets/shareCard-S9MvoosX.js","/play/assets/ShareSheet-D_a5F9BZ.css","/play/assets/ShareSheet-eOxEeXFW.js","/play/assets/Sheets-BfkUOvdK.js","/play/assets/shell-DWz3zfJG.js","/play/assets/sky-rhsY4L5v.js","/play/assets/SkyRecords-5FKcJYvU.css","/play/assets/SkyRecords-CVE1pm0P.js","/play/assets/slices-DZrzc4lX.js","/play/assets/snapshot-B6QYzhzh.js","/play/assets/SolveSheet-BretNfi1.js","/play/assets/store-BRe6-qbT.js","/play/assets/store-BZLe-Q-6.js","/play/assets/t-BohIz2A-.js","/play/assets/terrain.worker-CqBzxqHc.js","/play/assets/terrainCache-us76TUyH.js","/play/assets/text-BbxQ-Ih0.js","/play/assets/three-DTSqHtj7.js","/play/assets/version-DVbUBR2Q.js","/play/assets/viewControl-CZjtZnyC.js","/play/assets/WatchLayer-Bc55KKRV.css","/play/assets/WatchLayer-D6txTh0r.js","/play/assets/wipeFlow-gVuof8Y2.js","/play/assets/wiping-C43ZGAKh.js","/play/assets/World-BEwJSYMF.js","/play/assets/World-DLN7Zsc5.css","/play/assets/worldHint-Bg9BQ8-e.js","/play/assets/WorldLink-DYe49bZC.js","/play/assets/WorldWatch-51nb04XE.js","/play/icons/monochrome-432.png","/play/leaderboard-rules.html","/play/privacy.html"];
// Sidene i bygget som ikke er appen (for eksempel personvern.html eller lisenser.txt), som stier i adressen.
const PAGES = ["/play/leaderboard-rules.html","/play/lisenser.txt","/play/privacy.html"];
const ENTRY = "/play/assets/index-DQ6XiKMk.js";
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
