export interface Product {
    _id:string,
    name:string,
    rating:number,
    price:number,
    priceDiscount:number,
    description:string,
    imgCover:string,
    images:string[],
    productSales:number,
    productQuantity:number,
    creationDate:Date;
    isfavorite:boolean,
    inCart:boolean
    category:Category,
    brand:string,
    amount:number,
    actualPrice:number,
}

enum Category {
    Electronics,
    Food,
    Jewelry,
    Games,
    Fashion,
    Sports,
    other
  }