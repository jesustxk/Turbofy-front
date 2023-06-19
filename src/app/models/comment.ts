export interface Comment {
    _id: string
    comment: string
    author: string
    date: Date
    rating: number
    geolocation?: {latitude: number, longitude: number}
}