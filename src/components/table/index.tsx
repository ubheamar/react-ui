import React, { FC, useEffect, useMemo, Fragment, useCallback } from "react";

import {
  Column as RCTableColumn,
  useFilters,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  Row,
  useBlockLayout,
  useFlexLayout,
  useGlobalFilter,
} from "react-table";
import { Table as BsTable } from "react-bootstrap";

import {
  IndeterminateCheckbox,
  NoRecordsFound,
  PleaseWait,
} from "./TableHelper";
import { PageSize } from "../paginator";
import {
  ArrowDownShort,
  ArrowUpShort,
  Filter as BsFilterIcon,
} from "react-bootstrap-icons";
import classNames from "classnames";

export interface TableChangeParams {
  page: Page;
  sort?: String;
  filter: Filter;
}
export interface Page {
  number: number;
  size: number;
}
export interface Filter {
  search: string;
}
type CustomColumnFields<D> = {
  filterList?: object[];
};

export type Column<D extends object = {}> = RCTableColumn<D> &
  CustomColumnFields<D>;

export interface TableProps {
  columns: Column<{}>[];
  data: {}[];
  onTableChange?: (params: TableChangeParams) => void;
  loading: boolean;
  totalRecords?: number;
  serverSideOperations?: boolean;
  pageSizeList?: PageSize[];
  onSelectionChange?: (
    selectedRowIds: Record<string, boolean>,
    selectedFlatRows: Row<{}>[]
  ) => void;
  showRecordsNotFound?: boolean;
  showLoadingIndicator?: boolean;
}
const Table: FC<TableProps> = ({
  columns,
  data,
  serverSideOperations,
  onTableChange,
  loading,
  totalRecords,
  children,
  showRecordsNotFound,
  showLoadingIndicator,
  pageSizeList,
  onSelectionChange,
}) => {
  const tableInstance = useTable(
    {
      columns,
      data,
      // disableSortBy: true,
      autoResetSelectedRows: true,
      autoResetPage: false,
      autoResetSortBy: false,
      autoResetFilters: false,
      manualPagination: serverSideOperations,
      manualSortBy: serverSideOperations,
      manualGlobalFilter: serverSideOperations,
      manualFilters: serverSideOperations,
      /*initialState: { pageIndex: 0, pageSize: 10, sortBy: [] },*/
      pageCount: totalRecords,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      onSelectionChange &&
        hooks.visibleColumns.push((columns) => [
          {
            id: "selection",
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox
                  {...getToggleAllPageRowsSelectedProps()}
                />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
            maxWidth: 32,
          },
          ...columns,
        ]);
    }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    gotoPage,
    setPageSize,
    selectedFlatRows,
    setGlobalFilter,
    setFilter,
    toggleSortBy,
    state: {
      pageIndex,
      pageSize,
      sortBy,
      selectedRowIds,
      globalFilter,
      filters,
    },
  } = tableInstance;

  const changePage = useCallback((pageNumber: number) => {
    gotoPage(pageNumber - 1);
  }, []);
  const changePageSize = useCallback((pageSize: number) => {
    setPageSize(pageSize);
  }, []);
  useEffect(() => {
    if (onTableChange) {
      let sort = "";
      sortBy.forEach((item) => {
        sort = sort + (item.desc ? "-" : "") + `${item.id},`;
      });
      let filterObject: any = {};
      filters.forEach((filter) => {
        filterObject[filter.id] = filter.value;
      });
      const params: TableChangeParams = {
        page: {
          number: pageIndex + 1,
          size: pageSize,
        },
        sort: sort ? sort : undefined,
        filter: {
          search: globalFilter,
          ...filterObject,
        },
      };
      onTableChange(params);
    }
  }, [onTableChange, pageIndex, pageSize, sortBy, globalFilter, filters]);

  useEffect(() => {
    onSelectionChange && onSelectionChange(selectedRowIds, selectedFlatRows);
  }, [selectedRowIds, onSelectionChange]);
  // Render the UI for your table
  return (
    <Fragment>
      <BsTable
        {...getTableProps()}
        hover
        responsive
        className="table table-thead-solid table-vertical-center overflow-hidden"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                /*column.getSortByToggleProps()*/
                <th
                  {...column.getHeaderProps()}
                  className={classNames(
                    column.canFilter && "column-has-filter",
                    column.canSort && "column-has-sort"
                  )}
                >
                  <div
                    className={classNames(
                      "d-flex table-column align-items-center"
                    )}
                  >
                    <div
                      className="table-column-sorter d-flex flex-grow-1 align-items-center"
                      onClick={() => toggleSortBy(column.id)}
                    >
                      <span className="table-column-title">
                        {column.render("Header")}

                        {column.isSorted && (
                          <span className="icon-sort svg-icon svg-icon-sm ms-1 text-primary">
                            {column.isSortedDesc ? (
                              <ArrowUpShort />
                            ) : (
                              <ArrowDownShort />
                            )}
                          </span>
                        )}
                      </span>
                    </div>

                    {column.canFilter && (
                      <span
                        className="icon-filter svg-icon svg-icon-sm text-muted ms-1"
                        onClick={() => alert("filter")}
                      >
                        <BsFilterIcon />
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </BsTable>
      {children}
      {showRecordsNotFound && (
        <NoRecordsFound loading={loading} entities={data} />
      )}
      {showLoadingIndicator && <PleaseWait loading={loading} entities={data} />}
      {/*<Paginator
        currentPage={pageIndex + 1}
        showCount={5}
        limit={pageSize}
        totalCount={totalRecords}
        onPage={changePage}
        pageSizeList={pageSizeList!}
        onPageSizeChange={changePageSize}
        loading={loading}
      />*/}
    </Fragment>
  );
};

Table.defaultProps = {
  serverSideOperations: true,
  showRecordsNotFound: true,
  showLoadingIndicator: true,
  /* pageSizeList: [
    { text: "10", value: 10 },
    { text: "15", value: 15 },
    { text: "20", value: 20 },
    { text: "25", value: 25 },
    { text: "50", value: 50 },
  ],*/
};
export default Table;
