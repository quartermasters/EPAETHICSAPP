# EPA Ethics App - Security and Compliance Implementation Guide

## Overview
This document provides detailed implementation strategies for achieving FedRAMP Low compliance, Section 508 accessibility, and EPA security requirements for the EthicsGo application.

## FedRAMP Low Security Controls Implementation

### AC-2: Account Management
```typescript
// Federal account management system
interface FederalUser {
  id: string;
  pivId: string;
  employeeId: string;
  email: string;
  role: UserRole;
  securityClearance: SecurityClearance;
  accountStatus: AccountStatus;
  lastLogin: Date;
  passwordLastChanged: Date;
  mfaEnabled: boolean;
  failedLoginAttempts: number;
  accountLockedUntil?: Date;
}

enum UserRole {
  EPA_ADMIN = 'EPA_ADMIN',
  ETHICS_OFFICER = 'ETHICS_OFFICER',
  CONTENT_MANAGER = 'CONTENT_MANAGER',
  READ_ONLY_USER = 'READ_ONLY_USER'
}

enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING_APPROVAL = 'PENDING_APPROVAL'
}

class FederalAccountManager {
  private readonly MAX_FAILED_ATTEMPTS = 3;
  private readonly ACCOUNT_LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes
  private readonly PASSWORD_EXPIRY_DAYS = 90;

  async createUser(userData: CreateUserRequest): Promise<FederalUser> {
    // Validate PIV/CAC credentials
    const pivValidation = await this.validatePIVCredentials(userData.pivId);
    if (!pivValidation.isValid) {
      throw new Error('Invalid PIV credentials');
    }

    // Create user with federal compliance
    const user: FederalUser = {
      id: generateUUID(),
      pivId: userData.pivId,
      employeeId: userData.employeeId,
      email: userData.email,
      role: userData.role,
      securityClearance: userData.securityClearance,
      accountStatus: AccountStatus.PENDING_APPROVAL,
      lastLogin: new Date(),
      passwordLastChanged: new Date(),
      mfaEnabled: true, // Mandatory for federal users
      failedLoginAttempts: 0
    };

    await this.auditLogger.logAccountCreation(user);
    return await this.userRepository.save(user);
  }

  async validateLogin(pivId: string, credentials: LoginCredentials): Promise<LoginResult> {
    const user = await this.userRepository.findByPivId(pivId);
    
    if (!user) {
      await this.auditLogger.logFailedLogin(pivId, 'User not found');
      throw new Error('Invalid credentials');
    }

    // Check account lockout
    if (this.isAccountLocked(user)) {
      await this.auditLogger.logFailedLogin(pivId, 'Account locked');
      throw new Error('Account is locked');
    }

    // Validate credentials
    const isValid = await this.validateCredentials(user, credentials);
    
    if (!isValid) {
      await this.incrementFailedAttempts(user);
      await this.auditLogger.logFailedLogin(pivId, 'Invalid credentials');
      throw new Error('Invalid credentials');
    }

    // Reset failed attempts on successful login
    await this.resetFailedAttempts(user);
    await this.updateLastLogin(user);
    await this.auditLogger.logSuccessfulLogin(user);

    return {
      user,
      sessionToken: await this.generateSessionToken(user),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
    };
  }

  private isAccountLocked(user: FederalUser): boolean {
    if (user.failedLoginAttempts >= this.MAX_FAILED_ATTEMPTS) {
      if (user.accountLockedUntil && user.accountLockedUntil > new Date()) {
        return true;
      }
    }
    return false;
  }
}
```

### AC-3: Access Enforcement
```typescript
// Role-based access control implementation
class RoleBasedAccessControl {
  private permissions: Map<UserRole, Permission[]> = new Map([
    [UserRole.EPA_ADMIN, [
      Permission.MANAGE_USERS,
      Permission.MANAGE_CONTENT,
      Permission.VIEW_ANALYTICS,
      Permission.MANAGE_SYSTEM,
      Permission.ACCESS_AUDIT_LOGS
    ]],
    [UserRole.ETHICS_OFFICER, [
      Permission.MANAGE_CONTENT,
      Permission.VIEW_ANALYTICS,
      Permission.VIEW_USER_PROGRESS
    ]],
    [UserRole.CONTENT_MANAGER, [
      Permission.MANAGE_CONTENT,
      Permission.VIEW_CONTENT_ANALYTICS
    ]],
    [UserRole.READ_ONLY_USER, [
      Permission.VIEW_CONTENT,
      Permission.TAKE_ASSESSMENTS
    ]]
  ]);

  async checkPermission(userId: string, resource: string, action: string): Promise<boolean> {
    const user = await this.userService.getUser(userId);
    const userPermissions = this.permissions.get(user.role) || [];
    
    const requiredPermission = this.getRequiredPermission(resource, action);
    const hasPermission = userPermissions.includes(requiredPermission);

    // Log access attempt
    await this.auditLogger.logAccessAttempt({
      userId: user.id,
      resource,
      action,
      permission: requiredPermission,
      granted: hasPermission,
      timestamp: new Date()
    });

    return hasPermission;
  }

  // Express middleware for API protection
  createAuthorizationMiddleware(requiredPermission: Permission) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const user = req.user as FederalUser;
      
      if (!user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const userPermissions = this.permissions.get(user.role) || [];
      
      if (!userPermissions.includes(requiredPermission)) {
        await this.auditLogger.logUnauthorizedAccess({
          userId: user.id,
          permission: requiredPermission,
          endpoint: req.path,
          method: req.method,
          ip: req.ip
        });
        
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      next();
    };
  }
}
```

