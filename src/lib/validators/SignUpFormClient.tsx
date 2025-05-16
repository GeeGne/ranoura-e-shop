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
          message: isEn ? '' : '', 
          state: false
        }
      case inpt.length > 12:
        return { 
          message: isEn ? '' : '', 
          state: false
        }
      default:
        return { 
          message: isEn ? '' : '', 
          state: false
        };
    }
  }
}