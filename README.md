# Rendezvénykezelő Rendszer (TypeScript)

Egy TypeScript-alapú, objektumorientált mini-rendszer motorsport rendezvények kezelésére. A fókusz három kategórián van: **Speedway**, **Quad** és **Egyéb**, valamint a szigorúbb adatkezelés getter/setter megoldásokkal.

---

## Tartalomjegyzék
1. [Fő funkciók](#fő-funkciók)
2. [Technológiák](#technológiák)
3. [Követelmények](#követelmények)
4. [Telepítés és futtatás](#telepítés-és-futtatás)
5. [Projektstruktúra](#projektstruktúra)
6. [Fontos fájlok](#fontos-fájlok)
7. [Tesztelés](#tesztelés)
8. [Használati példák](#használati-példák)
9. [További fejlesztési ötletek](#további-fejlesztési-ötletek)
10. [Licenc](#licenc)

---

## Fő funkciók
- **EventCategory enum** kizárólag a kért értékekkel: `Speedway`, `Quad`, `Egyéb`.
- **Event osztály**:
  - Getterek és setterek validációval (`name`, `location`, `date`, `category`, `description`).
  - Résztvevő kezelés `Map` segítségével (hozzáadás, törlés, listázás).
  - `toJSON()` segédfüggvény szerializáláshoz.
- **EventService**:
  - Rendezvények létrehozása, módosítása, törlése.
  - Résztvevő-menedzsment.
  - Szinkron (`create`) és aszinkron (`createAsync`, `Result<T>` típussal) létrehozás.
  - Listázás és csoportosítás kategóriák szerint.
- **Dekorátorok** (`LogClass`, `LogMethod`) demonstrációs loggoláshoz.

---

## Technológiák
- TypeScript 5.5
- Node.js (CommonJS modulrendszer)
- Jest + ts-jest (egységtesztek)
- ts-node (gyors fejlesztői futtatás)
- Experimental decorators

---

## Követelmények
- Node.js 18 vagy újabb
- npm 8 vagy újabb

---

## Telepítés és futtatás

```bash
npm install          # függőségek telepítése
npm run build        # TypeScript → JavaScript fordítás (dist mappa)
npm start            # példa futtatás (src/index.ts)
npm test             # Jest tesztek futtatása