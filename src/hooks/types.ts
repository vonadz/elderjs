/* eslint-disable no-use-before-define */
import { TPerfPayload, TPerfTimings } from '../utils/perf';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { THookInterface, customizeHooks, bootstrapHook } from './hookInterface';
import {
  TRequestObject,
  SettingsOptions,
  Stack,
  TErrors,
  TServerLookupObject,
  TUserHelpers,
  PluginOptions,
} from '../utils/types';
import { RouteOptions, RoutesObject } from '../routes/types';
import { ShortcodeDefs } from '../shortcodes/types';

export type THookName =
  | 'customizeHooks'
  | 'bootstrap'
  | 'allRequests'
  | 'middleware'
  | 'request'
  | 'data'
  | 'shortcodes'
  | 'stacks'
  | 'head'
  | 'compileHtml'
  | 'html'
  | 'requestComplete'
  | 'error'
  | 'buildComplete';

export type TRunHook = (hook: THookName, params: any) => Promise<any> | any | void;

interface IHookBase {
  hook: THookName;
  name: string;
  description: string;
  priority?: Number;
}

type TVoidOrUndefined = undefined | null | void;
type TGenericHookReturn<T> =
  | TVoidOrUndefined
  | T
  | Promise<TVoidOrUndefined>
  | Promise<T>
  | Partial<T>
  | Promise<Partial<T>>;

interface IHookCustomizeHooks extends IHookBase {
  hook: 'customizeHooks';
  run: (params: { perf: TPerfPayload; hookInterface: THookInterface; errors: TErrors }) => TGenericHookReturn<{
    hookInterface?: THookInterface;
    errors?: TErrors;
  }>;
}
interface IHookBootstrap extends IHookBase {
  hook: 'bootstrap';
  run: (params: {
    plugin?: Omit<PluginOptions, 'init' | 'shortcodes' | 'routes' | 'hooks'>;
    perf: TPerfPayload;
    errors: TErrors;
    helpers: TUserHelpers;
    data: any;
    settings: SettingsOptions;
    routes: RoutesObject;
    hooks: THooksArray[];
    query: any;
  }) => TGenericHookReturn<{
    errors?: TErrors;
    helpers?: TUserHelpers;
    data?: any;
    settings?: SettingsOptions;
    query?: any;
  }>;
}

/******* */

interface IAllRequestsHook extends IHookBase {
  hook: 'allRequests';
  run: (params: {
    plugin?: Omit<PluginOptions, 'init' | 'shortcodes' | 'routes' | 'hooks'>;
    perf: TPerfPayload;
    helpers: TUserHelpers;
    data: any;
    settings: SettingsOptions;
    allRequests: TRequestObject[];
    routes: RoutesObject;
    query: any;
    errors: TErrors;
  }) => TGenericHookReturn<{ errors?: TErrors; allRequests?: any }>;
}

interface IMiddlewareHook extends IHookBase {
  hook: 'middleware';
  run: (params: {
    plugin?: Omit<PluginOptions, 'init' | 'shortcodes' | 'routes' | 'hooks'>;
    perf: TPerfPayload;
    errors: TErrors;
    query: any;
    helpers: TUserHelpers;
    data: any;
    settings: SettingsOptions;
    allRequests: TRequestObject[];
    routes: RoutesObject;
    req: any;
    next: any;
    res: any;
    serverLookupObject: TServerLookupObject;
    runHook: TRunHook;
    shortcodes: ShortcodeDefs;
    request: TRequestObject;
    router: any;
  }) => TGenericHookReturn<{
    errors?: TErrors;
    query?: any;
    helpers?: TUserHelpers;
    data?: any;
    settings?: SettingsOptions;
    allRequests?: TRequestObject[];
    routes?: RoutesObject;
    req?: any;
    next?: any;
    res?: any;
    request?: TRequestObject;
    serverLookupObject?: TServerLookupObject;
  }>;
}

