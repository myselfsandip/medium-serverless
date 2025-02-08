export interface EnvVariables {
    DATABASE_URL : string,
    JWT_SECRET : string,
    [key: string] : unknown
}