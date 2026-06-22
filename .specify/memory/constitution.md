# Contoso Dashboard Constitution

## Core Principles

### I. Component-First Architecture
Every feature starts as a reusable Razor component. Components must be self-contained, independently testable, and documented. Components have a single responsibility, clear public parameters, and no orphaned files. Organize components in Pages/ and Shared/ with folders by feature domain.

### II. API-First Design
Define clear contracts for backend functionality. Expose services via well-documented REST/JSON endpoints and typed service interfaces in Models/ and Services/. Frontend components interact with abstractions, not concrete implementations. APIs should include versioning and consistent error shapes.

### III. Test-First (NON-NEGOTIABLE)
Adopt TDD: write tests before implementation and follow Red-Green-Refactor. Unit tests cover Models and business logic; component tests cover UI behavior; integration tests validate end-to-end flows. Tests are required for PR approval and protect public behaviors.

### IV. Integration Testing
Integration tests validate the data flow from API through Models to UI rendering. Use appsettings.Development.json or test-specific config for fixtures. Run integration suites in CI; all integration tests must pass before merging to main.

### V. Configuration Management
Manage environment-specific settings through appsettings.json and environment-specific overrides (appsettings.Development.json, appsettings.Production.json). Do not hardcode secrets or environment-specific values in source; use User Secrets or a secure secrets store. Centralize DI and configuration in Program.cs.

### VI. Documentation Standards
Document intent and usage: XML comments for public methods and components, README.md with architecture and setup steps, and concise CHANGELOG entries for behavioral changes. Include usage examples and diagrams for complex flows. Update docs as part of feature work.

### VII. Dependency Injection & Abstraction
Register services centrally in Program.cs. Favor interface-driven design; code depends on abstractions. Document service lifetimes (Transient/Scoped/Singleton) and choose lifetimes to match resource usage. Provide test doubles (mocks/fakes) for common services.

### VIII. Data Validation & Security
Validate input at the Model level using data annotations and custom validators; do not rely solely on client-side checks. Enforce authentication and authorization for protected endpoints. Never log sensitive data; redact secrets in errors and telemetry. Follow least-privilege access patterns.

### IX. Code Quality & Reviews
Use consistent coding conventions, formatters, and static analyzers. Every PR requires at least one reviewer and green CI checks. Prioritize readability and simplicity; refactor when complexity grows. Maintain meaningful unit and integration test coverage.

### X. Release & Deployment
Automate builds, tests, and deployments with CI/CD. Manage DB migrations, feature flags, and backward-compatible schema changes carefully. Maintain a rollback strategy, health checks, and monitoring/alerts for production releases.

## Amendments
Changes to this constitution require a documented rationale and a pull request. Amendments are applied after review and consensus.