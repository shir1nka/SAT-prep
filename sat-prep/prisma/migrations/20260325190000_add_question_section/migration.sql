ALTER TABLE "Question"
ADD COLUMN "section" TEXT;

CREATE INDEX "Question_section_idx" ON "Question"("section");
