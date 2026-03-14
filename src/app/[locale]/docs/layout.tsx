import { getAllDocs } from "@/lib/docs";
import { DocsSidebar } from "@/components/docs/Sidebar";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function DocsLayout({ children, params }: Props) {
  const { locale } = await params;
  const docs = getAllDocs(locale);

  return (
    <div className="pt-20">
      <div className="mx-auto flex max-w-7xl">
        <DocsSidebar docs={docs} />
        <div className="flex-1 min-w-0 px-6 py-8 lg:px-12">
          {children}
        </div>
      </div>
    </div>
  );
}
