pipeline {
  agent any
  stages {
    stage('npm install') {
      steps {
        sh 'npm install'
      }
    }

    stage('npm build and run') {
      steps {
        sh 'npm run start'
      }
    }

  }
}