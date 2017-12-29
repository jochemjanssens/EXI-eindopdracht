# Eindopdracht EXI

## Concept
CONCEPT: Sjoelbak battle

We hebben twee sjoelbakken naast elkaar.

Op de projectie is een chef te zien en het is de bedoeling om de chef naar jouw te lokken. Dit doe je door het zoveel mogelijk eten te geven. Als de chef bij jouw is heb je gewonnen.

Achter elk gaatje is een lasersensor om te kijken of de puck er door gaat.
De sjoelbak staat voor een muur waar de projectie op staat.

## Onderdelen
- 1 computer
- 1 Beamer
- 2 sjoelbakken
- 8 lasers
- 8 lichtsensoren
- 2 Arduino's

## Technisch
- Sjoelbak met detectie via Arduino (Johnny-Five)
- Connectie met Socket.io
- Game met Phaser.js

## Arduino

### lasers
We gebruiken KY-008 lasers, deze worden allemaal tesamen aangesloten op poort D11

### photoresistors
Voor de lichtmeting gebruiken we photoresistors.
Deze zitten op poort A0, A1, A2, A3

## Setup
Om de eerste sjoelbak op te zetten
- Run de site lokaal (yarn run development)
- Sluit de Arduino aan (waar Firmata-software opstaat)
- Van de sjoelbak sluit je de juiste kabels aan op de Arduino
  - Rood-tape: GND
  - Rood: D11
  - Blauw: A0
  - Geel: A1
  - Geel-tape: A2
  - Zwart: A3
  - Blauw - Groen: 5V
  - Wit: GND