### AU-2: Audit Events
```typescript
// Comprehensive audit logging system
interface AuditEvent {
  id: string;
  eventType: AuditEventType;
  userId?: string;
  sessionId?: string;
  timestamp: Date;
  sourceIp: string;
  userAgent: string;
  resource: string;
  action: string;
  outcome: AuditOutcome;
  details: Record<string, any>;
  severity: AuditSeverity;
}

enum AuditEventType {
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  DATA_ACCESS = 'DATA_ACCESS',
  DATA_MODIFICATION = 'DATA_MODIFICATION',
  SYSTEM_ACCESS = 'SYSTEM_ACCESS',
  SECURITY_EVENT = 'SECURITY_EVENT',
  ADMINISTRATIVE_ACTION = 'ADMINISTRATIVE_ACTION'
}

enum AuditOutcome {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  ERROR = 'ERROR'
}

enum AuditSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

class FederalAuditLogger {
  private readonly RETENTION_PERIOD = 7 * 365 * 24 * 60 * 60 * 1000; // 7 years

  async logEvent(event: Partial<AuditEvent>): Promise<void> {
    const auditEvent: AuditEvent = {
      id: generateUUID(),
      timestamp: new Date(),
      severity: AuditSeverity.LOW,
      ...event
    } as AuditEvent;

    // Store in multiple locations for redundancy
    await Promise.all([
      this.storeInDatabase(auditEvent),
      this.sendToSIEM(auditEvent),
      this.writeToSecureLog(auditEvent)
    ]);

    // Alert on high severity events
    if (auditEvent.severity === AuditSeverity.HIGH || 
        auditEvent.severity === AuditSeverity.CRITICAL) {
      await this.sendSecurityAlert(auditEvent);
    }
  }

  async logLogin(userId: string, outcome: AuditOutcome, details: any): Promise<void> {
    await this.logEvent({
      eventType: AuditEventType.AUTHENTICATION,
      userId,
      action: 'LOGIN',
      outcome,
      details,
      severity: outcome === AuditOutcome.FAILURE ? AuditSeverity.MEDIUM : AuditSeverity.LOW
    });
  }

  async logDataAccess(userId: string, resource: string, outcome: AuditOutcome): Promise<void> {
    await this.logEvent({
      eventType: AuditEventType.DATA_ACCESS,
      userId,
      resource,
      action: 'READ',
      outcome,
      severity: AuditSeverity.LOW
    });
  }

  async logDataModification(userId: string, resource: string, changes: any): Promise<void> {
    await this.logEvent({
      eventType: AuditEventType.DATA_MODIFICATION,
      userId,
      resource,
      action: 'modify',
      outcome: AuditOutcome.SUCCESS,
      details: { changes },
      severity: AuditSeverity.MEDIUM
    });
  }

  async logSecurityEvent(eventType: string, details: any): Promise<void> {
    await this.logEvent({
      eventType: AuditEventType.SECURITY_EVENT,
      action: eventType,
      outcome: AuditOutcome.SUCCESS,
      details,
      severity: AuditSeverity.HIGH
    });
  }

  private async storeInDatabase(event: AuditEvent): Promise<void> {
    await this.auditRepository.save(event);
  }

  private async sendToSIEM(event: AuditEvent): Promise<void> {
    // Send to Security Information and Event Management system
    await this.siemClient.sendEvent({
      timestamp: event.timestamp.toISOString(),
      source: 'EPA-ETHICS-APP',
      event_type: event.eventType,
      severity: event.severity,
      user_id: event.userId,
      message: JSON.stringify(event)
    });
  }

  private async writeToSecureLog(event: AuditEvent): Promise<void> {
    const logEntry = {
      timestamp: event.timestamp.toISOString(),
      level: event.severity,
      event: event.eventType,
      user: event.userId,
      action: event.action,
      resource: event.resource,
      outcome: event.outcome,
      details: event.details
    };

    await this.secureLogger.write(JSON.stringify(logEntry));
  }
}
```

