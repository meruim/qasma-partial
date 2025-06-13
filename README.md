## Setup Mongodb in Docker

````markdown
# Setting Up MongoDB with Docker

Follow these steps to set up MongoDB using Docker.

## 1. Install Docker
If you haven't installed Docker yet, download and install it from the [Docker official website](https://www.docker.com/get-started).

## 2. Pull MongoDB Image
Once Docker is installed, open your terminal or command prompt and pull the MongoDB Docker image from Docker Hub by running the following command:

```bash
docker pull mongo
````

## 3. Run MongoDB Container

After pulling the MongoDB image, run a MongoDB container with the following command:

```bash
docker run --name mongodb -d -p 27017:27017 mongo
```

### Explanation of the Command:

* `--name mongodb`: This names your container "mongodb".
* `-d`: This runs the container in detached mode (background).
* `-p 27017:27017`: This exposes MongoDB's default port (27017) to your local machine.

## 4. Verify MongoDB Container is Running

To check if the MongoDB container is running, use:

```bash
docker ps
```

## 5. Connect to MongoDB with `mongosh`

To connect to the MongoDB shell, use the following command:

```bash
docker exec -it mongodb mongosh
```

This will allow you to interact with MongoDB using the `mongosh` shell.

## 6. Stopping and Starting the MongoDB Container

If you want to stop or start the MongoDB container:

* To stop the container:

  ```bash
  docker stop mongodb
  ```

* To start the container again:

  ```bash
  docker start mongodb
  ```

```
