import { FC, useEffect, useState } from 'react';
import '../styles/hp-style.css';
import { Resource } from '../modules/ds';
import { getAllResources } from '../modules/get_all_resources';
import ResCard from '../components/resourceCard/ResCard';
import SearchForm from '../components/searchForm/searchForm';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import store, { useAppDispatch } from '../store/store';
import cartSlice from '../store/cartSlice';

const HomePage: FC = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const dispatch = useAppDispatch()

    const { added } = useSelector((state: ReturnType<typeof store.getState>) => state.cart)

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        var resName = urlParams.get('title') || '';
        setSearchText(resName);

        const loadResources = async () => {
            try {
                const result = await getAllResources(resName);
                console.log(result)
                setResources(result);
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
        setResources((resources) => resources.filter((resource) => resource.ResourceName !== resName));
      };

    const handleModalClose= () => {
        dispatch(cartSlice.actions.disableAdded())
    };

    return (
        <div>
            <Modal show = {added} onHide={handleModalClose}>
                <Modal.Header closeButton>
                <Modal.Title>Добавлен ресурс в отчет по добыче</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                <button onClick={() => { dispatch(cartSlice.actions.disableAdded()) }}>
                    Закрыть
                </button>
                </Modal.Footer>
            </Modal>
            <SearchForm
                searchText={searchText}
                onSearchTextChange={setSearchText}
                onSearchSubmit={(searchText) => {
                window.location.href = `/resources?title=${searchText}`;
                }}
            />
            <div className="card_group">
                {resources.map((resource, index) => (
                <ResCard
                    key={index}
                    imageUrl={resource.Image}
                    resourceName={resource.ResourceName}
                    resourceStatus={resource.IsAvailable}
                    resourceDetailed={`/resources/${resource.ResourceName}`}
                    changeStatus={`/resources/change_status/${resource.ResourceName}`}
                    onStatusChange={handleStatusChange}
                />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
