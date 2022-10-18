import Head from 'next/head';
import Header from '../components/Header';
import Banner from '../components/Banner';
import ProductFeed from '../components/ProductFeed';

export default function Home({products}) {
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon | 2.0</title>
        <link rel="shortcut icon" href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AAmazon_icon.svg&psig=AOvVaw3F00rkCzJhkfnSeeQvM0cI&ust=1666134206767000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCLikyd6v6PoCFQAAAAAdAAAAABAE" type="image/x-icon" />
      </Head>

      <Header />

      <main className='max-w-screen-2xl mx-auto'>
          <Banner />

          <ProductFeed products={products} />
      </main>

      </div>

  )
}

export async function getServerSideProps(context) {
  const products = await fetch('https://fakestoreapi.com/products')
  .then((res) => res.json())

  return {
    props: {
      products,
    }
  }
}
