import { TEST_AD_TAG } from "../config/ads-config";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../config/game-config";
import type { Ads } from "../misc/interfaces/ads-interface";
import type { ImaAdErrorEvent, ImaAdsLoader, ImaAdsManager, ImaAdsManagerLoadedEvent, ImaSdk } from "../misc/types/ads-ima-types";

export class AdsManager implements Ads {
  private sdk: ImaSdk;
  private displayContainer: {
    initialize(): void;
  };
  private loader: ImaAdsLoader;
  private manager?: ImaAdsManager;
  private resolvePlayback?: () => void;
  private initialized = false;
  private isPlaying = false;
  private hasRequestedAds = false;

  constructor(private container: HTMLElement) {
    const sdk = window.google?.ima;

    if (!sdk) {
      throw new Error("Google IMA SDK is not loaded.");
    }

    this.sdk = sdk;
    this.displayContainer = new sdk.AdDisplayContainer(container);
    this.loader = new sdk.AdsLoader(this.displayContainer);
    this.loader.addEventListener(sdk.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.handleManagerLoaded);
    this.loader.addEventListener(sdk.AdErrorEvent.Type.AD_ERROR, this.handleError);
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    window.addEventListener("focus", this.handleWindowFocus);
  }

  public show(): Promise<void> {
    this.cleanupManager();

    if (this.hasRequestedAds) {
      this.loader.contentComplete();
    }

    this.container.hidden = false;
    this.isPlaying = true;

    if (!this.initialized) {
      this.displayContainer.initialize();
      this.initialized = true;
    }

    return new Promise((resolve) => {
      this.resolvePlayback = resolve;
      const request = new this.sdk.AdsRequest();
      request.adTagUrl = TEST_AD_TAG;
      request.linearAdSlotWidth = CANVAS_WIDTH;
      request.linearAdSlotHeight = CANVAS_HEIGHT;
      request.nonLinearAdSlotWidth = CANVAS_WIDTH;
      request.nonLinearAdSlotHeight = CANVAS_HEIGHT;
      this.hasRequestedAds = true;
      this.loader.requestAds(request);
    });
  }

  public destroy(): void {
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    window.removeEventListener("focus", this.handleWindowFocus);
    this.finishPlayback();
  }

  private handleManagerLoaded = (event: ImaAdsManagerLoadedEvent): void => {
    this.manager = event.getAdsManager();
    this.addManagerListeners();
    try {
      this.manager.init(CANVAS_WIDTH, CANVAS_HEIGHT, this.sdk.ViewMode.NORMAL);
      this.manager.start();
    } catch (error) {
      console.error("Failed to start IMA ad.", error);
      this.finishPlayback();
    }
  };

  private handleClick = (): void => {
    window.focus();
  };

  private handleVisibilityChange = (): void => {
    if (document.visibilityState !== "visible") {
      return;
    }
    this.resumeAd();
  };

  private handleWindowFocus = (): void => {
    this.resumeAd();
  };

  private handleContentResume = (): void => {
    this.finishPlayback();
  };

  private handleAllAdsCompleted = (): void => {
    this.finishPlayback();
  };

  private handleError = (event: ImaAdErrorEvent): void => {
    console.error("IMA ad error.", event.getError());
    this.finishPlayback();
  };

  private resumeAd(): void {
    if (!this.isPlaying || !this.manager) {
      return;
    }
    try {
      this.manager.resume();
    } catch (error) {
      console.error("Failed to resume IMA ad.", error);
    }
  }

  private addManagerListeners(): void {
    if (!this.manager) {
      return;
    }
    this.manager.addEventListener(this.sdk.AdEvent.Type.CLICK, this.handleClick);
    this.manager.addEventListener(this.sdk.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.handleContentResume);
    this.manager.addEventListener(this.sdk.AdEvent.Type.ALL_ADS_COMPLETED, this.handleAllAdsCompleted);
    this.manager.addEventListener(this.sdk.AdErrorEvent.Type.AD_ERROR, this.handleError);
  }

  private removeManagerListeners(): void {
    if (!this.manager) {
      return;
    }
    this.manager.removeEventListener(this.sdk.AdEvent.Type.CLICK, this.handleClick);
    this.manager.removeEventListener(this.sdk.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.handleContentResume);
    this.manager.removeEventListener(this.sdk.AdEvent.Type.ALL_ADS_COMPLETED, this.handleAllAdsCompleted);
    this.manager.removeEventListener(this.sdk.AdErrorEvent.Type.AD_ERROR, this.handleError);
  }

  private finishPlayback(): void {
    this.isPlaying = false;
    this.cleanupManager();
    this.container.hidden = true;
    const resolve = this.resolvePlayback;
    this.resolvePlayback = undefined;
    resolve?.();
  }

  private cleanupManager(): void {
    if (!this.manager) {
      return;
    }
    this.removeManagerListeners();
    this.manager.destroy();
    this.manager = undefined;
  }
}
