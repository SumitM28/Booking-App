import './MailList.css'

const MailList = () => {
  return (
    <div className='ml'>
        <h1 className="mlTitle">Save time,save money!</h1>
        <h2 className="mlSubtitle">Sign up and we'll send the best deals to you</h2>
        <div className="mlInputContainer">
           

            <input type="email" className="mlInput" /><button className="mpbutton">Subscribe</button>

            <div><input type="checkbox" className="mlCheckbox" /> Send me a link to get the Free Sumitbooking.com App!</div>
        </div>
    </div>
  )
}

export default MailList