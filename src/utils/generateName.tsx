export const generateName = (name: string) => {
  return name.replace(/ /g, '-').toLocaleLowerCase();
}