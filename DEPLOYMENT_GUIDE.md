# EPA Ethics App - Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying the EPA Ethics Mobile App ("EthicsGo") in a FedRAMP Low compliant environment.

## Prerequisites

### Infrastructure Requirements
- **Cloud Environment**: AWS GovCloud, Azure Government, or Google Cloud for Government
- **Kubernetes**: EKS, AKS, or GKE for container orchestration
- **Database**: PostgreSQL 13+ with encryption at rest
- **Storage**: S3-compatible storage with encryption
- **CDN**: CloudFront or equivalent for content delivery

### Compliance Requirements
- FedRAMP Low authorization
- Section 508 accessibility compliance
- EPA security policies adherence
- Continuous monitoring setup

## Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Mobile App    │    │   Admin Portal  │    │   Backend API   │
│   (React Native)│    │   (Next.js)     │    │   (Node.js)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Load Balancer │
                    │   + WAF         │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │   Database      │
                    └─────────────────┘
```

## Step 1: Environment Setup

### 1.1 Cloud Infrastructure
```bash
# AWS GovCloud setup example
aws configure --profile govcloud
aws configure set region us-gov-west-1 --profile govcloud

# Create VPC and security groups
terraform init
terraform plan -var-file="production.tfvars"
terraform apply
```

### 1.2 Database Setup
```sql
-- Create database and user
CREATE DATABASE epa_ethics;
CREATE USER epa_ethics_app WITH ENCRYPTED PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE epa_ethics TO epa_ethics_app;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

### 1.3 Environment Variables
```bash
# Backend API environment variables
cat > .env.production << EOF
NODE_ENV=production
PORT=3001
DB_HOST=production-db-cluster.cluster-xxx.us-gov-west-1.rds.amazonaws.com
DB_PORT=5432
DB_NAME=epa_ethics
DB_USER=epa_ethics_app
DB_PASSWORD=secure_password
DB_SSL=true

JWT_SECRET=your-jwt-secret-here
SESSION_SECRET=your-session-secret-here
ENCRYPTION_KEY=your-encryption-key-here

ALLOWED_ORIGINS=https://ethics-admin.epa.gov,https://ethics-api.epa.gov

# S3 Configuration
AWS_REGION=us-gov-west-1
S3_BUCKET=epa-ethics-content
S3_ENDPOINT=s3.us-gov-west-1.amazonaws.com

# Logging
LOG_LEVEL=info
AUDIT_LOG_RETENTION=2555 # 7 years in days

# Security
RATE_LIMIT_WINDOW=900000 # 15 minutes
RATE_LIMIT_MAX=100
SESSION_TIMEOUT=1440 # 24 hours in minutes
EOF
```

## Step 2: Backend Deployment

### 2.1 Docker Build
```dockerfile
# Dockerfile for backend
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs . .
USER nodejs
EXPOSE 3001
CMD ["npm", "start"]
```

### 2.2 Kubernetes Deployment
```yaml
# k8s/backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: epa-ethics-backend
  namespace: epa-ethics
spec:
  replicas: 3
  selector:
    matchLabels:
      app: epa-ethics-backend
  template:
    metadata:
      labels:
        app: epa-ethics-backend
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 1001
        fsGroup: 1001
      containers:
      - name: backend
        image: epa-ethics/backend:latest
        ports:
        - containerPort: 3001
        env:
        - name: NODE_ENV
          value: "production"
        envFrom:
        - secretRef:
            name: epa-ethics-secrets
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3001
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/health/ready
            port: 3001
          initialDelaySeconds: 5
          periodSeconds: 5
```

### 2.3 Database Migration
```bash
# Run database migrations
kubectl exec -it deployment/epa-ethics-backend -- npm run migrate

# Seed initial data
kubectl exec -it deployment/epa-ethics-backend -- npm run seed
```

## Step 3: Admin Portal Deployment

### 3.1 Build Configuration
```javascript
// next.config.js for production
const nextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  env: {
    NEXT_PUBLIC_API_URL: 'https://ethics-api.epa.gov',
    NEXTAUTH_URL: 'https://ethics-admin.epa.gov',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  // Security headers for FedRAMP compliance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

### 3.2 Container Deployment
```yaml
# k8s/admin-portal-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: epa-ethics-admin
  namespace: epa-ethics
spec:
  replicas: 2
  selector:
    matchLabels:
      app: epa-ethics-admin
  template:
    metadata:
      labels:
        app: epa-ethics-admin
    spec:
      containers:
      - name: admin-portal
        image: epa-ethics/admin-portal:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        envFrom:
        - secretRef:
            name: epa-ethics-admin-secrets
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

## Step 4: Mobile App Build

### 4.1 Android Build
```bash
# Build for Android
cd mobile
npx expo build:android --type apk --release-channel production

# Or using EAS Build for better control
eas build --platform android --profile production
```

### 4.2 iOS Build
```bash
# Build for iOS
cd mobile
npx expo build:ios --type archive --release-channel production

# Or using EAS Build
eas build --platform ios --profile production
```

