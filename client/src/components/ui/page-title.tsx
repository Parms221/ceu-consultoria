export default function PageTitle({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <h3 className="text-4xl font-semibold text-black dark:text-white">
      {children}
    </h3>
  );
}
