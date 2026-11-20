/* Kube – service worker, versjon d6496a9b0bf3 */
const BASE = "/play/";
// Navnet inneholder stien, så flere apper på samme domene (for eksempel github.io) ikke rydder hverandres lager.
const PREFIX = 'kube:' + BASE + ':';
const CACHE = PREFIX + 'd6496a9b0bf3';
const FILES = ["/play/index.html","/play/manifest.webmanifest","/play/icons/icon-192.png","/play/icons/maskable-192.png","/play/icons/apple-touch-icon.png","/play/icons/favicon-32.png","/play/assets/AboutSheet-BfyhAktg.js","/play/assets/actions-B7rWijZe.js","/play/assets/bandRoom-C7MvcNzR.js","/play/assets/bests-d2DJ6m5s.js","/play/assets/board-B-AWeD0U.js","/play/assets/cheat-D9yFaCLB.css","/play/assets/clouds-C5OtG5hg.webp","/play/assets/cockpit-29RA0TnQ.css","/play/assets/cockpit-CL7bvT2m.js","/play/assets/contract-CsSLyXAm.js","/play/assets/controls-DvcWXluN.js","/play/assets/core-6Fox2abY.js","/play/assets/cube-iSAOp81T.js","/play/assets/debug-e29s2OK3.js","/play/assets/download-CmO0QBqH.js","/play/assets/duel-CuuhWITX.css","/play/assets/DuelLayers-CrkmVh-x.js","/play/assets/earth-CvNxVQs_.webp","/play/assets/earth-LVQXOTSa.js","/play/assets/earthDownload-BMxVHn9V.js","/play/assets/earthLevels-CSK8qppi.js","/play/assets/earthTextures-Bw0YS96s.js","/play/assets/environment-KxcmyIln.js","/play/assets/facelets-CtRHj3-H.js","/play/assets/FailedBody-BLJgOrDh.js","/play/assets/features-D4dUVg3H.js","/play/assets/FeedbackSheet-Cc17ZYtH.js","/play/assets/follow-BuYuYe7p.js","/play/assets/forest-Bxo4kRV7.js","/play/assets/format-DEHL0HMI.js","/play/assets/gps-B7bcf14N.css","/play/assets/GpsScreen-C0hPFgdw.js","/play/assets/GpsScreen-DtP78DDB.css","/play/assets/GuideCheck-BmwXnDR8.js","/play/assets/helpShowsEdit-s_wfp7hH.js","/play/assets/identity-C-wlmO54.js","/play/assets/index-CbjFc9Mc.css","/play/assets/index-D_-B8JlO.js","/play/assets/jetbrains-mono-latin-500-normal-BWZEU5yA.woff2","/play/assets/jetbrains-mono-latin-ext-500-normal-Cut-4mMH.woff2","/play/assets/JoinScreen-4ybGwG-1.js","/play/assets/keyHints-BuJw964z.js","/play/assets/keys-BMdKzqYR.js","/play/assets/KTX2Loader-DPFYyMVZ.js","/play/assets/lang-DyXZ4AgC.js","/play/assets/leave-CtyOpkmN.js","/play/assets/listName-7GGtoBLq.js","/play/assets/marks-DhD57rME.js","/play/assets/messages.nb-Bj6OcHe3.js","/play/assets/migrations-GyIKsqe5.js","/play/assets/MovePad-6hFB1aSW.js","/play/assets/MovePad-q7KtqyIy.css","/play/assets/MoveSigns-BSx5_hy0.js","/play/assets/moveText-BJI-1Pr_.js","/play/assets/MyReplay-C7H1b176.js","/play/assets/name-DwzOVzEQ.js","/play/assets/notation-CaTfMHiJ.js","/play/assets/ocean-CCs_4tww.js","/play/assets/orientation-Be_D1Qwf.js","/play/assets/paint-DEzMCUF5.js","/play/assets/pending-DNnMB0I-.js","/play/assets/place-G67ufcJp.js","/play/assets/placeCache-Bils8dln.js","/play/assets/plan-CNiqgNfB.js","/play/assets/PlayHelpRow-DCIEUktF.js","/play/assets/playPlan-ChyJ3EY5.js","/play/assets/prefs-DjBNJ4rd.js","/play/assets/preload-helper-6DGb1DyC.js","/play/assets/ranked-B9k0c_cG.css","/play/assets/ranked-F3SLK12_.js","/play/assets/rankedFlow-CMXxqzGx.js","/play/assets/RankedScreen-P6ugMVDF.js","/play/assets/rankedSession-p9z4FOyp.js","/play/assets/rankedTwo-apeW4N4J.js","/play/assets/react-CFYXFdqO.js","/play/assets/realStart-Dc170ATK.js","/play/assets/Recipe-OA00z8Ro.js","/play/assets/recognize-Deq9g4ol.js","/play/assets/replay-B86GcxDZ.js","/play/assets/replayDb-C6U2CxT7.js","/play/assets/replayLog-BZmcACTS.js","/play/assets/replays-nW7ESvdd.js","/play/assets/rolldown-runtime-XKyaHtl9.js","/play/assets/roundFlow-BAodvHaI.js","/play/assets/roundMachine-BZpDZMwc.js","/play/assets/rounds-Bk2NBpDt.js","/play/assets/RoundScreen-C2k9_Nob.js","/play/assets/RoundScreen-COT7dNDO.css","/play/assets/roundView-DSQLbKzf.js","/play/assets/rules-DJUn4HCk.js","/play/assets/rules2-DpM_-6rs.js","/play/assets/Say-CInayPnF.js","/play/assets/scan-BiJO6iHN.js","/play/assets/ScanExperience-DkRb-m4G.js","/play/assets/ScanScreen-C1U1Mi44.css","/play/assets/ScanScreen-DOFrdAf0.js","/play/assets/scene-DziwvpRB.js","/play/assets/schibsted-grotesk-latin-500-normal-rf9C4Thp.woff2","/play/assets/schibsted-grotesk-latin-600-normal-Czv9Obfv.woff2","/play/assets/schibsted-grotesk-latin-700-normal-BkH0uJ1o.woff2","/play/assets/schibsted-grotesk-latin-800-normal-CIaq-TR1.woff2","/play/assets/schibsted-grotesk-latin-ext-500-normal-Ch1izu81.woff2","/play/assets/schibsted-grotesk-latin-ext-600-normal-C5pQPdUJ.woff2","/play/assets/schibsted-grotesk-latin-ext-700-normal-o210KhU4.woff2","/play/assets/schibsted-grotesk-latin-ext-800-normal-CZWJQj-F.woff2","/play/assets/scrambler-C5ttbS3a.js","/play/assets/scrambler.worker-BdiG_Bnn.js","/play/assets/scrambles-iUtASCCJ.js","/play/assets/ScrambleSheet-CgtZNb9F.js","/play/assets/ScramblesSheet-C5m6RZbI.js","/play/assets/ScrambleSteps-6jyJVimS.css","/play/assets/ScrambleSteps-Cdz5Hamh.js","/play/assets/ScrambleView-DDR3d2Ax.js","/play/assets/sea-CiXG2hjt.webp","/play/assets/SettingsSheet-vvpV58mf.js","/play/assets/shareCard-DJB2gJ71.js","/play/assets/ShareSheet-B2OA9em6.js","/play/assets/ShareSheet-D_a5F9BZ.css","/play/assets/Sheets-DeyC449R.js","/play/assets/shell-CJWZtMIw.js","/play/assets/sky-rhsY4L5v.js","/play/assets/SkyRecords-6wtOpbOf.js","/play/assets/SkyRecords-D5oIFJcV.css","/play/assets/slices-DZrzc4lX.js","/play/assets/SmartCubeMount-C9Md2SHm.js","/play/assets/SmartCubeMount-DNSu9C-J.css","/play/assets/SmartOffer-Bg5MZJkP.css","/play/assets/SmartOffer-Cx_r48YA.js","/play/assets/snapshot-B6QYzhzh.js","/play/assets/SolveSheet-BAVaEGx3.js","/play/assets/store-DU1sdxdT.js","/play/assets/t-C6GK397Y.js","/play/assets/terrain.worker-CqBzxqHc.js","/play/assets/terrainCache-us76TUyH.js","/play/assets/text-DAGJ-mUy.js","/play/assets/text-Ff4NmDpu.js","/play/assets/three-DTSqHtj7.js","/play/assets/tokens-CVRN3UQW.js","/play/assets/version-DzdKqayy.js","/play/assets/viewControl-CZjtZnyC.js","/play/assets/WatchLayer-Bc55KKRV.css","/play/assets/WatchLayer-OydlOH63.js","/play/assets/wipeFlow-BagKea1_.js","/play/assets/wiping-C43ZGAKh.js","/play/assets/World-bC8pdtJ2.css","/play/assets/World-X9Bn-49t.js","/play/assets/worldHint-_vQIgNxi.js","/play/assets/WorldLeagues-Db9tLtQF.js","/play/assets/WorldLink-DQFzNbj9.js","/play/assets/worldModel-CLQMEpg7.js","/play/assets/worldNav-tUb4_VsX.js","/play/assets/WorldWatch-BeBY_qBU.js","/play/icons/monochrome-432.png","/play/leaderboard-rules.html","/play/privacy.html"];
// Sidene i bygget som ikke er appen (for eksempel personvern.html eller lisenser.txt), som stier i adressen.
const PAGES = ["/play/leaderboard-rules.html","/play/lisenser.txt","/play/privacy.html"];
const ENTRY = "/play/assets/index-D_-B8JlO.js";
// Alle filene i bygget (uten steder/, som har sitt eget lager), som stier i adressen. Bare disse svarer service workeren på fra lageret, og bare disse lagres.
const KNOWN = new Set(["/play/assets/AboutSheet-BfyhAktg.js","/play/assets/DuelLayers-CrkmVh-x.js","/play/assets/FailedBody-BLJgOrDh.js","/play/assets/FeedbackSheet-Cc17ZYtH.js","/play/assets/GpsScreen-C0hPFgdw.js","/play/assets/GpsScreen-DtP78DDB.css","/play/assets/GuideCheck-BmwXnDR8.js","/play/assets/JoinScreen-4ybGwG-1.js","/play/assets/KTX2Loader-DPFYyMVZ.js","/play/assets/MovePad-6hFB1aSW.js","/play/assets/MovePad-q7KtqyIy.css","/play/assets/MoveSigns-BSx5_hy0.js","/play/assets/MyReplay-C7H1b176.js","/play/assets/PlayHelpRow-DCIEUktF.js","/play/assets/RankedScreen-P6ugMVDF.js","/play/assets/Recipe-OA00z8Ro.js","/play/assets/RoundScreen-C2k9_Nob.js","/play/assets/RoundScreen-COT7dNDO.css","/play/assets/Say-CInayPnF.js","/play/assets/ScanExperience-DkRb-m4G.js","/play/assets/ScanScreen-C1U1Mi44.css","/play/assets/ScanScreen-DOFrdAf0.js","/play/assets/ScrambleSheet-CgtZNb9F.js","/play/assets/ScrambleSteps-6jyJVimS.css","/play/assets/ScrambleSteps-Cdz5Hamh.js","/play/assets/ScrambleView-DDR3d2Ax.js","/play/assets/ScramblesSheet-C5m6RZbI.js","/play/assets/SettingsSheet-vvpV58mf.js","/play/assets/ShareSheet-B2OA9em6.js","/play/assets/ShareSheet-D_a5F9BZ.css","/play/assets/Sheets-DeyC449R.js","/play/assets/SkyRecords-6wtOpbOf.js","/play/assets/SkyRecords-D5oIFJcV.css","/play/assets/SmartCubeMount-C9Md2SHm.js","/play/assets/SmartCubeMount-DNSu9C-J.css","/play/assets/SmartOffer-Bg5MZJkP.css","/play/assets/SmartOffer-Cx_r48YA.js","/play/assets/SolveSheet-BAVaEGx3.js","/play/assets/WatchLayer-Bc55KKRV.css","/play/assets/WatchLayer-OydlOH63.js","/play/assets/World-X9Bn-49t.js","/play/assets/World-bC8pdtJ2.css","/play/assets/WorldLeagues-Db9tLtQF.js","/play/assets/WorldLink-DQFzNbj9.js","/play/assets/WorldWatch-BeBY_qBU.js","/play/assets/actions-B7rWijZe.js","/play/assets/bandRoom-C7MvcNzR.js","/play/assets/bests-d2DJ6m5s.js","/play/assets/board-B-AWeD0U.js","/play/assets/cheat-D9yFaCLB.css","/play/assets/clouds-C5OtG5hg.webp","/play/assets/cockpit-29RA0TnQ.css","/play/assets/cockpit-CL7bvT2m.js","/play/assets/contract-CsSLyXAm.js","/play/assets/controls-DvcWXluN.js","/play/assets/core-6Fox2abY.js","/play/assets/cube-iSAOp81T.js","/play/assets/debug-e29s2OK3.js","/play/assets/download-CmO0QBqH.js","/play/assets/duel-CuuhWITX.css","/play/assets/earth-CvNxVQs_.webp","/play/assets/earth-LVQXOTSa.js","/play/assets/earthDownload-BMxVHn9V.js","/play/assets/earthLevels-CSK8qppi.js","/play/assets/earthTextures-Bw0YS96s.js","/play/assets/environment-KxcmyIln.js","/play/assets/facelets-CtRHj3-H.js","/play/assets/features-D4dUVg3H.js","/play/assets/follow-BuYuYe7p.js","/play/assets/forest-Bxo4kRV7.js","/play/assets/format-DEHL0HMI.js","/play/assets/gps-B7bcf14N.css","/play/assets/helpShowsEdit-s_wfp7hH.js","/play/assets/identity-C-wlmO54.js","/play/assets/index-CbjFc9Mc.css","/play/assets/index-D_-B8JlO.js","/play/assets/jetbrains-mono-cyrillic-500-normal-DJqRU3vO.woff","/play/assets/jetbrains-mono-cyrillic-500-normal-DmUKJPL_.woff2","/play/assets/jetbrains-mono-greek-500-normal-D7SFKleX.woff","/play/assets/jetbrains-mono-greek-500-normal-JpySY46c.woff2","/play/assets/jetbrains-mono-latin-500-normal-BWZEU5yA.woff2","/play/assets/jetbrains-mono-latin-500-normal-CJOVTJB7.woff","/play/assets/jetbrains-mono-latin-ext-500-normal-Cut-4mMH.woff2","/play/assets/jetbrains-mono-latin-ext-500-normal-ckzbgY84.woff","/play/assets/jetbrains-mono-vietnamese-500-normal-DNRqzVM1.woff","/play/assets/keyHints-BuJw964z.js","/play/assets/keys-BMdKzqYR.js","/play/assets/lang-DyXZ4AgC.js","/play/assets/leave-CtyOpkmN.js","/play/assets/listName-7GGtoBLq.js","/play/assets/marks-DhD57rME.js","/play/assets/messages.nb-Bj6OcHe3.js","/play/assets/migrations-GyIKsqe5.js","/play/assets/moveText-BJI-1Pr_.js","/play/assets/name-DwzOVzEQ.js","/play/assets/notation-CaTfMHiJ.js","/play/assets/ocean-CCs_4tww.js","/play/assets/orientation-Be_D1Qwf.js","/play/assets/paint-DEzMCUF5.js","/play/assets/pending-DNnMB0I-.js","/play/assets/place-G67ufcJp.js","/play/assets/placeCache-Bils8dln.js","/play/assets/plan-CNiqgNfB.js","/play/assets/playPlan-ChyJ3EY5.js","/play/assets/prefs-DjBNJ4rd.js","/play/assets/preload-helper-6DGb1DyC.js","/play/assets/ranked-B9k0c_cG.css","/play/assets/ranked-F3SLK12_.js","/play/assets/rankedFlow-CMXxqzGx.js","/play/assets/rankedSession-p9z4FOyp.js","/play/assets/rankedTwo-apeW4N4J.js","/play/assets/react-CFYXFdqO.js","/play/assets/realStart-Dc170ATK.js","/play/assets/recognize-Deq9g4ol.js","/play/assets/replay-B86GcxDZ.js","/play/assets/replayDb-C6U2CxT7.js","/play/assets/replayLog-BZmcACTS.js","/play/assets/replays-nW7ESvdd.js","/play/assets/rolldown-runtime-XKyaHtl9.js","/play/assets/roundFlow-BAodvHaI.js","/play/assets/roundMachine-BZpDZMwc.js","/play/assets/roundView-DSQLbKzf.js","/play/assets/rounds-Bk2NBpDt.js","/play/assets/rules-DJUn4HCk.js","/play/assets/rules2-DpM_-6rs.js","/play/assets/scan-BiJO6iHN.js","/play/assets/scene-DziwvpRB.js","/play/assets/schibsted-grotesk-latin-500-normal-Ba39e-CX.woff","/play/assets/schibsted-grotesk-latin-500-normal-rf9C4Thp.woff2","/play/assets/schibsted-grotesk-latin-600-normal-BieE9YjJ.woff","/play/assets/schibsted-grotesk-latin-600-normal-Czv9Obfv.woff2","/play/assets/schibsted-grotesk-latin-700-normal-BkH0uJ1o.woff2","/play/assets/schibsted-grotesk-latin-700-normal-Dz-okVa0.woff","/play/assets/schibsted-grotesk-latin-800-normal-CIaq-TR1.woff2","/play/assets/schibsted-grotesk-latin-800-normal-Dl5-MP1T.woff","/play/assets/schibsted-grotesk-latin-ext-500-normal-BjmYCtCC.woff","/play/assets/schibsted-grotesk-latin-ext-500-normal-Ch1izu81.woff2","/play/assets/schibsted-grotesk-latin-ext-600-normal-C5pQPdUJ.woff2","/play/assets/schibsted-grotesk-latin-ext-600-normal-DQsnXf5q.woff","/play/assets/schibsted-grotesk-latin-ext-700-normal-DDW2aNyx.woff","/play/assets/schibsted-grotesk-latin-ext-700-normal-o210KhU4.woff2","/play/assets/schibsted-grotesk-latin-ext-800-normal-CZWJQj-F.woff2","/play/assets/schibsted-grotesk-latin-ext-800-normal-DS3YHxa9.woff","/play/assets/scrambler-C5ttbS3a.js","/play/assets/scrambler.worker-BdiG_Bnn.js","/play/assets/scrambles-iUtASCCJ.js","/play/assets/sea-CiXG2hjt.webp","/play/assets/shareCard-DJB2gJ71.js","/play/assets/shell-CJWZtMIw.js","/play/assets/sky-rhsY4L5v.js","/play/assets/slices-DZrzc4lX.js","/play/assets/snapshot-B6QYzhzh.js","/play/assets/store-DU1sdxdT.js","/play/assets/t-C6GK397Y.js","/play/assets/terrain.worker-CqBzxqHc.js","/play/assets/terrainCache-us76TUyH.js","/play/assets/text-DAGJ-mUy.js","/play/assets/text-Ff4NmDpu.js","/play/assets/three-DTSqHtj7.js","/play/assets/tokens-CVRN3UQW.js","/play/assets/version-DzdKqayy.js","/play/assets/viewControl-CZjtZnyC.js","/play/assets/wipeFlow-BagKea1_.js","/play/assets/wiping-C43ZGAKh.js","/play/assets/worldHint-_vQIgNxi.js","/play/assets/worldModel-CLQMEpg7.js","/play/assets/worldNav-tUb4_VsX.js","/play/icons/apple-touch-icon.png","/play/icons/favicon-32.png","/play/icons/favicon-64.png","/play/icons/icon-1024.png","/play/icons/icon-192.png","/play/icons/icon-512.png","/play/icons/maskable-192.png","/play/icons/maskable-512.png","/play/icons/monochrome-432.png","/play/index.html","/play/leaderboard-rules.html","/play/lisenser.txt","/play/manifest.webmanifest","/play/privacy.html","/play/screenshots/bred.jpg","/play/screenshots/telefon.jpg","/play/splash/splash-1125x2436.png","/play/splash/splash-1170x2532.png","/play/splash/splash-1179x2556.png","/play/splash/splash-1206x2622.png","/play/splash/splash-1284x2778.png","/play/splash/splash-1290x2796.png","/play/splash/splash-1320x2868.png","/play/splash/splash-750x1334.png","/play/splash/splash-828x1792.png"]);
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
  // Siden spør hvilken startfil denne versjonen har: er det den siden alt kjører, tar den over med en gang, uten omlasting (main.tsx).
  if (event.data === 'entry' && event.ports && event.ports[0]) event.ports[0].postMessage(ENTRY);
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
    // Alle andre sidebesøk er appen: den lagrede index.html med en gang, uten å vente på nettet. Første gang, uten noe lagret, fra nettet.
    event.respondWith(caches.match(BASE + 'index.html', { cacheName: CACHE }).then((hit) => hit || fetch(req)));
    return;
  }
  if (url.pathname.startsWith(PLACES_DIR)) {
    event.respondWith(placeFetched(req));
    return;
  }
  // Bare filene i bygget, uten «?», svares fra lageret og lagres. Alt annet går til nettet som om service workeren ikke var der.
  if (url.search || !KNOWN.has(url.pathname)) return;
  event.respondWith(cachedOrFetched(req, req));
});
