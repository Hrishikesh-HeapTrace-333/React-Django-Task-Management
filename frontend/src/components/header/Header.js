import React from 'react'

export default function Header(props) {
    return (
        <nav className="navbar navbar-light bg-light p-3">
    <div className="container-fluid d-flex align-items-center">
    <a className="navbar-brand d-flex align-items-center" href="#">
        <img
            src="https://cdn-icons-png.flaticon.com/512/5956/5956592.png"
            alt="Logo"
            height="40"
            className="me-2"
        />
        <span className="fs-4">Project Manager</span>
    </a>
    <div className="ms-auto text-end">
        <small className="text-muted">
            <i>Hi! {props.name || 'please sign in'}</i>
        </small>
    </div>
    </div>
</nav>

    )
}
