pipeline {
    agent {
        docker { image 'rbenv:2.2.9' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'rspec spec/spec_helper.rb'
            }
        }
    }
}