pipeline {
  agent {
    docker {
      image 'node:16-alpine'
    }

  }
  stages {
    stage('npm install') {
      steps {
        sh 'npm install'
      }
    }

    stage('npm build') {
      steps {
        sh 'npm run start'
      }
    }

  }
}