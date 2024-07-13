export default interface UserInterface {
  userNickName: string;
  userEmail: string;
  userType: string;
  newPassword: string;
  confirmNewPassword: string;
  password: string;
  userImg?: string;
  userRestaurent?: {
    foodType: string;
    placeName: string;
    address: string;
    imageUrl?: string;
    review?: string;
    visitsCount?: number;
  }[];
}
