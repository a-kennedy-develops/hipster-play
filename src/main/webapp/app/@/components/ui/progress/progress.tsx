import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import './progress.css';

import { cn } from '../../../lib/utils';

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  includePercentage?: boolean;
  ariaLabel?: string;
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, includePercentage = false, ariaLabel, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn('tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary', className)}
      aria-valuenow={value}
      aria-label={ariaLabel || 'Progress bar'}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="tw-h-full tw-bg-primary tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-300 tw-ease-in-out stripe-background"
        style={{ width: `${value}%` }}
      >
        {value >= 5 && (
          <span className="tw-text-white tw-text-xs">
            {Math.round(value)}
            {includePercentage && '%'}
          </span>
        )}
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  ),
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
