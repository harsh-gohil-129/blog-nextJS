-- DropForeignKey
ALTER TABLE "public"."Article" DROP CONSTRAINT "Article_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_articleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Like" DROP CONSTRAINT "Like_articleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Like" DROP CONSTRAINT "Like_userId_fkey";

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
