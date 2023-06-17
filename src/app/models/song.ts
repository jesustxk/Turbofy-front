import { Comment } from "./comment"

export interface Song {
    _id: string
    name: string
    artist: string
    image: {url: string, imageBase64String: string}
    genre: string
    duration: number
    date: Date
    geolocation?: {latitude: number, longitude: number}
    comments?: Comment[]
}