import { removeAccents } from "./removeAccents";

export function convertObjectKeysAndValuesToLower(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null) {
      acc[removeAccents(key).toLowerCase()] = value.toString().toLowerCase();
    }
    return acc;
  }, {});
}