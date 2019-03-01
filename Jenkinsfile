#!/usr/bin/env groovy

try {
  node('linux') {

    def branch            = env.BRANCH_NAME
    def releaseNotes

    def appParams = [
      name                  : 'dp-nestjs-template',
      buildSdk              : 'nest',
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

    try {

      unitTestingStage( appParams.buildSdk, appParams.exportPath, appParams.buildArgs)

    } catch(caughtError) {
        currentBuild.result = "FAILURE"
        throw caughtError
    }

    if (branch.contains('develop')) {
        uploadArtifactStage( artifactsRepoParams.groupId, artifactsRepoParams.repo, artifactsRepoParams.artifactId, appParams.exportPath, appParams.type, appParams.artifact)
    }
    else {
      echo "Other stages per branch"
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
            IFS=$'\n\t'
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
            IFS=$'\n\t'
            npm run test
         """
      ansiMessage("\u2713 Unit Testing DONE")
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
        to: 'yanelly.jimenez@greatminds.org',
        replyTo: env.DEFAULT_REPLYTO,
        subject: subject
    )
}
