import { useLocation } from "react-router-dom";
import Header from "./Header"


function ErrorPage() {
    const location = useLocation();
    console.error("Error in route:", location.pathname);

    const imageUrl = "https://th.bing.com/th/id/R.1af8dc8c38f1e0bcc4eba40baa3f1a52?rik=82eKzQDs22MEcg&riu=http%3a%2f%2fwww.taher.com%2fwp-content%2fuploads%2f2015%2f01%2fwhy-are-you-hungry.jpg&ehk=vnl4e9WVxVPOSXjqE7AT66MT0RcoR5TEvL62zuAQbwU%3d&risl=&pid=ImgRaw&r=0";
    

    return (
        <div className= "errorPage" style={{ backgroundColor: 'red'}}>
            <Header />
            <section style={{ textAlign: 'center' }}>
                <h1>You selected something that wasn't available!</h1>
                <img src={imageUrl} alt = "hungry" style={{ display: 'block', margin: '0 auto'}} />
                <br />
                <br />
            </section>
        </div>
    );
};

export default ErrorPage;