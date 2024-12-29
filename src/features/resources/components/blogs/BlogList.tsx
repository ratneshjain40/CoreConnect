import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { BlogFormType } from '../../../blog/schema/blog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type BlogListProps = {
  blogs: BlogFormType[];
};

export const BlogList = ({ blogs }: BlogListProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <Card key={blog.slug} className="flex flex-col overflow-hidden">
          <div className="relative w-full pt-[56.25%]">
            <Image src={blog.coverImage ? blog.coverImage : ''} alt={blog.title} fill className="object-cover" />
          </div>

          <CardHeader>
            <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="mb-2 flex flex-wrap gap-2">
              {blog.categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              Created: {blog.createdAt ? new Date(blog.createdAt).toDateString() : 'N/A'}
            </p>
            <p className="text-sm text-muted-foreground">
              Updated: {blog.createdAt ? new Date(blog.createdAt).toDateString() : 'N/A'}
            </p>
          </CardContent>

          <CardFooter className="mt-auto">
            <Link href={`/blogs/${blog.slug}`} className="text-primary hover:underline">
              Read more
            </Link>
            <Badge variant={blog.isPaid ? 'destructive' : 'default'} className="ml-auto">
              {blog.isPaid ? 'Paid' : 'Free'}
            </Badge>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
