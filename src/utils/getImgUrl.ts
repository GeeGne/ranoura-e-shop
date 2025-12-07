export default function getImgUrl (imgArray: any, selectedColor: string) {
  if (!imgArray) return undefined;
  
  const viewsArray = imgArray.find((itm: any) => itm.color === selectedColor).views;
  if (!viewsArray) return undefined;

  const imgUrl = viewsArray.find((itm: Record<string, any>) => itm.tag === 'a').url;
  if (!imgUrl) return undefined;

  return imgUrl;
};
