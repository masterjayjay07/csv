export interface ICsvCreate {
    name: string,
    city: string,
    country: string,
    favorite_sport: string
}
export interface IUserSearch {
    q: string | string[] | undefined
}