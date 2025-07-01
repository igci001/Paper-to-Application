import {
    Stack,
    StackProps,
    CfnOutput,
    RemovalPolicy,
    Aws,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as s3           from 'aws-cdk-lib/aws-s3';
import * as cloudfront   from 'aws-cdk-lib/aws-cloudfront';
import * as origins      from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3deploy     from 'aws-cdk-lib/aws-s3-deployment';
import * as route53      from 'aws-cdk-lib/aws-route53';
import * as targets      from 'aws-cdk-lib/aws-route53-targets';
import * as acm          from 'aws-cdk-lib/aws-certificatemanager';

interface StaticSiteProps extends StackProps {
    domainName: string;
    subdomain: string;
    siteSourcePath: string;
    certificate: acm.ICertificate; // <-- jetzt extern übergeben
}

export class SnakeSiteStack extends Stack {
    constructor(scope: Construct, id: string, props: StaticSiteProps) {
        super(scope, id, props);

        const zone = route53.HostedZone.fromLookup(this, 'Zone', {
            domainName: props.domainName,
        });

        const siteDomain = `${props.subdomain}.${props.domainName}`;

        // 1️⃣ Website-Bucket (S3-Hosting über CloudFront)
        const bucket = new s3.Bucket(this, 'SiteBucket', {
            removalPolicy: RemovalPolicy.RETAIN,
            versioned: true,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
        });

        // 2️⃣ S3-Origin mit OAC
        const s3Origin = origins.S3BucketOrigin.withOriginAccessControl(bucket, {
            originAccessLevels: [
                cloudfront.AccessLevel.READ,
                cloudfront.AccessLevel.LIST,
            ],
        });

        // 3️⃣ CloudFront Distribution (Zertifikat wird übergeben)
        const distribution = new cloudfront.Distribution(this, 'Distribution', {
            defaultRootObject: 'index.html',
            domainNames: [siteDomain],
            certificate: props.certificate, // <--
            defaultBehavior: {
                origin: s3Origin,
                viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                compress: true,
                cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
            },
        });

        // 4️⃣ Upload & Invalidate
        new s3deploy.BucketDeployment(this, 'Deploy', {
            sources: [s3deploy.Source.asset(props.siteSourcePath)],
            destinationBucket: bucket,
            distribution,
            distributionPaths: ['/*'],
        });

        // 5️⃣ DNS-Alias
        new route53.ARecord(this, 'AliasRecord', {
            zone,
            recordName: props.subdomain,
            target: route53.RecordTarget.fromAlias(
                new targets.CloudFrontTarget(distribution),
            ),
        });

        // 🔎 Output
        new CfnOutput(this, 'SiteURL', {
            value: `https://${siteDomain}`,
        });
    }
}
