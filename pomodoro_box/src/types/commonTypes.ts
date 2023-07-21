type IdType = string;

type ComponentRendererType = () => React.ReactNode;

type EventHandlerType = (event: Event) => Event;

type VoidFunctionType = () => void;

interface ISvgProps {
  readonly className: string;
}

type IconSize = 10 | 12 | 14 | 16 | 24 | 32 | 36 | 48 | 64 | 128;

interface IIconProps {
  readonly size: IconSize;
}

export {
  IdType,
  ComponentRendererType,
  EventHandlerType,
  VoidFunctionType,
  IconSize,
  IIconProps,
  ISvgProps
};
