@Library('dp-base-pipeline@DP-353') _

import org.gm.labs.jenkins.libraries.NpmPipeline

node {
  NpmPipeline.Builder(this)
  .npmBuild('build')
  .npmLint('lint')
  .npmTest('test:ci:cov')
  .build().execute()
}