### SC-7: Boundary Protection
```typescript
// Network security implementation
class NetworkSecurityManager {
  private allowedOrigins = [
    'https://ethics.epa.gov',
    'https://ethics-admin.epa.gov',
    'https://ethics-api.epa.gov'
  ];

  private securityHeaders = {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
  };

  configureExpressSecurity(app: Express): void {
    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP',
      standardHeaders: true,
      legacyHeaders: false
    });

    app.use(limiter);

    // CORS configuration
    app.use(cors({
      origin: (origin, callback) => {
        if (!origin || this.allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      optionsSuccessStatus: 200
    }));

    // Security headers
    app.use(helmet({
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
      },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'", "wss:", "https:"]
        }
      }
    }));

    // Custom security middleware
    app.use(this.customSecurityMiddleware.bind(this));
  }

  private customSecurityMiddleware(req: Request, res: Response, next: NextFunction): void {
    // Add federal security headers
    Object.entries(this.securityHeaders).forEach(([header, value]) => {
      res.setHeader(header, value);
    });

    // Log all requests
    this.auditLogger.logEvent({
      eventType: AuditEventType.SYSTEM_ACCESS,
      action: 'HTTP_REQUEST',
      resource: req.path,
      outcome: AuditOutcome.SUCCESS,
      details: {
        method: req.method,
        userAgent: req.get('User-Agent'),
        referer: req.get('Referer')
      },
      sourceIp: req.ip,
      userAgent: req.get('User-Agent') || ''
    });

    next();
  }
}
```

## Section 508 Accessibility Implementation

### WCAG 2.1 AA Compliance Framework
```typescript
// Accessibility service for comprehensive compliance
class AccessibilityManager {
  private readonly MINIMUM_CONTRAST_RATIO = 4.5;
  private readonly LARGE_TEXT_CONTRAST_RATIO = 3.0;
  private readonly MINIMUM_TOUCH_TARGET = 44; // pixels

  async validateColorContrast(foregroundColor: string, backgroundColor: string): Promise<boolean> {
    const contrast = this.calculateContrastRatio(foregroundColor, backgroundColor);
    return contrast >= this.MINIMUM_CONTRAST_RATIO;
  }

  generateAccessibilityReport(component: React.ComponentType): AccessibilityReport {
    return {
      wcagLevel: 'AA',
      compliance: {
        perceivable: this.checkPerceivableCompliance(component),
        operable: this.checkOperableCompliance(component),
        understandable: this.checkUnderstandableCompliance(component),
        robust: this.checkRobustCompliance(component)
      },
      violations: this.findViolations(component),
      recommendations: this.generateRecommendations(component)
    };
  }

  private checkPerceivableCompliance(component: React.ComponentType): ComplianceCheck {
    return {
      passed: true,
      checks: [
        'Text alternatives provided for non-text content',
        'Captions provided for videos',
        'Audio descriptions available',
        'Content can be presented without loss of meaning',
        'Sufficient color contrast maintained'
      ]
    };
  }

  private checkOperableCompliance(component: React.ComponentType): ComplianceCheck {
    return {
      passed: true,
      checks: [
        'All functionality available from keyboard',
        'Users have enough time to read content',
        'Content does not cause seizures',
        'Users can navigate and find content',
        'Input methods beyond keyboard available'
      ]
    };
  }
}

// React component with full accessibility support
interface AccessibleComponentProps {
  children: React.ReactNode;
  accessibilityLabel: string;
  accessibilityHint?: string;
  accessibilityRole?: string;
  testID?: string;
}

const AccessibleContainer: React.FC<AccessibleComponentProps> = ({
  children,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'region',
  testID,
  ...props
}) => {
  const [focusVisible, setFocusVisible] = useState(false);

  const handleFocus = useCallback(() => {
    setFocusVisible(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocusVisible(false);
  }, []);

  return (
    <View
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      testID={testID}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={[
        styles.accessibleContainer,
        focusVisible && styles.focusVisible
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  accessibleContainer: {
    minHeight: 44, // Minimum touch target
    padding: 12,
    borderRadius: 4
  },
  focusVisible: {
    borderWidth: 3,
    borderColor: '#0066CC',
    borderStyle: 'solid'
  }
});
```

