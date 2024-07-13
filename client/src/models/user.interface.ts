export default interface UserInterface {
  userNickName: string;
  userEmail: string;
  password?: string;
  userImg?: string;
  userType: string;
  newPassword?: string;
  confirmNewPassword?: string;
  userRestaurent?: {
    imageUrl?: string;
    foodType: string;
    placeName: string;
    review?: string;
    address: string;
    visitsCount?: number;
  }[];
}
