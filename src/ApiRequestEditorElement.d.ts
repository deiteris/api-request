/* eslint-disable class-methods-use-this */
/**
@license
Copyright 2021 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import { CSSResult, TemplateResult, LitElement } from 'lit-element';
import { EventsTargetMixin } from '@advanced-rest-client/events-target-mixin';
import { AmfHelperMixin } from '@api-components/amf-helper-mixin';
import { ApiUrlDataModel } from '@api-components/api-url';
import { AmfFormItem } from '@advanced-rest-client/arc-types/src/forms/FormTypes';
import { ApiAuthorization } from '@api-components/api-authorization';
import { CredentialSource } from '@api-components/api-authorization/src/types';
import { ApiAuthorizationSettings, AuthorizationParams } from '@api-components/api-authorization/src/types';
import { ApiConsoleRequest } from './types';

export const EventCategory = 'API Request editor';

export declare class ApiRequestEditorElement extends AmfHelperMixin(EventsTargetMixin(LitElement)) {
  get styles(): CSSResult;

  /**
   * An `@id` of selected AMF shape. When changed it computes
   * method model for the selection.
   * 
   * @attribute
   */
  selected: string;
  /**
   * Hides the URL editor from the view.
   * The editor is still in the DOM.
   * @attribute
   */
  noUrlEditor: boolean;
  /**
   * When set it renders a label with the computed URL.
   * This intended to be used with `noUrlEditor` set to true.
   * This way it replaces the editor with a simple label.
   * @attribute
   */
  urlLabel: boolean;
  /**
   * A base URI for the API. To be set if RAML spec is missing `baseUri`
   * declaration and this produces invalid URL input. This information
   * is passed to the URL editor that prefixes the URL with `baseUri` value
   * if passed URL is a relative URL.
   * @attribute
   */
  baseUri: string;
  /**
   * If set it computes `hasOptional` property and shows checkbox in the
   * form to show / hide optional properties.
   * @attribute
   */
  allowHideOptional: boolean;
  /**
   * If set, enable / disable param checkbox is rendered next to each
   * form item.
   * @attribute
   */
  allowDisableParams: boolean;
  /**
   * When set, renders "add custom" item button.
   * If the element is to be used without AMF model this should always
   * be enabled. Otherwise users won't be able to add a parameter.
   * @attribute
   */
  allowCustom: boolean;
  /**
   * API server definition from the AMF model.
   *
   * This value to be set when partial AMF model for an endpoint is passed
   * instead of web api to be passed to the `api-url-data-model` element.
   *
   * Do not set with full AMF web API model.
   */
  server: any;
  /**
   * Supported protocol versions.
   *
   * E.g.
   *
   * ```json
   * ["http", "https"]
   * ```
   *
   * This value to be set when partial AMF model for an endpoint is passed
   * instead of web api to be passed to the `api-url-data-model` element.
   *
   * Do not set with full AMF web API model.
   */
  protocols: string[];
  /**
   * API version name.
   *
   * This value to be set when partial AMF model for an endpoint is passed
   * instead of web api to be passed to the `api-url-data-model` element.
   *
   * Do not set with full AMF web API model.
   * @attribute
   */
  version: string;
  /**
   * Enables compatibility with Anypoint styling
   * @attribute
   */
  compatibility: boolean;
  /**
   * Enables Material Design outlined style
   * @attribute
   */
  outlined: boolean;
  /**
   * When set the editor is in read only mode.
   * @attribute
   */
  readOnly: boolean;
  /**
   * When set all controls are disabled in the form
   * @attribute
   */
  disabled: boolean;
  /**
   * OAuth2 redirect URI.
   * This value **must** be set in order for OAuth 1/2 to work properly.
   * @attribute
   */
  redirectUri: string;
  /**
   * List of credentials source
   * @attribute
   */
  credentialsSource: Array<CredentialSource>
  /**
   * Computed from AMF model for the method HTTP method name.
   */
  _httpMethod: string;
  /**
   * Headers for the request.
   */
  _headers: string;
  /**
   * Body for the request. The type of the body depends on
   * defined in the API media type.
   */
  _payload: string;
  /**
   * Final request URL including settings like `baseUri`, AMF
   * model settings and user provided parameters.
   * This value is always computed by the `api-url-editor` even if it's
   * hidden from the view.
   * @attribute
   */
  url: string;
  /**
   * Current content type as defined by headers.
   */
  _headerContentType: string;
  /**
   * Current content type as defined by body editor.
   */
  _bodyContentType: string;
  /**
   * Computed value of security scheme from selected method.
   */
  _securedBy: any[];
  /**
   * Computed list of headers in the AMF model
   */
  _apiHeaders: any[];
  /**
   * Defined by the API payload data.
   */
  _apiPayload: any[];
  /**
   * Computed value if the method can carry a payload.
   */
  _isPayloadRequest: boolean;
  /**
   * Flag set when the request is being made.
   */
  _loadingRequest: boolean;
  /**
   * Generated request ID when the request is sent. This value is reported
   * in send and abort events
   */
  _requestId: string;
  /**
   * Request query parameters view model
   */
  _queryModel: AmfFormItem[];
  /**
   * Request path parameters view model
   */
  _pathModel: AmfFormItem[];

  _endpointUri: string;
  _apiBaseUri: string;
  /**
   * @attribute
   */
  serversCount: number;
  /**
   * Holds the value of the currently selected server
   * Data type: URI
   * @attribute
   */
  serverValue: string;
  /**
   * Holds the type of the currently selected server
   * Values: `server` | `uri` | `custom`
   * @attribute
   */
  serverType: string;
  /**
   * Optional property to set
   * If true, the server selector is not rendered
   * @attribute
   */
  noServerSelector: boolean;
  /**
   * Optional property to set
   * If true, the server selector custom base URI option is rendered
   * @attribute
   */
  allowCustomBaseUri: boolean;
  /**
   * When enabled, does not clear cache on AMF change
   * @attribute
   */
  persistCache: boolean;

  servers: any[];

  get httpMethod(): string;

  get headers(): string;

  get payload(): any;

  get contentType(): string;

  get securedBy(): any[];

  get apiHeaders(): any[];

  get apiPayload(): any[];

  get isPayloadRequest(): boolean;

  get loadingRequest(): boolean;

  get requestId(): string;

  /**
   * This is the final computed value for the baseUri to propagate downwards
   * If baseUri is defined, return baseUri
   * Else, return the selectedServerValue if serverType is not `server`
   */
  get effectiveBaseUri(): string;

  /**
   * @returns True when there are not enough servers to render the selector
   */
  get _serverSelectorHidden(): boolean;

  /**
   * @return A reference to the authorization panel, if exists
   */
  get _auth(): ApiAuthorization;
  
  urlFactory: ApiUrlDataModel;
  
  constructor();

  _attachListeners(node: EventTarget): void;

  _detachListeners(node: EventTarget): void;

  /**
   * Overrides `AmfHelperMixin.__amfChanged`.
   * It updates selection and clears cache in the model generator, per APIC-229
   */
  __amfChanged(amf: any): void;

  /**
   * Reads the URL data from the ApiUrlDataModel library and sets local variables.
   */
  readUrlData(): void;

  /**
   * Dispatches bubbling and composed custom event.
   * By default the event is cancelable until `cancelable` property is set to false.
   */
  _dispatch(type: string, detail?: any, cancelable?: boolean): CustomEvent;

  /**
   * Clears the request properties.
   */
  clearRequest(): void;

  _selectedChanged(): void;

  _computeMethodAmfModel(model: any, selected: string): any[]|undefined;

  /**
   * Computes AMF model for authorization panel.
   *
   * @param model Current method model.
   * @returns List of security definitions for the endpoint.
   */
  _computeSecuredBy(model: any): any[]|undefined;

  /**
   * Computes model definition for headers.
   *
   * @param model Method model
   * @returns List of headers or undefined.
   */
  _computeHeaders(model: any): any[]|undefined;

  /**
   * Computes value for `apiPayload` property from AMF model for current
   * method.
   *
   * @param model Operation model.
   * @return Method payload.
   */
  _computeApiPayload(model: any): any[]|undefined;

  /**
   * Computes value for `isPayloadRequest`.
   * Only `GET` and `HEAD` methods are known as ones that can't carry a
   * payload. For any other HTTP method this always returns true.
   *
   * @param method HTTP method value
   */
  _computeIsPayloadRequest(method: string): boolean;

  /**
   * Handles send button click.
   * Depending on authorization validity it either sends the
   * request or forces authorization and sends the request.
   */
  _sendHandler(): void;

  /**
   * To be called when the user want to execute the request but
   * authorization is invalid (missing values).
   * This function brings the auth panel to front and displays error toast
   *
   * TODO: There is a case when the user didn't requested OAuth2 token
   * but provided all the data. This function should check for this
   * condition and call authorization function automatically.
   */
  authAndExecute(): Promise<void>;

  /**
   * Executes the request by dispatching `api-request` custom event.
   * The event must be handled by hosting application to ensure transport.
   * Use `advanced-rest-client/xhr-simple-request` component to add logic
   * that uses XHR as a transport.
   *
   * Hosting application also must reset state of `loadingRequest` property
   * once the response is ready. It also can dispatch `api-response`
   * custom event handled by this element to reset state. This is also
   * handled by `xhr-simple-request` component.
   */
  execute(): void;

  /**
   * Sends the `abort-api-request` custom event to cancel the request.
   * Calling this method before sending request may have unexpected
   * behavior because `requestId` is only set with `execute()` method.
   */
  abort(): void;

  /**
   * Event handler for abort click.
   */
  _abortRequest(): void;

  /**
   * Returns an object with the request properties.
   * The object contains:
   * - `method` (String)
   * - `url` (String)
   * - `headers` (String)
   * - `payload` (String)
   * - `auth` (Object[])
   *
   * The `auth` property is optional and is only added to the request if
   * simple `authorization` header will not work. For example NTLM auth
   * method has to be made on a single socket connection (authorization
   * and the request) so it can't be made before the request.
   *
   * The `auth` object contains 2 properties:
   * - `type` (String) the authorization type - one of from the
   * `auth-methods` element
   * - `settings` (Object) Authorization parameters entered by the user.
   * It vary and depends on selected auth method.
   * For example in case of the NTLM it will be: `username`, `password` and
   * `domain`. See `advanced-rest-client/auth-methods` for model descriptions.
   *
   */
  serializeRequest(): ApiConsoleRequest;

  /**
   * A function that applies authorization parameters to the request object.
   *
   * @param request The request object
   * @param settings The authorization settings from the auth panel
   * @param authParams A parameters to apply to the request
   */
  _applyAuthorization(request: ApiConsoleRequest, settings: ApiAuthorizationSettings[], authParams: AuthorizationParams): void;

  /**
   * Applies a map of query parameters to the request object.
   * @param request The request object
   * @param params A map of query parameters to apply to the request
   */
  _applyQueryParams(request: ApiConsoleRequest, params: Record<string, string>): void;

  /**
   * Applies a map of headers to the request object.
   * @param request The request object
   * @param headers A map of headers to apply to the request
   */
  _applyHeaders(request: ApiConsoleRequest, headers: Record<string, string>): void;

  /**
   * Handler for the `api-response` custom event.
   * Clears the loading state.
   */
  _responseHandler(e: CustomEvent): void;

  /**
   * Handler for the `oauth2-redirect-uri-changed` custom event. Changes
   * the `redirectUri` property.
   */
  _authRedirectChangedHandler(e: CustomEvent): void;

  _urlHandler(e: Event): void;

  _pathModelHandler(e: Event): void;

  _queryModelHandler(e: Event): void;

  _headersHandler(e: Event): void;

  _payloadHandler(e: Event): void;

  _contentTypeHandler(e: Event): void;

  _authChanged(e: Event): void;

  /**
   * Computes a current server value for selection made in the server selector.
   */
  _updateServer(): void;

  /**
   * @param value Server's base URI
   * @return An element associated with the base URI or undefined if not found.
   */
  _findServerByValue(value: string): any|undefined;

  /**
   * @param server Server definition.
   * @returns Value for server's base URI
   */
  _getServerUri(server: any): string|undefined;

  /**
   * Updates the list of servers for current operation so a server for current
   * selection can be computed.
   */
  _updateServers(): void;

  /**
   * Handler for the change dispatched from the server selector.
   */
  _serverCountHandler(e: CustomEvent): void;

  /**
   * Handler for the change dispatched from the server selector.
   */
  _serverHandler(e: CustomEvent): void;

  /**
   * Given a headers string, if it does not contain a Content-Type header,
   * set it manually and return the computed headers string.
   */
  _ensureContentTypeInHeaders(headersString: string): string

  render(): TemplateResult;

  _oauthHandlersTemplate(): TemplateResult;

  _urlEditorTemplate(): TemplateResult;

  /**
   * @return Template for the request URL label.
   */
  _urlLabelTemplate(): TemplateResult|string;

  _paramsEditorTemplate(): TemplateResult;

  _headersEditorTemplate(): TemplateResult;

  _bodyEditorTemplate(): TemplateResult|string;

  _authTemplate(): TemplateResult|string;

  _formActionsTemplate(): TemplateResult;

  /**
   * Creates a template for the "abort" button.
   */
  _abortButtonTemplate(): TemplateResult;

  /**
   * Creates a template for the "send" or "auth and send" button.
   */
  _sendButtonTemplate(): TemplateResult;

  /**
   * @return A template for the server selector
   */
  _serverSelectorTemplate(): TemplateResult;
}
