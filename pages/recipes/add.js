import Head from 'next/head';
import Form from '../../components/Form/Form';
import Layout from '../../components/Layout/Layout';

export default function AddRecipe() {
  return (
    <Layout>
      <Head>
        <title>Add Recipe</title>
      </Head>
      <h1 className="text-yellow-800 text-4xl font-nav text-center mt-16">
        Add new recipe to library
      </h1>
      <Form />
    </Layout>
  );
}
