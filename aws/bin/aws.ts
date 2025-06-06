#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AwsStack } from '../lib/aws-stack';
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import {HelloStack} from "../lib/hello-world-stack";
import {SnakeSiteStack} from "../lib/snake-site-stack";
import {CertStack} from "../lib/cert-stack";

const envEU = { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'eu-central-1' }

const app = new App();
const certStack = new CertStack(app, 'SnakeCertStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: 'us-east-1',
    },
});

new SnakeSiteStack(app, 'SnakeSiteStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: 'eu-central-1',
    },
    crossRegionReferences: true,
    domainName: 'emirhan-igci.me',
    subdomain: 'snake',
    siteSourcePath: 'website',
    certificate: certStack.certificate, // <- Übergabe!
});

//new HelloStack(app, 'HelloStack');

/*
const app = new cdk.App();
new AwsStack(app, 'AwsStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html
});
*/
