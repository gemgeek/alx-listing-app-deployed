export interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  imageUrl: string;
  rating: number;
}

export interface Review {
  id: string;
  propertyId: string;
  user: string;
  rating: number;
  comment: string;
}