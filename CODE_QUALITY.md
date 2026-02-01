# Code Quality & Error Prevention

## 🛡️ How to Prevent Basic Errors

### 1. **Run Linting Before Every Commit**

```bash
# Lint frontend
cd frontend && npm run lint

# Lint specific file
npx eslint src/components/MyComponent.jsx

# Auto-fix issues
npm run lint -- --fix
```

### 2. **Use the Validation Script**

```bash
# Run comprehensive validation
bash scripts/validate_code.sh
```

This checks:
- ✅ ESLint errors (undefined functions, unused variables)
- ✅ Syntax errors
- ⚠️ Console.log statements
- ℹ️ TODO/FIXME comments

### 3. **Pre-Commit Hook (Automatic)**

The Git pre-commit hook runs automatically when you commit:
- Lints all staged JavaScript/JSX files
- **Blocks commit if errors found**
- Ensures only clean code reaches the repo

To bypass (emergency only):
```bash
git commit --no-verify -m "message"
```

### 4. **IDE Setup (VS Code)**

Install these extensions:
1. **ESLint** - Shows errors inline as you type
2. **Error Lens** - Highlights errors prominently
3. **Code Spell Checker** - Catches typos in function names

### 5. **Common Errors Caught by ESLint**

| Error Type | Example | ESLint Rule |
|------------|---------|-------------|
| Undefined function | `onClick={completeEvent}` when `completeEvent` doesn't exist | `no-undef` |
| Unused variables | `const [data, setData] = useState()` but never used | `no-unused-vars` |
| Unreachable code | Code after `return` | `no-unreachable` |
| Const reassignment | `const x = 1; x = 2;` | `no-const-assign` |

## 🚀 Best Practices

### Before Pushing Code:

```bash
# 1. Run validation
bash scripts/validate_code.sh

# 2. Run tests
npm run test

# 3. Check git status
git status

# 4. Commit (pre-commit hook runs automatically)
git commit -m "feat: add new feature"

# 5. Push
git push
```

### During Development:

- ✅ Keep ESLint running in VS Code
- ✅ Fix warnings as they appear (don't accumulate)
- ✅ Test in browser before committing
- ✅ Check console for errors
- ✅ Review changed files before commit

## 🔧 Current ESLint Rules

```javascript
{
  "no-undef": "error",           // Undefined variables/functions
  "no-unused-vars": "warn",      // Unused variables
  "no-unreachable": "error",     // Code after return
  "no-const-assign": "error"     // Const reassignment
}
```

## 📝 What Would Have Caught the `completeEvent` Error?

**All of these would have caught it:**

1. ✅ **ESLint** - `no-undef` rule would flag undefined `completeEvent`
2. ✅ **Pre-commit hook** - Would block the commit
3. ✅ **VS Code ESLint extension** - Would show red underline
4. ✅ **Manual lint run** - `npm run lint` would fail

## 🎯 Moving Forward

**Always run before pushing:**
```bash
npm run lint && npm run test && git push
```

Or use the one-liner:
```bash
bash scripts/validate_code.sh && npm run test && git push
```

## 🔮 Future Improvements

Consider adding:
- [ ] **TypeScript** - Catches type errors at compile time
- [ ] **Husky** - Better Git hooks management
- [ ] **Prettier** - Automatic code formatting
- [ ] **Jest** - Unit tests for components
- [ ] **CI/CD** - Automatic validation on GitHub

---

**Remember:** The tools are only useful if you run them! Make validation part of your workflow.
