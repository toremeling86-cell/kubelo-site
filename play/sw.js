/* Kube – service worker, versjon efe3934fa05f */
const BASE = "/play/";
// Navnet inneholder stien, så flere apper på samme domene (for eksempel github.io) ikke rydder hverandres lager.
const PREFIX = 'kube:' + BASE + ':';
const CACHE = PREFIX + 'efe3934fa05f';
const FILES = ["/play/index.html","/play/manifest.webmanifest","/play/icons/icon-192.png","/play/icons/maskable-192.png","/play/icons/apple-touch-icon.png","/play/icons/favicon-32.png","/play/assets/AboutSheet-Dj1bf88R.js","/play/assets/actions-D1ZDiSsF.js","/play/assets/bandRoom-DxtqQgrq.js","/play/assets/bests-BmlFkfmt.js","/play/assets/board-DoV8Flkh.js","/play/assets/cheat-D9yFaCLB.css","/play/assets/clouds-C5OtG5hg.webp","/play/assets/cockpit-29RA0TnQ.css","/play/assets/cockpit-CL7bvT2m.js","/play/assets/contract-CsSLyXAm.js","/play/assets/controls-DvcWXluN.js","/play/assets/core-6Fox2abY.js","/play/assets/cube-iSAOp81T.js","/play/assets/debug-e29s2OK3.js","/play/assets/download-CmO0QBqH.js","/play/assets/duel-CuuhWITX.css","/play/assets/DuelLayers-BRv7AHch.js","/play/assets/earth-CvNxVQs_.webp","/play/assets/earth-CxWgY0w_.js","/play/assets/earthDownload-BLtLFSDC.js","/play/assets/earthLevels-CSK8qppi.js","/play/assets/earthTextures-Bw0YS96s.js","/play/assets/environment-KxcmyIln.js","/play/assets/facelets-CtRHj3-H.js","/play/assets/features-D4dUVg3H.js","/play/assets/FeedbackSheet-B00T6w8X.js","/play/assets/follow-DVBa_Gt_.js","/play/assets/forest-Bxo4kRV7.js","/play/assets/format-C0s9PluS.js","/play/assets/gps-B7bcf14N.css","/play/assets/GpsScreen-DtP78DDB.css","/play/assets/GpsScreen-YigK-m1f.js","/play/assets/GuideCheck-C9NE8p0s.js","/play/assets/helpShowsEdit-0MlZWKDy.js","/play/assets/identity-C-wlmO54.js","/play/assets/index-4zYyR1MB.css","/play/assets/index-9blZ_IwO.js","/play/assets/jetbrains-mono-latin-500-normal-BWZEU5yA.woff2","/play/assets/jetbrains-mono-latin-ext-500-normal-Cut-4mMH.woff2","/play/assets/JoinScreen-DoFmMxZf.js","/play/assets/keys-BMdKzqYR.js","/play/assets/KTX2Loader-DPFYyMVZ.js","/play/assets/lang-iCI_n6w9.js","/play/assets/leave-C8Q-5Fmn.js","/play/assets/marks-DhD57rME.js","/play/assets/messages.nb-CH8tsADM.js","/play/assets/migrations-BDDcBdKk.js","/play/assets/MovePad-BiSRF5Vy.js","/play/assets/MovePad-q7KtqyIy.css","/play/assets/MoveSigns-BSx5_hy0.js","/play/assets/moveText-BJI-1Pr_.js","/play/assets/MyReplay-DdeLYrbs.js","/play/assets/name-DwzOVzEQ.js","/play/assets/notation-CaTfMHiJ.js","/play/assets/ocean-CCs_4tww.js","/play/assets/orientation-Be_D1Qwf.js","/play/assets/paint-C0tA3WUd.js","/play/assets/pending-RTTgoRMC.js","/play/assets/placeCache-Bils8dln.js","/play/assets/plan-CNiqgNfB.js","/play/assets/PlayHelpRow-DBAgHt_O.js","/play/assets/playPlan-ChyJ3EY5.js","/play/assets/prefs-CH0Ywn_3.js","/play/assets/preload-helper-6DGb1DyC.js","/play/assets/ranked-BvRUaKpJ.css","/play/assets/ranked-CRb3OH_K.js","/play/assets/rankedFlow-Dbsg_Ygo.js","/play/assets/RankedScreen-uLnZgimc.js","/play/assets/rankedSession--COQthhx.js","/play/assets/rankedTwo-DR3GCC9c.js","/play/assets/react-CFYXFdqO.js","/play/assets/realStart-BuI9Qgv1.js","/play/assets/Recipe-DalO02dS.js","/play/assets/recognize-Deq9g4ol.js","/play/assets/replay-B86GcxDZ.js","/play/assets/replayDb-C6U2CxT7.js","/play/assets/replayLog-BZmcACTS.js","/play/assets/replays-Cuc74vKY.js","/play/assets/rolldown-runtime-XKyaHtl9.js","/play/assets/roundFlow-DMDz4ykk.js","/play/assets/roundMachine-CrklnpdL.js","/play/assets/rounds-Bk2NBpDt.js","/play/assets/RoundScreen-COT7dNDO.css","/play/assets/RoundScreen-_L-I2XrR.js","/play/assets/roundView-DGgznFA5.js","/play/assets/rules-DJUn4HCk.js","/play/assets/rules2-DpM_-6rs.js","/play/assets/Say-BGkXxuqN.js","/play/assets/scan-BiJO6iHN.js","/play/assets/ScanExperience-B5zFo_5p.js","/play/assets/ScanScreen-C1U1Mi44.css","/play/assets/ScanScreen-CrVghmRP.js","/play/assets/scene-BFirw9iS.js","/play/assets/schibsted-grotesk-latin-500-normal-rf9C4Thp.woff2","/play/assets/schibsted-grotesk-latin-600-normal-Czv9Obfv.woff2","/play/assets/schibsted-grotesk-latin-700-normal-BkH0uJ1o.woff2","/play/assets/schibsted-grotesk-latin-800-normal-CIaq-TR1.woff2","/play/assets/schibsted-grotesk-latin-ext-500-normal-Ch1izu81.woff2","/play/assets/schibsted-grotesk-latin-ext-600-normal-C5pQPdUJ.woff2","/play/assets/schibsted-grotesk-latin-ext-700-normal-o210KhU4.woff2","/play/assets/schibsted-grotesk-latin-ext-800-normal-CZWJQj-F.woff2","/play/assets/scrambler-C5ttbS3a.js","/play/assets/scrambler.worker-BdiG_Bnn.js","/play/assets/scrambles-C4Koz-kY.js","/play/assets/ScrambleSheet-zqtMSiJ3.js","/play/assets/ScramblesSheet-B4ryYll5.js","/play/assets/ScrambleSteps-6jyJVimS.css","/play/assets/ScrambleSteps-CSTxz6m9.js","/play/assets/ScrambleView-4e9veQZm.js","/play/assets/sea-CiXG2hjt.webp","/play/assets/SettingsSheet-C0RidEg-.js","/play/assets/shareCard-FVIb159K.js","/play/assets/ShareSheet-DBy7T3M_.js","/play/assets/ShareSheet-D_a5F9BZ.css","/play/assets/Sheets-BicOprN0.js","/play/assets/shell-CJWZtMIw.js","/play/assets/sky-rhsY4L5v.js","/play/assets/SkyRecords-BXAVxXcf.css","/play/assets/SkyRecords-CIjCxRyj.js","/play/assets/slices-DZrzc4lX.js","/play/assets/SmartCubeMount-C_Eo6Owh.js","/play/assets/SmartCubeMount-DNSu9C-J.css","/play/assets/snapshot-B6QYzhzh.js","/play/assets/SolveSheet-B2VJHcaI.js","/play/assets/store-B3kVKK3h.js","/play/assets/t-Cd8Kxzd7.js","/play/assets/terrain.worker-CqBzxqHc.js","/play/assets/terrainCache-us76TUyH.js","/play/assets/text-CCm2XZX4.js","/play/assets/text-CzImP66Y.js","/play/assets/three-DTSqHtj7.js","/play/assets/tokens-CVRN3UQW.js","/play/assets/version-D3Av_wg1.js","/play/assets/viewControl-CZjtZnyC.js","/play/assets/WatchLayer-Bc55KKRV.css","/play/assets/WatchLayer-wG1D2HLn.js","/play/assets/wipeFlow-CG6xMcRY.js","/play/assets/wiping-C43ZGAKh.js","/play/assets/World-BcYymXuP.css","/play/assets/World-DBolQvzv.js","/play/assets/worldHint-0wPCtkFP.js","/play/assets/WorldLeagues-BB28SFnj.js","/play/assets/WorldLink-D0U87qaZ.js","/play/assets/worldModel-DDayjyUW.js","/play/assets/worldNav-HRSbG_P6.js","/play/assets/WorldWatch-2Kmm_y04.js","/play/icons/monochrome-432.png","/play/leaderboard-rules.html","/play/privacy.html"];
// Sidene i bygget som ikke er appen (for eksempel personvern.html eller lisenser.txt), som stier i adressen.
const PAGES = ["/play/leaderboard-rules.html","/play/lisenser.txt","/play/privacy.html"];
const ENTRY = "/play/assets/index-9blZ_IwO.js";
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
