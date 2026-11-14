/* Kube – service worker, versjon 420a796157c5 */
const BASE = "/play/";
// Navnet inneholder stien, så flere apper på samme domene (for eksempel github.io) ikke rydder hverandres lager.
const PREFIX = 'kube:' + BASE + ':';
const CACHE = PREFIX + '420a796157c5';
const FILES = ["/play/index.html","/play/manifest.webmanifest","/play/icons/icon-192.png","/play/icons/maskable-192.png","/play/icons/apple-touch-icon.png","/play/icons/favicon-32.png","/play/assets/AboutSheet-DX7mZFXr.js","/play/assets/actions-BWV8YvnP.js","/play/assets/assemble-BIHyfXp9.js","/play/assets/bandRoom-7bTZFnbr.js","/play/assets/bests-DcLg10nw.js","/play/assets/board-DWAVcjSu.js","/play/assets/cheat-Ble6S1_0.js","/play/assets/cheat-D9yFaCLB.css","/play/assets/clouds-C5OtG5hg.webp","/play/assets/cockpit-BjcyJRWY.js","/play/assets/cockpit-hDARFUH2.css","/play/assets/controls-JMYGnL5q.js","/play/assets/core-6Fox2abY.js","/play/assets/cube-iSAOp81T.js","/play/assets/debug-e29s2OK3.js","/play/assets/download-CmO0QBqH.js","/play/assets/duel-I0bRv1yw.css","/play/assets/DuelLayers-DGE9w5vp.js","/play/assets/earth-CbgMGspb.js","/play/assets/earth-CvNxVQs_.webp","/play/assets/earthDownload-aEEvIp_X.js","/play/assets/earthLevels-CSK8qppi.js","/play/assets/earthTextures-Bw0YS96s.js","/play/assets/environment-KxcmyIln.js","/play/assets/facelets-CtRHj3-H.js","/play/assets/features-D4dUVg3H.js","/play/assets/FeedbackSheet-BjW42oMa.js","/play/assets/follow-Dv2G9Mvp.js","/play/assets/forest-Bxo4kRV7.js","/play/assets/format-BrvYcNnn.js","/play/assets/gps-B7bcf14N.css","/play/assets/GpsScreen-CEUtSQW-.js","/play/assets/GpsScreen-DtP78DDB.css","/play/assets/GuideCheck-QNsIPB-m.js","/play/assets/helpShowsEdit-DFrBErvW.js","/play/assets/identity-C-wlmO54.js","/play/assets/index-4zYyR1MB.css","/play/assets/index-CljxC7WM.js","/play/assets/jetbrains-mono-latin-500-normal-BWZEU5yA.woff2","/play/assets/jetbrains-mono-latin-ext-500-normal-Cut-4mMH.woff2","/play/assets/JoinScreen-BYHXxG_E.js","/play/assets/keys-BMdKzqYR.js","/play/assets/KTX2Loader-DPFYyMVZ.js","/play/assets/lang-h_C8Msts.js","/play/assets/leagues-BvbY0RI8.js","/play/assets/leave-BAvWqXgp.js","/play/assets/marks-DhD57rME.js","/play/assets/messages.nb-BmwBYzpy.js","/play/assets/migrations-BDDcBdKk.js","/play/assets/MovePad-bAmmp8U9.js","/play/assets/MovePad-q7KtqyIy.css","/play/assets/MoveSigns-BSx5_hy0.js","/play/assets/moveText-BJI-1Pr_.js","/play/assets/MyReplay-DuTgKnVt.js","/play/assets/name-DwzOVzEQ.js","/play/assets/notation-CaTfMHiJ.js","/play/assets/ocean-CCs_4tww.js","/play/assets/orientation-Be_D1Qwf.js","/play/assets/paint-CVdeW24V.js","/play/assets/pending-SHLAEOwv.js","/play/assets/placeCache-Bils8dln.js","/play/assets/plan-CNiqgNfB.js","/play/assets/PlayHelpRow-CLMu33dE.js","/play/assets/playPlan-ChyJ3EY5.js","/play/assets/prefs-DE4cmFow.js","/play/assets/preload-helper-6DGb1DyC.js","/play/assets/ranked-BvRUaKpJ.css","/play/assets/ranked-Du1dkzV5.js","/play/assets/rankedFlow-ByMaCviw.js","/play/assets/RankedScreen-DOT6XHXD.js","/play/assets/rankedSession-BI5LIF3y.js","/play/assets/rankedTwo-CmSuUKaC.js","/play/assets/react-CFYXFdqO.js","/play/assets/realStart-B6V5gPy_.js","/play/assets/recognize-Deq9g4ol.js","/play/assets/replay-B86GcxDZ.js","/play/assets/replayDb-C6U2CxT7.js","/play/assets/replayLog-BZmcACTS.js","/play/assets/replays-mXvb14FW.js","/play/assets/rolldown-runtime-XKyaHtl9.js","/play/assets/roundFlow-BG6EviAh.js","/play/assets/roundMachine-roeGEvO3.js","/play/assets/rounds-Bk2NBpDt.js","/play/assets/RoundScreen-COT7dNDO.css","/play/assets/RoundScreen-D837OXuQ.js","/play/assets/roundView-CMjwKhiQ.js","/play/assets/rules-DJUn4HCk.js","/play/assets/scan-BiJO6iHN.js","/play/assets/ScanExperience-DrIpRwW1.js","/play/assets/ScanScreen-C1U1Mi44.css","/play/assets/ScanScreen-D8sAyXU-.js","/play/assets/scene-wrwMC7XA.js","/play/assets/schibsted-grotesk-latin-500-normal-rf9C4Thp.woff2","/play/assets/schibsted-grotesk-latin-600-normal-Czv9Obfv.woff2","/play/assets/schibsted-grotesk-latin-700-normal-BkH0uJ1o.woff2","/play/assets/schibsted-grotesk-latin-800-normal-CIaq-TR1.woff2","/play/assets/schibsted-grotesk-latin-ext-500-normal-Ch1izu81.woff2","/play/assets/schibsted-grotesk-latin-ext-600-normal-C5pQPdUJ.woff2","/play/assets/schibsted-grotesk-latin-ext-700-normal-o210KhU4.woff2","/play/assets/schibsted-grotesk-latin-ext-800-normal-CZWJQj-F.woff2","/play/assets/scrambler-C5ttbS3a.js","/play/assets/scrambler.worker-BdiG_Bnn.js","/play/assets/scrambles-hf7jJqLt.js","/play/assets/ScrambleSheet-BeM34-g6.js","/play/assets/ScramblesSheet-Daro1XO7.js","/play/assets/ScrambleView-pqVOLb4b.js","/play/assets/sea-CiXG2hjt.webp","/play/assets/SettingsSheet-B6DwlMGj.js","/play/assets/shareCard-De2I3elH.js","/play/assets/ShareSheet-DU60k3df.js","/play/assets/ShareSheet-D_a5F9BZ.css","/play/assets/Sheets-CwRtGW52.js","/play/assets/shell-CJWZtMIw.js","/play/assets/sky-rhsY4L5v.js","/play/assets/SkyRecords-BXAVxXcf.css","/play/assets/SkyRecords-D0phUbbO.js","/play/assets/slices-DZrzc4lX.js","/play/assets/SmartCubeMount-B0hZ7VXa.css","/play/assets/SmartCubeMount-D53ipxf7.js","/play/assets/snapshot-B6QYzhzh.js","/play/assets/SolveSheet-D168LtYT.js","/play/assets/store-DdCxk6Hr.js","/play/assets/store-ELXFrO3l.js","/play/assets/t-BB32Po6P.js","/play/assets/terrain.worker-CqBzxqHc.js","/play/assets/terrainCache-us76TUyH.js","/play/assets/text-f2Tplgjy.js","/play/assets/text-IyDsa0du.js","/play/assets/three-DTSqHtj7.js","/play/assets/tokens-CVRN3UQW.js","/play/assets/version-XAGH5RTt.js","/play/assets/viewControl-CZjtZnyC.js","/play/assets/WatchLayer-Bc55KKRV.css","/play/assets/WatchLayer-D5zRGBwT.js","/play/assets/wipeFlow-BKe8sdGt.js","/play/assets/wiping-C43ZGAKh.js","/play/assets/World-BcYymXuP.css","/play/assets/World-Dx_8Rv3K.js","/play/assets/worldHint-D9iuH4Ew.js","/play/assets/WorldLeagues-BNIceJWC.js","/play/assets/WorldLink-Bey0kQvb.js","/play/assets/worldModel-7dIudZ9d.js","/play/assets/worldNav-CEHtdKJA.js","/play/assets/WorldWatch-Cp86oe10.js","/play/icons/monochrome-432.png","/play/leaderboard-rules.html","/play/privacy.html"];
// Sidene i bygget som ikke er appen (for eksempel personvern.html eller lisenser.txt), som stier i adressen.
const PAGES = ["/play/leaderboard-rules.html","/play/lisenser.txt","/play/privacy.html"];
const ENTRY = "/play/assets/index-CljxC7WM.js";
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