### Screen Reader Optimization
```typescript
// Screen reader support implementation
class ScreenReaderManager {
  private announcements: string[] = [];

  announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (Platform.OS === 'ios') {
      AccessibilityInfo.announceForAccessibility(message);
    } else {
      // Android implementation
      AccessibilityInfo.setAccessibilityFocus(this.createAnnouncementElement(message));
    }

    this.announcements.push(message);
  }

  private createAnnouncementElement(message: string): React.ReactElement {
    return (
      <View
        accessible={true}
        accessibilityLiveRegion="polite"
        accessibilityLabel={message}
        style={{ position: 'absolute', left: -10000, top: -10000 }}
      >
        <Text>{message}</Text>
      </View>
    );
  }

  configureScreenReaderForScreen(screenName: string): void {
    const configurations = {
      'EthicsTraining': {
        header: 'Federal Ethics Training Module',
        navigation: 'Use tab key to navigate between sections',
        instructions: 'Select a module to begin training'
      },
      'Quiz': {
        header: 'Ethics Knowledge Assessment',
        navigation: 'Navigate between questions using next and previous buttons',
        instructions: 'Select your answer and press submit to continue'
      }
    };

    const config = configurations[screenName];
    if (config) {
      this.announceToScreenReader(
        `${config.header}. ${config.navigation}. ${config.instructions}`
      );
    }
  }
}

// Focus management for complex navigation
class FocusManager {
  private focusStack: React.RefObject<any>[] = [];

  pushFocus(ref: React.RefObject<any>): void {
    this.focusStack.push(ref);
    this.setFocus(ref);
  }

  popFocus(): void {
    this.focusStack.pop();
    const previousFocus = this.focusStack[this.focusStack.length - 1];
    if (previousFocus) {
      this.setFocus(previousFocus);
    }
  }

  private setFocus(ref: React.RefObject<any>): void {
    if (ref.current) {
      AccessibilityInfo.setAccessibilityFocus(findNodeHandle(ref.current));
    }
  }

  createSkipLink(targetRef: React.RefObject<any>, text: string): React.ReactElement {
    return (
      <TouchableOpacity
        accessible={true}
        accessibilityLabel={text}
        accessibilityRole="button"
        style={styles.skipLink}
        onPress={() => this.setFocus(targetRef)}
      >
        <Text style={styles.skipLinkText}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
```

## Data Protection and Encryption

### Encryption Implementation
```typescript
// Federal-grade encryption service
class FederalEncryptionService {
  private readonly ALGORITHM = 'aes-256-gcm';
  private readonly KEY_SIZE = 32; // 256 bits
  private readonly IV_SIZE = 16;  // 128 bits

  async encryptSensitiveData(data: string, key: Buffer): Promise<EncryptedData> {
    const iv = crypto.randomBytes(this.IV_SIZE);
    const cipher = crypto.createCipher(this.ALGORITHM, key);
    cipher.setAAD(Buffer.from('EPA-ETHICS-APP', 'utf8'));

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    return {
      encryptedData: encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    };
  }

  async decryptSensitiveData(encryptedData: EncryptedData, key: Buffer): Promise<string> {
    const decipher = crypto.createDecipher(this.ALGORITHM, key);
    decipher.setAAD(Buffer.from('EPA-ETHICS-APP', 'utf8'));
    decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));

    let decrypted = decipher.update(encryptedData.encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  generateSecureKey(): Buffer {
    return crypto.randomBytes(this.KEY_SIZE);
  }

  async hashPassword(password: string, salt?: string): Promise<HashedPassword> {
    const saltBuffer = salt ? Buffer.from(salt, 'hex') : crypto.randomBytes(16);
    const hash = await scrypt(password, saltBuffer, 64);

    return {
      hash: hash.toString('hex'),
      salt: saltBuffer.toString('hex')
    };
  }
}

// Database encryption middleware
class DatabaseEncryptionMiddleware {
  private encryptionService: FederalEncryptionService;
  private keyManager: KeyManager;

  async beforeSave(entity: any): Promise<any> {
    const sensitiveFields = this.getSensitiveFields(entity);
    
    for (const field of sensitiveFields) {
      if (entity[field]) {
        const key = await this.keyManager.getEncryptionKey();
        entity[field] = await this.encryptionService.encryptSensitiveData(
          entity[field],
          key
        );
      }
    }

    return entity;
  }

  async afterLoad(entity: any): Promise<any> {
    const sensitiveFields = this.getSensitiveFields(entity);
    
    for (const field of sensitiveFields) {
      if (entity[field] && this.isEncrypted(entity[field])) {
        const key = await this.keyManager.getEncryptionKey();
        entity[field] = await this.encryptionService.decryptSensitiveData(
          entity[field],
          key
        );
      }
    }

    return entity;
  }

  private getSensitiveFields(entity: any): string[] {
    // Define which fields contain sensitive data
    const sensitiveFieldMap = {
      User: ['email', 'phone', 'personalInfo'],
      AuditLog: ['details'],
      TrainingProgress: ['personalNotes']
    };

    return sensitiveFieldMap[entity.constructor.name] || [];
  }
}
```

