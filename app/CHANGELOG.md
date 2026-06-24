# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2026-06-24

### Added
- Vercel deployment configuration (`vercel.json`)
- API serverless function entry point (`api/index.ts`)
- Comprehensive deployment documentation (`DEPLOYMENT.md`)
- GitHub Actions CI workflow for automated testing
- `.vercelignore` file for optimized deployments
- TypeScript deprecation warnings suppression

### Changed
- Updated build scripts for Vercel compatibility
- Changed from `HashRouter` to `BrowserRouter` for proper routing
- Cleaned up Dockerfile (removed proxy configurations)
- Enhanced `.gitignore` with IDE and Vercel-specific entries
- Updated ESLint configuration to reduce noise from UI components
- Fixed TypeScript errors in HTTP client and seed file
- Improved React component patterns (AuthLayout, Sidebar)

### Fixed
- TypeScript `any` type usage in HTTP client
- Unused variable warnings in seed file
- React hooks warnings in AuthLayout component
- Impure function call in Sidebar skeleton component
- Build script compatibility with Vercel

### Documentation
- Added detailed deployment guide for Vercel and Docker
- Updated README with deployment quick start
- Added environment variable documentation
- Included troubleshooting section

## Notes

This release prepares the application for production deployment on Vercel with:
- Serverless API functions
- Static frontend hosting
- Proper routing configuration
- Database connection handling
- OAuth integration support