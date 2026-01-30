# Contributing to Santaan IVF Platform

Thank you for your interest in contributing to the Santaan IVF Platform! This document provides guidelines and instructions for contributing.

## 🎯 Core Principles

Before contributing, please understand our core principles:

1. **Events → Templates → Communication → Reaction Capture → Timeline Update**
2. Simple, proven technologies over complex ones
3. Staff augmentation, not replacement
4. Clinical acronyms expand to full medical records
5. Multi-tenant clinic support with role-based access

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/santaan-ivf-platform.git
   cd santaan-ivf-platform
   ```
3. **Run setup**
   ```bash
   ./setup.sh
   ```
4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📋 Development Workflow

### Backend Development

```bash
cd backend

# Install dependencies
npm install

# Run database
docker-compose up postgres -d

# Run migrations
npx prisma migrate dev

# Start dev server
npm run dev
```

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Database Changes

When modifying the database schema:

```bash
cd backend

# 1. Modify prisma/schema.prisma
# 2. Create migration
npx prisma migrate dev --name descriptive_migration_name

# 3. Update seed.js if needed
# 4. Test migration
npm run prisma:seed
```

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(timeline): add reaction capture form

- Added anxiety slider component
- Implemented understanding level buttons
- Connected to patient store

Closes #42
```

```
fix(auth): resolve token expiration issue

Previously tokens were not being refreshed correctly.
Now implementing proper JWT rotation.

Fixes #38
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### E2E Tests
```bash
# Coming soon
```

## 📐 Code Style

### JavaScript/React
- Use ES6+ features
- Prefer functional components and hooks
- Use async/await over promises
- Keep functions small and focused
- Add JSDoc comments for complex logic

### Example:
```javascript
/**
 * Expands clinical acronyms to full medical records
 * @param {Object} clinicalData - Clinical data with acronyms
 * @returns {Promise<string>} Expanded medical record text
 */
export const expandAcronyms = async (clinicalData) => {
  // Implementation
};
```

### CSS/Tailwind
- Use Tailwind utility classes
- Create custom components for repeated patterns
- Follow mobile-first approach

## 🔍 Code Review Process

1. Create a pull request
2. Ensure CI passes
3. Request review from maintainers
4. Address feedback
5. Maintainer merges when approved

### PR Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] Database migrations tested
- [ ] Works in Docker environment

## 🐛 Reporting Bugs

Use GitHub Issues with the bug template:

**Title:** Brief description
**Description:** Detailed explanation
**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior:** What should happen
**Actual Behavior:** What actually happens
**Environment:** Browser, OS, Docker version
**Screenshots:** If applicable

## 💡 Feature Requests

Use GitHub Issues with the feature template:

**Title:** Feature name
**Problem:** What problem does this solve?
**Proposed Solution:** How should it work?
**Alternatives:** Other approaches considered
**Additional Context:** Any other relevant information

## 📚 Documentation

When adding features:
1. Update README.md if needed
2. Add JSDoc comments
3. Update API documentation
4. Add examples in code comments
5. Update TODO.md checklist

## 🔐 Security

**Do NOT commit:**
- Real credentials
- Real patient data
- API keys
- Passwords

**Use:**
- .env files (gitignored)
- Environment variables
- Dummy/seed data only

If you discover a security vulnerability:
1. **Do NOT open a public issue**
2. Email: security@santaan.com (or create private security advisory)
3. Wait for acknowledgment before disclosing

## 🎨 UI/UX Guidelines

### Design Principles
- **Simple**: Easy to understand and use
- **Fast**: Quick to load and interact
- **Accessible**: Works for all users
- **Mobile-first**: Responsive design

### Color Palette
- Primary: Green (#22c55e) - Growth, life, hope
- Error: Red (#ef4444)
- Warning: Yellow (#f59e0b)
- Info: Blue (#3b82f6)

### Typography
- System fonts for performance
- Clear hierarchy
- Readable font sizes (min 14px)

## 📦 Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create release branch
4. Test thoroughly
5. Merge to main
6. Tag release
7. Deploy

## ❓ Questions?

- Check existing documentation
- Search closed issues
- Ask in discussions
- Contact maintainers

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Your contributions help improve IVF care for clinics and patients worldwide!

---

Happy coding! 🚀
