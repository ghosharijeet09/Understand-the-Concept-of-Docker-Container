**Title:** Understand the concept of Docker-Container

**Objective:**
The objective of this report is to offer a clear understanding of Docker and its
container technology. It will cover the key concepts, architecture, and benefits of Docker,
showing how containers enable efficient software development and deployment. The report
will also differentiate Docker containers from traditional virtual machines, explaining why
Docker is widely adopted in modern software engineering.
Prerequisites:
● Basic understanding of virtualization and cloud computing concepts.
● Familiarity with software development and deployment processes.
● Knowledge of command-line interfaces (CLI) and basic Linux commands.
● Awareness of DevOps practices and the importance of automation in software
engineering.

**Theory:**
Docker is an open-source platform that automates the deployment, scaling, and
management of applications using containerization. Containers are lightweight, standalone
software packages that include everything needed to run an application, ensuring
consistent performance across different environments. Unlike virtual machines, containers
share the host system's kernel, making them more efficient and faster. Docker simplifies
the creation and management of these containers with tools like Docker Engine, Docker
Images, and Docker Hub, making it a key technology in modern software development,
especially within DevOps and microservices architectures.
Materials and Equipment:
● Computer with Windows, macOS, or Linux.
● Docker Desktop installed.
● Internet connection for Docker images and Docker Hub.
● Text editor or IDE for Dockerfiles and app management.
● Basic CLI tools for running Docker commands.

**Procedure:**
1. Install Docker Desktop:
- Download Docker Desktop from the official Docker website.
- Follow the installation instructions for your operating system.
2. Verify Docker Installation:
- Open a terminal or command prompt.
- Run the command `docker --version` to check if Docker is installed correctly.
  ![image](https://github.com/user-attachments/assets/7593f635-afbd-49fc-86bc-2565dc51e619)
3. Check the contents of the docker-compose.yml file
- Navigate to the exp2 folder in directory and check the contents of the docker-compose.yml file
  ![image](https://github.com/user-attachments/assets/d5d37a2a-5971-4b9c-a1c8-fa74e3b376ec)
4. Start the docker container
- using the command - sudo docker compose up -d --build
  ![image](https://github.com/user-attachments/assets/b3642292-2890-4c5e-952d-b6b9e0a0e3a1)
  ![image](https://github.com/user-attachments/assets/ffb52cc1-3fd1-49c0-8d21-3e79b8fdbe2c)
5. Check the logs of the running containers
- Using the command sudo docker logs exp2-frontend-1 where exp2-frontend-1 is the <container-name>
  ![image](https://github.com/user-attachments/assets/31316b40-b642-466e-ab1d-427d7c2992e8)
6. Ctrl+ click on the link to see the app running in the browser using the containers
  ![image](https://github.com/user-attachments/assets/8f025ebe-01e8-404c-aec2-e1703902079f)
7. Stop the Docker Container and Remove the container
- Stop the container with `docker stop <container-name>`
- Remove the stopped container using `docker rm <container-name>`.
  ![image](https://github.com/user-attachments/assets/1400ae3e-59d2-4379-ac34-ca754c43f286)
8. List Running Containers:
- Use the command `docker ps -a` to see all active containers on your system.
  ![image](https://github.com/user-attachments/assets/4d91e5ab-2843-440d-b6a3-a90cf43595c8)
9. Clean up space
  ![image](https://github.com/user-attachments/assets/d1d560d8-7acf-4e9d-9387-510ae2f53f0a)

**Expected Output:**
The expected output includes a successful Docker Desktop installation without errors and
confirmation of installation via the `docker --version` command. You should see the
downloaded Docker image listed under Docker images with `docker images`, and the
running container should be visible with `docker ps`, showing details like container ID and
status. You should be able to access and interact with the container's terminal. After
stopping the container with `docker stop`, it should be removable with `docker rm`, and
unused images should be cleaned up, resulting in reduced disk usage.
Observations:
Docker Desktop installs and runs without issues. Images and containers appear as
expected, with quick starts and efficient performance. Terminal access works, and
containers stop and remove correctly, with unused images cleaned up effectively.

**Result:**
Understood the concept of using Docker-Container.
