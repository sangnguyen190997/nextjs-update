import PageContainer from "../page-container";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";

export default function DefaultLayout({ title, description, children }) {
  return (
    <PageContainer title={title} description={description}>
      <Navbar />
      <div className="content">{children}</div>
      <Footer />
    </PageContainer>
  );
}
