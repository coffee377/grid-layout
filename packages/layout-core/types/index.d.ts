declare module 'html-formatter' {
  namespace HtmlFormatter {
    function closing(el: string): string;

    function entity(el: string): string;

    function minify(el: string): string;

    function render(el: string, opts?: any): string;
  }

  export = HtmlFormatter;
}

declare module 'min-document' {
  const minDocument: Document;
  export = minDocument;
}
