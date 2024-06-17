// <reference types=@sveltejs/kit />

declare global {
  interface Window { PB: any; }
}

type CookieConfig = {
  redTeam: number|null,
  blueTeam: number|null,
  bestOf: number;
  teams: CookieTeam[];
};

type CookieTeam = {
  short: string;
  name: string;
  score: number;
}

type Spell = {
  id: number;
  icon: string;
}

type ChampionData = {
  id: number;
  name: string;
  idName: string;
  loadingImg: string;
  splashImg: string;
  splashCenteredImg: string;
  squareImg: string;
}

type ChampionBan = {
  isActive: boolean;
  champion: ChampionData;
};

type ChampionPick = {
    isActive: boolean;
    displayName: string;
    id: number;
    spell1: Spell;
    spell2: Spell;
    champion: ChampionData;
}

type ConfigTeam = {
  name: string;
  score: number;
  coach: string;
  color: string;
};

type StateTeam = {
  bans: ChampionBan[];
  picks: ChampionPick[];
  isActive: false;
};

type GlobalStateConfig = {
  frontend: {
    scoreEnabled: boolean;
    spellsEnabled: boolean;
    coachesEnabled: boolean;
    blueTeam: ConfigTeam;
    redTeam: ConfigTeam;
    patch: string;
  };
  contentPatch: string;
  contentCdn: string;
};

type GlobalStateMeta = {
  cdn: string;
  version: {
    champion: string;
    item: string;
  };
};

type GlobalState = {
  leagueConnected: boolean;
  champSelectActive: boolean;
  blueTeam: StateTeam;
  redTeam: StateTeam;
  meta: GlobalStateMeta;
  timer: number;
  state: string;
  config: GlobalStateConfig;
};