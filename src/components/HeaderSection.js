export default function HeaderSection(props) {
    return (
        <nav className="navbar navbar-light justify-content-between">
            <h3>
                <span className="text-success">hepsiburada</span>
                <span>.com</span></h3>
            <span>{props.appName}</span>
        </nav>
    )

}
