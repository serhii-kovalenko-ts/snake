export interface ImaAdErrorEvent {
  getError(): unknown;
}

export interface ImaAdsManagerLoadedEvent {
  getAdsManager(): ImaAdsManager;
}

export type ImaAdEventListener = () => void;
export type ImaAdErrorEventListener = (event: ImaAdErrorEvent) => void;
export type ImaAdsManagerLoadedEventListener = (event: ImaAdsManagerLoadedEvent) => void;
export type ImaEventListener = ImaAdEventListener | ImaAdErrorEventListener;
export type ImaLoaderEventListener = ImaAdsManagerLoadedEventListener | ImaAdErrorEventListener;

export interface ImaAdsManager {
  addEventListener(type: string, listener: ImaEventListener): void;
  removeEventListener(type: string, listener: ImaEventListener): void;
  init(width: number, height: number, viewMode: string): void;
  start(): void;
  resume(): void;
  destroy(): void;
}

export interface ImaAdsLoader {
  addEventListener(type: string, listener: ImaLoaderEventListener): void;
  requestAds(request: ImaAdsRequest): void;
  contentComplete(): void;
}

export interface ImaAdsRequest {
  adTagUrl: string;
  linearAdSlotWidth: number;
  linearAdSlotHeight: number;
  nonLinearAdSlotWidth: number;
  nonLinearAdSlotHeight: number;
}

export interface ImaAdDisplayContainer {
  initialize(): void;
}

export interface ImaSdk {
  AdDisplayContainer: new (container: HTMLElement) => ImaAdDisplayContainer;
  AdsLoader: new (container: ImaAdDisplayContainer) => ImaAdsLoader;
  AdsRequest: new () => ImaAdsRequest;
  AdsManagerLoadedEvent: {
    Type: {
      ADS_MANAGER_LOADED: string;
    };
  };
  AdErrorEvent: {
    Type: {
      AD_ERROR: string;
    };
  };
  AdEvent: {
    Type: {
      COMPLETE: string;
      SKIPPED: string;
      ALL_ADS_COMPLETED: string;
      CLICK: string;
      CONTENT_PAUSE_REQUESTED: string;
      CONTENT_RESUME_REQUESTED: string;
    };
  };
  ViewMode: {
    NORMAL: string;
  };
}

declare global {
  interface Window {
    google?: {
      ima?: ImaSdk;
    };
  }
}
