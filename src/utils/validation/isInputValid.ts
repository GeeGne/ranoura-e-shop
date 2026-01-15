export default {
  checkout: {
    phoneNumber(val: string, isEn: boolean) {
      const re = /^[0-9+]+$/;
      const re1 = /^\+963/;
      const re2 = /^\+?\d{1,4}(\s\d{3}){2}\s\d{3}$/;

      switch (false) {
        case val !== '':
          return { result: false, message: isEn ? '' : ''};
        default:
          return { result: true, message: isEn ? '' : ''}
      }
    }
  }
};