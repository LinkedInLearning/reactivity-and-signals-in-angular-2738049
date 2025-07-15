export interface Item {
    id: string;
    name: string;               
    price: number;
    imageThumbnail?: string;
    quantity?: number;
    description?: string;
}

export const ITEMS: Item[] = [
    {
        id: 'sci-1',
        name: 'Super Cool Item',
        price: 5.99,
        imageThumbnail: '../assets/thumb-1.jpg',
        description: 'This is something that could be just what you are looking for. It has qualities that are often appreciated. Many people find it interesting for reasons that are not always clear.'
    },
    {
        id: 'aci-1',
        name: 'Another Cool Item',
        price: 11.99,
        imageThumbnail: '../assets/thumb-2.jpg',
        description: 'People often talk about this item in various ways. It stands out for reasons that are sometimes hard to explain. You might notice something unique about it.'
    },
    {
        id: 'yaci-1',
        name: 'Yet Another Cool Item',
        price: 18.99,
        imageThumbnail: '../assets/thumb-3.jpg',
        description: 'There is something about this item that draws attention. It has features that are not always obvious at first glance. Many consider it to be quite remarkable in its own way.'
    }
];
