export default function Tag({ tagName }) {
  return (
    <span className=" h-8 mr-2 my-0.5 inline-flex items-center bg-white rounded-full border border-gray-300 px-3 py-0.5 text-sm">
      <div className="absolute flex-shrink-0 flex items-center justify-center">
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" aria-hidden="true"></span>
      </div>
      <div className="ml-3.5 font-medium text-gray-900">{tagName}</div>
    </span>
  );
}
