import { User, Venture as PrismaVenture, VentureStage, VentureStatus, Upvote, Comment } from '@prisma/client';

export type VentureWithRelations = PrismaVenture & {
  _count: {
    upvotes: number;
    comments: number;
  };
  founders: Pick<User, 'id' | 'name' | 'image'>[];
  comments?: (Comment & {
    user: Pick<User, 'id' | 'name' | 'image'>;
  })[];
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

export type CommentWithUser = Comment & {
  user: Pick<User, 'id' | 'name' | 'image'>;
};

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

export { VentureStage, VentureStatus };