interface MovieReviewResponse {
    id: number;
    author: string;
    author_details: {
        name: string;
        username: string;
        avatar_path: string | null;
        rating: number;
    };
    content: string;
    created_at: string;
    updated_at: string;
    url: string;
}

export default MovieReviewResponse;
