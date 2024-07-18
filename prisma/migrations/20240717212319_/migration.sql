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
    "votecount" INT4 NOT NULL,
    "rating" FLOAT8 NOT NULL,
    "languages" STRING[],
    "popularity" FLOAT8 NOT NULL,
    "backgroundpath" STRING NOT NULL,
    "weightedrating" FLOAT8 NOT NULL,
    "watchlistedrating" FLOAT8 NOT NULL,

    CONSTRAINT "show_pkey" PRIMARY KEY ("id")
);
