# Renart Full Stack Development Internship/Case Study

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Introduction

This repository contains my solution for the Renart Full Stack Development Internship/Case Study. Although my main interest is backend development with Java Spring Boot, I built this app using Next.js and Prisma for rapid, full-stack development. The project implements all features required by the case study instructions.

---

## Features
- Product listing with carousel pagination
- Filtering by price and popularity
- Responsive UI
- PostgreSQL database with Prisma ORM
- Gold price integration via GoldAPI.io
- Dockerized setup for easy local development

---

## Project Structure

![Project Scheme](./public/scheme.png)

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create a `.env` file** in the root directory with the following fields:
   ```env
   DATABASE_URL=
   GOLD_API_BASE_URL=https://www.goldapi.io/api
   GOLD_API_ACCESS_TOKEN=
   ```
   > **Note:** You can get your GoldAPI token from [goldapi.io](https://www.goldapi.io/).

3. **Start Docker Compose:**
   ```bash
   docker compose up
   ```

4. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

5. **(Optional) Seed sample data:**
   ```bash
   npx tsx scripts/seed.ts
   ```

6. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## View

### Main Page

![Main Page Preview](./public/withoutfilter.png)

> The main page displays products in a carousel. Use the left and right arrows to navigate through packages of 5 products.

### Filtering

![Filtered View Preview](./public/withfilter.png)

> This view shows the product list after applying filters.

---

### Deployment

The deployed version of project can be found in this address : http://3.78.115.57:3000/

I deployed the project to the AWS EC2 instance. The database also runs in the same server.

## Contact

If you have any questions, you can contact me through muratevcilf@gmail.com.