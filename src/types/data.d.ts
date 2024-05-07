interface BadPost {
    id: string,
    type: string,
    title: string,
    content: string,
    mediaUrls: string[],
    authorId: string,
    communityName: string,
    deleted: boolean,
    createdAt: string,
    updatedAt: string,
    score: number,
    vote: [],
    author: {
        avatarUrl: string
    }
}