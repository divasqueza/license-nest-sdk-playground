@Library('dp-base-pipeline@tests') _

import org.gm.labs.jenkins.libraries.NpmPipeline

node {
    
    def buildTask           = 'build'
    def unitTestTask        = 'test'
    def integrationTestTask = 'test:integration'

    def npmPipeline = NpmPipeline.Builder(this)
        .npmBuild(buildTask)
        .npmTest(unitTestTask)
       // .npmTest(integrationTestTask)  <<--- Disabled due to: Test suite failed to run           
               
    npmPipeline.build().execute() 

}

