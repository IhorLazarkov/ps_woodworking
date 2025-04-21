import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../redux/products"
import ProductCard from "../ProductCard"
import { Link } from "react-router-dom"
import "./LandingPage.css"
import FooterCard from "./FooterCard"

function LandingPage() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(fetchProducts()).then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        <>
            <div className="landing-title">
                <h1>Welcome to Plane & Simple Woodworking</h1>
            </div>
            <main id="landing-page">
                {!isLoaded
                    ? <h3>Loading ...</h3>
                    : <>
                        {products && products.map(p => {
                            return <Link key={p.id} to={`products/${p.id}`}>
                                < ProductCard product={p} />
                            </Link>
                        })}
                    </>
                }
            </main>
            <footer id="landing-page">
                <FooterCard title="Looking for a good deal?">
                    <div>
                        <p>
                            Discover unbeatable deals,
                            high-quality products, and fast,
                            reliable service—all in one place.
                            Whether you&rsquo;re shopping for essentials, gifts,
                            or something special just for you, we&rsquo;ve got you covered.

                        </p>
                        <ul>
                            <li>✅ Huge Selection</li>
                            <li>✅ Affordable Prices</li>
                            <li>✅ Fast Shipping</li>
                            <li>✅ Top-Notch Customer Support</li>
                        </ul>
                        <div>
                            🛒 Shop Now and Experience the Difference!
                        </div>
                    </div>
                </FooterCard>
                <div className="delimeter"></div>
                <FooterCard title="Shopping Made Effortless!">
                    <div>
                        <p>
                            Found something you love? Just one click and it’s in your cart!
                            No fuss, no hassle—adding products is as easy as browsing.
                        </p>
                        <ul>
                            <li>✨ Tap ➡️ Add to Cart ➡️ Checkout—Done!</li>
                            <li>Start filling your cart with your favorites today!</li>
                        </ul>
                    </div>
                </FooterCard>
                <div className="delimeter"></div>
                <FooterCard title="Ready to checkout?">
                    <div>
                        <p>💳 Fast. Simple. Secure. Checkout in Seconds!
                            No more complicated steps or endless forms.
                            Our streamlined checkout gets you from cart to confirmation in a flash!
                        </p>
                        <ul>
                            <li>🔒 Secure Payments</li>
                            <li>🚀 Lightning-Fast Process</li>
                            <li>📦 Instant Order Confirmation</li>
                            <li>Click, Pay, and You&apos;re on Your Way! 🛍️</li>
                        </ul>
                    </div>
                </FooterCard>
            </footer>
        </>
    )
}

export default LandingPage