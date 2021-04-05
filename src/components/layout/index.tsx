import InternalLayout, { BasicProps, Content, Footer, Header } from './layout';


export { BasicProps as LayoutProps } from './layout';


interface LayoutType extends React.FC<BasicProps> {
    Header: typeof Header;
    Footer: typeof Footer;
    Content: typeof Content;
}

const Layout = InternalLayout as LayoutType;

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;


export default Layout;
