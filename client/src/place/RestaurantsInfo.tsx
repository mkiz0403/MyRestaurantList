import './Restaurantsinfo.css';

interface Restaurant {
  imageUrl: string;
  foodType: string;
  placeName: string;
  review: string;
  address: string;
  visitsCount: number;
}

interface RestaurantsInfoProps {
  places: Restaurant[];
  onSelectAddress: (address: string) => void;
}

function RestaurantsInfo({ places, onSelectAddress }: RestaurantsInfoProps) {
  return (
    <div>
      {places.map((restaurant, idx) => (
        <div key={idx} className="restaurant-item">
          <img src={restaurant.imageUrl} alt={restaurant.placeName} className="restaurant-image" />
          <div className="restaurant-info">
            <h2>{restaurant.placeName}</h2>
            <p>
              <strong> 음식 종류 :</strong> {restaurant.foodType}
            </p>
            <p>
              <strong> 리 뷰 :</strong> {restaurant.review}
            </p>
            <p>
              <strong> 주 소 :</strong>
              <span onClick={() => onSelectAddress(restaurant.address)}>{restaurant.address}</span>
            </p>
            <p>
              <strong> 방문 횟수 :</strong> {restaurant.visitsCount}회
            </p>
          </div>
        </div>
      ))}
      <div></div>
    </div>
  );
}
export default RestaurantsInfo;
