export default function Table({ dataSource, columns, innerLoading, onClick }) {
  return (
    <>
      <div
        className={"flex relative flex-col " + (innerLoading && "opacity-50")}
      >
        {innerLoading && <div className="z-2 h-full w-full absolute"></div>}
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block w-full sm:px-6 lg:px-8">
            <div className="ring-2 ring-gray-200 overflow-x-scroll border-b border-gray-200 sm:rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map(({ title }, index) => (
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        key={index}
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dataSource.map((item, index) => (
                    <tr
                      className={
                        "hover:bg-gray-100 cursor-pointer" +
                        (index % 2 !== 0 ? " bg-gray-50" : "")
                      }
                      key={item.id}
                    >
                      {columns.map((column, index) => {
                        return (
                          <td
                            className="px-6 py-4 whitespace-nowrap text-gray-500"
                            key={`column ${index}`}
                            onClick={() => {
                              if (onClick) {
                                onClick(item);
                                return;
                              }
                            }}
                          >
                            {column.render
                              ? column.render(item)
                              : item[column.dataIndex]}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
