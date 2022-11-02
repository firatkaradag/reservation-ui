# Serverless Framework Node HTTP API on AWS

Angular project with Typescript, on Serverless Framework 

## Usage

Please install all development dependencies with npm
```
$ cd app && npm install
```

### Deployment

To deploy cloudformation infrastructure to AWS. Most of examples below use `dev` as STAGE value

```
$ serverless deploy --stage dev
```

Alternatively you can use deployment.sh to run deployment scripts

```
$ source ./scripts/deployment.sh && ui-deploy
```

After deploying, you should see output similar to:

```bash
Deploying reservation-ui to stage dev (us-east-1)

✔ Service deployed to stack reservation-api-dev (152s)
endpoint: http://reservation-ui-dev.s3-website-us-east-1.amazonaws.com 
```

#### Upload Output to S3 Bucket

In order to update API call URL, please get endpoint for API to update `app/src/environments/environment.ts` with the new API URL deployed recently
```
API_URL: 'https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/reservation'
```

Build App to create the output folder in order to upload as website. if you want to build, please update `environment.prod.ts` file for API URL as well
```
$ cd app && npm run build-dev
```

In order to use S3 as website, we need to upload json file into S3 bucket (reservation-db-dev)

```
$ aws s3 sync ./dist/reservation-ui/ s3://reservation-ui-${STAGE}/ 
```
or 
```
$ source ../scripts/deployment.sh && ui-s3-sync
```

### Local Development

After successful deployment, you can run UI App on your localhost (http://localhost:4200/)

```
$ cd app && npm run start
```

### Remove

In order to remove infrastructure, first you should clear all in S3 bucket (reservation-ui-dev)

```
$ aws s3 rm s3://reservation-ui-${STAGE}/ --recursive
```
or 
```
$ source ./scripts/deployment.sh && ui-s3-remove
```

Now ready to remove all the services

```
$ sls remove --stage ${STAGE}
```
or 
```
$ source ./scripts/deployment.sh && ui-remove 
```