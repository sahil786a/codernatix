import NotFoundContent from "@/components/common/NotFoundContent";

export const metadata = {
  title: "Page Not Found | Codernatix",
  description: "The page you are looking for does not exist or has been moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundContent />;
}