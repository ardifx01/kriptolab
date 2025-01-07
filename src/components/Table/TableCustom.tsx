import classNames from "classnames";

import TableHeaderCell from "./TableHeaderCell";
import { CustomTableProps } from "./types";

const CustomTable = <T extends Record<string, any>>({
  columns = [],
  data = [],
  rowKey,
  rowHeight = 60,
  headerHeight = 60,
  className,
  wrapperClassName,
  containerClassName,
  trHeaderClassName,
  bodyClassName,
  onRowClick,
  includeThead = true,
}: CustomTableProps<T>) => {
  const getRowKey = (row: T) => {
    if (Array.isArray(rowKey)) {
      return rowKey.map((key) => row[key]).join("-");
    }
    return row[rowKey];
  };

  return (
    <div
      className={classNames(
        "overflow-hidden rounded-xl border border-borderColor text-sm md:text-base",
        wrapperClassName,
      )}
    >
      <div
        className={classNames(
          "no-scroller-y relative z-0 w-full overflow-x-auto overflow-y-hidden",
          containerClassName,
        )}
      >
        <table className={className}>
          {includeThead && (
            <thead>
              <tr
                className={classNames(
                  "font-medium text-gray-300",
                  trHeaderClassName,
                )}
                style={{ height: headerHeight }}
              >
                {columns.map(
                  ({ key, label, width, headerClassName, ...rest }) => (
                    <TableHeaderCell
                      key={key}
                      label={label}
                      style={{ minWidth: width, fontWeight: 500 }}
                      {...rest}
                      className={classNames(
                        "bg-cardBackground first:rounded-tl-xl last:rounded-tr-xl",
                        headerClassName,
                      )}
                    />
                  ),
                )}
              </tr>
            </thead>
          )}
          <tbody className={bodyClassName}>
            {data.length > 0 &&
              data.map((row) => (
                <tr
                  onClick={() => onRowClick && onRowClick(row)}
                  key={getRowKey(row)}
                  style={{ height: rowHeight }}
                  className="cursor-pointer border-b border-borderColor last:border-b-0 hover:bg-cardBackground/40"
                >
                  {columns.map(({ key, width, className, customRender }) => (
                    <td
                      key={key}
                      style={{ minWidth: width }}
                      className={className}
                    >
                      {customRender ? customRender(row[key], row) : row[key]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
