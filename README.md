# docker-system

## Requirements
- Docker Compose
- Firebase Database and service account credentials

## Setup

Create `api/config.json`, and populate with an object containing your firebase database URL

```
{
  "firebaseDatabaseUrl": "https://databaseId.firebaseio.com"
}
```

Create `api/firebase-svc-acc-credentails.json` and populate with your Firebase service account credentials - NEVER commit these secret credentials.

```
{
  "type": "service_account",
  "project_id": "xxx",
  "private_key_id": "xxx",
  "private_key": "xxx",
  "client_email": "xxx",
  "client_id": "xxx",
  "auth_uri": "xxx",
  "token_uri": "xxx",
  "auth_provider_x509_cert_url": "xxx",
  "client_x509_cert_url": "xxx"
}
```

## Install

Create containers:

```
yarn dev:install
```

## Dev

Run the project

```
yarn dev:up
```

Visit [localhost](http://localhost)