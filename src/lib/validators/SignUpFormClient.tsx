export const validate = {
  first_name: (inpt: string, isEn: boolean) => {
    const re = /^[a-zA-Z\u0600-\u06FF]+$/;

    switch (false) {
      case inpt !== '':
        return { 
          message: isEn ? 'can\'t be blank' : 'لا يمكن ان يكون فارغا', 
          state: false
        }
      case inpt.includes(' '):
        return { 
          message: isEn ? 'must not contain Spaces' : 'يجب ان لا يحتوي على مسافات', 
          state: false
        }
      case re.test(inpt):
        return { 
          message: isEn ? 'must not contain Special Characters \'@#%$..\' or Numbers' : 'جب أن لا يحتوي على أحرف خاصة مثل \'$%@..\' أو أرقام',
          state: false
        }
      case inpt.length < 2:
        return { 
          message: isEn ? 'must be at least 3 characters' : 'يجب على الاقل 3 احرف', 
          state: false
        }
      case inpt.length > 12:
        return { 
          message: isEn ? 'must not exceed 12 characters' : 'يجب الا يتجاوز 12 حرف', 
          state: false
        }
      default:
        return { 
          message: isEn ? '' : '', 
          state: false
        };
    }
  },
  last_name: (inpt: string, isEn: boolean) => {
    const re = /^[a-zA-Z\u0600-\u06FF]+$/;

    switch (false) {
      case inpt !== '':
        return { 
          message: isEn ? 'can\'t be blank' : 'لا يمكن ان يكون فارغا', 
          state: false
        }
      case inpt.includes(' '):
        return { 
          message: isEn ? 'must not contain Spaces' : 'يجب ان لا يحتوي على مسافات', 
          state: false
        }
      case re.test(inpt):
        return { 
          message: isEn ? 'must not contain Special Characters \'@#%$..\' or Numbers' : 'جب أن لا يحتوي على أحرف خاصة مثل \'$%@..\' أو أرقام',
          state: false
        }
      case inpt.length < 2:
        return { 
          message: isEn ? 'must be at least 3 characters' : 'يجب على الاقل 3 احرف', 
          state: false
        }
      case inpt.length > 12:
        return { 
          message: isEn ? 'must not exceed 12 characters' : 'يجب الا يتجاوز 12 حرف', 
          state: false
        }
      default:
        return { 
          message: isEn ? 'last name is validated successfully' : 'الاسم الاخير تم التحقق به بنجاح', 
          state: false
        };
    }
  },
  email: (inpt: string, isEn: boolean) => {
    const re= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    switch (false) {
      case inpt !== '':
        return { 
          message: isEn ? 'can\'t be blank' : 'لا يمكن ان يكون فارغا', 
          state: false
        }
      case inpt.includes(' '):
        return { 
          message: isEn ? 'must not contain Spaces' : 'يجب ان لا يحتوي على مسافات', 
          state: false
        }
      case re.test(inpt):
        return { 
          message: isEn ? 'wronge email ex: example@email.com' : 'بريد الكتروني غير صحيح مثال: example@email.com',
          state: false
        }
      default:
        return { 
          message: isEn ? 'email is validated successfully' : 'الايميل تم التحقق به بنجاح', 
          state: false
        };
    }
  },
  password: (inpt: string, isEn: boolean) => {

    switch (false) {
      case inpt !== '':
        return { 
          message: isEn ? 'can\'t be blank' : 'لا يمكن ان يكون فارغا', 
          state: false
        }
      case inpt.includes(' '):
        return { 
          message: isEn ? 'must not contain Spaces' : 'يجب ان لا يحتوي على مسافات', 
          state: false
        }
      case inpt.length <= 7:
        return { 
          message: isEn ? 'must be atleast 8 characters' : 'يجب الاتقل عن 8 احرف',
          state: false
        }
      default:
        return {
          message: isEn ? 'passowrd is validated successfully' : 'كلمه السر تم التحقق بها بنجاح', 
          state: false
        };
    }
  },
  cPassword: (inpt: string, reference: string, isEn: boolean) => {

    switch (false) {
      case inpt !== '':
        return { 
          message: isEn ? 'can\'t be blank' : 'لا يمكن ان يكون فارغا', 
          state: false
        }
      case inpt === reference:
        return { 
          message: isEn ? 'must match the password' : 'يجب ان تطابق كلمه السر', 
          state: false
        }
      default:
        return {
          message: isEn ? 'passowrd is validated successfully' : 'كلمه السر تم التحقق بها بنجاح', 
          state: false
        };
    }
  }
}