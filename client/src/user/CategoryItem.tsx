interface CategoryItemProps {
  icon: string;
  title: string;
  count: number;
}

function CategoryItem({ icon, title, count }: CategoryItemProps) {
  return (
    <div className="category-item">
      <div className="category-image">{icon}</div>
      <strong className="category-title">{title}</strong>
      <div className="category-count">{count}</div>
    </div>
  );
}
export default CategoryItem;
