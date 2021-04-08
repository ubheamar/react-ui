import { BaseComponentPropsWithChildren } from "../../types";

/*
export interface ConfigProviderProps extends BaseComponentPropsWithChildren {
  getTargetContainer?: () => HTMLElement;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  prefixCls?: string;
  iconPrefixCls?: string;
  children?: React.ReactNode;
  dropdownMatchSelectWidth?: boolean;
}
interface ProviderChildrenProps extends ConfigProviderProps {
  parentContext: ConfigConsumerProps;
}

export const defaultPrefixCls = "websys";
let globalPrefixCls: string;

const setGlobalConfig = (params: Pick<ConfigProviderProps, "prefixCls">) => {
  if (params.prefixCls !== undefined) {
    globalPrefixCls = params.prefixCls;
  }
};

function getGlobalPrefixCls() {
  return globalPrefixCls || defaultPrefixCls;
}

export const globalConfig = () => ({
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls
      ? `${getGlobalPrefixCls()}-${suffixCls}`
      : getGlobalPrefixCls();
  },
  getRootPrefixCls: (rootPrefixCls?: string, customizePrefixCls?: string) => {
    // Customize rootPrefixCls is first priority
    if (rootPrefixCls) {
      return rootPrefixCls;
    }

    // If Global prefixCls provided, use this
    if (globalPrefixCls) {
      return globalPrefixCls;
    }

    // [Legacy] If customize prefixCls provided, we cut it to get the prefixCls
    if (customizePrefixCls && customizePrefixCls.includes("-")) {
      return customizePrefixCls.replace(/^(.*)-[^-]*$/, "$1");
    }

    // Fallback to default prefixCls
    return getGlobalPrefixCls();
  },
});

const ProviderChildren: React.FC<ProviderChildrenProps> = (props) => {};
*/
