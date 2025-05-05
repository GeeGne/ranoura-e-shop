
type Props = {
  name: { en: string, ar: string };
  scheme_id: number;
  primary_color: string;
  primary_invert_color: string;
  secondary_color: string;
  secondary_invert_color: string;
  inbetween_color: string;
  content_color: string;
  content_inbetween_color: string;
  content_invert_color: string;
}

export default function updateThemeVariables (currentTheme: Props) {
  document.documentElement.style.setProperty('--primary-color', currentTheme.primary_color);
  document.documentElement.style.setProperty('--primary-invert-color', currentTheme.primary_invert_color);
  document.documentElement.style.setProperty('--secondary-color', currentTheme.secondary_color);
  document.documentElement.style.setProperty('--secondary-invert-color', currentTheme.secondary_invert_color);
  document.documentElement.style.setProperty('--inbetween-color', currentTheme.inbetween_color);
  document.documentElement.style.setProperty('--content-color', currentTheme.content_color);
  document.documentElement.style.setProperty('--content-inbetween-color', currentTheme.content_inbetween_color);
  document.documentElement.style.setProperty('--content-invert-color', currentTheme.content_invert_color);
}