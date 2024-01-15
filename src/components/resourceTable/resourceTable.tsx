import { FC } from 'react';
import { Button,  Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Resource } from '../../modules/ds';
import Pagination from '../pagination/pagination';
import usePagination from '../pagination/usePagination';

interface OrbitTableProps {
  resources: Resource[];
  handleStatusChange: (resource_name: string, newStatus: boolean) => void;
  isStatusChanging: boolean;
}

const ResourceTable: FC<OrbitTableProps> = ({ resources, handleStatusChange, isStatusChanging }) => {
  const navigate = useNavigate();

  const {
    currentPage,
    currentItems,
    pageCount,
    paginate,
    goToNextPage,
    goToPrevPage,
  } = usePagination(resources, 3);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Table bordered striped style={{ width: '60%', borderCollapse: 'collapse', margin: '20px 0', border: '1px solid #ddd' }}>
          <thead style={{ backgroundColor: '#f0f0f0' }}>
            <tr>
              <th>Изображение</th>
              <th>Название ресурса</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((resource, index) => (
              <tr key={index} style={{ height: '50px', borderBottom: '1px solid #ddd' }}>
                <td style={{ backgroundColor: '#f0f0f0', textAlign: 'center', verticalAlign: 'middle' }}>
                  <div>
                    {resource.Image && (
                      <img
                        src={resource?.Image}
                        style={{ width: '80px', height: '60px', display: 'block', margin: 'auto' }}
                      />
                    )}
                  </div>
                </td>
                <td style={{ backgroundColor: '#f0f0f0', textAlign: 'center', verticalAlign: 'middle' }}>
                  <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{resource.ResourceName}</span>
                </td>
                <td style={{ backgroundColor: '#f0f0f0', fontSize: '16px', textAlign: 'center', verticalAlign: 'middle' }}>
                  {resource.IsAvailable ? 'Еще есть' : 'Закончился'}
                </td>
                <td style={{ backgroundColor: '#f0f0f0', textAlign: 'center', verticalAlign: 'middle' }}>
                  <Button
                    style={{ backgroundColor: '#0E3E8DFF', width: '30%', padding: '8px', marginRight: '5px' }}
                    onClick={() => navigate(`/resources/${encodeURIComponent(resource.ResourceName)}`)}
                  >
                    Подробнее
                  </Button>
                  <Button
                    style={{ backgroundColor: '#28a745', width: '30%', padding: '8px', marginRight: '5px' }}
                    variant='success'
                    onClick={() => navigate(`/resources/${encodeURIComponent(resource.ResourceName)}/edit`)}
                  >
                    Изменить
                  </Button>
                  <Button
                    style={{ backgroundColor: '#dc3545', width: '30%', padding: '8px' }}
                    variant='danger'
                    onClick={() => handleStatusChange(resource.ResourceName, !resource.IsAvailable)}
                    disabled={isStatusChanging}
                  >
                    {isStatusChanging ? 'Удаление...' : 'Удалить'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {pageCount > 1 && <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
        paginate={paginate}
      />}
    </>
  );
  
}  

export default ResourceTable;