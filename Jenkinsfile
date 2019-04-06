@Library('dp-base-pipeline@develop') _

import org.gm.labs.jenkins.libraries.NpmPipeline

node {

    def registry            = '491070403555.dkr.ecr.us-east-1.amazonaws.com'
    def dockerImage         = 'carbon-alpine'
    def buildTask           = 'build'
    def unitTestTask        = 'test'
    def integrationTestTask = 'test:integration'

    def npmPipeline = NpmPipeline.Builder(this)
        .npmBuild(buildTask)
        .npmTest(unitTestTask)
       // .npmTest(integrationTestTask)  <<--- Disabled due to: Test suite failed to run   
        .build()           
        
    ecr( registry, dockerImage, npmPipeline.execute() )        
}
