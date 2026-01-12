import Header from "./header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-bg text-text-primary">
      <Header />
      <main>{children}</main>
    </div>
  );
}
