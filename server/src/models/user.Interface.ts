export default interface UserInterface {
  userNickName: string;
  userEmail: string;
  userType: string;
  newPassword: string;
  confirmNewPassword: string;
  password: string;
  userImg?: string;
  userStore?: UserStroe[];
}

export interface UserStroe {
  storeId: string;
  placeName: string;
  foodType: string;
  address: string;
  imageUrl?: string;
  review?: string;
  visitsCount?: number;
}
