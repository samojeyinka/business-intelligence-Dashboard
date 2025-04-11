// lib/firestore-utils.ts
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/firebase-config';

export interface FirestoreBlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    profileUrl?: string;
    email?: string;
  };
  createdAt: any;
  updatedAt: any;
  tags: string[];
  categories: string[];
  status?: string;
  verified?: boolean;
}

export const fetchBlogPosts = async (): Promise<FirestoreBlogPost[]> => {
  const q = query(collection(db, "submitted-articles"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage ? `${window.location.origin}${data.coverImage}` : '',
      author: {
        name: data.author.name,
        avatar: data.author.avatar ? `${window.location.origin}${data.author.avatar}` : '',
        role: data.author.role,
        profileUrl: data.author.profileUrl,
        email: data.author.email
      },
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      categories: data.categories || [],
      tags: data.tags || [],
      status: data.status,
      verified: data.verified
    };
  });
};