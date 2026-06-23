# Research: Secure Document Upload & Management

## File Storage Options

### Cloud Storage Solutions
- **Azure Blob Storage**: Native integration with Microsoft stack, encryption at rest/transit, RBAC
- **AWS S3**: Mature, cost-effective, extensive compliance certifications
- **Google Cloud Storage**: Good for multi-region, strong security features

**Recommendation**: Azure Blob Storage for seamless Azure AD integration and compliance

## Upload Strategy

### Client-Side Considerations
- Chunked uploads for large files (>100MB)
- Pre-upload validation (file type, size, virus scan)
- Progress tracking with resumable uploads
- Client-side encryption before transmission

### Server-Side Security
- Validate file signatures, not just extensions
- Scan uploads with antivirus (ClamAV, Windows Defender API)
- Quarantine suspicious files
- Rate limiting per user/IP

## Security Architecture

### Encryption
- TLS 1.3 for transit
- AES-256 for data at rest
- Customer-managed keys (CMK) option

### Access Control
- Row-level security (RLS) in database
- Signed URLs with expiration
- Audit logging for all access
- Document-level permissions (Owner, Editor, Viewer)

### Compliance
- SOC 2 Type II compliant storage
- GDPR data residency options
- Retention policies with automated deletion

## Performance Considerations
- CDN for document delivery
- Caching headers (immutable versioned URLs)
- Lazy loading for document metadata
- Background processing for virus scanning

## Cost Optimization
- Tiered storage (hot/cool/archive)
- Reserved capacity planning
- Bandwidth optimization

CREATE TABLE DocumentPermissions (
  id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  document_id UNIQUEIDENTIFIER NOT NULL,
  user_id UNIQUEIDENTIFIER NOT NULL,
  permission_level NVARCHAR(20) NOT NULL,
  granted_at DATETIME2 DEFAULT GETUTCDATE(),
  granted_by UNIQUEIDENTIFIER NOT NULL,
  FOREIGN KEY (document_id) REFERENCES Documents(id),
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (granted_by) REFERENCES Users(id),
  UNIQUE(document_id, user_id)
);

CREATE TABLE DocumentVersions (
  id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  document_id UNIQUEIDENTIFIER NOT NULL,
  version_number INT NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  checksum NVARCHAR(64) NOT NULL,
  storage_path NVARCHAR(500) NOT NULL,
  created_at DATETIME2 DEFAULT GETUTCDATE(),
  created_by UNIQUEIDENTIFIER NOT NULL,
  change_summary NVARCHAR(MAX),
  FOREIGN KEY (document_id) REFERENCES Documents(id),
  FOREIGN KEY (created_by) REFERENCES Users(id),
  UNIQUE(document_id, version_number)
);

CREATE TABLE AuditLogs (
  id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  document_id UNIQUEIDENTIFIER NOT NULL,
  user_id UNIQUEIDENTIFIER,
  action NVARCHAR(50) NOT NULL,
  action_timestamp DATETIME2 DEFAULT GETUTCDATE(),
  ip_address NVARCHAR(45),
  user_agent NVARCHAR(MAX),
  status NVARCHAR(20),
  error_message NVARCHAR(MAX),
  FOREIGN KEY (document_id) REFERENCES Documents(id),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE INDEX idx_documents_created_by ON Documents(created_by);
CREATE INDEX idx_documents_created_at ON Documents(created_at);
CREATE INDEX idx_documents_is_deleted ON Documents(is_deleted);
CREATE INDEX idx_permissions_user_id ON DocumentPermissions(user_id);
CREATE INDEX idx_permissions_document_id ON DocumentPermissions(document_id);
CREATE INDEX idx_audit_logs_document_id ON AuditLogs(document_id);
CREATE INDEX idx_audit_logs_user_id ON AuditLogs(user_id);
CREATE INDEX idx_audit_logs_timestamp ON AuditLogs(action_timestamp);
CREATE INDEX idx_versions_document_id ON DocumentVersions(document_id);