interface IRequestHook extends IHookBase {
  hook: 'request';
  run: (params: {
    plugin?: Omit<PluginOptions, 'init' | 'shortcodes' | 'routes' | 'hooks'>;
    perf: TPerfPayload;
    helpers: TUserHelpers;
    data: any;
    settings: SettingsOptions;
    request: TRequestObject;
    allRequests: TRequestObject[];
    query: any;
    errors: TErrors;
    routes: RoutesObject;
    route: RouteOptions;
  }) => TGenericHookReturn<{
    errors?: TErrors;
    helpers?: TUserHelpers;
    data?: any;
    settings?: SettingsOptions;
    request?: TRequestObject;
    route?: RouteOptions;
  }>;
}

interface IDataHook extends IHookBase {
  hook: 'data';
  run: (params: {
    plugin?: Omit<PluginOptions, 'init' | 'shortcodes' | 'routes' | 'hooks'>;
    perf: TPerfPayload;
    data: any;
    request: TRequestObject;
    errors: TErrors;
    helpers: TUserHelpers;
    query: any;
    routes: RoutesObject;
    cssStack: Stack;
    headStack: Stack;
    beforeHydrateStack: Stack;
    hydrateStack: Stack;
    customJsStack: Stack;
    footerStack: Stack;
    settings: SettingsOptions;
    next: any;
  }) => TGenericHookReturn<{
    errors?: TErrors;
    data?: any;
    cssStack?: Stack;
    headStack?: Stack;
    beforeHydrateStack?: Stack;
    hydrateStack?: Stack;
    customJsStack?: Stack;
    footerStack?: Stack;
  }>;
}

interface IShortcodeHook extends IHookBase {
  hook: 'shortcodes';
  run: (params: {
    plugin?: Omit<PluginOptions, 'init' | 'shortcodes' | 'routes' | 'hooks'>;
    perf: TPerfPayload;
    helpers: TUserHelpers;
    data: any;
    settings: SettingsOptions;
    request: TRequestObject;
    query: any;
    errors: TErrors;
    cssStack: Stack;
    headStack: Stack;
    customJsStack: Stack;
    layoutHtml: any;
    shortcodes: any;
    allRequests: TRequestObject[];
  }) => TGenericHookReturn<{
    errors?: TErrors;
    layoutHtml?: any;
    cssStack?: Stack;
    headStack?: Stack;
    customJsStack?: Stack;
  }>;
}

interface IStacksHook extends IHookBase {
  hook: 'stacks';
  run: (params: {
    plugin?: Omit<PluginOptions, 'init' | 'shortcodes' | 'routes' | 'hooks'>;
    perf: TPerfPayload;
    helpers: TUserHelpers;
    data: any;
    settings: SettingsOptions;
    request: TRequestObject;
    query: any;
    errors: TErrors;
    cssStack: Stack;
    htmlAttributesStack: Stack;
    bodyAttributesStack: Stack;
    headStack: Stack;
    beforeHydrateStack: Stack;
    hydrateStack: Stack;
    customJsStack: Stack;
    footerStack: Stack;
  }) => TGenericHookReturn<{
    errors?: TErrors;
    cssStack?: Stack;
    htmlAttributesStack?: Stack;
    bodyAttributesStack?: Stack;
    headStack?: Stack;
    beforeHydrateStack?: Stack;
    hydrateStack?: Stack;
    customJsStack?: Stack;
    footerStack?: Stack;
  }>;
}

interface IHeadHook extends IHookBase {
  hook: 'head';
  run: (params: {
    plugin?: Omit<PluginOptions, 'init' | 'shortcodes' | 'routes' | 'hooks'>;
    perf: TPerfPayload;
    helpers: TUserHelpers;
    data: any;
    settings: SettingsOptions;
    request: TRequestObject;
    headString: string;
    query: any;
    errors: TErrors;
  }) => TGenericHookReturn<{ errors?: TErrors; headString?: string }>;
}

