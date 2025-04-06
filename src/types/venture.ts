// Define our own types since we're not using Prisma
export enum VentureStage {
  IDEA = 'IDEA',
  PROTOTYPE = 'PROTOTYPE',
  MVP = 'MVP',
  GROWTH = 'GROWTH',
  SCALE = 'SCALE'
}

export enum VentureStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  FEATURED = 'FEATURED',
  REJECTED = 'REJECTED'
}

export type User = {
  id: string;
  name: string | null;
  image: string | null;
  email?: string;
};

export type Comment = {
  id: string;
  content: string;
  userId: string;
  ventureId: string;
  createdAt: string;
  updatedAt: string;
  user: Pick<User, 'id' | 'name' | 'image'>;
};

export type Venture = {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string | null;
  logo: string | null;
  website: string | null;
  twitter: string | null;
  linkedin: string | null;
  github: string | null;
  stage: VentureStage;
  status: VentureStatus;
  isAnonymous: boolean;
  isStealthMode: boolean;
  isLookingForCollaborators: boolean;
  sectors: string[];
  technologies: string[];
  teamSize: number;
  foundedDate: string | null;
  createdAt: string;
  updatedAt: string;
};

export type VentureWithRelations = Venture & {
  _count: {
    upvotes: number;
    comments: number;
  };
  founders: Pick<User, 'id' | 'name' | 'image'>[];
  comments?: Comment[];
};

export type VentureListResponse = {
  ventures: VentureWithRelations[];
  pagination: {
    total: number;
    pages: number;
    current: number;
    limit: number;
  };
};

export type CommentWithUser = Comment;

export type CommentListResponse = {
  comments: CommentWithUser[];
  pagination: {
    total: number;
    pages: number;
    current: number;
    limit: number;
  };
};

export type UpvoteResponse = {
  message: string;
  action: 'added' | 'removed';
};