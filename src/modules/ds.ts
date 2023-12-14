export interface Resource {
    ID: number,
    ResourceName: string,
    IsAvailable: boolean,
    Place: string,
    Image: string,
    Months: string[],
    MonthlyProds: number[],
}

export interface User {
    UUID: string,
    Username: string,
    Role: number,
    Password: string
}

export interface ExtractionReports {
    ID: number,
    ClientRef?: string,
    Client?: User,
    ModeratorRef?: string,
    Moderator?: User,
    Status: string,
    DateCreated?: string,
    DateProcessed?: string,
    DateFinished?: string,
}