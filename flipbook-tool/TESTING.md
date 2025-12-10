# Testing Guide

## Quick Test

The package is ready to test! Here's how:

### Option 1: Direct Import (Current Setup)

The test component is already set up in:
- `src/components/TestFlipbook.tsx`

It imports directly from the source:
```tsx
import { Book, BookConfig } from "../../flipbook-tool/src/index";
```

### Option 2: Build and Link (Recommended for Package Testing)

1. **Build the package:**
   ```bash
   cd flipbook-tool
   npm install
   npm run build
   ```

2. **Link it locally:**
   ```bash
   npm link
   ```

3. **Use in your project:**
   ```bash
   cd ..
   npm link flipbook-tool
   ```

4. **Import in your code:**
   ```tsx
   import { Book } from 'flipbook-tool';
   ```

### Option 3: Test Configuration Only

You can test the configuration structure without running the app:

```typescript
import { BookConfig } from './flipbook-tool/src/types';

const testConfig: BookConfig = {
  size: { width: 400, height: 550 },
  pages: [
    {
      type: "cover",
      title: "Test",
      style: {
        background: { color: "purple" },
        color: "#ffffff"
      }
    }
  ]
};

// This validates the TypeScript types
console.log("Config is valid:", testConfig);
```

## What to Test

### ✅ Basic Functionality
- [ ] Book renders with simple config
- [ ] Pages display correctly
- [ ] Navigation works
- [ ] Page flipping animation works

### ✅ Styling
- [ ] Named colors work ("blue", "purple", etc.)
- [ ] Custom colors work (hex, rgb)
- [ ] Gradients work (named and custom)
- [ ] Typography settings apply
- [ ] Spacing/padding works
- [ ] Layout settings work

### ✅ Media
- [ ] Images display correctly
- [ ] Image sizing works
- [ ] YouTube videos embed correctly
- [ ] Video URL conversion works
- [ ] Direct video URLs work

### ✅ Page Types
- [ ] Cover pages render
- [ ] Chapter pages render (thick)
- [ ] Content pages render
- [ ] Custom pages render

### ✅ Content Elements
- [ ] Text elements render
- [ ] Headings render (H1-H6)
- [ ] Images in content array render
- [ ] Videos in content array render
- [ ] Dividers render
- [ ] Spacers render

## Known Issues

1. **Node.js Version**: If you get rollup errors, you may need Node.js 20.19+ or 22.12+
2. **CSS Import**: Make sure `Book.css` is in the same directory as `Book.tsx`
3. **React Version**: Requires React 18+ or 19+

## Troubleshooting

### Import Errors
- Check that all files are in the correct locations
- Verify TypeScript paths are correct
- Make sure `react-pageflip` is installed

### Styling Not Working
- Check that CSS file is imported
- Verify inline styles are being applied
- Check browser console for CSS errors

### Pages Not Rendering
- Verify `PageRenderer` has `displayName` set
- Check that `forwardRef` is used correctly
- Ensure `HTMLFlipBook` receives children with refs

