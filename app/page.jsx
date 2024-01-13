import Feed from "@components/Feed";

function Home() {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md-hidden' />
        <span className='orange_gradient text-center'>Ai-powered promts</span>
      </h1>
      <p className='desc text-center'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus
        molestiae exercitationem est similique minima nisi illo odio quis
        ratione voluptates, facere ad, expedita animi totam soluta ex, hic neque
        blanditiis.
      </p>

      <Feed />
    </section>
  );
}

export default Home;
