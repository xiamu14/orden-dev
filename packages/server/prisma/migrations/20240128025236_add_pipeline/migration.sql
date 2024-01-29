/*
  Warnings:

  - Added the required column `pipelinegroupId` to the `Pipeline` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pipeline" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pipelinegroupId" INTEGER NOT NULL,
    CONSTRAINT "Pipeline_pipelinegroupId_fkey" FOREIGN KEY ("pipelinegroupId") REFERENCES "PipelineGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pipeline" ("id") SELECT "id" FROM "Pipeline";
DROP TABLE "Pipeline";
ALTER TABLE "new_Pipeline" RENAME TO "Pipeline";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
