export const validate = {
  email: (inpt: string, isEn: boolean) => {
    const re= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    switch (true) {
      case inpt === '':
        return { 
          message: isEn ? 'can\'t be blank' : 'لا يمكن ان يكون فارغا', 
          isValid: false
        }
      case inpt.includes(' '):
        return { 
          message: isEn ? 'must not contain Spaces' : 'يجب ان لا يحتوي على مسافات', 
          isValid: false
        }
      case !re.test(inpt):
        return { 
          message: isEn ? 'wronge email ex: example@email.com' : 'بريد الكتروني غير صحيح مثال: example@email.com',
          isValid: false
        }
      default:
        return { 
          message: isEn ? 'email is validated successfully' : 'الايميل تم التحقق به بنجاح', 
          isValid: true
        };
    }
  },
  password: (inpt: string, isEn: boolean) => {

    switch (true) {
      case inpt === '':
        return { 
          message: isEn ? 'can\'t be blank' : 'لا يمكن ان يكون فارغا', 
          isValid: false
        }
      case inpt.includes(' '):
        return { 
          message: isEn ? 'must not contain Spaces' : 'يجب ان لا يحتوي على مسافات', 
          isValid: false
        }
      case inpt.length <= 7:
        return { 
          message: isEn ? 'must be atleast 8 characters' : 'يجب الاتقل عن 8 احرف',
          isValid: false
        }
      default:
        return {
          message: isEn ? 'passowrd is validated successfully' : 'كلمه السر تم التحقق بها بنجاح', 
          isValid: true
        };
    }
  }
}