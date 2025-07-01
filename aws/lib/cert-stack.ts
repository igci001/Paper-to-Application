import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';

export class CertStack extends Stack {
    public readonly certificate: acm.Certificate;

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, {
            ...props,
            env: {
                account: process.env.CDK_DEFAULT_ACCOUNT,
                region: 'us-east-1',
            },
        });

        const zone = route53.HostedZone.fromLookup(this, 'Zone', {
            domainName: 'emirhan-igci.me',
        });

        this.certificate = new acm.Certificate(this, 'SiteCert', {
            domainName: 'snake.emirhan-igci.me',
            validation: acm.CertificateValidation.fromDns(zone),
        });
    }
}
