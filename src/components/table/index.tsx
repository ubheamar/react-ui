import React, {
  FC,
  useEffect,
  useMemo,
  Fragment,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";

import {
  Column,
  useFilters,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  Row,
  useGlobalFilter,
  SortingRule,
  Filters,
  TableInstance,
} from "react-table";
import { Table as BsTable } from "react-bootstrap";

import {
  IndeterminateCheckbox,
  NoRecordsFound,
  PleaseWait,
} from "./TableHelper";
import Paginator, { PageSize } from "../paginator";
import { ArrowDownShort, ArrowUpShort } from "react-bootstrap-icons";
import classNames from "classnames";
import buildQueryString from "../../utils/buildQueryString";
import { BaseRefForwardingComponent } from "../../types";
import { TableFilterPopupProps } from "./TableFilterPopup";

export interface TableChangeParams {
  pageSize?: number;
  pageIndex?: number;
  sorts?: SortingRule<{}>[];
  filters?: Filters<{}>;
  search?: string;
}
/*
export interface Page {
  number: number;
  size: number;
}
export interface Filter {
  search: string;
}
*/

export interface TableProps {
  columns: Column<{}>[];
  data: {}[] | undefined;
  onTableChange?: (params: TableChangeParams, url: string) => void;
  loading: boolean;
  totalRecords?: number | undefined;
  serverSideOperations?: boolean;
  pageSizeList?: PageSize[];
  onSelectionChange?: (
    selectedRowIds: Record<string, boolean>,
    selectedFlatRows: Row<{}>[]
  ) => void;
  showRecordsNotFound?: boolean;
  showLoadingIndicator?: boolean;
}
type Table = BaseRefForwardingComponent<"table", TableProps>;

const Table: Table = forwardRef(
  (
    {
      columns,
      data,
      serverSideOperations,
      onTableChange,
      loading,
      totalRecords = 0,
      children,
      showRecordsNotFound,
      showLoadingIndicator,
      pageSizeList,
      onSelectionChange,
    },
    ref
  ) => {
    const tableInstance: TableInstance = useTable(
      {
        columns,
        // @ts-ignore
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

    useImperativeHandle(ref, () => tableInstance);

    const changePage = useCallback((pageNumber: number) => {
      gotoPage(pageNumber - 1);
    }, []);
    const changePageSize = useCallback((pageSize: number) => {
      setPageSize(pageSize);
    }, []);

    useEffect(() => {
      if (onTableChange) {
        const params: TableChangeParams = {
          pageSize,
          pageIndex: pageIndex + 1,
          sorts: sortBy,
          filters,
          search: globalFilter,
        };
        const url = buildQueryString(params);
        return onTableChange(params, url);
      }
    }, [onTableChange, pageIndex, pageSize, sortBy, globalFilter, filters]);

    useEffect(() => {
      onSelectionChange && onSelectionChange(selectedRowIds, selectedFlatRows);
    }, [selectedRowIds, onSelectionChange]);
    // Render the UI for your table
    return (
      <Fragment>
        <div className="table-responsive">
          <BsTable
            {...getTableProps()}
            hover
            className="align-middle table-row-dashed fs-6 gy-5 gs-5"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0"
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
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
        </div>
        {children}
        {showRecordsNotFound && (
          <NoRecordsFound loading={loading} entities={data} />
        )}
        {showLoadingIndicator && (
          <PleaseWait loading={loading} entities={data} />
        )}
        <Paginator
          currentPage={pageIndex + 1}
          showCount={5}
          limit={pageSize}
          totalCount={totalRecords}
          onPage={changePage}
          pageSizeList={pageSizeList!}
          onPageSizeChange={changePageSize}
          loading={loading}
        />
      </Fragment>
    );
  }
);

Table.defaultProps = {
  serverSideOperations: true,
  showRecordsNotFound: true,
  showLoadingIndicator: true,
  data: [],
  pageSizeList: [
    { text: "10", value: 10 },
    { text: "15", value: 15 },
    { text: "20", value: 20 },
    { text: "25", value: 25 },
    { text: "50", value: 50 },
  ],
};
export default Table;
