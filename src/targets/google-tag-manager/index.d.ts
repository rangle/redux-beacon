type Settings = {
  dataLayerName: string,
};

type Target = (events: any[]) => void;

export function GoogleTagManager(settings?: Settings): Target;
