import Head from 'next/head';
import Input from '../components/Input/Input';
import Layout from '../components/Layout/Layout';

export default function Log() {
  return (
    <Layout>
      <Head>
        <title>Log In</title>
      </Head>
      <h1 className="text-yellow-800 text-4xl font-nav text-center mt-16">Log In</h1>
      <div className="flex flex-col items-center">
        <Input type="text" name="username" required style="w-40" />
        <Input type="text" name="password" required style="w-40" />
      </div>
    </Layout>
  );
}
