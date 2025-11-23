export default function getTranslation (
  transitionLib: Record<string, Record<string, string>>, 
  term: string, 
  language: 'en' | 'ar' = 'en'
) {
  if (!transitionLib) {
    console.warn('Translation library wasn\'t provided.');
    return term;
  }
  if (!term) {
    console.warn('Translation term wasn\'t provided.');
    return '';
  }

  const normalizeTerm = term.trim().toLowerCase();
  const termTranslations: Record<string, string> = transitionLib[normalizeTerm];
  if (!termTranslations) {
    console.warn(`No translation found for term: "${term}"`);
    return term;
  }

  const translation = termTranslations[language];
  if (!translation) {
    console.warn(`No "${language}" transaltion found for term: ${term}`);
    return termTranslations.en || term;
  }

  return translation;
}