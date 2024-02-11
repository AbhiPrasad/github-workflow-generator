import { describe, expect, test } from 'vitest';
import { ActionCheckoutStep } from '../../src/community/action-checkout';

describe('ActionCheckoutStep', () => {
  test.each([
    ['regular', new ActionCheckoutStep()],
    ['with pinned version', new ActionCheckoutStep({ pin: 'v4' })],
    ['with pinned sha', new ActionCheckoutStep({ pin: 'dd126dd8c253650d181ad9538d8b4fa218fc31e8' })],
    ['with ref', new ActionCheckoutStep({ pin: 'v4', ref: '${{ env.HEAD_COMMIT }}' })],
    ['with fetchDepth', new ActionCheckoutStep({ pin: 'v4', fetchDepth: 2 })],
    ['with ref and fetchDepth', new ActionCheckoutStep({ pin: 'v4', ref: '${{ env.HEAD_COMMIT }}', fetchDepth: 2 })],
    ['with ref and fetchDepth', new ActionCheckoutStep({ pin: 'v4' }, { name: 'Checkout' })],
  ])('%s', (_, step) => {
    expect(step.toJSON()).toMatchSnapshot();
  });
});
