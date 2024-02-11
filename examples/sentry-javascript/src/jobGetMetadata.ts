import { JobBuilder } from 'github-workflow-generator';

const jobGetMetadata = new JobBuilder();

// job_get_metadata:
//   name: Get Metadata
//   runs-on: ubuntu-20.04
//   permissions:
//     pull-requests: read
//   steps:
//     - name: Check out current commit
//       uses: actions/checkout@v4
//       with:
//         ref: ${{ env.HEAD_COMMIT }}
//         # We need to check out not only the fake merge commit between the PR and the base branch which GH creates, but
//         # also its parents, so that we can pull the commit message from the head commit of the PR
//         fetch-depth: 2
//     - name: Get metadata
//       id: get_metadata
//       # We need to try a number of different options for finding the head commit, because each kind of trigger event
//       # stores it in a different location
//       run: |
//         COMMIT_SHA=$(git rev-parse --short ${{ github.event.pull_request.head.sha || github.event.head_commit.id || env.HEAD_COMMIT }})
//         echo "COMMIT_SHA=$COMMIT_SHA" >> $GITHUB_ENV
//         echo "COMMIT_MESSAGE=$(git log -n 1 --pretty=format:%s $COMMIT_SHA)" >> $GITHUB_ENV

//     - name: Determine changed packages
//       uses: dorny/paths-filter@v3.0.0
//       id: changed
//       with:
//         filters: |
//           workflow: &workflow
//             - '.github/**'
//           shared: &shared
//             - *workflow
//             - '*.{js,ts,json,yml,lock}'
//             - 'CHANGELOG.md'
//             - 'jest/**'
//             - 'scripts/**'
//             - 'packages/core/**'
//             - 'packages/rollup-utils/**'
//             - 'packages/tracing/**'
//             - 'packages/tracing-internal/**'
//             - 'packages/utils/**'
//             - 'packages/types/**'
//             - 'packages/integrations/**'
//           browser: &browser
//             - *shared
//             - 'packages/browser/**'
//             - 'packages/replay/**'
//             - 'packages/replay-canvas/**'
//             - 'packages/feedback/**'
//             - 'packages/wasm/**'
//           browser_integration:
//             - *shared
//             - *browser
//             - 'dev-packages/browser-integration-tests/**'
//           ember:
//             - *shared
//             - *browser
//             - 'packages/ember/**'
//           nextjs:
//             - *shared
//             - *browser
//             - 'packages/nextjs/**'
//             - 'packages/node/**'
//             - 'packages/react/**'
//           remix:
//             - *shared
//             - *browser
//             - 'packages/remix/**'
//             - 'packages/node/**'
//             - 'packages/react/**'
//           node:
//             - *shared
//             - 'packages/node/**'
//             - 'packages/node-experimental/**'
//             - 'packages/profiling-node/**'
//             - 'dev-packages/node-integration-tests/**'
//           profiling_node:
//             - *shared
//             - 'packages/node/**'
//             - 'packages/profiling-node/**'
//             - 'dev-packages/e2e-tests/test-applications/node-profiling/**'
//           profiling_node_bindings:
//             - *workflow
//             - 'packages/profiling-node/bindings/**'
//             - 'dev-packages/e2e-tests/test-applications/node-profiling/**'
//           deno:
//             - *shared
//             - *browser
//             - 'packages/deno/**'
//           any_code:
//             - '!**/*.md'

//     - name: Get PR labels
//       id: pr-labels
//       uses: mydea/pr-labels-action@fn/bump-node20

//   outputs:
//     commit_label: "${{ env.COMMIT_SHA }}: ${{ env.COMMIT_MESSAGE }}"
//     changed_nextjs: ${{ steps.changed.outputs.nextjs }}
//     changed_ember: ${{ steps.changed.outputs.ember }}
//     changed_remix: ${{ steps.changed.outputs.remix }}
//     changed_node: ${{ steps.changed.outputs.node }}
//     changed_profiling_node: ${{ steps.changed.outputs.profiling_node }}
//     changed_profiling_node_bindings: ${{ steps.changed.outputs.profiling_node_bindings }}
//     changed_deno: ${{ steps.changed.outputs.deno }}
//     changed_browser: ${{ steps.changed.outputs.browser }}
//     changed_browser_integration: ${{ steps.changed.outputs.browser_integration }}
//     changed_any_code: ${{ steps.changed.outputs.any_code }}
//     # Note: These next three have to be checked as strings ('true'/'false')!
//     is_develop: ${{ github.ref == 'refs/heads/develop' }}
//     is_release: ${{ startsWith(github.ref, 'refs/heads/release/') }}
//     # When merging into master, or from master
//     is_gitflow_sync: ${{ github.head_ref == 'master' || github.ref == 'refs/heads/master' }}
//     has_gitflow_label: ${{ github.event_name == 'pull_request' && contains(steps.pr-labels.outputs.labels, ' Gitflow ') }}
//     force_skip_cache:
//       ${{ github.event_name == 'schedule' || (github.event_name == 'pull_request' &&
//       contains(steps.pr-labels.outputs.labels, ' ci-skip-cache ')) }}
