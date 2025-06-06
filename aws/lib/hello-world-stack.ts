import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw  from 'aws-cdk-lib/aws-apigateway';

export class HelloStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // 1️⃣ Lambda-Funktion
        const helloFn = new lambda.Function(this, 'HelloFunction', {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'handler.handler',
            code: lambda.Code.fromAsset('lambda'),
        });

        // 2️⃣ REST API → / (GET) ruft Lambda
        const api = new apigw.LambdaRestApi(this, 'HelloApi', {
            handler: helloFn,
            proxy: true,          // alle Pfade an Lambda durchreichen
        });

        // 3️⃣ Output der Invoke-URL
        new CfnOutput(this, 'ApiUrl', { value: api.url });
    }
}
