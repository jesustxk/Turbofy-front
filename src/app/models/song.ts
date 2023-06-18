import { Comment } from "./comment"

export interface Song {
    _id: string
    name: string
    artist: string
    album: string
    image: {url: string, base64: string}
    duration: string
    date: Date
    geolocation?: {latitude: number, longitude: number}
    comments?: Comment[]
}