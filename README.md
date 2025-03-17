# CloudNative-GKE-FileManager

## Introduction

CloudNative-GKE-FileManager is a robust and scalable file management system built using cloud-native technologies. This project leverages Google Kubernetes Engine (GKE) for efficient orchestration of microservices, ensuring high availability, scalability, and reliability. The application allows users to upload, manage, and retrieve files securely from a cloud-based infrastructure.

The system follows a microservices architecture that separates functionalities into independent services to enhance flexibility, modularity, and fault tolerance. With features like file versioning, metadata management, and secure storage integration, CloudNative-GKE-FileManager offers a comprehensive solution for cloud-based file handling.

## Features

1. File Upload, Download, and Deletion
2. Metadata Management
3. Cloud Storage Integration (Google Cloud Storage)
4. Kubernetes-Based Deployment
5. Efficient Resource Scaling using GKE

## Built With

- [npm](https://docs.npmjs.com//) - Dependency Management
- [Node.js](https://nodejs.org/en) - Javascript Runtime environment
- [Express](https://expressjs.com/) - Node.js web application framework
- [Axios](https://www.npmjs.com/package/axios) - Axios
- [Docker](https://docs.docker.com/) - Platform designed to help developers build, share, and run container applications
- [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine?hl=en) - Kubernetes cluster management

## Deployment

### Prerequisite

- Google Cloud Platform (GCP) account with GKE enabled
- Node.js and npm installed
- Docker installed for containerization

### Installation

#### Kubernetes Deployment

- Build Docker images for frontend and backend

  ```
  docker build -t gcr.io/<project-id>/frontend:latest ./frontend
  docker build -t gcr.io/<project-id>/backend:latest ./backend
  ```

- Push the images to Google Container Registry (GCR):

  ```
  docker push gcr.io/<project-id>/frontend:latest
  docker push gcr.io/<project-id>/backend:latest
  ```

- Deploy the application on GKE:
  ```
  kubectl apply -f k8s/
  ```
