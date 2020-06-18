import React, {useState, useEffect, useContext} from 'react'

import {  
  Card, CardHeader, CardFooter, CardBody, 
  Row, Col,
  Input, Button, UncontrolledAlert
} from 'reactstrap';
import {getAllForms} from '../../services/api/form';
import {UserContext} from '../../App';


const NewDocForm = () => {
  const [name, setName] = useState('');
  const [issuedPlace, setIssuedPlace] = useState('');
  const [issuedTime, setIssuedTime] = useState('');
  const [description, setDescription] = useState('');
  const [uri, setUri] = useState('');
  const [docModelId, setDocModelId] = useState('');
  const [docModel, setDocModel] = useState([{_id: '', name: ''}]);

  const {token} = useContext(UserContext);

  const getCurrentDate = () : string => {
    const today = new Date();
    return today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
  }

  useEffect(() => {
    setIssuedTime(getCurrentDate());
  }, []);

  useEffect(() => {
    let responseDocModal: ({_id: string, name: string})[] = [];
    getAllForms({page: 1, limit: 10, token})
    .then(response => {
      response.data.map(doc => {
        responseDocModal.push({_id: doc._id, name: doc.name});
      });
      setDocModel(responseDocModal);
    });
  }, []);

  const handleSubmit = () => {
    console.log(name, issuedPlace,issuedTime, description, uri, docModelId)
  }

  return (<>
     <div className="app-inner-content-layout">
      <div className="app-inner-content-layout--main">
      <Card>
        <CardHeader>
          <div className="card-header--title">
            <b className="d-block text-uppercase mt-1">Tạo Hồ sơ mới</b>
          </div>
        </CardHeader>
        <div className="divider" />
        <CardBody>
          <Row className="justify-content-center">
            <Col xs="12" lg="2" className="d-flex justify-content-lg-end align-items-center">
             Tên
            </Col>
            <Col xs="12" lg="4">
              <Input
                type="text"
                name="name"
                value={name}
                onChange={(e => setName(e.target.value))}
              />
            </Col>
            <Col xs="12" lg="2" className="d-flex justify-content-lg-end align-items-center">
             Nơi cấp
            </Col>
            <Col xs="12" lg="4">
              <Input
                type="text"
                name="issuedPlace"
                value={issuedPlace}
                onChange={(e => setIssuedPlace(e.target.value))}
              />
            </Col>
          </Row>
          <Row className="justify-content-center mt-4">
            <Col xs="12" lg="2" className="d-flex justify-content-lg-end align-items-center">
              Ngày Cấp
            </Col>
            <Col xs="12" lg="4">
              <Input
                type="text"
                name="issuedTime"
                value={issuedTime}
                disabled
              />
            </Col>
            <Col xs="12" lg="2" className="d-flex justify-content-lg-end align-items-center">
              Mẫu
            </Col>
            <Col xs="12" lg="4">
              <Input
                type="select"
                name="docModelId"
                onChange={e => setDocModelId(e.target.value)}
              >
                {docModel.map(doc => (<option value={doc._id}>{doc.name}</option>))}
              </Input>
            </Col>
          </Row>
          <Row className="justify-content-center mt-4">
            <Col xs="12" lg="2" className="d-flex justify-content-lg-end align-items-center">
              Mô tả
            </Col>
            <Col xs="12" lg="10">
              <Input
                type="textarea"
                name="description"
                value={description}
                onChange={(e => setDescription(e.target.value))}
              />
            </Col>
          </Row>
          <Row className="justify-content-center mt-4">
            <Col xs="12" lg="2" className="d-flex justify-content-lg-end align-items-center">
              Link
            </Col>
            <Col xs="12" lg="10">
              <Input
                type="text"
                name="uri"
                value={uri}
                onChange={(e => setUri(e.target.value))}
              />
            </Col>
          </Row>
          {/* <UncontrolledAlert className="mt-4" color="danger">
            <span>Các mục không được để trống</span>
          </UncontrolledAlert> */}
        </CardBody>
        <div className="divider"/>
        <CardFooter className="d-flex justify-content-center">
          <Button 
            size="sm" className="py-2 px-4" color="primary"
            onClick={handleSubmit}
          >
            Tạo
          </Button>
        </CardFooter>
        </Card>
      </div>
    </div>
  </>)
}

export default NewDocForm;