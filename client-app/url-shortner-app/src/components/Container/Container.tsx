import * as React from 'react';
import FormContainer from '../FormContainer/FormContainer';
import DataTable from '../DataTable/DataTable';
import { UrlData } from '../../interface/UrlData';
import axios from 'axios';
import { serverUrl } from '../../helpers/Constants';

interface IContainerProps {
}

const Container: React.FunctionComponent<IContainerProps> = () => {
  const [data, setData] = React.useState<UrlData[]>([]);
  const [reload, setReload] = React.useState<boolean>(false);

  const updateReloadState = ():void => {
    setReload(true);
  }

  const fetchTableData = async () => {
    const response = await axios.get(`${serverUrl}/shorturl`);
    console.log("The response from the server is: ", response);
    setData(response.data);
    setReload(false);
  };

  React.useEffect(() => {
    fetchTableData();
  }, [reload]);

  return (
    <>
    <FormContainer updateReloadState={updateReloadState} />
    <DataTable updateReloadState={updateReloadState} data={data}/>
    </>
  );
};

export default Container;
