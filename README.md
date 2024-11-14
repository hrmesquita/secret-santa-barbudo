# Secret Santa Hub Frontend 🎄

A modern, responsive web application for organizing Secret Santa events. Built with Next.js and styled with Tailwind CSS and Shadcn/UI components.

![Secret Santa Hub Screenshot](public/screenshot.png)

## Features ✨

- **Modern Interface**: Clean and intuitive design using Shadcn/UI components
- **Multi-language Support**: English and Portuguese (PT) interfaces
- **Smart Exclusions**: Define who can't be matched with whom
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Form Validation**: Comprehensive input validation and sanitization
- **Dark/Light Mode**: Automatic theme detection with manual toggle

## Tech Stack 🛠

- **Next.js 14**: React framework for production
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: High-quality React components
- **Lucide Icons**: Beautiful, consistent icon set

## Getting Started 🚀

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/secret-santa-hub-frontend.git
cd secret-santa-hub-frontend
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Update `.env.local` with your settings:
```env
NEXT_PUBLIC_API_URL=your_backend_url
NEXT_PUBLIC_API_KEY=your_api_key
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Key Components 🔑

### Secret Santa Form
The main form component handles:
- Group details input
- Participant management
- Exclusion rules
- Input validation
- API integration

```typescript
// Example usage
import { SecretSantaForm } from '@/components/forms/SecretSantaForm';

export default function HomePage() {
  return <SecretSantaForm />;
}
```

### Language Toggle
Supports English and Portuguese:
```typescript
import { LanguageToggle } from '@/components/LanguageToggle';

// Inside your layout
<LanguageToggle defaultLanguage="en" />
```

## Form Validation 🛡

Built-in validation includes:
- Name sanitization
- Email validation
- Price limits
- Participant limits (2-20)
- Exclusion rules validation
- Special character filtering

## Contributing 🤝

1. Fork the repository
2. Create your feature branch
```bash
git checkout -b feature/AmazingFeature
```
3. Commit your changes
```bash
git commit -m 'Add some AmazingFeature'
```
4. Push to the branch
```bash
git push origin feature/AmazingFeature
```
5. Open a Pull Request

## Scripts 📝

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

## Environment Variables 🔐

Required environment variables:
```env
NEXT_PUBLIC_API_URL=        # Backend API URL
NEXT_PUBLIC_API_KEY=        # API Key for authentication
```

## Browser Support 🌐

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Issues 🐛

- None currently

## Future Enhancements 🚀

- [ ] Email notification preview
- [ ] Group management dashboard
- [ ] Gift suggestions
- [ ] Event reminders
- [ ] More language support

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- [Shadcn/UI](https://ui.shadcn.com/) for the beautiful components
- [Vercel](https://vercel.com) for hosting
- [Next.js](https://nextjs.org/) team for the amazing framework