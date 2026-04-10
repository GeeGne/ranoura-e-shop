const createSlug = (str: string) => 
  `${str}`
  .normalize('NFKD')
  .toLowerCase()
  .trim()
  .replace(/[^\p{L}\p{N}\s-]/gu, '')
  .replace(/[\s_-]+/g, '-') 
  .replace(/^-+|-+$/g, '');

export default createSlug;