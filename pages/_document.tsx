import Document, { Html, Head, Main, NextScript } from 'next/document';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import type { DocumentContext } from 'next/document';
import { SheetsRegistry, JssProvider, createGenerateId } from 'react-jss';
import classNames from 'classnames';
const MyDocument = () => {
  return (
    <Html lang="en" dir="rtl">
      <Head />
      <body className={classNames('min-h-screen bg-background')}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const registry = new SheetsRegistry();
  const generateId = createGenerateId();
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => (
        <JssProvider registry={registry} generateId={generateId}>
          <StyleProvider cache={cache}>
            <App {...props} />
          </StyleProvider>
        </JssProvider>
      ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <style id="server-side-styles">{registry.toString()}</style>
      </>
    ),
  };
};

export default MyDocument;
