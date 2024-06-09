interface BadPost {
  id: string;
  type: string;
  title: string;
  content: string;
  mediaUrls: string[];
  score: number;
  voteState: boolean | null;
  commentCount: number;
  author: {
    id: string;
    username: string;
    avatarUrl: string;
  };
  community: {
    name: string;
    logoUrl: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface BadCommunity {
  community: {
    id: string;
    name: string;
    ownerId: string;
    description: string;
    logoUrl: string;
    bannerUrl: string;
    status: string;
    memberCount: number;
    deleted: boolean;
    createdAt: string;
    updateAt: string;
  };
  joinStatus: string;
}

interface SortBadCommunity {
  id: string;
  name: string;
  ownerId: string;
  description: string;
  logoUrl: string;
  bannerUrl: string;
  status: string;
  memberCount: number;
  deleted: boolean;
  createdAt: string;
  updateAt: string;
}

interface CommentProps {
  id: string;
  content: string;
  authorId: string;
  parentId: string | null;
  postId: string;
  deleted: boolean;
  updatedAt: string;
  createdAt: string;
  score: number;
  children: any[];
  voteState: string | null;
  author: {
    avatarUrl: string;
    username: string;
  };
}
