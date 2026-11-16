/* Kube – service worker, versjon 618a4c8f7157 */
const BASE = "/play/";
// Navnet inneholder stien, så flere apper på samme domene (for eksempel github.io) ikke rydder hverandres lager.
const PREFIX = 'kube:' + BASE + ':';
const CACHE = PREFIX + '618a4c8f7157';
const FILES = ["/play/index.html","/play/manifest.webmanifest","/play/icons/icon-192.png","/play/icons/maskable-192.png","/play/icons/apple-touch-icon.png","/play/icons/favicon-32.png","/play/assets/AboutSheet-lOvbVYvg.js","/play/assets/actions-B6MQ0aqc.js","/play/assets/bandRoom-BOILwJ_R.js","/play/assets/bests-DXIsuIBr.js","/play/assets/board-ydf2bT5v.js","/play/assets/cheat-D9yFaCLB.css","/play/assets/clouds-C5OtG5hg.webp","/play/assets/cockpit-29RA0TnQ.css","/play/assets/cockpit-CL7bvT2m.js","/play/assets/contract-CsSLyXAm.js","/play/assets/controls-DvcWXluN.js","/play/assets/core-6Fox2abY.js","/play/assets/cube-iSAOp81T.js","/play/assets/debug-e29s2OK3.js","/play/assets/download-CmO0QBqH.js","/play/assets/duel-CuuhWITX.css","/play/assets/DuelLayers-3iWnhl1-.js","/play/assets/earth-Cg7YvNPw.js","/play/assets/earth-CvNxVQs_.webp","/play/assets/earthDownload-BfYQETzy.js","/play/assets/earthLevels-CSK8qppi.js","/play/assets/earthTextures-Bw0YS96s.js","/play/assets/environment-KxcmyIln.js","/play/assets/facelets-CtRHj3-H.js","/play/assets/features-D4dUVg3H.js","/play/assets/FeedbackSheet-Ccp4T8xr.js","/play/assets/follow-CodhcMhf.js","/play/assets/forest-Bxo4kRV7.js","/play/assets/format-DPNbJcQL.js","/play/assets/gps-B7bcf14N.css","/play/assets/GpsScreen-BWbw6s0p.js","/play/assets/GpsScreen-DtP78DDB.css","/play/assets/GuideCheck-w-WQBEL6.js","/play/assets/helpShowsEdit-B2XmMefi.js","/play/assets/identity-C-wlmO54.js","/play/assets/index-4zYyR1MB.css","/play/assets/index-EBSy33ey.js","/play/assets/jetbrains-mono-latin-500-normal-BWZEU5yA.woff2","/play/assets/jetbrains-mono-latin-ext-500-normal-Cut-4mMH.woff2","/play/assets/JoinScreen-D_vCYUh9.js","/play/assets/keys-BMdKzqYR.js","/play/assets/KTX2Loader-DPFYyMVZ.js","/play/assets/lang-DyXZ4AgC.js","/play/assets/leave-BghP8Z-E.js","/play/assets/listName-C3_wCdO4.js","/play/assets/marks-DhD57rME.js","/play/assets/messages.nb-CH8tsADM.js","/play/assets/migrations-GyIKsqe5.js","/play/assets/MovePad-CO_2Apky.js","/play/assets/MovePad-q7KtqyIy.css","/play/assets/MoveSigns-BSx5_hy0.js","/play/assets/moveText-BJI-1Pr_.js","/play/assets/MyReplay-C_cO9GiA.js","/play/assets/name-DwzOVzEQ.js","/play/assets/notation-CaTfMHiJ.js","/play/assets/ocean-CCs_4tww.js","/play/assets/orientation-Be_D1Qwf.js","/play/assets/paint-1Y5kZ9Ag.js","/play/assets/pending-CDmhMY5I.js","/play/assets/placeCache-Bils8dln.js","/play/assets/plan-CNiqgNfB.js","/play/assets/PlayHelpRow-CoT91Mbv.js","/play/assets/playPlan-ChyJ3EY5.js","/play/assets/prefs-DjBNJ4rd.js","/play/assets/preload-helper-6DGb1DyC.js","/play/assets/ranked-B9k0c_cG.css","/play/assets/ranked-I8bP3zPZ.js","/play/assets/rankedFlow-Db3xQGaY.js","/play/assets/RankedScreen-DkKYB16h.js","/play/assets/rankedSession-dn62bueK.js","/play/assets/rankedTwo-BT0e8aF4.js","/play/assets/react-CFYXFdqO.js","/play/assets/realStart-DC12GCph.js","/play/assets/Recipe-COrlW3ol.js","/play/assets/recognize-Deq9g4ol.js","/play/assets/replay-B86GcxDZ.js","/play/assets/replayDb-C6U2CxT7.js","/play/assets/replayLog-BZmcACTS.js","/play/assets/replays-e81zkDhn.js","/play/assets/rolldown-runtime-XKyaHtl9.js","/play/assets/roundFlow-BEhDRPC3.js","/play/assets/roundMachine-D0ILZL7i.js","/play/assets/rounds-Bk2NBpDt.js","/play/assets/RoundScreen-COT7dNDO.css","/play/assets/RoundScreen-CRHnSoNK.js","/play/assets/roundView-1ATKlqAa.js","/play/assets/rules-DJUn4HCk.js","/play/assets/rules2-DpM_-6rs.js","/play/assets/Say-96j_qY5J.js","/play/assets/scan-BiJO6iHN.js","/play/assets/ScanExperience-Ch61D2q4.js","/play/assets/ScanScreen-C1U1Mi44.css","/play/assets/ScanScreen-CtuFN9LW.js","/play/assets/scene-D-pQv89o.js","/play/assets/schibsted-grotesk-latin-500-normal-rf9C4Thp.woff2","/play/assets/schibsted-grotesk-latin-600-normal-Czv9Obfv.woff2","/play/assets/schibsted-grotesk-latin-700-normal-BkH0uJ1o.woff2","/play/assets/schibsted-grotesk-latin-800-normal-CIaq-TR1.woff2","/play/assets/schibsted-grotesk-latin-ext-500-normal-Ch1izu81.woff2","/play/assets/schibsted-grotesk-latin-ext-600-normal-C5pQPdUJ.woff2","/play/assets/schibsted-grotesk-latin-ext-700-normal-o210KhU4.woff2","/play/assets/schibsted-grotesk-latin-ext-800-normal-CZWJQj-F.woff2","/play/assets/scrambler-C5ttbS3a.js","/play/assets/scrambler.worker-BdiG_Bnn.js","/play/assets/scrambles-C4Koz-kY.js","/play/assets/ScrambleSheet-oQXPYIvt.js","/play/assets/ScramblesSheet-NU-TFSVC.js","/play/assets/ScrambleSteps-6jyJVimS.css","/play/assets/ScrambleSteps-DVTo4rQk.js","/play/assets/ScrambleView-CrlgtkAK.js","/play/assets/sea-CiXG2hjt.webp","/play/assets/SettingsSheet-Ey543dsN.js","/play/assets/shareCard-C8y0fMHn.js","/play/assets/ShareSheet-ASZ0iT_F.js","/play/assets/ShareSheet-D_a5F9BZ.css","/play/assets/Sheets-CFTPMOOU.js","/play/assets/shell-CJWZtMIw.js","/play/assets/sky-rhsY4L5v.js","/play/assets/SkyRecords-D5oIFJcV.css","/play/assets/SkyRecords-Dt54IPC1.js","/play/assets/slices-DZrzc4lX.js","/play/assets/SmartCubeMount-BK4aXlSB.js","/play/assets/SmartCubeMount-DNSu9C-J.css","/play/assets/snapshot-B6QYzhzh.js","/play/assets/SolveSheet-DRz9pbcP.js","/play/assets/store-2ohQbsF4.js","/play/assets/t-646yacOI.js","/play/assets/terrain.worker-CqBzxqHc.js","/play/assets/terrainCache-us76TUyH.js","/play/assets/text-Bjat__5Q.js","/play/assets/text-CCm2XZX4.js","/play/assets/three-DTSqHtj7.js","/play/assets/tokens-CVRN3UQW.js","/play/assets/version-Cr7Ac1Pd.js","/play/assets/viewControl-CZjtZnyC.js","/play/assets/WatchLayer-Bc55KKRV.css","/play/assets/WatchLayer-BPsj1KWy.js","/play/assets/wipeFlow-_KpdptEl.js","/play/assets/wiping-C43ZGAKh.js","/play/assets/World-bC8pdtJ2.css","/play/assets/World-Da3W0Dr-.js","/play/assets/worldHint-_vQIgNxi.js","/play/assets/WorldLeagues-CGPpTzCz.js","/play/assets/WorldLink-ClIDrDN0.js","/play/assets/worldModel-4MLBv7wL.js","/play/assets/worldNav-BIZqierT.js","/play/assets/WorldWatch-BH1BKvVs.js","/play/icons/monochrome-432.png","/play/leaderboard-rules.html","/play/privacy.html"];
// Sidene i bygget som ikke er appen (for eksempel personvern.html eller lisenser.txt), som stier i adressen.
const PAGES = ["/play/leaderboard-rules.html","/play/lisenser.txt","/play/privacy.html"];
const ENTRY = "/play/assets/index-EBSy33ey.js";
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
