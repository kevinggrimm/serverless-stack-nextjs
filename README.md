[Tutorial - How to Create a NextJS App with Serverless](https://serverless-stack.com/examples/how-to-create-a-nextjs-app-with-serverless.html)

## TODO
- Review resource misconfiguration in [errors.html](errors.html)
- Review created resources
- Tear down stack
- Configure role with restricted permissions for application
- Integration of serverless.yml file for deployment, resources
- List out next steps in relation to project goals

## Create an SST app
`npx create-serverless-stack@latest nextjs-app`
- App is deployed to an env `dev` in `us-east-`
- Can change in `sst.json`

## Setup the Nextj.js app
- Run in the project root
`npx create-next-app frontend`
cd frontend

### Configure Next.js with SST
- Using the [NextjsSite](https://docs.serverless-stack.com/constructs/NextjsSite) construct to deploy our app to AWS

#### Environment Variables
Environment variables can be loaded in our local environment with `@serverless-stack/static-site-env` package
1. Run in the frontend directory
- `npm install @serverless-stack/static-site-env --save-dev`
2. Update the `dev` scripts
- Replace `"dev": "next dev"` with `"dev": "sst-env -- next dev"`
- This ensures that when you are running your Next.js app locally, the `REGION` and `TABLE_NAME` will be available

#### Add the API
- `frontend/pages/api/count.js`
- Install AWS SDK via `npm install aws-sdk`

#### Connecting our App to the API
- Update `frontend/pages/index.js`

### Start the dev environment
- SST features a [Live Lambda Development](https://docs.serverless-stack.com/live-lambda-development) environment
- Allows you to work on your serverless apps live
- From the **nextjs-app folder**, run `npx sst start`
- Switch to the `frontend/` folder and run `npm run dev`


## Deploy to AWS
- `npx sst deploy --stage prod`
- Allows us to separate the environments - local development will not break the app fo rour users

### Cleanup
- Remove resources
- `npx sst remove`
- `npx sst remove --stage prod`

### Deploymnt Comparisons
- Vercel
- Amplify
- Serverless Next.js (sls-next) Component