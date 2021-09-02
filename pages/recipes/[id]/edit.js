import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../../components/Layout/Layout';
import Form from '../../../components/Form/Form';

export const getServerSideProps = async () => {};

export default function RecipeEdit({ recipe }) {
  const recipeForm = useRef();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(recipeForm.current);
    const payload = {
      name: form.get('name'),
      photo: [{ url: form.get('url') }],
      category: form.get('category'),
      price: form.get('price'),
      difficulty: form.get('difficulty'),
      ingredients: form.get('ingredients'),
      preparation: form.get('preparation')
    };
  };

  return (
    <Layout>
      <Head>
        <title>Edit Recipe</title>
      </Head>
      <h1 className="text-yellow-800 text-4xl font-nav text-center mt-16">Edit your recipe</h1>
    </Layout>
  );
}