### 4.3 App Store Configuration
```json
// app.config.js
export default {
  expo: {
    name: "EPA Ethics",
    slug: "epa-ethics",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#0066CC"
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: "https://u.expo.dev/your-project-id"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "gov.epa.ethics",
      buildNumber: "1.0.0"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      },
      package: "gov.epa.ethics",
      versionCode: 1
    }
  }
};
```

## Step 5: Security Configuration

### 5.1 Network Security
```yaml
# Network policies
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: epa-ethics-network-policy
  namespace: epa-ethics
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 3001
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: kube-system
    ports:
    - protocol: TCP
      port: 53
    - protocol: UDP
      port: 53
```

### 5.2 TLS Configuration
```yaml
# TLS certificate
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: epa-ethics-tls
  namespace: epa-ethics
spec:
  secretName: epa-ethics-tls
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
  dnsNames:
  - ethics-api.epa.gov
  - ethics-admin.epa.gov
```

### 5.3 RBAC Configuration
```yaml
# Service account and RBAC
apiVersion: v1
kind: ServiceAccount
metadata:
  name: epa-ethics-sa
  namespace: epa-ethics
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: epa-ethics
  name: epa-ethics-role
rules:
- apiGroups: [""]
  resources: ["pods", "services"]
  verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: epa-ethics-binding
  namespace: epa-ethics
subjects:
- kind: ServiceAccount
  name: epa-ethics-sa
  namespace: epa-ethics
roleRef:
  kind: Role
  name: epa-ethics-role
  apiGroup: rbac.authorization.k8s.io
```

## Step 6: Monitoring and Logging

### 6.1 Prometheus Monitoring
```yaml
# ServiceMonitor for Prometheus
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: epa-ethics-monitor
  namespace: epa-ethics
spec:
  selector:
    matchLabels:
      app: epa-ethics-backend
  endpoints:
  - port: http
    interval: 30s
    path: /metrics
```

### 6.2 Log Aggregation
```yaml
# Fluentd configuration for log collection
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluentd-config
  namespace: epa-ethics
data:
  fluent.conf: |
    <source>
      @type tail
      path /var/log/containers/epa-ethics*.log
      pos_file /var/log/fluentd-containers.log.pos
      tag kubernetes.*
      format json
    </source>
    
    <match kubernetes.**>
      @type forward
      <server>
        host splunk-forwarder.logging.svc.cluster.local
        port 24224
      </server>
    </match>
```

## Step 7: Backup and Recovery

### 7.1 Database Backup
```bash
# Automated backup script
#!/bin/bash
BACKUP_NAME="epa-ethics-$(date +%Y%m%d-%H%M%S)"
pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME | \
  aws s3 cp - s3://epa-ethics-backups/$BACKUP_NAME.sql \
  --sse AES256
```

### 7.2 Disaster Recovery
```yaml
# Velero backup configuration
apiVersion: velero.io/v1
kind: Schedule
metadata:
  name: epa-ethics-backup
  namespace: velero
spec:
  schedule: "0 2 * * *"
  template:
    includedNamespaces:
    - epa-ethics
    ttl: "720h0m0s"
```

## Step 8: Testing and Validation

### 8.1 Security Testing
```bash
# Container security scanning
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy:latest image epa-ethics/backend:latest

# Kubernetes security scanning
kube-score score k8s/*.yaml
```

### 8.2 Accessibility Testing
```bash
# Automated accessibility testing
cd admin-portal
npm run build
npx lighthouse --output html --output-path=./lighthouse-report.html \
  --only-categories=accessibility https://ethics-admin.epa.gov
```

### 8.3 Load Testing
```bash
# API load testing
k6 run --vus 50 --duration 5m load-test.js
```

## Step 9: Go-Live Checklist

### Pre-Deployment
- [ ] FedRAMP authorization in place
- [ ] Security controls implemented and tested
- [ ] Accessibility compliance verified
- [ ] Performance testing completed
- [ ] Backup and recovery procedures tested
- [ ] Monitoring and alerting configured
- [ ] DNS records configured
- [ ] SSL certificates installed
- [ ] App store submissions approved

### Post-Deployment
- [ ] Health checks passing
- [ ] Monitoring alerts configured
- [ ] Log aggregation working
- [ ] Backup jobs running
- [ ] User acceptance testing completed
- [ ] Training materials distributed
- [ ] Support procedures documented
- [ ] Incident response plan activated

## Support and Maintenance

### Ongoing Operations
- **Monitoring**: 24/7 application and infrastructure monitoring
- **Updates**: Regular security patches and feature updates
- **Backups**: Daily automated backups with tested restore procedures
- **Security**: Continuous security monitoring and threat detection

### Contact Information
- **Operations Team**: [ops@vendor.com]
- **Security Team**: [security@vendor.com]
- **EPA Contact**: [ethics-support@epa.gov]

---

**Document Version**: 1.0
**Last Updated**: [Current Date]
**Next Review**: [Review Date]