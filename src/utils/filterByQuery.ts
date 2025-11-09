type FilteringTypeProps = 'contains' | 'prefix' | 'exact_match' | 'suffix';

export default function filterByQuery(
  items: any[],
  options: any,
) {

  const { 
    searchTerms, 
    searchFields = [],
    filteringType = 'contains',
    specificSearch = false,
    caseSensetive = false
  } = options;

  const normilizeTerm = (term: string) =>  caseSensetive 
    ? term.trim() 
    : term.trim().toLowerCase();
  ;

  const filterFunctions = {
    contains: (value: string, term: string) => value.includes(term),
    prefix: (value: string, term: string) => value.startsWith(term),
    exact_match: (value: string, term: string) => value === term,
    suffix: (value: string, term: string) => value.endsWith(term)
  }

  const filterFn = filterFunctions[filteringType];
  const hasSearchFields = searchFields.length > 0;
  const filteringMethod = specificSearch ? 'every' : 'some';            

  if (!searchTerms) return items;

  return items.filter((itm: Record<any, string>) => {

    if (!hasSearchFields && typeof itm === 'string' ) {
      const value = normilizeTerm(itm);
      return searchTerms.some((searchTerm: string) => 
        filterFn(value, normilizeTerm(searchTerm))
      );
    }


    if (hasSearchFields) {    
      return searchFields[filteringMethod]((field: string) => {
        const value = normilizeTerm(itm[field]);
        const isFieldEmpty = field === '';
        if (isFieldEmpty) return false;
        return searchTerms.some((searchTerm: string) => 
          filterFn(value, normilizeTerm(searchTerm))
        );
      })
    }

    return false;
  });

}

// TEST & DEBUG
// const array = ['ahmed', 'omar', 'Ahmad', 'Jon', 'Izzat', 'azzoz'];
// const array2 = [
  // {
    // name: 'ahmed',
    // email: 'example@email.com',
    // gender: 'male',
  // },
  // {
    // name: 'omar',
    // email: 'example@email.com',
    // gender: 'male',
  // },
  // {
    // name: 'Ahmad',
    // email: 'example@email.com',
    // gender: 'male',
  // },
  // {
    // name: 'Jon',
    // email: 'example@email.com',
    // gender: 'male',
  // },
  // {
    // name: 'Izzat',
    // email: 'example@email.com',
    // gender: 'male',
  // },
  // {
    // name: 'azzoz',
    // email: 'example@email.com',
    // gender: 'male',
  // },{
    // name: 'Natasha',
    // email: 'natasha@email.com',
    // gender: 'female'
  // }
// ];
// 

// console.log(
  // 'example 1: ',
    // filterByQuery(
      // array,
      // {
        // searchTerms: ['ar', 'ahm']
      // } 
  // )
// );
// console.log(
  // 'example 2: ', 
  // filterByQuery(
    // array2, 
    // {
      // searchTerms: ['male', 'ahmad'],
      // searchFields: ['gender', 'name'],
      // filteringType: 'prefix',
      // specificSearch: true
    // }
  // )
// );
