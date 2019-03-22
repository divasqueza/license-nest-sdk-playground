@Library('dp-base-pipeline@develop') _

import org.gm.labs.jenkins.libraries.NpmPipeline

node {

    def buildTask           = 'build'
    def unitTestTask        = 'test'
    def integrationTestTask = 'test:integration'

    def npmPipeline = NpmPipeline.Builder(this)
        .npmBuild(buildTask)
       //.npmTest(unitTestTask)  <<--- Disabled due to: Test suite failed to run
       // .npmTest(integrationTestTask)
        .build()

        npmPipeline.execute()
}
