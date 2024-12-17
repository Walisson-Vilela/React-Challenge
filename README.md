# Mundo Wap React Test Application for Juniors

## Starting a React Server

This tutorial provides instructions on how to start a React server, whether using Docker or the direct command line.

### Using Docker
With the terminal open in the project root directory:

1.  Install Docker Compose (if not installed):
    - Visit the [official Docker website](https://docs.docker.com/compose/install/standalone/) and follow the installation instructions for your operating system.

2.  To setup container, run `./exec.sh install`.
3.  To start container, run the `./exec.sh start -l`.
4.  To stop container, run `./exec.sh stop`.
5.  To run any other command, run `./exec.sh [your command]`.
    
    Example.: to run `yarn add my-package`, type `./exec.sh yarn add my-package`.

6.  To list available commands, run `./exec.sh help`.

### Using Command Line
With the terminal open in the project root directory:

1.  Install Node.js and Yarn (if not installed):

    - Install Node.js: Visit the [official Node.js website](https://nodejs.org/) and download the installer for your operating system. Follow the installation instructions.

    - Install Yarn: Once Node.js is installed, you can install Yarn using npm (Node Package Manager) with the following command:

        `npm install -g yarn`

2.  Execute the following commands:

    `yarn && yarn start`

    This will install the project dependencies and start the React server.

    You can now access your React application at `http://localhost:3000`.

### Common issues

Remember, this test is not about docker skills, so if you have any other problems running this project, please contact us.

- If you got `./exec.sh: Permission denied`, run `chmod +x exec.sh` with the terminal open in the project root directory to give `./exec.sh` file execution permissions.

