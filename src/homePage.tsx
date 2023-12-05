import { FC, useEffect, useState } from 'react';
import './styles/hp-style.css';
import { Resource } from './modules/ds';
import { getAllResources } from './modules/get_all_resources';
import ResCard from './components/ResCard';
import NavigationMain from './components/NavBar';
import Breadcrumbs from './components/Breadcrumbs';

const HomePage: FC = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        var resName = urlParams.get('title') || '';
        setSearchText(resName);

        const loadResources = async () => {
            try {
                const result = await getAllResources(resName);
                console.log("result:", result)
                let temp = resName === '' ? Object.values(result)[0] : Object.values(result)[1];
                console.log("temp: ", temp)
                setResources(temp as unknown as Resource[]);
                console.log("setResources done  ")
            } catch (error) {
                console.error("Ошибка при загрузке объектов:", error);
            }
        }        

        loadResources();
    }, []);

    const handleStatusChange = (resName: string, newStatus: boolean) => {
        setResources((resources) =>
            resources.map((resource) =>
                resource.ResourceName === resName ? { ...resource, IsAvailable: newStatus } : resource
            )
        );
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = `/resources?title=${searchText}`;
    };

    return (
        <div>
            <NavigationMain/>
            <Breadcrumbs/>
            <div className="container">
                <div className="navigation-grid">
                    <div className="search-box">
                        <form onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                id="resource_search"
                                name="title"
                                placeholder="Введите название"
                                className="search-input"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <input type="submit" className="search-button" value="Поиск"/>
                        </form>
                    </div>
                </div>
                <div className="content">
                    <div className="resources">
                        <div className="resource-grid">
                            {resources.map((resource, index) => (
                                <ResCard
                                    key={index}
                                    imageUrl={resource.Image}
                                    resourceName={resource.ResourceName}
                                    resourceStatus={resource.IsAvailable}
                                    resourceDetailed={`/resources/${resource.ResourceName}`}
                                    changeStatus={`/resources/change_res_status/${resource.ResourceName}`}
                                    onStatusChange={handleStatusChange}
                                />
                            ))}
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
