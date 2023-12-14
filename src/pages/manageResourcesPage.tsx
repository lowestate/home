import { FC, useState } from "react";
import {useSelector } from "react-redux/es/hooks/useSelector";
import { Button, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import cartSlice from "../store/cartSlice";
import store, { useAppDispatch } from "../store/store";
import { createReport } from "../modules/create_report";

interface InputChangeInterface {
    target: HTMLInputElement;
  }

const ManageResources: FC = () => {
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)
    
    const dispatch = useAppDispatch()
    
    const {userToken} = useSelector((state: ReturnType<typeof store.getState> ) => state.auth)
    const {resources} = useSelector((state: ReturnType<typeof store.getState>) => state.cart)

    const deleteFromCart = (regionName = '') => {
        return (event: React.MouseEvent) => {
            dispatch(cartSlice.actions.removeResource(regionName))
            event.preventDefault()
        }
    }

    const addResource = async () => {
        if (resources === undefined || userToken === null) {
            return
        }

        const result = await createReport(resources, userToken)
        if (result.status == 201) {
            setShowSuccess(true)
        } else {
            setShowError(true)
        }
    }

    const handleErrorClose = () => {
        setShowError(false)
    }
    const handleSuccessClose = () => {
        setShowSuccess(false)
    }

    return (
        <>
            <Modal show = {showError} onHide={handleErrorClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Не получилось добавить орбиту</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleErrorClose}>
                      Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show = {showSuccess} onHide={handleSuccessClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Орбита добавлена</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSuccessClose}>
                      Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
            {resources?.length !== 0 &&
                <h3>Выбранные орбиты:</h3>
            }
            {resources?.length === 0 && 
                <h4>Вы ещё не выбрали ни одной орбиты</h4>
            }
            <ListGroup style={{width: '500px'}}>
                {resources?.map((regionName, regionID) => (
                    <ListGroupItem key={regionID}> {regionName}
                        <span className="pull-right button-group" style={{float: 'right'}}>
                            <Button variant="danger" onClick={deleteFromCart(regionName)}>Удалить</Button>
                        </span>
                    </ListGroupItem>
                ))
                }
            </ListGroup>
            <p></p>
            <Button onClick={addResource}>Оформить</Button>
            <p></p>
            <Button href="/orbits">Домой</Button>
        </>
    )
               
}

export default ManageResources;