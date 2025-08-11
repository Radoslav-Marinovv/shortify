import GoToButton from "../Buttons/GoToButton/GoToButton";

const Hero = () => {

  return (
    <>
      <h1>Shortify</h1>
      <p>Your link is too long? Shortify it!</p>
      <GoToButton location="/create-new-link" displayName="Try it now" />
    </>
  )
}

export default Hero