import { forwardRef, useId } from 'react';
import type { ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes, InputHTMLAttributes } from 'react';
import { cn } from '@/utils';

const inputBase =
  'w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-500/30 disabled:cursor-not-allowed disabled:bg-ink-50';

const labelCls = 'mb-1.5 block text-sm font-medium text-ink-800';
const errorCls = 'mt-1.5 block text-xs font-medium text-red-600';

type WrapperProps = {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  id: string;
  className?: string;
  children: ReactNode;
};

function FieldWrapper({ label, error, hint, required, id, className, children }: WrapperProps) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className={labelCls}>
          {label}
          {required && (
            <span className="ml-0.5 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-ink-500">{hint}</p>}
      {error && (
        <p className={errorCls} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

type BaseField = {
  label?: string;
  error?: string;
  hint?: string;
  id?: string;
  wrapperClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, BaseField & InputHTMLAttributes<HTMLInputElement>>(
  function Input({ label, error, hint, id, wrapperClassName, className, required, ...rest }, ref) {
    const autoId = useId();
    const inputId = id || rest.name || autoId;
    return (
      <FieldWrapper
        label={label}
        error={error}
        hint={hint}
        required={required}
        id={inputId}
        className={wrapperClassName}
      >
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={error ? true : undefined}
          className={cn(inputBase, className)}
          {...rest}
        />
      </FieldWrapper>
    );
  },
);

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  BaseField & TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ label, error, hint, id, wrapperClassName, className, required, ...rest }, ref) {
  const autoId = useId();
  const inputId = id || rest.name || autoId;
  return (
    <FieldWrapper
      label={label}
      error={error}
      hint={hint}
      required={required}
      id={inputId}
      className={wrapperClassName}
    >
      <textarea
        ref={ref}
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        className={cn(inputBase, 'min-h-[120px] resize-y', className)}
        {...rest}
      />
    </FieldWrapper>
  );
});

type SelectOption = { value: string; label: string };

export function Select({
  label,
  error,
  hint,
  id,
  wrapperClassName,
  className,
  required,
  options,
  placeholder,
  ...rest
}: BaseField &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: SelectOption[];
    placeholder?: string;
  }) {
  const autoId = useId();
  const selectId = id || rest.name || autoId;
  return (
    <FieldWrapper
      label={label}
      error={error}
      hint={hint}
      required={required}
      id={selectId}
      className={wrapperClassName}
    >
      <select
        id={selectId}
        required={required}
        aria-invalid={error ? true : undefined}
        className={cn(inputBase, 'appearance-none bg-no-repeat pr-10', className)}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%23515b78' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundPosition: 'right 0.75rem center',
        }}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

export function Checkbox({
  label,
  error,
  id,
  ...rest
}: BaseField & InputHTMLAttributes<HTMLInputElement>) {
  const autoId = useId();
  const inputId = id || rest.name || autoId;
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={inputId}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          className="mt-1 h-4 w-4 shrink-0 rounded border-ink-300 text-royal-600 focus:ring-royal-500"
          {...rest}
        />
        <label htmlFor={inputId} className="text-sm leading-relaxed text-ink-600">
          {label}
        </label>
      </div>
      {error && (
        <p className={errorCls} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