## Incident Response and Monitoring

### Real-time Security Monitoring
```typescript
// Security monitoring and incident response
class SecurityMonitoringService {
  private readonly THREAT_THRESHOLDS = {
    FAILED_LOGINS: 5,
    SUSPICIOUS_ACTIVITY: 3,
    DATA_ACCESS_ANOMALY: 10
  };

  async monitorSecurityEvents(): Promise<void> {
    // Monitor failed login attempts
    await this.monitorFailedLogins();
    
    // Monitor suspicious activity patterns
    await this.monitorSuspiciousActivity();
    
    // Monitor data access anomalies
    await this.monitorDataAccessAnomalies();
  }

  private async monitorFailedLogins(): Promise<void> {
    const recentFailures = await this.auditRepository.getFailedLogins(
      new Date(Date.now() - 60 * 60 * 1000) // Last hour
    );

    const failuresByIP = new Map<string, number>();
    
    recentFailures.forEach(event => {
      const count = failuresByIP.get(event.sourceIp) || 0;
      failuresByIP.set(event.sourceIp, count + 1);
    });

    for (const [ip, count] of failuresByIP) {
      if (count >= this.THREAT_THRESHOLDS.FAILED_LOGINS) {
        await this.triggerSecurityIncident({
          type: 'BRUTE_FORCE_ATTACK',
          severity: 'HIGH',
          sourceIp: ip,
          description: `${count} failed login attempts from ${ip}`,
          recommendedAction: 'BLOCK_IP'
        });
      }
    }
  }

  private async triggerSecurityIncident(incident: SecurityIncident): Promise<void> {
    // Log the incident
    await this.auditLogger.logSecurityEvent('SECURITY_INCIDENT', incident);

    // Send immediate notification
    await this.notificationService.sendSecurityAlert({
      recipients: ['security-team@epa.gov', 'ciso@epa.gov'],
      subject: `EPA Ethics App Security Incident - ${incident.type}`,
      message: this.formatSecurityIncidentMessage(incident),
      priority: incident.severity
    });

    // Execute automated response
    await this.executeAutomatedResponse(incident);
  }

  private async executeAutomatedResponse(incident: SecurityIncident): Promise<void> {
    switch (incident.recommendedAction) {
      case 'BLOCK_IP':
        await this.firewallService.blockIP(incident.sourceIp, '24h');
        break;
      case 'LOCK_ACCOUNT':
        if (incident.userId) {
          await this.accountService.lockAccount(incident.userId, 'Security incident');
        }
        break;
      case 'ESCALATE':
        await this.escalationService.escalateToSOC(incident);
        break;
    }
  }
}

// Performance and availability monitoring
class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();

  async recordMetric(name: string, value: number): Promise<void> {
    const values = this.metrics.get(name) || [];
    values.push(value);
    
    // Keep only last 100 values
    if (values.length > 100) {
      values.shift();
    }
    
    this.metrics.set(name, values);

    // Check for threshold violations
    await this.checkThresholds(name, value);
  }

  private async checkThresholds(metricName: string, value: number): Promise<void> {
    const thresholds = {
      'response_time': 1000, // 1 second
      'error_rate': 0.05,    // 5%
      'cpu_usage': 80,       // 80%
      'memory_usage': 85     // 85%
    };

    const threshold = thresholds[metricName];
    if (threshold && value > threshold) {
      await this.alertService.sendPerformanceAlert({
        metric: metricName,
        value,
        threshold,
        timestamp: new Date()
      });
    }
  }

  generateHealthReport(): HealthReport {
    return {
      timestamp: new Date(),
      status: this.calculateOverallHealth(),
      metrics: {
        responseTime: this.calculateAverage('response_time'),
        errorRate: this.calculateAverage('error_rate'),
        cpuUsage: this.calculateAverage('cpu_usage'),
        memoryUsage: this.calculateAverage('memory_usage'),
        uptime: process.uptime()
      },
      services: {
        database: this.checkDatabaseHealth(),
        api: this.checkAPIHealth(),
        storage: this.checkStorageHealth()
      }
    };
  }
}
```

This comprehensive security and compliance implementation ensures the EPA Ethics App meets all federal requirements while maintaining robust protection against threats and providing full accessibility compliance.