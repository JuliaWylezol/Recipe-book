import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Toast from '../components/Toast/Toast';
import Input from '../components/Input/Input';
import Layout from '../components/Layout/Layout';

export default function Register() {
  const registerForm = useRef();
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isToastActive, setIsToastActive] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    const form = new FormData(registerForm.current);
    const payload = {
      email: form.get('email'),
      fullName: form.get('full name'),
      password: form.get('password')
    };

    if (payload.password !== form.get('repeat password')) {
      setIsSubmit(false);
      window.alert('Given passwords do not match');
      return;
    }

    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setIsToastActive(true);
      setIsSubmit(false);
      setTimeout(() => {
        setIsToastActive(false);
        router.push('/');
      }, 2000);
    } else {
      setIsSubmit(false);
      const payload = await response.json();
      window.alert(payload.error);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <h1 className="font-nav text-yellow-700 text-4xl text-center mt-10">Register</h1>
      <form
        className="flex flex-col items-center mt-4 font-serif text-yellow-500"
        ref={registerForm}
        onSubmit={handleSubmit}>
        <Input type="text" name="email" required />
        <Input type="text" name="full name" required />
        <Input type="password" name="password" required />
        <Input type="password" name="repeat password" required />
        <input
          type="submit"
          value={isSubmit ? '...Adding new user' : 'Register'}
          className="m-10 p-4 rounded bg-yellow-600 text-gray-200 hover:bg-yellow-700"
        />
        {isToastActive && <Toast type="register" />}
      </form>
    </Layout>
  );
}
