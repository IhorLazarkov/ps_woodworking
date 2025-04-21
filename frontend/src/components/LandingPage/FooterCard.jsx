function FooterCard({title, children}) {
    return (
        <div className="footer-card">
            <h3>{title}</h3>
            <section>{children}</section>
        </div>
    )
}

export default FooterCard