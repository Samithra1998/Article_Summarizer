import {logo} from '../assets'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        <nav className='flex justify-between items-center w-full mb-10 pt-3'>
            <img src={logo} alt='Summerizer Logo' className='w-28 object-contain'/>
            <button
                type='button'
                onClick={() => window.open('https://github.com/Samithra1998')}
                className='black_btn'
            >Github</button>
        </nav>
        <h1 className='head_text'>
            Summerize Articles with <br className='max-md:hidden'/>
            <span className='orange_gradient'>Open GPT-4</span>
        </h1>
        <h2 className='desc'>
            Transform your lengthly articles into clear concise summaries
        </h2>
    </header>
  )
}

export default Hero