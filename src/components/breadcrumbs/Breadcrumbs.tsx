import { Link, useLocation } from "react-router-dom";
import '../../styles/breadcrumbs.style.css';

interface EndpointToLabelMap {
  [key: string]: string;
}

const endpointToLabel: EndpointToLabelMap = {
  'resources':  'Ресурсы',
  'profile':    'Личный кабинет',
  'auth':       'Вход',
  'reports':    'Отчеты по добыче'
};

function Breadcrumbs() {
    const location = useLocation();

    let currentLink = '';

    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map(crumb => {
            currentLink += `/${crumb}`;
            const decodedCrumb = decodeURIComponent(crumb);
            const label = endpointToLabel[crumb] || decodedCrumb;

            return (
                <div className="crumb" key={crumb}>
                    <Link to={currentLink}>{label}</Link>
                </div>
            );
        });

    return (
        <div className="breadcrumbs">
            {crumbs}
        </div>
    );
}

export default Breadcrumbs;