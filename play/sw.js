/* Kube – service worker, versjon 9ece8e13d4a9 */
const BASE = "/play/";
// Navnet inneholder stien, så flere apper på samme domene (for eksempel github.io) ikke rydder hverandres lager.
const PREFIX = 'kube:' + BASE + ':';
const CACHE = PREFIX + '9ece8e13d4a9';
const FILES = ["/play/index.html","/play/manifest.webmanifest","/play/icons/icon-192.png","/play/icons/maskable-192.png","/play/icons/apple-touch-icon.png","/play/icons/favicon-32.png","/play/assets/AboutSheet-D8MmxJMl.js","/play/assets/actions-CyEOi5hM.js","/play/assets/assemble-BIHyfXp9.js","/play/assets/bests-uQBcvECk.js","/play/assets/board-BtbZPtdB.js","/play/assets/cheat-D9yFaCLB.css","/play/assets/cheat-DugnEWYP.js","/play/assets/clouds-C5OtG5hg.webp","/play/assets/cockpit-CwRPnvtW.js","/play/assets/cockpit-hDARFUH2.css","/play/assets/controls-CVUlTB9p.js","/play/assets/core-6Fox2abY.js","/play/assets/cube-iSAOp81T.js","/play/assets/debug-e29s2OK3.js","/play/assets/download-1KvkqjAV.js","/play/assets/duel-I0bRv1yw.css","/play/assets/DuelLayers-DtgntWBc.js","/play/assets/earth-Cca0UNWb.js","/play/assets/earth-CvNxVQs_.webp","/play/assets/earthDownload-D3nPCqEh.js","/play/assets/earthLevels-CSK8qppi.js","/play/assets/earthTextures-Bw0YS96s.js","/play/assets/engine-DWUTqrgG.js","/play/assets/environment-KxcmyIln.js","/play/assets/facelets-CtRHj3-H.js","/play/assets/features-BWnSIfqY.js","/play/assets/feedback-BxpD2JrN.js","/play/assets/FeedbackSheet-D3MIDTmd.js","/play/assets/follow-7f1psiQv.js","/play/assets/forest-Bxo4kRV7.js","/play/assets/format-DzMJ8bGz.js","/play/assets/gps-B7bcf14N.css","/play/assets/GpsScreen-DtP78DDB.css","/play/assets/GpsScreen-TSztvP72.js","/play/assets/GuideCheck-BZZhqcmi.js","/play/assets/helpShowsEdit-BImpAIYb.js","/play/assets/identity-CpmICJDs.js","/play/assets/index-4zYyR1MB.css","/play/assets/index-DFvUL8Cu.js","/play/assets/jetbrains-mono-latin-500-normal-BWZEU5yA.woff2","/play/assets/jetbrains-mono-latin-ext-500-normal-Cut-4mMH.woff2","/play/assets/JoinScreen-goTsng9-.js","/play/assets/keys-CA-94KRF.js","/play/assets/KTX2Loader-DPFYyMVZ.js","/play/assets/lang-C3O0t7o_.js","/play/assets/leagues-Ddfz05fo.js","/play/assets/leave-Curkc0pF.js","/play/assets/marks-DhD57rME.js","/play/assets/messages.nb-BsxWGdVZ.js","/play/assets/migrations-B2OdtFE1.js","/play/assets/MovePad-CFZ_t4yW.js","/play/assets/MovePad-q7KtqyIy.css","/play/assets/MoveSigns-DZ8O4-4o.js","/play/assets/moveText-BJI-1Pr_.js","/play/assets/MyReplay-CPulQXfk.js","/play/assets/name-DwzOVzEQ.js","/play/assets/notation-CaTfMHiJ.js","/play/assets/ocean-CCs_4tww.js","/play/assets/orientation-Be_D1Qwf.js","/play/assets/paint-DvChsNs0.js","/play/assets/pending-B4yHVaL8.js","/play/assets/placeCache-Bils8dln.js","/play/assets/plan-CNiqgNfB.js","/play/assets/PlayHelpRow-BnhNTP0H.js","/play/assets/playPlan-ChyJ3EY5.js","/play/assets/prefs-Cp4dko0q.js","/play/assets/preload-helper-6DGb1DyC.js","/play/assets/ranked-BvRUaKpJ.css","/play/assets/ranked-Cd-2FObV.js","/play/assets/rankedFlow-DV43Y9MF.js","/play/assets/RankedScreen-B6ng0xjF.js","/play/assets/rankedSession-C3ZmQKff.js","/play/assets/rankedTwo-Djiwjrba.js","/play/assets/react-DUz72-CK.js","/play/assets/realStart-ByAtiwcL.js","/play/assets/recognize-Deq9g4ol.js","/play/assets/replay-B86GcxDZ.js","/play/assets/replayDb-C6U2CxT7.js","/play/assets/replayLog-BZmcACTS.js","/play/assets/replays-Ctju0gQa.js","/play/assets/rolldown-runtime-XKyaHtl9.js","/play/assets/roundFlow-CTBHBwfL.js","/play/assets/roundMachine-cRXNAUmw.js","/play/assets/rounds-Bk2NBpDt.js","/play/assets/RoundScreen-BkzMwZ6x.js","/play/assets/RoundScreen-C6YAvmPi.css","/play/assets/roundView-DNnjMQFU.js","/play/assets/rules-DJUn4HCk.js","/play/assets/ScanExperience-Bc6xrZC1.js","/play/assets/ScanScreen-C1U1Mi44.css","/play/assets/ScanScreen-DYhSSubd.js","/play/assets/scene-nlBhjGvf.js","/play/assets/schibsted-grotesk-latin-500-normal-rf9C4Thp.woff2","/play/assets/schibsted-grotesk-latin-600-normal-Czv9Obfv.woff2","/play/assets/schibsted-grotesk-latin-700-normal-BkH0uJ1o.woff2","/play/assets/schibsted-grotesk-latin-800-normal-CIaq-TR1.woff2","/play/assets/schibsted-grotesk-latin-ext-500-normal-Ch1izu81.woff2","/play/assets/schibsted-grotesk-latin-ext-600-normal-C5pQPdUJ.woff2","/play/assets/schibsted-grotesk-latin-ext-700-normal-o210KhU4.woff2","/play/assets/schibsted-grotesk-latin-ext-800-normal-CZWJQj-F.woff2","/play/assets/scrambler-D-geKehz.js","/play/assets/scrambler.worker-BdiG_Bnn.js","/play/assets/scrambles-Zl24syBz.js","/play/assets/ScrambleSheet-JwcS_Pi-.js","/play/assets/ScramblesSheet-DEgLh8-i.js","/play/assets/ScrambleView-DhImp0oS.js","/play/assets/sea-CiXG2hjt.webp","/play/assets/session-Dwv5DYuJ.js","/play/assets/SettingsSheet-CIBisykA.js","/play/assets/shareCard-jgirMMzo.js","/play/assets/ShareSheet-C8soyCpm.js","/play/assets/ShareSheet-D_a5F9BZ.css","/play/assets/Sheets-B4HYvk4s.js","/play/assets/shell-DWz3zfJG.js","/play/assets/sky-rhsY4L5v.js","/play/assets/SkyRecords-BBt4AyyS.js","/play/assets/SkyRecords-CrBGV_z8.css","/play/assets/slices-DZrzc4lX.js","/play/assets/snapshot-B6QYzhzh.js","/play/assets/SolveSheet-C76gvCeW.js","/play/assets/store-CNIzewK8.js","/play/assets/store-D7pn1pzU.js","/play/assets/t-MrJ3MSS3.js","/play/assets/terrain.worker-CqBzxqHc.js","/play/assets/terrainCache-us76TUyH.js","/play/assets/text-BvRrySfF.js","/play/assets/three-DTSqHtj7.js","/play/assets/version-CtJzmu2O.js","/play/assets/viewControl-CZjtZnyC.js","/play/assets/WatchLayer-B43c-nRK.js","/play/assets/WatchLayer-Bc55KKRV.css","/play/assets/wipeFlow-BY8wrXlI.js","/play/assets/wiping-C43ZGAKh.js","/play/assets/World-DLN7Zsc5.css","/play/assets/World-z9qBposj.js","/play/assets/worldHint-Bg9BQ8-e.js","/play/assets/WorldLeagues-DXauIdG3.js","/play/assets/WorldLink-B3n4E1zO.js","/play/assets/worldModel-EFaTWLSC.js","/play/assets/worldNav-qbwAXgpZ.js","/play/assets/WorldWatch-KntdRFH4.js","/play/icons/monochrome-432.png","/play/leaderboard-rules.html","/play/privacy.html"];
// Sidene i bygget som ikke er appen (for eksempel personvern.html eller lisenser.txt), som stier i adressen.
const PAGES = ["/play/leaderboard-rules.html","/play/lisenser.txt","/play/privacy.html"];
const ENTRY = "/play/assets/index-DFvUL8Cu.js";
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
