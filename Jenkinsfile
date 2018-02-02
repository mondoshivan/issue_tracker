pipeline {
    agent {
        docker { image 'mondoshivan/rbenv:2.2.9' }
    }
    stages {
        stage('Gem') {
            steps {
                sh 'bundle install'
            }
        }
    }
    stages {
            stage('Test') {
                steps {
                    sh 'rspec spec/spec_helper.rb'
                }
            }
     }
}