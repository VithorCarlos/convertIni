export function removeAccents(value: string) {
  return value.normalize("NFD").replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, "");
}
