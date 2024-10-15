import React, { useContext, useState } from 'react'
import Auth from '../auth/Auth';
import './Hero.css';
import MyContext from '../context/myContext';
import OrganisationModal from '../organisationModal/OrganisationModal';

export default function Hero() {
    const { setRefresher } = useContext(MyContext);
    const [ showOrganization, setShowOrganization] = useState(false)

    const refresh = () => {
        setRefresher((prevRefresher) => !prevRefresher);
    }
    refresh();
    return (
        <div className="container-fluids p-6">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-lg-6 mb-4 mb-lg-0 d-flex justify-content-center">
                    <img src="hero.png" alt="Hero Image" className="img-fluid"/>
                </div>   
                <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center text-center">
                    <div className="elegantText mb-4">
                        <strong>Elevate...</strong> Your Project Management
                    </div>
                    <div className="authContainer">
                        <Auth setShowOrganization={ setShowOrganization }/>
                    </div>
                </div>
            </div>

            { showOrganization && <OrganisationModal/> }
        </div>
    );
}
