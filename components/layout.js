import Head from 'next/head';

export default function Layout({ children, home }) {
  return (
    <div>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='Learn how to build a personal website using Next.js'
        />
        <meta name='og:title' content='LIST BUILDER' />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <main>{children}</main>
    </div>
  );
}
