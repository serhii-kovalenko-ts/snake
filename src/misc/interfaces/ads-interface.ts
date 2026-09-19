export interface Ads {
  show(): Promise<void>;
  destroy(): void;
}
