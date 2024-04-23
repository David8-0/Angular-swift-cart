export interface Product {
    _id:string,
    name:string,
    category:string,
    rating:number,
    price:number,
    priceDiscount:number,
    description:string,
    imgCover:string,
    imageCover:string,
    images:string[],
    productSales:number,
    productQuantity:number,
    creationDate:Date;
    isfavorite:boolean,
    inCart:boolean
}
