export type StampingTemplate = {
    id: number
    colour: string
    pairPosition: string
    date: Date
    way: string
    hour: string
    //da creare il tipo
    stampModificationTypes: object[]
    valid: boolean
    showPopover: boolean
}