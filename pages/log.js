import Head from 'next/head';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import Input from '../components/Input/Input';
import Layout from '../components/Layout/Layout';
import Link from 'next/link';

export default function Log() {
  const loginForm = useRef();
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    const form = new FormData(loginForm.current);
    const { ok } = await signIn('credentials', {
      redirect: false,
      email: form.get('email'),
      password: form.get('password')
    });

    setIsSubmit(false);
    if (ok) {
      router.push('/');
    } else {
      window.alert('Wrong email or password. Try again.');
    }
  };
  return (
    <Layout>
      <Head>
        <title>Log In</title>
      </Head>
      <h1 className="text-yellow-800 text-4xl font-nav text-center mt-16">Log In</h1>
      <form
        className="flex flex-col items-center mt-4 font-serif text-yellow-500"
        ref={loginForm}
        onSubmit={handleSubmit}>
        <Input type="text" name="email" required />
        <Input type="password" name="password" required />
        <input
          type="submit"
          value={isSubmit ? '...Please wait' : 'Log in'}
          className="m-10 p-4 rounded bg-yellow-600 text-gray-200 hover:bg-yellow-700"
        />
        <Link href="/register" key="Register">
          <a className="text-yellow-800 p-4 text-l font-serif hover:text-yellow-500">
            You don't have an account? Register for free
          </a>
        </Link>
      </form>
    </Layout>
  );
}
