@Library('dp-base-pipeline@develop') _

import org.gm.labs.jenkins.libraries.NpmPipeline

node {
  def buildTask         = 'build'
  def lintTask          = 'lint'
  def unitTestingTask   = 'test:unit'

  def npmPipeline = NpmPipeline.Builder(this)
      .npmBuild(buildTask)    
      .npmTest(unitTestingTask)

  npmPipeline.execute()

}
