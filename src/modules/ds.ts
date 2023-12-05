export interface Resource {
    ID: number,
    ResourceName: string,
    IsAvailable: boolean,
    Place: string,
    Image: string,
    Months: string[],
    MonthlyProds: number[],
}