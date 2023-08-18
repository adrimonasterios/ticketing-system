import { ChangeEventHandler, KeyboardEvent, useEffect, useState } from "react";
import { classNames } from "@/_utils/helpers";
import Button, { ButtonProps } from "./Button";
import HeroIcon from "./HeroIcon";
import Input from "./Form/Input";

type Header = {
  label: string;
  field: string;
  className?: string;
  srOnly?: boolean;
  sortable?: boolean;
};

type Item = { [key: string]: any };

type Props = {
  title: string;
  headers: Header[];
  items: Item;
  description?: string;
  actionButton?: ButtonProps;
  itemsPerPage?: number;
  withSorting?: {
    sortingBy: string;
    sortingOrder: string;
    onSort: (name: string) => void;
  };
  withSearch?: {
    searchTerm: string;
    onSearch: ChangeEventHandler<HTMLInputElement>;
  };
};

const List = ({
  title,
  description,
  headers,
  items,
  actionButton,
  itemsPerPage,
  withSorting,
  withSearch,
}: Props) => {
  const [pages, setPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (itemsPerPage) {
      setPages(Math.ceil(items.length / itemsPerPage));
      setCurrentPage(1);
    }
  }, [itemsPerPage, items]);

  const itemsToShow = itemsPerPage
    ? items.slice(
        (currentPage - 1) * itemsPerPage,
        (currentPage - 1) * itemsPerPage + itemsPerPage
      )
    : items;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pages) return;
    setCurrentPage(page);
  };

  return (
    <div className="w-full py-10 ring-1 ring-slate-900/10 rounded-lg px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {title}
          </h1>
          <p className="mt-2 text-sm text-gray-700">{description}</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {!!actionButton && (
            <Button
              text={actionButton.text}
              onClick={actionButton.onClick}
              variant="primary"
            />
          )}
        </div>
      </div>
      {!!withSearch && (
        <div className="mt-8">
          <Input
            value={withSearch.searchTerm}
            onChange={withSearch.onSearch}
            leadingAddOn={
              <HeroIcon className="h-5 w-5" icon="MagnifyingGlassIcon" />
            }
          />
        </div>
      )}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th
                      scope="col"
                      className={classNames(
                        "whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900",
                        header.className
                      )}
                      key={`header-${index}`}
                    >
                      {header.srOnly ? (
                        <span className="sr-only">{header.label}</span>
                      ) : (
                        <span className="flex">
                          {header.label}
                          <span
                            className={classNames(
                              "ml-2 flex-none rounded cursor-pointer group-hover:visible group-focus:visible",
                              header.sortable ? "" : "invisible ",
                              header.field === withSorting?.sortingBy
                                ? "text-text-400"
                                : "text-gray-400"
                            )}
                            onClick={() => withSorting?.onSort?.(header.field)}
                          >
                            {withSorting?.sortingBy !== header.field ||
                            withSorting?.sortingOrder === "asc" ? (
                              <HeroIcon
                                className="h-5 w-5"
                                icon="ChevronDownIcon"
                              />
                            ) : (
                              <HeroIcon
                                className="h-5 w-5"
                                icon="ChevronUpIcon"
                              />
                            )}
                          </span>
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {itemsToShow.map((item: Item, idx: number) => (
                  <tr key={`item-${idx}`} className="hover:bg-gray-100">
                    {headers.map((header, index) => (
                      <td
                        className={classNames(
                          "whitespace-nowrap px-2 py-2 text-sm text-gray-900",
                          header.className
                        )}
                        key={`item-${index}`}
                      >
                        {item[header.field]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {!!itemsPerPage && !!pages && (
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
          <div className="-mt-px flex w-0 flex-1">
            <span
              onClick={() => handlePageChange(currentPage - 1)}
              className={classNames(
                "inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium",
                currentPage === 1
                  ? "text-gray-300 "
                  : "text-gray-500  hover:border-gray-300 hover:text-gray-700 cursor-pointer"
              )}
            >
              <HeroIcon
                className={classNames(
                  "mr-3 h-5 w-5 text-gray-400",
                  currentPage === 1 ? "text-gray-300" : "text-gray-400"
                )}
                icon="ArrowLongLeftIcon"
              />
              Previous
            </span>
          </div>
          <div className="hidden md:-mt-px md:flex">
            {Array.from({ length: Math.min(pages, 3) }, (_, index) =>
              currentPage > 2 && !(currentPage > pages - 3)
                ? index + currentPage - 1
                : index + 1
            ).map((page, idx) => (
              <span
                className={classNames(
                  "cursor-pointer inline-flex items-center border-t-2  px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  page === currentPage
                    ? "border-gray-300 text-gray-700"
                    : "border-transparent"
                )}
                key={`page-${idx}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </span>
            ))}

            {!!(pages > 6) && (
              <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
                ...
              </span>
            )}

            {Array.from(
              { length: Math.min(pages - 3, 3) },
              (_, index) => pages - 2 + index
            ).map((page, idx) => (
              <span
                className={classNames(
                  "cursor-pointer inline-flex items-center border-t-2  px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  page === currentPage
                    ? "border-gray-300 text-gray-700"
                    : "border-transparent"
                )}
                key={`page-${idx}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </span>
            ))}
          </div>
          <div className="-mt-px flex w-0 flex-1 justify-end">
            <span
              onClick={() => handlePageChange(currentPage + 1)}
              className={classNames(
                "inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium ",
                currentPage === pages
                  ? "text-gray-300 "
                  : "text-gray-500  hover:border-gray-300 hover:text-gray-700 cursor-pointer "
              )}
            >
              Next
              <HeroIcon
                className={classNames(
                  "ml-3 h-5 w-5",
                  currentPage === pages ? "text-gray-300" : "text-gray-400"
                )}
                icon="ArrowLongRightIcon"
              />
            </span>
          </div>
        </nav>
      )}
    </div>
  );
};

export default List;
