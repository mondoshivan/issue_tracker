pipeline {
    agent any
    stages {
        stage('Unit Tests') {
            steps {
                sh 'bundle install --without "production development"'
                sh 'rspec spec/spec_helper.rb'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t mondoshivan/issue_tracker:latest .'
                sh 'docker push mondoshivan/issue_tracker:latest'
            }
        }
        stage('Push Docker Image to Docker Hub') {
            steps {
                sh 'docker push mondoshivan/issue_tracker:latest'
            }
        }
    }
}