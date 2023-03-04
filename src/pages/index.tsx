import Head from 'next/head'
import Layout from '@/layouts/HeaderLayout'

export default function Page() {
  return (
    <>
      <Head >
        <title>Jesus Calamani</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 text-center items-center'>
          <div>
          <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-normal  md:text-6xl md:tracking-tight">
      Hello, my name is <span className="block w-full text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 lg:inline">Jesus Calamani</span>
    </h1>
            <p className="text-3xl">I am a Creative Developer who is currently based in Portland, Oregon.</p>
          </div>
          <img src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png' alt='pikachu' />
        </div>
      </section>
      {/* <main className={styles.main}>
        
      </main> */}
    </>
  )
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}