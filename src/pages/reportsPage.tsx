import { FC, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import store from "../store/store";
import { ExtractionReports } from "../modules/ds";
import { getReports } from "../modules/get_all_reports";
import TransfReqRow from "../components/reportCard/reportCard";
import { getAsyncProcessed } from "../modules/get_async_processed_amount";
import ReportFilter from "../components/reportFilter/filter";
import filtersSlice from "../store/filterSlice";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/pagination/pagination";
import usePagination from "../components/pagination/usePagination";

const ReportCard: FC = () => {
    const { userToken, userRole, userName } = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const [transfReqs, setTransfReqs] = useState<ExtractionReports[]>([])
    const [asyncProcessedAmount, setAsyncProcessedAmount] = useState<number | null>(null);

    const { requestStatus } = useSelector((state: ReturnType<typeof store.getState>) => state.filters);
    const [reqStatus, setReqStatus] = useState(requestStatus);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        currentPage,
        currentItems,
        pageCount,
        paginate,
        goToNextPage,
        goToPrevPage,
    } = usePagination(transfReqs, 6);

    const fetchAsyncProcessedAmount = async () => {
        const amount = await getAsyncProcessed(userToken?.toString());
        setAsyncProcessedAmount(amount);
    };

    useEffect(() => {
        const loadTransfReqs = async () => {
            if (userToken !== undefined) {
                const result = (await getReports(userToken?.toString(), userName?.toString(), '')).filter((item) => {
                    if (userRole === '0') {
                        return item.Client?.Username === userName;
                    } else {
                        console.log(userName)
                        return item.Moderator?.Username === userName;
                    }
                });
                setTransfReqs(result)
            }
        }

        const intervalId = setInterval(fetchAsyncProcessedAmount, 5000); // Поллинг каждые 5 секунд

        loadTransfReqs();
        fetchAsyncProcessedAmount(); // Загрузка сразу

        return () => clearInterval(intervalId);
        /*
        const getAsyncProcessedAmount = async () => {
            const asyncProcessedAmount = await getAsyncProcessed(userToken?.toString())
            setAsyncProcessedAmount(asyncProcessedAmount)
        }

        getAsyncProcessedAmount()
        */
    }, []);

    const applyFilters = async () => {
        try {
        const data = await getReports(userToken?.toString(), userName?.toString(), reqStatus?.toString());

        dispatch(filtersSlice.actions.setRequestStatus(reqStatus));

        setTransfReqs(data);

        navigate('/reports', { state: { data } });
        } catch (error) {
        console.error("Ошибка при получении отчетов:", error);
        }
    };

    const clearFilters = async () => {
        setReqStatus('');

        dispatch(filtersSlice.actions.setRequestStatus(''));

        try {
        const data = await getReports();
        setTransfReqs(data);
        } catch (error) {
        console.error("Ошибка загрузки ресурсов:", error);
        }

    };

    return (
        <>
            {!userToken &&
                <h3> Вам необходимо войти в систему! </h3>
            }
            <><div>
                    <ReportFilter
                        reqStatus={reqStatus}
                        setReqStatus={setReqStatus}
                        applyFilters={applyFilters}
                        clearFilters={clearFilters} />
            </div></>
            {userToken && transfReqs.length === 0 &&
                <h3> Заявки не найдены</h3>
            }
            {userToken && userRole === '1' &&
                <p>Обработанных записей: {asyncProcessedAmount}</p>
            }
            {transfReqs.length !== 0 && (
                <><Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID заявки</th>
                            <th>Статус</th>
                            <th>Дата создания</th>
                            <th>Дата последнего изменения</th>
                            <th>Дата окончания</th>
                            <th>Месяц</th>
                            <th>Место</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <TransfReqRow
                                key={index}
                                id={item.ID}
                                status={item.Status}
                                dateCreated={item.DateCreated}
                                dateProcessed={item.DateProcessed}
                                dateFinished={item.DateFinished}
                                place={item.Place}
                                month={item.Month} />
                        ))}
                    </tbody>
                </Table><div>
                        {transfReqs.length > 6 && (
                            <Pagination
                                currentPage={currentPage}
                                pageCount={pageCount}
                                goToNextPage={goToNextPage}
                                goToPrevPage={goToPrevPage}
                                paginate={paginate} />
                        )}
                    </div></>
            )}
        </>
    )
}

export default ReportCard;
