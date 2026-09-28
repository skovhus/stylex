/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { NodePath } from '@babel/traverse';

export type EvaluationFailure = $ReadOnly<{
  kind: 'non-static' | 'css-token',
  path: NodePath<>,
  message: string,
}>;

export type EvaluationResult<T, Extra: { ... } = {}> =
  | $ReadOnly<{ confident: true, value: T, ...Extra }>
  | $ReadOnly<{ confident: false, error: EvaluationFailure }>;

// Evaluated callbacks cross a JavaScript call boundary. Keep their failure
// intact so the caller can still distinguish runtime fallback from invalid CSS.
export class EvaluationError extends Error {
  +failure: EvaluationFailure;

  constructor(failure: EvaluationFailure) {
    super(failure.message);
    this.failure = failure;
  }
}

export function evaluationError(error: EvaluationFailure): Error {
  return error.path.buildCodeFrameError(error.message, SyntaxError);
}
