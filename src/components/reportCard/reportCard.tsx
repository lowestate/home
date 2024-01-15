import { FC, useEffect, useState } from 'react';
// import '../../styles/reportTable.style.css';
import { Link } from 'react-router-dom';
import { getUsernameByUUID } from '../../modules/get_username';

interface TransfReqRowProps {
    id: number;
    username: string;
    status: string;
    dateCreated?: string;
    dateProcessed?: string;
    dateFinished?: string;
    month?: string;
    place?: string
}

const TransfReqRow: FC<TransfReqRowProps> = ({
    id,
    username,
    status,
    dateCreated,
    dateProcessed,
    dateFinished,
    month,
    place
}) => {
    const [originalUsername, setOriginalUsername] = useState<string | null>(null);
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) {
            return 'Не завершена';
        }

        const options: Intl.DateTimeFormatOptions = {
            timeZone: 'UTC',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };

        const date = new Date(dateString);

        return new Intl.DateTimeFormat('ru-RU', options).format(date);
    };

    useEffect(() => {
        const getUsername = async () => {
          try {
            const result = await getUsernameByUUID(username);
            setOriginalUsername(result);
          } catch (error) {
            console.error('Error fetching username:', error);
          }
        };
    
        getUsername();
      }, [username]);

    return (
        <tr>
            <td><Link to={`/reports/${id}`}>{id}</Link></td>
            <td>{originalUsername}</td>
            <td>{status}</td>
            <td>{formatDate(dateCreated)}</td>
            <td>{formatDate(dateProcessed)}</td>
            <td>{dateFinished !== undefined ? formatDate(dateFinished) : 'Не завершена'}</td>
            <td>{month}</td>
            <td>{place}</td>
        </tr>
    );
};

export default TransfReqRow;

/*
<td>
                {userRole === '0' && status === 'Черновик' && (
                    <>
                        <Button variant="primary" onClick={onEditClick}>
                            Изменить
                        </Button>
                        <Button variant="danger" onClick={onCancelClick}>
                            Отменить
                        </Button>
                    </>
                )}
                {userRole === '0' && status !== 'Черновик' && (
                    <Button variant="info" onClick={onViewClick}>
                        Просмотр
                    </Button>
                )}
                {userRole === '1' && (
                    <Button variant="primary" onClick={onEditClick}>
                        Изменить
                    </Button>
                )}
            </td>
*/
