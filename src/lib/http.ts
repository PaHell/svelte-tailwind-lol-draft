export enum API {
    SELF,
    BACKEND,
    RIOT_DEV,
    RIOT_ASSETS
}
const APIS = {};
APIS[API.SELF] = {
    base: import.meta.env.VITE_URL_SELF,
    end: '',
    config: {
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }
};
APIS[API.BACKEND] = {
    base: import.meta.env.VITE_URL_BACKEND,
    end: '',
    config: {
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }
};
APIS[API.RIOT_DEV] = {
    base: import.meta.env.VITE_URL_RIOT_DEV,
    end: `?api_key=${import.meta.env.VITE_KEY_RIOT_DEV}`,
    config: {
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }
};
APIS[API.RIOT_ASSETS] = {
    base: import.meta.env.VITE_URL_RIOT_DEV,
    config: {
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Authorization': import.meta.env.VITE_KEY_RIOT_DEV,
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }
};

export function setHeader(api: API, key: string, value: any) {
    APIS[api].config.headers[key] = value;
}

export const get = (api: API, url: string) => {
    console.log('HTTP/GET', APIS[api].base + url + APIS[api].end);
    return new Promise((resolve, reject) => {
        fetch(APIS[api].base + url + APIS[api].end, {
            ...APIS[api].config,
            method: 'GET',
        })
            .then(res => {
                console.log('  => res:', res);
                if (res.ok) return res.json();
                else reject(res.statusText);
            })
            .then(data => resolve(data))
            .catch(err => {
                console.log('http/catch', err);
                reject(err);
            });
    });
};
export const post = (api: API, url: string, data: Object) => {
    return new Promise((resolve, reject) => {
        fetch(APIS[api].base + url, {
            ...APIS[api].config,
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then(res => {
                if (res.ok) return res.json();
                else reject(res.statusText);
            })
            .then(data => resolve(data))
            .catch(err => {
                console.log('http/catch', err);
                reject(err);
            });
    });
};
