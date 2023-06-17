export interface Comment {
    comment: string
    author: string
    date: Date
    rating: number
    geolocation?: {latitude: number, longitude: number}
}