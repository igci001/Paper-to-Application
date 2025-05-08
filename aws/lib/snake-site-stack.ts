import {
    Stack,
    StackProps,
    RemovalPolicy,
    Duration,
    CfnOutput,
    Aws,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
//import * as s3deploy from '@aws-cdk/aws-s3-deployment-alpha';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';

interface StaticSiteProps extends StackProps {
    /** Haupt-Domain, z. B. emirhan-igci.me */
    domainName: string;
    /** Sub-Domain, z. B. snake */
    subdomain: string;
    /** lokaler Build-Pfad */
    siteSourcePath: string;
}

export class SnakeSiteStack extends Stack {
    constructor(scope: Construct, id: string, props: StaticSiteProps) {
        super(scope, id, props);

        // 1️⃣ Hosted Zone (muss vorher in Route 53 existieren)
        const zone = route53.HostedZone.fromLookup(this, 'HostedZone', {
            domainName: props.domainName,
        });

        const siteDomain = `${props.subdomain}.${props.domainName}`;

        // 2️⃣ S3-Bucket – nur CloudFront hat Lesezugriff (OAC)
        const siteBucket = new s3.Bucket(this, 'SiteBucket', {
            bucketName: `${props.subdomain}-site-${Aws.ACCOUNT_ID}`,
            versioned: true,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            removalPolicy: RemovalPolicy.RETAIN,        // im Zweifel beibehalten
            autoDeleteObjects: false,
        });

        // 3️⃣ Zertifikat (us-east-1 ist Pflicht für CloudFront)
        const certificate = new acm.DnsValidatedCertificate(this, 'SiteCert', {
            domainName: siteDomain,
            hostedZone: zone,
            region: 'us-east-1',
        });

        // 4️⃣ CloudFront-Distribution mit OAC
        const oac = new cloudfront.CfnOriginAccessControl(this, 'SiteOAC', {
            originAccessControlConfig: {
                name: `${id}-oac`,
                originAccessControlOriginType: 's3',
                signingBehavior: 'always',
                signingProtocol: 'sigv4',
            },
        });

        const distribution = new cloudfront.Distribution(this, 'SiteDistribution', {
            defaultRootObject: 'index.html',
            domainNames: [siteDomain],
            certificate,
            minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
            defaultBehavior: {
                origin: new origins.S3Origin(siteBucket, {
                    originAccessControlId: oac.attrId,
                }),
                viewerProtocolPolicy:
                cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                compress: true,
                cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
            },
        });
/*
        // Link OAC with bucket policy
        siteBucket.addToResourcePolicy(
            new s3.PolicyStatement({
                actions: ['s3:GetObject'],
                resources: [siteBucket.arnForObjects('*')],
                principals: [
                    new s3.ArnPrincipal(
                        `arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ${distribution.distributionId}`,
                    ),
                ],
            }),
        );

        // 5️⃣ Deploy lokale Dateien nach S3
        new s3deploy.BucketDeployment(this, 'DeployWithInvalidation', {
            sources: [s3deploy.Source.asset(props.siteSourcePath)],
            destinationBucket: siteBucket,
            distribution,
            distributionPaths: ['/*'],
        });

        // 6️⃣ DNS-Alias
        new route53.ARecord(this, 'SiteAliasRecord', {
            zone,
            recordName: props.subdomain,
            target: route53.RecordTarget.fromAlias(
                new targets.CloudFrontTarget(distribution),
            ),
        });

        // 👋 Nützliche Outputs
        new CfnOutput(this, 'CFDomain', { value: distribution.distributionDomainName });
        new CfnOutput(this, 'SiteURL', { value: `https://${siteDomain}` });
*/

    }

}