interface ICompileHtmlHook extends IHookBase {
  hook: 'compileHtml';
  run: (params: {
    plugin?: Omit<PluginOptions, 'init' | 'shortcodes' | 'routes' | 'hooks'>;
    perf: TPerfPayload;
    helpers: TUserHelpers;
    data: any;
    settings: SettingsOptions;
    htmlAttributesString: string;
    bodyAttributesString: string;
    request: TRequestObject;
    headString: string;
    footerString: string;
    layoutHtml: string;
    htmlString: string;
  }) => TGenericHookReturn<{ errors?: TErrors; htmlString?: string }>;
}

interface IHtmlHook extends IHookBase {
  hook: 'html';
  run: (params: {
    plugin?: Omit<PluginOptions, 'init' | 'shortcodes' | 'routes' | 'hooks'>;
    perf: TPerfPayload;
    helpers: TUserHelpers;
    data: any;
    settings: SettingsOptions;
    request: TRequestObject;
    htmlString: string;
    query: any;
    errors: TErrors;
  }) => TGenericHookReturn<{ errors?: TErrors; htmlString?: string }>;
}

interface IRequestCompleteHook extends IHookBase {
  hook: 'requestComplete';
  run: (params: {
    plugin?: Omit<PluginOptions, 'init' | 'shortcodes' | 'routes' | 'hooks'>;
    perf: TPerfPayload;
    request: TRequestObject;
    htmlString: string;
    query: any;
    settings: SettingsOptions;
    errors: TErrors;
    timings: TPerfTimings;
    data: any;
  }) => TGenericHookReturn<{ errors?: any }>;
}

interface IErrorHook extends IHookBase {
  hook: 'error';
  run: (params: {
    plugin?: Omit<PluginOptions, 'init' | 'shortcodes' | 'routes' | 'hooks'>;
    perf: TPerfPayload;
    helpers: TUserHelpers;
    data: any;
    settings: SettingsOptions;
    request: TRequestObject;
    query: any;
    errors: TErrors;
  }) => void | undefined | Promise<void> | Promise<undefined> | any | Promise<any>;
}

interface IBuildCompleteHook extends IHookBase {
  hook: 'buildComplete';
  run: (params: {
    plugin?: Omit<PluginOptions, 'init' | 'shortcodes' | 'routes' | 'hooks'>;
    perf: TPerfPayload;
    helpers: TUserHelpers;
    data: any;
    settings: SettingsOptions;
    timings: TPerfTimings[];
    query: any;
    errors: TErrors;
    routes: RoutesObject;
    allRequests: TRequestObject[];
  }) => void | undefined | Promise<void> | Promise<undefined> | any | Promise<any>;
}

export type THooks =
  | IHookCustomizeHooks
  | IHookBootstrap
  | IAllRequestsHook
  | IMiddlewareHook
  | IRequestHook
  | IDataHook
  | IShortcodeHook
  | IStacksHook
  | IHeadHook
  | ICompileHtmlHook
  | IHtmlHook
  | IRequestCompleteHook
  | IErrorHook
  | IBuildCompleteHook;

export type THooksArray = Array<THooks>;

export type ProcessedHook<T> = T & {
  priority: Number;
  $$meta: {
    type: string;
    addedBy: string;
  };
};

export type TProcessedHook =
  | ProcessedHook<IHookCustomizeHooks>
  | ProcessedHook<IHookBootstrap>
  | ProcessedHook<IAllRequestsHook>
  | ProcessedHook<IMiddlewareHook>
  | ProcessedHook<IRequestHook>
  | ProcessedHook<IDataHook>
  | ProcessedHook<IShortcodeHook>
  | ProcessedHook<IStacksHook>
  | ProcessedHook<IHeadHook>
  | ProcessedHook<ICompileHtmlHook>
  | ProcessedHook<IHtmlHook>
  | ProcessedHook<IRequestCompleteHook>
  | ProcessedHook<IErrorHook>
  | ProcessedHook<IBuildCompleteHook>;
export type TProcessedHooksArray = Array<TProcessedHook>;
