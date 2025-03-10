export default function getColor (colorsArray: any[], color: string) {
  return colorsArray.find(itm => itm.name === color)
}