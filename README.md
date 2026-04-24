# world_explorer

A geospatial visualization web application built with React Native, Expo, and TypeScript. Explore world maps with interactive visualizations powered by D3-geo and real-time data management with Supabase.

## Tech Stack

- **Frontend**: React 19, React Native, Expo Router
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Geospatial**: D3-geo, TopoJSON
- **Backend**: Supabase
- **Language**: TypeScript
- **Build**: Expo

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install all required dependencies including Expo, React Native, and the Supabase client.

### 2. Development Server

Start the local development server:

```bash
npm run dev
```

This will start the Expo development server. You can then:
- Open the app in a web browser
- Scan the QR code with the Expo Go app on your mobile device
- Use an iOS simulator or Android emulator

### 3. Build for Web

To create a production-ready web build:

```bash
npm run build:web
```

The output will be generated in the `dist` directory.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build:web` - Build the application for web deployment
- `npm run lint` - Run ESLint to check code quality
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
├── app/              # Expo Router app directory with navigation
├── components/       # Reusable React components
├── hooks/           # Custom React hooks
├── data/            # Data files and assets
├── package.json     # Dependencies and scripts
├── tsconfig.json    # TypeScript configuration
└── app.json         # Expo configuration
```

## Development Workflow

1. Make changes to your code in the `app/`, `components/`, or `hooks/` directories
2. The development server will automatically hot reload
3. Run `npm run typecheck` to verify TypeScript types
4. Run `npm run lint` to check code quality

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Guide](https://docs.expo.dev/routing/introduction/)

---

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/gokulmenon/world_explorer)
