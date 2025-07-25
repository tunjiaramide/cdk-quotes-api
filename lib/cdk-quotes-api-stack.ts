import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';


export class CdkQuotesApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const getQuotes = new Function(this, "GetQuoteLambda", {
      runtime: Runtime.NODEJS_22_X,
      code: Code.fromAsset("lambdas"),
      handler: 'getQuotes.handler',
    })

    const api = new RestApi(this, 'quotes-api', {
        description: 'Quotes API',
    })

  }
}
