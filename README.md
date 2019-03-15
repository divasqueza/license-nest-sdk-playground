# NESTJS Templating

The purpose of this repository is to provide a template for all the micro-apps to be developed within Great Minds Digital Platform

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

#### Install Node.js on Ubuntu

You can successfully add Node.js PPA to Ubuntu system. Now execute the below command install Node on and Ubuntu using apt-get

```
$ sudo apt-get install curl python-software-properties
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
$ sudo apt-get install nodejs
```

#### Install Node.js on OSX

Installing Node.js and NPM is pretty straightforward using Homebrew. Homebrew handles downloading, unpacking and installing Node and NPM on your system

```
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
$ brew install node
```

#### Install Node.js on Windows

Download latest LTS version from https://nodejs.org/en/download/

### Installing

Start by cloning this project on your workstation.

```
$ git clone https://github.com/greatmindsorg/dp-nestjs-template.git
```

The next thing will be to install all the dependencies of the project.

```
cd ./dp-nestjs-template
npm install
```

## Running the app

```
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Execute to http://localhost:3000 in your browser

## Running the tests

Running unit test and calculating code coverage

```
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

### Break down into end to end tests

Running end to end tests

```
# e2e tests
$ npm run test:e2e
```

### And coding style tests

Linter is a tool that analyzes source code to flag programming errors, bugs, stylistic errors, and suspicious constructs

```
# code style
$ npm lint
```

## Deployment

We use a Helm chart to deploy into Kubernetes see [chart info](./chart/README.md).

## Versioning

For the versions available, see the [tags on this repository](https://github.com/greatmindsorg/dp-nestjs-template/tags).

## Authors

- _Javier Perez_
- _Alejandro Naso_
- _Gabriel Dominguez_

See also the list of [contributors](https://github.com/greatmindsorg/dp-nestjs-template/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
