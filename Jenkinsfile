pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id') // Add your DockerHub credentials in Jenkins
        DOCKER_IMAGE_NAME_FRONTEND = "priyanshu2401/jenkins-react-frontend"
        DOCKER_IMAGE_NAME_BACKEND = "priyanshu2401/jenkins-node-backend"
        DOCKER_COMPOSE_DIR = '/home/ubuntu/aws_project' // The directory where your docker-compose.yml file is located
        
    }
    
    stages {
        stage('Clone repository') {
            steps {
                git branch: 'main', url: 'https://github.com/priyanshuthakar24/jenkins_webstore.git'
                sh 'ls -R' // Lists all files and directories
                }
        }
        
        stage('Build Docker Images') {
            steps {
                script {
                    // Build React Frontend Docker Image
                    sh 'docker build -t $DOCKER_IMAGE_NAME_FRONTEND:latest ./frontend'
                    
                    // Build Node Backend Docker Image
                    sh 'docker build -t $DOCKER_IMAGE_NAME_BACKEND:latest ./backend'
                }
            }
        }
        
        stage('Push Docker Images to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                    
                    // Push both frontend and backend images
                    sh 'docker push $DOCKER_IMAGE_NAME_FRONTEND:latest'
                    sh 'docker push $DOCKER_IMAGE_NAME_BACKEND:latest'
                }
            }
        }
        
        stage('Deploy on Test Server') {
            steps {
                script {
                    // Pull new images and restart the Docker Compose setup
                    sh """
                    cd $DOCKER_COMPOSE_DIR &&
                    docker pull $DOCKER_IMAGE_NAME_FRONTEND:latest &&
                    docker pull $DOCKER_IMAGE_NAME_BACKEND:latest &&
                    docker-compose down &&
                    docker-compose up -d
                    """
                }
            }
        }
    }
    
    post {
        always {
            cleanWs() // Clean up the workspace after the build
        }
    }
}
