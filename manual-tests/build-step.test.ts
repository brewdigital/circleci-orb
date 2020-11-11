import test from 'ava'
import { stripIndent } from 'common-tags'
import { effectiveConfig } from '../scripts/utils'

test('build step works after attaching workspace', async (t) => {
  // we want to attach the workspace, probably after a shared install job
  // and build the application - and the effective config
  // should have the build step
  const workflows = stripIndent`
    workflows:
      build:
        jobs:
          - cypress/run:
              attach-workspace: true
              build: npm run build
  `
  t.is(typeof workflows, 'string')
  const result = await effectiveConfig(workflows)
  t.snapshot(result, 'must include build step')
})

test('no build step after attaching workspace', async (t) => {
  const workflows = stripIndent`
    workflows:
      build:
        jobs:
          - cypress/run:
              attach-workspace: true
  `
  t.is(typeof workflows, 'string')
  const result = await effectiveConfig(workflows)
  t.snapshot(result, 'must include build step')
})
