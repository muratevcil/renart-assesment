import { JewelryManager } from '../src/lib/infrastructure/postgresql/adapters/jewelryManager';
import { prisma } from '../src/lib/infrastructure/postgresql/prisma';

async function main() {
  console.log('Starting database seeding...');
  
  try {
    const jewelryService = JewelryManager.getInstance();
    
    // Clear existing data
    await prisma.jewelry.deleteMany();
    
    // Sample jewelry data
    const sampleJewelries = [
      {
        "name": "Engagement Ring 1",
        "popularityScore": 0.85,
        "weight": 2.1,
        "imageUrls": [
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG085-100P-Y.jpg?v=1696588368",
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG085-100P-R.jpg?v=1696588406",
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG085-100P-W.jpg?v=1696588402"
        ]
      },
      {
        "name": "Engagement Ring 2",
        "popularityScore": 0.51,
        "weight": 3.4,
        "imageUrls": [
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG012-Y.jpg?v=1707727068",
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG012-R.jpg?v=1707727068",
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG012-W.jpg?v=1707727068"
        ]
      },
      {
        "name": "Engagement Ring 3",
        "popularityScore": 0.92,
        "weight": 3.8,
        "imageUrls": [
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG020-100P-Y.jpg?v=1683534032",
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG020-100P-R.jpg?v=1683534032",
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG020-100P-W.jpg?v=1683534032"
        ]
      },
      {
        "name": "Engagement Ring 4",
        "popularityScore": 0.88,
        "weight": 4.5,
        "imageUrls": [
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG022-100P-Y.jpg?v=1683532153",
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG022-100P-R.jpg?v=1683532153",
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG022-100P-W.jpg?v=1683532153"
        ]
      },
      {
        "name": "Engagement Ring 5",
        "popularityScore": 0.80,
        "weight": 2.5,
        "imageUrls": [
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG074-100P-Y.jpg?v=1696232035",
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG074-100P-R.jpg?v=1696927124",
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG074-100P-W.jpg?v=1696927124"
        ]
      },
      {
        "name": "Engagement Ring 6",
        "popularityScore": 0.82,
        "weight": 1.8,
        "imageUrls": [
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG075-100P-Y.jpg?v=1696591786",
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG075-100P-R.jpg?v=1696591802",
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG075-100P-W.jpg?v=1696591798"
        ]
      },
      {
        "name": "Engagement Ring 7",
        "popularityScore": 0.70,
        "weight": 5.2,
        "imageUrls": [
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG094-100P-Y.jpg?v=1696589183",
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG094-100P-R.jpg?v=1696589214",
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG094-100P-W.jpg?v=1696589210"
        ]
      },
      {
        "name": "Engagement Ring 8",
        "popularityScore": 0.90,
        "weight": 3.7,
        "imageUrls": [
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG115-100P-Y.jpg?v=1696596076",
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG115-100P-R.jpg?v=1696596151",
          "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG115-100P-W.jpg?v=1696596147"
        ]
      }
    ];

    // Insert sample data using the service
    for (const jewelry of sampleJewelries) {
      await jewelryService.createJewelry(jewelry);
    }
    
    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
}

main(); 