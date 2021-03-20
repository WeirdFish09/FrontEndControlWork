export interface Library{
    name: string;
    address: string;
    workSchedule: string[];
    books: Map<string,BookInfo>;
}

export interface BookInfo{
    availableItems: number;
    issuedItems: number;
}