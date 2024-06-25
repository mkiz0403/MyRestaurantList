import './CategoryList.css';
import CategoryItem from './CategoryItem';

const categories = [
  { icon: '🍲', title: '한식', count: 0 },
  { icon: '🍕', title: '양식', count: 0 },
  { icon: '🍣', title: '일식', count: 0 },
  { icon: '🥟', title: '중식', count: 0 },
  { icon: '🍽️', title: '기타', count: 0 },
];

function CategoryList() {
  return (
    <div className="category-list">
      {categories.map((item, idx) => (
        <CategoryItem key={idx} icon={item.icon} title={item.title} count={item.count} />
      ))}
    </div>
  );
}
export default CategoryList;
