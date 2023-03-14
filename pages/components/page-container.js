import Head from "next/head";

export default function PageContainer({ title, description, children }) {
  return (
    <div>
      <Head>
        <title>{title || "Quantum  E-commerce - Next Project"}</title>
        {description !== false && (
          <meta
            name="description"
            content={
              description ||
              "Quantum E-commerce made with Next.js open-source project."
            }
          />
        )}
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        {/* google font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,300&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link rel="icon" href="/favicon.ico" />
        {/* font awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
          integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/flowbite.min.css"
          rel="stylesheet"
        />
      </Head>

      <main>{children}</main>
    </div>
  );
}
