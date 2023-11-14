-- CreateTable
CREATE TABLE "ImageKit" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "ImageKit_pkey" PRIMARY KEY ("id")
);
