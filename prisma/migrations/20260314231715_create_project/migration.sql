-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "start_date" DATETIME NOT NULL,
    "finish_date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectToWorker" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProjectToWorker_A_fkey" FOREIGN KEY ("A") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProjectToWorker_B_fkey" FOREIGN KEY ("B") REFERENCES "Worker" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToWorker_AB_unique" ON "_ProjectToWorker"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToWorker_B_index" ON "_ProjectToWorker"("B");
