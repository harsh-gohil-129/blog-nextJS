import EditArticle from "@/components/articles/EditArticle";
import { prisma } from "@/lib/prisma";
import React from "react";

type EditArticlesParams = {
  params: Promise<{ id: string }>;
};

const page: React.FC<EditArticlesParams> = async ({ params }) => {
  const id = (await params).id;
  const article = await prisma.article.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });
  if (!article) {
    return <h1>Article not found.</h1>;
  }

  return (
    <div>
      <EditArticle article={article} />
    </div>
  );
};

export default page;
