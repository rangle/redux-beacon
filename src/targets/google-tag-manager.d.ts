type GoogleTagManagerTarget = (events: Array<any>) => void;
type DataLayer = { push: (event: any) => void };

export function GoogleTagManager(dataLayer: DataLayer): GoogleTagManagerTarget;
