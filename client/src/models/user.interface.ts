export default interface UserInterface {
  userNickName: string;
  userEmail: string;
  password?: string;
  userImg?: string;
  userType: string;
  newPassword?: string;
  confirmNewPassword?: string;
  userRestaurent?: Restaurant[];
}

export interface Restaurant {
  storeId: string;
  imageUrl?: string | undefined;
  foodType: string;
  placeName: string;
  review?: string | undefined;
  address: string;
  visitsCount?: number | undefined;
}
