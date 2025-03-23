import * as React from "react";

interface CustomSwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const CustomSwitch = React.forwardRef<HTMLInputElement, CustomSwitchProps>(
  ({ checked, onCheckedChange, ...props }, ref) => {
    return (
      <div
        className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors ${
          checked ? 'bg-primary' : 'bg-gray-200'
        }`}
        onClick={() => onCheckedChange(!checked)}
      >
        <span
          className={`${
            checked ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out`}
        />
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          className="sr-only"
          {...props}
        />
      </div>
    );
  }
);

CustomSwitch.displayName = "CustomSwitch"; 