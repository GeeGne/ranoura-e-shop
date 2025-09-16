export default function LoadingTable () {
  const loadingArray = [1, 2, 3, 4];
  return (
    <div className="flex flex-col gap-4 overflow-x-auto">
      <h3
        className="--opacity-blink w-[6rem] h-4 rounded-lg sticky left-0 text-lg text-transparent bg-background-deep-light"
      >
        Schemes
      </h3>
      <table
        className="
          --opacity-blink min-w-full overflow-hidden 
          divide-y divide-underline bg-background-deep-light rounded-lg whitespace-nowrap
        "
      >
        <thead className="text-body">
          <tr>
            <th scope="col" className={`opacity-0 px-6 py-3 font-medium text-xs font-medium tracking-wider`}>
              NAME
            </th>
            <th scope="col" className={`opacity-0 px-6 py-3 font-medium text-xs font-medium tracking-wider`}>
              Pallete
            </th>
            <th scope="col" className={`opacity-0 px-6 py-3 font-medium text-xs font-medium tracking-wider`}>
              OPTIONS
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-underline">
          {loadingArray.map((itm, i) => 
            <tr 
              key={i}
              className="hover:bg-yellow-50 transition-all duration-300 ease-in-out"
            >
              <td className="opacity-0 px-6 py-4 text-heading">Some Name</td>
              <td className={`flex px-6 py-4 text-sm text-body`}>
                <ul className="flex flex-row w rounded-md overflow-hidden">
                  <li
                    className={`p-3`}
                  />
                </ul>
              </td>
              <td className="px-6">
                <div className="flex gap-2">
                  <button 
                    className={`
                      relative bg-background-light rounded-md opacity-0
                      transition-all duration-500 ease-in-out
                    `}
                  >
                  </button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}