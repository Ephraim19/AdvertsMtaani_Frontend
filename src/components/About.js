import React from 'react'

const About = (props) => {
  return (
    <section className='App-card'>
        <div className='Card-info' >
            <h3>{props.title}</h3>
            <p>{props.info}</p>
        </div>
    </section>
  )
}

export default About