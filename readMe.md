# Project Title
File Server


## Description

This project allows users to sign up, log in, and interact with a file server. Admins can upload files with a title and description, and track the number of downloads and emails sent for each file.

## Getting Started

### Prerequisites

- Node.js
- npm
- PostgreSQL

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Nii-Nartey/File-Server.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

## Usage

To initialize the node modules, run:

```sh
npm init
```

To start the nodemon dev server, run:

```sh
npm run dev
```

To run tests, use:

```sh
npm test
```

## Features

Users can:
1. Sign up & log in with an email and password with account verification.
2. Reset passwords.
3. See a feed page that contains a list of files that can be downloaded.
4. Search the file server.
5. Send a file to an email through the platform.

Admins can:
1. Upload files with a title and description.
2. See the number of downloads and number of emails sent for each file.

## Tech Stack

This project uses TypeScript + Node and leverages a PostgreSQL database.


