import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomeMove";
import { getList } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";

const host = API_SERVER_HOST;

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextpage: 0,
    totalPage: 0,
    current: 0,
}

const ListComponet = () => {
    const {page, size, refresh, moveToList, moveToRead} = useCustomMove();

    const [serverData, setServerData] = useState(initState);

    //For FetchingModal
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        setFetching(true);

        getList({page, size}).then(data => {
            console.log(data);
            setServerData(data);
            setFetching(false);
        })
    }, [page, size, refresh]);

    return (
        <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
            {fetching ? <FetchingModal/> : <></>}
            <div className="flex flex-wrap mx-auto p-6">
                {serverData.dtoList.map(product => 
                    <div
                    key={product.pno}
                    className="w-1/2 p-1 rounded shadow-md border-2"
                    onClick={() => moveToRead(product.pno)}
                    >
                        <div className="flex flex-col h-full">
                            <div className="font-extrabold text-2xl p-2 w-full">
                                {product.pno}
                            </div>
                            <div className="w-full overflow-clip">
                                <img alt="product"
                                className="m-auto rounded-md w-60"
                                src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
                                />
                            </div>
                            <div className="bottom-0 font-extrabold bg-white">
                                <div className="text-center p-1">
                                    name: {product.pname}
                                </div>
                                <div className="text-center p-1">
                                    price: {product.price}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
        </div>
    );
}

export default ListComponet;