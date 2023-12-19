export interface Resource {
    ID: number,
    ResourceName: string,
    IsAvailable: boolean,
    Image: string,
    Desc: string
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
    Month?: string,
    Place?: string
}

export interface ManageReports {
    ID: number,
    ReporRef: number,
    ResourceRef: number,
    Plan: number,
    Fact: number
}