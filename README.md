# Eindopdracht EXI

## Concept
CONCEPT: Sjoelbak battle

We hebben twee sjoelbakken naast elkaar.

Er is één gezonde en één ongezonde sjoelbak. Op de projectie is een monster te zien en het is de bedoeling om het monster naar jouw te lokken en ongezond/gezond te maken. Dit doe je door het zoveel mogelijk eten te geven. Als het monster bij jouw is heb je gewonnen.

Achter elk gaatje is een lasersensor om te kijken of de puck er door gaat.
De sjoelbak staat voor een muur waar de projectie op staat.

## Onderdelen
- 1 computer
- 1 Beamer
- 2 sjoelbakken
- 8 lasers
- 8 lichtsensoren
- 1 Arduino

## Extra
Projectie op de sjoelbakken

## Technisch
- Sjoelbak met detectie via Arduino (Johnny-Five)
- Connectie met Socket.io
- Game met Phaser.js

## Arduino

### lasers
We gebruiken KY-008 lasers, deze worden allemaal tesamen aangesloten op poort A9

### photoresistors
Voor de lichtmeting gebruiken we photoresistors.
Deze zitten op poort A0, A2, A4 en A5
