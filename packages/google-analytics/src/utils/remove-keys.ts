export const removeKeys = (
  obj: { [key: string]: any },
  keysToOmit: string[]
): { [key: string]: any } => {
  const newObj = {};

  Object.keys(obj).forEach(key => {
    if (keysToOmit.indexOf(key) === -1) {
      newObj[key] = obj[key];
    }
  });

  return newObj;
};
