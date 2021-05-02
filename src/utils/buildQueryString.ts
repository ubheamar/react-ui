import { stringify } from "query-string";
import { TableChangeParams } from "../components/table";

const buildQueryString = (params?: TableChangeParams): string => {
  let paramsArray: string[] = [];
  let sortString = "";
  let filterString: string[] = [];
  params?.sorts?.forEach((item) => {
    sortString = sortString + (item.desc ? "-" : "") + `${item.id},`;
  });
  params?.filters?.forEach((item) => {
    filterString.push(`filter[${item.id}]=${item.value}`);
  });
  if (params?.search) {
    paramsArray.push(`filter[search]=${params?.search}`);
  }
  if (params?.pageIndex) {
    paramsArray.push(`page[number]=${params?.pageIndex}`);
  }
  if (params?.pageSize) {
    paramsArray.push(`page[size]=${params?.pageSize}`);
  }
  if (sortString) {
    paramsArray.push(`sort=${sortString}`);
  }

  paramsArray = paramsArray.concat(filterString);
  return paramsArray.join("&");
};
export default buildQueryString;
