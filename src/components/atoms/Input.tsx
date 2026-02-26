import { cn, dataDisabledProps } from "@/lib/utils";
import React, { useId, useRef } from "react";
import { FiChevronUp, FiChevronDown, FiInfo } from "react-icons/fi";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
  info?: string;
  showNumberControls?: boolean;
}

export function Input({
  error,
  fullWidth = false,
  className,
  disabled,
  info,
  showNumberControls = true,
  type,
  ...props
}: InputProps) {
  const inputId = useId();
  const infoId = info ? `${inputId}-info` : undefined;
  const ref = useRef<HTMLInputElement | null>(null);

  const inputType = type ?? "text";
  const hasNumberControls =
    inputType === "number" && showNumberControls && !disabled;

  const baseInput =
    "h-9 rounded-lg border bg-white px-3 text-(length:--font-size-sm) text-zinc-900 shadow-xs";
  const placeholderClass = "placeholder:text-zinc-400";
  const transitionClass = "transition-colors duration-150 input-transition";
  const focusClass =
    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500";
  const disabledClass = "disabled:cursor-not-allowed disabled:opacity-50";
  const errorClass = "border-red-400 focus:ring-red-500 focus:border-red-500";
  const normalBorder = "border-zinc-300";
  const prWithControl = "pr-12";
  const prDefault = "pr-3";

  const wrapperClass = "relative flex items-center";

  const spinnerWrapper =
    "absolute right-2 flex flex-col h-[calc(100%-0.75rem)] justify-center";
  const spinnerButton =
    "flex items-center justify-center w-8 h-1/2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-t-lg input-transition";
  const spinnerButtonBottom =
    "flex items-center justify-center w-8 h-1/2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-b-lg input-transition";
  const spinnerDivider = "h-px w-6 bg-gray-100 mx-auto";

  const infoWrapper = "absolute right-2 flex items-center";
  const infoButton =
    "w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 input-transition";
  const tooltipClass =
    "absolute bottom-full right-1/2 translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity whitespace-nowrap pointer-events-none";
  const tooltipArrow =
    "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800";

  return (
    <div className={cn(wrapperClass, fullWidth && "w-full")}>
      <input
        {...dataDisabledProps(disabled)}
        ref={ref}
        id={props.id}
        aria-describedby={infoId}
        type={type}
        className={cn(
          baseInput,
          hasNumberControls || info ? prWithControl : prDefault,
          placeholderClass,
          transitionClass,
          focusClass,
          disabledClass,
          error ? errorClass : normalBorder,
          fullWidth && "w-full",
          className,
        )}
        disabled={disabled}
        {...props}
      />

      {hasNumberControls && (
        <div className={spinnerWrapper} aria-hidden>
          <button
            type="button"
            aria-label="Incrementar valor"
            className={spinnerButton}
            onClick={() => ref.current?.stepUp()}
          >
            <FiChevronUp className="h-4 w-4" aria-hidden />
          </button>
          <div className={spinnerDivider} />
          <button
            type="button"
            aria-label="Disminuir valor"
            className={spinnerButtonBottom}
            onClick={() => ref.current?.stepDown()}
          >
            <FiChevronDown className="h-4 w-4" aria-hidden />
          </button>
        </div>
      )}

      {info && (
        <div
          className={infoWrapper}
          style={{ right: hasNumberControls ? 38 : 8 }}
        >
          <div className="group relative flex items-center">
            <button
              type="button"
              aria-label="Más información"
              aria-describedby={infoId}
              className={infoButton}
            >
              <FiInfo className="w-4 h-4" aria-hidden />
            </button>

            {infoId && (
              <div id={infoId} role="tooltip" className={tooltipClass}>
                {info}
                <div className={tooltipArrow} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
