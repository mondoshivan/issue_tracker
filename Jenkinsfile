pipeline {
    agent {

    }
    stages {
        stage('Test') {
            steps {
                sh 'bundle install test'
                sh 'rspec spec/spec_helper.rb'
            }
        }
        stage('Build') {
            steps {
                sh 'docker build -t mondoshivan/issue_tracker:latest .'
                sh 'docker push mondoshivan/issue_tracker:latest'
            }
        }
     }
}