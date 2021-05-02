import React from "react";
import { FC } from "react";
import { PaginatorProps } from "./index";
import { Pagination } from "react-bootstrap";

type PaginatorLinksProps = {
  paginatorProps: PaginatorProps;
};

export const getPagesCount = (totalSize: number, sizePerPage: number) => {
  return Math.ceil(totalSize / sizePerPage);
};
export const getPages = (
  page: number,
  pagesCount: number,
  paginationSize: number
) => {
  const result: number[] = [];
  if (!page) {
    return result;
  }

  if (pagesCount === 1) {
    result.push(1);
    return result;
  }

  if (pagesCount < page) {
    return result;
  }

  if (pagesCount < paginationSize + 1) {
    for (let i = 1; i < pagesCount + 1; i++) {
      result.push(i);
    }
    return result;
  }

  if (page === 1) {
    for (let i = 1; i < paginationSize + 1; i++) {
      if (i < pagesCount) {
        result.push(i);
      }
    }
    return result;
  }

  if (page === pagesCount) {
    for (let i = pagesCount - paginationSize + 1; i <= pagesCount; i++) {
      if (i <= pagesCount) {
        result.push(i);
      }
    }
    return result;
  }

  const shiftCount = Math.floor(paginationSize / 2);
  if (shiftCount < 1) {
    result.push(page);
    return result;
  }

  //
  if (page < shiftCount + 2) {
    for (let i = 1; i < paginationSize + 1; i++) {
      result.push(i);
    }
    return result;
  }

  if (pagesCount - page < shiftCount + 2) {
    for (let i = pagesCount - paginationSize; i < pagesCount + 1; i++) {
      result.push(i);
    }
    return result;
  }

  for (let i = page - shiftCount; i < page; i++) {
    if (i > 0) {
      result.push(i);
    }
  }
  result.push(page);
  for (let i = page + 1; i < page + shiftCount + 1; i++) {
    if (i <= pagesCount) {
      result.push(i);
    }
  }

  return result;
};
const PaginatorLinks: FC<PaginatorLinksProps> = ({ paginatorProps }) => {
  const pagesCount = getPagesCount(
    paginatorProps.totalCount,
    paginatorProps.limit
  );
  const pages = getPages(
    paginatorProps.currentPage,
    pagesCount,
    paginatorProps.showCount
  );
  const handleFirstPage = () => {
    paginatorProps.onPage(1);
  };

  const handlePrevPage = (page: number) => {
    paginatorProps.onPage(page - 1);
  };

  const handleNextPage = (page: number) => {
    if (page < pagesCount) {
      paginatorProps.onPage(page + 1);
    }
  };

  const handleLastPage = () => {
    paginatorProps.onPage(pagesCount);
  };
  const disabledClass = pagesCount > 1 ? "" : "disabled";
  return (
    <>
      {pagesCount < 2 && <></>}
      {pagesCount > 1 && (
        <Pagination>
          <Pagination.First
            className="me-2"
            onClick={() => handleFirstPage()}
          />
          <Pagination.Prev
            className="me-2"
            onClick={() => handlePrevPage(paginatorProps.currentPage)}
          />
          {paginatorProps.currentPage > 1 && (
            <Pagination.Ellipsis disabled className="me-2" />
          )}
          {pages.map((p) => (
            <Pagination.Item
              className="me-2"
              key={p}
              onClick={() => paginatorProps.onPage(p)}
              active={paginatorProps.currentPage === p}
            >
              {p}
            </Pagination.Item>
          ))}
          {paginatorProps.currentPage < pagesCount && (
            <Pagination.Ellipsis disabled className="me-2" />
          )}
          <Pagination.Next
            className="me-2"
            onClick={() => handleNextPage(paginatorProps.currentPage)}
          />
          <Pagination.Last className="me-2" onClick={() => handleLastPage()} />
        </Pagination>
      )}
    </>
  );
};

export default PaginatorLinks;
