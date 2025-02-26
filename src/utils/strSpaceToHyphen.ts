export default function strSpaceToHyphen (str: string) {

  return str.trim().replaceAll(' ', '-');
}