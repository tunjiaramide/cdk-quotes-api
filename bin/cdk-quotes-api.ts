#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkQuotesApiStack } from '../lib/cdk-quotes-api-stack';

const app = new cdk.App();
new CdkQuotesApiStack(app, 'CdkQuotesApiStack', {
  
});