import { get, API, APIS } from './http';

let promise = undefined;

export type riotChampion = {
      blurb: string,
      id: string,
      image: {
            full: string,
            sprite: string,
            group: string,
            x: number,
            y: number,
            w: number,
            h: number
      },
      info: {
            attack: number,
            defense: number,
            magic: number,
            difficulty: number
      },
      key: string,
      name: string,
      partype: string,
      stats: {
            armor: number,
            armorperlevel: number,
            attackdamage: number,
            attackdamageperlevel: number,
            attackrange: number,
            attackspeed: number,
            attackspeedperlevel: number,
            crit: number,
            critperlevel: number,
            hp: number,
            hpperlevel: number,
            hpregen: number,
            hpregenperlevel: number,
            movespeed: number,
            mp: number,
            mpperlevel: number,
            mpregen: number,
            mpregenperlevel: number,
            spellblock: number,
            spellblockperlevel: number,
      },
      tags: [string],
      title: string,
      version: string
};

export type appChampion = {
      name: string,
      desc: string,
      img: {
            big: string,
            square: string
      }
};

interface riotChampionsFile {
      data: { string: riotChampion },
      format: string,
      type: string,
      version: string,
};

export function getChampions() {
      if (!promise) promise = new Promise((resolve, reject) => {
            get(API.RIOT_ASSETS, '/api/versions.json')
                  .then((versions) => {
                        get<riotChampionsFile>(API.RIOT_ASSETS, `/cdn/${versions[0]}/data/en_US/champion.json`)
                              .then((file: riotChampionsFile) => {
                                    console.log(file);
                                    const champions = Object.entries(file.data).reduce(
                                          (acc: object, [name, champion]: [string, riotChampion]) => {
                                                console.log({ name, champion });
                                                acc[name] = {
                                                      name: champion.name,
                                                      desc: champion.title,
                                                      img: {
                                                            big: `${APIS[API.RIOT_ASSETS].base}/cdn/img/champion/loading/${champion.id}_0.jpg`,
                                                            square: `${APIS[API.RIOT_ASSETS].base}/cdn/${versions[0]}/img/champion/${champion.image.full}`,
                                                      }
                                                };
                                                return acc;
                                          }, {});
                                    resolve(champions);
                              })
                              .catch((error) => { reject(error); });
                  })
                  .catch((error) => { reject(error); });
      });
      return promise;
}