import Layout from '../components/Layouts/Layout'
import { useAuth } from '../context/Auth'

const HomePage = () => {
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth()
  return (
    <Layout title={'Best Offers'}>
      <h1>Home Page</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  )
}

export default HomePage
