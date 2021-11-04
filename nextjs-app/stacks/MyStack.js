import * as sst from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create the table
    const table = new sst.Table(this, "Counter", {
      fields: {
        counter: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "counter" },
    });

    // Create a Next.js site
    // Points to where our Next.js app is located
    const site = new sst.NextjsSite(this, "Site", {
      path: "frontend",
      // Build time Next.js environment variables
      // Can set env vars automatically from our backend, without having 
        // to hard code them in our frontend
      // https://nextjs.org/docs/basic-features/environment-variables
      environment: {
        // Pass the table details to our app
        REGION: scope.region,
        TABLE_NAME: table.tableName,
      },
    });

    // Allow the Next.js API to access the table
    site.attachPermissions([table]);

    // Show the site URL in the output
    this.addOutputs({
      URL: site.url,
    });

  }
}