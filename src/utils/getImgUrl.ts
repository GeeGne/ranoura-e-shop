export default function getImgUrl (imgArray: any, selectedColor: string) {
  return imgArray.find((itm: any) => 
    itm.color === selectedColor).views.find((itm: Record<string, any>) => 
      itm.tag === 'a').url;
};
