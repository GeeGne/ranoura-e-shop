export default {
  checkout: {
    phoneNumber(val: string) {
      const re = /^[0-9+]+$/;
      const re1 = /^\+963/;
      const re2 = /^\+?\d{1,4}(\s\d{3}){2}\s\d{3}$/;

      switch (false) {
        case val !== '':
          return { result: false, message: { en: 'can\'t be blank', ar: 'لا يمكن ان يكون فارغا' } };
        case re2.test(val):
          return { result: false, message: { en: 'wrong phone number ex: +963 936 534 070', ar: 'رقم هاتف خاطئ مثال: +093 936 435 040'  } };
        case val.length === 16:
          return { result: false, message: { en: 'wrong phone number ex: +963 936 534 070', ar: 'رقم هاتف خاطئ مثال: +093 936 435 040'  } };
        default:
          return { result: true, message: { en: 'phone number is verfied', ar: 'تم التحقق من رقم الهاتف' } };
      }
    }
  }
};