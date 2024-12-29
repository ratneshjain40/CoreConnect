import { prisma } from '@/db/prisma';
import { Blog, Event, User } from '@prisma/client';

type UserSpecificFields = Pick<User, 'name' | 'email' | 'role' | 'emailVerified'>;
async function getAllUsersForAdminTable(): Promise<UserSpecificFields[]> {
  return await prisma.user.findMany({
    select: {
      name: true,
      email: true,
      role: true,
      emailVerified: true,
    },
  });
}

type BlogSpecificFields = Pick<Blog, 'title' | 'slug' | 'categories' | 'isPaid'>;
async function getAllBlogsForAdminTable(): Promise<BlogSpecificFields[]> {
  return await prisma.blog.findMany({
    select: {
      title: true,
      slug: true,
      categories: true,
      isPaid: true,
    },
  });
}

type EventSpecificFields = Pick<Event, 'title' | 'slug' | 'location' | 'date' | 'price' | 'status'>;
async function getAllEventsForAdminTable(): Promise<EventSpecificFields[]> {
  return await prisma.event.findMany({
    select: {
      title: true,
      slug: true,
      location: true,
      date: true,
      price: true,
      status: true,
    },
  });
}

export const adminRepo = {
  getAllUsersForAdminTable,
  getAllBlogsForAdminTable,
  getAllEventsForAdminTable,
};
