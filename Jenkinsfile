dockerRepoHost = 'registry.digitalocean.com/cbiglobal'
dockerRepoUser = 'jenkins-cbiglobal' // (Username must match the value in jenkinsDockerSecret)

// these refer to a Jenkins secret "id", which can be in Jenkins global scope:
jenkinsDockerSecret = '5a6e1c1d-377a-4c55-ae7b-9ec71f49c31d'

// blank values that are filled in by pipeline steps below:
gitCommit = ''
branchName = ''
unixTime = ''
developmentTag = ''
releaseTag = ''
developmentImage = ''



def COLOR_MAP = [
    'SUCCESS': 'good',
    'FAILURE': 'danger',
]

pipeline {
  environment {
    // test variable: 0=success, 1=fail; must be string
    doError = '0'
    BUILD_USER = ''
  }
  agent any
  stages {
    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv(installationName: 'cbiglobal-sonarqube') {
          sh '/var/lib/jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/sonar-scanner/bin/sonar-scanner'
        }
      }
    }    
    stage('Docker Build') {
      agent any
      steps {
        script {
          gitCommit = env.GIT_COMMIT.substring(0,8)
          unixTime = (new Date().time / 1000) as Integer
          branchName = env.GIT_BRANCH.replace('/', '-').substring(7)
          developmentTag = "${branchName}-${gitCommit}-${unixTime}"
          developmentImage = "${dockerRepoHost}/cbigold-admin:${developmentTag}"
        }
        sh "docker build -t ${developmentImage} ./"
      }
    }
    stage('Publish Release Tag') {
      steps {
        sh "docker push ${developmentImage}"
      }
    }
    stage('Remove Local Docker Image') {
      steps {
        sh "docker rmi ${developmentImage}"
      }
    }
    stage('Update GitOps repo for ArgoCD') {
      steps {
        script {
            git branch: 'develop', credentialsId: '38f1358e-7a55-488b-b1ee-40eb0cc6b3f4', url: 'https://github.com/cbiglobal/dev_ops.git'
            script {
              switch(JOB_NAME) {
                case 'cbigold-admin-develop':
                  sh("cd cbigold/overlays/develop && kustomize edit set image registry.digitalocean.com/cbiglobal/cbigold-admin:${developmentTag}");
                  break;
                case 'cbigold-admin-production':
                  sh("cd cbigold/overlays/production && kustomize edit set image registry.digitalocean.com/cbiglobal/cbigold-admin:${developmentTag}");
                  break;
                case 'cbigold-admin-qa':
                  sh("cd cbigold/overlays/qa && kustomize edit set image registry.digitalocean.com/cbiglobal/cbigold-admin:${developmentTag}");
                  break;
                case 'cbigold-admin-staging':
                  sh("cd cbigold/overlays/staging && kustomize edit set image registry.digitalocean.com/cbiglobal/cbigold-admin:${developmentTag}");
                  break;
                default:
                  echo 'No Kustomize application found';
                  break;
              }
            }
        }
        sh('git add .')
        sh("git commit -m \"Update ${JOB_NAME} to v-${developmentTag}\"")
        withCredentials([usernamePassword(credentialsId: '38f1358e-7a55-488b-b1ee-40eb0cc6b3f4', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
          sh('git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/cbiglobal/dev_ops.git')
        }
      }
    }
    stage('Apply Sync with ArgoCD') {
      environment {
        ARGOCD_SERVER='argocd.cbiglobal.io'
        ARGOCD_AUTH_TOKEN = credentials('14eb5095-973d-43a0-8889-5ed02b31b432')
      }
      steps {
        script {
          switch(JOB_NAME) {
            case 'cbigold-admin-develop':
              application = "develop";
              break;
            case 'cbigold-admin-production':
              application = "production";
              break;
            case 'cbigold-admin-qa':
              application = "qa";
              break;
            case 'cbigold-admin-staging':
              application = "staging";
              break;
            default:
              echo 'No ArgoCD application found';
              break;
          }
        }
        sh("argocd app sync cbigold-${application}");
        sh("argocd app wait cbigold-${application}");
      }
    }
    stage('Error') {
      // when doError is equal to 1, return an error
      when {
        expression { doError == '1' }
      }
      steps {
        echo "Failure :("
        error "Test failed on purpose, doError == str(1)"
      }
    }
    stage('Success') {
      // when doError is equal to 0, just print a simple message
      when {
        expression { doError == '0' }
      }
      steps {
        echo "Success :)"
      }
    }
  }
  post {
    always {
      script {
        BUILD_TRIGGER_BY = "${currentBuild.getBuildCauses()[0].shortDescription}".substring(26)
      }
      echo 'I will always say hello in the console.'
      slackSend channel: '#proj-new-website',
        color: COLOR_MAP[currentBuild.currentResult],
        message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} by ${BUILD_TRIGGER_BY}\n More info at: ${env.BUILD_URL}"
      cleanWs()
    }
  }
}