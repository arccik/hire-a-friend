type PropType = {
  show: boolean;
};

export default function ClearFilter({ show }: PropType) {
  if (!show) return null;
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <p className="text-xl font-bold">Nothing found</p>
      <p className="text-center text-gray-600">
        Try to change your filter/search params
      </p>
    </div>
  );
}
