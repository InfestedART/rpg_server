/*
  Warnings:

  - You are about to alter the column `equipment` on the `Character` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.
  - You are about to alter the column `inventory` on the `Character` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "equipment" JSONB NOT NULL DEFAULT [],
    "gold" INTEGER NOT NULL DEFAULT 0,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "inventory" JSONB NOT NULL DEFAULT [],
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_Character" ("class", "createdAt", "equipment", "gold", "id", "inventory", "name", "xp") SELECT "class", "createdAt", "equipment", "gold", "id", "inventory", "name", "xp" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
