import type { CommunityStepOptions, StepOptions } from '../step';
import { UsesStep } from '../step';
import { dropUndefinedKeys } from '../utils';

const ACTION = 'actions/checkout' as const;

interface ActionCheckOutStepOptions {
  pin: string;
  // The branch, tag or SHA to checkout. When checking out the repository that
  // triggered a workflow, this defaults to the reference or SHA for that event.
  // Otherwise, uses the default branch.
  ref?: string;
  // Number of commits to fetch. 0 indicates all history for all branches and tags.
  // Default: 1
  fetchDepth?: number;
}

/**
 * Wrapper around the `actions/checkout` action to check out the current commit.
 *
 * https://github.com/actions/checkout
 */
export class ActionCheckoutStep extends UsesStep {
  constructor({ pin, ref, fetchDepth }: ActionCheckOutStepOptions = { pin: '' }, options: CommunityStepOptions = {}) {
    const actionName = pin.length ? `${ACTION}@${pin}` : ACTION;

    const stepOptions: StepOptions = {
      ...options,
    };

    const withOptions = dropUndefinedKeys({
      ref,
      'fetch-depth': fetchDepth,
    });

    if (Object.keys(withOptions).length) {
      stepOptions.with = withOptions;
    }

    super(actionName, stepOptions);
  }
}
