export default function calculateTotalPrice (pricesArray: number[]) {
  return pricesArray.reduce( (acc, val) =>
    acc + val
  , 0);
};