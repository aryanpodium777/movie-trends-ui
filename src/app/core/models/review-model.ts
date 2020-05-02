export interface Review {
    id: number;
    title: string;
    remark: string
    rating: number
    movie_info_id?: number
    reviewer_id?: number
}
