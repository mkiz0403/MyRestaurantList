export default interface UserInterface {
  userNickName: string;
  userEmail: string;
  userType: string;
  newPassword: string;
  confirmNewPassword: string;
  password: string;
  userImg?: string;
  userStore?: UserStore[];
}

export interface UserStore {
  storeId: string;
  placeName: string;
  foodType: string;
  address: string;
  imageUrl?: string;
  review?: string;
  visitedDate?: string;
}
