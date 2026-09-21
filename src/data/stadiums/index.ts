import type { Stadium } from "../types";

import afasStadion from "./afas-stadion";
import bosuilstadion from "./bosuilstadion";
import cegekaArena from "./cegeka-arena";
import denDreef from "./den-dreef";
import easiArena from "./easi-arena";
import elindusArena from "./elindus-arena";
import freethiel from "./freethiel";
import guldensporenstadion from "./guldensporenstadion";
import hetKuipje from "./het-kuipje";
import janBreydel from "./jan-breydel";
import lottoPark from "./lotto-park";
import planetGroupArena from "./planet-group-arena";
import soevereinstadion from "./soevereinstadion";
import stadeDuPaysDeCharleroi from "./stade-du-pays-de-charleroi";
import stadeJosephMarien from "./stade-joseph-marien";
import stadeMauriceDufrasne from "./stade-maurice-dufrasne";
import stayen from "./stayen";

/** 17 enceintes pour 18 clubs : le Jan Breydel est partagé par Club et Cercle. */
export const stadiums: Stadium[] = [
  janBreydel,
  planetGroupArena,
  cegekaArena,
  guldensporenstadion,
  afasStadion,
  hetKuipje,
  soevereinstadion,
  denDreef,
  easiArena,
  bosuilstadion,
  stadeJosephMarien,
  lottoPark,
  freethiel,
  stadeDuPaysDeCharleroi,
  stadeMauriceDufrasne,
  stayen,
  elindusArena,
];

export const stadiumById = new Map(stadiums.map((s) => [s.id, s]));
export const stadiumBySlug = new Map(stadiums.map((s) => [s.slug, s]));
