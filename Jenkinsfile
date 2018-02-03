pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'bundle install --without "production development"'
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