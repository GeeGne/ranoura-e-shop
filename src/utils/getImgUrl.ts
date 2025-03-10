export default function getImgUrl (imgArray: any, selectedColor: string) {
  return imgArray.find((itm: any) => itm.color === selectedColor)
};
