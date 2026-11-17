/* Kube – service worker, versjon 3083e0547eb1 */
const BASE = "/play/";
// Navnet inneholder stien, så flere apper på samme domene (for eksempel github.io) ikke rydder hverandres lager.
const PREFIX = 'kube:' + BASE + ':';
const CACHE = PREFIX + '3083e0547eb1';
const FILES = ["/play/index.html","/play/manifest.webmanifest","/play/icons/icon-192.png","/play/icons/maskable-192.png","/play/icons/apple-touch-icon.png","/play/icons/favicon-32.png","/play/assets/AboutSheet-Bs4I8TOL.js","/play/assets/actions-CqgmjrW4.js","/play/assets/bandRoom-CZ-fdhSf.js","/play/assets/bests-DJRZGQ5a.js","/play/assets/board-ydf2bT5v.js","/play/assets/cheat-D9yFaCLB.css","/play/assets/clouds-C5OtG5hg.webp","/play/assets/cockpit-29RA0TnQ.css","/play/assets/cockpit-CL7bvT2m.js","/play/assets/contract-CsSLyXAm.js","/play/assets/controls-DvcWXluN.js","/play/assets/core-6Fox2abY.js","/play/assets/cube-iSAOp81T.js","/play/assets/debug-e29s2OK3.js","/play/assets/download-CmO0QBqH.js","/play/assets/duel-CuuhWITX.css","/play/assets/DuelLayers-CH7gqrj3.js","/play/assets/earth-CvNxVQs_.webp","/play/assets/earth-D_HSd-y-.js","/play/assets/earthDownload-9T_DiDLB.js","/play/assets/earthLevels-CSK8qppi.js","/play/assets/earthTextures-Bw0YS96s.js","/play/assets/environment-KxcmyIln.js","/play/assets/facelets-CtRHj3-H.js","/play/assets/features-D4dUVg3H.js","/play/assets/FeedbackSheet-CXwsc9Yz.js","/play/assets/follow-kjeoE4wO.js","/play/assets/forest-Bxo4kRV7.js","/play/assets/format-DPNbJcQL.js","/play/assets/gps-B7bcf14N.css","/play/assets/GpsScreen-BPiF_Xvz.js","/play/assets/GpsScreen-DtP78DDB.css","/play/assets/GuideCheck-D2_BczL6.js","/play/assets/helpShowsEdit-DQk9Zloz.js","/play/assets/identity-C-wlmO54.js","/play/assets/index-4zYyR1MB.css","/play/assets/index-qLhQPDBT.js","/play/assets/jetbrains-mono-latin-500-normal-BWZEU5yA.woff2","/play/assets/jetbrains-mono-latin-ext-500-normal-Cut-4mMH.woff2","/play/assets/JoinScreen-PScUuZQI.js","/play/assets/keys-BMdKzqYR.js","/play/assets/KTX2Loader-DPFYyMVZ.js","/play/assets/lang-DyXZ4AgC.js","/play/assets/leave-8UlCj0pg.js","/play/assets/listName-C3_wCdO4.js","/play/assets/marks-DhD57rME.js","/play/assets/messages.nb-CH8tsADM.js","/play/assets/migrations-GyIKsqe5.js","/play/assets/MovePad-BleDWzEi.js","/play/assets/MovePad-q7KtqyIy.css","/play/assets/MoveSigns-BSx5_hy0.js","/play/assets/moveText-BJI-1Pr_.js","/play/assets/MyReplay-CWdD1i7S.js","/play/assets/name-DwzOVzEQ.js","/play/assets/notation-CaTfMHiJ.js","/play/assets/ocean-CCs_4tww.js","/play/assets/orientation-Be_D1Qwf.js","/play/assets/paint-BfNY5LEz.js","/play/assets/pending-BsSrBSaM.js","/play/assets/place-G67ufcJp.js","/play/assets/placeCache-Bils8dln.js","/play/assets/plan-CNiqgNfB.js","/play/assets/PlayHelpRow-DJHE5NDs.js","/play/assets/playPlan-ChyJ3EY5.js","/play/assets/prefs-DjBNJ4rd.js","/play/assets/preload-helper-6DGb1DyC.js","/play/assets/ranked-B9k0c_cG.css","/play/assets/ranked-BnRCgI1h.js","/play/assets/rankedFlow-C7rclcOr.js","/play/assets/RankedScreen-Bg_OgS0t.js","/play/assets/rankedSession-TYY7OuEp.js","/play/assets/rankedTwo-D0W4HBvv.js","/play/assets/react-CFYXFdqO.js","/play/assets/realStart-Ck0Dnjyp.js","/play/assets/Recipe-3gmyyGhZ.js","/play/assets/recognize-Deq9g4ol.js","/play/assets/replay-B86GcxDZ.js","/play/assets/replayDb-C6U2CxT7.js","/play/assets/replayLog-BZmcACTS.js","/play/assets/replays-Rv8o67aw.js","/play/assets/rolldown-runtime-XKyaHtl9.js","/play/assets/roundFlow-CaFAiyW8.js","/play/assets/roundMachine-2PspF3tt.js","/play/assets/rounds-Bk2NBpDt.js","/play/assets/RoundScreen-COT7dNDO.css","/play/assets/RoundScreen-CRtuDfFh.js","/play/assets/roundView-D6zGaiU4.js","/play/assets/rules-DJUn4HCk.js","/play/assets/rules2-DpM_-6rs.js","/play/assets/Say-CdffG08Q.js","/play/assets/scan-BiJO6iHN.js","/play/assets/ScanExperience-DDjixrUe.js","/play/assets/ScanScreen-BJnsmjFZ.js","/play/assets/ScanScreen-C1U1Mi44.css","/play/assets/scene-DxS2a_cJ.js","/play/assets/schibsted-grotesk-latin-500-normal-rf9C4Thp.woff2","/play/assets/schibsted-grotesk-latin-600-normal-Czv9Obfv.woff2","/play/assets/schibsted-grotesk-latin-700-normal-BkH0uJ1o.woff2","/play/assets/schibsted-grotesk-latin-800-normal-CIaq-TR1.woff2","/play/assets/schibsted-grotesk-latin-ext-500-normal-Ch1izu81.woff2","/play/assets/schibsted-grotesk-latin-ext-600-normal-C5pQPdUJ.woff2","/play/assets/schibsted-grotesk-latin-ext-700-normal-o210KhU4.woff2","/play/assets/schibsted-grotesk-latin-ext-800-normal-CZWJQj-F.woff2","/play/assets/scrambler-C5ttbS3a.js","/play/assets/scrambler.worker-BdiG_Bnn.js","/play/assets/scrambles-C4Koz-kY.js","/play/assets/ScrambleSheet-C7Yy0bVm.js","/play/assets/ScramblesSheet-DEqUPIH1.js","/play/assets/ScrambleSteps-6jyJVimS.css","/play/assets/ScrambleSteps-DclJgIxQ.js","/play/assets/ScrambleView-QAfTXA3T.js","/play/assets/sea-CiXG2hjt.webp","/play/assets/SettingsSheet-CCXGbJHO.js","/play/assets/shareCard-Cf_TR8WX.js","/play/assets/ShareSheet-BLm8GtfT.js","/play/assets/ShareSheet-D_a5F9BZ.css","/play/assets/Sheets-Ct3XG69n.js","/play/assets/shell-CJWZtMIw.js","/play/assets/sky-rhsY4L5v.js","/play/assets/SkyRecords-D5oIFJcV.css","/play/assets/SkyRecords-DHwarLOS.js","/play/assets/slices-DZrzc4lX.js","/play/assets/SmartCubeMount-CZR2sGA0.js","/play/assets/SmartCubeMount-DNSu9C-J.css","/play/assets/SmartOffer-Bg5MZJkP.css","/play/assets/SmartOffer-Cfh0sqU6.js","/play/assets/snapshot-B6QYzhzh.js","/play/assets/SolveSheet-E08q5BT4.js","/play/assets/store-CfVYKMFg.js","/play/assets/t-646yacOI.js","/play/assets/terrain.worker-CqBzxqHc.js","/play/assets/terrainCache-us76TUyH.js","/play/assets/text-B7jJwLE4.js","/play/assets/text-BIH03By9.js","/play/assets/three-DTSqHtj7.js","/play/assets/tokens-CVRN3UQW.js","/play/assets/version-BE1FSejX.js","/play/assets/viewControl-CZjtZnyC.js","/play/assets/WatchLayer-Bc55KKRV.css","/play/assets/WatchLayer-CrxCprVk.js","/play/assets/wipeFlow-sBtGIPLg.js","/play/assets/wiping-C43ZGAKh.js","/play/assets/World-bC8pdtJ2.css","/play/assets/World-CLC4uZuV.js","/play/assets/worldHint-_vQIgNxi.js","/play/assets/WorldLeagues-ChWOFFI3.js","/play/assets/WorldLink-BN8HtuUf.js","/play/assets/worldModel-4MLBv7wL.js","/play/assets/worldNav-DZqFf_XW.js","/play/assets/WorldWatch-B_lfX7r_.js","/play/icons/monochrome-432.png","/play/leaderboard-rules.html","/play/privacy.html"];
// Sidene i bygget som ikke er appen (for eksempel personvern.html eller lisenser.txt), som stier i adressen.
const PAGES = ["/play/leaderboard-rules.html","/play/lisenser.txt","/play/privacy.html"];
const ENTRY = "/play/assets/index-qLhQPDBT.js";
// Alle filene i bygget (uten steder/, som har sitt eget lager), som stier i adressen. Bare disse svarer service workeren på fra lageret, og bare disse lagres.
const KNOWN = new Set(["/play/assets/AboutSheet-Bs4I8TOL.js","/play/assets/DuelLayers-CH7gqrj3.js","/play/assets/FeedbackSheet-CXwsc9Yz.js","/play/assets/GpsScreen-BPiF_Xvz.js","/play/assets/GpsScreen-DtP78DDB.css","/play/assets/GuideCheck-D2_BczL6.js","/play/assets/JoinScreen-PScUuZQI.js","/play/assets/KTX2Loader-DPFYyMVZ.js","/play/assets/MovePad-BleDWzEi.js","/play/assets/MovePad-q7KtqyIy.css","/play/assets/MoveSigns-BSx5_hy0.js","/play/assets/MyReplay-CWdD1i7S.js","/play/assets/PlayHelpRow-DJHE5NDs.js","/play/assets/RankedScreen-Bg_OgS0t.js","/play/assets/Recipe-3gmyyGhZ.js","/play/assets/RoundScreen-COT7dNDO.css","/play/assets/RoundScreen-CRtuDfFh.js","/play/assets/Say-CdffG08Q.js","/play/assets/ScanExperience-DDjixrUe.js","/play/assets/ScanScreen-BJnsmjFZ.js","/play/assets/ScanScreen-C1U1Mi44.css","/play/assets/ScrambleSheet-C7Yy0bVm.js","/play/assets/ScrambleSteps-6jyJVimS.css","/play/assets/ScrambleSteps-DclJgIxQ.js","/play/assets/ScrambleView-QAfTXA3T.js","/play/assets/ScramblesSheet-DEqUPIH1.js","/play/assets/SettingsSheet-CCXGbJHO.js","/play/assets/ShareSheet-BLm8GtfT.js","/play/assets/ShareSheet-D_a5F9BZ.css","/play/assets/Sheets-Ct3XG69n.js","/play/assets/SkyRecords-D5oIFJcV.css","/play/assets/SkyRecords-DHwarLOS.js","/play/assets/SmartCubeMount-CZR2sGA0.js","/play/assets/SmartCubeMount-DNSu9C-J.css","/play/assets/SmartOffer-Bg5MZJkP.css","/play/assets/SmartOffer-Cfh0sqU6.js","/play/assets/SolveSheet-E08q5BT4.js","/play/assets/WatchLayer-Bc55KKRV.css","/play/assets/WatchLayer-CrxCprVk.js","/play/assets/World-CLC4uZuV.js","/play/assets/World-bC8pdtJ2.css","/play/assets/WorldLeagues-ChWOFFI3.js","/play/assets/WorldLink-BN8HtuUf.js","/play/assets/WorldWatch-B_lfX7r_.js","/play/assets/actions-CqgmjrW4.js","/play/assets/bandRoom-CZ-fdhSf.js","/play/assets/bests-DJRZGQ5a.js","/play/assets/board-ydf2bT5v.js","/play/assets/cheat-D9yFaCLB.css","/play/assets/clouds-C5OtG5hg.webp","/play/assets/cockpit-29RA0TnQ.css","/play/assets/cockpit-CL7bvT2m.js","/play/assets/contract-CsSLyXAm.js","/play/assets/controls-DvcWXluN.js","/play/assets/core-6Fox2abY.js","/play/assets/cube-iSAOp81T.js","/play/assets/debug-e29s2OK3.js","/play/assets/download-CmO0QBqH.js","/play/assets/duel-CuuhWITX.css","/play/assets/earth-CvNxVQs_.webp","/play/assets/earth-D_HSd-y-.js","/play/assets/earthDownload-9T_DiDLB.js","/play/assets/earthLevels-CSK8qppi.js","/play/assets/earthTextures-Bw0YS96s.js","/play/assets/environment-KxcmyIln.js","/play/assets/facelets-CtRHj3-H.js","/play/assets/features-D4dUVg3H.js","/play/assets/follow-kjeoE4wO.js","/play/assets/forest-Bxo4kRV7.js","/play/assets/format-DPNbJcQL.js","/play/assets/gps-B7bcf14N.css","/play/assets/helpShowsEdit-DQk9Zloz.js","/play/assets/identity-C-wlmO54.js","/play/assets/index-4zYyR1MB.css","/play/assets/index-qLhQPDBT.js","/play/assets/jetbrains-mono-cyrillic-500-normal-DJqRU3vO.woff","/play/assets/jetbrains-mono-cyrillic-500-normal-DmUKJPL_.woff2","/play/assets/jetbrains-mono-greek-500-normal-D7SFKleX.woff","/play/assets/jetbrains-mono-greek-500-normal-JpySY46c.woff2","/play/assets/jetbrains-mono-latin-500-normal-BWZEU5yA.woff2","/play/assets/jetbrains-mono-latin-500-normal-CJOVTJB7.woff","/play/assets/jetbrains-mono-latin-ext-500-normal-Cut-4mMH.woff2","/play/assets/jetbrains-mono-latin-ext-500-normal-ckzbgY84.woff","/play/assets/jetbrains-mono-vietnamese-500-normal-DNRqzVM1.woff","/play/assets/keys-BMdKzqYR.js","/play/assets/lang-DyXZ4AgC.js","/play/assets/leave-8UlCj0pg.js","/play/assets/listName-C3_wCdO4.js","/play/assets/marks-DhD57rME.js","/play/assets/messages.nb-CH8tsADM.js","/play/assets/migrations-GyIKsqe5.js","/play/assets/moveText-BJI-1Pr_.js","/play/assets/name-DwzOVzEQ.js","/play/assets/notation-CaTfMHiJ.js","/play/assets/ocean-CCs_4tww.js","/play/assets/orientation-Be_D1Qwf.js","/play/assets/paint-BfNY5LEz.js","/play/assets/pending-BsSrBSaM.js","/play/assets/place-G67ufcJp.js","/play/assets/placeCache-Bils8dln.js","/play/assets/plan-CNiqgNfB.js","/play/assets/playPlan-ChyJ3EY5.js","/play/assets/prefs-DjBNJ4rd.js","/play/assets/preload-helper-6DGb1DyC.js","/play/assets/ranked-B9k0c_cG.css","/play/assets/ranked-BnRCgI1h.js","/play/assets/rankedFlow-C7rclcOr.js","/play/assets/rankedSession-TYY7OuEp.js","/play/assets/rankedTwo-D0W4HBvv.js","/play/assets/react-CFYXFdqO.js","/play/assets/realStart-Ck0Dnjyp.js","/play/assets/recognize-Deq9g4ol.js","/play/assets/replay-B86GcxDZ.js","/play/assets/replayDb-C6U2CxT7.js","/play/assets/replayLog-BZmcACTS.js","/play/assets/replays-Rv8o67aw.js","/play/assets/rolldown-runtime-XKyaHtl9.js","/play/assets/roundFlow-CaFAiyW8.js","/play/assets/roundMachine-2PspF3tt.js","/play/assets/roundView-D6zGaiU4.js","/play/assets/rounds-Bk2NBpDt.js","/play/assets/rules-DJUn4HCk.js","/play/assets/rules2-DpM_-6rs.js","/play/assets/scan-BiJO6iHN.js","/play/assets/scene-DxS2a_cJ.js","/play/assets/schibsted-grotesk-latin-500-normal-Ba39e-CX.woff","/play/assets/schibsted-grotesk-latin-500-normal-rf9C4Thp.woff2","/play/assets/schibsted-grotesk-latin-600-normal-BieE9YjJ.woff","/play/assets/schibsted-grotesk-latin-600-normal-Czv9Obfv.woff2","/play/assets/schibsted-grotesk-latin-700-normal-BkH0uJ1o.woff2","/play/assets/schibsted-grotesk-latin-700-normal-Dz-okVa0.woff","/play/assets/schibsted-grotesk-latin-800-normal-CIaq-TR1.woff2","/play/assets/schibsted-grotesk-latin-800-normal-Dl5-MP1T.woff","/play/assets/schibsted-grotesk-latin-ext-500-normal-BjmYCtCC.woff","/play/assets/schibsted-grotesk-latin-ext-500-normal-Ch1izu81.woff2","/play/assets/schibsted-grotesk-latin-ext-600-normal-C5pQPdUJ.woff2","/play/assets/schibsted-grotesk-latin-ext-600-normal-DQsnXf5q.woff","/play/assets/schibsted-grotesk-latin-ext-700-normal-DDW2aNyx.woff","/play/assets/schibsted-grotesk-latin-ext-700-normal-o210KhU4.woff2","/play/assets/schibsted-grotesk-latin-ext-800-normal-CZWJQj-F.woff2","/play/assets/schibsted-grotesk-latin-ext-800-normal-DS3YHxa9.woff","/play/assets/scrambler-C5ttbS3a.js","/play/assets/scrambler.worker-BdiG_Bnn.js","/play/assets/scrambles-C4Koz-kY.js","/play/assets/sea-CiXG2hjt.webp","/play/assets/shareCard-Cf_TR8WX.js","/play/assets/shell-CJWZtMIw.js","/play/assets/sky-rhsY4L5v.js","/play/assets/slices-DZrzc4lX.js","/play/assets/snapshot-B6QYzhzh.js","/play/assets/store-CfVYKMFg.js","/play/assets/t-646yacOI.js","/play/assets/terrain.worker-CqBzxqHc.js","/play/assets/terrainCache-us76TUyH.js","/play/assets/text-B7jJwLE4.js","/play/assets/text-BIH03By9.js","/play/assets/three-DTSqHtj7.js","/play/assets/tokens-CVRN3UQW.js","/play/assets/version-BE1FSejX.js","/play/assets/viewControl-CZjtZnyC.js","/play/assets/wipeFlow-sBtGIPLg.js","/play/assets/wiping-C43ZGAKh.js","/play/assets/worldHint-_vQIgNxi.js","/play/assets/worldModel-4MLBv7wL.js","/play/assets/worldNav-DZqFf_XW.js","/play/icons/apple-touch-icon.png","/play/icons/favicon-32.png","/play/icons/favicon-64.png","/play/icons/icon-1024.png","/play/icons/icon-192.png","/play/icons/icon-512.png","/play/icons/maskable-192.png","/play/icons/maskable-512.png","/play/icons/monochrome-432.png","/play/index.html","/play/leaderboard-rules.html","/play/lisenser.txt","/play/manifest.webmanifest","/play/privacy.html","/play/screenshots/bred.jpg","/play/screenshots/telefon.jpg","/play/splash/splash-1125x2436.png","/play/splash/splash-1170x2532.png","/play/splash/splash-1179x2556.png","/play/splash/splash-1206x2622.png","/play/splash/splash-1284x2778.png","/play/splash/splash-1290x2796.png","/play/splash/splash-1320x2868.png","/play/splash/splash-750x1334.png","/play/splash/splash-828x1792.png"]);
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
