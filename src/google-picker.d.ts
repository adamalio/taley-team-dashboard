declare namespace google {
  namespace accounts.oauth2 {
    interface TokenClient {
      callback: (response: TokenResponse) => void;
      requestAccessToken(config?: { prompt?: string }): void;
    }
    interface TokenResponse {
      access_token: string;
      error?: string;
    }
    function initTokenClient(config: {
      client_id: string;
      scope: string;
      callback: (response: TokenResponse) => void;
    }): TokenClient;
  }
  namespace picker {
    enum ViewId { DOCS = "all" }
    enum Action { PICKED = "picked", CANCEL = "cancel" }
    interface ResponseObject {
      action: string;
      docs: Array<{ id: string; name: string }>;
    }
    class DocsUploadView {
      setParent(id: string): DocsUploadView;
    }
    class DocsView {
      constructor(viewId: ViewId);
      setParent(id: string): DocsView;
      setIncludeFolders(include: boolean): DocsView;
    }
    class PickerBuilder {
      setOAuthToken(token: string): PickerBuilder;
      setDeveloperKey(key: string): PickerBuilder;
      setAppId(id: string): PickerBuilder;
      setCallback(callback: (data: ResponseObject) => void): PickerBuilder;
      addView(view: DocsUploadView | DocsView): PickerBuilder;
      setTitle(title: string): PickerBuilder;
      build(): Picker;
    }
    class Picker {
      setVisible(visible: boolean): void;
    }
  }
}
declare function gapi: never;
declare namespace gapi {
  function load(api: string, callback: () => void): void;
}
