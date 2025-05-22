export const validate = {
  firstName: (inpt: string, isEn: boolean) => {
    const re = /^[a-zA-Z\u0600-\u06FF]+$/;

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
          message: isEn ? 'must not contain Special Characters \'@#%$..\' or Numbers' : 'جب أن لا يحتوي على أحرف خاصة مثل \'$%@..\' أو أرقام',
          isValid: false
        }
      case inpt.length < 2:
        return { 
          message: isEn ? 'must be at least 3 characters' : 'يجب على الاقل 3 احرف', 
          isValid: false
        }
      case inpt.length > 12:
        return { 
          message: isEn ? 'must not exceed 12 characters' : 'يجب الا يتجاوز 12 حرف', 
          isValid: false
        }
      default:
        return { 
          message: isEn ? '' : '', 
          isValid: true
        };
    }
  },
  lastName: (inpt: string, isEn: boolean) => {
    const re = /^[a-zA-Z\u0600-\u06FF]+$/;

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
          message: isEn ? 'must not contain Special Characters \'@#%$..\' or Numbers' : 'جب أن لا يحتوي على أحرف خاصة مثل \'$%@..\' أو أرقام',
          isValid: false
        }
      case inpt.length < 2:
        return { 
          message: isEn ? 'must be at least 3 characters' : 'يجب على الاقل 3 احرف', 
          isValid: false
        }
      case inpt.length > 12:
        return { 
          message: isEn ? 'must not exceed 12 characters' : 'يجب الا يتجاوز 12 حرف', 
          isValid: false
        }
      default:
        return { 
          message: isEn ? 'last name is validated successfully' : 'الاسم الاخير تم التحقق به بنجاح', 
          isValid: true
        };
    }
  },
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
  phoneNumber: (inpt: string, isEn: boolean) => {
    const re= /^\+?\d{1,4}(\s\d{3}){2}\s\d{3}$/;;
     
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
      case re.test(inpt):
        return { 
          message: isEn ? 'wrong phone number ex: +963 936 534 080' : 'رقم هاتف خاطئ مثال: +963 936 534 080',
          isValid: false
        }
      default:
        return { 
          message: isEn ? 'phone number is validated successfully' : 'رقم الهاتف تم التحقق به بنجاح', 
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
  },
  cPassword: (inpt: string, reference: string, isEn: boolean) => {

    switch (true) {
      case inpt === '':
        return { 
          message: isEn ? 'can\'t be blank' : 'لا يمكن ان يكون فارغا', 
          isValid: false
        }
      case inpt !== reference:
        return {
          message: isEn ? 'must match the password' : 'يجب ان تطابق كلمه السر', 
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