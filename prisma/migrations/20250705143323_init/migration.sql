-- CreateTable
CREATE TABLE "Jewelry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" DECIMAL(4,2) NOT NULL,
    "imageUrls" TEXT[],
    "popularityScore" DECIMAL(4,2) NOT NULL,

    CONSTRAINT "Jewelry_pkey" PRIMARY KEY ("id")
);
