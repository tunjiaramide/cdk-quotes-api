import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { RemovalPolicy } from 'aws-cdk-lib';


export class CdkQuotesApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new Table(this, "quotesTbl", {
        partitionKey: { name: 'id', type: AttributeType.STRING},
        billingMode: BillingMode.PAY_PER_REQUEST,
        removalPolicy: RemovalPolicy.DESTROY
    })

    const handlerFunction = new Function(this, "quotesHandler", {
      runtime: Runtime.NODEJS_22_X,
      code: Code.fromAsset("lambdas"),
      handler: 'app.handler',
      environment: {
        MY_TABLE: table.tableName
      }
    })

    table.grantReadWriteData(handlerFunction)

    const api = new RestApi(this, 'quotes-api', {
        description: 'Quotes API',
    })

    const handlerIntegration = new apigateway.LambdaIntegration(handlerFunction)

    const mainPath = api.root.addResource("quotes");
    const idPath = mainPath.addResource("{id}");

    mainPath.addMethod("GET", handlerIntegration);
    mainPath.addMethod("POST", handlerIntegration);
    idPath.addMethod("DELETE", handlerIntegration);
    idPath.addMethod("GET", handlerIntegration);
    idPath.addMethod("PUT", handlerIntegration);
  
  }
}
