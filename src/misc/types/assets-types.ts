import apple from "../../assets/img/snake/apple.png";

import headUp from "../../assets/img/snake/head_up.png";
import headDown from "../../assets/img/snake/head_down.png";
import headLeft from "../../assets/img/snake/head_left.png";
import headRight from "../../assets/img/snake/head_right.png";

import tailUp from "../../assets/img/snake/tail_up.png";
import tailDown from "../../assets/img/snake/tail_down.png";
import tailLeft from "../../assets/img/snake/tail_left.png";
import tailRight from "../../assets/img/snake/tail_right.png";

import bodyHorizontal from "../../assets/img/snake/body_horizontal.png";
import bodyVertical from "../../assets/img/snake/body_vertical.png";
import bodyTopLeft from "../../assets/img/snake/body_topleft.png";
import bodyTopRight from "../../assets/img/snake/body_topright.png";
import bodyBottomLeft from "../../assets/img/snake/body_bottomleft.png";
import bodyBottomRight from "../../assets/img/snake/body_bottomright.png";

export const ImageName = {
  APPLE: "apple",

  HEAD_UP: "head_up",
  HEAD_DOWN: "head_down",
  HEAD_LEFT: "head_left",
  HEAD_RIGHT: "head_right",

  TAIL_UP: "tail_up",
  TAIL_DOWN: "tail_down",
  TAIL_LEFT: "tail_left",
  TAIL_RIGHT: "tail_right",

  BODY_HORIZONTAL: "body_horizontal",
  BODY_VERTICAL: "body_vertical",

  BODY_TOP_LEFT: "body_topleft",
  BODY_TOP_RIGHT: "body_topright",
  BODY_BOTTOM_LEFT: "body_bottomleft",
  BODY_BOTTOM_RIGHT: "body_bottomright",
} as const;

export type ImageName = (typeof ImageName)[keyof typeof ImageName];
export type SpriteName = ImageName;

export const IMAGE_URLS: Record<ImageName, string> = {
  [ImageName.APPLE]: apple,

  [ImageName.HEAD_UP]: headUp,
  [ImageName.HEAD_DOWN]: headDown,
  [ImageName.HEAD_LEFT]: headLeft,
  [ImageName.HEAD_RIGHT]: headRight,

  [ImageName.TAIL_UP]: tailUp,
  [ImageName.TAIL_DOWN]: tailDown,
  [ImageName.TAIL_LEFT]: tailLeft,
  [ImageName.TAIL_RIGHT]: tailRight,

  [ImageName.BODY_HORIZONTAL]: bodyHorizontal,
  [ImageName.BODY_VERTICAL]: bodyVertical,
  [ImageName.BODY_TOP_LEFT]: bodyTopLeft,
  [ImageName.BODY_TOP_RIGHT]: bodyTopRight,
  [ImageName.BODY_BOTTOM_LEFT]: bodyBottomLeft,
  [ImageName.BODY_BOTTOM_RIGHT]: bodyBottomRight,
};
