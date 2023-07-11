import React from 'react'
import Layout from '../components/Layouts/Layout'

const About = () => {
  return (
    <Layout title={'About Us - Ecommerce App'}>
      <div className="container about">
        <div className="row">
          <div className="col-md-6 about-img">
            <img src="/images/about.jpg" alt="About" />
          </div>
          <div className="col-md-5 about-info">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, hic veniam! Aut dolores adipisci dolore, ipsam ducimus laboriosam reiciendis voluptatem culpa ipsum debitis perspiciatis ratione itaque sit asperiores consequatur natus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat architecto eligendi quo tenetur placeat facilis vitae, officiis quod soluta, repellendus nesciunt mollitia quibusdam magnam optio obcaecati perferendis voluptatibus porro dicta. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti harum facilis ducimus dolores architecto, distinctio quas, consequatur vitae velit, dicta consequuntur blanditiis? Placeat, praesentium assumenda quia odit molestiae maxime minima!
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About
