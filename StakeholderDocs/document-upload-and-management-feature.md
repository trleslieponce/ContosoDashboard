 Feature: Document Upload and Management for ContosoDashboard
    
 Enable employees to upload work-related documents (PDF, Office, images, text), organize by category/project, share with team members, and search efficiently. Must integrate with existing dashboard features while maintaining security.
    
 Target Users: All 5,000 Contoso employees with role-based access (Employee, Team Lead, Project Manager, Administrator).
    
 Core Capabilities:
 1. Upload: Multiple files, max 25 MB each, supported types (PDF, Office docs, images, text), metadata (title, category, description, project, tags), progress indicator, virus scanning.
 2. Organization: My Documents view, Project Documents view, search by title/description/tags/uploader/project (results under 2 seconds).
 3. Management: Download, in-browser preview (PDF/images), edit metadata, replace files, delete documents, sharing with notifications.
 4. Integration: Attach to tasks, dashboard Recent Documents widget, notifications for sharing/new project docs.
 5. Performance: Upload in 30s (25 MB files), list load in 2s (500 docs), search in 2s, preview in 3s.
 6. Audit: Log all uploads/downloads/deletions/sharing, admin reports.
    
 Security: Azure Blob Storage encryption at rest, TLS 1.3 in transit, RBAC enforcement, virus scanning.
    
 Success Criteria: 70% adoption in 3 months, find docs under 30s, 90% properly categorized, zero security incidents.
    
 Constraints: Azure Blob Storage, ASP.NET Core integration, 8-10 week timeline, Entra ID authentication.
    
 Out of Scope: Version history, storage quotas, soft delete/trash, collaborative editing, external integrations, mobile apps.