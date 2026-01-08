import { Select as SelectElement } from "@base-ui/react";

export function Root(props: SelectElement.Root.Props<string>) {
  return <SelectElement.Root {...props} />;
}

export function Trigger({ className, ...props }: SelectElement.Trigger.Props) {
  return (
    <SelectElement.Trigger
      {...props}
      className={`flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-neutral-100 px-3 py-1.5 text-sm outline-none ring-neutral-100 transition-all focus-visible:ring-2 ${className ?? ""}`}
    />
  );
}

export function Value({ className, ...props }: SelectElement.Value.Props) {
  return <SelectElement.Value className={className} {...props} />;
}

export function Icon({ className, ...props }: SelectElement.Icon.Props) {
  return (
    <SelectElement.Icon className={`flex ${className ?? ""}`} {...props} />
  );
}

export function Portal(props: SelectElement.Portal.Props) {
  return <SelectElement.Portal {...props} />;
}

export function Positioner({
  className,
  ...props
}: SelectElement.Positioner.Props) {
  return (
    <SelectElement.Positioner
      className={`z-10 select-none outline-none ${className ?? ""}`}
      sideOffset={4}
      {...props}
    />
  );
}

export function Popup({ className, ...props }: SelectElement.Popup.Props) {
  return (
    <SelectElement.Popup
      className={`rounded-xl border border-neutral-200 bg-neutral-100 shadow-lg transition-opacity ${className ?? ""}`}
      {...props}
    />
  );
}

export function List({ className, ...props }: SelectElement.List.Props) {
  return (
    <SelectElement.List
      className={`max-h-60 overflow-y-auto py-1 ${className ?? ""}`}
      {...props}
    />
  );
}

export function Item({ className, ...props }: SelectElement.Item.Props) {
  return (
    <SelectElement.Item
      className={`cursor-pointer px-3 py-2 text-sm outline-none hover:bg-neutral-200 data-[highlighted]:bg-neutral-200 ${className ?? ""}`}
      {...props}
    />
  );
}

export function ItemText({
  className,
  ...props
}: SelectElement.ItemText.Props) {
  return <SelectElement.ItemText className={className} {...props} />;
}
