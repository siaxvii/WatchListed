/*
  Warnings:

  - You are about to drop the `Show` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Show";

-- CreateTable
CREATE TABLE "show" (
    "id" INT4 NOT NULL,
    "name" STRING NOT NULL,
    "overview" STRING NOT NULL,
    "genres" STRING[],
    "numseason" INT4 NOT NULL,
    "numepisodes" INT4 NOT NULL,
    "firstaired" TIMESTAMP(3) NOT NULL,
    "lastaired" TIMESTAMP(3) NOT NULL,
    "networks" STRING[],
    "rating" FLOAT8 NOT NULL,
    "languages" STRING[],
    "backgroundpath" STRING NOT NULL,

    CONSTRAINT "show_pkey" PRIMARY KEY ("id")
);
