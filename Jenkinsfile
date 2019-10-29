@Library('dp-base-pipeline@master') _

import org.gm.labs.jenkins.libraries.NpmPipeline

node {
  NpmPipeline.Builder(this)
  .npmBuild('build')
  .npmLint('lint')
  .npmTest('test:ci:cov')
  .build().execute()
}
