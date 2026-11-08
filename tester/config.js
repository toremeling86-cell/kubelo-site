/* The one place for the tester page's links and switches (kubelo.app/tester). Edit only this file.
   GRUPPE_URL      the Google group people join first. The group is kubelo-testers@googlegroups.com; the link comes from Groups (https://groups.google.com/g/kubelo-testers).
   PLAY_TEST_URL   the opt-in link for the closed test, copied from Play Console (Test and release, Closed testing, the track, Testers) once the track is published.
   TESTFLIGHT_URL  the public TestFlight link for iPhone (the group «Åpen lenke» in App Store Connect, at most 100 testers, made 07.11.2026). The box «On iPhone» has no «comes soon» line.
   PROMISE_APPROVED  the box «Thank you for testing» is shown only when this is true. Tore Meling approved the promise on 01.11.2026.
   A link that is not an https address yet (PLAY_TEST_URL: 'PLAY_TEST_URL') hides its button, and the step says that the link comes soon, so the page looks finished with or without it.
   build/deploy-pages.sh stops a real publish while GRUPPE_URL is a placeholder, and only notes it for PLAY_TEST_URL. */
window.KUBELO_TESTER = {
  GRUPPE_URL: 'https://groups.google.com/g/kubelo-testers',
  PLAY_TEST_URL: 'https://play.google.com/apps/testing/app.kubelo',
  TESTFLIGHT_URL: 'https://testflight.apple.com/join/kwyEagmE',
  PROMISE_APPROVED: true
};
