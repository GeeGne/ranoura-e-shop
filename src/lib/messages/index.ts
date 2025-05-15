export default function getMessge (code: string, lang: string) {
  const isEn = lang === 'en';
  switch (code) {
    case 'METHOD_NOT_ALLOWED':
      return isEn 
      ? 'The requested HTTP Method is not allowed on this endpoint' 
      : 'طريقه المسار غير مسموح بها';
    case 'REQUIRED_EMAIL':
      return isEn 
      ? 'Email is required' 
      : 'البريد الالكتروني مطلوب';
    case 'THEME_FETCH_FAIL':
      return isEn 
      ? 'Unable to get Theme Data' 
      : 'تعذر الحصول على بيانات المظهر';
    case 'THEME_UPDATE_FAIL':
      return isEn
      ? 'Unable to udpate the Website UI Theme'
      : 'تعذر تحديث مظهر واجهه الموقع';
    default:
      console.error('Unknown code: ', code);
      return isEn 
        ?'An unknown error occurred during the operation'
        :'حصل خطأ مجهول خلال العمليه'
  }
}