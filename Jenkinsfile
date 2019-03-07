#!/usr/bin/env groovy

try {

  node {

    def branch            = env.BRANCH_NAME

    /**
     * Read file YML with the configuration by branch.
     */
    def buildParamsConfiguration = readYaml file: 'build-params.yml'
    def properties = buildParamsConfiguration["${branch}"]

    /**
     * Next pipeline parameters are just for testing purposes.
     */
    def appParams = [
      name                  : 'dp-nestjs-template',
      buildSdk              : 'nestjs/cli',   //  <<<---- These parameters are for the case where the app is build with different nodejs versions
      versionSdk            : '8.9.0',        //  <<<----
      deploymentTag         : 'DEV',
      type                  : 'zip',
      artifact              : 'dp-nestjs',
      repository            : 'git@github.com:greatmindsorg/dp-nestjs-template.git',
      exportPath            : 'Application',
      buildArgs             : 'run dev',
      dependenciesFolder    : 'node_modules'
    ]

    def artifactsRepoParams = [
      repo                  : 'dp-nestjs-dev',
      artifactId            : 'dp-nestjs',
      groupId               : 'org.greatminds.dp.nodejs.nestjs'
    ]

    notifyBuild('STARTED')

    scmInfo = checkoutStage( appParams.name, appParams.repository, branch )

    buildStage( appParams.buildSdk, appParams.exportPath, appParams.buildArgs)

    unitTestingStage( appParams.buildSdk, appParams.exportPath, appParams.buildArgs)

    try {

      if (branch.contains('develop')) {

        integrationTestingStage( appParams.buildSdk, appParams.exportPath, appParams.buildArgs)

      }
    } catch(caughtError) {

        currentBuild.result = "FAILURE"

        throw caughtError
    }
  }
}
catch(caughtError) {
    currentBuild.result = "FAILURE"
    throw caughtError
}
finally {
    echo " notifyBuild"
}

def ansiMessage(message) {
  ansiColor('xterm') {
    echo "\u001B[37m ${message} \u001B[0m"
  }
}

def checkoutStage( appName, repository, branch) {
    stage('\u27A1 Checkout') {
      def scmInfo = checkout(scm)
      println "SCM: "+scmInfo
      ansiMessage("\u2713 Checkout DONE")
      return scmInfo
    }
}


def buildStage(buildSdk, exportPath, buildArgs) {
    stage('\u27A1 Build') {
      sh """
            cd $WORKSPACE/
            set -euo pipefail
            npm run dev
         """
         ansiMessage("\u2713 Build DONE")
    }
}

def unitTestingStage(buildSdk, exportPath, buildsArgs) {
    stage('\u27A1 Unit Testing') {
      sh """
            cd $WORKSPACE/
            set -o pipefail
            npm run test:unit
         """
      ansiMessage("\u2713 Unit Testing DONE")
    }
}

def integrationTestingStage(buildSdk, exportPath, buildsArgs) {
    stage('\u27A1 Integration Testing') {
      sh """
            cd $WORKSPACE/
            set -o pipefail
            npm run test:integration
         """
      ansiMessage("\u2713 Integration Testing DONE")
    }
}


def notifyBuild(String buildStatus = 'STARTED') {
    buildStatus = buildStatus ?: 'SUCCESSFUL'

    def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
    def summary = "${subject} (${env.BUILD_URL})"
    def details = """<p>${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>Console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>"""

    emailext (
        recipientProviders: [
          [$class: 'DevelopersRecipientProvider'],
          [$class: 'CulpritsRecipientProvider'],
          [$class: 'RequesterRecipientProvider'],
          [$class: 'FailingTestSuspectsRecipientProvider'],
          [$class: 'FirstFailingBuildSuspectsRecipientProvider'],
          [$class: 'UpstreamComitterRecipientProvider']
        ],
        attachLog: true,
        body: details,
        mimeType: 'text/html',
        to: '${properties.emailRecipients}',
        replyTo: env.DEFAULT_REPLYTO,
        subject: subject
    )
}
