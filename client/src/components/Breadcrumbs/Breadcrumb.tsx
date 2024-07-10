import Link from "next/link";
interface BreadcrumbProps {
  pageName: string;
  slug?: string;
  children?: React.ReactNode;
}
const Breadcrumb = ({ pageName, slug, children }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            {
              children || 
              (<Link className="font-medium" href="/">
                Dashboard /
              </Link>)
            }
          </li>
          <li className="font-medium text-primary">{slug}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
