import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../redux/products"
import ProductCard from "../ProductCard"
import { NavLink } from "react-router-dom"
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
                        {products && products.filter(p => p.quantity > 0).map(p => {
                            return <NavLink
                                key={p.id}
                                to={`product/${p.id}`}
                                style={{ textDecoration: 'none' }}
                            >
                                < ProductCard product={p} />
                            </NavLink>
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

                    </div>
                </FooterCard>
                <FooterCard title="Shopping Made Effortless!">
                    <div>
                        <p>
                            Found something you love? Just one click and it’s in your cart!
                            No fuss, no hassle—adding products is as easy as browsing.
                        </p>
                    </div>
                </FooterCard>
                <FooterCard title="Ready to checkout?">
                    <div>
                        <p>💳 Fast. Simple. Secure. Checkout in Seconds!
                            No more complicated steps or endless forms.
                            Our streamlined checkout gets you from cart to confirmation in a flash!
                        </p>

                    </div>
                </FooterCard>
            </footer>
        </>
    )
}

export default LandingPage