import './CategoryList.css';
import CategoryItem from './CategoryItem';
import { Restaurant } from '../models/user.interface';

interface CategoryListProps {
  places: Restaurant[];
}

const categories = [
  { icon: '🍲', title: '한식', count: 0 },
  { icon: '🍕', title: '양식', count: 0 },
  { icon: '🍣', title: '일식', count: 0 },
  { icon: '🥟', title: '중식', count: 0 },
  { icon: '🍽️', title: '기타', count: 0 },
];

function CategoryList({ places }: CategoryListProps) {
  const updatedCategories = categories.map((category) => {
    const count = places.filter((place) => place.foodType === category.title).length;
    return { ...category, count };
  });

  return (
    <div className="category-list">
      {updatedCategories.map((item, idx) => (
        <CategoryItem key={idx} icon={item.icon} title={item.title} count={item.count} />
      ))}
    </div>
  );
}
export default CategoryList;
