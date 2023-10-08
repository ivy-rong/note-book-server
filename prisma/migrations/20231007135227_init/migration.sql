-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "note_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMPTZ(3),
    "updated_by" INTEGER,
    "deleted_at" TIMESTAMPTZ(3),
    "deleted_by" INTEGER,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
