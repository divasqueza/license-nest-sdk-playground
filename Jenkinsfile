@Library('dp-base-pipeline@develop') _

import org.gm.labs.jenkins.libraries.NpmPipeline

node {

    def buildTask           = 'build'
    def unitTestTask        = 'test:unit'
    def integrationTestTask = 'test:integration'

    def npmPipeline = NpmPipeline.Builder(this)
        .npmBuild(buildTask)
        .npmTest(unitTestingTask)
        .npmTest(integrationTestTask)
        .build()

        npmPipeline.execute()
}
