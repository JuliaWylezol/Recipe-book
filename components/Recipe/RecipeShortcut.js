import Link from 'next/link';
import Tag from '../../components/Tag/Tag';

export default function RecipeShortcut({ name, photo, category, difficulty, price, id }) {
  return (
    <Link href={`/recipes/${id}`}>
      <div className="flex flex-col cursor-pointer rounded-xl h-auto m-8 shadow md:w-80 bg-white p-2 text-center hover:bg-yellow-200 items-center">
        <h2 className="text-xl text-yellow-800">{name}</h2>
        <img alt="meal" src={photo} className="w-40 h-40 mt-4 mb-2" />
        <div className="flex flex-row">
          <Tag tagName={category} />
          <Tag tagName={difficulty} />
          <Tag tagName={price} />
        </div>
      </div>
    </Link>
  );
}
