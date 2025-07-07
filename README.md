# Jewelry Product Display Application

A modern Next.js application that displays jewelry products with an interactive carousel, color picker, and popularity scoring system.

## Features

- **Product Carousel**: Navigate through jewelry products using arrow buttons or swipe gestures
- **Color Picker**: Switch between different color variants of each product
- **Popularity Score**: Display popularity scores converted to a 5-star rating system
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Touch Support**: Swipe gestures for mobile navigation
- **Modern UI**: Clean, modern interface with smooth animations

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Docker (optional, for running PostgreSQL)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up the Database

#### Option A: Using Docker (Recommended)

```bash
# Start PostgreSQL using Docker Compose
docker-compose up -d
```

#### Option B: Using Local PostgreSQL

Make sure you have PostgreSQL installed and create a database named `renart-assesment`.

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://assesmentuser:4ss3sm3nt@localhost:5433/renart-assesment"
```

### 4. Set up the Database Schema

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev
```

### 5. Seed the Database with Sample Data

```bash
# Install tsx if not already installed
npm install -g tsx

# Run the seed script
npm run seed
```

### 6. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Application Structure

```
src/
├── app/
│   ├── api/jewelry/route.ts    # API endpoint for jewelry data
│   ├── page.tsx                # Main product display page
│   ├── page.module.css         # Styles for the product page
│   └── layout.tsx              # Root layout
├── lib/
│   └── infrastructure/
│       └── postgresql/
│           ├── adapters/
│           │   └── jewelryManager.ts  # Database operations
│           └── prisma.ts              # Prisma client
└── generated/                  # Generated Prisma client
```

## API Endpoints

- `GET /api/jewelry` - Returns all jewelry products

## Database Schema

The application uses a PostgreSQL database with the following schema:

```sql
CREATE TABLE "Jewelry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" DECIMAL(4,2) NOT NULL,
    "imageUrls" TEXT[],
    "popularityScore" DECIMAL(4,2) NOT NULL,
    CONSTRAINT "Jewelry_pkey" PRIMARY KEY ("id")
);
```

## Features in Detail

### Product Carousel
- Navigate through products using left/right arrow buttons
- Swipe gestures supported on mobile devices
- Smooth transitions between products
- Product counter showing current position

### Color Picker
- Click on color thumbnails to change the main product image
- Visual feedback for selected color
- Responsive design for different screen sizes

### Popularity Score
- Converts raw popularity scores to a 5-star rating system
- Displays with one decimal place precision
- Visual star representation with half-star support

### Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Optimized for different screen sizes
- Dark mode support

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with sample data

### Database Operations

```bash
# Generate Prisma client after schema changes
npx prisma generate

# Run migrations
npx prisma migrate dev

# Open Prisma Studio (database GUI)
npx prisma studio
```

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **CSS Modules** - Styling
- **Docker** - Containerization

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Mobile Support

- iOS Safari
- Android Chrome
- Touch gestures for navigation
- Responsive design for all screen sizes
