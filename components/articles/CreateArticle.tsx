"use client";

import React, {
  FormEvent,
  startTransition,
  useActionState,
  useState,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { createArticle } from "@/actions/CreateArticle";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const CreateArticle = () => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [formState, action, isPending] = useActionState(createArticle, {
    errors: {},
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("content", content);

    console.log(formData);

    // Wrap the action call in startTransition
    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create New Article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="title">Article Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter article title"
              />
              {formState.errors.title && (
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.title}
                </span>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select Category</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="web-development">Web Development</option>
              </select>
              {formState.errors.category && (
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.category}
                </span>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="featuredImage">Featured Image</Label>
              <Input
                id="featuredImage"
                name="featuredImage"
                type="file"
                accept="image/*"
              />
              {formState.errors.featuredImage && (
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.featuredImage}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <ReactQuill value={content} onChange={setContent} theme="snow" />
              {formState.errors.content && (
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.content[0]}
                </span>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <Button
                onClick={() => router.replace("/dashboard")}
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
              <Button disabled={isPending} type="submit">
                {isPending ? "Loading..." : "Publish Article"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateArticle;
