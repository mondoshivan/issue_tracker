pipeline {
    agent any
    stages {
        stage('Unit Tests') {
            steps {
                sh 'docker build --rm -t mondoshivan/issue_tracker_tests:latest -f Dockerfile_tests .'
                sh 'docker run --rm mondoshivan/issue_tracker_tests:latest'
                sh 'docker rmi mondoshivan/issue_tracker_tests:latest'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build --rm -t mondoshivan/issue_tracker:latest .'
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