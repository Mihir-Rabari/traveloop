import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting seeding process...");

  // 1. Clear existing data (Optional but good for clean demo)
  // await prisma.activityTemplate.deleteMany();
  // await prisma.city.deleteMany();
  
  // 2. Create a Demo User
  const hashedPassword = await bcrypt.hash("password123", 10);
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@traveloop.com" },
    update: {},
    create: {
      email: "demo@traveloop.com",
      name: "Alex Traveler",
      password: hashedPassword,
      bio: "Adventure seeker and coffee lover. Currently exploring the world one city at a time.",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
    },
  });
  console.log("✅ Demo user created: demo@traveloop.com / password123");

  // 3. Seed Cities & Activity Templates
  const cities = [
    {
      name: "Paris",
      country: "France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
      description: "The city of light, famous for its culture, art, and romantic atmosphere.",
      lat: 48.8566,
      lng: 2.3522,
      activities: [
        { title: "Eiffel Tower Picnic", category: "Sightseeing", cost: 20, rating: 4.8 },
        { title: "Louvre Museum Tour", category: "Culture", cost: 50, rating: 4.9 },
        { title: "Seine River Cruise", category: "Romance", cost: 35, rating: 4.7 },
        { title: "Montmartre Artist Walk", category: "Culture", cost: 0, rating: 4.6 },
      ],
    },
    {
      name: "Tokyo",
      country: "Japan",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop",
      description: "A neon-lit metropolis blending futuristic technology with ancient traditions.",
      lat: 35.6762,
      lng: 139.6503,
      activities: [
        { title: "Shibuya Crossing", category: "Urban", cost: 0, rating: 4.6 },
        { title: "TeamLab Borderless", category: "Art", cost: 40, rating: 5.0 },
        { title: "Sushi Making Class", category: "Food", cost: 80, rating: 4.8 },
        { title: "Harajuku Street Food", category: "Food", cost: 15, rating: 4.7 },
      ],
    },
    {
      name: "New York City",
      country: "USA",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop",
      description: "The Big Apple, a bustling center of commerce, entertainment, and history.",
      lat: 40.7128,
      lng: -74.0060,
      activities: [
        { title: "Central Park Stroll", category: "Nature", cost: 0, rating: 4.8 },
        { title: "Broadway Show", category: "Entertainment", cost: 150, rating: 4.9 },
        { title: "Empire State Building", category: "Sightseeing", cost: 45, rating: 4.7 },
        { title: "High Line Park Walk", category: "Urban", cost: 0, rating: 4.8 },
      ],
    },
    {
      name: "Rome",
      country: "Italy",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop",
      description: "The Eternal City, filled with ancient ruins and world-class Italian cuisine.",
      lat: 41.9028,
      lng: 12.4964,
      activities: [
        { title: "Colosseum Tour", category: "History", cost: 35, rating: 4.9 },
        { title: "Vatican Museums", category: "Culture", cost: 40, rating: 4.8 },
        { title: "Gelato Tasting", category: "Food", cost: 15, rating: 4.7 },
        { title: "Trastevere Night Walk", category: "Nightlife", cost: 0, rating: 4.9 },
      ],
    },
    {
      name: "Swiss Alps",
      country: "Switzerland",
      image: "https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?q=80&w=800&auto=format&fit=crop",
      description: "Breathtaking mountain peaks, pristine lakes, and world-class skiing.",
      lat: 46.8182,
      lng: 8.2275,
      activities: [
        { title: "Skiing in Zermatt", category: "Adventure", cost: 100, rating: 5.0 },
        { title: "Chocolate Factory Visit", category: "Food", cost: 25, rating: 4.8 },
        { title: "Mountain Hiking", category: "Nature", cost: 0, rating: 4.9 },
        { title: "Glacier Express Ride", category: "Sightseeing", cost: 150, rating: 4.9 },
      ],
    },
    {
      name: "Bali",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
      description: "A tropical paradise known for its volcanic mountains, rice paddies, and beaches.",
      lat: -8.4095,
      lng: 115.1889,
      activities: [
        { title: "Ubud Rice Terrace", category: "Nature", cost: 5, rating: 4.8 },
        { title: "Scuba Diving in Tulamben", category: "Adventure", cost: 80, rating: 4.9 },
        { title: "Yoga Retreat", category: "Wellness", cost: 30, rating: 4.7 },
        { title: "Uluwatu Temple Sunset", category: "Culture", cost: 10, rating: 4.9 },
      ],
    },
  ];

  for (const cityData of cities) {
    const { activities, ...city } = cityData;
    const createdCity = await prisma.city.upsert({
      where: { name: city.name },
      update: city,
      create: city,
    });

    console.log(`📍 Seeded city: ${createdCity.name}`);

    // Create activity templates for this city
    for (const activity of activities) {
      const existingActivity = await prisma.activityTemplate.findFirst({
        where: { 
          title: activity.title, 
          cityId: createdCity.id 
        }
      });

      if (existingActivity) {
        await prisma.activityTemplate.update({
          where: { id: existingActivity.id },
          data: activity,
        });
      } else {
        await prisma.activityTemplate.create({
          data: {
            ...activity,
            cityId: createdCity.id,
          },
        });
      }
    }
  }

  // 4. Create some Demo Trips for the user
  const trips = [
    {
      title: "European Summer Escape",
      description: "A beautiful journey through the heart of Europe.",
      startDate: new Date("2026-07-15"),
      endDate: new Date("2026-07-30"),
      visibility: "PUBLIC",
      coverImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop",
      userId: demoUser.id,
      stops: [
        { location: "Paris, France", order: 1, date: new Date("2026-07-15"), notes: "Stay near the Eiffel Tower" },
        { location: "Rome, Italy", order: 2, date: new Date("2026-07-22"), notes: "Don't miss the Colosseum" },
      ],
    },
    {
      title: "Japan Tech & Tradition",
      description: "Exploring the future in the land of the rising sun.",
      startDate: new Date("2026-11-10"),
      endDate: new Date("2026-11-20"),
      visibility: "PRIVATE",
      coverImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop",
      userId: demoUser.id,
      stops: [
        { location: "Tokyo, Japan", order: 1, date: new Date("2026-11-10"), notes: "Check out Shibuya" },
        { location: "Kyoto, Japan", order: 2, date: new Date("2026-11-15"), notes: "Visit the golden pavilion" },
      ],
    },
  ];

  for (const tripData of trips) {
    const { stops, ...trip } = tripData;
    const createdTrip = await prisma.trip.create({
      data: {
        ...trip,
        stops: {
          create: stops,
        },
      },
    });
    console.log(`✈️ Seeded trip: ${createdTrip.title}`);
  }

  console.log("✨ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
