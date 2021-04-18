import React, { FC, Fragment, forwardRef, RefObject } from "react";
import classNames from "classnames";
import Button from "../button";

interface NoRecordsFoundProps {
  entities: {}[];
  loading: boolean;
}

export const NoRecordsFound: FC<NoRecordsFoundProps> = ({
  entities,
  loading,
}) => {
  const entityList = entities === null ? [] : entities;
  return (
    <Fragment>
      {entityList.length === 0 && entities !== null && !loading && (
        <div className="d-flex justify-content-center align-items-center">
          No records found
        </div>
      )}
    </Fragment>
  );
};

interface PleaseWaitProps {
  entities: {}[];
  loading: boolean;
}

export const PleaseWait: FC<PleaseWaitProps> = ({ entities, loading }) => {
  const entityList = entities === null ? [] : entities;
  return (
    <Fragment>
      {entityList.length === 0 && entities !== null && loading && (
        <div className="d-flex justify-content-center align-items-center">
          Please wait...
        </div>
      )}
    </Fragment>
  );
};

interface IndeterminateCheckboxProps
  extends React.ComponentPropsWithoutRef<"input"> {
  indeterminate?: boolean;
  className?: string;
}

export const IndeterminateCheckbox = React.forwardRef<
  HTMLInputElement,
  IndeterminateCheckboxProps
>(({ indeterminate, className, ...props }, ref) => {
  const defaultRef = React.useRef<HTMLInputElement>(null);
  const resolvedRef: any = ref || defaultRef;
  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);
  return (
    <input
      type="checkbox"
      ref={resolvedRef}
      {...props}
      className="form-check-input border-0 text-base"
    />
  );
});

/*
interface TableActionProps {
  title?: string;
  onClick: () => void;
  icon: string;
  buttonClass?: string;
  iconClass?: string;
}


export const TableAction: FC<TableActionProps> = ({
  title,
  onClick,
  icon,
  buttonClass,
  iconClass,
}) => {
  const buttonClassNames = classNames("btn-icon mx-1 ", buttonClass);
  const iconClassNames = classNames("svg-icon-md", iconClass);
  return (
    <Button
      title={title}
      variant="light"
      size="sm"
      className={buttonClassNames}
      onClick={onClick}
    >
      <Svg className={iconClassNames} name={icon} />
    </Button>
  );
};

interface TableActionsProps {}

export const TableActions: FC<TableActionsProps> = ({ children }) => {
  return <div>{children}</div>;
};
*/
