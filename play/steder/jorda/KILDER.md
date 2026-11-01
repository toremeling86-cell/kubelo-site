# Kilder til «Over jorda»

Teksturene i denne mappa er laget av `scripts/jorda-teksturer.mjs` fra kildene under. Kildene ligger utenfor repoet. Alt kan lages på nytt: kjør skriptet, som laster ned kildene, sjekker SHA-256 og pakker KTX2 (Basis ETC1S, mipmaps i fila).
Verktøy: sharp 0.34 (libvips) for skalering og havmaske, toktx 4.4.2 (KhronosGroup/KTX-Software) for KTX2.

**NASA-materiale:** NASA should be acknowledged as the source of the material. Use does not imply NASA's endorsement of Kubelo. (NASAs retningslinjer for bilder og medier.) Ingen NASA-logo.

### Blue Marble Next Generation, «Base Map», oktober 2004 (21600 × 10800)

- Adresse: https://assets.science.nasa.gov/content/dam/science/esd/eo/images/bmng/bmng-base/october/world.200410.3x21600x10800.jpg
- Lest: 2026-10-20
- Størrelse: 22853895 byte
- SHA-256: `bf568ceca2ad55e9c8dd7bcedfd0e419201d03bb560206a7bfa2cc57c1e04c64`
- Kreditering: NASA Earth Observatory. NASA image courtesy Reto Stöckli and Robert Simmon.

### Black Marble 2016, farge, 3 km (13500 × 6750)

- Adresse: https://assets.science.nasa.gov/content/dam/science/esd/eo/images/imagerecords/144000/144898/BlackMarble_2016_3km.jpg
- Lest: 2026-10-20
- Størrelse: 8106233 byte
- SHA-256: `230aac448ae68c358be433dd518888cccb3a85ccf66f7b44326441c324ad6725`
- Kreditering: NASA Earth Observatory images by Joshua Stevens, using Suomi NPP VIIRS data from Miguel Román, NASA GSFC.

### Blue Marble (2002), «Clouds» (8192 × 4096)

- Adresse: https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57747/cloud_combined_8192.tif
- Lest: 2026-10-20
- Størrelse: 35870468 byte
- SHA-256: `d137775d8966ab8d443fd5126dc6e7ad72072bc1ed50555c5818d221735daf0f`
- Kreditering: NASA Goddard Space Flight Center Image by Reto Stöckli (land surface, shallow water, clouds). Enhancements by Robert Simmon (ocean color, compositing, 3D globes, animation).

### Natural Earth 1:10m Land (v5.1.2)

- Adresse: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_10m_land.geojson
- Lest: 2026-10-20
- Størrelse: 10157965 byte
- SHA-256: `1ac90796408bc6ad6911d69448485d3c4dbf2190370080368a09976e1c9f7416`
- Kreditering: Made with Natural Earth (public domain).

### Natural Earth 1:10m Lakes + Reservoirs (v5.1.2)

- Adresse: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_10m_lakes.geojson
- Lest: 2026-10-20
- Størrelse: 5043554 byte
- SHA-256: `2d036f53dedec578001c5c30c2959ee7d4eebc1306900fa4367c49929ec8f2d9`
- Kreditering: Made with Natural Earth (public domain).

Nivåene: `forhånd` = alle fire lag på 2048 × 1024. `lav` = dag og skyer på 4096 × 2048, natt og hav på 2048 × 1024. `høy` = dag, skyer og natt (bylys) på 8192 × 4096, hav på 4096 × 2048. Se manifest.json for byte og SHA-256 per fil og for nedlastingen per nivå.
